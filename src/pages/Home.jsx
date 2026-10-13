import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  Check,
  FlaskConical,
  Heart,
  Leaf,
  Play,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { products } from '../data/products';
import ProductCard from '../components/ProductCard';
import Newsletter from '../components/Newsletter';
import './Home.css';

const heroSlides = [
  {
    eyebrow: 'SKINCARE THAT GETS YOU',
    title: 'Your skin, your rhythm, your glow.',
    description:
      'Thoughtful skincare for real skin, busy days and little moments of self-care.',
    image: '/images/banners/homepage-1.jpg',
    label: 'Meet your new ritual',
    link: '/shop',
    cta: 'Shop the collection',
  },
  {
    eyebrow: 'LESS PRESSURE. MORE CARE.',
    title: 'Make every skin day a good one.',
    description:
      'Discover everyday essentials designed to make your skincare routine feel simple and special.',
    image: '/images/banners/homepage-2.jpg',
    label: 'The Deya edit',
    link: '/shop',
    cta: 'Find your favourites',
  },
  {
    eyebrow: 'THE DEYA CARE EDIT',
    title: 'A little care goes a long way.',
    description:
      'Build a routine that feels good to come back to, with essentials made for real skin and real days.',
    image: '/images/banners/shop-header.jpg',
    label: 'Explore the edit',
    link: '/shop',
    cta: 'Shop Deya Care',
  },
];

const shopCategories = [
  {
    name: 'Cleansers',
    subtitle: 'A fresh start',
    image: '/images/products/blemish-be-gone.jpg',
    tone: 'peach',
    keywords: ['cleanser', 'face wash', 'cleanse'],
  },
  {
    name: 'Serums',
    subtitle: 'Targeted everyday care',
    image: '/images/products/glaze-drop.png',
    tone: 'yellow',
    keywords: ['serum', 'glaze drop', 'clearity drop'],
  },
  {
    name: 'Moisturisers',
    subtitle: 'Comfort your skin',
    image: '/images/products/thirsty-no-more.png',
    tone: 'lilac',
    keywords: ['moisturizer', 'moisturiser', 'crème', 'cream', 'hydrating'],
  },
  {
    name: 'Sunscreens',
    subtitle: 'Your daily shield',
    image: '/images/products/cloud-screen.png',
    tone: 'blue',
    keywords: ['sunscreen', 'spf', 'cloud screen', 'sweat not'],
  },
];

const bestsellerTabs = [
  { label: 'All skincare', keywords: [] },
  { label: 'Cleansers', keywords: ['cleanser', 'face wash', 'cleanse'] },
  { label: 'Serums', keywords: ['serum', 'glaze drop', 'clearity drop'] },
  {
    label: 'Moisturisers',
    keywords: ['moisturizer', 'moisturiser', 'cream', 'crème', 'hydrating'],
  },
  { label: 'Sun care', keywords: ['sunscreen', 'spf', 'cloud screen', 'sweat not'] },
];

const benefits = [
  {
    icon: FlaskConical,
    title: 'Thoughtful formulas',
    text: 'Ingredients chosen with purpose.',
  },
  {
    icon: Heart,
    title: 'Care without pressure',
    text: 'Everyday skincare, made approachable.',
  },
  {
    icon: Leaf,
    title: 'Kind choices',
    text: 'Little rituals, made more meaningful.',
  },
];

// Replace these sample content cards with approved customer reviews before launch.
// No customer identities or review-verification claims are fabricated here.
const reviews = [
  {
    id: 'cloud-screen',
    initials: 'DC',
    name: 'Deya Care customer',
    product: 'Cloud Screen SPF 50 PA +++ Gel Sunscreen',
    productImage: '/images/products/cloud-screen.png',
    title: 'An everyday favourite',
    text: 'The Cloud Screen is genuinely the first sunscreen I have enjoyed wearing every day. No heaviness, no compromise.',
    rating: 5,
  },
  {
    id: 'luma-cleanse',
    initials: 'DC',
    name: 'Deya Care customer',
    product: 'Luma Cleanse Brightening Gel Face Wash',
    productImage: '/images/products/blemish-be-gone.jpg',
    title: 'A fresh start',
    text: 'A refreshing cleanse that makes my daily skincare routine feel simple and easy to come back to.',
    rating: 5,
  },
  {
    id: 'glaze-drop',
    initials: 'DC',
    name: 'Deya Care customer',
    product: 'Glaze Drop Vitamin C Serum',
    productImage: '/images/products/glaze-drop.png',
    title: 'A little daily glow',
    text: 'I love having a considered step in my routine that feels like a small moment of self-care.',
    rating: 5,
  },
  {
    id: 'thirsty-no-more',
    initials: 'DC',
    name: 'Deya Care customer',
    product: 'Thirsty No More Moisturiser',
    productImage: '/images/products/thirsty-no-more.png',
    title: 'Comfort in my routine',
    text: 'A lovely reminder that skincare does not need to be complicated to feel good.',
    rating: 5,
  },
];

const videoCards = [
  {
    title: "Deo D'Lite Underarm Roll-On",
    image: '/images/gallery/community-1.png',
    category: 'BODY CARE',
    url: 'https://www.instagram.com/reel/Da9zmINyw5O/',
    productImage: '/images/products/deo-dlite.jpg',
    price: '₹374',
    originalPrice: '₹499',
  },
  {
    title: 'Cloud Screen SPF 50 PA +++',
    image: '/images/gallery/community-3.png',
    category: 'SUN CARE',
    url: 'https://www.instagram.com/reel/DbNY-1FSDs8/',
    productImage: '/images/products/cloud-screen.png',
    price: '₹562',
    originalPrice: '₹749',
  },
  {
    title: 'Sweat Not Sports Sunscreen',
    image: '/images/gallery/community-5.png',
    category: 'ACTIVE CARE',
    url: 'https://www.instagram.com/reel/DbP8Le_TTsL/',
    productImage: '/images/products/sweat-not.jpg',
    price: '₹637',
    originalPrice: '₹849',
  },
  {
    title: 'Sweat Not SPF 50 PA +++',
    image: '/images/gallery/community-2.png',
    category: 'ACTIVE CARE',
    url: 'https://www.instagram.com/reel/Da7jW04BlsH/',
    productImage: '/images/products/sweat-not.jpg',
    price: '₹637',
    originalPrice: '₹849',
  },
];

const communityImages = [1, 3, 5, 2, 4, 6];

const marqueeItems = [
  'Everyday skincare',
  'Thoughtful formulas',
  'Your skin, your way',
  'Little rituals, more care',
  'Made for real routines',
];

const getProductName = (product) =>
  String(product?.name || product?.title || product?.productName || '');

const matchesKeywords = (product, keywords) => {
  if (!keywords.length) return true;

  const name = getProductName(product).toLowerCase();
  const category = String(product?.category || '').toLowerCase();
  const description = String(product?.description || '').toLowerCase();
  const searchableText = `${name} ${category} ${description}`;

  return keywords.some((keyword) =>
    searchableText.includes(keyword.toLowerCase())
  );
};

function SectionHeading({ eyebrow, title, description, link = '/shop' }) {
  return (
    <div className="deya-section-heading">
      <div className="deya-section-heading-copy">
        <span className="deya-eyebrow">{eyebrow}</span>
        <h2>{title}</h2>
        {description && <p>{description}</p>}
      </div>

      <Link className="deya-view-link" to={link}>
        Explore all <ArrowRight size={16} />
      </Link>
    </div>
  );
}

function ProductRail({ items, addToCart, label }) {
  const railRef = useRef(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    setOffset(0);
    if (railRef.current) railRef.current.scrollTo({ left: 0 });
  }, [items]);

  const moveRail = (direction) => {
    const rail = railRef.current;
    if (!rail) return;

    const distance = Math.max(rail.clientWidth * 0.78, 220);
    const maxOffset = Math.max(0, rail.scrollWidth - rail.clientWidth);
    const nextOffset =
      direction === 'next'
        ? Math.min(rail.scrollLeft + distance, maxOffset)
        : Math.max(rail.scrollLeft - distance, 0);

    rail.scrollTo({ left: nextOffset, behavior: 'smooth' });
  };

  if (!items.length) {
    return (
      <div className="deya-empty-products">
        <Sparkles size={22} />
        <p>No products were found in this category yet.</p>
        <Link to="/shop">Explore the complete collection</Link>
      </div>
    );
  }

  const maxOffset = railRef.current
    ? Math.max(0, railRef.current.scrollWidth - railRef.current.clientWidth)
    : 0;

  return (
    <div className="deya-product-rail-wrap">
      <div className="deya-rail-controls">
        <span>{label}</span>
        <div>
          <button
            type="button"
            aria-label={`Previous ${label}`}
            onClick={() => moveRail('previous')}
            disabled={offset <= 2}
          >
            <ArrowLeft size={17} />
          </button>
          <button
            type="button"
            aria-label={`Next ${label}`}
            onClick={() => moveRail('next')}
            disabled={maxOffset > 0 && offset >= maxOffset - 2}
          >
            <ArrowRight size={17} />
          </button>
        </div>
      </div>

      <div
        className="deya-product-rail"
        ref={railRef}
        onScroll={(event) => setOffset(event.currentTarget.scrollLeft)}
      >
        {items.map((product, index) => (
          <article
            className="deya-product-rail-item"
            key={product.id ?? `${getProductName(product)}-${index}`}
          >
            <ProductCard product={product} addToCart={addToCart} />
          </article>
        ))}
      </div>
    </div>
  );
}

function ReviewCard({ review }) {
  return (
    <article className="deya-review-card">
      <div className="deya-review-profile">
        <span className="deya-review-avatar" aria-hidden="true">
          {review.initials}
        </span>
        <div className="deya-review-profile-name">
          <h3>{review.name}</h3>
          <span className="deya-review-label">Customer note</span>
        </div>
        <span className="deya-review-mark" aria-hidden="true">
          <Check size={12} />
        </span>
      </div>

      <div
        className="deya-review-stars"
        role="img"
        aria-label={`${review.rating} out of 5 stars (sample review layout)`}
      >
        {'★'.repeat(review.rating)}
      </div>

      <h4>{review.title}</h4>
      <p className="deya-review-text">“{review.text}”</p>

      <div className="deya-review-product">
        <img src={review.productImage} alt="" loading="lazy" />
        <div>
          <span>IN THE ROUTINE</span>
          <strong>{review.product}</strong>
          <Link to="/shop">
            Explore product <ArrowRight size={13} />
          </Link>
        </div>
      </div>
    </article>
  );
}

export default function Home({ addToCart }) {
  const [activeHero, setActiveHero] = useState(0);
  const [activeTab, setActiveTab] = useState(0);
  const [showAllProducts, setShowAllProducts] = useState(false);

  const featuredProducts = useMemo(() => products.slice(0, 8), []);

  const filteredProducts = useMemo(() => {
    const selectedTab = bestsellerTabs[activeTab];
    return products.filter((product) =>
      matchesKeywords(product, selectedTab.keywords)
    );
  }, [activeTab]);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveHero((current) => (current + 1) % heroSlides.length);
    }, 5500);

    return () => window.clearInterval(timer);
  }, []);

  const selectCategory = (category) => {
    const index = bestsellerTabs.findIndex((tab) => tab.label === category);
    setActiveTab(index >= 0 ? index : 0);
    document.getElementById('deya-bestsellers')?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  };

  return (
    <main className="deya-home">
      <div className="deya-promo-bar">
        <span className="deya-promo-sparkle"><Sparkles size={15} /></span>
        <p>
          A little more love for your skin.{' '}
          <strong>Discover your Deya favourites.</strong>
        </p>
        <Link to="/shop" aria-label="Shop Deya Care">
          <ArrowRight size={16} />
        </Link>
      </div>

      {/* Full-width hero slider */}
      <section className="deya-hero" aria-label="Discover Deya Care">
        {heroSlides.map((hero, index) => (
          <div
            className={`deya-hero-slide ${index === activeHero ? 'is-active' : ''}`}
            key={hero.image}
            aria-hidden={index !== activeHero}
          >
            <img
              className="deya-hero-background"
              src={hero.image}
              alt={`${hero.label} banner`}
              fetchpriority={index === 0 ? 'high' : 'auto'}
            />
          </div>
        ))}
      </section>

      <section className="deya-benefits" aria-label="Deya Care values">
        {benefits.map(({ icon: Icon, title, text }) => (
          <div className="deya-benefit" key={title}>
            <span className="deya-benefit-icon"><Icon size={24} strokeWidth={1.5} /></span>
            <div><h3>{title}</h3><p>{text}</p></div>
          </div>
        ))}
      </section>

      {/* Bestseller cards */}
      <section className="deya-section deya-bestsellers" id="deya-bestsellers">
        <SectionHeading
          eyebrow="The Deya Care edit"
          title={<>Your next skin favourite <em>starts here.</em></>}
          description="Explore everyday essentials selected to make your routine feel a little more special."
        />
        <div className="deya-category-tabs" aria-label="Filter bestsellers">
          {bestsellerTabs.map((tab, index) => (
            <button
              type="button"
              key={tab.label}
              className={activeTab === index ? 'active' : ''}
              onClick={() => setActiveTab(index)}
              aria-pressed={activeTab === index}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <ProductRail items={filteredProducts} addToCart={addToCart} label="Bestsellers" />
        <div className="deya-center-action">
          <Link className="deya-outline-button" to="/shop">
            Shop all skincare <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      {/* Category shopping */}
      <section className="deya-section deya-shop-by">
        <SectionHeading
          eyebrow="A ritual for every mood"
          title={<>What does your skin <em>need today?</em></>}
          description="Start with how you want your skin to feel."
        />
        <div className="deya-category-grid">
          {shopCategories.map((category, index) => (
            <button
              type="button"
              className={`deya-category-card ${category.tone}`}
              key={category.name}
              onClick={() => selectCategory(category.name === 'Sunscreens' ? 'Sun care' : category.name)}
            >
              <div className="deya-category-image">
                <img
                  src={category.image}
                  alt={`${category.name} by Deya Care`}
                  loading="lazy"
                  onError={(event) => { event.currentTarget.style.visibility = 'hidden'; }}
                />
              </div>
              <div className="deya-category-copy">
                <span>0{index + 1} / YOUR ROUTINE</span>
                <h3>{category.name}</h3>
                <p>{category.subtitle}</p>
                <span className="deya-category-arrow"><ArrowRight size={17} /></span>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* Product-led editorial feature; no text is placed over the image */}
      <section className="deya-featured-banner" aria-label="A Deya Care skincare ritual">
        <div className="deya-featured-image">
          <img
            src="/images/banners/homepage-2.jpg"
            alt="Deya Care skincare collection"
            loading="lazy"
          />
        </div>
        <div className="deya-featured-copy">
          <span className="deya-eyebrow">A little time for yourself</span>
          <h2>Your routine.<br />Your <em>kind of glow.</em></h2>
          <p>
            From a refreshing cleanse to your final layer of care, discover
            products that make everyday skincare feel more personal.
          </p>
          <Link className="deya-button deya-button-dark" to="/shop">
            Explore the collection <ArrowRight size={17} />
          </Link>
          <div className="deya-featured-note"><Check size={16} /> Make room for the little rituals.</div>
        </div>
      </section>

      {/* More products */}
      <section className="deya-section deya-new-arrivals">
        <SectionHeading
          eyebrow="Meet your next favourite"
          title={<>The Deya <em>edit.</em></>}
          description="Explore the products that make your everyday ritual feel special."
        />
        <ProductRail
          items={showAllProducts ? products : featuredProducts.slice(0, 4)}
          addToCart={addToCart}
          label="Explore skincare"
        />
        <div className="deya-center-action">
          <button
            type="button"
            className="deya-outline-button"
            onClick={() => setShowAllProducts((current) => !current)}
          >
            {showAllProducts ? 'Show fewer products' : 'Discover more products'}
            <ArrowRight size={16} />
          </button>
        </div>
      </section>

      {/* Video-style product cards */}
      <section className="deya-video-section">
        <div className="deya-section deya-video-inner">
          <SectionHeading
            eyebrow="A little inspiration"
            title={<>Watch it. Love it. <em>Make it yours.</em></>}
            description="Product highlights and everyday skincare inspiration from Deya Care."
            link="/shop"
          />
          <div className="deya-video-grid">
            {videoCards.map((card, index) => (
              <article className="deya-video-card" key={card.title}>
                <a
                  className="deya-video-image"
                  href={card.url}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`Watch ${card.title} on Instagram`}
                >
                  <img
                    src={card.image}
                    alt={card.title}
                    loading="lazy"
                    onError={(event) => { event.currentTarget.style.visibility = 'hidden'; }}
                  />
                  <span className="deya-video-shade" />
                  <span className="deya-video-featured">Deya Care</span>
                  <span className="deya-video-play"><Play size={29} fill="currentColor" /></span>
                  <strong className="deya-video-watch">Watch on Instagram</strong>
                  <span className="deya-video-number">0{index + 1}</span>
                </a>
                <div className="deya-video-copy">
                  <img
                    src={card.productImage}
                    alt=""
                    loading="lazy"
                    onError={(event) => { event.currentTarget.style.visibility = 'hidden'; }}
                  />
                  <div>
                    <span className="deya-video-category">{card.category}</span>
                    <h3>{card.title}</h3>
                    <span className="deya-video-price">{card.price} <del>{card.originalPrice}</del></span>
                  </div>
                  <Link to="/shop" aria-label={`Shop ${card.title}`}><ArrowRight size={17} /></Link>
                </div>
              </article>
            ))}
          </div>
          <p className="deya-video-note">Video cards open the corresponding Instagram post in a new tab.</p>
        </div>
      </section>

      {/* Deya values */}
      <section className="deya-clean-beauty">
        <div className="deya-clean-heading">
          <span className="deya-eyebrow">The Deya philosophy</span>
          <h2>Care that feels <em>like care.</em></h2>
          <p>Thoughtful choices. Everyday rituals. Your skin, your way.</p>
        </div>
        <div className="deya-clean-values">
          <div><FlaskConical size={32} strokeWidth={1.4} /><span><strong>Thoughtful</strong><small>Formulas with purpose</small></span></div>
          <div><ShieldCheck size={32} strokeWidth={1.4} /><span><strong>Considered care</strong><small>Designed for daily routines</small></span></div>
          <div><Leaf size={32} strokeWidth={1.4} /><span><strong>Kind choices</strong><small>Care with intention</small></span></div>
        </div>
      </section>

      {/* New section 1: editorial marquee inspired by the Featured In reference.
          It uses Deya-specific values rather than claiming media endorsements. */}
      <section className="deya-featured-in" aria-label="The Deya Care difference">
        <div className="deya-featured-in-copy">
          <span className="deya-eyebrow">The Deya difference</span>
          <h2>Skincare, made <em>thoughtful.</em></h2>
          <p>Little rituals. Considered care. A routine that feels like yours.</p>
        </div>
        <div className="deya-marquee" aria-label="Deya Care values">
          <div className="deya-marquee-track">
            {[...marqueeItems, ...marqueeItems].map((item, index) => (
              <span key={`${item}-${index}`}>{item}<i aria-hidden="true">✳</i></span>
            ))}
          </div>
        </div>
      </section>

      {/* New section 2: image-only full-width brand collage. No copy or buttons over the banner. */}
      <section className="deya-image-banner" aria-label="Deya Care skincare and community gallery">
        <div className="deya-image-banner-grid">
          {communityImages.map((image, index) => (
            <div className={`deya-image-banner-tile tile-${index + 1}`} key={`banner-${image}`}>
              <img
                src={`/images/gallery/community-${image}.png`}
                alt={`Deya Care skincare and community image ${index + 1}`}
                loading="lazy"
                onError={(event) => { event.currentTarget.style.visibility = 'hidden'; }}
              />
            </div>
          ))}
        </div>
      </section>

      {/* Reviews styled after the provided reference */}
      <section className="deya-review-section">
        <div className="deya-review-heading">
          <span className="deya-eyebrow">Notes from the routine</span>
          <h2>Love That Keeps <em>Us Going</em></h2>
          <p>A little appreciation for the everyday moments that make skincare personal.</p>
        </div>
        <div className="deya-review-rail">
          {reviews.map((review) => <ReviewCard key={review.id} review={review} />)}
        </div>
        <p className="deya-review-disclaimer">
          Sample review layout for design preview. Replace sample copy and ratings with approved customer feedback before publishing.
        </p>
      </section>

      {/* Instagram-style community grid */}
      <section className="deya-section deya-community">
        <div className="deya-community-heading">
          <span className="deya-eyebrow">Deya Care + you</span>
          <h2>A little love on <em>your feed.</em></h2>
          <p>Skincare, little rituals and moments worth sharing.</p>
          <a
            className="deya-social-link"
            href="https://www.instagram.com/deya.care/"
            target="_blank"
            rel="noreferrer"
          >
            Follow @deya.care <ArrowRight size={16} />
          </a>
        </div>
        <div className="deya-community-grid">
          {communityImages.map((image, index) => (
            <a
              href="https://www.instagram.com/deya.care/"
              target="_blank"
              rel="noreferrer"
              key={`community-${image}`}
              className={`deya-community-tile tile-${index + 1}`}
              aria-label="Explore Deya Care on Instagram"
            >
              <img
                src={`/images/gallery/community-${image}.png`}
                alt={`Deya Care community moment ${index + 1}`}
                loading="lazy"
                onError={(event) => { event.currentTarget.style.visibility = 'hidden'; }}
              />
              <span><Heart size={19} /></span>
            </a>
          ))}
        </div>
      </section>

      <div className="deya-home-newsletter"><Newsletter /></div>
    </main>
  );
}
