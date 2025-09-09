// src/App.js
import React from "react";
import { Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import ProductListing from "./pages/ProductListing";
import ProductDetail from "./pages/ProductDetail";
import CartPage from "./pages/CartPage";
import Header from "./components/Header";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route
          path='/'
          element={<LandingPage />}
        />
        <Route
          path='/products'
          element={<ProductListing />}
        />
        <Route
          path='/products/:id'
          element={<ProductDetail />}
        />
        <Route
          path='/cart'
          element={<CartPage />}
        />
      </Routes>
    </>
  );
}

export default App;
