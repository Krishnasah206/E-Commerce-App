import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './Components/Header/Header';
import Home from './Components/Home/Home';
import Footer from './Components/Footer/Footer';
import ProductListing from './Components/ProductListing/ProductListing';
import ProductDetailsWrapper from './Components/ProductDetailsWrapper/ProductDetailsWrapper';

function App() {

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/productListing/:category" element={<ProductListing />} />
        <Route path="/product/:id" element={<ProductDetailsWrapper />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
