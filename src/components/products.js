import React from "react";
import "../App.css";

const Product = ({ product, onAddToCart }) => {
  return (
   <div className="product-info">
  <img src={product.image} alt={product.title} className="product-image" />
  <span className="product-title">{product.title}</span>
  <span className="product-price">${product.price.toFixed(2)}</span>
  <button className="add-button" onClick={() => onAddToCart(product)}>
    Add to Cart
  </button>
</div>
  );
};

export default Product;
