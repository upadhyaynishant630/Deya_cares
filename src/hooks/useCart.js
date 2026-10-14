// src/hooks/useCart.js
import { useCallback, useEffect, useMemo, useState } from 'react';

const STORAGE_KEY = 'deya-cart-v1';
const MAX_QTY = 99;

// Same key logic as Bag.jsx (id ?? slug ?? name) so keys always match.
const getKey = (product) => product?.id ?? product?.slug ?? product?.name;

const toQty = (value) => {
  const n = Number(value);
  return Number.isFinite(n) && n > 0 ? Math.min(MAX_QTY, Math.floor(n)) : 1;
};

function loadCart() {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed
      .filter((item) => item && getKey(item) != null)
      .map((item) => ({ ...item, quantity: toQty(item.quantity) }));
  } catch {
    return [];
  }
}

export default function useCart() {
  const [cartItems, setCartItems] = useState(loadCart);

  // Persist cart (ignore storage errors, e.g. private mode).
  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(cartItems));
    } catch {
      /* ignore */
    }
  }, [cartItems]);

  // Accepts addToCart(product) or addToCart(product, qty).
  // Also safe if ProductCard accidentally passes a click event first.
  const addToCart = useCallback((product, quantity = 1) => {
    if (!product || typeof product !== 'object' || 'nativeEvent' in product) return;
    const key = getKey(product);
    if (key == null) return;
    const qty = toQty(quantity);

    setCartItems((prev) => {
      const index = prev.findIndex((item) => String(getKey(item)) === String(key));
      if (index === -1) {
        return [...prev, { ...product, quantity: qty }];
      }
      return prev.map((item, i) =>
        i === index ? { ...item, quantity: Math.min(MAX_QTY, toQty(item.quantity) + qty) } : item,
      );
    });
  }, []);

  // Bag calls onUpdateQuantity(key, nextQuantity, item)
  const updateQuantity = useCallback((key, nextQuantity) => {
    const qty = Math.floor(Number(nextQuantity));
    if (!Number.isFinite(qty)) return;
    setCartItems((prev) =>
      qty < 1
        ? prev.filter((item) => String(getKey(item)) !== String(key))
        : prev.map((item) =>
            String(getKey(item)) === String(key)
              ? { ...item, quantity: Math.min(MAX_QTY, qty) }
              : item,
          ),
    );
  }, []);

  // Bag calls onRemoveItem(key, item)
  const removeItem = useCallback((key) => {
    setCartItems((prev) => prev.filter((item) => String(getKey(item)) !== String(key)));
  }, []);

  const clearCart = useCallback(() => setCartItems([]), []);

  const totalCount = useMemo(
    () => cartItems.reduce((sum, item) => sum + toQty(item.quantity), 0),
    [cartItems],
  );
  const subtotal = useMemo(
    () => cartItems.reduce((sum, item) => sum + (Number(item.price) || 0) * toQty(item.quantity), 0),
    [cartItems],
  );

  return { cartItems, addToCart, updateQuantity, removeItem, clearCart, totalCount, subtotal };
}
