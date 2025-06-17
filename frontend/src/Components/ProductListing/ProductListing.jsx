import React, { useState } from 'react';
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

function ProductListing() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [itemView, setItemView] = useState('grid');
  const [currentPage, setCurrentPage] = useState(1);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const itemsPerPage = 16;

  // Simulated product list (40 items for demo)
  const allItems = new Array(40).fill(null).map((_, index) => index + 1);

  const totalPages = Math.ceil(allItems.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedItems = allItems.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

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
          <Link underline="hover" color="inherit" href="/" className='transition text-[14px] font-medium text-gray-700 hover:text-black'>
            Fashion
          </Link>
        </Breadcrumbs>
      </div>


      <div className="bg-white p-2">
        <div className="container flex gap-3">

          {/* SideBar */}
          <div className="sidebarWrapper w-[20%] h-fit sticky top-4 self-start">
            <SideBar />
          </div>

          {/* Product Listing */}
          <div className="rightContent w-[80%] py-3">
            <div className="bg-[#f1f1f1] p-2 w-full mb-3 rounded-md flex items-center justify-between">
              <div className="col1 flex items-center gap-2">
                <Button
                  className={`!w-[40px] !h-[40px] !min-w-[40px] !rounded-full ${
                    itemView === 'list'
                      ? '!bg-[#ff5252] !text-white'
                      : '!text-[#000]'
                  }`}
                  onClick={() => setItemView('list')}
                >
                  <LuMenu />
                </Button>
                <Button
                  className={`!w-[40px] !h-[40px] !min-w-[40px] !rounded-full ${
                    itemView === 'grid'
                      ? '!bg-[#ff5252] !text-white'
                      : '!text-[#000]'
                  }`}
                  onClick={() => setItemView('grid')}
                >
                  <IoGridSharp />
                </Button>
                <span className='text-[rgba(0,0,0,0.7)] text-[14px] font-[500] pl-3'>
                  There are {allItems.length} products.
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
                  Name, A to Z
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
                  <MenuItem onClick={handleClose} className='!text-[13px] !text-[#000]'>Name, A to Z</MenuItem>
                  <MenuItem onClick={handleClose} className='!text-[13px] !text-[#000]'>Name, Z to A</MenuItem>
                  <MenuItem onClick={handleClose} className='!text-[13px] !text-[#000]'>Price, low to high</MenuItem>
                  <MenuItem onClick={handleClose} className='!text-[13px] !text-[#000]'>Price, high to low</MenuItem>
                </Menu>
              </div>
            </div>

            {/* Product Items */}
            <div className={`grid ${itemView === 'grid' ? 'grid-cols-4 md:grid-cols-4 sm:grid-cols-2 gap-4' : 'grid-cols-1 gap-3'}`}>
              {paginatedItems.map((item, index) =>
                itemView === 'grid' ? <ProductItem key={index} /> : <ProductItemListView key={index} />
              )}
            </div>

            {/* Pagination */}
            <div className="mt-6 flex justify-center">
              <Pagination
                count={totalPages}
                page={currentPage}
                onChange={handlePageChange}
                sx={{
                  '& .MuiPaginationItem-root': {
                    color: '#ff5252',
                    borderColor: '#ff5252',
                  },
                  '& .Mui-selected': {
                    backgroundColor: '#ff5252',
                    color: '#fff',
                    '&:hover': {
                      backgroundColor: '#e64545',
                    },
                  },
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
