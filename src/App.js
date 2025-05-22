import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Products from "./components/products";
import Cart from "./components/cart";
import Navbar from "./components/navbar";

const App = () => {
  return (
    <Router>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/products" element={<Products />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/" element={<Products />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
