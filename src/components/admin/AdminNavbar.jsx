import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function AdminNavbar({ onToggleSidebar }) {
    const { logout, user } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = () => {
        logout();
        navigate('/admin/login');
    };

    // Simple path-to-title converter
    const getPageTitle = () => {
        const path = location.pathname;
        if (path === '/admin') return 'Dashboard Overview';
        if (path.includes('bookings')) return 'Test Drive Bookings';
        if (path.includes('cars')) return 'Cars Management';
        if (path.includes('customers')) return 'Customers';
        if (path.includes('analytics')) return 'Analytics';
        return 'Admin Portal';
    };

    return (
        <header className="admin-navbar">
            <div className="admin-navbar-left">
                <button className="admin-mobile-toggle" onClick={onToggleSidebar}>
                    <i className="bi bi-list"></i>
                </button>
                <h1 className="admin-page-title">{getPageTitle()}</h1>
            </div>
            <div className="admin-navbar-right">
                <div className="admin-profile">
                    <div className="admin-avatar">A</div>
                    <div className="admin-user-info">
                        <span className="admin-name">{user?.name || 'Admin'}</span>
                        <span className="admin-role">Sanjai</span>
                    </div>
                </div>
                <button className="admin-logout-btn" onClick={handleLogout}>
                    Logout
                </button>
            </div>
        </header>
    );
}
