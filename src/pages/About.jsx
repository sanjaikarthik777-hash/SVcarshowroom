import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import '../about.css'; // Create this file next

export default function About() {
    // Scroll to top on mount
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const fadeInUp = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
    };

    const staggerContainer = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.3
            }
        }
    };

    return (
        <div className="about-page">
            {/* Hero Section */}
            <section className="about-hero">
                <div className="about-hero-overlay"></div>
                <motion.div 
                    className="about-hero-content"
                    initial="hidden"
                    animate="visible"
                    variants={staggerContainer}
                >
                    <motion.h1 variants={fadeInUp}>A Legacy of <span className="gold-text-gradient">Automotive Excellence</span></motion.h1>
                    <motion.p variants={fadeInUp}>Redefining luxury and performance ownership since 1998.</motion.p>
                </motion.div>
            </section>

            {/* Our Story Section */}
            <section className="about-section story-section">
                <div className="container">
                    <div className="row align-items-center">
                        <motion.div 
                            className="col-lg-6 mb-5 mb-lg-0"
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.8 }}
                        >
                            <h2 className="section-title">Our <span className="gold-text">Story</span></h2>
                            <p className="lead font-weight-bold mb-4" style={{ color: '#e2e8f0', letterSpacing: '0.5px' }}>
                                Born from a profound passion for engineering mastery and aesthetic perfection.
                            </p>
                            <p style={{ color: '#94a3b8', fontSize: '1.05rem', lineHeight: '1.8' }}>
                                What began as a humble collection of rare classics has evolved into the premier destination for discerning automotive enthusiasts. For over two decades, we have dedicated ourselves to sourcing, meticulously maintaining, and delivering the world's most sought-after vehicles to an exclusive global clientele.
                            </p>
                            <p style={{ color: '#94a3b8', fontSize: '1.05rem', lineHeight: '1.8' }}>
                                Our showroom is not merely a retail space; it is a sanctuary where the art of the automobile is celebrated. We believe that acquiring a luxury vehicle shouldn't be a transaction, but a milestone event characterized by absolute transparency, unrivaled expertise, and white-glove service.
                            </p>
                            <div className="stats-grid mt-5">
                                <div className="stat-item">
                                    <h3 className="gold-text">25+</h3>
                                    <p>Years of Experience</p>
                                </div>
                                <div className="stat-item">
                                    <h3 className="gold-text">5000+</h3>
                                    <p>Vehicles Delivered</p>
                                </div>
                                <div className="stat-item">
                                    <h3 className="gold-text">12</h3>
                                    <p>Global Showrooms</p>
                                </div>
                            </div>
                        </motion.div>
                        <motion.div 
                            className="col-lg-6"
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.8 }}
                        >
                            <div className="image-glass-frame">
                                <img src="/ssv-logo.png" alt="SV Luxury Showroom Logo" className="img-fluid rounded shadow-lg" />
                                <div className="frame-border"></div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* The Experience Section */}
            <section className="about-section experience-section">
                <div className="container text-center">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-50px" }}
                        variants={staggerContainer}
                    >
                        <motion.h2 variants={fadeInUp} className="section-title mb-5">The <span className="gold-text">Showroom</span> Experience</motion.h2>
                        
                        <div className="row g-4 mt-4">
                            <motion.div variants={fadeInUp} className="col-md-4">
                                <div className="experience-card">
                                    <div className="icon-circle">
                                        <i className="bi bi-gem"></i>
                                    </div>
                                    <h4 className="text-white">Unrivaled Selection</h4>
                                    <p className="text-muted">From limited-production hypercars to bespoke luxury sedans, our inventory is curated without compromise.</p>
                                </div>
                            </motion.div>
                            <motion.div variants={fadeInUp} className="col-md-4">
                                <div className="experience-card">
                                    <div className="icon-circle">
                                        <i className="bi bi-shield-check"></i>
                                    </div>
                                    <h4 className="text-white">Impeccable Provenance</h4>
                                    <p className="text-muted">Every vehicle undergoes an exhaustive multi-point inspection and background verified process.</p>
                                </div>
                            </motion.div>
                            <motion.div variants={fadeInUp} className="col-md-4">
                                <div className="experience-card">
                                    <div className="icon-circle">
                                        <i className="bi bi-award"></i>
                                    </div>
                                    <h4 className="text-white">White-Glove Delivery</h4>
                                    <p className="text-muted">Enclosed, climate-controlled transport bringing your new acquisition safely to your doorstep, globally.</p>
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
}
