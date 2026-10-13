import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Shop from './pages/Shop';
import ProductDetails from './pages/ProductDetails';
import About from './pages/About';
import Blog from './pages/Blog';
import Contact from './pages/Contact';
import Login from './pages/Login';
import FloatingActions from './components/FloatingActions';
import './App.css';

export default function App({ cart, addToCart }) {
  return (
    <>
      <Navbar count={cart.length} />
      <Routes>
        <Route path="/" element={<Home addToCart={addToCart} />} />
        <Route path="/shop" element={<Shop addToCart={addToCart} />} />
        <Route path="/product/:id" element={<ProductDetails addToCart={addToCart} />} />
        <Route path="/about" element={<About addToCart={addToCart} />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<Home addToCart={addToCart} />} />
      </Routes>
      <Footer />
      <FloatingActions />
    </>
  );
}
