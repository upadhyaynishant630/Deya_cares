import React, { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, Search, ShoppingBag, X } from 'lucide-react';
import './Navbar.css';

export default function Navbar({ count = 0 }) {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  useEffect(() => setOpen(false), [location.pathname]);

  return (
    <header className="site-header">
      <div className="announcement">Free Shipping on Orders above ₹400 <span>·</span> Stress-aware skincare for Indian skin</div>
      <div className="nav-wrap">
        <button className="icon-button mobile-menu" aria-label="Open menu" onClick={() => setOpen(!open)}>
          {open ? <X /> : <Menu />}
        </button>
        <Link to="/" className="wordmark"><img src="/images/logo/deya-logo.png" alt="Deya Care" /></Link>
        <nav className={open ? 'main-nav is-open' : 'main-nav'} aria-label="Main navigation">
          <NavLink to="/shop">Shop</NavLink>
          <NavLink to="/about">About us</NavLink>
          <NavLink to="/blog">Blog</NavLink>
          <NavLink to="/contact">Contact</NavLink>
        </nav>
        <div className="nav-actions">
          <Link to="/login" className="account-link">Account</Link>
          <Link to="/shop" className="icon-button" aria-label="Search products"><Search /></Link>
          <Link to="/shop" className="bag-link" aria-label={`Shopping bag with ${count} items`}><ShoppingBag /><b>{count}</b></Link>
        </div>
      </div>
    </header>
  );
}
