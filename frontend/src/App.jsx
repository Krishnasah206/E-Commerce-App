import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import Header from './Components/Header/Header'
import Home from './Components/Home/Home'
import Footer from './Components/Footer/Footer';

function App() {
  return (
    <BrowserRouter>
      <Header />
      {/* Apply top padding to prevent content being hidden under fixed header */}
      <div className="">
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
      {/* Footer can be added here if needed */}
      <Footer />
    </BrowserRouter>
  );
}


export default App

