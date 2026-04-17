import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import dyjson from './Diagonistic.json';
import { useNavigate } from 'react-router-dom';

const Diagonistic = () => {
  const primaryColor = '#002570';
  const [pathologies, setPathologies] = useState(dyjson)

  const navigate = useNavigate(); 

// lal path leb gurukashi marg bathinda
// maxlab 100feet road bathinda
// krsna lab
// aadhaar degnostic
    
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: false
  };

  return (
    <div className="slider-container" style={{ padding: '40px', background: '#e6f1ff'}}>

      {/* Header */}
      <div
        style={{
          padding: '20px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          fontFamily: 'Arial, sans-serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <h1
            style={{
              fontSize: '36px',
              fontWeight: 'bold',
              color: '#004d99',
              marginRight: '10px',
            }}
          >
            Our Connected <br /> Pathologies
          </h1>
          <span style={{ fontSize: '50px', color: '#00a8ff' }}>✩</span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div
            style={{
              fontSize: '48px',
              fontWeight: 'bold',
              color: '#004d99',
              marginRight: '10px',
            }}
          >
            10+
          </div>
          <div
            style={{
              fontSize: '18px',
              textTransform: 'uppercase',
              color: '#004d99',
            }}
          >
            DIAGNOSTIC <br /> CENTRES
          </div>
        </div>
      </div>

      {/* Separator */}
      <hr style={{ borderColor: '#ddd', margin: '20px 0', width: '100%' }} />

      <Slider {...settings}>
        {pathologies.map((item, index) => (
          <div key={index} 
          onClick={() => navigate(`/diagonistic_profile/${item.id}`)}
          > 
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                cursor:'pointer',
                
                width: '220px',
                height: '330px',
                borderRadius: '20px',
                border: '1px solid #007bff',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                margin: '20px auto',
                // backgroundColor: '#fff',
                padding: '15px'
              }}
            >
              <div
                style={{
                  width: '280px',
                  height: '280px',
                  borderRadius: '10px',
                  overflow: 'hidden',
                  position: 'relative',
                  marginBottom: '20px',
                }}
              >
                <img
                  src={item.image_url}
                  alt={item.name}
                  style={{
                   
                    width: '70%',
                    height: '80%',
                    borderRadius: '8px',
                    objectFit: 'cover',
                    marginLeft: '45px'
                  }}
                />

                
              </div>

              {/* Pathology Info */}
              <div
                style={{
                  textAlign: 'center',
                  fontFamily: 'Arial, sans-serif',
                }}
              >
                {/* <h2
                  style={{
                    fontSize: '16px',
                    fontWeight: 'bold',
                    lineHeight: '1.2',
                    marginBottom: '10px',
                    color: primaryColor
                  }}
                >
                  {item.rating}
                   <i class="fa-thin fa-star"></i>
                 
                </h2> */}
                 {/* <h1
                    style={{
                    fontSize: '16px',
                    fontWeight: 'bold',
                    lineHeight: '1.2',
                    marginBottom: '10px',
                    color: '#2e2626ff'
                  }}
                >
                 
                  {item.ratings_count}
                    </h1>    */}
                <h2
                  style={{
                    fontSize: '16px',
                    fontWeight: 'bold',
                    lineHeight: '1.2',
                    marginBottom: '10px',
                    color: primaryColor
                  }}
                >
                  {item.name}
                </h2>

                <p
                  style={{
                    fontSize: '10px',
                    textTransform: 'uppercase',
                    fontWeight: 'bold',
                    marginBottom: '8px',
                    color: primaryColor
                  }}
                >
                  📍 {item.address}
                </p>
                
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Diagonistic;
