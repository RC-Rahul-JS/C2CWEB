import React,{useState,useEffect} from 'react'
import simg from '../../assets/services/srvce.png'
import simg2 from '../../assets/services/srvce2.png'
import simg3 from '../../assets/services/srvce3.png'
import simg4 from '../../assets/services/srvce4.png'
import simg5 from '../../assets/services/srvce-shp.png'

import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useNavigate } from 'react-router-dom'
import useApi from '../../functions/api'

const Services = () => {

    const navi = useNavigate()

    const primaryColor = '#002570';
    const secondaryColor = '#007eff';
    const lightBlueBg = '#e6f0fa';
    const greyText = '#65677a';
    const lightGreyBorder = 'rgba(0, 37, 112, 0.5)';
    const whiteTransparentBg = 'rgba(255, 255, 255, 0.30196078431372547)';
    const whiteBorder = '2px solid #ffffff';
    const darkBlueBg = '#17387b';
    const lightGrey2 = '#97a9bf';

    const {getapi}=useApi()
    const [hospitals, sethospitals] = useState([])
    const fetch_Hos=async()=>{
        try {
            const result = await getapi('/hospitals/get');
            console.log(result)
            if(result.data){
                const mapping=result.data.map((item,index)=>({alt: 'X-Ray Service', title: item.hospital_name, aos: index%2===0?'zoom-out':"zoom-in", delay: 500+index*100,id:item._id}))
                sethospitals(mapping)
            }
           
        } catch (error) {   
            console.error(error)
        }

    }
    useEffect(() => {
     fetch_Hos()
    }, [])
    

     const settings = {
    // dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: false
  };

  return (
    <div style={{
        backgroundColor: primaryColor,
        display:'flex',
        justifyContent:'center'
    }}>
      <div
                style={{
                    backgroundColor: primaryColor,
                    padding: '60px 50px',
                    width: '100%',
                    maxWidth: '1200px',
                    marginBottom: '60px',
                    borderRadius: '20px',
                    boxSizing: 'border-box'
                }}
                data-aos="fade-up"
                data-aos-delay="100"
            >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255, 255, 255, 0.15)', paddingBottom: '28px', marginBottom: '30px' }}>
                    <h1 style={{ fontSize: '60px', margin: '0', fontWeight: '700', lineHeight: '66px', color: 'white' }} data-aos="flip-left" data-aos-delay="200">
                        FIND <br />THE BEST HOSPITALS
                    </h1>
                    <p style={{ padding: '21px 0', color: 'white', fontFamily: '"DM Sans"', width: '34%' }} data-aos="fade-up" data-aos-delay="300">
                       We help you find and book appointments with accredited hospitals and specialized clinics, ensuring you receive the highest quality care with ease.
                    </p>
                    <button
                    onClick={()=>navi('/hospital_list/')}
                        style={{
                            backgroundColor: 'white',
                            color: primaryColor,
                            fontWeight: '500',
                            padding: '16px 35px',
                            borderRadius: '32px',
                            cursor: 'pointer',
                            border: `1px solid ${secondaryColor}`,
                            outline: 'none',
                            transition: 'background-color 0.5s, color 0.5s',
                            fontSize: '18px'
                        }}
                        onMouseOver={(e) => { e.target.style.backgroundColor = secondaryColor; e.target.style.color = 'white'; }}
                        onMouseOut={(e) => { e.target.style.backgroundColor = 'white'; e.target.style.color = primaryColor; }}
                        data-aos="fade-down"
                        data-aos-delay="400"
                    >
                        View All Hospitals <span style={{ paddingLeft: '7px', position: 'relative', top: '3px', transform: 'rotate(-45deg)', display: 'inline-block' }}>→</span>
                    </button>
                </div>
                {/* <div style={{ display: 'flex', flexWrap: 'wrap', gap: '30px', justifyContent: 'center', position: 'relative', zIndex: 1 }}> */}
                    <Slider {...settings}>
                    {
                    // [
                    //     { src: simg, alt: 'X-Ray Service', title: 'Digital X-Ray', aos: 'zoom-out', delay: 500 ,id:4585},
                    //     { src: simg2, alt: 'Dental Service', title: 'Dental Fixing', aos: 'zoom-in', delay: 600 ,id:4585 },
                    //     { src: simg3, alt: 'Surgery Service', title: 'Human Brain Surgery', aos: 'zoom-out', delay: 700 ,id:4585},
                    //     { src: simg4, alt: 'Vaccine Service', title: 'Pediatric Dentistry', aos: 'zoom-in', delay: 800 ,id:4585 }
                    // ]
                    hospitals.length>0&&hospitals
                    .map((service, index) => (
                        <div
                            onClick={()=>navi('/hospital_profile/'+service.id)}
                            key={index}
                            style={{
                                position: 'relative',
                                zIndex: 1,
                                borderRadius: '18px',
                                overflow: 'hidden',
                                width: 'calc(25% - 23px)',
                                minWidth: '250px',
                                transition: 'transform 0.5s ease'
                            }}
                        
                        >
                            <div style={{ position: 'relative', backgroundImage: 'linear-gradient(0deg, rgba(0, 37, 111, 0.99) 0%, rgba(0, 37, 111, 0.8) 20%, rgba(0, 37, 111, 0) 50%, rgba(0, 37, 111, 0) 100%)', borderRadius: '18px', transition: '0.5s' }}>
                                <img
                                    src={service.src||'https://plus.unsplash.com/premium_photo-1681843129112-f7d11a2f17e3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8aG9zcGl0YWx8ZW58MHx8MHx8fDA%3D'}
                                    alt={service.alt||"loading"}
                                    style={{
                                        width: '250Px',
                                        height: '300px',
                                        objectFit: 'cover',
                                        borderRadius: '18px',
                                        position: 'relative',
                                        zIndex: -1
                                    }}
                                />
                                <div style={{ position: 'absolute', zIndex: 1, bottom: '40px', left: '40px' }}>
                                    <h6 style={{ fontSize: '16px', fontWeight: '500', textTransform: 'uppercase', color: 'white' }} data-aos="fade-up" data-aos-delay={service.delay + 100}>
                                        {service.category}
                                    </h6>
                                    <h2 style={{ fontSize: '28px', fontWeight: '600', color: 'white', display: 'inline-block', transition: '0.5s' }}>
                                        <a href="#" style={{ color: 'inherit', textDecoration: 'none' }} data-aos="fade-up" data-aos-delay={service.delay + 200}>{service.title}</a>
                                    </h2>
                                </div>
                                <a
                                    href="#"
                                    style={{
                                        fontSize: '20px',
                                        width: '60px',
                                        height: '60px',
                                        lineHeight: '60px',
                                        borderRadius: '30px',
                                        textAlign: 'center',
                                        backgroundColor: secondaryColor,
                                        display: 'inline-block',
                                        position: 'absolute',
                                        zIndex: 1,
                                        top: '0',
                                        right: '40px',
                                        color: 'white',
                                        transition: '0.5s',
                                        opacity: '0',
                                        transform: 'rotate(-45deg)'
                                    }}
                                    data-aos="fade-up"
                                    data-aos-delay={service.delay + 300}
                                >
                                    <i className="bi bi-arrow-return-right"></i>
                                </a>
                            </div>
                        </div>
                    ))}</Slider>
                {/* </div> */}
            </div>
    </div>
  )
}

export default Services
