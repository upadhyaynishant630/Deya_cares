import React, { useMemo, useState, useEffect } from 'react';
import { ChevronDown, ChevronLeft, ChevronRight, RotateCcw, Search, SlidersHorizontal, X } from 'lucide-react';
import { products } from '../data/products';
import ProductCard from '../components/ProductCard';
import './Shop.css';

const CATEGORIES = ['All', 'Cleanse', 'Hydrate', 'Protect', 'Treat', 'Nourish', 'Sets'];
const PAGE_SIZE = 9;
const MAX_PRICE = 5000;

const safeText = (value) => (value == null ? '' : String(value));
const safePrice = (value) => {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : null;
};

export default function Shop({ addToCart }) {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All');
  const [sort, setSort] = useState('Featured');
  const [maxPrice, setMaxPrice] = useState(MAX_PRICE);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [page, setPage] = useState(1);

  const normalizedQuery = query.trim().toLowerCase();

  const filtered = useMemo(() => {
    const matching = products.filter((product) => {
      const productCategory = safeText(product.category);
      const searchableText = `${safeText(product.name)} ${safeText(product.description)} ${productCategory}`.toLowerCase();
      const price = safePrice(product.price);
      const matchesCategory = category === 'All' || productCategory === category;
      const matchesQuery = !normalizedQuery || searchableText.includes(normalizedQuery);
      const matchesPrice = price === null || price <= maxPrice;

      return matchesCategory && matchesQuery && matchesPrice;
    });

    if (sort === 'Price: low to high') {
      matching.sort((a, b) => (safePrice(a.price) ?? Number.MAX_SAFE_INTEGER) - (safePrice(b.price) ?? Number.MAX_SAFE_INTEGER));
    } else if (sort === 'Price: high to low') {
      matching.sort((a, b) => (safePrice(b.price) ?? -1) - (safePrice(a.price) ?? -1));
    }

    return matching;
  }, [category, maxPrice, normalizedQuery, sort]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const visibleProducts = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  const rangeStart = filtered.length === 0 ? 0 : (page - 1) * PAGE_SIZE + 1;
  const rangeEnd = Math.min(page * PAGE_SIZE, filtered.length);
  const activeFilterCount = Number(category !== 'All') + Number(maxPrice < MAX_PRICE);

  useEffect(() => {
    setPage(1);
  }, [normalizedQuery, category, sort, maxPrice]);

  const resetFilters = () => {
    setQuery('');
    setCategory('All');
    setSort('Featured');
    setMaxPrice(MAX_PRICE);
    setPage(1);
  };

  return (
    <main className="shop-page">
      <div className="shop-shell">
        <div className="shop-banner-wrap">
          <img
            className="shop-banner"
            src="/images/banners/shop-header.jpg"
            alt="Deya Care skincare collection"
            fetchPriority="high"
          />
          <div className="shop-banner-shade" aria-hidden="true" />
          <div className="shop-banner-caption">
            <span className="shop-banner-kicker">YOUR SKIN, YOUR RITUAL</span>
            <span className="shop-banner-title">Find your everyday essentials.</span>
          </div>
        </div>

        <header className="shop-heading">
          <div className="shop-heading-copy">
            <p className="shop-eyebrow"><span /> THE DEYA CARE COLLECTION</p>
            <h1>Shop Skincare <em>Essentials</em></h1>
            <p className="shop-heading-description">
              Clean, effective skincare crafted for every skin type. Find the little things that make your daily ritual feel like you.
            </p>
          </div>
          <div className="shop-shipping-note">
            <span className="shop-shipping-icon" aria-hidden="true">✦</span>
            <span><strong>A little extra care</strong><small>Free shipping on orders above ₹400</small></span>
          </div>
        </header>

        <div className="shop-main-layout">
          <aside className={`shop-filter-panel${filtersOpen ? ' is-open' : ''}`} aria-label="Product filters">
            <div className="shop-filter-heading">
              <div>
                <SlidersHorizontal size={17} aria-hidden="true" />
                <h2>Filters</h2>
                {activeFilterCount > 0 && <span className="shop-filter-count">{activeFilterCount}</span>}
              </div>
              <button className="shop-reset-button" type="button" onClick={resetFilters}>
                <RotateCcw size={13} aria-hidden="true" /> Reset
              </button>
              <button className="shop-filter-close" type="button" aria-label="Close filters" onClick={() => setFiltersOpen(false)}>
                <X size={18} />
              </button>
            </div>

            <div className="shop-filter-group">
              <h3>Category</h3>
              <div className="shop-category-options">
                {CATEGORIES.map((item) => (
                  <button
                    className={`shop-category-option${category === item ? ' is-active' : ''}`}
                    type="button"
                    key={item}
                    aria-pressed={category === item}
                    onClick={() => {
                      setCategory(item);
                      setFiltersOpen(false);
                    }}
                  >
                    <span className="shop-radio-mark" aria-hidden="true" />
                    <span>{item === 'All' ? 'All products' : item}</span>
                    {category === item && <span className="shop-option-check" aria-hidden="true">✓</span>}
                  </button>
                ))}
              </div>
            </div>

            <div className="shop-filter-group shop-price-filter">
              <div className="shop-filter-group-title">
                <h3>Price range</h3>
                <span>INR</span>
              </div>
              <input
                className="shop-price-range"
                type="range"
                min="0"
                max={MAX_PRICE}
                step="50"
                value={maxPrice}
                aria-label="Maximum product price"
                onChange={(event) => setMaxPrice(Number(event.target.value))}
              />
              <div className="shop-price-labels">
                <span>₹0</span>
                <strong>Up to ₹{maxPrice.toLocaleString('en-IN')}</strong>
              </div>
            </div>

            <div className="shop-filter-note">
              <span aria-hidden="true">♡</span>
              <p><strong>Skincare, made simpler.</strong> Explore products to build a routine that works for you.</p>
            </div>
          </aside>

          {filtersOpen && (
            <button className="shop-filter-backdrop" type="button" aria-label="Close filters" onClick={() => setFiltersOpen(false)} />
          )}

          <section className="shop-results" aria-label="Shop products">
            <div className="shop-toolbar">
              <button className="shop-mobile-filter-button" type="button" onClick={() => setFiltersOpen(true)} aria-expanded={filtersOpen}>
                <SlidersHorizontal size={16} aria-hidden="true" /> Filters
                {activeFilterCount > 0 && <span>{activeFilterCount}</span>}
              </button>

              <label className="shop-search-field">
                <Search size={17} aria-hidden="true" />
                <input
                  type="search"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Search products..."
                  aria-label="Search products"
                />
                {query && (
                  <button type="button" className="shop-clear-search" onClick={() => setQuery('')} aria-label="Clear search">
                    <X size={15} />
                  </button>
                )}
              </label>

              <label className="shop-sort-field">
                <span>Sort by</span>
                <span className="shop-sort-select-wrap">
                  <select value={sort} onChange={(event) => setSort(event.target.value)} aria-label="Sort products">
                    <option>Featured</option>
                    <option>Price: low to high</option>
                    <option>Price: high to low</option>
                  </select>
                  <ChevronDown size={15} aria-hidden="true" />
                </span>
              </label>
            </div>

            <div className="shop-results-meta" aria-live="polite">
              <p>
                Showing{' '}
                <strong>{filtered.length === 0 ? '0' : `${rangeStart}–${rangeEnd}`}</strong>
                {filtered.length > 0 && <> of <strong>{filtered.length}</strong></>}
                {filtered.length === 1 ? ' product' : ' products'}
              </p>
              {category !== 'All' && (
                <button className="shop-active-filter" type="button" onClick={() => setCategory('All')}>
                  {category} <X size={12} aria-hidden="true" />
                </button>
              )}
              {maxPrice < MAX_PRICE && (
                <button className="shop-active-filter" type="button" onClick={() => setMaxPrice(MAX_PRICE)}>
                  Up to ₹{maxPrice.toLocaleString('en-IN')} <X size={12} aria-hidden="true" />
                </button>
              )}
            </div>

            {visibleProducts.length > 0 ? (
              <div className="product-grid shop-grid">
                {visibleProducts.map((product, index) => (
                  <div className="shop-product-item" key={product.id ?? `${product.name}-${index}`} style={{ '--shop-card-index': index }}>
                    <ProductCard product={product} addToCart={addToCart} />
                  </div>
                ))}
              </div>
            ) : (
              <div className="shop-empty-state">
                <span className="shop-empty-icon"><Search size={25} aria-hidden="true" /></span>
                <p className="shop-eyebrow">NO MATCHES THIS TIME</p>
                <h2>Nothing found just yet.</h2>
                <p>Try a different search or reset your filters to browse the full collection.</p>
                <button type="button" className="shop-empty-reset" onClick={resetFilters}>View all products <ArrowRightIcon /></button>
              </div>
            )}

            {totalPages > 1 && (
              <nav className="shop-pagination" aria-label="Product pages">
                <button type="button" aria-label="Previous page" disabled={page === 1} onClick={() => setPage((current) => Math.max(1, current - 1))}>
                  <ChevronLeft size={17} />
                </button>
                {Array.from({ length: totalPages }, (_, index) => index + 1).map((pageNumber) => (
                  <button
                    type="button"
                    key={pageNumber}
                    className={page === pageNumber ? 'is-active' : ''}
                    aria-current={page === pageNumber ? 'page' : undefined}
                    onClick={() => setPage(pageNumber)}
                  >
                    {pageNumber}
                  </button>
                ))}
                <button type="button" aria-label="Next page" disabled={page === totalPages} onClick={() => setPage((current) => Math.min(totalPages, current + 1))}>
                  <ChevronRight size={17} />
                </button>
              </nav>
            )}
          </section>
        </div>
      </div>
    </main>
  );
}

function ArrowRightIcon() {
  return <ChevronRight size={16} aria-hidden="true" />;
}
