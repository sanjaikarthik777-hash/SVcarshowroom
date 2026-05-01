import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function CarCard({ car, onBookTestDrive }) {
    const [currentImg, setCurrentImg] = useState(0);
    const navigate = useNavigate();

    // Support both MongoDB _id and static id
    const carId = car._id || car.id;
    // Guard images — could be empty if admin didn't add one
    const images = car.images && car.images.length > 0 ? car.images : ['https://via.placeholder.com/400x250?text=No+Image'];

    const prevImg = (e) => {
        e.stopPropagation();
        setCurrentImg(i => (i === 0 ? images.length - 1 : i - 1));
    };
    const nextImg = (e) => {
        e.stopPropagation();
        setCurrentImg(i => (i === images.length - 1 ? 0 : i + 1));
    };

    const handleImageClick = () => {
        navigate(`/booking/${carId}`);
    };

    return (
        <div className="car-card-col">
            <div className="car-card">

                {/* Clickable Image Gallery */}
                <div
                    className="car-card-img-wrap"
                    onClick={handleImageClick}
                    style={{ cursor: 'pointer' }}
                    title={`View booking for ${car.name}`}
                >
                    <img
                        src={images[currentImg]}
                        alt={car.name}
                        className="car-card-img"
                    />
                    <div className="car-card-img-overlay" />

                    {/* Click-to-book hint badge */}
                    <div className="car-card-click-hint">
                        <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                        Book Now
                    </div>

                    {/* Prev / Next arrows */}
                    {images.length > 1 && (
                        <>
                            <button className="car-card-arrow left" onClick={prevImg} aria-label="Previous">‹</button>
                            <button className="car-card-arrow right" onClick={nextImg} aria-label="Next">›</button>
                        </>
                    )}

                    {/* Dot indicators */}
                    <div className="car-card-dots">
                        {images.map((_, i) => (
                            <button
                                key={i}
                                className={`car-card-dot ${i === currentImg ? 'active' : ''}`}
                                onClick={(e) => { e.stopPropagation(); setCurrentImg(i); }}
                                aria-label={`Image ${i + 1}`}
                            />
                        ))}
                    </div>
                </div>

                {/* Card Body */}
                <div className="car-card-body">
                    <div className="car-card-name-row">
                        <h3 className="car-card-name">{car.name}</h3>
                        <span className="car-card-price">{car.price}</span>
                    </div>
                    <p className="car-card-desc">{car.description}</p>
                    <div className="car-card-footer">
                        <button
                            className="car-card-action-btn"
                            onClick={(e) => { e.stopPropagation(); navigate(`/booking/${carId}`); }}
                        >
                            Book Test Drive
                            <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                                <path d="M5 12h14M12 5l7 7-7 7" />
                            </svg>
                        </button>
                        <div className="car-card-badge">PREMIUM</div>
                    </div>
                </div>
            </div>
        </div>
    );
}
