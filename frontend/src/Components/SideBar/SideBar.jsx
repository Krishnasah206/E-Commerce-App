import React from 'react';
import CategoryCollapse from '../CategoryCollapse/CategoryCollapse';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import './SideBar.css';
import {Collapse} from 'react-collapse';
import { FaAngleDown, FaAngleUp } from "react-icons/fa";
import Button from '@mui/material/Button';
import Rating from '@mui/material/Rating';
import RangeSlider from 'react-range-slider-input';
import 'react-range-slider-input/dist/style.css'; // Ensure you have this CSS file imported


function SideBar() {
    const [isOpenCategoryFilter, setIsOpenCategoryFilter] = React.useState(true);
    const [isOpenAvailabilityFilter, setIsOpenAvailabilityFilter] = React.useState(true);
    const [isOpenRatingFilter, setIsOpenRatingFilter] = React.useState(true);
  return (
    <aside className="sidebar py-5">
        {/* <CategoryCollapse /> */}
        <div className="box">
            <div className="mb-3 text-[16px] font-[600] flex items-center pr-5">
                <span>Shop by Category</span>
                <Button className='!w-[30px] !h-[30px] !min-w-[30px] !rounded-full !ml-auto !text-[#000] ' onClick={() => setIsOpenCategoryFilter(!isOpenCategoryFilter)} size="small">
                    {isOpenCategoryFilter ? <FaAngleDown /> : <FaAngleUp />}
                </Button>
            </div>
            <Collapse isOpened={isOpenCategoryFilter}>
                <div className="scroll px-3 relative -left-[10px]">
                    <FormGroup>
                        <FormControlLabel control={<Checkbox size='small' />} label="Fashion" className='w-full' />
                        <FormControlLabel control={<Checkbox size='small' />} label="Electronics" className='w-full' />
                        <FormControlLabel control={<Checkbox size='small' />} label="Bags" className='w-full' />
                        <FormControlLabel control={<Checkbox size='small' />} label="Footwear" className='w-full' />
                        <FormControlLabel control={<Checkbox size='small' />} label="Groceries" className='w-full' />
                        <FormControlLabel control={<Checkbox size='small' />} label="Beauty" className='w-full' />
                        <FormControlLabel control={<Checkbox size='small' />} label="Wellness" className='w-full' />
                        <FormControlLabel control={<Checkbox size='small' />} label="Jewellery" className='w-full' />
                    </FormGroup>
                </div>
            </Collapse>
        </div>

            {/* Availability Filter */}
        <div className="box mt-3">
            <div className="mb-3 text-[16px] font-[600] flex items-center pr-5">
                <span>Availability</span>
                <Button className='!w-[30px] !h-[30px] !min-w-[30px] !rounded-full !ml-auto !text-[#000] ' onClick={() => setIsOpenAvailabilityFilter(!isOpenAvailabilityFilter)} size="small">
                    {isOpenAvailabilityFilter ? <FaAngleDown /> : <FaAngleUp />}
                </Button>
            </div>
            <Collapse isOpened={isOpenAvailabilityFilter}>
                <div className="scroll px-3 relative -left-[10px]">
                    <FormGroup>
                        <FormControlLabel control={<Checkbox size='small' />} label="Available (17)" className='w-full' />
                        <FormControlLabel control={<Checkbox size='small' />} label="In Stock (17)" className='w-full' />
                        <FormControlLabel control={<Checkbox size='small' />} label="Not Available (1)" className='w-full' />
                    </FormGroup>
                </div>
            </Collapse>
        </div>

        {/* Price Filter */}
        <div className="box mt-4 ">
            <div className="mb-3 text-[16px] font-[600] flex items-center pr-5 w-full">
                <span>Filter By Price</span>
            </div>

            <RangeSlider />
            <div className="flex pt-4 pb-2 priceRange">
                <span className='text-[13px]'>
                    From: <strong className='text-dark'>Rs: {100}</strong>
                </span>
                <span className='ml-auto text-[13px]'>
                    To: <strong className='text-dark'>Rs: {5000}</strong>
                </span>
            </div>
        </div>

        {/* Rating Filter */}
        <div className="box mt-4">
            {/* Header */}
            <div className="mb-3 text-[16px] font-[600] flex items-center pr-5">
                <span>Filter By Rating</span>
                <Button
                className="!w-[30px] !h-[30px] !min-w-[30px] !rounded-full !ml-auto !text-[#000]"
                onClick={() => setIsOpenRatingFilter(!isOpenRatingFilter)}
                size="small"
                >
                {isOpenRatingFilter ? <FaAngleDown /> : <FaAngleUp />}
                </Button>
            </div>

            {/* Rating Checkboxes */}
            <Collapse isOpened={isOpenRatingFilter}>
                <div className="scroll px-3 relative -left-[10px]">
                <FormGroup>
                    {[5, 4, 3, 2, 1].map((value) => (
                    <div key={value} className="flex items-center">
                        <Checkbox size='small' />
                        <Rating
                        name={`rating-${value}`}
                        defaultValue={value}
                        size="small"
                        readOnly
                        />
                    </div>
                    ))}
                </FormGroup>
                </div>
            </Collapse>
        </div>
    </aside>
  );
}

export default SideBar;

