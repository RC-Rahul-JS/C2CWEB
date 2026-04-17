import React, { useState, useEffect } from 'react';
import footerLogo from '../../assets/footer-img.png';
import { useNavigate } from 'react-router-dom';

const Footer = () => {
    const primaryColor = '#002570';
    const secondaryColor = '#007eff';
    const navigate = useNavigate();

    // State to track mobile view
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 768);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const menuItems = [
        { name: 'Home', path: '/' },
        { name: 'About', path: '/about' },
        { name: 'Services', path: '/services' },
        { name: 'Contact', path: '/contact' },
    ];

    const linkItems = [
        { name: 'Privacy Policy', path: '/privacy_policy' },
        { name: 'Terms & Conditions', path: '/terms' },
    ];

    return (
        <div
            style={{
                backgroundColor: primaryColor,
                color: 'white',
                padding: isMobile ? '40px 20px' : '60px 40px 40px',
                width: '100%',
                boxSizing: 'border-box',
                fontFamily: 'sans-serif'
            }}
        >
            <div
                style={{
                    display: 'flex',
                    flexDirection: isMobile ? 'column' : 'row',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    gap: isMobile ? '30px' : '40px',
                    width: '100%',
                    maxWidth: '1200px', // Center content on large screens
                    margin: '0 auto',
                    flexWrap: 'wrap',
                }}
            >
                {/* About Column */}
                <div style={{ flex: isMobile ? '1 1 100%' : '1.5', minWidth: '250px', textAlign: isMobile ? 'center' : 'left' }}>
                    <img 
                        src={footerLogo} 
                        alt="Logo" 
                        style={{ 
                            filter: 'brightness(1)', 
                            marginBottom: '20px', 
                            maxWidth: '180px', 
                            height: 'auto',
                            display: isMobile ? 'block' : 'inline-block',
                            margin: isMobile ? '0 auto 20px' : '0 0 20px'
                        }} 
                    />
                    <p style={{ fontSize: '14px', lineHeight: '22px', opacity: 0.8 }}>
                        Completely promote interdependent systems for latest update news this Medical.
                    </p>
                </div>

                {/* Company Column */}
                <div style={{ flex: 1, minWidth: isMobile ? '100%' : '150px', textAlign: isMobile ? 'center' : 'left' }}>
                    <h4 style={{ fontSize: '18px', marginBottom: '15px', color: secondaryColor }}>Company</h4>
                    <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                        {menuItems.map((item) => (
                            <li key={item.name} style={{ marginBottom: '10px' }}>
                                <span
                                    onClick={() => navigate(item.path)}
                                    style={{
                                        color: 'white',
                                        transition: '0.3s',
                                        cursor: 'pointer',
                                        fontSize: '15px',
                                        display: 'inline-block'
                                    }}
                                    onMouseOver={(e) => (e.target.style.color = secondaryColor)}
                                    onMouseOut={(e) => (e.target.style.color = 'white')}
                                >
                                    {item.name}
                                </span>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Useful Links Column */}
                <div style={{ flex: 1, minWidth: isMobile ? '100%' : '150px', textAlign: isMobile ? 'center' : 'left' }}>
                    <h4 style={{ fontSize: '18px', marginBottom: '15px', color: secondaryColor }}>Useful Links</h4>
                    <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                        {linkItems.map((item) => (
                            <li key={item.name} style={{ marginBottom: '10px' }}>
                                <span
                                    onClick={() => navigate(item.path)}
                                    style={{
                                        color: 'white',
                                        transition: '0.3s',
                                        fontSize: '15px',
                                        cursor: 'pointer',
                                        display: 'inline-block'
                                    }}
                                    onMouseOver={(e) => (e.target.style.color = secondaryColor)}
                                    onMouseOut={(e) => (e.target.style.color = 'white')}
                                >
                                    {item.name}
                                </span>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Contacts Column */}
                <div style={{ flex: 1, minWidth: isMobile ? '100%' : '200px', textAlign: isMobile ? 'center' : 'left' }}>
                    <h4 style={{ fontSize: '18px', marginBottom: '15px', color: secondaryColor }}>Contacts</h4>
                    <p style={{ margin: '0 0 10px', fontSize: '14px', lineHeight: '20px' }}>
                        Shop No-28, ModelTown, Phase-3, Bathinda-151001, Punjab, India
                    </p>
                    <p style={{ margin: '0 0 10px', fontSize: '14px' }}>
                        <strong>Email:</strong> <span style={{ color: secondaryColor }}>care@care2connect.in</span>
                    </p>
                    <p style={{ margin: 0, fontSize: '14px' }}>
                        <strong>Phone:</strong> +91 62655 78975
                    </p>
                </div>
            </div>

            {/* Bottom Bar */}
            <div
                style={{
                    borderTop: '1px solid rgba(255,255,255,0.1)',
                    marginTop: '40px',
                    paddingTop: '20px',
                    display: 'flex',
                    flexDirection: isMobile ? 'column' : 'row',
                    justifyContent: isMobile ? 'center' : 'space-between',
                    alignItems: 'center',
                    maxWidth: '1200px',
                    margin: '40px auto 0',
                    textAlign: 'center',
                    fontSize: '13px',
                    gap: '15px'
                }}
            >
                <p style={{ margin: 0, opacity: 0.7 }}>
                    © {new Date().getFullYear()} Care2Connect. All Rights Reserved.
                </p>
                
                <p style={{ margin: 0 }}>
                    Managed by{' '}
                    <a
                        href="https://www.duniyape.in"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ color: 'white', textDecoration: 'underline' }}
                        onMouseOver={(e) => (e.target.style.color = secondaryColor)}
                        onMouseOut={(e) => (e.target.style.color = 'white')}
                    >
                        Duniyape Technologies
                    </a>
                    {' '}Private Limited
                </p>
            </div>
        </div>
    );
};

export default Footer;