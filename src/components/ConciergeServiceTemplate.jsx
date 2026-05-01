import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Navbar from './Navbar';
import Footer from './Footer';
import { API_BASE } from '../api';

export default function ConciergeServiceTemplate({ title, gradientWord, heroImage, description, features, testimonial, ctaText }) {
    const [formData, setFormData] = useState({ name: '', phone: '', email: '', message: '' });
    const [contacted, setContacted] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const handleContactSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await fetch(`${API_BASE}/bookings`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    car: `Service: ${title}`,
                    name: formData.name,
                    phone: formData.phone,
                    email: formData.email,
                    datetime: 'As soon as possible (Concierge Request)',
                    status: 'Pending'
                })
            });

            if (res.ok) {
                setContacted(true);
                setFormData({ name: '', phone: '', email: '', message: '' });
                window.scrollTo({ top: document.getElementById('booking-form').offsetTop - 100, behavior: 'smooth' });
            } else {
                const error = await res.json();
                alert(error.message || 'Submission failed. Please try again.');
            }
        } catch (err) {
            console.error(err);
            alert('Could not connect to the server.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="service-detail-page"
        >
            <Navbar />

            {/* Hero Section */}
            <section className="sd-hero" style={{ backgroundImage: `url(${heroImage})` }}>
                <div className="sd-hero-overlay" />
                <div className="container sd-hero-content">
                    <motion.span
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="ps-badge"
                    >
                        CONCIERGE SERVICE
                    </motion.span>
                    <motion.h1
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                    >
                        {title.split(gradientWord)[0]}
                        <span className="gold-text-gradient">{gradientWord}</span>
                        {title.split(gradientWord)[1]}
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                    >
                        {description}
                    </motion.p>
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                    >
                        <a href="#booking-form" className="btn-gold-fill-glow">{ctaText}</a>
                    </motion.div>
                </div>
            </section>

            {/* Features Level */}
            <section className="sd-features container">
                <div className="section-header">
                    <h2>Premium <span className="gold-text">Features</span></h2>
                    <p>Exclusive benefits tailored for your luxury lifestyle.</p>
                </div>
                <div className="sd-features-grid">
                    {features.map((feat, idx) => (
                        <motion.div
                            key={idx}
                            className="sd-feature-card glass-card"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            whileHover={{ y: -5, scale: 1.02 }}
                        >
                            <div className="sd-icon-glow">{feat.icon}</div>
                            <h3>{feat.title}</h3>
                            <p>{feat.text}</p>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Testimonial / Trust */}
            <section className="sd-testimonial">
                <div className="sd-testimonial-bg" />
                <div className="container sd-testimonial-content">
                    <div className="sd-quote-mark">“</div>
                    <p className="sd-quote-text">{testimonial.quote}</p>
                    <div className="sd-quote-author">
                        <strong>{testimonial.author}</strong>
                        <span>{testimonial.role}</span>
                    </div>
                </div>
            </section>

            {/* Form Section */}
            <section id="booking-form" className="sd-booking container">
                <div className="sd-booking-grid glass-card-dark">
                    <div className="sd-booking-info">
                        <h2>{ctaText} <span className="gold-text">Now</span></h2>
                        <p>Fill out the form below and a dedicated concierge specialist will contact you shortly to finalize your request.</p>
                        <ul className="sd-perks">
                            <li>✓ Guaranteed response within 2 hours</li>
                            <li>✓ Dedicated specialist</li>
                            <li>✓ Secure & confidential</li>
                        </ul>
                    </div>
                    <form className="sd-form" onSubmit={handleContactSubmit}>
                        {contacted && (
                            <div className="cs-success-banner" style={{ border: '1px solid var(--accent)', color: 'var(--accent)', background: 'rgba(212, 175, 55, 0.1)' }}>
                                <div className="fs-4 mb-2">⏳</div>
                                <div className="fw-bold mb-1">Request Received!</div>
                                <div style={{ fontSize: '0.85rem' }}>Your request is awaiting admin approval. We will contact you shortly.</div>
                            </div>
                        )}
                        <div className="bo-form-group">
                            <label>Full Name</label>
                            <input
                                type="text"
                                className="bo-input"
                                placeholder="E.g. James Bond"
                                value={formData.name}
                                onChange={e => setFormData({ ...formData, name: e.target.value })}
                                required
                            />
                        </div>
                        <div className="bo-form-group-row">
                            <div className="bo-form-group w-50">
                                <label>Phone</label>
                                <input
                                    type="tel"
                                    className="bo-input"
                                    placeholder="+91 XXXXX XXXXX"
                                    value={formData.phone}
                                    onChange={e => setFormData({ ...formData, phone: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="bo-form-group w-50">
                                <label>Email</label>
                                <input
                                    type="email"
                                    className="bo-input"
                                    placeholder="james@example.com"
                                    value={formData.email}
                                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                                />
                            </div>
                        </div>
                        <div className="bo-form-group">
                            <label>Additional Requirements (Optional)</label>
                            <textarea
                                className="bo-input bo-textarea"
                                rows={3}
                                placeholder="Any specific details we should know?"
                                value={formData.message}
                                onChange={e => setFormData({ ...formData, message: e.target.value })}
                            />
                        </div>
                        <button type="submit" className="btn-gold-fill-glow submit-btn" disabled={loading}>
                            {loading ? 'Submitting...' : 'Submit Request'}
                        </button>
                    </form>
                </div>
            </section>

            <Footer />
        </motion.div>
    );
}
