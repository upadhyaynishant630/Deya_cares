import React, { useEffect, useMemo, useState } from 'react';
import {
  ArrowRight,
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  Pause,
  Play,
  Search,
  UserRound,
} from 'lucide-react';
import './Blog.css';

const POSTS_PER_PAGE = 5;


const posts = [
  {
    title: 'Salicylic Acid vs Niacinamide',
    date: 'July 10, 2026',
    image: '/images/blog/salicylic-niacinamide.png',
    excerpt:
      'Salicylic acid and niacinamide are two popular skincare ingredients, but they serve different purposes in your daily routine. Discover how each ingredient works, what to consider for oily or acne-prone skin, and how to build a balanced skincare routine that supports clearer-looking, healthier-looking skin without unnecessarily complicating your product choices.',
    category: 'Ingredients',
    url: '/blogs/salicylic-acid-vs-niacinamide/',
  },
  {
    title:
      'The FDA Just Approved a New Sunscreen Ingredient for the First Time in 20 Years.',
    date: 'June 11, 2026',
    image: '/images/blog/fda-sweat-not.png',
    excerpt:
      'Sunscreen innovation is getting fresh attention, and a new FDA approval has sparked conversations across the skincare industry. Explore why this development matters, how sunscreen ingredients are evaluated, what changing sun-protection research could mean for everyday routines, and which questions consumers should ask before choosing a sunscreen for their skin and lifestyle.',
    category: 'Breaking sunscreen news',
    url: '/blogs/the-fda-just-approved-a-new-sunscreen-ingredient-for-the-first-time-in-20-years/',
  },
  {
    title: 'SLS in Facewash',
    date: 'June 9, 2026',
    image: '/images/blog/sls-facewash.png',
    excerpt:
      'Sodium lauryl sulfate, commonly known as SLS, is an ingredient that often raises questions in skincare. It is also used in controlled research to help study skin irritation. But what does its presence in a facewash actually mean? Explore its cleansing role, potential irritation concerns, how skin types may respond differently, and what to look for when choosing a gentle daily cleanser.',
    category: 'Skin science',
    url: '/blogs/sls-in-facewash/',
  },
  {
    title:
      'How to Reapply Sunscreen During the Day (Even Over Makeup)',
    date: 'May 26, 2026',
    image: '/images/blog/reapply-sunscreen-large.png',
    excerpt:
      'Applying sunscreen in the morning is only one part of an effective sun-protection routine. Reapplying it throughout the day can feel difficult when you are working, travelling, sweating, or wearing makeup. Discover practical ways to refresh your protection, understand the differences between creams, sticks and sprays, and find a routine that fits comfortably into your everyday schedule.',
    category: 'Sunscreen',
    url: '/blogs/how-to-reapply-sunscreen-during-the-day-even-over-makeup/',
  },
  {
    title:
      'Does Sunscreen Cause Vitamin D Deficiency? The WhatsApp Myth Every Indian Needs to Unlearn',
    date: 'May 21, 2026',
    image: '/images/blog/vitamin-d.png',
    excerpt:
      'Does wearing sunscreen mean your body cannot maintain healthy vitamin D levels? This question continues to circulate in everyday skincare conversations. Understand the difference between common social media claims and established guidance, why vitamin D and sun protection both deserve attention, and how to approach your daily routine without relying on viral health messages or skipping sun protection unnecessarily.',
    category: 'Sunscreen',
    url: '/blogs/does-sunscreen-cause-vitamin-d-deficiency-the-whatsapp-myth-every-indian-needs-to-unlearn/',
  },
  {
    title: 'Tan vs Pigmentation',
    date: 'May 18, 2026',
    image: '/images/blog/tan-pigmentation-large.png',
    excerpt:
      'Not every dark patch or change in skin tone is simply a tan. Pigmentation can have different causes, and understanding what you are noticing is an important first step towards choosing suitable skincare. Learn how tanning and pigmentation differ, why repeatedly switching products may not solve the concern, and how consistent sun protection and a thoughtful routine can support a more even-looking complexion.',
    category: 'Skin science',
    url: '/blogs/tan-vs-pigmentation/',
  },
  {
    title: 'Does Sunscreen Cause Acne?',
    date: 'May 13, 2026',
    image: '/images/blog/sunscreen-acne-large.png',
    excerpt:
      'If sunscreen seems to leave your skin greasy or contributes to uncomfortable breakouts, choosing the right formula can feel confusing. The product texture, ingredients, your existing skincare routine, and how thoroughly you cleanse your face may all be worth considering. Explore what non-comedogenic labels mean, which formula types may feel more comfortable on oily skin, and how to find sun protection that suits your everyday needs.',
    category: 'Sunscreen',
    url: '/blogs/does-sunscreen-cause-acne/',
  },
  {
    title: 'Why You Need Sunscreen in Monsoon & Indoors',
    date: 'May 12, 2026',
    image: '/images/blog/sunscreen-monsoon-large.png',
    excerpt:
      'Cloudy skies, rainy afternoons and long hours indoors can make sunscreen seem unnecessary, but your sun-protection choices deserve more consideration than the weather alone. Learn why ultraviolet exposure can still be relevant during monsoon, how UVA differs from UVB, what windows may mean for your routine, and how to build a practical daily habit that works across changing Indian weather conditions.',
    category: 'Sunscreen',
    url: '/blogs/why-you-need-sunscreen-in-monsoon-indoors/',
  },
  {
    title: 'Mineral vs Chemical Sunscreen — Which Is Safer?',
    date: 'May 11, 2026',
    image: '/images/blog/mineral-chemical-large.png',
    excerpt:
      'Mineral and chemical sunscreens work with different UV-filter technologies, which can make choosing between them confusing. Instead of relying on labels or popular skincare myths, explore how these formulations differ, what ingredients do, and why protection, skin compatibility and proper application matter. This guide helps you compare texture, everyday wearability and personal preferences when selecting sunscreen for your routine.',
    category: 'Sunscreen',
    url: '/blogs/mineral-vs-chemical-sunscreen-which-is-safer/',
  },
  {
    title: 'How to Apply Sunscreen Correctly',
    date: 'May 9, 2026',
    image: '/images/blog/apply-sunscreen-large.png',
    excerpt:
      'Choosing a sunscreen is important, but applying it correctly is just as essential to your sun-protection routine. Learn when to apply it in relation to other skincare products, how to cover commonly missed areas, why using an adequate amount matters, and when to reapply during outdoor activities. These practical tips can help make sunscreen a more consistent and manageable part of everyday skincare.',
    category: 'Sunscreen',
    url: '/blogs/how-to-apply-sunscreen-correctly/',
  },
];


const tickerPosts = posts.slice(0, 5);
const featuredStartIndex = 2;

function PostMeta({ date }) {
  return (
    <div className="blog-post-meta">
      <span className="blog-author-avatar" aria-hidden="true">
        <UserRound size={13} strokeWidth={2.5} />
      </span>
      <span className="blog-author-name">deyacare</span>
      <span className="blog-meta-separator" aria-hidden="true">·</span>
      <CalendarDays size={13} aria-hidden="true" />
      <time>{date}</time>
    </div>
  );
}

function StoryCard({ post, featured = false }) {
  return (
    <article className={`story-card${featured ? ' featured-story' : ''}`}>
      <a className="story-image-link" href={post.url} aria-label={`Read ${post.title}`}>
        <img
          className="story-image"
          src={post.image}
          alt={post.title}
          loading={featured ? 'eager' : 'lazy'}
          decoding="async"
        />
      </a>

      <div className="story-copy">
        <span className="blog-pill">Blog</span>
        <h2><a href={post.url}>{post.title}</a></h2>
        <p>{post.excerpt}</p>
        <a className="read-link" href={post.url}>
          Continue Reading <ArrowRight size={14} aria-hidden="true" />
        </a>
        <PostMeta date={post.date} />
      </div>
    </article>
  );
}

function SidebarList({ title, items, kind = 'text' }) {
  return (
    <section className="sidebar-card" aria-label={title}>
      <h3 className="sidebar-title">{title}<span aria-hidden="true" /></h3>
      <ul className={`sidebar-list sidebar-list-${kind}`}>
        {items.map((item) => {
          const isPost = typeof item !== 'string';
          const label = isPost ? item.title : item;
          return (
            <li key={label}>
              {isPost ? <a href={item.url}>{label}</a> : <span>{label}</span>}
            </li>
          );
        })}
      </ul>
    </section>
  );
}

function Sidebar({ query, setQuery, onSearch }) {
  return (
    <aside className="blog-sidebar">
      <section className="sidebar-card search-card">
        <h3 className="sidebar-title">Search<span aria-hidden="true" /></h3>
        <form className="blog-search-form" onSubmit={onSearch} role="search">
          <label className="sr-only" htmlFor="blog-search-input">Search blog posts</label>
          <input
            id="blog-search-input"
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search articles..."
          />
          <button type="submit">Search</button>
        </form>
      </section>

      <SidebarList title="Recent Posts" items={tickerPosts} />
      <SidebarList
        title="Recent Comments"
        items={[
          'Priya M. on How to Reapply Sunscreen During the Day',
          'Aditya K. on How to Reapply Sunscreen',
          'Ankit on SPF 50 vs SPF 30 — Does Indian Skin Need Sunscreen?',
          'prashant yadav on How to Apply Sunscreen Correctly',
        ]}
      />
      <SidebarList title="Archives" items={['July 2026', 'June 2026', 'May 2026']} />
      <SidebarList title="Categories" items={['Blog']} />
    </aside>
  );
}

function TopStoriesTicker({ paused, onToggle }) {
  const repeatedStories = [...tickerPosts, ...tickerPosts];

  return (
    <div className={`blog-topbar${paused ? ' ticker-paused' : ''}`}>
      <div className="top-stories-label"><span aria-hidden="true" />Top Stories</div>
      <div className="top-stories-viewport">
        <div className="top-stories-track">
          {repeatedStories.map((post, index) => (
            <a className="top-story-item" href={post.url} key={`${post.title}-${index}`}>
              <img src={post.image} alt="" loading="lazy" />
              <span className="top-story-text">
                <b>{post.title}</b>
                <time>{post.date}</time>
              </span>
            </a>
          ))}
        </div>
      </div>
      <button
        className="ticker-toggle"
        type="button"
        onClick={onToggle}
        aria-label={paused ? 'Play top stories ticker' : 'Pause top stories ticker'}
        title={paused ? 'Play ticker' : 'Pause ticker'}
      >
        {paused ? <Play size={14} fill="currentColor" /> : <Pause size={14} fill="currentColor" />}
      </button>
    </div>
  );
}

function Pagination({ page, pageCount, onPageChange }) {
  if (pageCount <= 1) return null;

  return (
    <nav className="blog-pagination" aria-label="Blog pages">
      <button
        type="button"
        className="pagination-arrow"
        onClick={() => onPageChange(Math.max(1, page - 1))}
        disabled={page === 1}
        aria-label="Previous page"
      >
        <ChevronLeft size={17} />
      </button>
      {Array.from({ length: pageCount }, (_, index) => index + 1).map((pageNumber) => (
        <button
          type="button"
          key={pageNumber}
          className={pageNumber === page ? 'pagination-number active' : 'pagination-number'}
          onClick={() => onPageChange(pageNumber)}
          aria-current={pageNumber === page ? 'page' : undefined}
        >
          {pageNumber}
        </button>
      ))}
      <button
        type="button"
        className="pagination-arrow"
        onClick={() => onPageChange(Math.min(pageCount, page + 1))}
        disabled={page === pageCount}
        aria-label="Next page"
      >
        <ChevronRight size={17} />
      </button>
    </nav>
  );
}

function MissedStories({ items }) {
  return (
    <section className="missed-stories" aria-labelledby="missed-stories-heading">
      <div className="missed-heading">
        <h2 id="missed-stories-heading">You May Have Missed <span aria-hidden="true" /></h2>
        <Search size={16} aria-hidden="true" />
      </div>
      <div className="missed-grid">
        {items.map((post) => (
          <a className="missed-card" href={post.url} key={post.title}>
            <img src={post.image} alt="" loading="lazy" />
            <span className="missed-card-shade" aria-hidden="true" />
            <span className="missed-card-copy">
              <span className="blog-pill">Blog</span>
              <strong>{post.title}</strong>
              <small><UserRound size={12} aria-hidden="true" /> deyacare <span>·</span> {post.date}</small>
            </span>
          </a>
        ))}
      </div>
    </section>
  );
}

export default function Blog() {
  const [query, setQuery] = useState('');
  const [submittedQuery, setSubmittedQuery] = useState('');
  const [page, setPage] = useState(1);
  const [featuredIndex, setFeaturedIndex] = useState(featuredStartIndex);
  const [tickerPaused, setTickerPaused] = useState(false);
  const [featuredPaused, setFeaturedPaused] = useState(false);

  const filteredPosts = useMemo(() => {
    const normalizedQuery = submittedQuery.trim().toLowerCase();
    if (!normalizedQuery) return posts;

    return posts.filter((post) =>
      `${post.title} ${post.excerpt} ${post.category}`.toLowerCase().includes(normalizedQuery),
    );
  }, [submittedQuery]);

  const pageCount = Math.max(1, Math.ceil(filteredPosts.length / POSTS_PER_PAGE));
  const visiblePosts = filteredPosts.slice((page - 1) * POSTS_PER_PAGE, page * POSTS_PER_PAGE);
  const featuredPost = posts[featuredIndex];

  useEffect(() => {
    if (featuredPaused) return undefined;

    const timer = window.setInterval(() => {
      setFeaturedIndex((currentIndex) => (currentIndex + 1) % posts.length);
    }, 6500);

    return () => window.clearInterval(timer);
  }, [featuredPaused]);

  useEffect(() => {
    setPage((currentPage) => Math.min(currentPage, pageCount));
  }, [pageCount]);

  const handleSearch = (event) => {
    event.preventDefault();
    setSubmittedQuery(query);
    setPage(1);
  };

  const showPreviousFeature = () => {
    setFeaturedIndex((currentIndex) => (currentIndex - 1 + posts.length) % posts.length);
  };

  const showNextFeature = () => {
    setFeaturedIndex((currentIndex) => (currentIndex + 1) % posts.length);
  };

  return (
    <main className="blog-page">
      <div className="blog-container">
        <TopStoriesTicker paused={tickerPaused} onToggle={() => setTickerPaused((paused) => !paused)} />

        <section className="featured-wrap" aria-label="Featured story">
          <StoryCard post={featuredPost} featured />
          <button
            type="button"
            className="featured-control featured-control-prev"
            onClick={showPreviousFeature}
            aria-label="Previous featured story"
          >
            <ChevronLeft size={19} />
          </button>
          <button
            type="button"
            className="featured-control featured-control-next"
            onClick={showNextFeature}
            aria-label="Next featured story"
          >
            <ChevronRight size={19} />
          </button>
          <button
            type="button"
            className="featured-pause"
            onClick={() => setFeaturedPaused((paused) => !paused)}
            aria-label={featuredPaused ? 'Play featured carousel' : 'Pause featured carousel'}
            title={featuredPaused ? 'Play featured stories' : 'Pause featured stories'}
          >
            {featuredPaused ? <Play size={13} fill="currentColor" /> : <Pause size={13} fill="currentColor" />}
          </button>
        </section>

        <section className="blog-layout" aria-label="Latest blog articles">
          <div className="blog-feed">
            {visiblePosts.length > 0 ? (
              visiblePosts.map((post) => <StoryCard key={post.title} post={post} />)
            ) : (
              <div className="blog-empty-state">
                <span className="empty-search-icon"><Search size={22} /></span>
                <h2>No articles found</h2>
                <p>Try another keyword, such as sunscreen, skin science or ingredients.</p>
                <button
                  type="button"
                  onClick={() => {
                    setQuery('');
                    setSubmittedQuery('');
                    setPage(1);
                  }}
                >
                  Clear search
                </button>
              </div>
            )}

            <Pagination page={page} pageCount={pageCount} onPageChange={setPage} />
          </div>

          <Sidebar query={query} setQuery={setQuery} onSearch={handleSearch} />
        </section>

        <MissedStories items={posts.slice(0, 4)} />
      </div>
    </main>
  );
}
