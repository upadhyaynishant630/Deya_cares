import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, ArrowUp, Clock, Heart, Mail, Sparkles } from 'lucide-react';
import './Footer.css';

const MARQUEE_ITEMS = [
  'Made for Indian skin',
  'Stress-aware skincare',
  'Free shipping above ₹400',
  'Thoughtful daily rituals',
  'Clean & effective formulas',
];

const SOCIAL_LINKS = [
  {
    label: 'Facebook',
    href: 'https://www.facebook.com/profile.php?id=61581988109224',
    icon: (
      <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
        <path d="M13.5 21v-7.5h2.6l.4-3h-3V8.6c0-.9.3-1.5 1.6-1.5h1.6V4.4c-.3 0-1.2-.1-2.3-.1-2.3 0-3.9 1.4-3.9 4v2.2H8v3h2.5V21h3z" />
      </svg>
    ),
  },
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/deya.care/',
    icon: (
      <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.3" cy="6.7" r="1" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/company/deya-care/',
    icon: (
      <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
        <path d="M5.2 9.2h3v9.6h-3V9.2zM6.7 4.5a1.7 1.7 0 110 3.4 1.7 1.7 0 010-3.4zM10.2 9.2h2.9v1.3c.4-.8 1.4-1.6 2.9-1.6 3.1 0 3.7 2 3.7 4.7v5.2h-3v-4.6c0-1.1 0-2.5-1.5-2.5s-1.8 1.2-1.8 2.4v4.7h-3V9.2z" />
      </svg>
    ),
  },
];

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export default function Footer() {
  const navigate = useNavigate();
  const footerRef = useRef(null);
  const [visible, setVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  // Reveal the footer with a staggered animation once it scrolls into view.
  useEffect(() => {
    const node = footerRef.current;
    if (!node || typeof window === 'undefined' || !('IntersectionObserver' in window)) {
      setVisible(true);
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.08 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    const value = email.trim();

    if (!EMAIL_PATTERN.test(value)) {
      setError('Please enter a valid email address.');
      return;
    }

    setError('');
    navigate('/contact', { state: { email: value, source: 'newsletter' } });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const year = new Date().getFullYear();

  return (
    <footer className={`dc-footer${visible ? ' is-visible' : ''}`} ref={footerRef}>
      {/* Newsletter card */}
   

      <div className="dc-body">
        <span className="dc-glow dc-glow-a" aria-hidden="true" />
        <span className="dc-glow dc-glow-b" aria-hidden="true" />
        <span className="dc-grid" aria-hidden="true" />

        <div className="dc-inner">
          <div className="dc-main">
            <div className="dc-brand" style={{ '--i': 1 }}>
              <Link to="/" className="dc-logo" aria-label="Deya Care home">
                <img src="/images/logo/deya-logo.png" alt="Deya Care" />
              </Link>
              <p>Stress-aware skincare for Indian skin.</p>

              <ul className="dc-social" aria-label="Deya Care on social media">
                {SOCIAL_LINKS.map((item) => (
                  <li key={item.label}>
                    <a href={item.href} target="_blank" rel="noreferrer" aria-label={item.label}>
                      {item.icon}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <nav className="dc-col" aria-label="Footer navigation" style={{ '--i': 2 }}>
              <h3>NAVIGATE</h3>
              <Link to="/about">About us</Link>
              <Link to="/shop">Shop</Link>
              <Link to="/blog">Blog</Link>
              <Link to="/contact">Contact</Link>
            </nav>

            <div className="dc-col" style={{ '--i': 3 }}>
              <h3>SUPPORT</h3>
              <span className="dc-hours">
                <Clock size={14} aria-hidden="true" /> Monday to Saturday 9 am - 9 pm
              </span>
              <span className="dc-note">Drop us a note anytime.</span>
              <Link to="/contact">Orders &amp; Shipping</Link>
            </div>

            <div className="dc-col" style={{ '--i': 4 }}>
              <h3>SOCIAL</h3>
              {SOCIAL_LINKS.map((item) => (
                <a key={item.label} href={item.href} target="_blank" rel="noreferrer">
                  {item.label}
                </a>
              ))}
            </div>
          </div>

          {/* Scrolling ticker */}
          <div className="dc-marquee" aria-hidden="true">
            <div className="dc-marquee-track">
              {[0, 1].map((group) => (
                <div className="dc-marquee-group" key={group}>
                  {MARQUEE_ITEMS.map((text) => (
                    <span className="dc-marquee-item" key={`${group}-${text}`}>
                      <span className="dc-marquee-star">✦</span>
                      {text}
                    </span>
                  ))}
                </div>
              ))}
            </div>
          </div>

          <div className="dc-bottom" style={{ '--i': 5 }}>
            <span className="dc-copy">
              © Deya Care {year} · Made with <Heart size={13} className="dc-heart" aria-hidden="true" /> in India
            </span>
            <span className="dc-legal">
              <Link to="/contact">Terms &amp; Conditions</Link>
              <i aria-hidden="true">·</i>
              <Link to="/contact">Privacy Policy</Link>
              <i aria-hidden="true">·</i>
              <Link to="/contact">Refunds &amp; Cancellation</Link>
            </span>
            <button type="button" className="dc-top" onClick={scrollToTop} aria-label="Back to top">
              <ArrowUp size={17} aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}