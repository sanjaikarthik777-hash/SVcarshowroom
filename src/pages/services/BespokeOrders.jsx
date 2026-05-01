import { useState } from 'react';

const carBrands = {
    'Rolls-Royce': ['Phantom', 'Ghost', 'Wraith', 'Cullinan', 'Spectre'],
    'Bentley': ['Continental GT', 'Bentayga', 'Flying Spur', 'Mulliner'],
    'Mercedes-Benz': ['S-Class', 'G-Wagon', 'Maybach S-Class', 'AMG GT'],
    'Porsche': ['911', 'Cayenne', 'Panamera', 'Taycan'],
    'Lamborghini': ['Huracán', 'Urus', 'Revuelto'],
    'Ferrari': ['Roma', 'Portofino', 'SF90 Stradale'],
};

const colorOptions = [
    { name: 'Midnight Black', hex: '#0d0d0d' },
    { name: 'Arctic Silver', hex: '#c0c0c0' },
    { name: 'Royal Blue', hex: '#1a3a6e' },
    { name: 'Pearl White', hex: '#f2f0eb' },
    { name: 'Racing Red', hex: '#9b1414' },
    { name: 'Emerald Green', hex: '#1a5c3a' },
    { name: 'Champagne Gold', hex: '#d4af37' },
    { name: 'Graphite Grey', hex: '#4a4a4a' },
];

const interiorOptions = [
    'Full Nappa Leather',
    'Alcantara + Leather Combination',
    'Carbon Fibre Accents',
    'Wood Veneer Trims',
    'Starlight Headliner',
    'Heated & Ventilated Seats',
    'Bespoke Audio System',
    'Rear Entertainment Package',
];

export default function BespokeOrders() {
    const [form, setForm] = useState({
        name: '',
        email: '',
        phone: '',
        brand: '',
        model: '',
        color: '',
        interior: [],
        notes: '',
    });
    const [submitted, setSubmitted] = useState(false);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleInterior = (option) => {
        setForm(prev => ({
            ...prev,
            interior: prev.interior.includes(option)
                ? prev.interior.filter(i => i !== option)
                : [...prev.interior, option],
        }));
    };

    const handleBrandChange = (e) => {
        setForm({ ...form, brand: e.target.value, model: '' });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitted(true);
    };

    const availableModels = form.brand ? carBrands[form.brand] : [];

    if (submitted) {
        return (
            <div className="service-page">
                <div className="bo-success-screen">
                    <div className="bo-success-card">
                        <div className="bo-success-icon">✅</div>
                        <h2>Bespoke Order Submitted!</h2>
                        <p>
                            Thank you, <strong>{form.name}</strong>. Your bespoke configuration for the&nbsp;
                            <strong>{form.brand} {form.model}</strong> has been received. Our specialist will
                            contact you at <strong>{form.email}</strong> within 24 hours.
                        </p>
                        <button className="btn-gold-fill" onClick={() => setSubmitted(false)}>
                            Place Another Order
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="service-page">

            {/* Hero */}
            <section className="bo-hero">
                <div className="bo-hero-overlay" />
                <div className="bo-hero-content container">
                    <span className="ps-badge">BESPOKE ATELIER</span>
                    <h1>Configure Your <br /><span className="gold-text">Dream Vehicle</span></h1>
                    <p>Every detail. Your vision. Our craftsmanship.</p>
                </div>
            </section>

            {/* Form Section */}
            <section className="bo-form-section container">
                <div className="bo-form-wrapper">

                    <div className="bo-form-header">
                        <h2>Bespoke <span className="gold-text">Order Form</span></h2>
                        <p>Fill in your preferences and our concierge team will craft your perfect automobile.</p>
                    </div>

                    <form onSubmit={handleSubmit} className="bo-form">

                        {/* Personal Info */}
                        <div className="bo-section-label">📋 Personal Information</div>
                        <div className="bo-form-row">
                            <div className="bo-form-group">
                                <label>Full Name</label>
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
                            <div className="bo-form-group">
                                <label>Email</label>
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
                        <div className="bo-form-row">
                            <div className="bo-form-group">
                                <label>Phone Number</label>
                                <input
                                    type="tel"
                                    name="phone"
                                    value={form.phone}
                                    onChange={handleChange}
                                    placeholder="+91 XXXXX XXXXX"
                                    className="bo-input"
                                />
                            </div>
                        </div>

                        {/* Vehicle Selection */}
                        <div className="bo-section-label" style={{ marginTop: '2rem' }}>🚘 Vehicle Configuration</div>
                        <div className="bo-form-row">
                            <div className="bo-form-group">
                                <label>Car Brand</label>
                                <select
                                    name="brand"
                                    value={form.brand}
                                    onChange={handleBrandChange}
                                    required
                                    className="bo-input"
                                >
                                    <option value="">Select Brand</option>
                                    {Object.keys(carBrands).map(b => (
                                        <option key={b} value={b}>{b}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="bo-form-group">
                                <label>Model</label>
                                <select
                                    name="model"
                                    value={form.model}
                                    onChange={handleChange}
                                    required
                                    disabled={!form.brand}
                                    className="bo-input"
                                >
                                    <option value="">Select Model</option>
                                    {availableModels.map(m => (
                                        <option key={m} value={m}>{m}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        {/* Color Picker */}
                        <div className="bo-section-label" style={{ marginTop: '2rem' }}>🎨 Exterior Colour</div>
                        <div className="bo-color-grid">
                            {colorOptions.map(c => (
                                <button
                                    type="button"
                                    key={c.name}
                                    className={`bo-color-swatch ${form.color === c.name ? 'selected' : ''}`}
                                    style={{ background: c.hex }}
                                    title={c.name}
                                    onClick={() => setForm({ ...form, color: c.name })}
                                >
                                    {form.color === c.name && <span className="bo-check">✓</span>}
                                </button>
                            ))}
                        </div>
                        {form.color && (
                            <p className="bo-color-label">Selected: <span className="gold-text">{form.color}</span></p>
                        )}

                        {/* Interior Options */}
                        <div className="bo-section-label" style={{ marginTop: '2rem' }}>🛋️ Interior Options</div>
                        <div className="bo-interior-grid">
                            {interiorOptions.map(opt => (
                                <label key={opt} className={`bo-interior-chip ${form.interior.includes(opt) ? 'active' : ''}`}>
                                    <input
                                        type="checkbox"
                                        style={{ display: 'none' }}
                                        checked={form.interior.includes(opt)}
                                        onChange={() => handleInterior(opt)}
                                    />
                                    {opt}
                                </label>
                            ))}
                        </div>

                        {/* Notes */}
                        <div className="bo-section-label" style={{ marginTop: '2rem' }}>📝 Additional Notes</div>
                        <div className="bo-form-group" style={{ width: '100%' }}>
                            <textarea
                                name="notes"
                                value={form.notes}
                                onChange={handleChange}
                                rows={4}
                                placeholder="Describe any other bespoke requirements..."
                                className="bo-input bo-textarea"
                            />
                        </div>

                        <button type="submit" className="btn-gold-fill large" style={{ marginTop: '2rem', width: '100%' }}>
                            Submit Bespoke Order →
                        </button>
                    </form>
                </div>
            </section>
        </div>
    );
}
