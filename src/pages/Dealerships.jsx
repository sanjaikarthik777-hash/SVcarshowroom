import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function Dealerships() {
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
            transition: { staggerChildren: 0.2 }
        }
    };

    const locations = [
        { city: "Mumbai", type: "Flagship Showroom", address: "Luxury Avenue, Bandra West", phone: "+91 98745 61230", email: "mumbai@ssv.com", image: "/mumbai-showroom.png" },
        { city: "Dubai", type: "Elite Boutique", address: "Sheikh Zayed Road, Downtown", phone: "+971 4 123 4567", email: "dubai@ssv.com", image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" },
        { city: "London", type: "Heritage Centre", address: "Mayfair, W1K", phone: "+44 20 7123 4567", email: "london@ssv.com", image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" },
        { city: "New York", type: "Gallery", address: "Fifth Avenue, Manhattan", phone: "+1 212 555 0198", email: "ny@ssv.com", image: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" },
        { city: "Tokyo", type: "Innovation Hub", address: "Ginza, Chūō", phone: "+81 3 1234 5678", email: "tokyo@ssv.com", image: "https://images.unsplash.com/photo-1536098561742-ca998e48cbcc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" },
        { city: "Monaco", type: "Bespoke Lounge", address: "Avenue Princesse Grace", phone: "+377 98 76 54 32", email: "monaco@ssv.com", image: "/monaco-showroom.png" }
    ];

    return (
        <div style={{ minHeight: '100vh', paddingTop: '100px', paddingBottom: '80px' }}>
            <div className="container">
                <motion.div 
                    initial="hidden" 
                    animate="visible" 
                    variants={staggerContainer}
                    className="text-center mb-5 pb-3"
                >
                    <motion.h1 variants={fadeInUp} className="hero-title mb-3" style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)' }}>
                        Global <span className="gold-text">Locations</span>
                    </motion.h1>
                    <motion.p variants={fadeInUp} className="lead mx-auto" style={{ color: '#94a3b8', maxWidth: '700px' }}>
                        Experience the epitome of automotive luxury in person. Our highly curated showrooms are architectural marvels situated in the world's most prestigious designations.
                    </motion.p>
                </motion.div>

                <motion.div 
                    className="row g-4"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                    variants={staggerContainer}
                >
                    {locations.map((loc, idx) => (
                        <motion.div key={idx} variants={fadeInUp} className="col-lg-4 col-md-6">
                            <div className="card h-100" style={{ 
                                background: 'rgba(255, 255, 255, 0.03)', 
                                border: '1px solid rgba(212, 175, 55, 0.15)', 
                                borderRadius: '16px',
                                overflow: 'hidden',
                                transition: 'all 0.3s ease'
                            }}
                            onMouseEnter={e => {
                                e.currentTarget.style.transform = 'translateY(-10px)';
                                e.currentTarget.style.borderColor = 'rgba(212, 175, 55, 0.4)';
                                e.currentTarget.style.boxShadow = '0 15px 40px rgba(0,0,0,0.5), 0 0 20px rgba(212, 175, 55, 0.1)';
                            }}
                            onMouseLeave={e => {
                                e.currentTarget.style.transform = 'translateY(0)';
                                e.currentTarget.style.borderColor = 'rgba(212, 175, 55, 0.15)';
                                e.currentTarget.style.boxShadow = 'none';
                            }}>
                                <div style={{ height: '200px', overflow: 'hidden', position: 'relative' }}>
                                    <img src={loc.image} alt={loc.city} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                    <div style={{ 
                                        position: 'absolute', top: '15px', right: '15px', 
                                        background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(10px)',
                                        padding: '4px 12px', borderRadius: '20px', 
                                        border: '1px solid rgba(212, 175, 55, 0.3)',
                                        color: '#d4af37', fontSize: '0.75rem', fontWeight: 'bold', letterSpacing: '1px', textTransform: 'uppercase'
                                    }}>
                                        {loc.type}
                                    </div>
                                </div>
                                <div className="card-body p-4">
                                    <h3 className="card-title text-white mb-3" style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 700 }}>{loc.city}</h3>
                                    <ul className="list-unstyled mb-0 d-flex flex-column gap-3">
                                        <li className="d-flex align-items-start gap-3">
                                            <i className="bi bi-geo-alt" style={{ color: '#d4af37', fontSize: '1.2rem', marginTop: '-3px' }}></i>
                                            <span style={{ color: '#94a3b8', fontSize: '0.9rem' }}>{loc.address}</span>
                                        </li>
                                        <li className="d-flex align-items-center gap-3">
                                            <i className="bi bi-telephone" style={{ color: '#d4af37', fontSize: '1.2rem' }}></i>
                                            <a href={`tel:${loc.phone.replace(/\s+/g, '')}`} style={{ color: '#94a3b8', fontSize: '0.9rem', textDecoration: 'none', transition: 'color 0.2s' }} onMouseEnter={e => e.target.style.color = '#d4af37'} onMouseLeave={e => e.target.style.color = '#94a3b8'}>{loc.phone}</a>
                                        </li>
                                        <li className="d-flex align-items-center gap-3">
                                            <i className="bi bi-envelope" style={{ color: '#d4af37', fontSize: '1.2rem' }}></i>
                                            <a href={`mailto:${loc.email}`} style={{ color: '#94a3b8', fontSize: '0.9rem', textDecoration: 'none', transition: 'color 0.2s' }} onMouseEnter={e => e.target.style.color = '#d4af37'} onMouseLeave={e => e.target.style.color = '#94a3b8'}>{loc.email}</a>
                                        </li>
                                    </ul>
                                </div>
                                <div className="card-footer bg-transparent border-top-0 p-4 pt-0">
                                    <Link to={`/book-visit/${loc.city.toLowerCase().replace(/ /g, '-')}`} className="btn w-100" style={{ background: 'rgba(212, 175, 55, 0.1)', color: '#d4af37', border: '1px solid rgba(212, 175, 55, 0.3)', fontWeight: 600, letterSpacing: '1px', textTransform: 'uppercase', fontSize: '0.8rem', padding: '10px' }}
                                    onMouseEnter={e => { e.target.style.background = '#d4af37'; e.target.style.color = '#050608'; }}
                                    onMouseLeave={e => { e.target.style.background = 'rgba(212, 175, 55, 0.1)'; e.target.style.color = '#d4af37'; }}>
                                        Book a Visit
                                    </Link>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </div>
    );
}
