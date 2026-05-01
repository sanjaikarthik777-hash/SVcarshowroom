import { useState } from 'react';
import { Link } from 'react-router-dom';

const FooterLogo = () => (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <circle cx="16" cy="16" r="15" stroke="#d4af37" strokeWidth="1.5" />
        <path d="M7 18L10 13H22L25 18" stroke="#d4af37" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="11" cy="20" r="2" fill="#d4af37" />
        <circle cx="21" cy="20" r="2" fill="#d4af37" />
        <path d="M7 18H25" stroke="#d4af37" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
);

export default function Footer() {
    const [email, setEmail] = useState('');
    const [subscribed, setSubscribed] = useState(false);

    const handleSubscribe = (e) => {
        e.preventDefault();
        if (email.trim()) {
            setSubscribed(true);
            setEmail('');
        }
    };

    const year = new Date().getFullYear();

    return (
        <footer style={{
            background: 'linear-gradient(180deg, #07090f 0%, #0a0d16 100%)',
            borderTop: '1px solid rgba(212,175,55,0.15)',
            fontFamily: "'Inter', sans-serif",
            color: '#94a3b8',
        }}>
            {/* Top accent line */}
            <div style={{ height: '2px', background: 'linear-gradient(90deg, transparent, #d4af37, transparent)' }} />

            {/* Newsletter Banner */}
            <div style={{
                background: 'linear-gradient(135deg, rgba(212,175,55,0.06), rgba(212,175,55,0.02))',
                borderBottom: '1px solid rgba(212,175,55,0.08)',
                padding: '36px 40px',
            }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '24px' }}>
                    <div>
                        <div style={{ color: '#d4af37', fontSize: '0.75rem', letterSpacing: '3px', textTransform: 'uppercase', marginBottom: '6px' }}>
                            Exclusive Access
                        </div>
                        <h3 style={{ color: '#fff', fontSize: '1.35rem', fontWeight: 700, margin: 0, letterSpacing: '0.5px' }}>
                            Join the Inner Circle
                        </h3>
                        <p style={{ margin: '4px 0 0', fontSize: '0.875rem', color: '#64748b' }}>
                            Private previews, launch events & curated offers — delivered discreetly.
                        </p>
                    </div>
                    {!subscribed ? (
                        <form onSubmit={handleSubscribe} style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                            <input
                                type="email"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                placeholder="Your email address"
                                required
                                style={{
                                    padding: '11px 18px', borderRadius: '8px',
                                    background: 'rgba(255,255,255,0.05)',
                                    border: '1px solid rgba(212,175,55,0.25)',
                                    color: '#e2e8f0', fontSize: '0.875rem',
                                    outline: 'none', minWidth: '240px',
                                    fontFamily: 'inherit'
                                }}
                            />
                            <button type="submit" style={{
                                padding: '11px 24px', borderRadius: '8px',
                                background: 'linear-gradient(135deg, #d4af37, #b8962a)',
                                border: 'none', color: '#0a0d16',
                                fontWeight: 700, fontSize: '0.875rem',
                                cursor: 'pointer', letterSpacing: '0.5px',
                                fontFamily: 'inherit'
                            }}>
                                Subscribe
                            </button>
                        </form>
                    ) : (
                        <div style={{
                            padding: '12px 24px', borderRadius: '8px',
                            background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.3)',
                            color: '#22c55e', fontWeight: 600, fontSize: '0.9rem'
                        }}>
                            ✓ You're on the list. Welcome to the inner circle.
                        </div>
                    )}
                </div>
            </div>

            {/* Main Footer Grid */}
            <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '60px 40px 40px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1.4fr', gap: '48px', flexWrap: 'wrap' }}>

                    {/* Brand Column */}
                    <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '18px' }}>
                            <FooterLogo />
                            <div>
                                <div style={{ color: '#fff', fontWeight: 800, fontSize: '1.05rem', letterSpacing: '2.5px', textTransform: 'uppercase' }}>
                                    SV
                                </div>
                                <div style={{ color: '#d4af37', fontSize: '0.65rem', letterSpacing: '2px', textTransform: 'uppercase' }}>
                                    Luxury Automotive
                                </div>
                            </div>
                        </div>
                        <p style={{ fontSize: '0.875rem', lineHeight: 1.7, color: '#64748b', marginBottom: '24px', maxWidth: '280px' }}>
                            Where the world's most discerning collectors find their next statement vehicle. Curated for excellence since 2018.
                        </p>

                        {/* Award Badges */}
                        <div style={{ display: 'flex', gap: '10px', marginBottom: '24px', flexWrap: 'wrap' }}>
                            {['🏆 Best Showroom 2024', '⭐ 5-Star Rated', '🔒 Certified Dealer'].map((badge, i) => (
                                <span key={i} style={{
                                    padding: '5px 10px', borderRadius: '20px',
                                    background: 'rgba(212,175,55,0.08)', border: '1px solid rgba(212,175,55,0.2)',
                                    color: '#d4af37', fontSize: '0.7rem', fontWeight: 600, letterSpacing: '0.3px'
                                }}>
                                    {badge}
                                </span>
                            ))}
                        </div>

                        {/* Social Icons */}
                        <div style={{ display: 'flex', gap: '10px' }}>
                            {[
                                {
                                    label: 'Instagram', href: 'https://instagram.com',
                                    path: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z'
                                },
                                {
                                    label: 'X / Twitter', href: 'https://x.com',
                                    path: 'M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z'
                                },
                                {
                                    label: 'YouTube', href: 'https://youtube.com',
                                    path: 'M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z'
                                },
                                {
                                    label: 'LinkedIn', href: 'https://linkedin.com',
                                    path: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z'
                                },
                            ].map(social => (
                                <a key={social.label} href={social.href} target="_blank" rel="noopener noreferrer"
                                    aria-label={social.label}
                                    style={{
                                        width: '36px', height: '36px', borderRadius: '8px',
                                        background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        color: '#64748b', transition: 'all 0.2s', textDecoration: 'none'
                                    }}
                                    onMouseEnter={e => {
                                        e.currentTarget.style.background = 'rgba(212,175,55,0.15)';
                                        e.currentTarget.style.borderColor = 'rgba(212,175,55,0.4)';
                                        e.currentTarget.style.color = '#d4af37';
                                    }}
                                    onMouseLeave={e => {
                                        e.currentTarget.style.background = 'rgba(255,255,255,0.04)';
                                        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)';
                                        e.currentTarget.style.color = '#64748b';
                                    }}
                                >
                                    <svg width="15" height="15" fill="currentColor" viewBox="0 0 24 24">
                                        <path d={social.path} />
                                    </svg>
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 style={{ color: '#fff', fontSize: '0.8rem', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '20px', paddingBottom: '10px', borderBottom: '1px solid rgba(212,175,55,0.15)' }}>
                            Explore
                        </h4>
                        <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
                            {[
                                { label: 'Home', to: '/' },
                                { label: 'Our Collection', to: '/#cars' },
                                { label: 'Premium Sales', to: '/premium-sales' },
                                { label: 'Bespoke Orders', to: '/bespoke-orders' },
                                { label: 'Concierge', to: '/concierge-support' },
                                { label: 'About Us', to: '/about' },
                            ].map(link => (
                                <li key={link.label}>
                                    <Link to={link.to} style={{ color: '#64748b', textDecoration: 'none', fontSize: '0.875rem', transition: 'color 0.2s', display: 'flex', alignItems: 'center', gap: '6px' }}
                                        onMouseEnter={e => e.currentTarget.style.color = '#d4af37'}
                                        onMouseLeave={e => e.currentTarget.style.color = '#64748b'}
                                    >
                                        <span style={{ color: '#d4af37', fontSize: '0.7rem' }}>›</span>
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Services */}
                    <div>
                        <h4 style={{ color: '#fff', fontSize: '0.8rem', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '20px', paddingBottom: '10px', borderBottom: '1px solid rgba(212,175,55,0.15)' }}>
                            Services
                        </h4>
                        <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
                            {['Test Drive Booking', 'White-Glove Delivery', 'Finance & Leasing', 'Trade-In Valuation', 'Extended Warranty', 'International Sourcing'].map(item => (
                                <li key={item}>
                                    <a href="#" style={{ color: '#64748b', textDecoration: 'none', fontSize: '0.875rem', transition: 'color 0.2s', display: 'flex', alignItems: 'center', gap: '6px' }}
                                        onMouseEnter={e => e.currentTarget.style.color = '#d4af37'}
                                        onMouseLeave={e => e.currentTarget.style.color = '#64748b'}
                                    >
                                        <span style={{ color: '#d4af37', fontSize: '0.7rem' }}>›</span>
                                        {item}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 style={{ color: '#fff', fontSize: '0.8rem', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '20px', paddingBottom: '10px', borderBottom: '1px solid rgba(212,175,55,0.15)' }}>
                            Contact Us
                        </h4>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                            {[
                                { icon: '📍', label: 'Showroom', value: 'Luxury Avenue, Mumbai, India' },
                                { icon: '📞', label: 'Phone', value: '+91 98745 61230', href: 'tel:9874561230' },
                                { icon: '✉️', label: 'Email', value: 'carshowroom@gmail.com', href: 'mailto:carshowroom@gmail.com' },
                                { icon: '🕐', label: 'Hours', value: 'Mon–Sun · 9:00 AM – 9:00 PM' },
                            ].map(item => (
                                <div key={item.label} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                                    <div style={{
                                        width: '34px', height: '34px', borderRadius: '8px', flexShrink: 0,
                                        background: 'rgba(212,175,55,0.07)', border: '1px solid rgba(212,175,55,0.15)',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.85rem'
                                    }}>
                                        {item.icon}
                                    </div>
                                    <div>
                                        <div style={{ fontSize: '0.7rem', color: '#475569', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '2px' }}>{item.label}</div>
                                        {item.href ? (
                                            <a href={item.href} style={{ color: '#94a3b8', fontSize: '0.85rem', textDecoration: 'none', transition: 'color 0.2s' }}
                                                onMouseEnter={e => e.currentTarget.style.color = '#d4af37'}
                                                onMouseLeave={e => e.currentTarget.style.color = '#94a3b8'}
                                            >{item.value}</a>
                                        ) : (
                                            <span style={{ color: '#94a3b8', fontSize: '0.85rem' }}>{item.value}</span>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div style={{
                borderTop: '1px solid rgba(255,255,255,0.06)',
                padding: '20px 40px',
            }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
                    <span style={{ fontSize: '0.8rem', color: '#334155' }}>
                        © {year} <span style={{ color: '#d4af37' }}>Car Showroom Management</span> · All Rights Reserved
                    </span>
                    <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
                        {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map(item => (
                            <a key={item} href="#" style={{ color: '#334155', fontSize: '0.8rem', textDecoration: 'none', transition: 'color 0.2s' }}
                                onMouseEnter={e => e.currentTarget.style.color = '#d4af37'}
                                onMouseLeave={e => e.currentTarget.style.color = '#334155'}
                            >{item}</a>
                        ))}
                    </div>
                    <span style={{ fontSize: '0.75rem', color: '#1e293b' }}>
                        Crafted with ♥ by Sanjai
                    </span>
                </div>
            </div>
        </footer>
    );
}
