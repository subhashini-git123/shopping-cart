import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts, addToCart, removeOneFromCart } from "./redux/cartSlice";

const App = () => {
  const dispatch = useDispatch();
  const { products, cart, status } = useSelector((state) => state.cart);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <div className="container">
      <h2>Products</h2>
      {status === "loading" && <p>Loading...</p>}
      {status === "failed" && <p className="empty">Failed to load products.</p>}

      {products.map((product) => (
        <div className="product" key={product.id}>
          <p>
            {product.title} - ${product.price.toFixed(2)}
          </p>
          <button onClick={() => dispatch(addToCart(product))}>
            Add to Cart
          </button>
        </div>
      ))}

      <h2>Cart</h2>
      {cart.length === 0 ? (
        <p className="empty">Your cart is empty.</p>
      ) : (
        cart.map((item) => (
          <div className="cart-item" key={item.id}>
            <p>
              {item.title} - ${item.price.toFixed(2)} * {item.quantity}
            </p>
            <div>
              <button onClick={() => dispatch(removeOneFromCart(item.id))}>
                −
              </button>
              <button onClick={() => dispatch(addToCart(item))}>+</button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default App;
