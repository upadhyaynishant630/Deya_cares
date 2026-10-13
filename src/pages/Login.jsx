import React from 'react';
import { ArrowRight } from 'lucide-react';
import './Login.css';

export default function Login() {
  return <main className="section login-page"><div className="login-card"><p className="eyebrow">Welcome back</p><h1>Your ritual,<br /><em>your account.</em></h1><p>Sign in to view your orders and save your favourites.</p><form onSubmit={(event) => event.preventDefault()}><label>Email<input type="email" required placeholder="you@example.com" /></label><label>Password<input type="password" required placeholder="••••••••" /></label><button className="button full">Sign in <ArrowRight size={17} /></button></form><p className="fine-print">Demo storefront — account functionality is not connected.</p></div></main>;
}
