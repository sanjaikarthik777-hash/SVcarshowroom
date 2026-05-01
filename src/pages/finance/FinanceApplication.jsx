import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

export default function FinanceApplication() {
    const location = useLocation();
    const navigate = useNavigate();
    const enquiryData = location.state?.enquiryData;

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

    if (!enquiryData) {
        return (
            <div className="container py-5 mt-5 text-center">
                <h2 className="text-white">No Application Data Found</h2>
                <p className="text-muted">Please start your application from the EMI Calculator.</p>
                <button className="btn btn-outline-warning mt-3" onClick={() => navigate('/finance/emi-calculator')}>
                    Go to EMI Calculator
                </button>
            </div>
        );
    }

    const {
        customerName, customerEmail, customerPhone,
        carBrand, carModel, carPrice,
        loanAmount, downPayment, interestRate, tenureMonths,
        monthlyEmi, totalPayable, financeProvider
    } = enquiryData;

    const handleConfirmApply = async () => {
        setIsSubmitting(true);
        try {
            const response = await fetch('http://localhost:5000/api/finance/apply', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(enquiryData)
            });

            if (response.ok) {
                setShowSuccess(true);
            } else {
                const errorData = await response.json();
                alert(`Failed: ${errorData.message}`);
                setIsSubmitting(false);
            }
        } catch (error) {
            console.error('Error applying for loan:', error);
            alert('Network error. Please try again.');
            setIsSubmitting(false);
        }
    };

    return (
        <>
            <div className="container py-5 mt-5">
            <h2 className="display-4 fw-bold text-gradient mb-3 text-center">Review Application</h2>
            <p className="text-muted text-center mb-5">Please review your loan details before final submission.</p>

            <div className="row justify-content-center">
                <div className="col-lg-8">
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="card border-0 p-5 shadow-lg"
                        style={{ background: 'linear-gradient(145deg, #1c1c1c 0%, #0a0a0a 100%)', borderRadius: '20px', border: '1px solid rgba(212, 175, 55, 0.3)' }}
                    >
                        
                        <div className="d-flex align-items-center justify-content-between mb-4 pb-3 border-bottom border-secondary">
                            <div>
                                <h4 className="text-white fw-bold mb-1">Applying to {financeProvider}</h4>
                                <span className="badge bg-dark border border-warning text-warning">Interest Rate: {interestRate}%</span>
                            </div>
                            <i className="bi bi-bank fs-1 text-accent"></i>
                        </div>

                        <div className="row g-4 mb-4">
                            <div className="col-md-6">
                                <p className="text-muted mb-1 small text-uppercase tracking-wider">Applicant Name</p>
                                <h5 className="text-white">{customerName}</h5>
                            </div>
                            <div className="col-md-6">
                                <p className="text-muted mb-1 small text-uppercase tracking-wider">Contact</p>
                                <h5 className="text-white">{customerPhone} <br/><small className="text-muted">{customerEmail}</small></h5>
                            </div>
                        </div>

                        <div className="row g-4 mb-4 pb-4 border-bottom border-secondary">
                            <div className="col-md-6">
                                <p className="text-muted mb-1 small text-uppercase tracking-wider">Vehicle Selected</p>
                                <h5 className="text-white">{carBrand} {carModel}</h5>
                            </div>
                            <div className="col-md-6">
                                <p className="text-muted mb-1 small text-uppercase tracking-wider">Vehicle Price</p>
                                <h5 className="text-white">₹{carPrice.toLocaleString('en-IN')}</h5>
                            </div>
                        </div>

                        <div className="row g-4 align-items-center mb-5 bg-dark p-4 rounded border border-secondary" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
                            <div className="col-md-6 border-end border-secondary">
                                <div className="mb-3">
                                    <p className="text-muted mb-0 small">Down Payment</p>
                                    <h5 className="text-white fw-light">₹{downPayment.toLocaleString('en-IN')}</h5>
                                </div>
                                <div className="mb-3">
                                    <p className="text-muted mb-0 small">Loan Amount Required</p>
                                    <h4 className="text-white fw-bold">₹{loanAmount.toLocaleString('en-IN')}</h4>
                                </div>
                                <div>
                                    <p className="text-muted mb-0 small">Tenure</p>
                                    <h5 className="text-white fw-light">{tenureMonths / 12} Years ({tenureMonths} months)</h5>
                                </div>
                            </div>
                            
                            <div className="col-md-6 text-center">
                                <p className="text-accent mb-1 fw-bold text-uppercase tracking-wider"><i className="bi bi-lightning-charge-fill me-1"></i>Monthly EMI</p>
                                <h1 className="text-white fw-bold mb-3" style={{ fontSize: '2.5rem' }}>₹{monthlyEmi.toLocaleString('en-IN')}</h1>
                                
                                <p className="text-muted mb-0 small">Total Payable over {tenureMonths / 12} Years</p>
                                <h5 className="text-white fw-light">₹{totalPayable.toLocaleString('en-IN')}</h5>
                            </div>
                        </div>

                        <div className="d-flex gap-3">
                            <button 
                                className="btn btn-outline-secondary w-50 py-3" 
                                onClick={() => navigate(-1)}
                                disabled={isSubmitting}
                                style={{ borderRadius: '10px' }}
                            >
                                <i className="bi bi-arrow-left me-2"></i>Go Back
                            </button>
                            <button 
                                className="btn btn-warning w-50 py-3 fw-bold" 
                                onClick={handleConfirmApply}
                                disabled={isSubmitting}
                                style={{ borderRadius: '10px', backgroundColor: 'var(--accent)', border: 'none' }}
                            >
                                {isSubmitting ? (
                                    <><span className="spinner-border spinner-border-sm me-2" aria-hidden="true"></span> Processing...</>
                                ) : (
                                    <>Confirm & Apply <i className="bi bi-check-circle ms-2"></i></>
                                )}
                            </button>
                        </div>
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
                            
                            <h2 className="text-white fw-bold mb-3">Congratulations! 🎉</h2>
                            
                            <p className="text-muted mb-4 fs-5">
                                Your loan application has been securely submitted.
                            </p>
                            
                            <div className="p-4 mb-5 rounded text-start" style={{ backgroundColor: 'rgba(212, 175, 55, 0.08)', border: '1px solid rgba(212, 175, 55, 0.2)' }}>
                                <div className="d-flex align-items-center">
                                    <i className="bi bi-info-circle-fill fs-3 text-accent me-3"></i>
                                    <p className="text-white mb-0 lh-base">
                                        For further processing, please visit your nearest branch and meet our staff.
                                    </p>
                                </div>
                            </div>
                            
                            <button 
                                className="btn w-100 py-3 fw-bold fs-5 shadow" 
                                onClick={() => {
                                    setShowSuccess(false);
                                    navigate('/');
                                }}
                                style={{ borderRadius: '12px', backgroundColor: 'var(--accent)', color: '#000', border: 'none' }}
                            >
                                Return to Home
                            </button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
