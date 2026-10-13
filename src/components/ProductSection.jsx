import React, { useEffect, useId, useMemo, useRef } from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import ProductCard from './ProductCard';
import './ProductSection.css';

const EMPTY_PRODUCTS = [];

/**
 * Responsive, animated product collection section for Deya Care.
 * Existing usage remains valid: <ProductSection products={products} addToCart={addToCart} />
 */
export default function ProductSection({
  products = EMPTY_PRODUCTS,
  addToCart,
  eyebrow = 'THE DEYA EDIT',
  title = 'Your everyday skincare favourites',
  description = 'Thoughtful essentials for little moments of care, every single day.',
  showHeader = true,
  showProductCount = true,
  viewAllLink = '/shop',
  viewAllLabel = 'Explore all skincare',
  className = '',
  id,
}) {
  const gridRef = useRef(null);
  const titleId = useId();
  const safeProducts = useMemo(
    () => (Array.isArray(products) ? products.filter(Boolean) : []),
    [products]
  );

  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return undefined;

    const items = Array.from(grid.querySelectorAll('.product-section-item'));
    if (!items.length) {
      return undefined;
    }

    // Keep content visible in browsers that do not implement IntersectionObserver.
    if (typeof IntersectionObserver === 'undefined') {
      items.forEach((item) => item.classList.add('is-visible'));
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -35px 0px' }
    );

    items.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, [safeProducts]);

  return (
    <section
      id={id}
      className={`section deya-product-section ${className}`.trim()}
      aria-labelledby={showHeader ? titleId : undefined}
    >
      <div className="deya-product-section-inner">
        {showHeader && (
          <header className="deya-product-section-header">
            <div className="deya-product-section-heading-copy">
              <span className="deya-product-section-eyebrow">
                <Sparkles size={14} aria-hidden="true" />
                {eyebrow}
              </span>
              <h2 id={titleId}>{title}</h2>
              {description && <p>{description}</p>}
            </div>

            {showProductCount && (
              <span className="deya-product-count" aria-live="polite">
                <strong>{safeProducts.length.toString().padStart(2, '0')}</strong>
                <span>{safeProducts.length === 1 ? 'essential' : 'essentials'}</span>
              </span>
            )}
          </header>
        )}

        {safeProducts.length > 0 ? (
          <div
            className="product-grid deya-product-grid"
            ref={gridRef}
          >
            {safeProducts.map((product, index) => (
              <div
                className="product-section-item"
                key={product.id ?? product.slug ?? `${product.name ?? 'product'}-${index}`}
                style={{ '--product-stagger': `${Math.min(index % 8, 7) * 65}ms` }}
              >
                <ProductCard product={product} addToCart={addToCart} />
              </div>
            ))}
          </div>
        ) : (
          <div className="deya-products-empty" role="status">
            <span className="deya-products-empty-icon">
              <Sparkles size={25} aria-hidden="true" />
            </span>
            <h3>Your next favourite is on its way.</h3>
            <p>There are no products to show here just yet. Come back soon for more skincare essentials.</p>
            <Link to={viewAllLink} className="deya-products-empty-link">
              {viewAllLabel} <ArrowRight size={16} />
            </Link>
          </div>
        )}

        {safeProducts.length > 0 && viewAllLink && (
          <div className="deya-product-section-footer">
            <Link className="deya-product-section-view-all" to={viewAllLink}>
              <span>{viewAllLabel}</span>
              <span className="deya-view-all-icon" aria-hidden="true">
                <ArrowRight size={16} />
              </span>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
