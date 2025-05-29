import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Shop from './Pages/Shop';
import ProductDetail from './Pages/ProductDetail';
import Category from './Pages/Category';
import Header from './Components/Header';
import Footer from './Components/Footer';
import Register from './Pages/Register';
import Dashboard from './Pages/Dashboard';
import Minicart from './Components/Minicart';
import Checkoutpage from './Pages/Checkout';
import Myorders from './Pages/Myorders';
import Aboutus from './Pages/About';
import Contactus from './Pages/Contactus';
function App() {
  return (
    <div className="bg-white">
        <Header/>
        <Routes>
          <Route path="/" element={<Shop/>}></Route>
          <Route path="/product/:productId" element={<ProductDetail/>}></Route>
          <Route path="/:category" element={<Category></Category>}></Route>
          <Route path="/register" element={<Register></Register>}></Route>
          <Route path="/dashboard" element={<Dashboard></Dashboard>}></Route>
          <Route path="/checkout" element={<Checkoutpage></Checkoutpage>}></Route>
          <Route path="/myorders" element={<Myorders></Myorders>}></Route>
          <Route path="/aboutus" element={<Aboutus></Aboutus>}></Route>
          <Route path="/contactus" element={<Contactus></Contactus>}></Route>
        </Routes>
        <Minicart/>
        <Footer/>
    
   </div>
  );
}

export default App;
