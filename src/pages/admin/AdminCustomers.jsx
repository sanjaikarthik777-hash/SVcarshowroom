import { useState, useEffect } from 'react';
import { API_BASE } from '../../api';

export default function AdminCustomers() {
    const [customers, setCustomers] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchCustomers();
    }, []);

    const fetchCustomers = async () => {
        setLoading(true);
        try {
            const res = await fetch(`${API_BASE}/bookings`);
            if (!res.ok) throw new Error();
            const bookings = await res.json();

            // Aggregate unique customers from bookings
            const uniqueMap = new Map();
            bookings.forEach(b => {
                if (!uniqueMap.has(b.email)) {
                    uniqueMap.set(b.email, {
                        name: b.name,
                        email: b.email,
                        phone: b.phone,
                        joinDate: new Date(b.createdAt).toLocaleDateString(),
                        totalBookings: 1
                    });
                } else {
                    uniqueMap.get(b.email).totalBookings += 1;
                }
            });

            setCustomers(Array.from(uniqueMap.values()));
        } catch {
            // Fallback to localStorage
            const storedBookings = JSON.parse(localStorage.getItem('bookings')) || [];
            const uniqueMap = new Map();
            storedBookings.forEach(b => {
                if (!uniqueMap.has(b.email)) {
                    uniqueMap.set(b.email, {
                        name: b.name, email: b.email, phone: b.phone,
                        joinDate: b.datetime?.split(' ')[0] || new Date().toLocaleDateString(),
                        totalBookings: 1
                    });
                } else {
                    uniqueMap.get(b.email).totalBookings += 1;
                }
            });
            setCustomers(Array.from(uniqueMap.values()));
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="admin-page-content">
            <div className="admin-page-header">
                <div>
                    <h2>Customer Directory</h2>
                    <p className="admin-subtitle">View all registered customers and test drive clients.</p>
                </div>
                <div className="admin-header-actions">
                    <span className="admin-badge accent">Total: {customers.length}</span>
                </div>
            </div>

            <div className="admin-table-wrap mt-4">
                {loading ? (
                    <p className="text-center text-muted py-4">Loading customers...</p>
                ) : (
                    <table className="admin-table">
                        <thead>
                            <tr>
                                <th>Customer Name</th>
                                <th>Email Address</th>
                                <th>Phone Number</th>
                                <th>First Booking</th>
                                <th className="text-center">Total Bookings</th>
                            </tr>
                        </thead>
                        <tbody>
                            {customers.map((c, i) => (
                                <tr key={i}>
                                    <td>
                                        <div className="admin-customer-cell">
                                            <div className="admin-avatar-small">{c.name.charAt(0).toUpperCase()}</div>
                                            <span className="fw-600">{c.name}</span>
                                        </div>
                                    </td>
                                    <td>{c.email}</td>
                                    <td>{c.phone}</td>
                                    <td>{c.joinDate}</td>
                                    <td className="text-center">
                                        <span className="admin-badge subtle">{c.totalBookings}</span>
                                    </td>
                                </tr>
                            ))}
                            {customers.length === 0 && (
                                <tr>
                                    <td colSpan="5" className="admin-table-empty">No customers found.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
}
