import React from 'react';
import ProductCard from './ProductCard';
import './ProductSection.css';

export default function ProductSection({ products = [], addToCart }) {
  return <section className="section"><div className="product-grid">{products.map(product => <ProductCard key={product.id} product={product} addToCart={addToCart} />)}</div></section>;
}
