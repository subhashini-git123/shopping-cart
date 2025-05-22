import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeOneFromCart } from "../redux/cartSlice";

const Cart = () => {
  const dispatch = useDispatch();
  const { cart } = useSelector((state) => state.cart);

  return (
    <div className="product-container">
      <h1 className="cart-title">Cart</h1>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        cart.map((item) => (
          <div className="cart-item" key={item.id}>
            <span>
              {item.title} - ${item.price.toFixed(2)} * {item.quantity}
            </span>
            <div>
              <button onClick={() => dispatch(removeOneFromCart(item.id))}>
                -
              </button>
              <button onClick={() => dispatch(addToCart(item))}>+</button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Cart;
