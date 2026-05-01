import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { cars } from '../data';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Car360Viewer from '../components/Car360Viewer';
import { API_BASE } from '../api';

export default function BookingPage() {
    const { carId } = useParams();
    const navigate = useNavigate();
    const [car, setCar] = useState(null);
    const [carLoading, setCarLoading] = useState(true);

    const [form, setForm] = useState({ name: '', email: '', phone: '', date: '', time: '', notes: '' });
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [conflictMsg, setConflictMsg] = useState('');

    useEffect(() => {
        fetchCarDetails();
    }, [carId]);

    const fetchCarDetails = async () => {
        setCarLoading(true);
        try {
            // Try fetching from API first
            const res = await fetch(`${API_BASE}/cars/${carId}`);
            if (res.ok) {
                const data = await res.json();
                setCar({ ...data, images: data.images || [] });
            } else {
                // Fallback to static data if API fails or car not found in DB
                const staticCar = cars.find(c => String(c.id) === String(carId));
                setCar(staticCar || null);
            }
        } catch (err) {
            console.error('API fetch failed, falling back to static data:', err);
            const staticCar = cars.find(c => String(c.id) === String(carId));
            setCar(staticCar || null);
        } finally {
            setCarLoading(false);
        }
    };

    const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!car) return;
        setLoading(true);
        setConflictMsg('');
        try {
            const res = await fetch(`${API_BASE}/bookings`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    car: car.name,
                    name: form.name,
                    phone: form.phone,
                    email: form.email,
                    datetime: `${form.date} at ${form.time}`,
                    status: 'Pending'
                })
            });

            if (res.ok) {
                setSubmitted(true);
            } else {
                const error = await res.json();
                if (res.status === 409) {
                    setConflictMsg(error.message || 'This time slot is already booked.');
                } else {
                    setConflictMsg(error.message || 'Error submitting booking.');
                }
            }
        } catch (err) {
            console.error(err);
            setConflictMsg('Could not connect to the server. Please ensure the backend is running.');
        } finally {
            setLoading(false);
        }
    };

    // Loading car details
    if (carLoading) {
        return (
            <>
                <Navbar />
                <div className="booking-page d-flex justify-content-center align-items-center" style={{ minHeight: '60vh' }}>
                    <div className="text-center">
                        <div className="spinner-border gold-text mb-3" role="status"></div>
                        <p className="text-muted">Fetching vehicle details...</p>
                    </div>
                </div>
                <Footer />
            </>
        );
    }

    // Car not found guard
    if (!car) {
        return (
            <>
                <Navbar />
                <div className="booking-not-found">
                    <div className="booking-nf-card">
                        <div style={{ fontSize: '3.5rem', marginBottom: '1rem' }}>🚗</div>
                        <h2>Car Not Found</h2>
                        <p>We couldn't find the vehicle you're looking for.</p>
                        <Link to="/" className="btn-gold-fill">Back to Home</Link>
                    </div>
                </div>
                <Footer />
            </>
        );
    }

    if (submitted) {
        return (
            <>
                <Navbar />
                <div className="booking-success-screen">
                    <div className="booking-success-card">
                        <div className="booking-success-icon">⏳</div>
                        <h2>Request Received!</h2>
                        <p>
                            Your test drive request for the <strong>{car.name}</strong> has been submitted.
                            <br /><br />
                            <span className="gold-text fw-bold">Status: Awaiting Admin Approval</span>
                            <br /><br />
                            We'll send a confirmation to <strong>{form.email}</strong> once the admin approves your session.
                        </p>
                        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap', marginTop: '1.5rem' }}>
                            <button className="btn-gold-fill" onClick={() => setSubmitted(false)}>Book Another</button>
                            <Link to="/" className="btn-outline-gold">Back to Home</Link>
                        </div>
                    </div>
                </div>
                <Footer />
            </>
        );
    }

    if (conflictMsg) {
        return (
            <>
                <Navbar />
                <div style={{
                    minHeight: '80vh',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    paddingTop: '100px',
                    paddingBottom: '60px'
                }}>
                    <div style={{
                        background: 'rgba(255, 255, 255, 0.03)',
                        border: '1px solid rgba(220, 53, 69, 0.3)',
                        borderRadius: '20px',
                        padding: '48px 40px',
                        maxWidth: '520px',
                        width: '90%',
                        textAlign: 'center',
                        backdropFilter: 'blur(20px)',
                        boxShadow: '0 25px 60px rgba(0, 0, 0, 0.5), inset 0 0 0 1px rgba(255,255,255,0.03)'
                    }}>
                        <div style={{
                            width: '80px',
                            height: '80px',
                            borderRadius: '50%',
                            background: 'rgba(220, 53, 69, 0.1)',
                            border: '2px solid rgba(220, 53, 69, 0.4)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            margin: '0 auto 24px',
                            fontSize: '2.2rem'
                        }}>
                            🚫
                        </div>
                        <h2 style={{
                            color: '#fff',
                            fontFamily: "'Montserrat', sans-serif",
                            fontWeight: 700,
                            fontSize: '1.6rem',
                            marginBottom: '12px'
                        }}>Slot Unavailable</h2>
                        <p style={{
                            color: '#94a3b8',
                            fontSize: '1rem',
                            lineHeight: 1.7,
                            marginBottom: '8px'
                        }}>{conflictMsg}</p>
                        <p style={{ color: '#64748b', fontSize: '0.85rem', marginBottom: '28px' }}>
                            For <strong style={{ color: '#d4af37' }}>{car.name}</strong> on <strong style={{ color: '#cbd5e1' }}>{form.date}</strong> at <strong style={{ color: '#cbd5e1' }}>{form.time}</strong>
                        </p>
                        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                            <button
                                className="btn-gold-fill"
                                onClick={() => setConflictMsg('')}
                                style={{ padding: '12px 32px', borderRadius: '50px', fontSize: '0.9rem' }}
                            >
                                Choose Different Time
                            </button>
                            <Link
                                to="/"
                                className="btn-outline-gold"
                                style={{ padding: '12px 32px', borderRadius: '50px', fontSize: '0.9rem' }}
                            >
                                Back to Home
                            </Link>
                        </div>
                    </div>
                </div>
                <Footer />
            </>
        );
    }

    return (
        <>
            <Navbar />
            <div className="booking-page">

                {/* Breadcrumb */}
                <div className="booking-breadcrumb container">
                    <Link to="/" className="bc-link">Home</Link>
                    <span className="bc-sep">›</span>
                    <span className="bc-current">Book Test Drive</span>
                </div>

                <div className="container booking-layout">

                    {/* Left — Car Details */}
                    <div className="booking-car-panel">
                        <Car360Viewer
                            carId={car._id || car.id}
                            fallbackImage={car.images && car.images[0]}
                        />

                        <div className="booking-car-info mt-4">
                            <h2 className="booking-car-name">{car.name}</h2>
                            <p className="booking-car-price">{car.price}</p>
                            <p className="booking-car-desc">{car.description}</p>

                            <div className="booking-car-perks">
                                <div className="booking-perk">
                                    <span className="booking-perk-icon">📍</span>
                                    <span>At our showroom or your location</span>
                                </div>
                                <div className="booking-perk">
                                    <span className="booking-perk-icon">🕐</span>
                                    <span>30-minute dedicated session</span>
                                </div>
                                <div className="booking-perk">
                                    <span className="booking-perk-icon">👤</span>
                                    <span>Personal sales advisor included</span>
                                </div>
                                <div className="booking-perk">
                                    <span className="booking-perk-icon">✅</span>
                                    <span>No obligation, completely free</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right — Booking Form */}
                    <div className="booking-form-panel">
                        <div className="booking-form-header">
                            <p className="booking-form-eyebrow">SCHEDULE YOUR SESSION</p>
                            <h2 className="booking-form-title">Reserve Your <span className="gold-text">Test Drive</span></h2>
                            <p className="booking-form-sub">Fill in your details and we'll confirm your booking within 2 hours.</p>
                        </div>

                        <form className="booking-form" onSubmit={handleSubmit}>

                            <div className="booking-field-row">
                                <div className="booking-field-group">
                                    <label>Full Name *</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={form.name}
                                        onChange={handleChange}
                                        placeholder="Your full name"
                                        required
                                        className="bo-input"
                                    />
                                </div>
                                <div className="booking-field-group">
                                    <label>Email Address *</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={form.email}
                                        onChange={handleChange}
                                        placeholder="your@email.com"
                                        required
                                        className="bo-input"
                                    />
                                </div>
                            </div>

                            <div className="booking-field-row">
                                <div className="booking-field-group">
                                    <label>Phone Number *</label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={form.phone}
                                        onChange={handleChange}
                                        placeholder="+91 XXXXX XXXXX"
                                        required
                                        className="bo-input"
                                    />
                                </div>
                                <div className="booking-field-group">
                                    <label>Preferred Date *</label>
                                    <input
                                        type="date"
                                        name="date"
                                        value={form.date}
                                        onChange={handleChange}
                                        min={new Date().toISOString().split('T')[0]}
                                        required
                                        className="bo-input"
                                    />
                                </div>
                            </div>

                            <div className="booking-field-group" style={{ gridColumn: '1 / -1' }}>
                                <label>Preferred Time *</label>
                                <select name="time" value={form.time} onChange={handleChange} required className="bo-input">
                                    <option value="">Select a time slot</option>
                                    <option>09:00 AM – 09:30 AM</option>
                                    <option>10:00 AM – 10:30 AM</option>
                                    <option>11:00 AM – 11:30 AM</option>
                                    <option>12:00 PM – 12:30 PM</option>
                                    <option>02:00 PM – 02:30 PM</option>
                                    <option>03:00 PM – 03:30 PM</option>
                                    <option>04:00 PM – 04:30 PM</option>
                                    <option>05:00 PM – 05:30 PM</option>
                                </select>
                            </div>

                            <div className="booking-field-group" style={{ gridColumn: '1 / -1' }}>
                                <label>Additional Notes</label>
                                <textarea
                                    name="notes"
                                    value={form.notes}
                                    onChange={handleChange}
                                    rows={3}
                                    placeholder="Any special requests or questions..."
                                    className="bo-input bo-textarea"
                                />
                            </div>

                            <div className="booking-form-actions">
                                <button type="submit" className="btn-gold-fill large" style={{ flex: 1 }}>
                                    Confirm Test Drive →
                                </button>
                                <button type="button" className="btn-outline-gold" onClick={() => navigate(-1)}>
                                    Go Back
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}
