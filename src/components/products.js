import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts, addToCart } from "../redux/cartSlice";
import "../App.css";

const Products = () => {
  const dispatch = useDispatch();
  const { products,status } = useSelector((state) => state.cart);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <div className="product-container">
      <h2 className="product-heading">Products</h2>
      {status === "loading" && <p>Loading...</p>}
      {status === "failed" && <p>Failed to load products.</p>}
      <div className="product-item">
        {products.map((product) => (
          <div className="product-info" key={product.id}>
            <span className="product-title">{product.title} </span>
            <span className="product-price">${product.price.toFixed(2)}</span>
            <button
              className="add-button"
              onClick={() => dispatch(addToCart(product))}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
