import React, { useState, useEffect } from 'react'
import srvc from '../../assets/srvc-tm.png'
import call from '../../assets/call.png'
import location from '../../assets/location.png'
import { useNavigate } from 'react-router-dom'

const Booking = () => {
    const navi = useNavigate();
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

    // Update state on resize to handle layout changes
    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 768);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const primaryColor = '#002570';
    const secondaryColor = '#007eff';
    const greyText = '#65677a';
    const whiteTransparentBg = 'rgba(255, 255, 255, 0.30196078431372547)';
    const whiteBorder = '2px solid #ffffff';

    const cards = [
        {
            title: 'Our Professionals',
            icon: srvc,
            count: 'Multiple',
            subtitle: 'Doctors',
            text: 'Connect with trusted medical professionals for quality care.',
            routing: () => navi('/doctor_list')
        },
        {
            title: 'Appointments',
            icon: call,
            subtitle: '+91 62655-78975',
            text: 'Book appointments online anytime, or call our team for assistance.',
            routing: () => window.open('https://wa.me/message/3ZOXQMMGIYILJ1?src=qr')
        },
        {
            title: 'Locations',
            icon: location,
            subtitle: 'Near You',
            text: 'Serving multiple locations to ensure you get the care you need, wherever you are.',
            routing: () => navi('/map')
        }
    ];

    return (
        <div style={{ display: 'flex', justifyContent: 'center', backgroundColor: '#e6f1ff', padding: isMobile ? '20px 0' : '0' }}>
            <div
                style={{
                    display: 'flex',
                    flexDirection: isMobile ? 'column' : 'row', // Stack on mobile
                    justifyContent: 'space-between',
                    width: '100%',
                    maxWidth: '1200px',
                    marginBottom: isMobile ? '30px' : '60px',
                    paddingTop: isMobile ? '20px' : '60px',
                    gap: '20px',
                    paddingLeft: isMobile ? '15px' : '20px',
                    paddingRight: isMobile ? '15px' : '20px',
                    boxSizing: 'border-box'
                }}
            >
                {cards.map((card, index) => (
                    <div
                        onClick={card.routing}
                        key={index}
                        style={{
                            backgroundColor: whiteTransparentBg,
                            padding: isMobile ? '30px 20px' : '40px',
                            borderRadius: '24px',
                            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                            border: whiteBorder,
                            width: isMobile ? '100%' : 'calc(33.33% - 20px)', // Full width on mobile
                            textAlign: 'center',
                            position: 'relative',
                            zIndex: 1,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'flex-start',
                            transition: 'all 0.5s ease',
                            cursor: 'pointer',
                            boxSizing: 'border-box'
                        }}
                        onMouseOver={(e) => {
                            if (!isMobile) { // Disable hover scale on mobile for better UX
                                e.currentTarget.style.transform = 'scale(1.05)';
                            }
                            e.currentTarget.style.borderColor = 'cyan';
                            e.currentTarget.style.backgroundColor = 'rgba(199, 228, 156, 0.8)';
                            e.currentTarget.querySelectorAll('h2, h3, h4, p, span').forEach(el => el.style.color = 'black');
                        }}
                        onMouseOut={(e) => {
                            e.currentTarget.style.transform = 'scale(1)';
                            e.currentTarget.style.borderColor = 'white';
                            e.currentTarget.style.backgroundColor = whiteTransparentBg;
                            e.currentTarget.querySelectorAll('h2, h3, h4, p').forEach(el => el.style.color = primaryColor);
                            if (e.currentTarget.querySelector('span')) e.currentTarget.querySelector('span').style.color = secondaryColor;
                        }}
                    >
                        <div style={{ 
                            display: 'flex', 
                            width: '100%', 
                            justifyContent: 'space-between', 
                            alignItems: 'center', 
                            borderBottom: whiteBorder, 
                            paddingBottom: '20px' 
                        }}>
                            <h2 style={{ fontSize: isMobile ? '20px' : '25px', fontWeight: '600', margin: '0', color: primaryColor }}>
                                {card.title}
                            </h2>
                            <span style={{ fontSize: '20px', color: secondaryColor, transform: 'rotate(-45deg)' }}>
                                →
                            </span>
                        </div>

                        <div style={{ padding: '30px 0 15px' }}>
                            <img
                                src={card.icon}
                                alt={`${card.title} Icon`}
                                style={{
                                    width: isMobile ? '60px' : '80px',
                                    height: isMobile ? '60px' : '80px',
                                    objectFit: 'contain'
                                }}
                            />
                        </div>

                        {card.count ? (
                            <h3 style={{ fontSize: isMobile ? '24px' : '30px', display: 'inline-flex', alignItems: 'center', fontWeight: '600', margin: '0', color: primaryColor }}>
                                {card.count} <span style={{ padding: '0 5px', fontSize: isMobile ? '22px' : '30px', color: primaryColor }}>{card.subtitle}</span>
                            </h3>
                        ) : (
                            <h4 style={{ fontSize: isMobile ? '18px' : '22px', fontWeight: '600', color: primaryColor, margin: '5px 0' }}>
                                {card.subtitle}
                            </h4>
                        )}

                        <p style={{ 
                            color: greyText, 
                            fontSize: isMobile ? '14px' : '16px', 
                            fontFamily: '"DM Sans"', 
                            padding: '10px 0 0', 
                            margin: '0' 
                        }}>
                            {card.text}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Booking;