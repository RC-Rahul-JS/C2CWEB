import React, { useState, useEffect } from 'react';
import profileBackground from '../../assets/dr.jpg';
import profilePicture from '../../assets/dr.jpg';
import { useNavigate, useParams } from 'react-router-dom';
import dyjson from './Diagonistic.json';
import LabTest from '../profile/LabTests';

const DiagonisticProfile = () => {
  const navi = useNavigate();
  const primaryColor = '#002570';
  const [pathologies, setPathologies] = useState(dyjson);

  const { id } = useParams();
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const selected = pathologies.find(p => String(p.id) === id);
    if (selected) setProfile(selected);
  }, [id, pathologies]);

  if (!profile) {
    return <h2 style={{ textAlign: 'center', marginTop: 100 }}>Pathology Center Not Found</h2>;
  }

  return (
    <div style={{
      fontFamily: 'Arial, sans-serif',
      backgroundColor: '#f0f2f5',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      padding: '20px',
      boxSizing: 'border-box',
      marginTop: 70
    }}>
      <div style={{
        width: '100%',
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
            clipPath: "polygon(0% 0%, 100% 0%, 100% 80%, 0% 100%)",
            height: '300px',
            position: 'relative',
            zIndex: 1
          }} />

          {/* Hexagon Overlapping Center Image */}
          <div style={{
            position: 'absolute',
            bottom: '-80px',
            left: '30px',
            width: '160px',
            height: '160px',
            clipPath: 'polygon(50% 0%, 95% 25%, 95% 75%, 50% 100%, 5% 75%, 5% 25%)',
            overflow: 'hidden',
            backgroundColor: '#fff',
            border: '4px solid #fff',
            zIndex: 2,
            boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
          }}>
            <img
              src={profile.image_url || profilePicture}
              alt={profile.name}
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
          padding: '30px',
          display: 'flex',
          flexWrap: 'wrap',
          gap: '30px',
          marginTop: '-60px',
          paddingTop: '160px',
          paddingBottom: '120px',
          position: 'relative',
          zIndex: 0,
          clipPath: 'polygon(0 0, 100% 0, 100% 80%, 0% 100%)'
        }}>
          {/* Left: Pathology Info */}
          <div style={{ flex: 1, minWidth: '250px' }}>
            <h2 style={{ margin: '0', fontSize: '28px', color: '#0d3c61' }}>{profile.name}</h2>
            <p style={{ margin: '8px 0', fontSize: '16px', color: '#444' }}>
              {profile.type || "Diagnostic Centre"}
            </p>
            <p style={{ margin: '8px 0', fontSize: '14px', color: '#555' }}>
              {profile.services || "Pathology & Diagnostic Services"}
            </p>

            <div style={{ marginTop: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                <span style={{ marginRight: '8px' }}>📍</span>
                <span style={{ color: '#555', fontSize: '14px' }}>{profile.address}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                <span style={{ marginRight: '8px' }}>⭐</span>
                <span style={{ color: '#555', fontSize: '14px' }}>
                  Rating: {profile.rating || "N/A"}
                </span>
              </div>
            </div>
          </div>

          {/* Right: About + Book */}
          <div style={{ flex: 1, minWidth: '250px' }}>
            <h3 style={{ marginBottom: '10px', color: '#0d3c61' }}>About</h3>
            <p style={{
              fontSize: '14px',
              color: '#444',
              lineHeight: '1.6',
              marginBottom: '20px'
            }}>
              {profile.about || "This diagnostic centre offers trusted pathology and diagnostic services with modern equipment and professional staff."}
            </p>

            <button
              style={{
                padding: '10px 20px',
                backgroundColor: '#007bff',
                color: '#fff',
                border: 'none',
                borderRadius: '5px',
                fontSize: '16px',
                cursor: 'pointer',
                boxShadow: '0 2px 5px rgba(0, 0, 0, 0.2)',
              }}
              onMouseOver={(e) => e.target.style.backgroundColor = '#0056b3'}
              onMouseOut={(e) => e.target.style.backgroundColor = '#007bff'}
              onClick={() => navi('/appointment/' + id)}
            >
              Book Test / Appointment
            </button>
          </div>
        </div>

        {/* Bottom Banner */}
        <div style={{
          backgroundColor: '#4690daff',
          padding: '0px',
          display: 'flex',
          flexWrap: 'wrap',
          paddingTop: '10px',
          paddingBottom: '80px',
          marginTop: '-90px',
          position: 'relative',
          zIndex: 0,
          clipPath: 'polygon(0 56%, 100% 0, 100% 100%, 0% 100%)'
        }}>
        </div>
        <LabTest/>
      </div>

    </div>
  );
};

export default DiagonisticProfile;
