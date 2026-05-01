import { useState } from 'react';
import { motion } from 'framer-motion';
import { API_BASE } from '../api';

export default function TestDriveModal({ car, onClose }) {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        datetime: ''
    });

    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.name || !formData.email || !formData.phone || !formData.datetime) {
            alert("Please fill all fields!");
            return;
        }

        const bookingData = {
            ...formData,
            car: car.name,
            status: 'Pending'
        };

        setLoading(true);
        try {
            const res = await fetch(`${API_BASE}/bookings`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(bookingData)
            });
            if (!res.ok) throw new Error();
        } catch {
            // Fallback: save to localStorage
            const bookings = JSON.parse(localStorage.getItem('bookings')) || [];
            bookings.push({ ...bookingData, timestamp: new Date().toISOString() });
            localStorage.setItem('bookings', JSON.stringify(bookings));
        } finally {
            setLoading(false);
            setSubmitted(true);
        }
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="modal-content-custom"
                onClick={(e) => e.stopPropagation()}
            >
                <span className="close-modal" onClick={onClose}>✖</span>

                {!submitted ? (
                    <>
                        <h5 className="text-white mb-3">Book Test Drive</h5>
                        <p className="text-warning fw-bold mb-4">{car.name}</p>

                        <form onSubmit={handleSubmit}>
                            <input
                                type="text"
                                id="name"
                                placeholder="Your Name"
                                className="form-control mb-3 text-white"
                                style={{ background: '#333', border: '1px solid #555' }}
                                value={formData.name}
                                onChange={handleChange}
                            />
                            <input
                                type="email"
                                id="email"
                                placeholder="Your Email"
                                className="form-control mb-3 text-white"
                                style={{ background: '#333', border: '1px solid #555' }}
                                value={formData.email}
                                onChange={handleChange}
                            />
                            <input
                                type="tel"
                                id="phone"
                                placeholder="Phone Number"
                                className="form-control mb-3 text-white"
                                style={{ background: '#333', border: '1px solid #555' }}
                                value={formData.phone}
                                onChange={handleChange}
                            />
                            <input
                                type="datetime-local"
                                id="datetime"
                                className="form-control mb-3 text-white"
                                style={{ background: '#333', border: '1px solid #555' }}
                                value={formData.datetime}
                                onChange={handleChange}
                            />
                            <button type="submit" className="btn btn-360 w-100" disabled={loading}>
                                {loading ? 'Submitting...' : 'Submit'}
                            </button>
                        </form>
                    </>
                ) : (
                    <div className="text-center py-4">
                        <div className="mb-3" style={{ fontSize: '3rem' }}>🎉</div>
                        <h4 className="text-white mb-3">Thank You!</h4>
                        <p className="text-white-50">
                            Your test drive for <span className="text-warning">{car.name}</span> has been booked.
                            <br />
                            We will contact you shortly to confirm the details.
                        </p>
                        <button className="btn btn-gold mt-3" onClick={onClose}>Close</button>
                    </div>
                )}
            </motion.div>
        </div>
    );
}
