import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Eye, EyeOff, ShieldCheck, Lock } from 'lucide-react';
import { motion } from 'framer-motion';

export default function AdminLogin() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleLogin = async () => {
        if (!email || !password) {
            alert("Please provide administrator credentials.");
            return;
        }

        setLoading(true);
        const result = await login(email, password);
        setLoading(false);

        if (result.success) {
            if (result.isAdmin) {
                navigate('/admin');
            } else {
                // If a non-admin tries to log in here, send them to home
                alert("This portal is restricted to administrators.");
                navigate('/');
            }
        } else {
            alert(result.message || "Authentication failed. Access denied.");
        }
    };

    return (
        <div className="auth-container" 
             style={{ 
                 background: 'radial-gradient(circle at center, #1a1a1a 0%, #000000 100%)',
                 display: 'flex',
                 alignItems: 'center',
                 justifyContent: 'center',
                 minHeight: '100vh',
                 position: 'relative',
                 overflow: 'hidden'
             }}>
            
            {/* Ambient Background Elements */}
            <div style={{
                position: 'absolute',
                width: '150%',
                height: '150%',
                background: 'conic-gradient(from 180deg at 50% 50%, #d4af3722 0deg, transparent 90deg, #d4af3711 180deg, transparent 270deg, #d4af3722 360deg)',
                animation: 'spin 20s linear infinite',
                zIndex: 0
            }} />

            <Link to="/" style={{ position: 'absolute', top: 20, left: 20, color: '#d4af37', textDecoration: 'none', fontSize: '1rem', zIndex: 10, display: 'flex', alignItems: 'center', gap: '8px' }}>
                <ShieldCheck size={18} /> Exit Portal
            </Link>

            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="auth-card"
                style={{ 
                    zIndex: 1, 
                    maxWidth: '400px', 
                    width: '90%', 
                    background: 'rgba(255, 255, 255, 0.03)',
                    backdropFilter: 'blur(15px)',
                    border: '1px solid rgba(212, 175, 55, 0.2)',
                    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 30px rgba(212, 175, 55, 0.1)'
                }}
            >
                <div className="text-center mb-5">
                    <div style={{ 
                        width: '70px', 
                        height: '70px', 
                        background: 'linear-gradient(135deg, #d4af37 0%, #aa8a2e 100%)',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: '0 auto 20px',
                        boxShadow: '0 0 20px rgba(212, 175, 55, 0.3)'
                    }}>
                        <Lock color="#000" size={32} />
                    </div>
                    <h2 style={{ color: '#fff', fontSize: '1.8rem', fontWeight: '700', letterSpacing: '2px', marginBottom: '8px' }}>ADMIN PORTAL</h2>
                    <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Authorized Access Only</p>
                </div>

                <div className="form-floating mb-3">
                    <input
                        type="email"
                        className="form-control form-control-dark"
                        placeholder="Admin Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
                        style={{ background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)' }}
                    />
                    <label className="text-muted">Administrator ID</label>
                </div>

                <div className="form-floating mb-4 position-relative">
                    <input
                        type={showPassword ? "text" : "password"}
                        className="form-control form-control-dark"
                        placeholder="Security Key"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
                        style={{ background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)' }}
                    />
                    <label className="text-muted">Security Key</label>
                    <div
                        className="eye position-absolute top-50 end-0 translate-middle-y me-3"
                        style={{ cursor: 'pointer', color: '#d4af37' }}
                        onClick={() => setShowPassword(!showPassword)}
                    >
                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </div>
                </div>

                <button 
                    className="btn btn-gold w-100" 
                    onClick={handleLogin}
                    disabled={loading}
                    style={{ 
                        padding: '15px', 
                        fontSize: '1rem', 
                        fontWeight: '700', 
                        letterSpacing: '2px',
                        background: 'linear-gradient(135deg, #d4af37 0%, #aa8a2e 100%)',
                        border: 'none',
                        transition: 'all 0.3s ease'
                    }}
                >
                    {loading ? 'AUTHENTICATING...' : 'AUTHORIZE ACCESS'}
                </button>

                <div className="text-center mt-4">
                    <Link to="/login" style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.75rem', textDecoration: 'none', transition: 'color 0.3s' }} onMouseOver={(e) => e.target.style.color = '#d4af37'} onMouseOut={(e) => e.target.style.color = 'rgba(255,255,255,0.3)'}>
                        Member Login Redirect
                    </Link>
                </div>
            </motion.div>

            <style>{`
                @keyframes spin {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
                .form-control-dark:focus {
                    background: rgba(0,0,0,0.5) !important;
                    border-color: #d4af37 !important;
                    box-shadow: 0 0 10px rgba(212, 175, 55, 0.2) !important;
                }
            `}</style>
        </div>
    );
}
