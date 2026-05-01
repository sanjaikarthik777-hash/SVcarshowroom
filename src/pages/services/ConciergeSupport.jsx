import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const services = [
    {
        id: 1,
        icon: '🚗',
        title: 'Test Drive Booking',
        description:
            'Book a private test drive at your preferred location — our driver will bring the car to you. Available 7 days a week.',
        action: 'Book Test Drive',
        color: '#d4af37',
        path: '/test-drive-booking'
    },
    {
        id: 2,
        icon: '👑',
        title: 'VIP Delivery',
        description:
            'Experience a cinematic delivery ceremony at your doorstep, complete with luxury gifting and a personal handover specialist.',
        action: 'Schedule Delivery',
        color: '#c0a020',
        path: '/vip-delivery'
    },
    {
        id: 3,
        icon: '🔧',
        title: 'Maintenance Scheduling',
        description:
            'Effortless service scheduling with certified master technicians. We pick up your car, service it, and return it — spotless.',
        action: 'Book Service',
        color: '#b8962e',
        path: '/maintenance-scheduling'
    },
    {
        id: 4,
        icon: '🛡️',
        title: 'Extended Warranty',
        description:
            'Comprehensive coverage plans tailored to your vehicle. Peace of mind with up to 5-year protection packages.',
        action: 'Learn More',
        color: '#d4af37',
        path: '/extended-warranty'
    },
    {
        id: 5,
        icon: '🌍',
        title: 'International Sourcing',
        description:
            'Sourcing specific models globally? Our concierge team locates and imports rare editions directly for you.',
        action: 'Enquire Now',
        color: '#c0a020',
        path: '/international-sourcing'
    },
    {
        id: 6,
        icon: '📋',
        title: 'Documentation Support',
        description:
            'Full paperwork assistance — registration, insurance, loan processing and RTO services handled end-to-end.',
        action: 'Get Help',
        color: '#b8962e',
        path: '/documentation-support'
    },
];

const faqs = [
    {
        q: 'How quickly can I book a test drive?',
        a: 'Test drives can be booked within 24 hours. Our concierge team will coordinate your preferred time and location.',
    },
    {
        q: 'Is VIP home delivery available in all cities?',
        a: 'VIP delivery is available across all major metro cities. Contact us for remote area availability.',
    },
    {
        q: 'How does the maintenance pick-up service work?',
        a: 'Simply schedule via our portal or call. We arrive, collect your vehicle, complete the service at our facility, and return it to you.',
    },
    {
        q: 'Can I track my bespoke order status?',
        a: 'Yes, every bespoke order is assigned a dedicated advisor who provides real-time updates throughout production.',
    },
];

export default function ConciergeSupport() {
    const [openFaq, setOpenFaq] = useState(null);
    const [formData, setFormData] = useState({ name: '', phone: '', service: '', message: '' });
    const [contacted, setContacted] = useState(false);

    const handleContactSubmit = (e) => {
        e.preventDefault();
        setContacted(true);
        setTimeout(() => setContacted(false), 4000);
        setFormData({ name: '', phone: '', service: '', message: '' });
    };

    return (
        <div className="service-page">

            {/* Hero */}
            <section className="cs-hero">
                <div className="cs-hero-overlay" />
                <div className="container cs-hero-content">
                    <span className="ps-badge">CONCIERGE SUPPORT</span>
                    <h1>White-Glove <span className="gold-text">Concierge</span> <br />At Your Service</h1>
                    <p>
                        Your luxury ownership experience extends far beyond the sale.
                        Our concierge team is dedicated to every aspect of your automotive journey.
                    </p>
                    <div className="cs-contact-strip">
                        <a href="tel:+918000000000" className="cs-strip-item">📞 +91 80000 00000</a>
                        <span className="cs-strip-divider" />
                        <a href="mailto:concierge@carshowroom.com" className="cs-strip-item">✉️ concierge@carshowroom.com</a>
                        <span className="cs-strip-divider" />
                        <span className="cs-strip-item">🕐 Available 24/7</span>
                    </div>
                </div>
            </section>

            {/* Services Grid */}
            <section className="cs-services container">
                <div className="section-header">
                    <h2>Our <span className="gold-text">Concierge Services</span></h2>
                    <p>Everything you need — handled with precision and care</p>
                </div>
                <div className="cs-grid">
                    {services.map((svc, idx) => (
                        <motion.div
                            key={svc.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                        >
                            <Link to={svc.path} className="cs-card cs-card-interactive" style={{ textDecoration: 'none' }}>
                                <div className="cs-card-icon" style={{ color: svc.color }}>{svc.icon}</div>
                                <h3>{svc.title}</h3>
                                <p>{svc.description}</p>
                                <button className="btn-ghost-gold cs-btn">{svc.action} →</button>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* FAQ */}
            <section className="cs-faq container">
                <div className="section-header">
                    <h2>Frequently Asked <span className="gold-text">Questions</span></h2>
                </div>
                <div className="cs-faq-list">
                    {faqs.map((faq, idx) => (
                        <div
                            key={idx}
                            className={`cs-faq-item ${openFaq === idx ? 'open' : ''}`}
                            onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                        >
                            <div className="cs-faq-q">
                                <span>{faq.q}</span>
                                <span className="cs-faq-arrow">{openFaq === idx ? '▲' : '▼'}</span>
                            </div>
                            {openFaq === idx && <div className="cs-faq-a">{faq.a}</div>}
                        </div>
                    ))}
                </div>
            </section>

            {/* Contact Support Section */}
            <section className="cs-contact container">
                <div className="cs-contact-grid">
                    <div className="cs-contact-info">
                        <h2>Get in <span className="gold-text">Touch</span></h2>
                        <p>
                            Our concierge specialists are ready to assist you with any query,
                            request, or feedback. Expect a response within 2 hours.
                        </p>
                        <div className="cs-info-items">
                            <div className="cs-info-item">📞 <span>+91 80000 00000</span></div>
                            <div className="cs-info-item">✉️ <span>concierge@carshowroom.com</span></div>
                            <div className="cs-info-item">📍 <span>Showroom Drive, Luxury Avenue, Mumbai</span></div>
                            <div className="cs-info-item">🕐 <span>Mon – Sun: 9:00 AM – 9:00 PM</span></div>
                        </div>
                    </div>

                    <form className="cs-contact-form" onSubmit={handleContactSubmit}>
                        <h3>Send a <span className="gold-text">Message</span></h3>

                        {contacted && (
                            <div className="cs-success-banner">
                                ✅ Message received! We'll contact you within 2 hours.
                            </div>
                        )}

                        <div className="bo-form-group">
                            <label>Your Name</label>
                            <input
                                type="text"
                                className="bo-input"
                                placeholder="Full name"
                                value={formData.name}
                                onChange={e => setFormData({ ...formData, name: e.target.value })}
                                required
                            />
                        </div>
                        <div className="bo-form-group">
                            <label>Phone Number</label>
                            <input
                                type="tel"
                                className="bo-input"
                                placeholder="+91 XXXXX XXXXX"
                                value={formData.phone}
                                onChange={e => setFormData({ ...formData, phone: e.target.value })}
                                required
                            />
                        </div>
                        <div className="bo-form-group">
                            <label>Service Required</label>
                            <select
                                className="bo-input"
                                value={formData.service}
                                onChange={e => setFormData({ ...formData, service: e.target.value })}
                                required
                            >
                                <option value="">Select a service</option>
                                {services.map(s => <option key={s.id} value={s.title}>{s.title}</option>)}
                            </select>
                        </div>
                        <div className="bo-form-group">
                            <label>Message</label>
                            <textarea
                                className="bo-input bo-textarea"
                                rows={4}
                                placeholder="Describe how we can assist you..."
                                value={formData.message}
                                onChange={e => setFormData({ ...formData, message: e.target.value })}
                            />
                        </div>
                        <button type="submit" className="btn-gold-fill" style={{ width: '100%', marginTop: '1rem' }}>
                            Contact Support →
                        </button>
                    </form>
                </div>
            </section>

        </div>
    );
}
