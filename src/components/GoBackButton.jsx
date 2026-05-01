import { useNavigate, useLocation } from 'react-router-dom';
import './GoBackButton.css';

export default function GoBackButton() {
    const navigate = useNavigate();
    const location = useLocation();

    // Do not show the go back button on the Home page, Login, Signup, or Admin Dashboard
    const hiddenRoutes = ['/', '/login', '/signup', '/admin'];

    // Also hide if the pathname exactly matches one of the hidden routes
    if (hiddenRoutes.includes(location.pathname)) {
        return null;
    }

    return (
        <button 
            className="global-go-back" 
            onClick={() => navigate(-1)}
            aria-label="Go Back"
            title="Go Back"
        >
            <span className="go-back-icon">&#8592;</span> 
        </button>
    );
}
