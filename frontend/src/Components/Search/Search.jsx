import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoSearch } from "react-icons/io5";
import Button from "@mui/material/Button";
import axios from "axios";

const Search = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = async () => {
    const trimmedQuery = query.trim();
    if (trimmedQuery === "") return;

    try {
      const res = await axios.get(`http://localhost:8080/api/products/search`, {
        params: { query: trimmedQuery },
      });

      const products = res.data;
      if (products.length > 0) {
        const category = products[0].category;
        navigate("/productListing", {
          state: {
            category: category,
            searchQuery: trimmedQuery,
          },
        });
      } else {
        alert("No matching products found.");
      }
    } catch (err) {
      console.error("Error searching product:", err);
      alert("No matching products found.");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSearch();
  };

  return (
    <div className="searchBox w-full h-12 bg-gray-100 rounded-md flex items-center relative px-4">
      <input
        type="text"
        placeholder="Search for products..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyDown}
        className="w-full h-full bg-transparent text-base border-none focus:outline-none focus:ring-0 placeholder-gray-500"
      />
      <Button
        onClick={handleSearch}
        className="!absolute right-2 !min-w-0 !p-0 !rounded-full"
        sx={{
          width: 34,
          height: 34,
          minWidth: 34,
          top: "50%",
          transform: "translateY(-50%)",
        }}
      >
        <IoSearch className="text-xl text-gray-600" />
      </Button>
    </div>
  );
};

export default Search;
