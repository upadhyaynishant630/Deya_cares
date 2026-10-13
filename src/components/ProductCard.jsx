import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import './ProductCard.css';

export default function ProductCard({ product, addToCart = () => {} }) {
  const salePrice = Number(product.price);
  const originalPrice = Number(product.originalPrice);
  const formatPrice = (value) => value.toLocaleString('en-IN', { minimumFractionDigits: value % 1 ? 2 : 0, maximumFractionDigits: 2 });

  return <article className="product-card"><Link to={`/product/${product.id}`} className="product-image"><img src={product.image} alt={product.name} />{product.badge && <span className="badge">{product.badge}</span>}</Link><div className="product-info"><div><Link to={`/product/${product.id}`}><h3>{product.name}</h3></Link><p>{product.size}</p></div><strong>₹{formatPrice(salePrice)} {originalPrice > salePrice && <del>₹{formatPrice(originalPrice)}</del>}</strong></div><p className="product-desc">{product.description}</p><button className="text-button" onClick={() => addToCart(product)}>Add to bag <ArrowRight size={15} /></button></article>;
}
