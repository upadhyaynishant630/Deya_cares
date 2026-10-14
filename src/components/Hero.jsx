import React, { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import './Hero.css';

const BANNERS = [
  '/images/banners/homepage-1.jpg',
  '/images/banners/homepage-2.jpg',
];

const SLIDE_INTERVAL = 5000;

export default function Hero() {
  const [index, setIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    if (isHovered || isFocused || BANNERS.length < 2) return undefined;

    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % BANNERS.length);
    }, SLIDE_INTERVAL);

    return () => window.clearInterval(timer);
  }, [isHovered, isFocused]);

  const showSlide = (nextIndex) => {
    setIndex((nextIndex + BANNERS.length) % BANNERS.length);
  };

  const handleBlur = (event) => {
    if (!event.currentTarget.contains(event.relatedTarget)) {
      setIsFocused(false);
    }
  };

  return (
    <section
      className="official-hero"
      aria-label="Deya Care promotions"
      aria-roledescription="carousel"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocusCapture={() => setIsFocused(true)}
      onBlurCapture={handleBlur}
    >
      <div className="official-hero-media">
        <img
          key={BANNERS[index]}
          className="official-hero-image"
          src={BANNERS[index]}
          alt={`Deya Care promotional banner ${index + 1}`}
          fetchPriority={index === 0 ? 'high' : 'auto'}
          decoding="async"
          draggable="false"
        />
      </div>

      {BANNERS.length > 1 && (
        <>
          <button
            type="button"
            className="hero-control hero-prev"
            aria-label="Previous banner"
            onClick={() => showSlide(index - 1)}
          >
            <ChevronLeft aria-hidden="true" />
          </button>

          <button
            type="button"
            className="hero-control hero-next"
            aria-label="Next banner"
            onClick={() => showSlide(index + 1)}
          >
            <ChevronRight aria-hidden="true" />
          </button>

          <div className="hero-dots" aria-label="Choose promotional banner">
            {BANNERS.map((banner, dot) => (
              <button
                key={banner}
                type="button"
                aria-label={`Show banner ${dot + 1}`}
                aria-current={dot === index ? 'true' : undefined}
                className={`hero-dot${dot === index ? ' active' : ''}`}
                onClick={() => showSlide(dot)}
              />
            ))}
          </div>

          <span className="hero-slide-count" aria-hidden="true">
            <span>{String(index + 1).padStart(2, '0')}</span>
            <span className="hero-slide-count-divider" />
            <span>{String(BANNERS.length).padStart(2, '0')}</span>
          </span>
        </>
      )}
    </section>
  );
}
