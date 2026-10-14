import React, { useEffect, useMemo, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ArrowRight,
  Check,
  ChevronRight,
  Minus,
  Plus,
  ShoppingBag,
  ShoppingCart,
  Trash2,
  X,
} from 'lucide-react';
import { products } from '../data/products';
import './Bag.css';

const FREE_SHIPPING_THRESHOLD = 400;
const RECOMMENDED_IDS = [
  'cloud-screen',
  'glaze-drop',
  'luma-cleanse',
  'clearity-drop',
  'sweat-not',
  'blemish-be-gone',
];

const formatPrice = (value) => {
  const amount = Number(value);
  return `₹${(Number.isFinite(amount) ? amount : 0).toLocaleString('en-IN', {
    maximumFractionDigits: 2,
  })}`;
};

const getItemProduct = (item) => item?.product ?? item?.item ?? item ?? {};

const getItemQuantity = (item) => {
  const value = Number(item?.quantity ?? item?.qty ?? getItemProduct(item)?.quantity ?? 1);
  return Number.isFinite(value) && value > 0 ? Math.floor(value) : 1;
};

const getProductKey = (product) => product?.id ?? product?.slug ?? product?.name;

function normalizeCartItems(cartItems) {
  if (!Array.isArray(cartItems)) return [];

  return cartItems
    .map((entry) => {
      const product = getItemProduct(entry);
      if (!product || (!product.id && !product.name)) return null;
      return {
        ...product,
        quantity: getItemQuantity(entry),
        _cartKey: getProductKey(product),
      };
    })
    .filter(Boolean);
}

export default function Bag({
  isOpen = false,
  onClose = () => {},
  cartItems = [],
  addToCart = () => {},
  onUpdateQuantity = () => {},
  onRemoveItem = () => {},
  onCheckout,
}) {
  const navigate = useNavigate();
  const drawerRef = useRef(null);
  const closeButtonRef = useRef(null);
  const recommendationsRef = useRef(null);

  const normalizedItems = useMemo(() => normalizeCartItems(cartItems), [cartItems]);
  const itemCount = normalizedItems.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = normalizedItems.reduce(
    (sum, item) => sum + (Number(item.price) || 0) * item.quantity,
    0,
  );
  const shippingRemaining = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
  const shippingProgress = Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100);

  const recommendedProducts = useMemo(() => {
    const available = Array.isArray(products) ? products : [];
    const inCart = new Set(normalizedItems.map((item) => String(item._cartKey)));
    const byId = RECOMMENDED_IDS
      .map((id) => available.find((product) => product.id === id))
      .filter((product) => product && !inCart.has(String(getProductKey(product))));
    const additional = available.filter(
      (product) => product && !inCart.has(String(getProductKey(product))) && !byId.some((item) => item.id === product.id),
    );
    return [...byId, ...additional].slice(0, 6);
  }, [normalizedItems]);

  useEffect(() => {
    if (!isOpen) return undefined;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const focusFrame = window.requestAnimationFrame(() => closeButtonRef.current?.focus());

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        onClose();
        return;
      }

      if (event.key !== 'Tab' || !drawerRef.current) return;
      const focusable = drawerRef.current.querySelectorAll(
        'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );
      if (!focusable.length) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.cancelAnimationFrame(focusFrame);
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen, onClose]);

  const continueShopping = () => {
    onClose();
    navigate('/shop');
  };

  const handleQuantityChange = (item, nextQuantity) => {
    if (nextQuantity < 1) {
      onRemoveItem(item._cartKey, item);
      return;
    }
    onUpdateQuantity(item._cartKey, nextQuantity, item);
  };

  const scrollRecommendations = (direction) => {
    const track = recommendationsRef.current;
    if (!track) return;
    const card = track.querySelector('.deya-bag-pick');
    const cardWidth = card?.getBoundingClientRect().width ?? 230;
    track.scrollBy({ left: direction * (cardWidth + 12) * 1.5, behavior: 'smooth' });
  };

  const handleCheckout = () => {
    if (typeof onCheckout === 'function') {
      onCheckout(normalizedItems, subtotal);
      return;
    }
    onClose();
    navigate('/checkout');
  };

  if (!isOpen) return null;

  return (
    <div className="deya-bag-layer">
      <button
        className="deya-bag-backdrop"
        type="button"
        aria-label="Close shopping bag"
        onClick={onClose}
      />

      <aside
        className="deya-bag-drawer"
        role="dialog"
        aria-modal="true"
        aria-labelledby="deya-bag-title"
        ref={drawerRef}
      >
        <header className="deya-bag-header">
          <div>
            <span className="deya-bag-eyebrow">YOUR DEYA RITUAL</span>
            <h2 id="deya-bag-title">Your bag <span>({itemCount})</span></h2>
          </div>
          <button
            ref={closeButtonRef}
            className="deya-bag-close"
            type="button"
            onClick={onClose}
            aria-label="Close shopping bag"
          >
            <X size={21} aria-hidden="true" />
          </button>
        </header>

        {normalizedItems.length === 0 ? (
          <div className="deya-bag-empty-layout">
            <section className="deya-bag-empty" aria-live="polite">
              <div className="deya-bag-empty-icon" aria-hidden="true">
                <ShoppingCart size={52} strokeWidth={1.45} />
                <span><SparkleMark /></span>
              </div>
              <h3>Your bag is waiting for a little care.</h3>
              <p>Looks like you haven’t added anything to your ritual yet.</p>
              <button className="deya-bag-primary" type="button" onClick={continueShopping}>
                Continue shopping <ArrowRight size={16} aria-hidden="true" />
              </button>
            </section>

            <section className="deya-bag-picks" aria-labelledby="deya-bag-picks-title">
              <div className="deya-bag-picks-heading">
                <div>
                  <span className="deya-bag-eyebrow">A GOOD PLACE TO START</span>
                  <h3 id="deya-bag-picks-title">Top picks for you</h3>
                </div>
                <div className="deya-bag-pick-controls">
                  <button type="button" onClick={() => scrollRecommendations(-1)} aria-label="Scroll picks left">
                    <ChevronRight size={17} className="is-left" aria-hidden="true" />
                  </button>
                  <button type="button" onClick={() => scrollRecommendations(1)} aria-label="Scroll picks right">
                    <ChevronRight size={17} aria-hidden="true" />
                  </button>
                </div>
              </div>
              {recommendedProducts.length ? (
                <div className="deya-bag-picks-track" ref={recommendationsRef}>
                  {recommendedProducts.map((product) => (
                    <article className="deya-bag-pick" key={product.id ?? product.name}>
                      <Link
                        className="deya-bag-pick-image"
                        to={`/product/${product.id}`}
                        onClick={onClose}
                        aria-label={`View ${product.name}`}
                      >
                        <img src={product.image} alt={product.name} loading="lazy" />
                      </Link>
                      <div className="deya-bag-pick-info">
                        <Link to={`/product/${product.id}`} onClick={onClose} className="deya-bag-pick-name">
                          {product.name}
                        </Link>
                        <strong>{formatPrice(product.price)}</strong>
                        <button type="button" className="deya-bag-pick-add" onClick={() => addToCart(product)}>
                          <Plus size={14} aria-hidden="true" /> Add
                        </button>
                      </div>
                    </article>
                  ))}
                </div>
              ) : (
                <p className="deya-bag-no-picks">Explore the shop to discover your next skincare essential.</p>
              )}
            </section>
          </div>
        ) : (
          <>
            <div className="deya-bag-shipping" aria-live="polite">
              {shippingRemaining > 0 ? (
                <p>Add <strong>{formatPrice(shippingRemaining)}</strong> more for free shipping.</p>
              ) : (
                <p><Check size={15} aria-hidden="true" /> You’ve unlocked free shipping!</p>
              )}
              <div className="deya-bag-progress" aria-label={`${Math.round(shippingProgress)}% of the free shipping threshold reached`}>
                <span style={{ width: `${shippingProgress}%` }} />
              </div>
            </div>

            <div className="deya-bag-items" aria-label="Items in your bag">
              {normalizedItems.map((item) => (
                <article className="deya-bag-item" key={item._cartKey}>
                  <Link className="deya-bag-item-image" to={`/product/${item.id}`} onClick={onClose}>
                    <img src={item.image} alt={item.name} loading="lazy" />
                  </Link>
                  <div className="deya-bag-item-details">
                    <div className="deya-bag-item-title-row">
                      <Link to={`/product/${item.id}`} className="deya-bag-item-name" onClick={onClose}>{item.name}</Link>
                      <button className="deya-bag-remove" type="button" onClick={() => onRemoveItem(item._cartKey, item)} aria-label={`Remove ${item.name}`}>
                        <Trash2 size={15} aria-hidden="true" />
                      </button>
                    </div>
                    {item.category && <span className="deya-bag-item-category">{item.category}</span>}
                    <div className="deya-bag-item-bottom">
                      <div className="deya-bag-quantity" aria-label={`Quantity of ${item.name}`}>
                        <button type="button" aria-label={`Decrease ${item.name} quantity`} onClick={() => handleQuantityChange(item, item.quantity - 1)}>
                          <Minus size={13} aria-hidden="true" />
                        </button>
                        <span aria-live="polite">{item.quantity}</span>
                        <button type="button" aria-label={`Increase ${item.name} quantity`} onClick={() => handleQuantityChange(item, item.quantity + 1)}>
                          <Plus size={13} aria-hidden="true" />
                        </button>
                      </div>
                      <strong className="deya-bag-item-price">{formatPrice((Number(item.price) || 0) * item.quantity)}</strong>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            <footer className="deya-bag-footer">
              <div className="deya-bag-subtotal">
                <span>Subtotal</span>
                <strong>{formatPrice(subtotal)}</strong>
              </div>
              <p>Taxes and delivery are calculated at checkout.</p>
              <button className="deya-bag-primary deya-bag-checkout" type="button" onClick={handleCheckout}>
                Continue to checkout <ArrowRight size={16} aria-hidden="true" />
              </button>
              <button className="deya-bag-continue" type="button" onClick={continueShopping}>
                Continue shopping
              </button>
            </footer>
          </>
        )}
      </aside>
    </div>
  );
}

function SparkleMark() {
  return <span className="deya-bag-sparkle-mark" aria-hidden="true">✦</span>;
}
