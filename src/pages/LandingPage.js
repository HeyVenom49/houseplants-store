// src/pages/LandingPage.js
import React from "react";
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <div className='hero'>
      <div
        className='hero-bg'
        style={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1449247709967-d4461a6a6103?q=80&w=1600&auto=format&fit=crop)",
        }}
      />
      <div className='hero-overlay' />
      <div className='container hero-inner'>
        <div style={{ maxWidth: 720 }}>
          <h1 style={{ fontSize: 48, color: "#fff", marginBottom: 8 }}>
            GreenThumb Houseplants
          </h1>
          <p style={{ fontSize: 18, color: "#e8f6ee" }}>
            Healthy, air‑purifying plants delivered to your door. Curated for
            every light level and lifestyle.
          </p>
          <div className='row' style={{ marginTop: 16 }}>
            <Link to='/products'>
              <button className='btn btn-primary'>Shop now</button>
            </Link>
            <a href='#features'>
              <button className='btn btn-secondary'>Why plants?</button>
            </a>
          </div>
        </div>
      </div>
      <div id='features' className='container' style={{ marginTop: -40 }}>
        <div className='grid grid-3'>
          <div className='panel' style={{ padding: 16 }}>
            <h3>Beginner friendly</h3>
            <p>Low-maintenance picks that thrive with minimal care.</p>
          </div>
          <div className='panel' style={{ padding: 16 }}>
            <h3>Pet safe options</h3>
            <p>Choose from non-toxic varieties for furry friends.</p>
          </div>
          <div className='panel' style={{ padding: 16 }}>
            <h3>Fast shipping</h3>
            <p>Packed with care and delivered fresh to your home.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
