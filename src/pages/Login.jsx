import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Eye, EyeOff } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleLogin = async () => {
        if (!email || !password) {
            alert("Please fill all fields");
            return;
        }

        const result = await login(email, password);

        if (result.success) {
            navigate('/');
        } else {
            alert(result.message || "Login failed. Check your credentials.");
        }
    };

    return (
        <div className="auth-container"
            style={{ backgroundImage: 'url("https://mir-s3-cdn-cf.behance.net/project_modules/source/46f37945885079.584030cfd603d.gif")' }}>

            <Link to="/" style={{ position: 'absolute', top: 20, left: 20, color: '#d4af37', textDecoration: 'none', fontSize: '1.2rem' }}>
                &larr; Back to Home
            </Link>

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                className="auth-card"
            >
                <h3 className="text-center mb-4" style={{ color: '#d4af37', letterSpacing: '3px' }}>
                    Member Login
                </h3>

                <div className="form-floating mb-3">
                    <input
                        type="email"
                        className="form-control form-control-dark"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
                    />
                    <label className="text-muted">Email Address</label>
                </div>

                <div className="form-floating mb-3 position-relative">
                    <input
                        type={showPassword ? "text" : "password"}
                        className="form-control form-control-dark"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
                    />
                    <label className="text-muted">Password</label>
                    <div
                        className="eye position-absolute top-50 end-0 translate-middle-y me-3"
                        style={{ cursor: 'pointer', color: '#d4af37' }}
                        onClick={() => setShowPassword(!showPassword)}
                    >
                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </div>
                </div>

                <button className="btn btn-gold w-100" onClick={handleLogin}>
                    Login
                </button>

                <p className="text-center mt-3 text-white">
                    New here? <Link to="/signup" style={{ color: '#d4af37' }}>Create Account</Link>
                </p>
            </motion.div>
        </div>
    );
}
