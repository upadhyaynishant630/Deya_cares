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
import useCart from './hooks/useCart';
import './App.css';

// Cart state now lives here, so Shop/Home/ProductDetails/About (addToCart)
// and the Navbar + Bag drawer all share the same data.
// Props from main.jsx (cart, addToCart) are no longer needed.
export default function App() {
  const { cartItems, addToCart, updateQuantity, removeItem } = useCart();

  return (
    <>
      <Navbar
        cartItems={cartItems}
        addToCart={addToCart}
        onUpdateQuantity={updateQuantity}
        onRemoveItem={removeItem}
      />
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
