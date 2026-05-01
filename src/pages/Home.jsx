import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import CarCard from '../components/CarCard';
import ChatBox from '../components/ChatBox';
import Footer from '../components/Footer';
import { cars as staticCars } from '../data';
import { API_BASE } from '../api';

export default function Home() {
    const [cars, setCars] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchCars();
    }, []);

    const fetchCars = async () => {
        try {
            const res = await fetch(`${API_BASE}/cars`);
            if (!res.ok) throw new Error();
            const data = await res.json();

            if (data.length > 0) {
                // Normalise MongoDB docs so CarCard works with _id as id
                setCars(data.map(c => ({ ...c, id: c._id })));
            } else {
                // DB is empty — show the static data
                setCars(staticCars);
            }
        } catch {
            // Backend offline — fall back to static data
            setCars(staticCars);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Navbar />
            <Hero />

            <section className="cars-section container" id="cars">
                <div className="cars-section-header">
                    <p className="cars-section-eyebrow">HANDPICKED COLLECTION</p>
                    <h2 className="cars-section-title">
                        Our <span className="cars-section-gold">Premium</span> Fleet
                    </h2>
                    <p className="cars-section-sub">
                        From iconic supercars to refined executive sedans — discover your perfect match.
                    </p>
                    <div className="cars-section-divider" />
                </div>

                <div className="cars-grid">
                    {loading ? (
                        <p className="text-center text-muted py-5 w-100" style={{ gridColumn: '1/-1' }}>
                            Loading fleet...
                        </p>
                    ) : (
                        cars.map(car => (
                            <CarCard
                                key={car._id || car.id}
                                car={car}
                            />
                        ))
                    )}
                </div>
            </section>

            <ChatBox />
            <Footer />
        </>
    );
}
