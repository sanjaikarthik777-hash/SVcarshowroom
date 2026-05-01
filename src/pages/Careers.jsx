import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function Careers() {
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

    const openings = [
        { title: "Senior Sales Concierge", department: "Premium Sales", location: "Mumbai / On-site", type: "Full-time" },
        { title: "Master Automotive Technician", department: "Service & Engineering", location: "Dubai / On-site", type: "Full-time" },
        { title: "Client Relationship Manager", department: "Client Relations", location: "London / Hybrid", type: "Full-time" },
        { title: "Logistics & Procurement Director", department: "Operations", location: "Monaco / On-site", type: "Full-time" },
        { title: "Digital Experience Designer", department: "Marketing & IT", location: "New York / Remote", type: "Full-time" },
    ];

    return (
        <div style={{ minHeight: '100vh', paddingTop: '100px', paddingBottom: '80px' }}>
            {/* Hero Section */}
            <div className="container mb-5 pb-4">
                <div className="row align-items-center g-5">
                    <motion.div className="col-lg-6" initial="hidden" animate="visible" variants={staggerContainer}>
                        <motion.div variants={fadeInUp} style={{ display: 'inline-block', padding: '6px 16px', background: 'rgba(212, 175, 55, 0.1)', border: '1px solid rgba(212, 175, 55, 0.3)', borderRadius: '30px', color: '#d4af37', fontSize: '0.75rem', fontWeight: 600, letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '20px' }}>
                            Careers at SV
                        </motion.div>
                        <motion.h1 variants={fadeInUp} className="hero-title mb-4" style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', lineHeight: 1.1 }}>
                            Join the <span className="gold-text">Elite.</span>
                        </motion.h1>
                        <motion.p variants={fadeInUp} className="lead mb-4" style={{ color: '#94a3b8', fontSize: '1.1rem', lineHeight: 1.8 }}>
                            At SV, we don't just sell cars; we curate masterpieces. We are always seeking passionate perfectionists, boundary-pushers, and visionary thinkers to join our exclusive global team.
                        </motion.p>
                        <motion.div variants={fadeInUp}>
                            <a href="#open-roles" className="btn hero-btn-primary mt-2">
                                View Open Roles <i className="bi bi-arrow-down ms-2"></i>
                            </a>
                        </motion.div>
                    </motion.div>
                    <motion.div className="col-lg-6" initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.4 }}>
                        <div style={{ position: 'relative', padding: '20px' }}>
                            <img src="https://images.unsplash.com/photo-1521737852567-6949f3f9f2b5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" alt="SV Professional Team" style={{ width: '100%', borderRadius: '16px', position: 'relative', zIndex: 2, boxShadow: '0 20px 50px rgba(0,0,0,0.5)' }} />
                            <div style={{ position: 'absolute', inset: 0, border: '2px solid rgba(212, 175, 55, 0.5)', borderRadius: '20px', transform: 'translate(15px, -15px)', zIndex: 1 }}></div>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Values Section */}
            <div style={{ background: 'rgba(255, 255, 255, 0.02)', borderTop: '1px solid rgba(255,255,255,0.05)', borderBottom: '1px solid rgba(255,255,255,0.05)', padding: '80px 0' }}>
                <div className="container">
                    <motion.div className="text-center mb-5" initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={fadeInUp}>
                        <h2 className="mb-3" style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 700, fontSize: '2.5rem' }}>Our Core <span className="gold-text">Values</span></h2>
                        <div style={{ width: '60px', height: '3px', background: 'linear-gradient(90deg, #d4af37, transparent)', margin: '0 auto' }}></div>
                    </motion.div>
                    
                    <div className="row g-4">
                        {[
                            { icon: "bi-star", title: "Uncompromising Excellence", desc: "We settle for nothing less than perfection in every interaction, mechanism, and detail." },
                            { icon: "bi-shield-lock", title: "Absolute Discretion", desc: "Trust is our ultimate currency. We guard our clients' confidentiality with fierce dedication." },
                            { icon: "bi-lightning-charge", title: "Pioneering Spirit", desc: "Embracing the future of automotive technology while honoring its glorious heritage." },
                        ].map((val, idx) => (
                            <motion.div key={idx} className="col-md-4" initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { delay: idx * 0.2, duration: 0.6 } } }}>
                                <div style={{ padding: '40px 30px', background: 'rgba(0,0,0,0.3)', borderRadius: '16px', border: '1px solid rgba(212, 175, 55, 0.1)', height: '100%' }}>
                                    <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: 'rgba(212, 175, 55, 0.1)', border: '1px solid rgba(212, 175, 55, 0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '24px' }}>
                                        <i className={`bi ${val.icon}`} style={{ color: '#d4af37', fontSize: '1.5rem' }}></i>
                                    </div>
                                    <h4 className="text-white mb-3" style={{ fontSize: '1.2rem', fontWeight: 600 }}>{val.title}</h4>
                                    <p style={{ color: '#94a3b8', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: 0 }}>{val.desc}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Openings Section */}
            <div id="open-roles" className="container mt-5 pt-5">
                <motion.div className="mb-5 d-flex justify-content-between align-items-end flex-wrap gap-3" initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={fadeInUp}>
                    <div>
                        <h2 className="mb-2" style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 700, fontSize: '2.5rem' }}>Open <span className="gold-text">Positions</span></h2>
                        <p style={{ color: '#94a3b8', margin: 0 }}>Discover your next prestigious role.</p>
                    </div>
                </motion.div>

                <motion.div className="d-flex flex-column gap-3" initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={staggerContainer}>
                    {openings.map((job, idx) => (
                        <motion.div key={idx} variants={fadeInUp} style={{ 
                            background: 'rgba(255, 255, 255, 0.02)', 
                            border: '1px solid rgba(255, 255, 255, 0.08)', 
                            borderRadius: '12px',
                            padding: '24px 30px',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            flexWrap: 'wrap',
                            gap: '20px',
                            transition: 'all 0.3s'
                        }}
                        onMouseEnter={e => {
                            e.currentTarget.style.background = 'rgba(212, 175, 55, 0.05)';
                            e.currentTarget.style.borderColor = 'rgba(212, 175, 55, 0.3)';
                        }}
                        onMouseLeave={e => {
                            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.02)';
                            e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)';
                        }}>
                            <div>
                                <h4 className="text-white mb-2" style={{ fontSize: '1.15rem', fontWeight: 600 }}>{job.title}</h4>
                                <div className="d-flex gap-4 flex-wrap">
                                    <span style={{ color: '#94a3b8', fontSize: '0.85rem' }}><i className="bi bi-building me-2 text-muted"></i>{job.department}</span>
                                    <span style={{ color: '#94a3b8', fontSize: '0.85rem' }}><i className="bi bi-geo-alt me-2 text-muted"></i>{job.location}</span>
                                    <span style={{ color: '#94a3b8', fontSize: '0.85rem' }}><i className="bi bi-clock me-2 text-muted"></i>{job.type}</span>
                                </div>
                            </div>
                            <Link to={`/apply/${job.title.toLowerCase().replace(/ \/ /g, '-').replace(/ /g, '-')}`} className="btn" style={{ 
                                background: 'transparent', color: '#d4af37', border: '1px solid #d4af37', 
                                padding: '8px 24px', borderRadius: '30px', fontSize: '0.85rem', fontWeight: 600,
                                textTransform: 'uppercase', letterSpacing: '1px', transition: 'all 0.3s', textDecoration: 'none'
                            }}
                            onMouseEnter={e => { e.target.style.background = '#d4af37'; e.target.style.color = '#050608'; }}
                            onMouseLeave={e => { e.target.style.background = 'transparent'; e.target.style.color = '#d4af37'; }}>
                                Apply
                            </Link>
                        </motion.div>
                    ))}
                </motion.div>
                
                <div className="text-center mt-5 pt-4">
                    <p style={{ color: '#64748b', fontSize: '0.9rem' }}>Don't see a perfect fit? Send your CV to <a href="mailto:careers@ssv.com" className="gold-text text-decoration-none">careers@ssv.com</a></p>
                </div>
            </div>
        </div>
    );
}
