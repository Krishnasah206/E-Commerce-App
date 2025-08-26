import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaAngleDown, FaAngleUp, FaRegHeart, FaHeart } from 'react-icons/fa';
import { LuGitCompareArrows } from 'react-icons/lu';
import Rating from '@mui/material/Rating';
import RecommendSlider from '../RecommendSlider/RecommendSlider';
import {
  InputLabel,
  MenuItem,
  FormControl,
  Select
} from '@mui/material';

function ProductDetails({ id }) {
  const [product, setProduct] = useState(null);
  const [mainImage, setMainImage] = useState('');
  const [wishlist, setWishlist] = useState(false);
  const [activeTab, setActiveTab] = useState('description');
  const [quantity, setQuantity] = useState(1);
  const [recommendedProducts, setRecommendedProducts] = useState([]);

  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");

  // Fetch product by ID
  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/products/${id}`)
      .then(res => {
        setProduct(res.data);
        setMainImage(res.data.images?.[0]);

        // Fetch recommended product IDs
        fetchRecommendedProducts(res.data.id);
      })
      .catch(err => console.error("Error fetching product:", err));
  }, [id]);

  const fetchRecommendedProducts = async (productId) => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/recommend/${productId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      const recommendedIds = res.data.recommendedIds || [];
      const productsById = await Promise.all(
        recommendedIds.map(async (rid) => {
          const prodRes = await axios.get(`${import.meta.env.VITE_API_URL}/products/${rid}`);
          return prodRes.data;
        })
      );
      setRecommendedProducts(productsById);
    } catch (err) {
      console.error("Error fetching recommended products:", err);
      toast.error("Failed to load recommended products");
    }
  };

  const handleChange = (e) => setQuantity(e.target.value);

  const handleAddToCart = async () => {
    if (!userId || !token) {
      toast.error("Please login to add items to your cart.", { position: "top-center" });
      return;
    }

    const payload = { productId: product.id, quantity };
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/cart/${userId}/add`, payload, {
        headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
      });
      toast.success("Item added to cart successfully!", { position: "top-right" });
    } catch (err) {
      console.error("Failed to add item to cart:", err);
      toast.error("Failed to add item. Please try again.", { position: "top-right" });
    }
  };

  if (!product) return <div className="p-6 text-gray-500">Loading product details...</div>;

  const discountedPrice = product.mrp && product.discount
    ? (product.mrp - (product.mrp * product.discount / 100)).toFixed(2)
    : 0;

  return (
    <section className="productDetails bg-white">
      <div className="container mx-auto py-8">
        {/* Product Info Section */}
        <div className="flex flex-col md:flex-row gap-6">
          {/* Left: Images */}
          <div className="w-full md:w-1/2 flex gap-4 items-start">
            <div className="flex flex-col gap-3">
              {product.images?.map((img, idx) => (
                <img
                  key={idx}
                  src={img}
                  alt={`thumb-${idx}`}
                  className={`w-20 h-20 object-cover border rounded cursor-pointer ${mainImage === img ? 'opacity-100 border-2 border-[#ff5252]' : 'opacity-40'}`}
                  onClick={() => setMainImage(img)}
                />
              ))}
            </div>
            <div className="flex-1">
              <img
                src={mainImage}
                alt="Main product"
                className="w-full h-[500px] object-cover rounded"
              />
            </div>
          </div>

          {/* Right: Info */}
          <div className="w-full pt-[20px] md:w-1/2">
            <h2 className="text-2xl font-semibold mb-2">{product.productName}</h2>
            <p className="text-md text-gray-600 mb-1 flex items-center gap-2">
              Brands: <span className="text-black font-medium">{product.brand}</span>
              <Rating value={product.rating || 0} size="small" readOnly />
              <span className="text-gray-500">({product.reviews?.length || 0} reviews)</span>
            </p>
            <div className="flex items-center mb-3">
              <span className="line-through text-gray-500 mr-2">₹{product.mrp}</span>
              <span className="text-red-600 font-bold text-xl">₹{discountedPrice}</span>
              <span className="ml-4 text-green-600 font-medium">
                Available In Stock: <span className="font-bold">{product.stock} Items</span>
              </span>
            </div>
            <p className="text-gray-600 mb-4">{product.description}</p>

            {/* Quantity + Add To Cart */}
            <div className="flex items-center gap-4 mb-4">
              <FormControl sx={{ minWidth: 100 }} size="small">
                <InputLabel id="quantity-label">Quantity</InputLabel>
                <Select
                  labelId="quantity-label"
                  value={quantity}
                  onChange={handleChange}
                  label="Quantity"
                >
                  {[...Array(10)].map((_, i) => (
                    <MenuItem key={i + 1} value={i + 1}>{i + 1}</MenuItem>
                  ))}
                </Select>
              </FormControl>
              <button
                onClick={handleAddToCart}
                className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded font-medium"
              >
                ADD TO CART
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Recommended Products Slider */}
      <section className="bg-white py-8">
        <div className="container">
          <h2 className="text-[20px] font-[600] mb-4">Recommended Products</h2>
          {recommendedProducts.length > 0 ? (
            <RecommendSlider products={recommendedProducts} />
          ) : (
            <p className="text-gray-500 px-4">No recommended products found.</p>
          )}
        </div>
        <ToastContainer position="top-left" />
      </section>
    </section>
  );
}

export default ProductDetails;
