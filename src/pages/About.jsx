import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  FlaskConical,
  Heart,
  Leaf,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';
import Newsletter from '../components/Newsletter';
import { products } from '../data/products';
import './About.css';

const ABOUT_IMAGES = {
  hero: '/images/about/hero.jpg',
  founderSignature: '/images/about/founder-signature.jpg',
  philosophy: '/images/about/philosophy.jpg',
  values: '/images/about/values.png',
};

const ingredients = [
  {
    name: 'Feluric Acid',
    image: '/images/about/feluric-acid.jpeg',
    copy: 'A powerful antioxidant that helps protect collagen and elastin from oxidative stress while supporting a brighter-looking complexion.',
  },
  {
    name: 'Glutathione',
    image: '/images/about/glutathione.jpeg',
    copy: 'An antioxidant ingredient associated with a more even-looking tone and support against free-radical stress.',
  },
  {
    name: 'Glycolic Acid (AHA)',
    image: '/images/about/glycolic-acid.jpeg',
    copy: 'An exfoliating alpha-hydroxy acid that helps lift away dead surface cells for smoother, fresher-looking skin.',
  },
  {
    name: 'Jojoba Beads',
    image: '/images/about/jojoba-beads.jpeg',
    copy: 'Smooth, non-abrasive jojoba beads offer gentle physical exfoliation without the harsh feel of rough particles.',
  },
  {
    name: 'Limepearl',
    image: '/images/about/limepearl.jpeg',
    copy: 'Derived from Australian caviar lime, this ingredient is valued for its AHA-rich composition and gentle exfoliating feel.',
  },
  {
    name: 'Lactic Acid',
    image: '/images/about/lactic-acid.jpeg',
    copy: 'A milder AHA that helps loosen dead surface cells and leaves skin feeling smoother and looking more radiant.',
  },
  {
    name: 'Licorice',
    image: '/images/about/licorice.jpeg',
    copy: 'Licorice root is used in skincare to help soothe the look of redness and improve the appearance of uneven tone.',
  },
  {
    name: 'Niacinamide',
    image: '/images/about/niacinamide.jpeg',
    copy: 'A versatile form of vitamin B3 that supports moisture retention and helps skin look smoother and more resilient.',
  },
  {
    name: 'Salicylic Acid',
    image: '/images/about/salicylic-acid.jpeg',
    copy: 'An oil-soluble BHA that helps clear pore build-up, refine texture and manage excess surface oil.',
  },
  {
    name: 'Tea Tree Oil',
    image: '/images/about/tea-tree-oil.jpeg',
    copy: 'A familiar botanical ingredient valued for its clarifying and soothing support in blemish-focused routines.',
  },
  {
    name: 'Vitamin C',
    image: '/images/about/vitamin-c.jpeg',
    copy: 'An antioxidant often used to support a brighter-looking complexion and help defend skin against environmental stress.',
  },
];

const values = [
  {
    id: 'science',
    title: 'Scientifically considered formulas',
    description:
      'Purposeful, high-performance ingredients are selected with intention and used at considered levels. The goal is effective everyday care without adding needless complexity to your routine.',
    icon: FlaskConical,
  },
  {
    id: 'comfort',
    title: 'A happier-in-your-skin approach',
    description:
      'Skincare should feel like a moment for yourself, not another task on the list. We focus on approachable rituals, comfortable textures and care that fits real life.',
    icon: Heart,
  },
];

const recommendedProducts = products.filter((product) => [
  'blemish-be-gone',
  'clearity-drop',
  'cloud-screen',
  'glaze-drop',
  'luma-cleanse',
  'sweat-not',
].includes(product.id));

export default function About({ addToCart = () => {} }) {
  const ingredientTrackRef = useRef(null);
  const recommendationTrackRef = useRef(null);
  const [activeValue, setActiveValue] = useState('science');

  useEffect(() => {
    const track = ingredientTrackRef.current;
    if (!track) return undefined;

    let animationFrame;
    let isPaused = false;

    const pauseMarquee = () => {
      isPaused = true;
    };
    const resumeMarquee = () => {
      isPaused = false;
    };

    const advanceMarquee = () => {
      if (!isPaused) {
        track.scrollLeft += 0.55;
        if (track.scrollLeft >= track.scrollWidth / 2) {
          track.scrollLeft = 0;
        }
      }
      animationFrame = requestAnimationFrame(advanceMarquee);
    };

    track.addEventListener('mouseenter', pauseMarquee);
    track.addEventListener('mouseleave', resumeMarquee);
    track.addEventListener('focusin', pauseMarquee);
    track.addEventListener('focusout', resumeMarquee);
    animationFrame = requestAnimationFrame(advanceMarquee);

    return () => {
      cancelAnimationFrame(animationFrame);
      track.removeEventListener('mouseenter', pauseMarquee);
      track.removeEventListener('mouseleave', resumeMarquee);
      track.removeEventListener('focusin', pauseMarquee);
      track.removeEventListener('focusout', resumeMarquee);
    };
  }, []);

  const moveIngredients = useCallback((direction) => {
    const track = ingredientTrackRef.current;
    if (!track) return;

    const firstCard = track.querySelector('.ingredient-card');
    const cardWidth = firstCard?.getBoundingClientRect().width ?? 260;
    const gap = 18;

    track.scrollBy({
      left: direction * (cardWidth + gap) * 2,
      behavior: 'smooth',
    });
  }, []);

  const moveRecommendations = useCallback((direction) => {
    const track = recommendationTrackRef.current;
    if (!track) return;

    const card = track.querySelector('.recommendation-card');
    const cardWidth = card?.getBoundingClientRect().width ?? 250;
    track.scrollBy({ left: direction * (cardWidth + 22) * 2, behavior: 'smooth' });
  }, []);

  return (
    <main className="about-page">
      <div className="about-page__ambient" aria-hidden="true">
        <span className="about-page__orb about-page__orb--pink" />
        <span className="about-page__orb about-page__orb--mint" />
      </div>

      <div className="about-shell">
        {/* Hero */}
        <section className="about-hero" aria-labelledby="about-hero-title">
          <img
            className="about-hero__image"
            src={ABOUT_IMAGES.hero}
            alt="Deya Care skincare campaign portrait"
            fetchPriority="high"
          />
          <div className="about-hero__overlay" />
          <div className="about-hero__content">
            <span className="about-kicker about-kicker--light">
              <Sparkles size={14} aria-hidden="true" />
              A gentler point of view
            </span>
            <h1 id="about-hero-title">
              Skincare for your real life.
              <em>Care that feels like you.</em>
            </h1>
            <p>
              We bring dermatological thinking and everyday well-being together in
              thoughtful, bio-active rituals made to feel gentle, considered and easy to return to.
            </p>
            <a className="about-button about-button--light" href="/shop">
              Explore the collection <ArrowUpRight size={16} aria-hidden="true" />
            </a>
          </div>
          <span className="about-hero__index" aria-hidden="true">01 / OUR STORY</span>
        </section>

        {/* Founder note */}
        <section className="founder-note" aria-labelledby="founder-note-title">
          <div className="founder-note__ornament" aria-hidden="true">“</div>
          <span className="about-kicker">
            <span className="about-kicker__dot" /> A note from our founder
          </span>
          <h2 id="founder-note-title">A little more care. A little more you.</h2>
          <blockquote>
            “I spent years looking for skincare that could keep up with my life—from urban rushes to rural escapes. I needed something simple, pristine and kind to my sensitive skin. After 18 months of perfecting these formulas with experts, Deya Care is finally in your hands. This is my moment of happiness in a container; I hope it becomes yours, too. Welcome to the Happy Tribe!”
          </blockquote>
          <div className="founder-note__signature-row">
            <img
              src={ABOUT_IMAGES.founderSignature}
              alt="Founder’s signature"
              loading="lazy"
            />
            <div>
              <strong>With care,</strong>
              <span>Co-Founder, Deya Care</span>
            </div>
          </div>
          <span className="founder-note__side-label" aria-hidden="true">MADE WITH INTENTION</span>
        </section>

        {/* Intentional skincare */}
        <section className="about-philosophy" aria-labelledby="about-philosophy-title">
          <div className="about-philosophy__copy">
            <span className="about-kicker"><span className="about-kicker__dot" /> The way we see it</span>
            <h2 id="about-philosophy-title">Intentional skincare.<em>Never complicated.</em></h2>
            <p>
              Deya Care is an essentialist collection of high-potency rituals. Our bio-active ingredients are chosen to support the skin barrier and help care feel like a small, restorative part of your day.
            </p>
            <p>
              No overwhelming ten-step routine. No impossible promises. Just considered essentials designed around the moments that make up real life.
            </p>
            <a className="about-text-link" href="/shop">
              Find your daily ritual <ArrowRight size={16} aria-hidden="true" />
            </a>
            <div className="about-philosophy__signature" aria-hidden="true">
              <span>Thoughtful by nature</span>
              <Leaf size={22} />
            </div>
          </div>
          <div className="about-philosophy__visual">
            <img
              src={ABOUT_IMAGES.philosophy}
              alt="A close-up skincare portrait representing Deya Care’s intentional approach"
              loading="lazy"
            />
            <div className="about-image-caption">
              <span>THE DEYA DIFFERENCE</span>
              <strong>Gentle as a cloud.</strong>
            </div>
            <span className="about-philosophy__visual-mark" aria-hidden="true"><Sparkles size={24} /></span>
          </div>
        </section>

        {/* Values */}
        <section className="about-values" aria-labelledby="about-values-title">
          <div className="about-values__image-wrap">
            <img
              src={ABOUT_IMAGES.values}
              alt="Deya Care founder in a relaxed portrait"
              loading="lazy"
            />
            <span className="about-values__image-tag">OUR WHY, EVERY DAY</span>
          </div>
          <div className="about-values__content">
            <span className="about-kicker"><span className="about-kicker__dot" /> What guides us</span>
            <h2 id="about-values-title">Care with a point of view.</h2>
            <p className="about-values__intro">A simple philosophy shapes every ritual we create.</p>
            <div className="about-values__list">
              {values.map((value, index) => {
                const Icon = value.icon;
                const isActive = activeValue === value.id;

                return (
                  <article className={`about-value ${isActive ? 'is-active' : ''}`} key={value.id}>
                    <button
                      className="about-value__trigger"
                      type="button"
                      aria-expanded={isActive}
                      aria-controls={`about-value-panel-${value.id}`}
                      onClick={() => setActiveValue(isActive ? '' : value.id)}
                    >
                      <span className="about-value__number">0{index + 1}</span>
                      <span className="about-value__icon"><Icon size={17} aria-hidden="true" /></span>
                      <span className="about-value__title">{value.title}</span>
                      <ChevronDown className="about-value__chevron" size={17} aria-hidden="true" />
                    </button>
                    <div
                      className="about-value__panel"
                      id={`about-value-panel-${value.id}`}
                      hidden={!isActive}
                    >
                      <p>{value.description}</p>
                    </div>
                  </article>
                );
              })}
            </div>
            <div className="about-values__promise"><Check size={15} aria-hidden="true" /> Everyday care, made more intentional.</div>
          </div>
        </section>

        {/* Ingredient carousel */}
        <section className="about-ingredients" aria-labelledby="about-ingredients-title">
          <div className="about-section-heading">
            <div>
              <span className="about-kicker"><span className="about-kicker__dot" /> Purposeful ingredients</span>
              <h2 id="about-ingredients-title">Research-backed <em>ingredients.</em></h2>
            </div>
            <div className="about-section-heading__aside">
              <p>Every Deya Care product is made with purposeful, high-performance ingredients at considered levels.</p>
              <div className="about-carousel-controls">
                <button type="button" onClick={() => moveIngredients(-1)} aria-label="Scroll ingredients left">
                  <ChevronLeft size={19} aria-hidden="true" />
                </button>
                <button type="button" onClick={() => moveIngredients(1)} aria-label="Scroll ingredients right">
                  <ChevronRight size={19} aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>

          <div className="about-ingredients__track" ref={ingredientTrackRef} tabIndex={0} aria-label="Ingredient highlights">
            {[...ingredients, ...ingredients].map((ingredient, index) => (
              <article
                className="ingredient-card"
                key={`${ingredient.name}-${index}`}
                style={{ '--ingredient-index': index % ingredients.length }}
                aria-hidden={index >= ingredients.length}
              >
                <div className="ingredient-card__image-wrap">
                  <img src={ingredient.image} alt={index >= ingredients.length ? '' : ingredient.name} loading="lazy" />
                  <span className="ingredient-card__image-icon"><Leaf size={15} aria-hidden="true" /></span>
                </div>
                <div className="ingredient-card__copy">
                  <h3>{ingredient.name}</h3>
                  <p>{ingredient.copy}</p>
                  <span className="ingredient-card__footer">A PURPOSEFUL ELEMENT <ArrowUpRight size={13} aria-hidden="true" /></span>
                </div>
              </article>
            ))}
          </div>
          <div className="about-ingredients__hint"><span /> Swipe or use the arrows to explore ingredients <span /></div>
        </section>

        <section className="about-recommendations" aria-labelledby="about-recommendations-title">
          <div className="about-recommendations__heading">
            <h2 id="about-recommendations-title">You may also like</h2>
            <a href="/shop" className="about-recommendations__view-all">View All <ArrowRight size={15} aria-hidden="true" /></a>
          </div>
          <div className="about-recommendations__viewport">
            <button
              className="about-recommendations__arrow about-recommendations__arrow--left"
              type="button"
              onClick={() => moveRecommendations(-1)}
              aria-label="Show previous recommended products"
            >
              <ChevronLeft size={18} aria-hidden="true" />
            </button>
            <div className="about-recommendations__track" ref={recommendationTrackRef} tabIndex={0} aria-label="Recommended products">
              {recommendedProducts.map((product) => (
                <article className="recommendation-card" key={product.id}>
                  <a className="recommendation-card__image" href={`/product/${product.id}`}>
                    <span className="recommendation-card__category">{product.category}</span>
                    <img src={product.image} alt={product.name} loading="lazy" />
                  </a>
                  <div className="recommendation-card__body">
                    <a href={`/product/${product.id}`} className="recommendation-card__name">{product.name}</a>
                    <div className="recommendation-card__price">
                      <strong>₹{product.price.toLocaleString('en-IN', { maximumFractionDigits: 2 })}</strong>
                      {product.originalPrice && <del>₹{product.originalPrice.toLocaleString('en-IN')}</del>}
                    </div>
                    <p>{product.description}</p>
                    <div className="recommendation-card__bottom">
                      <span aria-label="5 out of 5 stars">★★★★★ <b>5</b></span>
                      <button type="button" onClick={() => addToCart(product)}>Add to bag</button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
            <button
              className="about-recommendations__arrow about-recommendations__arrow--right"
              type="button"
              onClick={() => moveRecommendations(1)}
              aria-label="Show next recommended products"
            >
              <ChevronRight size={18} aria-hidden="true" />
            </button>
          </div>
        </section>

        {/* Shared newsletter component from the existing site */}
        <div className="about-newsletter">
          <Newsletter />
        </div>
      </div>
    </main>
  );
}
