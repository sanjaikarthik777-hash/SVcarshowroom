import { useState, useEffect } from 'react';
import { API_BASE } from '../../api';

const API_URL = `${API_BASE}/bookings`;

export default function AdminBookings() {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchBookings();
    }, []);

    const fetchBookings = async () => {
        setLoading(true);
        try {
            const res = await fetch(API_URL);
            if (!res.ok) throw new Error();
            const data = await res.json();
            setBookings(data);
        } catch {
            // Fallback to localStorage
            const stored = JSON.parse(localStorage.getItem('bookings')) || [];
            setBookings(stored.reverse());
        } finally {
            setLoading(false);
        }
    };

    const updateStatus = async (id, newStatus) => {
        try {
            const res = await fetch(`${API_URL}/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status: newStatus })
            });
            const updated = await res.json();
            setBookings(bookings.map(b => b._id === id ? updated : b));
        } catch {
            alert('Error updating status. Is the server running?');
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this booking?")) {
            try {
                await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
                setBookings(bookings.filter(b => b._id !== id));
            } catch {
                alert('Error deleting booking. Is the server running?');
            }
        }
    };

    return (
        <div className="admin-page-content">
            <div className="admin-page-header">
                <div>
                    <h2>Booking Management</h2>
                    <p className="admin-subtitle">Review, approve, and manage all test drive requests.</p>
                </div>
                <div className="admin-header-actions">
                    <span className="admin-badge accent">Total: {bookings.length}</span>
                </div>
            </div>

            <div className="admin-table-wrap mt-4">
                {loading ? (
                    <p className="text-center text-muted py-4">Loading bookings...</p>
                ) : (
                    <table className="admin-table">
                        <thead>
                            <tr>
                                <th>Car</th>
                                <th>Customer</th>
                                <th>Contact</th>
                                <th>Date &amp; Time</th>
                                <th>Status</th>
                                <th className="text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {bookings.map((b) => (
                                <tr key={b._id}>
                                    <td className="fw-600 gold-text">{b.car}</td>
                                    <td>{b.name}</td>
                                    <td>
                                        <div className="admin-td-contact">
                                            <span>{b.email}</span>
                                            <span className="text-muted">{b.phone}</span>
                                        </div>
                                    </td>
                                    <td>{b.datetime}</td>
                                    <td>
                                        <span className={`admin-status-badge ${b.status?.toLowerCase() || 'pending'}`}>
                                            {b.status || 'Pending'}
                                        </span>
                                    </td>
                                    <td className="text-right">
                                        <div className="admin-action-btns">
                                            {b.status !== 'Approved' && (
                                                <button className="btn-icon approve" onClick={() => updateStatus(b._id, 'Approved')} title="Approve">✓</button>
                                            )}
                                            {b.status !== 'Rejected' && (
                                                <button className="btn-icon reject" onClick={() => updateStatus(b._id, 'Rejected')} title="Reject">✕</button>
                                            )}
                                            <button className="btn-icon delete" onClick={() => handleDelete(b._id)} title="Delete">🗑</button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {bookings.length === 0 && (
                                <tr>
                                    <td colSpan="6" className="admin-table-empty">No test drive bookings found.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
}
