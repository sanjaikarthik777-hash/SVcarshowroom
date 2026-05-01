import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useAccessibility } from '../context/AccessibilityContext';
import { carCategoriesData } from '../data/carCategoriesData';

export default function Navbar() {
    const { user, isAdmin, logout } = useAuth();
    const { increaseTextSize, decreaseTextSize, toggleHighContrast, highContrast, toggleGrayscale, grayscale, resetAccessibility } = useAccessibility();
    const navigate = useNavigate();
    const location = useLocation();
    const [scrolled, setScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
    const closeMenu = () => setIsMenuOpen(false);

    const handleLogout = () => {
        logout();
        closeMenu();
        navigate('/login');
    };

    return (
        <nav className={`navbar navbar-expand-lg fixed-top ${scrolled ? 'scrolled' : ''} ${isMenuOpen ? 'menu-open' : ''}`}>
            <div className="container">
                <Link className="navbar-brand fw-bold" to="/" onClick={closeMenu}>SV</Link>
                <button 
                    className={`navbar-toggler ${isMenuOpen ? '' : 'collapsed'}`} 
                    type="button" 
                    onClick={toggleMenu}
                    aria-expanded={isMenuOpen}
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className={`collapse navbar-collapse ${isMenuOpen ? 'show' : ''}`} id="menu">
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown">
                                Services
                            </a>
                            <ul className="dropdown-menu rr-dropdown">
                                <li><Link className="dropdown-item" to="/premium-sales" onClick={closeMenu}>Premium Sales</Link></li>
                                <li><Link className="dropdown-item" to="/bespoke-orders" onClick={closeMenu}>Bespoke Orders</Link></li>
                                <li><Link className="dropdown-item" to="/concierge-support" onClick={closeMenu}>Concierge Support</Link></li>
                            </ul>
                        </li>

                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                CARS
                            </a>
                            <div className="dropdown-menu rr-dropdown cars-mega-menu">
                                <div className="mega-menu-grid">
                                    {Object.entries(carCategoriesData).map(([path, data]) => (
                                        <Link key={path} className="dropdown-item mega-menu-item" to={`/cars/${path}`} onClick={closeMenu}>
                                            <div className="mega-menu-img-wrapper">
                                                <img src={data.heroImage} alt={data.title} />
                                            </div>
                                            <span>{data.title === 'Luxury SUVs' ? 'SUVs' : data.title}</span>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </li>
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown">
                                Finance & Loans
                            </a>
                            <div className="dropdown-menu rr-dropdown p-3" style={{ minWidth: '320px', borderTop: '3px solid var(--accent)' }}>
                                <div className="d-flex flex-column gap-3">
                                    <Link to="/finance/emi-calculator" className="dropdown-item d-flex align-items-start gap-3 p-2 rounded" style={{ whiteSpace: 'normal', transition: 'all 0.3s' }} onClick={closeMenu}>
                                        <div className="mt-1" style={{ color: 'var(--accent)' }}>
                                            <i className="bi bi-calculator fs-4"></i>
                                        </div>
                                        <div>
                                            <h6 className="mb-1 fw-bold text-white text-uppercase" style={{ letterSpacing: '1px', fontSize: '0.85rem' }}>EMI Calculator</h6>
                                            <p className="mb-0 text-muted" style={{ fontSize: '0.75rem', lineHeight: '1.4' }}>Calculate your monthly payments instantly.</p>
                                        </div>
                                    </Link>
                                    <Link to="/finance/loan-services" className="dropdown-item d-flex align-items-start gap-3 p-2 rounded" style={{ whiteSpace: 'normal', transition: 'all 0.3s' }} onClick={closeMenu}>
                                        <div className="mt-1" style={{ color: 'var(--accent)' }}>
                                            <i className="bi bi-bank fs-4"></i>
                                        </div>
                                        <div>
                                            <h6 className="mb-1 fw-bold text-white text-uppercase" style={{ letterSpacing: '1px', fontSize: '0.85rem' }}>Loan Services</h6>
                                            <p className="mb-0 text-muted" style={{ fontSize: '0.75rem', lineHeight: '1.4' }}>Explore our premium financing options.</p>
                                        </div>
                                    </Link>
                                </div>
                            </div>
                        </li>
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown">
                                About
                            </a>
                            <div className="dropdown-menu rr-dropdown p-3" style={{ minWidth: '320px', borderTop: '3px solid var(--accent)' }}>
                                <div className="d-flex flex-column gap-3">
                                    <Link to="/about" className="dropdown-item d-flex align-items-start gap-3 p-2 rounded" style={{ whiteSpace: 'normal', transition: 'all 0.3s' }} onClick={closeMenu}>
                                        <div className="mt-1" style={{ color: 'var(--accent)' }}>
                                            <i className="bi bi-book fs-4"></i>
                                        </div>
                                        <div>
                                            <h6 className="mb-1 fw-bold text-white text-uppercase" style={{ letterSpacing: '1px', fontSize: '0.85rem' }}>Our Story</h6>
                                            <p className="mb-0 text-muted" style={{ fontSize: '0.75rem', lineHeight: '1.4' }}>The legacy and vision behind our premier automotive collection.</p>
                                        </div>
                                    </Link>
                                    <Link to="/dealerships" className="dropdown-item d-flex align-items-start gap-3 p-2 rounded" style={{ whiteSpace: 'normal', transition: 'all 0.3s' }} onClick={closeMenu}>
                                        <div className="mt-1" style={{ color: 'var(--accent)' }}>
                                            <i className="bi bi-geo-alt fs-4"></i>
                                        </div>
                                        <div>
                                            <h6 className="mb-1 fw-bold text-white text-uppercase" style={{ letterSpacing: '1px', fontSize: '0.85rem' }}>Dealerships</h6>
                                            <p className="mb-0 text-muted" style={{ fontSize: '0.75rem', lineHeight: '1.4' }}>Find our exclusive luxury showrooms worldwide.</p>
                                        </div>
                                    </Link>
                                    <Link to="/careers" className="dropdown-item d-flex align-items-start gap-3 p-2 rounded" style={{ whiteSpace: 'normal', transition: 'all 0.3s' }} onClick={closeMenu}>
                                        <div className="mt-1" style={{ color: 'var(--accent)' }}>
                                            <i className="bi bi-briefcase fs-4"></i>
                                        </div>
                                        <div>
                                            <h6 className="mb-1 fw-bold text-white text-uppercase" style={{ letterSpacing: '1px', fontSize: '0.85rem' }}>Careers</h6>
                                            <p className="mb-0 text-muted" style={{ fontSize: '0.75rem', lineHeight: '1.4' }}>Join our team of elite automotive specialists.</p>
                                        </div>
                                    </Link>
                                </div>
                            </div>
                        </li>
                        <li className="nav-item"><a className="nav-link" href="#footer">Contact</a></li>

                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown">
                                <i className="bi bi-person-wheelchair me-1"></i> Accessibility
                            </a>
                            <ul className="dropdown-menu rr-dropdown">
                                <li>
                                    <button className="dropdown-item d-flex align-items-center justify-content-between" onClick={increaseTextSize}>
                                        <span>Increase Text Size</span>
                                        <i className="bi bi-zoom-in text-muted fs-small"></i>
                                    </button>
                                </li>
                                <li>
                                    <button className="dropdown-item d-flex align-items-center justify-content-between" onClick={decreaseTextSize}>
                                        <span>Decrease Text Size</span>
                                        <i className="bi bi-zoom-out text-muted fs-small"></i>
                                    </button>
                                </li>
                                <li>
                                    <button className="dropdown-item d-flex align-items-center justify-content-between" onClick={toggleHighContrast}>
                                        <span>{highContrast ? 'Disable' : 'Enable'} High Contrast</span>
                                        <i className={`bi bi-circle-half text-${highContrast ? 'warning' : 'muted'} fs-small`}></i>
                                    </button>
                                </li>
                                <li>
                                    <button className="dropdown-item d-flex align-items-center justify-content-between" onClick={toggleGrayscale}>
                                        <span>{grayscale ? 'Disable' : 'Enable'} Grayscale Mode</span>
                                        <i className={`bi bi-palette-fill text-${grayscale ? 'warning' : 'muted'} fs-small`}></i>
                                    </button>
                                </li>
                                <li><hr className="dropdown-divider border-secondary" /></li>
                                <li>
                                    <button className="dropdown-item text-danger d-flex align-items-center justify-content-between" onClick={resetAccessibility}>
                                        <span>Reset Options</span>
                                        <i className="bi bi-arrow-counterclockwise fs-small"></i>
                                    </button>
                                </li>
                            </ul>
                        </li>

                        {isAdmin && (
                            <li className="nav-item">
                                <Link className="nav-link d-flex align-items-center gap-2" to="/admin" onClick={closeMenu}>
                                    <span>Sanjai</span>
                                    <span className="badge bg-warning text-dark">ADMIN</span>
                                </Link>
                            </li>
                        )}

                        {!user ? (
                            <>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/login" onClick={closeMenu}>Login</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/signup" onClick={closeMenu}>Sign Up</Link>
                                </li>
                            </>
                        ) : (
                            <li className="nav-item">
                                <button className="nav-link btn btn-link rr-logout" onClick={handleLogout}>Logout</button>
                            </li>
                        )}
                        <li className="nav-item ms-lg-3 d-flex align-items-center">
                            <Link to="/test-drive-booking" className="btn btn-sm" style={{ backgroundColor: 'var(--accent)', color: '#000', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '1.5px', borderRadius: '4px', padding: '8px 20px', border: 'none' }} onClick={closeMenu}>
                                Book Now
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}
