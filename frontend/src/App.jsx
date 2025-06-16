import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './Components/Header/Header';
import Home from './Components/Home/Home';
import Footer from './Components/Footer/Footer';
import { useState } from 'react';
import CategoryPanel from './Components/Navbar/CategoryPanel';
import CategoryProducts from './Components/CategoryProducts/CategoryProducts';

function App() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <BrowserRouter>
      <Header />
      {/* Padding for fixed header */}
      <Routes>
          <Route
            path="/"
            element={!isOpen ? <Home /> : <CategoryProducts />}
          />
          {/* You can add more routes here */}
        </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
