import React, { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import './Hero.css';

export default function Hero() {
  const banners = ['/images/banners/homepage-1.jpg', '/images/banners/homepage-2.jpg'];
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const timer = window.setInterval(() => setIndex((value) => (value + 1) % banners.length), 5000);
    return () => window.clearInterval(timer);
  }, []);
  return <section className="official-hero" aria-label="Deya Care promotions">
    <img src={banners[index]} alt="Deya Care skincare promotion" />
    <button type="button" className="hero-control hero-prev" aria-label="Previous banner" onClick={() => setIndex((index - 1 + banners.length) % banners.length)}><ChevronLeft /></button>
    <button type="button" className="hero-control hero-next" aria-label="Next banner" onClick={() => setIndex((index + 1) % banners.length)}><ChevronRight /></button>
    <div className="hero-dots">{banners.map((banner, dot) => <button key={banner} type="button" aria-label={`Show banner ${dot + 1}`} className={dot === index ? 'active' : ''} onClick={() => setIndex(dot)} />)}</div>
  </section>;
}
