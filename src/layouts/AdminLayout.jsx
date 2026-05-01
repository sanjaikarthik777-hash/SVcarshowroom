import { useState } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import AdminSidebar from '../components/admin/AdminSidebar';
import AdminNavbar from '../components/admin/AdminNavbar';

export default function AdminLayout() {
    const { user, isAdmin } = useAuth();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    if (!user) {
        return <Navigate to="/admin/login" replace />;
    }

    if (!isAdmin) {
        return <Navigate to="/" replace />;
    }

    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
    const closeSidebar = () => setIsSidebarOpen(false);

    return (
        <div className={`admin-layout ${isSidebarOpen ? 'sidebar-open' : ''}`}>
            <AdminSidebar isOpen={isSidebarOpen} onClose={closeSidebar} />
            <div className="admin-main-content">
                <AdminNavbar onToggleSidebar={toggleSidebar} />
                <div className="admin-page-container">
                    <Outlet />
                </div>
            </div>
        </div>
    );
}
