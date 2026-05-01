import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

export default function LoanServices() {
    const navigate = useNavigate();
    const services = [
        { title: 'Business Loan', icon: 'bi-briefcase', desc: 'Accelerate your business growth with our tailored financial solutions.', eligibility: 'Minimum 3 years in business.' },
        { title: 'Professional Loan', icon: 'bi-person-badge', desc: 'Exclusive loans for doctors, CAs, and other certified professionals.', eligibility: 'Valid professional degree & practice.' },
        { title: 'Self-Employed Loan', icon: 'bi-shop', desc: 'Flexible financing for entrepreneurs and freelancers.', eligibility: 'Consistent income proof for 2 years.' },
        { title: 'Car Loan', icon: 'bi-car-front', desc: 'Drive your dream car today with lowest interest rates.', eligibility: 'Salaried/Self-employed with steady income.' },
        { title: 'Personal Loan Assistance', icon: 'bi-person-hearts', desc: 'Quick funds for personal needs with no collateral.', eligibility: 'Minimum salary of ₹25,000/month.' },
    ];

    return (
        <div className="container py-5 mt-5">
            <div className="text-center mb-5">
                <h1 className="display-4 fw-bold text-gradient">Professional Loan Facilities</h1>
                <p className="text-muted lead mx-auto" style={{ maxWidth: '700px' }}>
                    Explore our comprehensive suite of financing options designed to empower your personal and professional journey.
                </p>
            </div>

            <div className="row g-4">
                {services.map((service, index) => (
                    <div key={index} className="col-md-6 col-lg-4">
                        <motion.div 
                            whileHover={{ y: -10, boxShadow: '0 15px 35px rgba(212, 175, 55, 0.15)' }}
                            className="card h-100 border-0 p-4 service-card shadow"
                            style={{ background: 'linear-gradient(145deg, #1c1c1c 0%, #0a0a0a 100%)', border: '1px solid rgba(212, 175, 55, 0.15)', transition: 'all 0.3s ease', borderRadius: '15px' }}
                        >
                            <div className="mb-4">
                                <i className={`bi ${service.icon} text-accent`} style={{ fontSize: '3rem' }}></i>
                            </div>
                            <h4 className="text-white fw-bold mb-3">{service.title}</h4>
                            <p className="text-muted mb-4">{service.desc}</p>
                            
                            <div className="mt-auto">
                                <div className="p-3 rounded mb-4" style={{ backgroundColor: 'rgba(255,255,255,0.05)', borderLeft: '3px solid var(--accent)' }}>
                                    <small className="text-accent fw-bold d-block mb-1 text-uppercase" style={{ letterSpacing: '1px' }}>Eligibility:</small>
                                    <small className="text-light">{service.eligibility}</small>
                                </div>
                                <button 
                                    className="btn w-100" 
                                    onClick={() => navigate('/finance/service-apply', { state: { serviceType: service.title } })}
                                    style={{ backgroundColor: 'var(--accent)', color: '#000', fontWeight: 'bold', textTransform: 'uppercase', borderRadius: '8px' }}
                                >
                                    Apply Now
                                </button>
                            </div>
                        </motion.div>
                    </div>
                ))}
            </div>
        </div>
    );
}
