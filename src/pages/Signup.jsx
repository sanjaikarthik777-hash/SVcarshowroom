import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';

export default function Signup() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const { register } = useAuth();
    const navigate = useNavigate();

    const handleSignup = async () => {
        setError('');
        if (!name || !email || !password) {
            setError('Please fill all fields.');
            return;
        }
        if (password.length < 6) {
            setError('Password must be at least 6 characters.');
            return;
        }

        setLoading(true);
        const result = await register(name, email, password);
        setLoading(false);

        if (result.success) {
            alert('Account created successfully! Please login.');
            navigate('/login');
        } else {
            setError(result.message || 'Registration failed.');
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
                <h3 className="text-center mb-4" style={{ color: '#d4af37', letterSpacing: '3px' }}>Create Account</h3>

                {error && (
                    <div className="alert alert-danger py-2 text-center" style={{ fontSize: '0.9rem' }}>{error}</div>
                )}

                <input
                    className="form-control form-control-dark mb-3"
                    placeholder="Full Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSignup()}
                />
                <input
                    className="form-control form-control-dark mb-3"
                    placeholder="Email Address"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSignup()}
                />
                <input
                    className="form-control form-control-dark mb-3"
                    type="password"
                    placeholder="Password (min 6 chars)"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSignup()}
                />
                <button className="btn btn-gold w-100" onClick={handleSignup} disabled={loading}>
                    {loading ? 'Creating Account...' : 'Sign Up'}
                </button>

                <p className="text-center mt-3 text-white">
                    Already have an account? <Link to="/login" style={{ color: '#d4af37' }}>Login</Link>
                </p>
            </motion.div>
        </div>
    );
}
