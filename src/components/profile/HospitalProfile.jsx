import React,{useEffect,useState} from 'react';
import { useParams } from 'react-router-dom';

import profileBackground from '../../assets/dr.jpg'
import profilePicture from '../../assets/dr.jpg'
import { useNavigate } from 'react-router-dom';

import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import useApi from '../../functions/api';
const API_BASE_URL = import.meta.env.VITE_API_URL;

const HospitalProfile = () => {

    const navi = useNavigate()

      const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: false
  };

   const primaryColor = '#002570';

      const {getapi}=useApi()
      const {id}=useParams()
    const [doctors, setdoctors] = useState([])
    const [profile, setprofile] = useState({})
    const fetch_doc=async()=>{
        try {
            const result = await getapi('/doctors');
             const rawDoctors = result.data;
                const doctorsWithImages = await Promise.all(
                  rawDoctors.map(async (doctor) => {
                    try {
                      const res = await fetch(`${API_BASE_URL}/image/${doctor?.documents?.photo}`, {
                                  headers: {
                                    "ngrok-skip-browser-warning": "true"
                                  }
                                });
                      // console.log(res)
                      const blob = await res.blob();
                      const objectUrl = URL.createObjectURL(blob);
                      return { ...doctor, imageUrl: objectUrl };
                    } catch (err) {
                      console.error(`Image fetch failed for ${doctor.name}:`, err);
                      return doctor // fallback image
                    }
                     })
                );
                console.log(doctorsWithImages)
                setdoctors(doctorsWithImages);
                
            const hospital = await getapi('/hospitals/'+id);
            console.log(result,hospital)
            if(hospital.data){
                setprofile(hospital.data)
            }
           
        } catch (error) {
            console.error(error)
        }

    }
    useEffect(() => {
     fetch_doc()
    }, [])

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
      marginTop:100

    }}>
      <div style={{
        width: '100%',
        // maxWidth: '900px',
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

          {/* Hexagon Overlapping Doctor Image */}
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
              src={profilePicture}
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

          {/* Left: Doctor Info */}
          <div style={{ flex: 1, minWidth: '250px' }}>
            <h2 style={{ margin: '0', fontSize: '28px', color: '#0d3c61' }}>{profile.hospital_name}</h2>
            <p style={{ margin: '8px 0', fontSize: '16px', color: '#444' }}>Established In {profile.established_year}</p>
            <p style={{ margin: '8px 0', fontSize: '14px', color: '#555' }}>{profile.address},{profile.city},</p>

            <div style={{ marginTop: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                <span style={{ marginRight: '8px' }}>📍</span>
                <span style={{ color: '#555', fontSize: '14px' }}>{profile.state}, {profile.pincode}</span>
              </div>
               <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                <span style={{ marginRight: '8px' }}>🎓</span>
                <span style={{ color: '#555', fontSize: '14px' }}>{profile.phone}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                <span style={{ marginRight: '8px' }}>🏥</span>
                <span style={{ color: '#555', fontSize: '14px' }}>{profile.email}</span>
              </div>
             
            </div>
          </div>

          {/* Right: About + Appointment */}
          <div style={{ flex: 1, minWidth: '250px' }}>
            {/* Experience and Rating */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '20px',
              padding: '10px 20px 0 0',
              marginTop:-80
            }}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <span style={{ fontSize: '18px', marginRight: '8px' }}>🗓️</span>
                <span style={{ fontSize: '14px', color: '#333' }}>Experience: <strong>15+ years</strong></span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <span style={{ fontSize: '18px', marginRight: '8px' }}>⭐</span>
                <span style={{ fontSize: '14px', color: '#333' }}>Rating: <strong>4.8/5</strong></span>
              </div>
            </div>

            <h3 style={{ marginBottom: '10px', color: '#0d3c61',marginTop:40 }}>About</h3>
            <p style={{
              fontSize: '14px',
              color: '#444',
              lineHeight: '1.6',
              marginBottom: '20px'
            }}>
              Dr. Mehedi Hassan is a highly respected cardiologist with over 15 years of experience in diagnosing and treating complex heart conditions. He is passionate about preventative healthcare and patient education.
            </p>

            {/* <button
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
              onClick={() => navi('/appointment')}
            >
              Book Appointment
            </button> */}
          </div>
        </div>


<div style={{margin:'0px 5%'}}>
<div
      style={{
       // Light blue background
        padding: '20px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        fontFamily: 'Arial, sans-serif',
      }}
    >
      {/* Left Section */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <h1
          style={{
            fontSize: '36px',
            fontWeight: 'bold',
            color: '#004d99', // Dark blue text
            marginRight: '10px',
          }}
        >
         MEET OUR BEST<br />
DOCTORS
        </h1>
        <span
          style={{
            fontSize: '50px',
            color: '#00a8ff', // Blue star
          }}
        >
          ✩
        </span>
      </div>

      {/* Right Section */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <div
          style={{
            fontSize: '48px',
            fontWeight: 'bold',
            color: '#004d99', // Dark blue text
            marginRight: '10px',
          }}
        >
          10+
        </div>
        <div
          style={{
            fontSize: '18px',
            textTransform: 'uppercase',
            color: '#004d99', // Dark blue text
          }}
        >
          PROFESSIONAL<br />DOCTORS
        </div>
      </div>

      
    </div>

{/* Separator */}
      <hr
        style={{
          borderColor: '#ddd',
          margin: '20px 0',
          width: '100%',
        }}
      />
</div>



<Slider {...settings}>
        {doctors.length>0&&doctors.map((item) => (
          <div key={item} onClick={()=>navi('/doctor_profile/'+item._id)}>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                width: '330px',
                height: '480px',
                // backgroundColor: '#0077afff',
                borderRadius: '20px',
                border: '1px solid #007bff',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                margin: '20px auto',
              }}
            >
              {/* Profile Image */}
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
                  src={item.imageUrl||item?.documents?.photo&&`${API_BASE_URL}/image/${item?.documents?.photo}`}
                  alt="Profile"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                  }}
                />

                {/* Social Icons */}
                <div
                  style={{
                    position: 'absolute',
                    bottom: '20px',
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
                        width: '40px',
                        height: '40px',
                        borderRadius: '50%',
                        border: 'none',
                        backgroundColor: 'white',
                        color: '#007bff',
                        fontSize: '20px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                      }}
                    >
                      {icon}
                    </button>
                  ))}
                </div>

                {/* Top Right Dot */}
                <div
                  style={{
                    position: 'absolute',
                    top: '-10px',
                    right: '-10px',
                    width: '20px',
                    height: '20px',
                    borderRadius: '50%',
                    border: '2px solid #00d1ff',
                    backgroundColor: 'transparent',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <div
                    style={{
                      width: '8px',
                      height: '8px',
                      borderRadius: '50%',
                      backgroundColor: '#00d1ff',
                    }}
                  />
                </div>
              </div>

              {/* Name & Title */}
              <div
                style={{
                  textAlign: 'center',
                  color: '#fff',
                  fontFamily: 'Arial, sans-serif',
                }}
              >
                <p
                  style={{
                    fontSize: '14px',
                    textTransform: 'uppercase',
                    fontWeight: 'bold',
                    marginBottom: '5px',
                    color:primaryColor
                  }}
                >
                  {item.speciality||"cardiologist"}
                </p>
                <h2
                  style={{
                    fontSize: '24px',
                    fontWeight: 'bold',
                    lineHeight: '1.2',
                    color:primaryColor
                  }}
                >
                  {item.name||"Dr. John Doe"}
                </h2>
              </div>
            </div>
          </div>
        ))}
      </Slider>








        {/* Bottom Colored Banner */}
        <div style={{
          backgroundColor: '#4690daff',
          padding: '0px',
          display: 'flex',
          flexWrap: 'wrap',
          paddingTop: '10px',
          paddingBottom: '80px',
          marginTop: '-20px',
          position: 'relative',
          zIndex: 0,
          clipPath: 'polygon(0 56%, 100% 0, 100% 100%, 0% 100%)'
        }}>
        </div>

      </div>


      
    </div>







  );
};

export default HospitalProfile;
