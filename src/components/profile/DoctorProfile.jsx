import React, { useEffect, useState } from 'react';
import profileBackground from '../../assets/dr.jpg';
import { useNavigate, useParams } from 'react-router-dom';
import useApi from '../../functions/api';

const DoctorProfile = () => {
  const navi = useNavigate();
  const { getapi } = useApi();
  const { id } = useParams();
  const [profile, setprofile] = useState({});
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  // Responsive tracker
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isMobile = windowWidth < 768;

  const fetch_doc = async () => {
    try {
      console.log("Current Doctor ID from URL:", id);
      const result = await getapi('/get_doctor/' + id+'/' );
      console.log("Fetched Doctor Profile Data:", result.data);
      setprofile(result.data);
    } catch (error) {
      console.error("Error fetching doctor profile:", error);
    }
  };

  useEffect(() => {
    fetch_doc();
  }, [id]);

  return (
    <div style={{
      fontFamily: 'Arial, sans-serif',
      backgroundColor: '#f0f2f5',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      padding: isMobile ? '10px' : '20px',
      boxSizing: 'border-box',
      marginTop: isMobile ? 60 : 70
    }}>
      <div style={{
        width: '100%',
        maxWidth: '1000px',
        backgroundColor: '#fff',
        borderRadius: '8px',
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
        overflow: 'hidden',
        position: 'relative'
      }}>

        <div style={{ position: 'relative' }}>
          {/* Banner Image */}
          <div style={{
            backgroundImage: `url(${profileBackground})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            clipPath: isMobile ? "none" : "polygon(0% 0%, 100% 0%, 100% 80%, 0% 100%)",
            height: isMobile ? '180px' : '300px',
            position: 'relative',
            zIndex: 1
          }} />

          {/* Hexagon Overlapping Doctor Image */}
          <div style={{
            position: 'absolute',
            bottom: isMobile ? '-50px' : '-80px',
            left: isMobile ? '50%' : '30px',
            transform: isMobile ? 'translateX(-50%)' : 'none',
            width: isMobile ? '120px' : '160px',
            height: isMobile ? '120px' : '160px',
            clipPath: 'polygon(50% 0%, 95% 25%, 95% 75%, 50% 100%, 5% 75%, 5% 25%)',
            overflow: 'hidden',
            backgroundColor: '#fff',
            border: '4px solid #fff',
            zIndex: 2,
            boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
          }}>
            <img
              src={profile?.imageUrl}
              alt="Doctor"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover'
              }}
            />
          </div>
        </div>

        {/* Details Container */}
        <div style={{
          backgroundColor: '#e9f5ff',
          padding: isMobile ? '20px' : '30px',
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          gap: isMobile ? '20px' : '30px',
          marginTop: isMobile ? '0' : '-60px',
          paddingTop: isMobile ? '70px' : '160px',
          paddingBottom: isMobile ? '60px' : '120px',
          position: 'relative',
          zIndex: 0,
          clipPath: isMobile ? 'none' : 'polygon(0 0, 100% 0, 100% 80%, 0% 100%)',
          textAlign: isMobile ? 'center' : 'left'
        }}>

          {/* Left: Doctor Info */}
          <div style={{ flex: 1 }}>
            <h2 style={{ margin: '0', fontSize: isMobile ? '22px' : '28px', color: '#0d3c61' }}>{profile.name}</h2>
            <p style={{ margin: '8px 0', fontSize: '16px', color: '#444', fontWeight: 'bold' }}>MBBS, MD - {profile.speciality || 'Specialist'}</p>
            <p style={{ margin: '8px 0', fontSize: '14px', color: '#555' }}>Reg No: {profile.registration_number || 'N/A'}</p>

            <div style={{ 
                marginTop: '20px', 
                display: 'inline-block', 
                textAlign: 'left',
                width: isMobile ? '100%' : 'auto' 
            }}>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                <span style={{ marginRight: '12px' }}>📍</span>
                <span style={{ color: '#555', fontSize: '14px' }}>{profile.district}, {profile.state}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                <span style={{ marginRight: '12px' }}>🏥</span>
                <span style={{ color: '#555', fontSize: '14px' }}>{profile.experience}+ years experience</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                <span style={{ marginRight: '12px' }}>🎓</span>
                <span style={{ color: '#555', fontSize: '14px' }}>Verified Medical Professional</span>
              </div>
            </div>
          </div>

          {/* Right: About + Appointment */}
          <div style={{ flex: 1 }}>
            {/* Experience and Rating */}
            <div style={{
              display: 'flex',
              justifyContent: isMobile ? 'center' : 'space-between',
              alignItems: 'center',
              marginBottom: '20px',
              gap: isMobile ? '20px' : '0',
              marginTop: isMobile ? '10px' : '-80px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <span style={{ fontSize: '18px', marginRight: '8px' }}>🗓️</span>
                <span style={{ fontSize: '14px', color: '#333' }}>Exp: <strong>{profile.experience}+ yrs</strong></span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <span style={{ fontSize: '18px', marginRight: '8px' }}>⭐</span>
                <span style={{ fontSize: '14px', color: '#333' }}>Rating: <strong>4.8/5</strong></span>
              </div>
            </div>

            <h3 style={{ marginBottom: '10px', color: '#0d3c61', marginTop: isMobile ? '10px' : '40px' }}>About</h3>
            <p style={{
              fontSize: '14px',
              color: '#444',
              lineHeight: '1.6',
              marginBottom: '20px'
            }}>
              {profile.about || "Experienced medical professional dedicated to providing high-quality healthcare and patient-centered services."}
            </p>

            <button
              style={{
                width: isMobile ? '100%' : 'auto',
                padding: '12px 24px',
                backgroundColor: '#007bff',
                color: '#fff',
                border: 'none',
                borderRadius: '5px',
                fontSize: '16px',
                fontWeight: 'bold',
                cursor: 'pointer',
                boxShadow: '0 2px 5px rgba(0, 0, 0, 0.2)',
                transition: '0.3s'
              }}
              onMouseOver={(e) => e.target.style.backgroundColor = '#0056b3'}
              onMouseOut={(e) => e.target.style.backgroundColor = '#007bff'}
              onClick={() => navi('/appointment/' + id)}
            >
              Book Appointment 
            </button>
            <div style={{ marginTop: '10px' }}>
              <span style={{ fontSize: 14, color: 'green', fontWeight: 700 }}>
                Consultation Fee: ₹{profile.appointmentfee || "Consultation TBD"}
              </span>
            </div>
          </div>
        </div>

        {/* Bottom Colored Banner - Simplified for Mobile */}
        <div style={{
          backgroundColor: '#4690da',
          paddingBottom: isMobile ? '40px' : '80px',
          marginTop: isMobile ? '0' : '-90px',
          position: 'relative',
          zIndex: 0,
          clipPath: isMobile ? 'none' : 'polygon(0 56%, 100% 0, 100% 100%, 0% 100%)'
        }}>
        </div>

      </div>
    </div>
  );
};

export default DoctorProfile;