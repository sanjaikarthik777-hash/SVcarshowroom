import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { API_BASE } from '../api';

export default function BookVisit() {
    const { location } = useParams();
    const navigate = useNavigate();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    // Form State
    const [form, setForm] = useState({
        name: '',
        email: '',
        phone: '',
        date: '',
        time: '',
        location: location ? location.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ') : 'Mumbai',
        carInterest: '',
        notes: ''
    });

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    // Format location back to Title Case (e.g., new-york -> New York)
    const formattedLocation = form.location;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            const res = await fetch(`${API_BASE}/bookings`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    car: `Gallery Visit: ${form.location}${form.carInterest ? ' (Interested in ' + form.carInterest + ')' : ''}`,
                    name: form.name,
                    phone: form.phone,
                    email: form.email,
                    datetime: `${form.date} at ${form.time}`,
                    notes: form.notes,
                    status: 'Pending'
                })
            });

            if (res.ok) {
                setSubmitted(true);
                // Redirect back to dealerships after success message
                setTimeout(() => {
                    navigate('/dealerships');
                }, 5000);
            } else {
                const error = await res.json();
                alert(error.message || 'Submission failed. Please try again.');
            }
        } catch (err) {
            console.error(err);
            alert('Could not connect to the server.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const fadeInUp = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
    };

    if (submitted) {
        return (
            <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', paddingTop: '80px', background: 'radial-gradient(circle at center, rgba(212, 175, 55, 0.05) 0%, transparent 60%)' }}>
                <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-center p-5 rounded-4" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(212, 175, 55, 0.2)', backdropFilter: 'blur(10px)', maxWidth: '500px' }}>
                    <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'rgba(212, 175, 55, 0.1)', border: '2px solid #d4af37', color: '#d4af37', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px', fontSize: '2rem' }}>
                        <i className="bi bi-hourglass-split text-gold"></i>
                    </div>
                    <h2 className="text-white mb-3" style={{ fontFamily: "'Montserrat', sans-serif" }}>Request Received!</h2>
                    <p style={{ color: '#94a3b8' }}>
                        Your private viewing at <strong>{formattedLocation}</strong> has been submitted.
                        <br /><br />
                        <span className="gold-text fw-bold">Status: Awaiting Admin Approval</span>
                        <br /><br />
                        A concierge will contact you at <strong>{form.email || form.phone}</strong> once finalized.
                    </p>
                    <p className="small" style={{ color: '#64748b', marginTop: '20px' }}>Redirecting you back...</p>
                </motion.div>
            </div>
        );
    }

    return (
        <div style={{ minHeight: '100vh', paddingTop: '120px', paddingBottom: '80px', position: 'relative' }}>
            {/* Background Accent */}
            <div style={{ position: 'absolute', top: '10%', left: '10%', width: '400px', height: '400px', background: 'radial-gradient(circle, rgba(212, 175, 55, 0.05) 0%, transparent 70%)', zIndex: -1, pointerEvents: 'none' }}></div>
            
            <div className="container" style={{ maxWidth: '800px' }}>
                <motion.div initial="hidden" animate="visible" variants={fadeInUp} className="mb-5 text-center">
                    <Link to="/dealerships" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: '#94a3b8', textDecoration: 'none', fontSize: '0.9rem', marginBottom: '20px', transition: 'color 0.2s' }} onMouseEnter={e => e.target.style.color = '#d4af37'} onMouseLeave={e => e.target.style.color = '#94a3b8'}>
                        <i className="bi bi-arrow-left"></i> Back to Locations
                    </Link>
                    <h1 className="text-white mb-2" style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 800, fontSize: 'clamp(2.5rem, 5vw, 3.5rem)' }}>
                        Book a <span className="gold-text">Visit</span>
                    </h1>
                    <p style={{ color: '#94a3b8', fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto' }}>
                        Reserve your exclusive private viewing at our {formattedLocation} gallery. Experience automotive perfection firsthand.
                    </p>
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
                                {/* Details */}
                                <div className="col-12">
                                    <h5 className="text-white mb-3" style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '10px', fontSize: '1rem', letterSpacing: '2px', textTransform: 'uppercase', color: '#d4af37!important' }}>Guest Information</h5>
                                </div>
                                
                                <div className="col-md-6">
                                    <label className="form-label" style={{ color: '#94a3b8', fontSize: '0.85rem', letterSpacing: '0.5px' }}>Full Name *</label>
                                    <input type="text" className="form-control" required style={inputStyle} placeholder="Bruce Wayne" value={form.name} onChange={e => setForm({...form, name: e.target.value})} />
                                </div>
                                <div className="col-md-6">
                                    <label className="form-label" style={{ color: '#94a3b8', fontSize: '0.85rem', letterSpacing: '0.5px' }}>Email Address *</label>
                                    <input type="email" className="form-control" required style={inputStyle} placeholder="bruce@wayneenterprises.com" value={form.email} onChange={e => setForm({...form, email: e.target.value})} />
                                </div>
                                <div className="col-md-6">
                                    <label className="form-label" style={{ color: '#94a3b8', fontSize: '0.85rem', letterSpacing: '0.5px' }}>Phone Number *</label>
                                    <input type="tel" className="form-control" required style={inputStyle} placeholder="+1 234 567 8900" value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} />
                                </div>
                                <div className="col-md-6">
                                    <label className="form-label" style={{ color: '#94a3b8', fontSize: '0.85rem', letterSpacing: '0.5px' }}>Preferred Showroom</label>
                                    <select className="form-select" style={inputStyle} value={form.location} onChange={e => setForm({...form, location: e.target.value})}>
                                        <option value="Mumbai">Mumbai Flagship</option>
                                        <option value="Dubai">Dubai Elite Boutique</option>
                                        <option value="London">London Heritage Centre</option>
                                        <option value="New York">New York Gallery</option>
                                        <option value="Tokyo">Tokyo Innovation Hub</option>
                                        <option value="Monaco">Monaco Bespoke Lounge</option>
                                    </select>
                                </div>

                                {/* Appointment Details */}
                                <div className="col-12 mt-5">
                                    <h5 className="text-white mb-3" style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '10px', fontSize: '1rem', letterSpacing: '2px', textTransform: 'uppercase' }}>Appointment Preferences</h5>
                                </div>

                                <div className="col-md-6">
                                    <label className="form-label" style={{ color: '#94a3b8', fontSize: '0.85rem', letterSpacing: '0.5px' }}>Preferred Date *</label>
                                    <input type="date" className="form-control" required style={{...inputStyle, colorScheme: 'dark'}} value={form.date} onChange={e => setForm({...form, date: e.target.value})} />
                                </div>
                                <div className="col-md-6">
                                    <label className="form-label" style={{ color: '#94a3b8', fontSize: '0.85rem', letterSpacing: '0.5px' }}>Preferred Time *</label>
                                    <select className="form-select" required style={inputStyle} value={form.time} onChange={e => setForm({...form, time: e.target.value})}>
                                        <option value="">Select a time</option>
                                        <option value="morning">Morning (10:00 AM - 12:00 PM)</option>
                                        <option value="afternoon">Afternoon (1:00 PM - 4:00 PM)</option>
                                        <option value="evening">Evening (5:00 PM - 7:00 PM)</option>
                                    </select>
                                </div>

                                <div className="col-12">
                                    <label className="form-label" style={{ color: '#94a3b8', fontSize: '0.85rem', letterSpacing: '0.5px' }}>Vehicles of Interest</label>
                                    <input type="text" className="form-control" style={inputStyle} placeholder="e.g. Porsche 911 GT3 RS, Lamborghini Revuelto" value={form.carInterest} onChange={e => setForm({...form, carInterest: e.target.value})} />
                                </div>

                                <div className="col-12">
                                    <label className="form-label" style={{ color: '#94a3b8', fontSize: '0.85rem', letterSpacing: '0.5px' }}>Special Requests / Notes</label>
                                    <textarea className="form-control" rows="3" style={{...inputStyle, resize: 'none'}} placeholder="Let us know if you require any specific accommodations or services during your visit..." value={form.notes} onChange={e => setForm({...form, notes: e.target.value})}></textarea>
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
                                            <><span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span> Requesting...</>
                                        ) : (
                                            'Request Appointment'
                                        )}
                                    </button>
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
