
import React, { useState } from 'react';
import {
  AlertCircle,
  ArrowRight,
  CheckCircle2,
  Loader2,
  ShieldCheck,
  X,
} from 'lucide-react';
import './Contact.css';

// Connect this endpoint to your backend API.
const CONTACT_ENDPOINT = '/api/contact';

const initialForm = {
  name: '',
  email: '',
  phone: '',
  topic: 'Product question',
  message: '',
};

export default function Contact() {
  const [formData, setFormData] = useState({ ...initialForm });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState({
    type: 'idle',
    message: '',
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((current) => ({
      ...current,
      [name]: value,
    }));

    if (status.type !== 'idle') {
      setStatus({
        type: 'idle',
        message: '',
      });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const name = formData.name.trim();
    const email = formData.email.trim();
    const phone = formData.phone.trim();
    const message = formData.message.trim();

    // Required field validation
    if (!name || !email || !message) {
      setStatus({
        type: 'error',
        message:
          'Please complete your name, email address, and message.',
      });
      return;
    }

    // Email validation
    const emailIsValid =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    if (!emailIsValid) {
      setStatus({
        type: 'error',
        message:
          'Please enter a valid email address so our team can reply.',
      });
      return;
    }

    setIsSubmitting(true);
    setStatus({
      type: 'idle',
      message: '',
    });

    try {
      const response = await fetch(CONTACT_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          phone,
          topic: formData.topic,
          message,
        }),
      });

      if (!response.ok) {
        throw new Error(
          'The contact request was not accepted by the server.'
        );
      }

      setFormData({ ...initialForm });

      setStatus({
        type: 'success',
        message:
          'Your message has been received. Thank you for reaching out to Deya Care!',
      });
    } catch (error) {
      setStatus({
        type: 'error',
        message:
          'We could not send your message just now. Please try again shortly. If this continues, check that the contact API is connected.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const dismissAlert = () => {
    setStatus({
      type: 'idle',
      message: '',
    });
  };

  return (
    <main className="contact-page">
      <div className="contact-container">
        {/* Introduction */}
        <header className="contact-intro">
          <h1 className="contact-title">
            Let’s Talk
          </h1>

          <p className="contact-lede">
            Have a question, feedback, or just want to say
            hello? We’re here and ready to help. Reach out
            to our care team and we’ll get back to you
            within 24 hours.
          </p>
        </header>

        {/* Contact form card */}
        <section
          className="contact-form-card"
          aria-labelledby="contact-form-title"
        >
          <div className="contact-form-card-top">
            <h2 id="contact-form-title">
              Send us a message
            </h2>

            <p>
              Tell us how we can help, and our team will
              get back to you as soon as possible.
            </p>
          </div>

          <form
            className="contact-form"
            onSubmit={handleSubmit}
            noValidate
          >
            <div className="contact-fields-grid">
              {/* Full name */}
              <label className="contact-field">
                <span>
                  Full name <b aria-hidden="true">*</b>
                </span>

                <input
                  type="text"
                  name="name"
                  autoComplete="name"
                  placeholder="Your name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  maxLength={100}
                  disabled={isSubmitting}
                />
              </label>

              {/* Email */}
              <label className="contact-field">
                <span>
                  Email address{' '}
                  <b aria-hidden="true">*</b>
                </span>

                <input
                  type="email"
                  name="email"
                  autoComplete="email"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  maxLength={254}
                  disabled={isSubmitting}
                />
              </label>

              {/* Phone number */}
              <label className="contact-field contact-field-full">
                <span>
                  Phone number{' '}
                  <small>(optional)</small>
                </span>

                <input
                  type="tel"
                  name="phone"
                  autoComplete="tel"
                  inputMode="tel"
                  placeholder="Your phone number"
                  value={formData.phone}
                  onChange={handleChange}
                  maxLength={25}
                  disabled={isSubmitting}
                />
              </label>

              {/* Message */}
              <label className="contact-field contact-field-full">
                <span>
                  Your message{' '}
                  <b aria-hidden="true">*</b>
                </span>

                <textarea
                  name="message"
                  rows={4}
                  placeholder="Tell us a little more so we can help…"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  maxLength={3000}
                  disabled={isSubmitting}
                />

                <small
                  className="contact-character-count"
                  aria-live="polite"
                >
                  {formData.message.length}/3000
                </small>
              </label>
            </div>

            {/* Animated success / error alert */}
            {status.message && (
              <div
                className={`contact-alert contact-alert--${status.type}`}
                role={
                  status.type === 'error'
                    ? 'alert'
                    : 'status'
                }
                aria-live={
                  status.type === 'error'
                    ? 'assertive'
                    : 'polite'
                }
                key={`${status.type}-${status.message}`}
              >
                <span
                  className="contact-alert__icon"
                  aria-hidden="true"
                >
                  {status.type === 'success' ? (
                    <CheckCircle2
                      size={22}
                      strokeWidth={2.2}
                    />
                  ) : (
                    <AlertCircle
                      size={22}
                      strokeWidth={2.2}
                    />
                  )}
                </span>

                <div className="contact-alert__content">
                  <strong>
                    {status.type === 'success'
                      ? 'Message received!'
                      : 'Unable to send message'}
                  </strong>

                  <p>{status.message}</p>

                  {status.type === 'success' && (
                    <span className="contact-alert__badge">
                      <CheckCircle2 size={13} />
                      Submission successful
                    </span>
                  )}
                </div>

                <button
                  className="contact-alert__close"
                  type="button"
                  aria-label="Dismiss notification"
                  onClick={dismissAlert}
                >
                  <X size={17} />
                </button>
              </div>
            )}

            {/* Submit button and privacy note */}
            <div className="contact-form-bottom">
              <button
                className="contact-submit"
                type="submit"
                disabled={isSubmitting}
              >
                <span>
                  {isSubmitting
                    ? 'Sending message…'
                    : 'Send message'}
                </span>

                {isSubmitting ? (
                  <Loader2
                    className="contact-submit-spinner"
                    size={18}
                    aria-hidden="true"
                  />
                ) : (
                  <ArrowRight
                    size={18}
                    aria-hidden="true"
                  />
                )}
              </button>

              <p className="contact-privacy-note">
                <ShieldCheck
                  size={16}
                  aria-hidden="true"
                />

                <span>
                  We respect your privacy. Your details
                  are safe with us.
                </span>
              </p>
            </div>
          </form>
        </section>
      </div>
    </main>
  );
}
