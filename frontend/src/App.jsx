import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './Components/Header/Header';
import Home from './Components/Home/Home';
import Footer from './Components/Footer/Footer';
import ProductListing from './Components/ProductListing/ProductListing';
import ProductDetailsWrapper from './Components/ProductDetailsWrapper/ProductDetailsWrapper';
import CartListing from './Components/Cart/CartListing';

function App() {

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/productListing" element={<ProductListing />} />
        <Route path="/product/:id" element={<ProductDetailsWrapper />} />
        <Route path="/cartListing" element={<CartListing />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
