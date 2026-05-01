import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AdminStatsCards from '../../components/admin/AdminStatsCards';
import { API_BASE } from '../../api';

export default function AdminDashboard() {
    const [stats, setStats] = useState({
        totalBookings: 0,
        approvedBookings: 0,
        totalCars: 0,
        totalCustomers: 0
    });

    const [recentBookings, setRecentBookings] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchDashboardData();
    }, []);

    const fetchDashboardData = async () => {
        setLoading(true);
        try {
            // Fetch bookings and cars in parallel
            const [bookingsRes, carsRes] = await Promise.all([
                fetch(`${API_BASE}/bookings`),
                fetch(`${API_BASE}/cars`)
            ]);

            const bookings = await bookingsRes.json();
            const cars = await carsRes.json();

            // Calculate unique customers based on email
            const uniqueEmails = new Set(bookings.map(b => b.email));

            setStats({
                totalBookings: bookings.length,
                approvedBookings: bookings.filter(b => b.status === 'Approved').length,
                totalCars: cars.length,
                totalCustomers: uniqueEmails.size
            });

            // Get 5 most recent bookings
            setRecentBookings(bookings.slice(0, 5));
        } catch (err) {
            console.error('Error fetching dashboard data:', err);
        } finally {
            setLoading(false);
        }
    };

    const updateStatus = async (id, newStatus) => {
        try {
            const res = await fetch(`${API_BASE}/bookings/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status: newStatus })
            });

            if (!res.ok) throw new Error();
            const updated = await res.json();

            // Update local state for recent bookings
            setRecentBookings(prev => prev.map(b => b._id === id ? updated : b));

            // Update stats
            if (newStatus === 'Approved') {
                setStats(prev => ({
                    ...prev,
                    approvedBookings: prev.approvedBookings + 1
                }));
            }
        } catch (err) {
            console.error('Error updating status:', err);
            alert('Error updating status. Is the server running?');
        }
    };

    return (
        <div className="admin-dashboard-page">
            <AdminStatsCards stats={stats} />

            <div className="admin-dash-section mt-4">
                <div className="admin-dash-header">
                    <h2>Recent Test Drives</h2>
                    <Link to="/admin/bookings" className="admin-btn-outline btn-gold">View All</Link>
                </div>

                <div className="admin-table-wrap">
                    <table className="admin-table">
                        <thead>
                            <tr>
                                <th>Customer Name</th>
                                <th>Car Selected</th>
                                <th>Date & Time</th>
                                <th>Status</th>
                                <th className="text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                <tr>
                                    <td colSpan="5" className="text-center text-muted py-5">
                                        <div className="spinner-border spinner-border-sm me-2 gold-text"></div>
                                        Loading recent data...
                                    </td>
                                </tr>
                            ) : recentBookings.length > 0 ? (
                                recentBookings.map((b, i) => (
                                    <tr key={b._id || i}>
                                        <td>
                                            <div className="admin-td-user">
                                                <span className="fw-600">{b.name}</span>
                                                <span className="text-muted fs-small">{b.email}</span>
                                            </div>
                                        </td>
                                        <td className="fw-500">{b.car}</td>
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
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5" className="admin-table-empty">No recent bookings found.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
