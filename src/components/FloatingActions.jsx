import React, { useEffect, useRef, useState } from 'react';
import { ArrowUp, Facebook, Instagram, Mail, MessageCircle, Phone, X } from 'lucide-react';
import './FloatingActions.css';

const actions = [
  { label: 'Instagram', icon: Instagram, href: 'https://www.instagram.com/deya.care/', external: true, className: 'instagram' },
  { label: 'Facebook', icon: Facebook, href: 'https://www.facebook.com/profile.php?id=61581988109224', external: true, className: 'facebook' },
  { label: 'Email us', icon: Mail, href: 'mailto:hello@deyacare.co', className: 'email' },
  { label: 'Call us', icon: Phone, href: 'tel:+919999999999', className: 'phone' }
];

export default function FloatingActions() {
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) setOpen(false);
    };
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') setOpen(false);
    };
    document.addEventListener('pointerdown', handleOutsideClick);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('pointerdown', handleOutsideClick);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setOpen(false);
  };

  return <div className={`floating-actions ${open ? 'is-open' : ''}`} ref={menuRef}>
    <div className="floating-action-list" aria-hidden={!open}>
      {actions.map(({ label, icon: Icon, href, external, className }) => <a
        key={label}
        className={`floating-action ${className}`}
        href={href}
        aria-label={label}
        tabIndex={open ? 0 : -1}
        {...(external ? { target: '_blank', rel: 'noreferrer' } : {})}
      ><Icon size={18} /><span>{label}</span></a>)}
      <button className="floating-action top" type="button" onClick={scrollToTop} aria-label="Back to top" tabIndex={open ? 0 : -1}><ArrowUp size={18} /><span>Back to top</span></button>
    </div>
    <button className="floating-toggle" type="button" aria-label={open ? 'Close quick actions' : 'Open quick actions'} aria-expanded={open} onClick={() => setOpen((value) => !value)}>
      {open ? <X size={22} /> : <MessageCircle size={22} />}
    </button>
  </div>;
}
