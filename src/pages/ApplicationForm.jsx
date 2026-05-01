import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useParams, Link, useNavigate } from 'react-router-dom';

export default function ApplicationForm() {
    const { jobId } = useParams();
    const navigate = useNavigate();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    // Format job ID back to title (e.g., senior-sales-concierge -> Senior Sales Concierge)
    const formattedJobTitle = jobId 
        ? jobId.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
        : 'General Application';

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        // Simulate API call
        setTimeout(() => {
            setIsSubmitting(false);
            setSubmitted(true);
            // Redirect back to careers after success message
            setTimeout(() => {
                navigate('/careers');
            }, 3000);
        }, 1500);
    };

    const fadeInUp = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
    };

    if (submitted) {
        return (
            <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', paddingTop: '80px', background: 'radial-gradient(circle at center, rgba(34, 197, 94, 0.05) 0%, transparent 60%)' }}>
                <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-center p-5 rounded-4" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', backdropFilter: 'blur(10px)', maxWidth: '500px' }}>
                    <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'rgba(34, 197, 94, 0.1)', border: '2px solid #22c55e', color: '#22c55e', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px', fontSize: '2rem' }}>
                        <i className="bi bi-check-lg"></i>
                    </div>
                    <h2 className="text-white mb-3" style={{ fontFamily: "'Montserrat', sans-serif" }}>Application Received</h2>
                    <p style={{ color: '#94a3b8' }}>Thank you for your interest in joining SV. Our recruitment team will review your exceptional profile shortly.</p>
                    <p className="small" style={{ color: '#64748b', marginTop: '20px' }}>Redirecting you back...</p>
                </motion.div>
            </div>
        );
    }

    return (
        <div style={{ minHeight: '100vh', paddingTop: '120px', paddingBottom: '80px', position: 'relative' }}>
            {/* Background Accent */}
            <div style={{ position: 'absolute', top: '10%', right: '10%', width: '400px', height: '400px', background: 'radial-gradient(circle, rgba(212, 175, 55, 0.05) 0%, transparent 70%)', zIndex: -1, pointerEvents: 'none' }}></div>
            
            <div className="container" style={{ maxWidth: '800px' }}>
                <motion.div initial="hidden" animate="visible" variants={fadeInUp} className="mb-5">
                    <Link to="/careers" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: '#94a3b8', textDecoration: 'none', fontSize: '0.9rem', marginBottom: '20px', transition: 'color 0.2s' }} onMouseEnter={e => e.target.style.color = '#d4af37'} onMouseLeave={e => e.target.style.color = '#94a3b8'}>
                        <i className="bi bi-arrow-left"></i> Back to Careers
                    </Link>
                    <h1 className="text-white mb-2" style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 800, fontSize: 'clamp(2rem, 4vw, 3rem)' }}>
                        Apply for <span className="gold-text">{formattedJobTitle}</span>
                    </h1>
                    <p style={{ color: '#94a3b8', fontSize: '1.05rem' }}>Shape the future of luxury automotive experiences. Please provide your details below.</p>
                </motion.div>

                <motion.div 
                    initial={{ opacity: 0, y: 40 }} 
                    animate={{ opacity: 1, y: 0 }} 
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    <div style={{ 
                        background: 'rgba(255, 255, 255, 0.02)', 
                        border: '1px solid rgba(212, 175, 55, 0.15)', 
                        borderRadius: '20px', 
                        padding: '40px',
                        boxShadow: '0 25px 50px rgba(0,0,0,0.5), inset 0 0 0 1px rgba(255,255,255,0.02)',
                        backdropFilter: 'blur(20px)'
                    }}>
                        <form onSubmit={handleSubmit}>
                            <div className="row g-4">
                                {/* Personal Information */}
                                <div className="col-12">
                                    <h5 className="text-white mb-3" style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '10px', fontSize: '1rem', letterSpacing: '2px', textTransform: 'uppercase', color: '#d4af37!important' }}>Personal Details</h5>
                                </div>
                                
                                <div className="col-md-6">
                                    <label className="form-label" style={{ color: '#94a3b8', fontSize: '0.85rem', letterSpacing: '0.5px' }}>First Name *</label>
                                    <input type="text" className="form-control" required style={inputStyle} placeholder="James" />
                                </div>
                                <div className="col-md-6">
                                    <label className="form-label" style={{ color: '#94a3b8', fontSize: '0.85rem', letterSpacing: '0.5px' }}>Last Name *</label>
                                    <input type="text" className="form-control" required style={inputStyle} placeholder="Bond" />
                                </div>
                                <div className="col-md-6">
                                    <label className="form-label" style={{ color: '#94a3b8', fontSize: '0.85rem', letterSpacing: '0.5px' }}>Email Address *</label>
                                    <input type="email" className="form-control" required style={inputStyle} placeholder="james@example.com" />
                                </div>
                                <div className="col-md-6">
                                    <label className="form-label" style={{ color: '#94a3b8', fontSize: '0.85rem', letterSpacing: '0.5px' }}>Phone Number *</label>
                                    <input type="tel" className="form-control" required style={inputStyle} placeholder="+44 20 7123 4567" />
                                </div>

                                {/* Professional Network */}
                                <div className="col-12 mt-5">
                                    <h5 className="text-white mb-3" style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '10px', fontSize: '1rem', letterSpacing: '2px', textTransform: 'uppercase' }}>Professional Links</h5>
                                </div>

                                <div className="col-md-6">
                                    <label className="form-label" style={{ color: '#94a3b8', fontSize: '0.85rem', letterSpacing: '0.5px' }}>LinkedIn Profile *</label>
                                    <div className="input-group">
                                        <span className="input-group-text" style={inputGroupStyle}><i className="bi bi-linkedin"></i></span>
                                        <input type="url" className="form-control" required style={{...inputStyle, borderLeft: 'none'}} placeholder="linkedin.com/in/username" />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <label className="form-label" style={{ color: '#94a3b8', fontSize: '0.85rem', letterSpacing: '0.5px' }}>Portfolio / Website</label>
                                    <div className="input-group">
                                        <span className="input-group-text" style={inputGroupStyle}><i className="bi bi-link-45deg"></i></span>
                                        <input type="url" className="form-control" style={{...inputStyle, borderLeft: 'none'}} placeholder="jameshbond.com" />
                                    </div>
                                </div>

                                {/* Documents */}
                                <div className="col-12 mt-5">
                                    <h5 className="text-white mb-3" style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '10px', fontSize: '1rem', letterSpacing: '2px', textTransform: 'uppercase' }}>Documents</h5>
                                </div>

                                <div className="col-12">
                                    <label className="form-label" style={{ color: '#94a3b8', fontSize: '0.85rem', letterSpacing: '0.5px' }}>Upload CV / Resume * (PDF only, max 5MB)</label>
                                    <div style={{ 
                                        border: '2px dashed rgba(212, 175, 55, 0.3)', 
                                        borderRadius: '12px', 
                                        padding: '40px 20px', 
                                        textAlign: 'center',
                                        background: 'rgba(0,0,0,0.2)',
                                        cursor: 'pointer',
                                        transition: 'all 0.3s'
                                    }}
                                    onMouseEnter={e => e.currentTarget.style.borderColor = '#d4af37'}
                                    onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(212, 175, 55, 0.3)'}>
                                        <i className="bi bi-cloud-arrow-up" style={{ fontSize: '2.5rem', color: '#d4af37', marginBottom: '10px', display: 'block' }}></i>
                                        <span style={{ color: '#cbd5e1', fontWeight: 500 }}>Click to browse</span>
                                        <span style={{ color: '#64748b', fontSize: '0.85rem', display: 'block', mt: 1 }}>or drag and drop your file here</span>
                                        <input type="file" accept=".pdf" style={{ display: 'none' }} id="cv-upload" required />
                                    </div>
                                </div>

                                <div className="col-12">
                                    <label className="form-label" style={{ color: '#94a3b8', fontSize: '0.85rem', letterSpacing: '0.5px' }}>Cover Letter (Optional)</label>
                                    <textarea className="form-control" rows="4" style={{...inputStyle, resize: 'none'}} placeholder="Tell us why you belong at SV..."></textarea>
                                </div>

                                {/* Submit */}
                                <div className="col-12 mt-5 text-center">
                                    <button 
                                        type="submit" 
                                        disabled={isSubmitting}
                                        style={{ 
                                            background: 'linear-gradient(135deg, #d4af37, #b8962a)', 
                                            color: '#050608', 
                                            border: 'none', 
                                            padding: '16px 48px', 
                                            borderRadius: '50px', 
                                            fontSize: '1rem', 
                                            fontWeight: 700,
                                            letterSpacing: '1.5px', 
                                            textTransform: 'uppercase',
                                            boxShadow: '0 10px 30px rgba(212, 175, 55, 0.3)',
                                            transition: 'all 0.3s',
                                            width: '100%',
                                            opacity: isSubmitting ? 0.7 : 1
                                        }}
                                        onMouseEnter={e => !isSubmitting && (e.target.style.transform = 'translateY(-3px)', e.target.style.boxShadow = '0 15px 40px rgba(212, 175, 55, 0.4)')}
                                        onMouseLeave={e => !isSubmitting && (e.target.style.transform = 'translateY(0)', e.target.style.boxShadow = '0 10px 30px rgba(212, 175, 55, 0.3)')}
                                    >
                                        {isSubmitting ? (
                                            <><span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span> Transmitting...</>
                                        ) : (
                                            'Submit Artifact'
                                        )}
                                    </button>
                                    <p className="mt-4 mb-0" style={{ color: '#64748b', fontSize: '0.75rem' }}>
                                        By submitting this form, you acknowledge that you have read and agree to our <a href="#" style={{ color: '#94a3b8' }}>Privacy Policy</a> regarding applicant data.
                                    </p>
                                </div>
                            </div>
                        </form>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}

// Reusable styling for form inputs
const inputStyle = {
    background: 'rgba(0, 0, 0, 0.3)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    color: '#f8fafc',
    padding: '12px 16px',
    borderRadius: '8px',
    fontSize: '0.95rem',
    boxShadow: 'none',
    transition: 'all 0.3s'
};

const inputGroupStyle = {
    background: 'rgba(0, 0, 0, 0.3)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRight: 'none',
    color: '#94a3b8',
    borderRadius: '8px 0 0 8px'
};

// Note: Ensure you add a global CSS rule for input:focus if not already present
// input:focus { border-color: #d4af37 !important; outline: none; box-shadow: 0 0 0 3px rgba(212, 175, 55, 0.2) !important; }
