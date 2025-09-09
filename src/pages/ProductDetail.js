import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import plants from "../data/plants";
import { useDispatch, useSelector } from "react-redux";
import { addMany } from "../features/cart/cartSlice";

const ProductDetail = () => {
  const { id } = useParams();
  const plant = plants.find((p) => p.id === id);
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const [qty, setQty] = useState(1);

  if (!plant) return <div style={{ padding: 16 }}>Product not found</div>;

  const handleAdd = () => {
    dispatch(addMany({ plant, quantity: qty }));
  };

  return (
    <div className='container' style={{ padding: 16 }}>
      <Link to='/products'>← Back to products</Link>
      <div style={{ display: "flex", gap: 24, marginTop: 16, flexWrap: "wrap" }}>
        <img src={plant.thumbnail} alt={plant.name} style={{ width: 360, borderRadius: 12 }} />
        <div className='panel' style={{ padding: 16, maxWidth: 520 }}>
          <h1>{plant.name}</h1>
          <p className='price' style={{ fontSize: 20 }}>${plant.price.toFixed(2)}</p>
          <p>Category: {plant.category}</p>
          <p>
            A resilient, air-purifying plant perfect for brightening your indoor spaces.
          </p>

          <div className='row mt-16'>
            <label htmlFor='qty'>Quantity:</label>
            <input
              id='qty'
              className='input'
              type='number'
              min={1}
              value={qty}
              onChange={(e) => setQty(Math.max(1, Number(e.target.value) || 1))}
              style={{ width: 90 }}
            />
            <button
              className='btn btn-primary'
              onClick={handleAdd}
              disabled={Boolean(cartItems[plant.id])}
            >
              {cartItems[plant.id] ? "Already in cart" : `Add ${qty} to Cart`}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
