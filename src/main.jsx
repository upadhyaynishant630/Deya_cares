import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';

function Root() {
  const [cart, setCart] = useState([]);
  const addToCart = (product) => setCart((items) => [...items, product]);
  return <App cart={cart} addToCart={addToCart} />;
}

createRoot(document.getElementById('root')).render(
  <React.StrictMode><BrowserRouter><Root /></BrowserRouter></React.StrictMode>
);
