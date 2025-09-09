// src/pages/CartPage.js
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  increaseItem,
  decreaseItem,
  deleteItem,
} from "../features/cart/cartSlice";
import { Link } from "react-router-dom";

const CartPage = () => {
  const dispatch = useDispatch();
  const items = useSelector((state) => Object.values(state.cart.items));
  const totalQuantity = useSelector((state) => state.cart.totalQuantity);
  const totalPrice = useSelector((state) => state.cart.totalPrice);

  return (
    <div className='container' style={{ padding: 16 }}>
      <h1>Shopping Cart</h1>
      <p>Total Plants: {totalQuantity}</p>
      <p>Total Cost: ${totalPrice.toFixed(2)}</p>
      {items.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className='panel' style={{ padding: 12 }}>
          {items.map((item) => (
            <div
              key={item.id}
              style={{
                display: "flex",
                alignItems: "center",
                padding: "12px 0",
                borderBottom: "1px solid var(--border)",
              }}
            >
              <img
                src={item.thumbnail}
                alt={item.name}
                style={{
                  width: 96,
                  height: 96,
                  objectFit: "cover",
                  borderRadius: 10,
                  marginRight: 12,
                }}
              />
              <div style={{ flexGrow: 1 }}>
                <h3>{item.name}</h3>
                <p>Unit Price: ${item.price}</p>
                <div className='row'>
                  <button
                    className='btn btn-secondary'
                    onClick={() => dispatch(decreaseItem(item.id))}
                    disabled={item.quantity === 1}
                  >
                    -
                  </button>
                  <span style={{ minWidth: 28, textAlign: "center" }}>{item.quantity}</span>
                  <button
                    className='btn btn-secondary'
                    onClick={() => dispatch(increaseItem(item.id))}
                  >
                    +
                  </button>
                </div>
                <p style={{ marginTop: 8 }}>
                  Subtotal: ${(item.price * item.quantity).toFixed(2)}
                </p>
              </div>
              <button
                className='btn btn-danger'
                onClick={() => dispatch(deleteItem(item.id))}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
      <div style={{ marginTop: 24 }}>
        <button className='btn btn-primary' onClick={() => alert("Coming Soon")}>Checkout</button>
        <Link to='/products'>
          <button className='btn btn-secondary' style={{ marginLeft: 12 }}>Continue Shopping</button>
        </Link>
      </div>
    </div>
  );
};

export default CartPage;
