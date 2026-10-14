import React, { useId, useState } from 'react';
import {
  AlertCircle,
  ArrowRight,
  CheckCircle2,
  Heart,
  Mail,
  ShieldCheck,
  Sparkles,
  X,
} from 'lucide-react';
import './Newsletter.css';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [feedback, setFeedback] = useState(null);
  const reactId = useId();
  const emailId = `${reactId}-email`;
  const hintId = `${reactId}-hint`;
  const feedbackId = `${reactId}-feedback`;

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
    if (feedback) setFeedback(null);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const normalizedEmail = email.trim();
    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(normalizedEmail);

    if (!normalizedEmail) {
      setFeedback({
        type: 'error',
        message: 'Please enter your email address to continue.',
      });
      return;
    }

    if (!isValidEmail) {
      setFeedback({
        type: 'error',
        message: 'That email address does not look right. Please check it and try again.',
      });
      return;
    }

    // Front-end validation only. Connect this handler to a newsletter API
    // or email-marketing provider before using this form in production.
    setFeedback({
      type: 'success',
      message: 'Thanks for your interest! Your email is valid and ready for sign-up.',
    });
  };

  return (
    <section
      className="newsletter deya-newsletter"
      aria-labelledby={`${reactId}-title`}
    >
      <span
        className="deya-newsletter__decor deya-newsletter__decor--one"
        aria-hidden="true"
      />
      <span
        className="deya-newsletter__decor deya-newsletter__decor--two"
        aria-hidden="true"
      />

      <div className="deya-newsletter__intro">
        <span className="deya-newsletter__eyebrow">
          <Sparkles size={15} aria-hidden="true" />
          <span>A little note from Deya</span>
        </span>

        <h2 id={`${reactId}-title`}>
          Good skin days,
          <em> in your inbox.</em>
        </h2>

        <p className="deya-newsletter__description">
          Occasional notes on skincare rituals, thoughtful ingredients and making a little
          more space for yourself.
        </p>

        <div className="deya-newsletter__promise">
          <span>
            <Heart size={14} aria-hidden="true" />
            Made with care
          </span>
          <span>
            <ShieldCheck size={14} aria-hidden="true" />
            No inbox overload
          </span>
        </div>
      </div>

      <div className="deya-newsletter__form-panel">
        <div className="deya-newsletter__form-heading">
          <span className="deya-newsletter__mail-icon" aria-hidden="true">
            <Mail size={19} />
          </span>
          <div>
            <h3>Join the Happy Tribe</h3>
            <p>Your next feel-good read starts here.</p>
          </div>
        </div>

        <form
          className="deya-newsletter__form"
          onSubmit={handleSubmit}
          noValidate
        >
          <label className="deya-newsletter__label" htmlFor={emailId}>
            Email address
          </label>

          <div
            className={`deya-newsletter__input-wrap${
              feedback?.type === 'error' ? ' is-invalid' : ''
            }`}
          >
            <Mail size={18} aria-hidden="true" />
            <input
              id={emailId}
              name="email"
              type="email"
              inputMode="email"
              autoComplete="email"
              placeholder="Your email address"
              value={email}
              onChange={handleEmailChange}
              aria-invalid={feedback?.type === 'error'}
              aria-describedby={feedback ? `${hintId} ${feedbackId}` : hintId}
            />
          </div>

          <p className="deya-newsletter__hint" id={hintId}>
            A thoughtful note now and then. Unsubscribe whenever you like.
          </p>

          <button className="deya-newsletter__submit" type="submit">
            <span className="deya-newsletter__submit-label">Sign me up</span>
            <span className="deya-newsletter__submit-icon" aria-hidden="true">
              <ArrowRight size={17} />
            </span>
          </button>

          {feedback && (
            <div
              className={`deya-newsletter__alert deya-newsletter__alert--${feedback.type}`}
              id={feedbackId}
              role={feedback.type === 'error' ? 'alert' : 'status'}
              aria-live={feedback.type === 'error' ? 'assertive' : 'polite'}
            >
              <span className="deya-newsletter__alert-icon" aria-hidden="true">
                {feedback.type === 'success' ? (
                  <CheckCircle2 size={19} />
                ) : (
                  <AlertCircle size={19} />
                )}
              </span>
              <span className="deya-newsletter__alert-message">
                {feedback.message}
              </span>
              <button
                type="button"
                className="deya-newsletter__alert-close"
                aria-label="Dismiss message"
                onClick={() => setFeedback(null)}
              >
                <X size={16} aria-hidden="true" />
              </button>
            </div>
          )}
        </form>

        <p className="deya-newsletter__privacy">
          <ShieldCheck size={13} aria-hidden="true" />
          Your details deserve care, too.
        </p>
      </div>
    </section>
  );
}
