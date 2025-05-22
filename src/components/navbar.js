import React from "react";
import { Link } from "react-router-dom";
import "../App.css";
const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="nav-links">
        <Link className="nav-text" to="/products">
          Products
        </Link>
        <Link className="nav-text" to="/cart">
          Cart
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
