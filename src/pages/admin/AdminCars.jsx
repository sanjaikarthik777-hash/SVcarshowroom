import { useState, useEffect } from 'react';
import { cars as initialCars } from '../../data';
import { API_BASE } from '../../api';

const API_URL = `${API_BASE}/cars`;

export default function AdminCars() {
    const [carList, setCarList] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        _id: '', name: '', brand: '', price: '', image: '', description: ''
    });

    // Fetch cars from backend
    useEffect(() => {
        fetchCars();
    }, []);

    const fetchCars = async () => {
        setLoading(true);
        try {
            const res = await fetch(API_URL);
            if (!res.ok) throw new Error('Server error');
            const data = await res.json();
            // If DB is empty, seed with initial data
            if (data.length === 0) {
                seedInitialCars();
            } else {
                setCarList(data);
            }
        } catch {
            // Fallback: if backend is down, use initial data
            const stored = JSON.parse(localStorage.getItem('adminCars'));
            setCarList(stored || initialCars);
        } finally {
            setLoading(false);
        }
    };

    const seedInitialCars = async () => {
        try {
            for (const car of initialCars) {
                await fetch(API_URL, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        name: car.name,
                        brand: car.brand || 'Luxury',
                        price: car.price,
                        images: car.images || [],
                        description: car.description || ''
                    })
                });
            }
            fetchCars();
        } catch { /* silent fail */ }
    };

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleEdit = (car) => {
        setFormData({
            _id: car._id,
            name: car.name,
            brand: car.brand || '',
            price: car.price,
            image: car.images && car.images[0] ? car.images[0] : '',
            description: car.description || ''
        });
        setIsEditing(true);
    };

    const handleDelete = async (id) => {
        if (window.confirm("Delete this vehicle from inventory?")) {
            try {
                await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
                setCarList(carList.filter(c => c._id !== id));
            } catch {
                alert('Error deleting car. Is the server running?');
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const payload = {
            name: formData.name,
            brand: formData.brand,
            price: formData.price,
            description: formData.description,
            images: [formData.image]
        };

        try {
            if (isEditing) {
                const res = await fetch(`${API_URL}/${formData._id}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload)
                });
                const updated = await res.json();
                setCarList(carList.map(c => c._id === formData._id ? updated : c));
                setIsEditing(false);
            } else {
                const res = await fetch(API_URL, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload)
                });
                const created = await res.json();
                setCarList([created, ...carList]);
            }
            setFormData({ _id: '', name: '', brand: '', price: '', image: '', description: '' });
        } catch {
            alert('Error saving car. Is the server running?');
        }
    };

    const cancelEdit = () => {
        setIsEditing(false);
        setFormData({ _id: '', name: '', brand: '', price: '', image: '', description: '' });
    };

    return (
        <div className="admin-page-content">
            <div className="admin-page-header">
                <div>
                    <h2>Cars Management</h2>
                    <p className="admin-subtitle">Update your showroom inventory.</p>
                </div>
            </div>

            <div className="admin-grid-layout mt-4">

                {/* Form Col */}
                <div className="admin-form-panel">
                    <h3>{isEditing ? 'Edit Vehicle' : 'Add New Vehicle'}</h3>
                    <form onSubmit={handleSubmit} className="admin-form mt-3">
                        <div className="form-group mb-3">
                            <label>Car Name</label>
                            <input type="text" name="name" required value={formData.name} onChange={handleInputChange} className="admin-input" placeholder="e.g. Mercedes AMG GT" />
                        </div>
                        <div className="form-row">
                            <div className="form-group mb-3">
                                <label>Brand</label>
                                <input type="text" name="brand" required value={formData.brand} onChange={handleInputChange} className="admin-input" placeholder="Mercedes" />
                            </div>
                            <div className="form-group mb-3">
                                <label>Price</label>
                                <input type="text" name="price" required value={formData.price} onChange={handleInputChange} className="admin-input" placeholder="e.g. ₹1,20,00,000" />
                            </div>
                        </div>
                        <div className="form-group mb-3">
                            <label>Image URL</label>
                            <input type="url" name="image" required value={formData.image} onChange={handleInputChange} className="admin-input" placeholder="https://..." />
                        </div>
                        <div className="form-group mb-4">
                            <label>Description</label>
                            <textarea name="description" rows="3" required value={formData.description} onChange={handleInputChange} className="admin-input" placeholder="Supercar description..."></textarea>
                        </div>

                        <div className="d-flex gap-2">
                            <button type="submit" className="admin-btn-solid btn-gold flex-grow-1">
                                {isEditing ? 'Update Car' : 'Add to Inventory'}
                            </button>
                            {isEditing && (
                                <button type="button" onClick={cancelEdit} className="admin-btn-outline">Cancel</button>
                            )}
                        </div>
                    </form>
                </div>

                {/* List Col */}
                <div className="admin-list-panel">
                    <div className="admin-table-wrap">
                        {loading ? (
                            <p className="text-center text-muted py-4">Loading cars...</p>
                        ) : (
                            <table className="admin-table">
                                <thead>
                                    <tr>
                                        <th>Image</th>
                                        <th>Model &amp; Brand</th>
                                        <th>Price</th>
                                        <th className="text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {carList.map(car => (
                                        <tr key={car._id}>
                                            <td>
                                                <div className="admin-car-thumb">
                                                    <img src={car.images && car.images[0]} alt={car.name} />
                                                </div>
                                            </td>
                                            <td>
                                                <div className="fw-600 gold-text">{car.name}</div>
                                                <div className="text-muted fs-small">{car.brand || 'Luxury'}</div>
                                            </td>
                                            <td>{car.price}</td>
                                            <td className="text-right">
                                                <div className="admin-action-btns">
                                                    <button className="btn-icon edit" onClick={() => handleEdit(car)} title="Edit">✎</button>
                                                    <button className="btn-icon delete" onClick={() => handleDelete(car._id)} title="Delete">🗑</button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </div>
                </div>

            </div>
        </div>
    );
}
