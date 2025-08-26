import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';

import Header from './Components/Header/Header';
import Home from './Components/Home/Home';
import Footer from './Components/Footer/Footer';
import ProductListing from './Components/ProductListing/ProductListing';
import ProductDetailsWrapper from './Components/ProductDetailsWrapper/ProductDetailsWrapper';
import CartListing from './Components/Cart/CartListing';

import LoginPage from './pages/LoginPage';
import AuthRegisterWithOtp from './pages/AuthRegisterWithOtp';
import ResetPasswordFlow from './pages/ResetPasswordFlow';
import Checkout from './pages/CheckOut';
import OrderConfirmation from './pages/OrderConfirmation';

// ✅ Toastify
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/productListing" element={<ProductListing />} />
        <Route path="/product/:id" element={<ProductDetailsWrapper />} />
        <Route path="/cartListing" element={<CartListing />} />

        <Route path="/login" element={<LoginPage />} />
        <Route path='/register' element={<AuthRegisterWithOtp />} />
        <Route path='/reset-password' element={<ResetPasswordFlow />} />

        <Route path="/checkout" element={<Checkout />} />
        <Route path="/order-confirmation" element={<OrderConfirmation />} />
      </Routes>
      <Footer />

      {/* ✅ Global Toast Container (works across all pages) */}
      <ToastContainer position="top-center" autoClose={3000} />
    </BrowserRouter>
  );
}

export default App;
