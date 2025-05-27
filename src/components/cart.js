import React from "react";
import "../App.css";

const Cart = ({ item, onAdd, onRemove }) => {
  return (
    <div className="cart-item">
      <span>
        {item.title} - ${item.price.toFixed(2)} × {item.quantity}
      </span>
      <div>
        <button onClick={() => onRemove(item.id)}>-</button>
        <button onClick={() => onAdd(item)}>+</button>
      </div>
    </div>
  );
};

export default Cart;
