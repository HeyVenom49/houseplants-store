// src/pages/ProductListing.js
import React, { useState } from "react";
import plants from "../data/plants";
import { useDispatch, useSelector } from "react-redux";
import { addMany } from "../features/cart/cartSlice";
import { Link } from "react-router-dom";

const ProductListing = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const [quantities, setQuantities] = useState({});

  const groupedPlants = plants.reduce((groups, plant) => {
    if (!groups[plant.category]) {
      groups[plant.category] = [];
    }
    groups[plant.category].push(plant);
    return groups;
  }, {});

  // ...existing code... (handleAddToCart removed in favor of addMany)

  return (
    <div className='container' style={{ padding: "16px 0 32px" }}>
      {Object.entries(groupedPlants).map(([category, plants]) => (
        <div key={category} className='mb-16'>
          <h2>{category}</h2>
          <div className='grid grid-3'>
            {plants.map((plant) => (
              <div key={plant.id} className='card'>
                <img
                  src={plant.thumbnail}
                  alt={plant.name}
                  style={{ height: 160, width: "100%", objectFit: "cover" }}
                />
                <div className='card-body'>
                  <h3>{plant.name}</h3>
                  <p className='price'>
                    ${plant.price.toFixed ? plant.price.toFixed(2) : plant.price}
                  </p>
                  <div className='row'>
                    <input
                      className='input'
                      aria-label={`qty-${plant.id}`}
                      type='number'
                      min={1}
                      value={quantities[plant.id] || 1}
                      onChange={(e) =>
                        setQuantities((s) => ({
                          ...s,
                          [plant.id]: Math.max(1, Number(e.target.value) || 1),
                        }))
                      }
                      style={{ width: 70 }}
                    />
                    <button
                      className='btn btn-primary'
                      onClick={() => {
                        const q = quantities[plant.id] || 1;
                        dispatch(addMany({ plant, quantity: q }));
                      }}
                      disabled={Boolean(cartItems[plant.id])}
                    >
                      {cartItems[plant.id] ? "Added" : "Add"}
                    </button>
                  </div>
                  <div className='mt-16'>
                    <Link to={`/products/${plant.id}`}>View details</Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductListing;
