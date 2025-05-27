import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { fetchProducts, addToCart, removeOneFromCart } from "./redux/cartSlice";

import Product from "./components/products";
import CartItem from "./components/cart";

const Home = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { products, cart, status } = useSelector((state) => state.cart);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };

  const handleRemoveFromCart = (id) => {
    dispatch(removeOneFromCart(id));
  };

  if (location.pathname === "/cart") {
    return (
      <div className="product-container">
        <h1 className="cart-title">Cart</h1>
        {cart.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          cart.map((item) => (
            <CartItem
              key={item.id}
              item={item}
              onAdd={handleAddToCart}
              onRemove={handleRemoveFromCart}
            />
          ))
        )}
      </div>
    );
  }

  return (
    <div className="product-container">
      <h2 className="product-heading">Products</h2>
      {status === "loading" && <p>Loading...</p>}
      {status === "failed" && <p>Failed to load products.</p>}
      <div className="product-item">
        {products.map((product) => (
          <Product
            key={product.id}
            product={product}
            onAddToCart={handleAddToCart}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;