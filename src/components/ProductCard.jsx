import React, { useState } from 'react';
import { ArrowRight, ImageOff, ShoppingBag, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import './ProductCard.css';

const formatPrice = (value) => {
  const amount = Number(value);

  if (!Number.isFinite(amount)) return null;

  return new Intl.NumberFormat('en-IN', {
    minimumFractionDigits: Number.isInteger(amount) ? 0 : 2,
    maximumFractionDigits: 2,
  }).format(amount);
};

export default function ProductCard({ product, addToCart = () => {} }) {
  const [imageFailed, setImageFailed] = useState(false);

  if (!product) return null;

  const productId = product.id;
  const productName = product.name || 'Deya Care essential';
  const salePrice = formatPrice(product.price);
  const originalPrice = formatPrice(product.originalPrice);
  const hasDiscount =
    salePrice !== null &&
    originalPrice !== null &&
    Number(product.originalPrice) > Number(product.price);

  const discountPercent = hasDiscount
    ? Math.round(
        ((Number(product.originalPrice) - Number(product.price)) /
          Number(product.originalPrice)) *
          100
      )
    : 0;

  const productUrl = `/product/${productId}`;

  return (
    <article className="product-card">
      <Link
        to={productUrl}
        className="product-image"
        aria-label={`View ${productName}`}
      >
        {!imageFailed && product.image ? (
          <img
            src={product.image}
            alt={productName}
            loading="lazy"
            onError={() => setImageFailed(true)}
          />
        ) : (
          <span className="product-image-fallback" aria-label="Image unavailable">
            <ImageOff size={30} strokeWidth={1.5} />
            <span>Image coming soon</span>
          </span>
        )}

        <span className="product-image-glow" aria-hidden="true" />

        {product.badge && (
          <span className="product-badge">
            <Sparkles size={11} />
            {product.badge}
          </span>
        )}

        {hasDiscount && discountPercent > 0 && (
          <span className="product-discount">-{discountPercent}%</span>
        )}

        <span className="product-view-hint">
          View product <ArrowRight size={14} />
        </span>
      </Link>

      <div className="product-content">
        <div className="product-info">
          <div className="product-heading">
            <Link to={productUrl} className="product-name-link">
              <h3>{productName}</h3>
            </Link>
            {product.size && <p className="product-size">{product.size}</p>}
          </div>

          <div className="product-pricing" aria-label="Product price">
            {salePrice !== null ? (
              <strong className="product-price">₹{salePrice}</strong>
            ) : (
              <strong className="product-price">Price on request</strong>
            )}

            {hasDiscount && (
              <del className="product-original-price">₹{originalPrice}</del>
            )}
          </div>
        </div>

        {product.description && (
          <p className="product-desc">{product.description}</p>
        )}

        {hasDiscount && discountPercent > 0 && (
          <p className="product-savings">
            <Sparkles size={12} /> You save ₹
            {formatPrice(Number(product.originalPrice) - Number(product.price))}
          </p>
        )}

        <button
          type="button"
          className="text-button"
          onClick={() => addToCart(product)}
          aria-label={`Add ${productName} to bag`}
        >
          <span className="text-button-label">
            <ShoppingBag size={15} strokeWidth={1.8} />
            Add to bag
          </span>
          <span className="text-button-arrow" aria-hidden="true">
            <ArrowRight size={16} />
          </span>
        </button>
      </div>
    </article>
  );
}
