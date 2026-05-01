import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { AccessibilityProvider } from './context/AccessibilityContext';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import PremiumSales from './pages/services/PremiumSales';
import BespokeOrders from './pages/services/BespokeOrders';
import ConciergeSupport from './pages/services/ConciergeSupport';
import TestDriveBooking from './pages/services/TestDriveBooking';
import VipDelivery from './pages/services/VipDelivery';
import MaintenanceScheduling from './pages/services/MaintenanceScheduling';
import ExtendedWarranty from './pages/services/ExtendedWarranty';
import InternationalSourcing from './pages/services/InternationalSourcing';
import DocumentationSupport from './pages/services/DocumentationSupport';
import BookingPage from './pages/BookingPage';
import CarCategory from './pages/cars/CarCategory';
import EmiCalculator from './pages/finance/EmiCalculator';
import LoanServices from './pages/finance/LoanServices';
import FinanceApplication from './pages/finance/FinanceApplication';
import LoanServiceApplication from './pages/finance/LoanServiceApplication';
import AdminLayout from './layouts/AdminLayout';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminBookings from './pages/admin/AdminBookings';
import AdminCars from './pages/admin/AdminCars';
import AdminCustomers from './pages/admin/AdminCustomers';
import AdminAnalytics from './pages/admin/AdminAnalytics';
import AdminLogin from './pages/admin/AdminLogin';
import About from './pages/About';
import Dealerships from './pages/Dealerships';
import Careers from './pages/Careers';
import ApplicationForm from './pages/ApplicationForm';
import BookVisit from './pages/BookVisit';
import './index.css';
import './concierge.css';
import './about.css';
import GoBackButton from './components/GoBackButton';
import VenomBackground from './components/VenomBackground';

function App() {
    return (
        <Router>
            <AccessibilityProvider>
                <VenomBackground />
                <AuthProvider>
                    <GoBackButton />
                <Routes>
                    {/* Public User Routes */}
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />

                    {/* Cars Categories dynamically */}
                    <Route path="/cars/:categoryId" element={<CarCategory />} />

                    <Route path="/about" element={<About />} />
                    <Route path="/dealerships" element={<Dealerships />} />
                    <Route path="/careers" element={<Careers />} />
                    <Route path="/apply/:jobId?" element={<ApplicationForm />} />
                    <Route path="/book-visit/:location?" element={<BookVisit />} />
                    <Route path="/premium-sales" element={<PremiumSales />} />
                    <Route path="/bespoke-orders" element={<BespokeOrders />} />
                    <Route path="/concierge-support" element={<ConciergeSupport />} />
                    <Route path="/test-drive-booking" element={<TestDriveBooking />} />
                    <Route path="/vip-delivery" element={<VipDelivery />} />
                    <Route path="/maintenance-scheduling" element={<MaintenanceScheduling />} />
                    <Route path="/extended-warranty" element={<ExtendedWarranty />} />
                    <Route path="/international-sourcing" element={<InternationalSourcing />} />
                    <Route path="/documentation-support" element={<DocumentationSupport />} />
                    <Route path="/booking/:carId" element={<BookingPage />} />
                    
                    {/* Finance & Loans */}
                    <Route path="/finance/emi-calculator" element={<EmiCalculator />} />
                    <Route path="/finance/loan-services" element={<LoanServices />} />
                    <Route path="/finance/apply" element={<FinanceApplication />} />
                    <Route path="/finance/service-apply" element={<LoanServiceApplication />} />
                    
                    {/* Admin Panel Routes */}
                    <Route path="/admin/login" element={<AdminLogin />} />
                    <Route path="/admin" element={<AdminLayout />}>
                        <Route index element={<AdminDashboard />} />
                        <Route path="bookings" element={<AdminBookings />} />
                        <Route path="cars" element={<AdminCars />} />
                        <Route path="customers" element={<AdminCustomers />} />
                        <Route path="analytics" element={<AdminAnalytics />} />
                    </Route>

                    {/* Catch all to redirect old admin links */}
                    <Route path="/admin-dashboard" element={<Navigate to="/admin" replace />} />
                </Routes>
            </AuthProvider>
            </AccessibilityProvider>
        </Router>
    );
}

export default App;
