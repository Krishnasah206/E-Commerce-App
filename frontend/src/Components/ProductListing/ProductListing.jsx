import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import SideBar from '../SideBar/SideBar';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import ProductItem from '../ProductItem/ProductItem';
import Pagination from '@mui/material/Pagination';
import Button from '@mui/material/Button';
import { LuMenu } from 'react-icons/lu';
import { IoGridSharp } from 'react-icons/io5';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ProductItemListView from '../ProductItemListView/ProductItemListView';
import axios from 'axios';

function ProductListing({ cartOpen = false, setCartItems = () => {} }) {
  const location = useLocation();
  const defaultCategory = location.state?.category || 'Fashion';
  const searchQuery = location.state?.searchQuery || '';

  const token = localStorage.getItem("token");

  const [anchorEl, setAnchorEl] = useState(null);
  const [itemView, setItemView] = useState('grid');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategories, setSelectedCategories] = useState(
    defaultCategory ? [defaultCategory] : []
  );
  const [allItems, setAllItems] = useState([]);
  const [sortOption, setSortOption] = useState('name-asc');
  const open = Boolean(anchorEl);
  const itemsPerPage = 16;

  useEffect(() => {
    const fetchFilteredProducts = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/products/search`, {
          params: {
            categories: selectedCategories,
            query: searchQuery || undefined,
          },
          paramsSerializer: (params) => {
            const catString = params.categories?.map(cat => `categories=${encodeURIComponent(cat)}`).join('&') || '';
            const queryString = params.query ? `&query=${encodeURIComponent(params.query)}` : '';
            return `${catString}${queryString}`;
          },
        });

        setAllItems(response.data);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } catch (error) {
        console.error('Error fetching filtered products:', error);
      }
    };

    fetchFilteredProducts();
  }, [selectedCategories, searchQuery]);

  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);
  const handlePageChange = (_, value) => {
    setCurrentPage(value);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCategoryChange = (category, isChecked) => {
    setSelectedCategories(prev =>
      isChecked ? [...prev, category] : prev.filter(c => c !== category)
    );
    setCurrentPage(1);
  };

  const totalPages = Math.ceil(allItems.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;

  const sortedItems = [...allItems].sort((a, b) => {
    const priceA = a.mrp - a.mrp * (a.discount / 100);
    const priceB = b.mrp - b.mrp * (b.discount / 100);

    switch (sortOption) {
      case 'name-asc': return a.productName.localeCompare(b.productName);
      case 'name-desc': return b.productName.localeCompare(a.productName);
      case 'price-asc': return priceA - priceB;
      case 'price-desc': return priceB - priceA;
      default: return 0;
    }
  });

  const paginatedItems = sortedItems.slice(startIndex, startIndex + itemsPerPage);

  return (
    <section className="product-listing py-5">
      <div className="container py-2">
        <Breadcrumbs aria-label="breadcrumb" separator="|">
          <Link underline="hover" color="inherit" href="/">Home</Link>
          <Link underline="hover" color="inherit" href="/productListing">Products</Link>
        </Breadcrumbs>
      </div>

      <div className="bg-white p-2">
        <div className="container flex gap-3">
          <div className="sidebarWrapper w-[20%] sticky top-4">
            <SideBar selectedCategories={selectedCategories} onCategoryChange={handleCategoryChange} />
          </div>

          <div className="rightContent w-[80%] py-3">
            <div className="bg-[#f1f1f1] p-2 mb-3 rounded-md flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Button onClick={() => setItemView('list')} className={`!w-10 !h-10 !rounded-full ${itemView === 'list' ? '!bg-[#ff5252] !text-white' : '!text-black'}`}><LuMenu /></Button>
                <Button onClick={() => setItemView('grid')} className={`!w-10 !h-10 !rounded-full ${itemView === 'grid' ? '!bg-[#ff5252] !text-white' : '!text-black'}`}><IoGridSharp /></Button>
                <span className="text-sm font-medium text-gray-600 pl-3">{allItems.length} products found</span>
              </div>

              <div className="ml-auto flex items-center gap-3">
                <span className="text-sm font-medium text-gray-600">Sort by:</span>
                <Button onClick={handleClick} className="!text-sm !text-black !border !border-black">{
                  {
                    'name-asc': 'Name, A to Z',
                    'name-desc': 'Name, Z to A',
                    'price-asc': 'Price, low to high',
                    'price-desc': 'Price, high to low'
                  }[sortOption]
                }</Button>
                <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
                  {['name-asc', 'name-desc', 'price-asc', 'price-desc'].map(option => (
                    <MenuItem key={option} onClick={() => { setSortOption(option); handleClose(); }}>
                      {{
                        'name-asc': 'Name, A to Z',
                        'name-desc': 'Name, Z to A',
                        'price-asc': 'Price, low to high',
                        'price-desc': 'Price, high to low'
                      }[option]}
                    </MenuItem>
                  ))}
                </Menu>
              </div>
            </div>

            <div className={`grid ${itemView === 'grid' ? 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4' : 'grid-cols-1 gap-3'}`}>
              {paginatedItems.map((item, index) => {
                const key = item._id || index;
                return itemView === 'grid' ? (
                  <ProductItem
                    key={key}
                    product={item}
                    token={token}
                    cartOpen={cartOpen}
                    setCartItems={setCartItems}
                  />
                ) : (
                  <ProductItemListView
                    key={key}
                    product={item}
                    token={token}
                    cartOpen={cartOpen}
                    setCartItems={setCartItems}
                  />
                );
              })}
            </div>

            <div className="mt-6 flex justify-center">
              <Pagination
                count={totalPages}
                page={currentPage}
                onChange={handlePageChange}
                sx={{
                  '& .MuiPaginationItem-root': { color: '#ff5252' },
                  '& .Mui-selected': {
                    backgroundColor: '#ff5252',
                    color: '#fff',
                    '&:hover': { backgroundColor: '#e64545' },
                  },
                  '& .MuiPaginationItem-icon': { color: '#ff5252' }
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ProductListing;
