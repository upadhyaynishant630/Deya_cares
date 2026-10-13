import React, { useState } from 'react';
import { ArrowRight, Check } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { products } from '../data/products';
import './ProductDetails.css';

export default function ProductDetails({ addToCart }) {
  const { id } = useParams();
  const product = products.find((item) => item.id === id);
  const [added, setAdded] = useState(false);
  if (!product) return <div className="section empty-state"><h1>Product not found</h1><Link to="/shop" className="underlink">Back to shop</Link></div>;
  return <main className="product-page section"><div className="breadcrumbs"><Link to="/shop">Shop</Link> / {product.name}</div><div className="product-detail"><div className="detail-image"><img src={product.image} alt={product.name} /></div><div className="detail-copy"><p className="eyebrow">{product.category} · {product.size}</p><h1>{product.name}</h1><p className="price">₹{product.price.toLocaleString('en-IN')}</p><p className="detail-lede">{product.description}</p><button className="button full" onClick={() => { addToCart(product); setAdded(true); }}>{added ? <><Check size={17} /> Added to bag</> : <>Add to bag <ArrowRight size={17} /></>}</button><div className="detail-notes"><div><b>Why you’ll love it</b><p>{product.details}</p></div><div><b>In the formula</b><p>{product.ingredients}</p></div></div><p className="source-note">Product information is brand-safe, illustrative copy for this concept storefront. Always check product packaging for current ingredient and usage details.</p></div></div></main>;
}
