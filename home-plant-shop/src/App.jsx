import React, {useState} from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import Shop from './components/Shop';
import Login from './components/Login';
import PlantCare from './components/PlantCare';
import ShopBasket from './components/ShopBasket';
import Blogs from './components/Blogs';
import Header from './components/Header';
import Footer from './components/Footer';
import './App.css';

function App() {

  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="app-container">
      <Router>
        <div className="container">
          <Header searchTerm = {searchTerm}
                  setSearchTerm = {setSearchTerm} />
          <Routes>
            <Route path="/" element={<HomePage searchTerm = {searchTerm} />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/login" element={<Login />} />
            <Route path="/plantcare" element={<PlantCare />} />
            <Route path="/shopbasket" element={<ShopBasket />} />
            <Route path="/blogs" element={<Blogs />} />
          </Routes>
          <Footer />
        </div>
      </Router>
    </div>
  );
}

export default App;
