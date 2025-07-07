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

function ProductListing() {
  const location = useLocation();
  const defaultCategory = location.state?.category || null;

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
    const fetchFiltered = async () => {
      try {
        let url = 'http://localhost:8080/journal/api/products/filter';

        const response = await axios.get(url, {
          params: {
            categories: selectedCategories, // axios will send categories=Fashion&categories=Electronics
          },
          paramsSerializer: (params) => {
            return params.categories.map(cat => `categories=${encodeURIComponent(cat)}`).join('&');
          }
        });

        window.scrollTo({ top: 0, behavior: 'smooth' });

        setAllItems(response.data);
      } catch (error) {
        console.error('Error fetching filtered products:', error);
      }
    };

    if (selectedCategories.length > 0) {
      fetchFiltered();
    } else {
      setAllItems([]); // Optionally clear when none selected
    }
  }, [selectedCategories]);


  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCategoryChange = (category, isChecked) => {
    setSelectedCategories(prev =>
      isChecked ? [...prev, category] : prev.filter(c => c !== category)
    );
    setCurrentPage(1); // Reset to page 1 on filter change
  };

  const totalPages = Math.ceil(allItems.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  
  const sortedItems = [...allItems].sort((a, b) => {
    switch (sortOption) {
      case 'name-asc':
        return a.productName.localeCompare(b.productName);
      case 'name-desc':
        return b.productName.localeCompare(a.productName);
      case 'price-asc':
        return (a.mrp - a.mrp * (a.discount / 100)) - (b.mrp - b.mrp * (b.discount / 100));
      case 'price-desc':
        return (b.mrp - b.mrp * (b.discount / 100)) - (a.mrp - a.mrp * (a.discount / 100));
      default:
        return 0;
    }
  });

  const paginatedItems = sortedItems.slice(startIndex, startIndex + itemsPerPage);


  return (
    <section className="product-listing py-5">
      <div className="container py-2">
        <Breadcrumbs
          aria-label="breadcrumb"
          separator="|"
          sx={{
            '& .MuiBreadcrumbs-separator': {
              mx: 1,
              color: 'rgba(0,0,0,0.5)',
              fontWeight: 500,
            },
          }}
        >
          <Link underline="hover" color="inherit" href="/" className='transition text-[14px] font-medium text-gray-700 hover:text-black'>
            Home
          </Link>
          <Link underline="hover" color="inherit" href="/productListing" className='transition text-[14px] font-medium text-gray-700 hover:text-black'>
            Fashion
          </Link>
        </Breadcrumbs>
      </div>

      <div className="bg-white p-2">
        <div className="container flex gap-3">
          <div className="sidebarWrapper w-[20%] h-fit sticky top-4 self-start">
            <SideBar
              selectedCategories={selectedCategories}
              onCategoryChange={handleCategoryChange}
            />
          </div>

          <div className="rightContent w-[80%] py-3">
            <div className="bg-[#f1f1f1] p-2 w-full mb-3 rounded-md flex items-center justify-between">
              <div className="col1 flex items-center gap-2">
                <Button
                  className={`!w-[40px] !h-[40px] !min-w-[40px] !rounded-full ${itemView === 'list' ? '!bg-[#ff5252] !text-white' : '!text-[#000]'}`}
                  onClick={() => setItemView('list')}
                >
                  <LuMenu />
                </Button>
                <Button
                  className={`!w-[40px] !h-[40px] !min-w-[40px] !rounded-full ${itemView === 'grid' ? '!bg-[#ff5252] !text-white' : '!text-[#000]'}`}
                  onClick={() => setItemView('grid')}
                >
                  <IoGridSharp />
                </Button>
                <span className='text-[rgba(0,0,0,0.7)] text-[14px] font-[500] pl-3'>
                  {allItems.length} products found
                </span>
              </div>

              <div className="col2 ml-auto flex items-center justify-end gap-3 pr-4">
                <span className='text-[14px] font-[500] pl-3 text-[rgba(0,0,0,0.7)]'>Sort by:</span>
                <Button
                  id="basic-button"
                  aria-controls={open ? 'basic-menu' : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? 'true' : undefined}
                  onClick={handleClick}
                  className='!bg-white !text-[12px] !text-[#000] !capitalize !border !border-[#000]'
                >
                  {(() => {
                    switch (sortOption) {
                      case 'name-asc': return 'Name, A to Z';
                      case 'name-desc': return 'Name, Z to A';
                      case 'price-asc': return 'Price, low to high';
                      case 'price-desc': return 'Price, high to low';
                      default: return 'Sort';
                    }
                  })()}
                </Button>
                <Menu
                  id="basic-menu"
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  slotProps={{
                    list: {
                      'aria-labelledby': 'basic-button',
                    },
                  }}
                >
                  <MenuItem
                    onClick={() => { setSortOption('name-asc'); handleClose(); }}
                    className='!text-[13px] !text-[#000]'
                  >
                    Name, A to Z
                  </MenuItem>
                  <MenuItem
                    onClick={() => { setSortOption('name-desc'); handleClose(); }}
                    className='!text-[13px] !text-[#000]'
                  >
                    Name, Z to A
                  </MenuItem>
                  <MenuItem
                    onClick={() => { setSortOption('price-asc'); handleClose(); }}
                    className='!text-[13px] !text-[#000]'
                  >
                    Price, low to high
                  </MenuItem>
                  <MenuItem
                    onClick={() => { setSortOption('price-desc'); handleClose(); }}
                    className='!text-[13px] !text-[#000]'
                  >
                    Price, high to low
                  </MenuItem>

                </Menu>
              </div>
            </div>

            <div className={`grid ${itemView === 'grid' ? 'grid-cols-4 md:grid-cols-4 sm:grid-cols-2 gap-4' : 'grid-cols-1 gap-3'}`}>
              {paginatedItems.map((item) => {
                console.log("Rendering item:", item);
                return itemView === 'grid'
                  ? <ProductItem key={item.id || item._id} product={item} />
                  : <ProductItemListView key={item.id || item._id} product={item} />
              })}

            </div>

            <div className="mt-6 flex justify-center">
              <Pagination
                count={totalPages}
                page={currentPage}
                onChange={handlePageChange}
                sx={{
                  '& .MuiPaginationItem-root': {
                    color: '#ff5252',               // Unselected number & arrows
                  },
                  '& .MuiPaginationItem-root.Mui-selected': {
                    backgroundColor: '#ff5252',     // Red background for selected
                    color: '#fff',                  // White number
                  },
                  '& .MuiPaginationItem-root.Mui-selected:hover': {
                    backgroundColor: '#e64545',     // Hover effect
                  },
                  '& .MuiPaginationItem-icon': {
                    color: '#ff5252',               // Arrow icons
                  }
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
