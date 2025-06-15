import { IoSearch } from "react-icons/io5";
import Button from '@mui/material/Button';

const Search = () => {
  return (
    <div className="searchBox w-full h-12 bg-gray-100 rounded-md flex items-center relative px-4">
      <input
        type="text"
        placeholder="Search for products..."
        className="w-full h-full bg-transparent pr-12 text-base border-none focus:outline-none focus:ring-0 placeholder-gray-500"
        />

      <Button 
        className="!absolute right-2 !min-w-0 !p-0 !rounded-full"
        sx={{
          width: 34,
          height: 34,
          minWidth: 34,
          top: '50%',
          transform: 'translateY(-50%)'
        }}
      >
        <IoSearch className="text-xl text-gray-600" />
      </Button>
    </div>
  );
};

export default Search;