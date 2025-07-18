import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaAngleDown, FaAngleUp, FaRegHeart, FaHeart } from 'react-icons/fa';
import { LuGitCompareArrows } from 'react-icons/lu';
import Rating from '@mui/material/Rating';
import ProductSlider from '../ProductSlider/ProductSlider';
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
  const [relatedProducts, setRelatedProducts] = useState([]);

  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");

  useEffect(() => {
    axios.get(`http://localhost:8080/api/products/${id}`)
      .then((res) => {
        setProduct(res.data);
        setMainImage(res.data.images?.[0]);

        // ✅ Fetch related products in same category
        axios.get(`http://localhost:8080/api/products/category/${res.data.category}`)
          .then((relatedRes) => {
            // Remove current product from related list
            const filtered = relatedRes.data.filter((p) => p.id !== res.data.id);
            setRelatedProducts(filtered);
          })
          .catch(err => console.error("Error fetching related products:", err));

      })
      .catch((err) => console.error('Error fetching product:', err));
  }, [id]);


  useEffect(() => {
    if (product?.category) {
      axios.get(`http://localhost:8080/api/products?category=${product.category}`)
        .then((res) => {
          const filtered = res.data.filter(p => p.id !== product.id);
          setRelatedProducts(filtered);
        })
        .catch((err) => console.error("Error fetching related products:", err));
    }
  }, [product]);

  const handleChange = (e) => setQuantity(e.target.value);

  const handleAddToCart = async () => {
    if (!userId || !token) {
      alert("Please login to add items to your cart.");
      return;
    }

    const payload = { productId: product.id, quantity };

    try {
      await axios.post(
        `http://localhost:8080/api/cart/${userId}/add`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );
      alert("Item added to cart successfully!");
    } catch (err) {
      console.error("Failed to add item to cart:", err);
      alert("Failed to add item. Please try again.");
    }
  };

  if (!product) return <div className="p-6 text-gray-500">Loading product details...</div>;

  const discountedPrice = Math.round(product.mrp - (product.mrp * product.discount / 100));

  return (
    <section className="productDetails bg-white">
      <div className="container mx-auto py-8">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Left - Images */}
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

          {/* Right - Info */}
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

            <p className="text-sm text-gray-900 mb-3">
              Free Shipping (Est. Delivery Time 2-3 Days)
            </p>

            {/* Quantity and Add to Cart */}
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

            <div className="flex gap-6 text-sm">
              <button
                onClick={() => setWishlist(!wishlist)}
                className={`flex items-center gap-1 ${wishlist ? 'text-[#ff5252]' : 'text-gray-700'} hover:text-[#ff5252]`}
              >
                {wishlist ? <FaHeart /> : <FaRegHeart />} Add to Wishlist
              </button>
              <button className="flex items-center gap-1 text-gray-700 hover:text-black">
                <LuGitCompareArrows /> Add to Compare
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs: Description and Reviews */}
      <div className="description px-[100px] bg-white pt-4">
        <div className="flex gap-4 mb-2">
          <button
            onClick={() => setActiveTab('description')}
            className={`font-semibold ${activeTab === 'description' ? 'text-red-500' : 'text-gray-500'}`}
          >
            Description
          </button>
          <button
            onClick={() => setActiveTab('reviews')}
            className={`font-semibold ${activeTab === 'reviews' ? 'text-red-500' : 'text-gray-500'}`}
          >
            Reviews ({product.reviews?.length || 0})
          </button>
        </div>

        {activeTab === 'description' ? (
          <p className="bg-white p-5 rounded-xl shadow-md text-gray-700">{product.description}</p>
        ) : (
          <div className="p-4 shadow rounded text-gray-600 space-y-2">
            {product.reviews?.map((review, idx) => (
              <p key={idx}>⭐️ {review.rating} - "{review.comment}"</p>
            ))}
          </div>
        )}
      </div>

      {/* Related Products */}
      <section className="bg-white py-8">
        <div className="container">
          <div className="flex items-center justify-between gap-4 mb-4">
            <h2 className="text-[20px] font-[600]">Related Products</h2>
          </div>

          {relatedProducts.length > 0 ? (
            <ProductSlider
              products={relatedProducts}
              token={token}
              cartOpen={false}
              setCartItems={() => {}} // Optional stub
            />
          ) : (
            <p className="text-gray-500 px-4">No related products found.</p>
          )}
        </div>
      </section>
    </section>
  );
}

export default ProductDetails;
