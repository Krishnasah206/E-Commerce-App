import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';

import Header from './Components/Header/Header';
import Home from './Components/Home/Home';
import Footer from './Components/Footer/Footer';
import ProductListing from './Components/ProductListing/ProductListing';
import ProductDetailsWrapper from './Components/ProductDetailsWrapper/ProductDetailsWrapper';
import CartListing from './Components/Cart/CartListing';

// ✅ Import login and register pages
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/productListing" element={<ProductListing />} />
        <Route path="/product/:id" element={<ProductDetailsWrapper />} />
        <Route path="/cartListing" element={<CartListing />} />

        {/* ✅ Add Auth Routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
