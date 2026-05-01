import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

export default function LoanServiceApplication() {
    const location = useLocation();
    const navigate = useNavigate();
    const serviceType = location.state?.serviceType || 'Loan';

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        amount: '',
        // Conditional fields
        businessName: '',
        turnover: '',
        profession: '',
        experience: '',
        salary: ''
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        
        // Simulating API call
        setTimeout(() => {
            setIsSubmitting(false);
            setShowSuccess(true);
        }, 1500);
    };

    return (
        <>
            <div className="container py-5 mt-5">
                <div className="text-center mb-5">
                    <h2 className="display-4 fw-bold text-gradient">Apply for {serviceType}</h2>
                    <p className="text-muted lead mx-auto" style={{ maxWidth: '600px' }}>
                        Please provide your details below. Our finance executives will review your profile and get back to you with the best rates.
                    </p>
                </div>

                <div className="row justify-content-center">
                    <div className="col-lg-8">
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="card border-0 p-5 shadow-lg"
                            style={{ background: 'linear-gradient(145deg, #1c1c1c 0%, #0a0a0a 100%)', borderRadius: '20px', border: '1px solid rgba(212, 175, 55, 0.3)' }}
                        >
                            <form onSubmit={handleSubmit}>
                                <h5 className="text-accent mb-4 border-bottom border-secondary pb-2"><i className="bi bi-person-lines-fill me-2"></i>Personal Details</h5>
                                <div className="row g-4 mb-5">
                                    <div className="col-md-6">
                                        <label className="form-label text-white fw-semibold mb-2">Full Name</label>
                                        <input type="text" name="name" className="form-control bg-dark text-white border-secondary shadow-none focus-ring" required onChange={handleChange} />
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label text-white fw-semibold mb-2">Phone Number</label>
                                        <input type="tel" name="phone" className="form-control bg-dark text-white border-secondary shadow-none focus-ring" required onChange={handleChange} />
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label text-white fw-semibold mb-2">Email Address</label>
                                        <input type="email" name="email" className="form-control bg-dark text-white border-secondary shadow-none focus-ring" required onChange={handleChange} />
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label text-white fw-semibold mb-2">Required Loan Amount (₹)</label>
                                        <input type="number" name="amount" className="form-control bg-dark text-white border-secondary shadow-none focus-ring" required onChange={handleChange} />
                                    </div>
                                </div>

                                <h5 className="text-accent mb-4 border-bottom border-secondary pb-2"><i className="bi bi-briefcase-fill me-2"></i>Professional Details</h5>
                                <div className="row g-4 mb-5">
                                    {(serviceType.includes('Business') || serviceType.includes('Self-Employed')) && (
                                        <>
                                            <div className="col-md-6">
                                                <label className="form-label text-white fw-semibold mb-2">Business/Company Name</label>
                                                <input type="text" name="businessName" className="form-control bg-dark text-white border-secondary shadow-none focus-ring" required onChange={handleChange} />
                                            </div>
                                            <div className="col-md-6">
                                                <label className="form-label text-white fw-semibold mb-2">Annual Turnover (₹)</label>
                                                <input type="number" name="turnover" className="form-control bg-dark text-white border-secondary shadow-none focus-ring" required onChange={handleChange} />
                                            </div>
                                            <div className="col-md-6">
                                                <label className="form-label text-white fw-semibold mb-2">Years in Business</label>
                                                <select name="experience" className="form-select bg-dark text-white border-secondary shadow-none focus-ring" required onChange={handleChange}>
                                                    <option value="">Select...</option>
                                                    <option value="1-3">1-3 Years</option>
                                                    <option value="3-5">3-5 Years</option>
                                                    <option value="5+">5+ Years</option>
                                                </select>
                                            </div>
                                        </>
                                    )}

                                    {serviceType.includes('Professional') && (
                                        <>
                                            <div className="col-md-6">
                                                <label className="form-label text-white fw-semibold mb-2">Profession Type</label>
                                                <select name="profession" className="form-select bg-dark text-white border-secondary shadow-none focus-ring" required onChange={handleChange}>
                                                    <option value="">Select...</option>
                                                    <option value="Doctor">Doctor / Medical Professional</option>
                                                    <option value="CA">Chartered Accountant (CA)</option>
                                                    <option value="Lawyer">Lawyer / Advocate</option>
                                                    <option value="Architect">Architect</option>
                                                    <option value="Other">Other Certified Professional</option>
                                                </select>
                                            </div>
                                            <div className="col-md-6">
                                                <label className="form-label text-white fw-semibold mb-2">Years of Practice</label>
                                                <input type="number" name="experience" className="form-control bg-dark text-white border-secondary shadow-none focus-ring" required onChange={handleChange} />
                                            </div>
                                        </>
                                    )}

                                    {(serviceType.includes('Car Loan') || serviceType.includes('Personal')) && (
                                        <>
                                            <div className="col-md-6">
                                                <label className="form-label text-white fw-semibold mb-2">Employment Status</label>
                                                <select name="profession" className="form-select bg-dark text-white border-secondary shadow-none focus-ring" required onChange={handleChange}>
                                                    <option value="">Select...</option>
                                                    <option value="Salaried">Salaried</option>
                                                    <option value="Business">Business</option>
                                                    <option value="Self-Employed">Self-Employed</option>
                                                </select>
                                            </div>
                                            <div className="col-md-6">
                                                <label className="form-label text-white fw-semibold mb-2">Net Monthly Salary/Income (₹)</label>
                                                <input type="number" name="salary" className="form-control bg-dark text-white border-secondary shadow-none focus-ring" required onChange={handleChange} />
                                            </div>
                                        </>
                                    )}
                                </div>

                                <div className="d-flex gap-3 mt-4">
                                    <button type="button" className="btn btn-outline-secondary w-50 py-3" onClick={() => navigate(-1)} style={{ borderRadius: '10px' }} disabled={isSubmitting}>
                                        <i className="bi bi-arrow-left me-2"></i>Go Back
                                    </button>
                                    <button type="submit" className="btn btn-warning w-50 py-3 fw-bold" style={{ borderRadius: '10px', backgroundColor: 'var(--accent)', border: 'none' }} disabled={isSubmitting}>
                                        {isSubmitting ? (
                                            <><span className="spinner-border spinner-border-sm me-2" aria-hidden="true"></span> Processing...</>
                                        ) : (
                                            <>Submit Application <i className="bi bi-send-fill ms-2"></i></>
                                        )}
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* Success Popup Display */}
            <AnimatePresence>
                {showSuccess && (
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center"
                        style={{ zIndex: 9999, backgroundColor: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(8px)' }}
                    >
                        <motion.div 
                            initial={{ y: 100, opacity: 0, scale: 0.9 }}
                            animate={{ y: 0, opacity: 1, scale: 1 }}
                            exit={{ y: 100, opacity: 0, scale: 0.9 }}
                            transition={{ type: "spring", stiffness: 350, damping: 25 }}
                            className="card border-0 p-5 shadow-lg text-center position-relative"
                            style={{ background: 'linear-gradient(145deg, #1c1c1c 0%, #0a0a0a 100%)', borderRadius: '25px', border: '1px solid rgba(212, 175, 55, 0.4)', maxWidth: '550px', width: '90%' }}
                        >
                            <div className="mb-4">
                                <motion.i 
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1, rotate: 360 }}
                                    transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                                    className="bi bi-check-circle-fill" 
                                    style={{ fontSize: '4.5rem', color: '#28a745', textShadow: '0 0 20px rgba(40, 167, 69, 0.5)' }}
                                ></motion.i>
                            </div>
                            
                            <h2 className="text-white fw-bold mb-3">Application Received! 🎉</h2>
                            
                            <p className="text-muted mb-4 fs-5">
                                Your <strong className="text-white">{serviceType}</strong> inquiry has been safely secured.
                            </p>
                            
                            <div className="p-4 mb-5 rounded text-start" style={{ backgroundColor: 'rgba(212, 175, 55, 0.08)', border: '1px solid rgba(212, 175, 55, 0.2)' }}>
                                <div className="d-flex align-items-center">
                                    <i className="bi bi-person-workspace fs-3 text-accent me-3"></i>
                                    <p className="text-white mb-0 lh-base">
                                        Our finance executives will review your profile and contact you within <strong>24 working hours</strong> to proceed.
                                    </p>
                                </div>
                            </div>
                            
                            <button 
                                className="btn w-100 py-3 fw-bold fs-5 shadow" 
                                onClick={() => {
                                    setShowSuccess(false);
                                    navigate('/finance/loan-services');
                                }}
                                style={{ borderRadius: '12px', backgroundColor: 'var(--accent)', color: '#000', border: 'none' }}
                            >
                                Return to Services
                            </button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
