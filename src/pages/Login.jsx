import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import {
  ArrowRight,
  Check,
  ChevronLeft,
  ShieldCheck,
  Sparkles,
  X,
} from "lucide-react";
import "./Login.css";

// Update these paths if your actual filenames are different.
const DEFAULT_LOGO_SRC = "/images/logo/deya-care-logo.png";
const DEFAULT_PROMO_SRC = "/images/banners/deya-ritual-banner.png";

export default function Login({
  isOpen,
  onClose,
  logoSrc = DEFAULT_LOGO_SRC,
  promoImageSrc = DEFAULT_PROMO_SRC,
  termsUrl = "/terms",
  privacyUrl = "/privacy-policy",
}) {
  const phoneRef = useRef(null);

  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState("phone");

  const [marketingConsent, setMarketingConsent] = useState(false);
  const [logoError, setLogoError] = useState(false);
  const [promoError, setPromoError] = useState(false);

  const [status, setStatus] = useState("");
  const [statusType, setStatusType] = useState("error");

  useEffect(() => {
    if (!isOpen) {
      setStep("phone");
      setOtp("");
      setStatus("");
      return undefined;
    }

    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose?.();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    const focusTimer = window.setTimeout(() => {
      phoneRef.current?.focus();
    }, 100);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
      window.clearTimeout(focusTimer);
    };
  }, [isOpen, onClose]);

  const handlePhoneChange = (event) => {
    const digits = event.target.value
      .replace(/\D/g, "")
      .slice(0, 10);

    setPhone(digits);
    setStatus("");
  };

  const handlePhoneSubmit = (event) => {
    event.preventDefault();

    if (!/^\d{10}$/.test(phone)) {
      setStatusType("error");
      setStatus("Please enter a valid 10-digit mobile number.");
      return;
    }

    setOtp("");
    setStatus("");
    setStep("otp");
  };

  const handleOtpSubmit = (event) => {
    event.preventDefault();

    if (!/^\d{6}$/.test(otp)) {
      setStatusType("error");
      setStatus("Please enter a valid 6-digit OTP.");
      return;
    }

    // UI demonstration only. Connect your real OTP provider here.
    setStatusType("info");
    setStatus(
      "Demo mode: OTP verification is not connected yet. Connect your authentication API before launch."
    );
  };

  const handleBackdropMouseDown = (event) => {
    if (event.target === event.currentTarget) {
      onClose?.();
    }
  };

  const handleOtpChange = (event) => {
    setOtp(event.target.value.replace(/\D/g, "").slice(0, 6));
    setStatus("");
  };

  if (!isOpen || typeof document === "undefined") {
    return null;
  }

  return createPortal(
    <div
      className="deya-login-overlay"
      onMouseDown={handleBackdropMouseDown}
      role="presentation"
    >
      <section
        className="deya-login-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="deya-login-title"
      >
        <button
          type="button"
          className="deya-login-close"
          onClick={onClose}
          aria-label="Close login dialog"
        >
          <X size={21} strokeWidth={1.8} />
        </button>

        <div className="deya-login-surface">
          {/* Announcement strip */}
          <div className="deya-login-topbar">
            <Sparkles size={13} aria-hidden="true" />
            <span>Your everyday skincare, made personal</span>
          </div>

          <div className="deya-login-content">
            {/* Deya Care logo */}
            <div className="deya-login-brand">
              {!logoError && logoSrc ? (
                <img
                  className="deya-login-logo"
                  src={logoSrc}
                  alt="Deya Care"
                  onError={() => setLogoError(true)}
                />
              ) : (
                <span className="deya-login-wordmark">
                  deya<span>care</span>
                </span>
              )}
            </div>

            {/* Heading */}
            <div className="deya-login-heading">
              <h2 id="deya-login-title">
                {step === "phone" ? (
                  <>
                    LOG IN <span>/</span> SIGN UP
                  </>
                ) : (
                  "VERIFY YOUR NUMBER"
                )}
              </h2>

              <p>
                {step === "phone"
                  ? "Let’s make your skincare ritual effortless."
                  : `Enter the 6-digit verification code to continue with +91 ${phone.slice(
                      0,
                      2
                    )}******${phone.slice(-2)}.`}
              </p>
            </div>

            {/* Promotional skincare image */}
            <div className="deya-login-visual">
              {!promoError && promoImageSrc ? (
                <img
                  className="deya-login-promo-image"
                  src={promoImageSrc}
                  alt="Explore the Deya Care skincare collection"
                  onError={() => setPromoError(true)}
                />
              ) : (
                <div className="deya-login-visual-fallback">
                  <span className="deya-login-visual-kicker">
                    YOUR SKINCARE, YOUR WAY
                  </span>

                  <h3>
                    Your skin.
                    <br />
                    <em>Your ritual.</em>
                  </h3>

                  <div
                    className="deya-login-product-art"
                    aria-hidden="true"
                  >
                    <span className="deya-login-bottle deya-login-bottle-one" />
                    <span className="deya-login-bottle deya-login-bottle-two" />
                    <span className="deya-login-jar" />
                  </div>

                  <Sparkles
                    className="deya-login-art-sparkle"
                    size={25}
                    aria-hidden="true"
                  />
                </div>
              )}
            </div>

            {/* Phone / OTP form */}
            {step === "phone" ? (
              <form
                className="deya-login-form"
                onSubmit={handlePhoneSubmit}
              >
                <label
                  className="deya-login-input-label"
                  htmlFor="deya-login-phone"
                >
                  Mobile number
                </label>

                <div className="deya-login-phone-field">
                  <div className="deya-login-country">
                    <span role="img" aria-label="India">
                      🇮🇳
                    </span>
                    <span>+91</span>
                    <span className="deya-login-country-chevron">⌄</span>
                  </div>

                  <input
                    ref={phoneRef}
                    id="deya-login-phone"
                    name="phone"
                    type="tel"
                    inputMode="numeric"
                    autoComplete="tel-national"
                    placeholder="Enter mobile number"
                    value={phone}
                    onChange={handlePhoneChange}
                    maxLength={10}
                    required
                    aria-describedby="deya-login-helper"
                  />
                </div>

                <p
                  id="deya-login-helper"
                  className="deya-login-helper"
                >
                  Use your 10-digit Indian mobile number.
                </p>

                {status && (
                  <p
                    className={`deya-login-status deya-login-status-${statusType}`}
                    role="alert"
                  >
                    {status}
                  </p>
                )}

                <button className="deya-login-submit" type="submit">
                  <span>Continue</span>
                  <ArrowRight size={18} aria-hidden="true" />
                </button>

                <label className="deya-login-consent">
                  <input
                    type="checkbox"
                    checked={marketingConsent}
                    onChange={(event) =>
                      setMarketingConsent(event.target.checked)
                    }
                  />

                  <span className="deya-login-checkbox">
                    {marketingConsent && (
                      <Check size={12} strokeWidth={3} />
                    )}
                  </span>

                  <span>
                    Send me skincare tips, updates and offers via
                    SMS/WhatsApp.
                  </span>
                </label>
              </form>
            ) : (
              <form
                className="deya-login-form deya-login-otp-form"
                onSubmit={handleOtpSubmit}
              >
                <label
                  className="deya-login-input-label"
                  htmlFor="deya-login-otp"
                >
                  6-digit verification code
                </label>

                <input
                  id="deya-login-otp"
                  name="otp"
                  className="deya-login-otp-input"
                  type="text"
                  inputMode="numeric"
                  autoComplete="one-time-code"
                  placeholder="Enter OTP"
                  value={otp}
                  maxLength={6}
                  onChange={handleOtpChange}
                  required
                />

                <p className="deya-login-helper">
                  This is a preview of the verification step. No SMS
                  is sent until an OTP provider is integrated.
                </p>

                {status && (
                  <p
                    className={`deya-login-status deya-login-status-${statusType}`}
                    role="alert"
                  >
                    {status}
                  </p>
                )}

                <button className="deya-login-submit" type="submit">
                  <span>Verify &amp; continue</span>
                  <ArrowRight size={18} aria-hidden="true" />
                </button>

                <button
                  type="button"
                  className="deya-login-back"
                  onClick={() => {
                    setStep("phone");
                    setOtp("");
                    setStatus("");
                  }}
                >
                  <ChevronLeft size={16} aria-hidden="true" />
                  Change mobile number
                </button>
              </form>
            )}

            {/* Legal and trust section */}
            <div className="deya-login-legal">
              <ShieldCheck size={15} aria-hidden="true" />

              <span>
                By continuing, you agree to our{" "}
                <a href={termsUrl}>Terms</a> and{" "}
                <a href={privacyUrl}>Privacy Policy</a>.
              </span>
            </div>

            <p className="deya-login-footer">
              <span className="deya-login-footer-dot" />
              Thoughtfully made for your everyday ritual
              <span className="deya-login-footer-dot" />
            </p>
          </div>
        </div>
      </section>
    </div>,
    document.body
  );
}