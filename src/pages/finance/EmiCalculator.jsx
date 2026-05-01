import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { cars } from '../../data.js';

export default function EmiCalculator() {
    const { user } = useAuth();
    const [brands, setBrands] = useState([]);
    const [selectedBrand, setSelectedBrand] = useState('');
    const [models, setModels] = useState([]);
    const [selectedModel, setSelectedModel] = useState('');
    const [carPrice, setCarPrice] = useState(0);
    
    // Loan details
    const [downPayment, setDownPayment] = useState('');
    const [interestRate, setInterestRate] = useState(8.5); // Default
    const [tenure, setTenure] = useState(5); // Default in years
    
    // Additional Customer details for guests
    const [guestName, setGuestName] = useState('');
    const [guestPhone, setGuestPhone] = useState('');
    
    const tenureOptions = [1, 2, 3, 4, 5, 7];

    const financeProviders = [
        { name: 'Bajaj Finance', rate: '8.5%', description: 'Quick approval and flexible tenure.', logo: 'bi-bank' },
        { name: 'HDFC Bank', rate: '8.2%', description: 'Low processing fees and easy documentation.', logo: 'bi-bank2' },
        { name: 'Kotak Mahindra Finance', rate: '8.4%', description: 'Special offers for premium cars.', logo: 'bi-building' },
        { name: 'Tata Capital', rate: '8.6%', description: 'Transparent process and no hidden charges.', logo: 'bi-piggy-bank' },
        { name: 'Mahindra Finance', rate: '8.7%', description: 'Customized loan solutions for all profiles.', logo: 'bi-safe' },
        { name: 'ICICI Bank', rate: '8.3%', description: 'Instant sanction with minimal paperwork.', logo: 'bi-wallet2' },
    ];

    useEffect(() => {
        // Extract unique brands
        if (cars && cars.length > 0) {
            const uniqueBrands = [...new Set(cars.map(c => c.name.split(' ')[0]))];
            setBrands(uniqueBrands);
        }
    }, []);

    useEffect(() => {
        if (selectedBrand) {
            const brandModels = cars.filter(c => c.name.split(' ')[0] === selectedBrand);
            setModels(brandModels);
            setSelectedModel('');
            setCarPrice(0);
        } else {
            setModels([]);
        }
    }, [selectedBrand]);

    useEffect(() => {
        if (selectedModel) {
            const car = cars.find(c => c.name === selectedModel);
            if (car) {
                const priceStr = car.price.replace(/[^0-9]/g, '');
                setCarPrice(Number(priceStr));
            }
        }
    }, [selectedModel]);

    const loanAmount = Math.max(0, carPrice - Number(downPayment || 0));
    
    let monthlyEmi = 0;
    let totalPayable = 0;
    
    if (loanAmount > 0 && interestRate > 0 && tenure > 0) {
        const R = interestRate / 12 / 100;
        const N = tenure * 12;
        monthlyEmi = (loanAmount * R * Math.pow(1 + R, N)) / (Math.pow(1 + R, N) - 1);
        totalPayable = monthlyEmi * N;
    }

    const navigate = useNavigate();
    const handleApply = (provider) => {
        if (!user && (!guestName || !guestPhone)) {
            alert('Please fill in your Contact Details to apply.');
            return;
        }

        const formData = {
            userId: user ? user._id || user.id : undefined,
            customerName: user ? user.name : guestName,
            customerEmail: user ? user.email : "Not Provided",
            customerPhone: user ? (user.phone || '0000000000') : guestPhone,
            carBrand: selectedBrand,
            carModel: selectedModel,
            carPrice,
            loanAmount,
            downPayment: Number(downPayment || 0),
            interestRate,
            tenureMonths: tenure * 12,
            monthlyEmi: Math.round(monthlyEmi),
            totalPayable: Math.round(totalPayable),
            financeProvider: provider.name
        };
        
        navigate('/finance/apply', { state: { enquiryData: formData } });
    };

    return (
        <div className="container py-5 mt-5">
            <h2 className="display-4 fw-bold text-gradient mb-5 text-center">EMI Calculator</h2>
            
            <div className="row g-4 mb-5">
                <div className="col-lg-6">
                    <div className="card h-100 border-0 p-4 shadow" style={{ borderRadius: '15px', background: 'linear-gradient(145deg, #1c1c1c 0%, #0a0a0a 100%)', border: '1px solid rgba(212, 175, 55, 0.15)' }}>
                        <h4 className="mb-4 text-white"><i className="bi bi-car-front me-2 text-accent"></i>Vehicle Details</h4>
                        
                        <div className="mb-3">
                            <label className="form-label text-white fw-semibold mb-2">Car Brand</label>
                            <select className="form-select bg-dark text-white border-secondary shadow-none focus-ring" value={selectedBrand} onChange={(e) => setSelectedBrand(e.target.value)}>
                                <option value="">Select Brand</option>
                                {brands.map(brand => (
                                    <option key={brand} value={brand}>{brand}</option>
                                ))}
                            </select>
                        </div>
                        
                        <div className="mb-3">
                            <label className="form-label text-white fw-semibold mb-2">Car Model</label>
                            <select className="form-select bg-dark text-white border-secondary shadow-none focus-ring" value={selectedModel} onChange={(e) => setSelectedModel(e.target.value)} disabled={!selectedBrand}>
                                <option value="">Select Model</option>
                                {models.map(model => (
                                    <option key={model.id} value={model.name}>{model.name}</option>
                                ))}
                            </select>
                        </div>

                        {carPrice > 0 && (
                            <div className="mt-4 p-3 rounded fade-in" style={{ backgroundColor: 'rgba(212, 175, 55, 0.1)', border: '1px solid var(--accent)' }}>
                                <p className="mb-0 text-muted small">Vehicle Price</p>
                                <h3 className="mb-0 text-white fw-bold">₹{carPrice.toLocaleString('en-IN')}</h3>
                            </div>
                        )}
                    </div>
                </div>

                <div className="col-lg-6">
                    <div className="card h-100 border-0 p-4 shadow" style={{ borderRadius: '15px', background: 'linear-gradient(145deg, #1c1c1c 0%, #0a0a0a 100%)', border: '1px solid rgba(212, 175, 55, 0.15)' }}>
                        <h4 className="mb-4 text-white"><i className="bi bi-bank me-2 text-accent"></i>Loan Details</h4>
                        
                        <div className="mb-3">
                            <label className="form-label text-white fw-semibold mb-2">Down Payment (₹)</label>
                            <input type="number" className="form-control bg-dark text-white border-secondary shadow-none focus-ring" value={downPayment} onChange={(e) => setDownPayment(e.target.value)} placeholder="0" />
                        </div>
                        
                        <div className="mb-3">
                            <label className="form-label text-white fw-semibold mb-2">Interest Rate (%)</label>
                            <input type="number" step="0.1" className="form-control bg-dark text-white border-secondary shadow-none focus-ring" value={interestRate} onChange={(e) => setInterestRate(Number(e.target.value))} />
                        </div>

                        <div className="mb-3">
                            <label className="form-label text-white fw-semibold mb-2">Loan Tenure</label>
                            <select className="form-select bg-dark text-white border-secondary shadow-none focus-ring" value={tenure} onChange={(e) => setTenure(Number(e.target.value))}>
                                {tenureOptions.map(t => (
                                    <option key={t} value={t}>{t} {t === 1 ? 'Year' : 'Years'}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content below will only show if price is available */}
            {carPrice > 0 && (
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="card border-0 p-5 mb-5 text-center shadow-lg"
                    style={{ background: 'linear-gradient(145deg, rgba(20,20,20,0.95) 0%, rgba(5,5,5,0.95) 100%)', borderRadius: '20px', border: '1px solid rgba(212, 175, 55, 0.3)' }}
                >
                    <div className="row g-4 align-items-center">
                        <div className="col-md-4">
                            <p className="text-muted mb-1 text-uppercase tracking-wider">Loan Amount</p>
                            <h3 className="text-white fw-light">₹{loanAmount.toLocaleString('en-IN')}</h3>
                        </div>
                        <div className="col-md-4 border-start border-end border-secondary">
                            <p className="text-accent mb-1 fw-bold text-uppercase tracking-wider">Monthly EMI</p>
                            <h1 className="text-white fw-bold mb-0" style={{ fontSize: '3rem' }}>₹{Math.round(monthlyEmi).toLocaleString('en-IN')}</h1>
                        </div>
                        <div className="col-md-4">
                            <p className="text-muted mb-1 text-uppercase tracking-wider">Total Payable</p>
                            <h3 className="text-white fw-light">₹{Math.round(totalPayable).toLocaleString('en-IN')}</h3>
                        </div>
                    </div>
                </motion.div>
            )}

            {carPrice > 0 && (
                <div className="mt-5">
                    <h3 className="text-white fw-bold mb-4">Available Finance Providers</h3>
                    
                    {!user && (
                        <div className="card border-0 p-4 mb-4 shadow" style={{ borderRadius: '15px', background: 'linear-gradient(145deg, #1c1c1c 0%, #0a0a0a 100%)', border: '1px solid rgba(212, 175, 55, 0.15)' }}>
                            <h6 className="text-accent mb-3"><i className="bi bi-person-lines-fill me-2"></i>Contact Information Required</h6>
                            <div className="row g-3">
                                <div className="col-md-6">
                                    <input type="text" className="form-control bg-dark text-white border-secondary" placeholder="Your Name" value={guestName} onChange={(e) => setGuestName(e.target.value)} />
                                </div>
                                <div className="col-md-6">
                                    <input type="text" className="form-control bg-dark text-white border-secondary" placeholder="Phone Number" value={guestPhone} onChange={(e) => setGuestPhone(e.target.value)} />
                                </div>
                            </div>
                        </div>
                    )}

                    <div className="row g-4">
                        {financeProviders.map((provider, index) => (
                            <div key={index} className="col-md-6 col-lg-4">
                                <motion.div 
                                    whileHover={{ y: -5, boxShadow: "0 10px 30px rgba(212, 175, 55, 0.15)" }}
                                    className="card h-100 border-0 p-4 finance-provider-card"
                                    style={{ borderRadius: '15px', background: 'linear-gradient(145deg, #1a1a1a 0%, #050505 100%)', border: '1px solid rgba(212, 175, 55, 0.15)', transition: 'all 0.3s ease' }}
                                >
                                    <div className="d-flex align-items-center mb-3">
                                        <div className="provider-icon p-3 rounded-circle me-3" style={{ backgroundColor: 'rgba(212,175,55,0.1)' }}>
                                            <i className={`bi ${provider.logo} fs-3 text-accent`}></i>
                                        </div>
                                        <div>
                                            <h5 className="text-white mb-0">{provider.name}</h5>
                                            <span className="badge bg-dark border border-secondary text-accent mt-1">From {provider.rate} p.a.</span>
                                        </div>
                                    </div>
                                    <p className="text-muted small mb-4">{provider.description}</p>
                                    <button 
                                        className="btn btn-outline-warning w-100 mt-auto shadow-none"
                                        onClick={() => handleApply(provider)}
                                        disabled={!selectedModel || loanAmount <= 0}
                                        style={{ borderRadius: '8px' }}
                                    >
                                        Apply Now
                                    </button>
                                </motion.div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
