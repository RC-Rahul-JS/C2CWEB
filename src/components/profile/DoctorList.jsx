import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useNavigate } from 'react-router-dom';
import useApi from '../../functions/api';
const API_BASE_URL = import.meta.env.VITE_API_URL;

const DoctorList = () => {
  const navi = useNavigate();
  const { getapi } = useApi();
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  // Resize listener to handle dynamic styling without changing logic
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isMobile = windowWidth < 768;

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: isMobile ? 1 : 3, // Responsive slide count
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: false
  };

  const primaryColor = '#002570';
  const [doctors, setdoctors] = useState([]);

  const fetch_doc = async () => {
    try {
      const result = await getapi('/doctors');
      const rawDoctors = result.data;
      setdoctors(rawDoctors);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetch_doc();
  }, []);

  return (
    <div className="slider-container" style={{ 
      padding: isMobile ? '20px' : '40px', 
      background: '#e6f1ff', 
      marginTop: isMobile ? 50 : 70 
    }}>
      <div
        style={{
          padding: '20px 0',
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row', // Stack on mobile
          justifyContent: 'space-between',
          alignItems: isMobile ? 'flex-start' : 'center',
          fontFamily: 'Arial, sans-serif',
          gap: isMobile ? '20px' : '0'
        }}
      >
        {/* Left Section */}
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <h1
            style={{
              fontSize: isMobile ? '28px' : '36px',
              fontWeight: 'bold',
              color: '#004d99',
              marginRight: '10px',
              lineHeight: '1.1'
            }}
          >
            MEET OUR BEST<br />DOCTORS
          </h1>
          <span style={{ fontSize: isMobile ? '30px' : '50px', color: '#00a8ff' }}>✩</span>
        </div>

        {/* Right Section */}
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div
            style={{
              fontSize: isMobile ? '36px' : '48px',
              fontWeight: 'bold',
              color: '#004d99',
              marginRight: '10px',
            }}
          >
            10+
          </div>
          <div
            style={{
              fontSize: isMobile ? '14px' : '18px',
              textTransform: 'uppercase',
              color: '#004d99',
            }}
          >
            PROFESSIONAL<br />DOCTORS
          </div>
        </div>
      </div>

      <hr style={{ borderColor: '#ddd', margin: '20px 0', width: '100%' }} />

      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: isMobile ? 15 : 20
      }}>
        {doctors.length > 0 && doctors.map((item) => (
          <div key={item._id} onClick={() => navi('/doctor_profile/' + item._id)}>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                width: isMobile ? '90vw' : '330px', // Responsive width
                height: isMobile ? 'auto' : '480px',
                padding: isMobile ? '20px 0' : '0',
                cursor: 'pointer',
                borderRadius: '20px',
                border: '1px solid #007bff',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                margin: isMobile ? '10px auto' : '20px auto',
                backgroundColor: '#fff' // Ensured visibility against blue bg
              }}
            >
              {/* Profile Image */}
              <div
                style={{
                  width: isMobile ? '80vw' : '280px',
                  height: isMobile ? '80vw' : '280px',
                  maxWidth: '280px',
                  maxHeight: '280px',
                  borderRadius: '10px',
                  overflow: 'hidden',
                  position: 'relative',
                  marginBottom: '20px',
                }}
              >
                <img
                  src={item.documents?.photo || 'https://via.placeholder.com/280'}
                  alt="Profile"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover'
                  }}
                />

                {/* Social Icons - Hidden on small mobile to save space, or kept for consistency */}
                <div
                  style={{
                    position: 'absolute',
                    bottom: '15px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    display: 'flex',
                    gap: '10px',
                  }}
                >
                  {['f', 'in', 'Bē'].map((icon, i) => (
                    <button
                      key={i}
                      style={{
                        width: isMobile ? '35px' : '40px',
                        height: isMobile ? '35px' : '40px',
                        borderRadius: '50%',
                        border: 'none',
                        backgroundColor: 'white',
                        color: '#007bff',
                        fontSize: '18px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        boxShadow: '0 2px 5px rgba(0,0,0,0.2)'
                      }}
                    >
                      {icon}
                    </button>
                  ))}
                </div>

                <div
                  style={{
                    position: 'absolute',
                    top: '10px',
                    right: '10px',
                    width: '20px',
                    height: '20px',
                    borderRadius: '50%',
                    border: '2px solid #00d1ff',
                    backgroundColor: 'white',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#00d1ff' }} />
                </div>
              </div>

              {/* Name & Title */}
              <div style={{ textAlign: 'center', fontFamily: 'Arial, sans-serif', padding: '0 10px' }}>
                <p style={{
                  fontSize: '14px',
                  textTransform: 'uppercase',
                  fontWeight: 'bold',
                  marginBottom: '5px',
                  color: primaryColor
                }}>
                  {item.speciality || "cardiologist"}
                </p>
                <h2 style={{
                  fontSize: isMobile ? '20px' : '24px',
                  fontWeight: 'bold',
                  lineHeight: '1.2',
                  color: primaryColor,
                  marginBottom: isMobile ? '10px' : '0'
                }}>
                  {item.name || "Dr. John Doe"}
                </h2>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DoctorList;