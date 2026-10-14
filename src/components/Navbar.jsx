import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import {
  ArrowRight,
  Menu,
  Search,
  ShoppingBag,
  Sparkles,
  X,
} from 'lucide-react';
import Bag from '../pages/Bag';
import Login from '../pages/Login';
import './Navbar.css';

const PROMO_MESSAGES = [
  'Free shipping on orders above ₹400',
  'Thoughtful skincare made for Indian skin',
  'Find your everyday skincare ritual',
];

const PROMO_INTERVAL_MS = 4200;
const LOGO_SRC = '/images/logo/deya-logo.png';

const NAV_ITEMS = [
  { label: 'Shop', to: '/shop' },
  { label: 'About us', to: '/about' },
  { label: 'Blog', to: '/blog' },
  { label: 'Contact', to: '/contact' },
];

function getEntryQuantity(entry) {
  const product = entry?.product ?? entry?.item ?? entry;
  const rawQuantity = entry?.quantity ?? entry?.qty ?? product?.quantity ?? 1;
  const quantity = Number(rawQuantity);
  return Number.isFinite(quantity) && quantity > 0 ? Math.floor(quantity) : 1;
}

function getSafeCount(count) {
  const value = Number(count);
  return Number.isFinite(value) ? Math.max(0, Math.floor(value)) : 0;
}

export default function Navbar({
  count = 0,
  cartItems,
  addToCart = () => {},
  onUpdateQuantity = () => {},
  onRemoveItem = () => {},
  onCheckout,
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [bagOpen, setBagOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const [promoIndex, setPromoIndex] = useState(0);
  const location = useLocation();

  const closeMenu = useCallback(() => setMenuOpen(false), []);
  const closeBag = useCallback(() => setBagOpen(false), []);
  const closeLogin = useCallback(() => setLoginOpen(false), []);

  // Use the shared cart array when provided; retain compatibility with count-only callers.
  const safeCount = useMemo(() => {
    if (!Array.isArray(cartItems)) return getSafeCount(count);
    return cartItems.reduce((total, entry) => total + getEntryQuantity(entry), 0);
  }, [cartItems, count]);

  const bagLabel = `Open shopping bag with ${safeCount} ${safeCount === 1 ? 'item' : 'items'}`;

  // Close overlays after navigation so they never remain open on another page.
  useEffect(() => {
    setMenuOpen(false);
    setBagOpen(false);
    setLoginOpen(false);
  }, [location.pathname]);

  // Rotate announcement messages and clear the interval when the navbar unmounts.
  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setPromoIndex((current) => (current + 1) % PROMO_MESSAGES.length);
    }, PROMO_INTERVAL_MS);

    return () => window.clearInterval(intervalId);
  }, []);

  // Support Escape for the mobile menu. The bag drawer handles its own Escape key.
  useEffect(() => {
    if (!menuOpen) return undefined;

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') closeMenu();
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [menuOpen, closeMenu]);

  const handleAccountClick = (event) => {
    event.preventDefault();
    closeMenu();
    setLoginOpen(true);
  };

  const openBag = () => {
    closeMenu();
    setBagOpen(true);
  };

  return (
    <>
      <header className="site-header">
        <div className="announcement" role="region" aria-label="Store announcements">
          <span className="announcement-tag">
            <Sparkles size={13} strokeWidth={1.9} aria-hidden="true" />
            <span>DEYA NOTES</span>
          </span>

          <div className="announcement-message" aria-live="off">
            <span className="announcement-message-text" key={promoIndex}>
              {PROMO_MESSAGES[promoIndex]}
            </span>
          </div>

          <Link className="announcement-link" to="/shop" onClick={closeMenu}>
            <span>Shop now</span>
            <ArrowRight size={14} strokeWidth={2} aria-hidden="true" />
          </Link>
        </div>

        <div className="nav-shell">
          <div className="nav-wrap">
            <button
              className="icon-button mobile-menu"
              type="button"
              aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-controls="primary-navigation"
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((isOpen) => !isOpen)}
            >
              {menuOpen ? (
                <X size={21} strokeWidth={1.8} aria-hidden="true" />
              ) : (
                <Menu size={21} strokeWidth={1.8} aria-hidden="true" />
              )}
            </button>

            <Link to="/" className="wordmark" aria-label="Deya Care home" onClick={closeMenu}>
              <span className="wordmark-image-wrap">
                <img src={LOGO_SRC} alt="Deya Care" />
              </span>
            </Link>

            <nav
              id="primary-navigation"
              className={`main-nav${menuOpen ? ' is-open' : ''}`}
              aria-label="Main navigation"
            >
              {NAV_ITEMS.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  onClick={closeMenu}
                  className={({ isActive }) =>
                    isActive ? 'nav-link is-active' : 'nav-link'
                  }
                >
                  {item.label}
                </NavLink>
              ))}
            </nav>

            <div className="nav-actions">
              <Link
                to="/login"
                className="account-link"
                onClick={handleAccountClick}
                aria-haspopup="dialog"
              >
                Account
              </Link>

              <Link
                to="/shop"
                className="icon-button search-button"
                aria-label="Search products"
                onClick={closeMenu}
              >
                <Search size={19} strokeWidth={1.8} aria-hidden="true" />
              </Link>

              <button
                type="button"
                className="bag-link"
                aria-label={bagLabel}
                aria-haspopup="dialog"
                aria-expanded={bagOpen}
                onClick={openBag}
              >
                <span className="bag-icon-wrap">
                  <ShoppingBag size={19} strokeWidth={1.8} aria-hidden="true" />
                  <span className="bag-count" aria-hidden="true">
                    {safeCount > 99 ? '99+' : safeCount}
                  </span>
                </span>
                <span className="bag-label">Bag</span>
              </button>
            </div>
          </div>
        </div>

        {menuOpen && (
          <button
            className="nav-backdrop"
            type="button"
            aria-label="Close navigation menu"
            onClick={closeMenu}
          />
        )}
      </header>

      <Bag
        isOpen={bagOpen}
        onClose={closeBag}
        cartItems={Array.isArray(cartItems) ? cartItems : []}
        addToCart={addToCart}
        onUpdateQuantity={onUpdateQuantity}
        onRemoveItem={onRemoveItem}
        onCheckout={onCheckout}
      />

      <Login isOpen={loginOpen} onClose={closeLogin} logoSrc={LOGO_SRC} />
    </>
  );
}
