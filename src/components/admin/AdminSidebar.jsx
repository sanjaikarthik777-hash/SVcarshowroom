import { Link, useLocation } from 'react-router-dom';

export default function AdminSidebar({ isOpen, onClose }) {
    const location = useLocation();

    const navItems = [
        { path: '/admin', label: 'Dashboard', icon: '📊' },
        { path: '/admin/bookings', label: 'Bookings', icon: '🗓️' },
        { path: '/admin/cars', label: 'Cars Management', icon: '🚗' },
        { path: '/admin/customers', label: 'Customers', icon: '👥' },
        { path: '/admin/analytics', label: 'Analytics', icon: '📈' },
    ];

    return (
        <>
            {/* Mobile Overlay */}
            {isOpen && <div className="admin-sidebar-overlay" onClick={onClose} />}
            
            <aside className={`admin-sidebar ${isOpen ? 'open' : ''}`}>
                <div className="admin-brand">
                    <h2>CAR SHOWROOM<span className="gold-dot">.</span></h2>
                    <button className="admin-sidebar-close" onClick={onClose}>&times;</button>
                </div>

                <nav className="admin-nav">
                    {navItems.map((item) => {
                        const isActive = item.path === '/admin'
                            ? location.pathname === '/admin'
                            : location.pathname.startsWith(item.path);

                        return (
                            <Link
                                key={item.path}
                                to={item.path}
                                className={`admin-nav-item ${isActive ? 'active' : ''}`}
                                onClick={() => {
                                    if (window.innerWidth <= 992) onClose();
                                }}
                            >
                                <span className="admin-nav-icon">{item.icon}</span>
                                <span className="admin-nav-label">{item.label}</span>
                            </Link>
                        )
                    })}
                </nav>
            </aside>
        </>
    );
}
