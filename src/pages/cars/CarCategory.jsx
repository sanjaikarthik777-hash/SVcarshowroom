import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { carCategoriesData } from '../../data/carCategoriesData';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

export default function CarCategory() {
    const { categoryId } = useParams();
    const categoryData = carCategoriesData[categoryId];

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [categoryId]);

    if (!categoryData) {
        return (
            <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh', background: 'var(--bg-primary)' }}>
                <div className="text-center">
                    <h1 className="text-white mb-4" style={{ fontFamily: 'Montserrat, sans-serif' }}>Category Not Found</h1>
                    <Link to="/" className="hero-btn-primary">Return Home</Link>
                </div>
            </div>
        );
    }

    return (
        <>
            <Navbar />
            <div className="category-page" style={{ paddingTop: '80px' }}>
                {/* Hero Section */}
                <div className="category-hero position-relative" style={{ height: '60vh', overflow: 'hidden' }}>
                    <img
                        src={categoryData.heroImage}
                        alt={categoryData.title}
                        className="w-100 h-100 object-fit-cover"
                        style={{ filter: 'brightness(0.6)' }}
                    />
                    <div className="position-absolute top-0 start-0 w-100 h-100 d-flex flex-column justify-content-center align-items-center text-center p-4" style={{ background: 'rgba(9, 14, 26, 0.4)' }}>
                        <h1 className="display-3 fw-bold text-white mb-3" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                            {categoryData.title}
                        </h1>
                        <p className="lead text-light mb-0" style={{ maxWidth: '700px', fontSize: '1.2rem', fontFamily: 'Inter, sans-serif', fontWeight: 300, lineHeight: 1.8 }}>
                            {categoryData.description}
                        </p>
                    </div>
                </div>

                {/* Grid Section */}
                <div className="container py-5" style={{ marginTop: '2rem' }}>
                    <div className="d-flex justify-content-between align-items-center mb-5">
                        <h2 className="fs-3 fw-bold text-white m-0" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                            Showing <span style={{ color: 'var(--accent)' }}>{categoryData.cars.length}</span> Models
                        </h2>
                        <div className="cars-section-divider m-0" style={{ width: '80px', height: '3px', background: 'linear-gradient(90deg, var(--accent), transparent)' }}></div>
                    </div>

                    <div className="row g-4">
                        {categoryData.cars.map((car, index) => (
                            <div key={car.id} className="col-12 col-md-6 col-lg-4 d-flex" style={{ animation: `fadeInUp 0.6s ease ${index * 0.15}s both` }}>
                                <div className="car-card">
                                    <div className="car-card-img-wrap">
                                        <img src={car.image} alt={car.name} className="car-card-img" />
                                        <div className="car-card-img-overlay"></div>
                                        <div className="car-card-hover-cta">
                                            <Link to={`/booking/${car.id}`} className="car-card-td-btn text-decoration-none">
                                                Book Test Drive
                                            </Link>
                                        </div>
                                        <div className="position-absolute top-0 end-0 m-3">
                                            {car.tags.map((tag, i) => (
                                                <span key={i} className="car-card-badge ms-2">{tag}</span>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="car-card-body">
                                        <div className="car-card-name-row">
                                            <h3 className="car-card-name">{car.name}</h3>
                                            <span className="car-card-price">{car.price}</span>
                                        </div>
                                        <p className="car-card-desc">{car.description}</p>
                                        <div className="car-card-footer mt-auto pt-3">
                                            <Link to={`/booking/${car.id}`} className="car-card-action-btn text-decoration-none w-100 text-center justify-content-center">
                                                <i className="bi bi-info-circle me-2"></i> View Details
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <style>{`
                @keyframes fadeInUp {
                    from { opacity: 0; transform: translateY(30px); }
                    to { opacity: 1; transform: translateY(0); }
                }
            `}</style>
            </div>
            <Footer />
        </>
    );
}
