import { Link } from 'react-router-dom';

const featuredCars = [
    {
        id: 1,
        name: 'Rolls-Royce Phantom',
        price: '₹ 9.5 Cr',
        tag: 'Ultra Luxury',
        description: 'The pinnacle of automotive craftsmanship. Hand-built perfection with bespoke interiors.',
        emoji: '🏆',
    },
    {
        id: 2,
        name: 'Bentley Continental GT',
        price: '₹ 3.8 Cr',
        tag: 'Grand Tourer',
        description: 'Effortless performance meets British elegance. A grand tourer in its truest form.',
        emoji: '⚡',
    },
    {
        id: 3,
        name: 'Mercedes-Benz S-Class',
        price: '₹ 1.6 Cr',
        tag: 'Executive Sedan',
        description: 'The world\'s most advanced sedan — redefining intelligence and luxury in every detail.',
        emoji: '🌟',
    },
];

export default function PremiumSales() {
    return (
        <div className="service-page">

            {/* Hero Section */}
            <section className="ps-hero">
                <div className="ps-hero-overlay" />
                <div className="ps-hero-content">
                    <span className="ps-badge">PREMIUM COLLECTION</span>
                    <h1>Experience Luxury <br />Beyond Limits</h1>
                    <p>
                        Step into a world where engineering meets artistry. Our Premium Sales division
                        curates the finest automobiles from the world's most prestigious marques — exclusively for you.
                    </p>
                    <div className="ps-hero-actions">
                        <Link to="/" className="btn-gold-fill">Explore Cars</Link>
                        <a href="#featured" className="btn-outline-gold">View Collection</a>
                    </div>
                    <div className="ps-hero-stats">
                        <div className="ps-stat"><span>250+</span><small>Luxury Models</small></div>
                        <div className="ps-stat"><span>500+</span><small>Happy Clients</small></div>
                        <div className="ps-stat"><span>15+</span><small>Premium Brands</small></div>
                    </div>
                </div>
            </section>

            {/* Description Section */}
            <section className="ps-about container">
                <div className="ps-about-inner">
                    <div className="ps-about-text">
                        <h2>Why Choose Our <span className="gold-text">Premium Sales</span></h2>
                        <p>
                            Our dedicated Premium Sales team offers a white-glove purchasing experience tailored to
                            discerning clients. From personalised consultations to fully handled paperwork and
                            doorstep delivery — we make luxury effortless.
                        </p>
                        <ul className="ps-perks">
                            <li>✦ Certified pre-owned and brand-new inventory</li>
                            <li>✦ Personalised finance &amp; leasing solutions</li>
                            <li>✦ Trade-in assessments at market value</li>
                            <li>✦ Complimentary 2-year servicing package</li>
                        </ul>
                    </div>
                    <div className="ps-about-badge-box">
                        <div className="ps-shield">
                            <div className="ps-shield-icon">🛡️</div>
                            <p>Certified Luxury Dealer</p>
                            <small>ISO 9001:2015 Certified</small>
                        </div>
                    </div>
                </div>
            </section>

            {/* Featured Vehicles */}
            <section className="ps-featured container" id="featured">
                <div className="section-header">
                    <h2>Featured <span className="gold-text">Vehicles</span></h2>
                    <p>Handpicked jewels from our exclusive premium collection</p>
                </div>
                <div className="ps-cars-grid">
                    {featuredCars.map(car => (
                        <div key={car.id} className="ps-car-card">
                            <div className="ps-card-emoji">{car.emoji}</div>
                            <span className="ps-car-tag">{car.tag}</span>
                            <h3>{car.name}</h3>
                            <p>{car.description}</p>
                            <div className="ps-card-footer">
                                <span className="ps-price">{car.price}</span>
                                <Link to="/" className="btn-ghost-gold">View Details</Link>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* CTA Section */}
            <section className="ps-cta">
                <div className="container ps-cta-inner">
                    <h2>Ready to Drive Your Dream Car?</h2>
                    <p>Our premium sales advisors are available 7 days a week to guide your journey.</p>
                    <Link to="/" className="btn-gold-fill large">Explore All Cars</Link>
                </div>
            </section>
        </div>
    );
}
