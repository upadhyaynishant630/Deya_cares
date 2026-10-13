import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { products } from '../data/products';
import Hero from '../components/Hero';
import ProductCard from '../components/ProductCard';
import Newsletter from '../components/Newsletter';
import './Home.css';

export default function Home({ addToCart }) {
  return <main>
    <Hero />
    <section className="customer-loved section"><div className="section-heading"><div><p className="eyebrow">Customer favourites</p><h2>What customers loved the most</h2></div><Link className="underlink" to="/shop">View all <ArrowRight size={16} /></Link></div><div className="product-grid">{products.slice(0, 4).map((product) => <ProductCard key={product.id} product={product} addToCart={addToCart} />)}</div></section>
    <section className="review-highlight section"><p className="eyebrow">Review highlight of all products</p><h2>Real routines. Real results.</h2><div className="review-grid">{[['Very excellent product', 'smooth texture, lightweight feel and a good addition to my skincare routine.', 'Tamanna Baitharu'], ['Very gentle on the skin', 'Hydrates and cleanses the skin nicely.', 'Jyoti Jindal'], ['Best sunscreen I have ever used!', 'A comfortable everyday essential for sunny days.', 'Nishchal Gowda']].map(([title, text, author]) => <article key={title}><div className="stars">★★★★★</div><h3>{title}</h3><p>{text}</p><small>— {author}</small></article>)}</div></section>
    <section className="video-section"><div className="section-heading"><div><p className="eyebrow">Product Review Videos</p><h2>See it in real routines.</h2></div><a className="underlink" href="https://www.instagram.com/deya.care/" target="_blank" rel="noreferrer">Watch on Instagram <ArrowRight size={16} /></a></div><div className="video-grid">{[
      ['https://www.instagram.com/reel/Da9zmINyw5O/embed/?cr=1&v=14&wp=540', "Deo D'Lite Underarm Roll-On (6% AHA-BHA)", '₹374', '₹499'],
      ['https://www.instagram.com/reel/DbNY-1FSDs8/embed/?cr=1&v=14&wp=540', 'Cloud Screen SPF 50 PA +++ Gel Sunscreen', '₹562', '₹749'],
      ['https://www.instagram.com/reel/DbP8Le_TTsL/embed/?cr=1&v=14&wp=540', 'Sweat Not SPF 50 PA +++ Sports Mineral Sunscreen', '₹637', '₹849'],
      ['https://www.instagram.com/reel/Da7jW04BlsH/embed/?cr=1&v=14&wp=540', 'Sweat Not SPF 50 PA +++ Sports Mineral Sunscreen', '₹637', '₹849']
    ].map(([src, title, price, oldPrice]) => <article className="video-card" key={src}><div className="video-frame"><iframe src={src} title={`${title} review`} loading="lazy" allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share" /></div><div className="video-meta"><h3>{title}</h3><strong>{price}</strong><del>{oldPrice}</del></div></article>)}</div></section>
    <section className="community section"><p className="eyebrow">Deya Care + You</p><h2>Connect with us</h2><div className="community-grid">{[1, 2, 3, 4, 5, 6].map((image) => <img key={image} src={`/images/gallery/community-${image}.png`} alt="Deya Care community" />)}</div></section>
    <Newsletter />
  </main>;
}
