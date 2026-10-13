import React, { useState } from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('');
  const submit = (event) => {
    event.preventDefault();
    setStatus(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
      ? 'You’re on the list — welcome to the ritual.'
      : 'Please enter a valid email.');
  };
  return (
    <section className="newsletter">
      <Sparkles size={20} />
      <div><p className="eyebrow">A little note from Deya</p><h2>Good skin days, in your inbox.</h2><p>Occasional notes on rituals, ingredients and making space for yourself.</p></div>
      <form onSubmit={submit}>
        <label className="sr-only" htmlFor="newsletter-email">Email address</label>
        <input id="newsletter-email" type="email" placeholder="Your email address" value={email} onChange={(event) => setEmail(event.target.value)} />
        <button className="button dark" type="submit">Sign me up <ArrowRight size={16} /></button>
        {status && <small className={status.startsWith('You') ? 'success' : 'error'}>{status}</small>}
      </form>
    </section>
  );
}
