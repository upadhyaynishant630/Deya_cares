import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram } from 'lucide-react';
import './Footer.css';

export default function Footer() {
  return (
    <footer>
      <div className="footer-newsletter"><h2>Stay Connected, Stay Informed</h2><p>Subscribe to receive exclusive updates, tips, and promotions straight to your inbox. Join our community for expert advice and resources to support your care journey.</p><Link to="/contact" className="button">Subscribe <span>→</span></Link></div>
      <div className="footer-main">
        <div><Link to="/" className="wordmark"><img src="/images/logo/deya-logo.png" alt="Deya Care" /></Link><p>Stress-aware skincare for Indian skin.</p></div>
        <div className="footer-links"><div><b>NAVIGATE</b><Link to="/about">About us</Link><Link to="/shop">Shop</Link><Link to="/blog">Blog</Link><Link to="/contact">Contact</Link></div><div><b>SUPPORT</b><span>Monday to Saturday 9 am - 9 pm</span><span>Drop us a note anytime.</span><Link to="/contact">Orders & Shipping</Link></div><div><b>SOCIAL</b><a href="https://www.facebook.com/profile.php?id=61581988109224" target="_blank" rel="noreferrer">Facebook</a><a href="https://www.instagram.com/deya.care/" target="_blank" rel="noreferrer"><Instagram size={15} /> Instagram</a><a href="https://www.linkedin.com/company/deya-care/" target="_blank" rel="noreferrer">LinkedIn</a></div></div>
      </div>
      <div className="footer-bottom">
        <span>© Deya Care 2026</span>
        <span><Link to="/contact">Terms & Conditions</Link> · <Link to="/contact">Privacy Policy</Link> · <Link to="/contact">Refunds & Cancellation</Link></span>
      </div>
    </footer>
  );
}
