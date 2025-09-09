// src/components/Header.js
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const CartIcon = ({ count }) => {
  const [bump, setBump] = useState(false);

  useEffect(() => {
    if (count > 0) {
      setBump(true);
      const t = setTimeout(() => setBump(false), 300);
      return () => clearTimeout(t);
    }
  }, [count]);

  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <svg
        width='28'
        height='28'
        viewBox='0 0 24 24'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
        style={{ marginRight: 8 }}
      >
        <path
          d='M7 4h-2l-1 2v2h2l3.6 7.59-1.35 2.45A1 1 0 0 0 9 19h9v-2H9.42a.25.25 0 0 1-.22-.13L9.1 16h7.45a1 1 0 0 0 .9-.55l3.24-6.13A1 1 0 0 0 20.7 8H6.21'
          fill='#2d6a4f'
        />
      </svg>
      <div
        aria-live='polite'
        className='panel'
        style={{
          minWidth: 36,
          textAlign: "center",
          padding: "4px 8px",
          borderRadius: 999,
          backgroundColor: "#fff",
          color: "#2d6a4f",
          fontWeight: "bold",
          transform: bump ? "scale(1.15)" : "scale(1)",
          transition: "transform 200ms ease",
        }}
      >
        {count}
      </div>
    </div>
  );
};

const Header = () => {
  const totalQuantity = useSelector((state) => state.cart.totalQuantity);

  return (
    <header className='site-header'>
      <div className='site-header-inner container'>
        <nav className='nav'>
          <Link to='/' className='brand'>GreenThumb</Link>
          <Link to='/products'>Products</Link>
          <Link to='/cart'>Cart</Link>
        </nav>
        <CartIcon count={totalQuantity} />
      </div>
    </header>
  );
};

export default Header;
