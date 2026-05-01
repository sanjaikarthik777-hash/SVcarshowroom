import { Link } from 'react-router-dom';

export default function Hero() {
    return (
        <section className="hero-section">
            <div className="hero-overlay" />
            <div className="hero-bg-pattern" />

            <div className="container hero-content">
                <div className="hero-eyebrow">
                    <span className="hero-eyebrow-dot" />
                    PREMIER AUTOMOTIVE EXPERIENCE
                    <span className="hero-eyebrow-dot" />
                </div>

                <h1 className="hero-title">
                    Drive the <span className="hero-title-gold">Extraordinary</span>
                </h1>

                <p className="hero-subtitle">
                    Explore our curated collection of the world's most coveted automobiles —
                    from refined luxury sedans to raw, unbridled supercars.
                </p>

                <div className="hero-actions">
                    <a href="#cars" className="hero-btn-primary">
                        Explore Collection
                        <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                    </a>
                    <Link to="/concierge-support" className="hero-btn-secondary">
                        Concierge Support
                    </Link>
                </div>

                <div className="hero-stats-row">
                    <div className="hero-stat-item">
                        <span className="hero-stat-number">250<span className="hero-stat-plus">+</span></span>
                        <span className="hero-stat-label">Premium Vehicles</span>
                    </div>
                    <div className="hero-stat-divider" />
                    <div className="hero-stat-item">
                        <span className="hero-stat-number">15<span className="hero-stat-plus">+</span></span>
                        <span className="hero-stat-label">Luxury Brands</span>
                    </div>
                    <div className="hero-stat-divider" />
                    <div className="hero-stat-item">
                        <span className="hero-stat-number">500<span className="hero-stat-plus">+</span></span>
                        <span className="hero-stat-label">Happy Clients</span>
                    </div>
                </div>
            </div>

            <div className="hero-scroll-hint">
                <div className="hero-scroll-line" />
                <span>SCROLL</span>
            </div>
        </section>
    );
}
