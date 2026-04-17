import React, { useState, useEffect } from "react";
import bannerBg from '../../assets/dr.jpg';


import { Target, Users, Crosshair } from "lucide-react";

const Mabout = () => {
  const isMobile = window.innerWidth < 768;

  const bannerStyle = {
    position: "relative",
    height: 200,
    backgroundImage: `url(https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExODlubHlhemt4MXlhY2kwa2NobHZncXB5c2xzN3BsbGJvdjNoYzU0eiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/YrTJKOe0FhQJAUXTyp/giphy.gif)`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginTop:100

  };

  
const testimonials = [

  {
    name: "Mededi Hassan MH",
    role: "SATISFIED CLIENT",
    icon: "user-circle",
    quote:
      "Commerce end interfaces with collaborative growth strategies wireless recapitualize one-to-one potentialities through client-focused medic.",
  },
  {
    name: "Dr. Jane Smith",
    role: "HAPPY PATIENT",
    icon: "user-circle",
    quote:
      "The experience was amazing. I highly recommend their professional approach and the friendliness of the staff.",
  },
  {
    name: "Rahul Verma",
    role: "PATIENT",
    icon: "user-circle",
    quote:
      "Efficient service, and the team really listens. I feel confident and satisfied with the treatment provided.",
  },
  {
    name: "Sneha Roy",
    role: "CLIENT",
    icon: "user-circle",
    quote:
      "Modern equipment and friendly doctors. A trustworthy healthcare experience from start to finish.",
  },
];



const [currentIndex, setCurrentIndex] = useState(0);

useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  const styles = {
    section: {
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "40px",
    },
    leftContent: {
      flex: "1 1 50%",
      paddingRight: "20px",
    },
    tag: {
      color: "#3f51b5",
      fontWeight: "bold",
      marginBottom: "10px",
    },
    title: {
      fontSize: "32px",
      marginBottom: "10px",
    },
    description: {
      fontSize: "16px",
      marginBottom: "20px",
    },
    card: {
      backgroundColor: "#f5f5f5",
      borderRadius: "10px",
      padding: "20px",
      position: "relative",
      transition: "all 0.5s ease-in-out",
      minHeight: "280px",
    },
    profile: {
      display: "flex",
      alignItems: "center",
      marginBottom: "15px",
    },
    profileImage: {
      width: "60px",
      height: "60px",
      borderRadius: "50%",
      marginRight: "15px",
      objectFit: "cover",
    },
    profileText: {
      display: "flex",
      flexDirection: "column",
    },
    name: {
      fontWeight: "bold",
      fontSize: "16px",
    },
    role: {
      fontSize: "12px",
      color: "#666",
    },
    quoteIcon: {
      marginLeft: "auto",
      fontSize: "32px",
      color: "#ccc",
    },
    quote: {
      fontStyle: "italic",
      fontSize: "29px",
      color: "#333",
    },
    dots: {
      display: "flex",
      justifyContent: "center",
      marginTop: "15px",
    },
    dot: (active) => ({
      height: "10px",
      width: "10px",
      borderRadius: "50%",
      backgroundColor: active ? "#3f51b5" : "#ccc",
      margin: "0 5px",
      transition: "background-color 0.3s",
    }),
    imageSide: {
      flex: "1 1 40%",
      textAlign: "center",
    },
    image: {
      maxWidth: "100%",
      height: "auto",
    },

    section: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      backgroundColor: "#f0f6ff",
      padding: isMobile ? "40px 20px" : "60px 100px",
      borderRadius: "20px",
      fontFamily: "Arial, sans-serif",
      flexWrap: "wrap",
    },
    leftContent: {
      flex: "1 1 50%",
      paddingRight: isMobile ? "0" : "50px",
      minWidth: "300px",
    },
    tag: {
      color: "#0d6efd",
      fontWeight: "bold",
      fontSize: "14px",
      marginBottom: "10px",
    },
    title: {
      fontSize: isMobile ? "30px" : "40px",
      fontWeight: "bold",
      color: "#0b1f47",
      marginBottom: "15px",
    },
    description: {
      fontSize: "16px",
      color: "#555",
      marginBottom: "30px",
      maxWidth: "500px",
      lineHeight: "1.6",
    },
    card: {
      backgroundColor: "#fff",
      padding: "30px",
      borderRadius: "20px",
      boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
      display: "flex",
      flexDirection: "column",
      gap: "15px",
      maxWidth: "500px",
    },
    profile: {
      display: "flex",
      alignItems: "center",
      gap: "15px",
    },
    profileImage: {
      width: "60px",
      height: "60px",
      borderRadius: "50%",
      objectFit: "cover",
    },
    profileText: {
      display: "flex",
      flexDirection: "column",
    },
    name: {
      fontWeight: "bold",
      color: "#0b1f47",
    },
    role: {
      fontSize: "12px",
      color: "#777",
    },
    quote: {
      fontStyle: "italic",
      fontSize: "14px",
      color: "#444",
      lineHeight: "1.6",
    },
    quoteIcon: {
      alignSelf: "flex-end",
      fontSize: "28px",
      color: "#0d6efd",
    },
    dots: {
      display: "flex",
      gap: "6px",
      marginTop: "15px",
      alignItems: "center",
    },
    dot: (active) => ({
      width: "10px",
      height: "10px",
      borderRadius: "50%",
      backgroundColor: active ? "#0d6efd" : "#ccc",
    }),
    imageSide: {
      flex: "1 1 40%",
      minWidth: "300px",
      marginTop: "30px",
    },
    image: {
      width: "100%",
      borderRadius: "20px",
    },
  };

  const current = testimonials[currentIndex];


  const overlayStyle = {
    backgroundColor: "rgba(0, 115, 230, 0.4)",
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    color: "white",
    textAlign: "center",
  };

  // const styles = {
   
  // };

  return (
    <>
      {/* Banner Section */}
      <div style={bannerStyle}>
        <div style={overlayStyle}>
          <h1
            style={{
              fontSize: "2rem",
              fontWeight: "bold",
              textShadow: "2px 2px 5px rgba(0,0,0,0.5)",
            }}
          >
            About Us
          </h1>
          {/* <p style={{ fontSize: "1.5rem", marginTop: "0.5rem" }}>
            We’d love to hear from you!
          </p> */}
        </div>
      </div>

      {/* Best Health Center Section */}
      <div
        style={{
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          alignItems: "center",
          justifyContent: "space-between",
          backgroundColor: "#eaf5ff",
          padding: "0px 40px",
          gap: "40px",
        }}
      >
        {/* Image Box */}
        <div
          style={{
            flex: "1",
            borderRadius: "20px",
            overflow: "hidden",
            position: "relative",
          }}
        >
          <img
            src='demo1.png'
            alt="Doctor"
            style={{ width: "100%", height: "auto", display: "block" }}
          />
          {/* <div
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              backgroundColor: "#007bff",
              color: "white",
              display: "flex",
              justifyContent: "space-around",
              padding: "20px 0",
              borderBottomLeftRadius: "20px",
              borderBottomRightRadius: "20px",
            }}
          >
            <div style={{ textAlign: "center" }}>
              <h2 style={{ fontSize: "28px", margin: 0 }}>100</h2>
              <p style={{ fontSize: "12px", margin: 0 }}>RECOVERED PATIENTS</p>
            </div>
            <div style={{ textAlign: "center" }}>
              <h2 style={{ fontSize: "28px", margin: 0 }}>100%</h2>
              <p style={{ fontSize: "12px", margin: 0 }}>SATISFACTION RATE</p>
            </div>
          </div> */}
        </div>

        {/* Right Content */}
        <div style={{ flex: "1", paddingLeft: isMobile ? "0" : "40px" }}>
          <p
            style={{
              color: "#007bff",
              fontWeight: "bold",
              marginBottom: "10px",
            }}
          >
            ABOUT COMPANY
          </p>
          <h2
            style={{
              fontSize: isMobile ? "28px" : "40px",
              fontWeight: "bold",
              color: "#002060",
              marginBottom: "20px",
            }}
          >
            DUNIYAPE TECHNOLOGIES PRIVATE LIMITED <br />
          </h2>
          <p
            style={{
              color: "#555",
              fontSize: "16px",
              lineHeight: "1.6",
              marginBottom: "30px",
            }}
          >
          Duniyape Technologies Private Limited is a forward-looking IT and software solutions company headquartered in Bathinda, Punjab, India. Established with the vision of bridging the gap between technology and real-world business needs, we deliver cutting-edge digital solutions that empower organizations to grow, scale, and innovate.
We specialize in custom software development, mobile and web applications, cloud solutions, AI-driven automation, and digital platforms that are designed to bring efficiency, security, and scalability to businesses. Our diverse portfolio includes platforms in healthcare, fintech, trading, e-commerce, education, and communication technologies.
          </p>
          {/* <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "20px",
              marginBottom: "30px",
              fontSize: "14px",
            }}
          >
            <div style={{ width: "45%", color: "#333" }}>
              🔵 Online Consultations
            </div>
            <div style={{ width: "45%", color: "#333" }}>🔵 Free Consultants</div>
            <div style={{ width: "45%", color: "#333" }}>
              🔵 Customer Support
            </div>
            <div style={{ width: "45%", color: "#333" }}>
              🔵 24/7 Booking
            </div>
          </div> */}
  
        </div>
      </div>






      {/* Best Health Center Section */}
      <div
        style={{
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          alignItems: "center",
          justifyContent: "space-between",
          backgroundColor: "#eaf5ff",
          padding: "0px 40px 60px 40px",
          gap: "40px",
        }}
      >
        

        {/* Right Content */}
        <div style={{ flex: "1", paddingLeft: isMobile ? "0" : "40px" }}>
          <p
            style={{
              color: "#007bff",
              fontWeight: "bold",
              marginBottom: "10px",
            }}
          >
            ABOUT CARE2CONNECT
          </p>
          <h2
            style={{
              fontSize: isMobile ? "28px" : "40px",
              fontWeight: "bold",
              color: "#002060",
              marginBottom: "20px",
            }}
          >
            Your Partner in Healthcare <br />
          </h2>
          <p
            style={{
              color: "#555",
              fontSize: "16px",
              lineHeight: "1.6",
              marginBottom: "30px",
            }}
          >
           We leverage technology to simplify the process of finding and booking medical care, ensuring you have access to qualified doctors and reliable health information.
          </p>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "20px",
              marginBottom: "30px",
              fontSize: "14px",
            }}
          >
            <div style={{ width: "45%", color: "#333" }}>
              🔵 Online Consultations
            </div>
            <div style={{ width: "45%", color: "#333" }}>🔵 Free Consultants</div>
            <div style={{ width: "45%", color: "#333" }}>
              🔵 Customer Support
            </div>
            <div style={{ width: "45%", color: "#333" }}>
              🔵 24/7 Booking
            </div>
          </div>

        </div>


        {/* Image Box */}
        <div
          style={{
            flex: "1",
            borderRadius: "20px",
            overflow: "hidden",
            position: "relative",
          }}
        >
          <img
            src={bannerBg}
            alt="Doctor"
            style={{ width: "100%", height: "auto", display: "block" }}
          />
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              backgroundColor: "#007bff",
              color: "white",
              display: "flex",
              justifyContent: "space-around",
              padding: "20px 0",
              borderBottomLeftRadius: "20px",
              borderBottomRightRadius: "20px",
            }}
          >
            <div style={{ textAlign: "center" }}>
              <h2 style={{ fontSize: "28px", margin: 0 }}>100</h2>
              <p style={{ fontSize: "12px", margin: 0 }}>RECOVERED PATIENTS</p>
            </div>
            <div style={{ textAlign: "center" }}>
              <h2 style={{ fontSize: "28px", margin: 0 }}>100%</h2>
              <p style={{ fontSize: "12px", margin: 0 }}>SATISFACTION RATE</p>
            </div>
          </div>
        </div>
      </div>






      <div
  style={{
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: "20px",
    margin: "40px 5% 0px 5%",
  }}
>
  {/* ✅ Our Mission */}
  <div
    style={{
      flex: "1",
      minWidth: "280px",
      backgroundColor: "#ecf3fc",
      padding: "24px",
      borderRadius: "16px",
      border: "1px solid #e0e8f0",
    }}
  >
    <div
      style={{
        backgroundColor: "#f0f7ff",
        borderRadius: "50%",
        width: "40px",
        height: "40px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: "10px",
      }}
    >
      <Target size={20} color="#007bff" />
    </div>
    <div
      style={{
        color: "#003366",
        fontWeight: "bold",
        fontSize: "18px",
        marginBottom: "10px",
      }}
    >
      Our Mission
    </div>
    <div style={{ color: "#555", fontSize: "14px", lineHeight: "1.6" }}>
      We aim to deliver quality healthcare services with compassion and innovation.
    </div>
  </div>

  {/* ✅ Our Planning */}
  <div
    style={{
      flex: "1",
      minWidth: "280px",
      backgroundColor: "#ecf3fc",
      padding: "24px",
      borderRadius: "16px",
      border: "1px solid #e0e8f0",
    }}
  >
    <div
      style={{
        backgroundColor: "#f0f7ff",
        borderRadius: "50%",
        width: "40px",
        height: "40px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: "10px",
      }}
    >
      <Users size={20} color="#007bff" />
    </div>
    <div
      style={{
        color: "#003366",
        fontWeight: "bold",
        fontSize: "18px",
        marginBottom: "10px",
      }}
    >
      Our Planning
    </div>
    <div style={{ color: "#555", fontSize: "14px", lineHeight: "1.6" }}>
      Strategically aligning our resources to improve patient experiences and health outcomes.
    </div>
  </div>

  {/* ✅ Our Vission */}
  <div
    style={{
      flex: "1",
      minWidth: "280px",
      backgroundColor: "#ecf3fc",
      padding: "24px",
      borderRadius: "16px",
      border: "1px solid #e0e8f0",
    }}
  >
    <div
      style={{
        backgroundColor: "#f0f7ff",
        borderRadius: "50%",
        width: "40px",
        height: "40px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: "10px",
      }}
    >
      <Crosshair size={20} color="#007bff" />
    </div>
    <div
      style={{
        color: "#003366",
        fontWeight: "bold",
        fontSize: "18px",
        marginBottom: "10px",
      }}
    >
      Our Vission
    </div>
    <div style={{ color: "#555", fontSize: "14px", lineHeight: "1.6" }}>
      To be the leading healthcare provider known for patient-centered care.
    </div>
  </div>
</div>


      {/* Stats Blue Overlay Section */}
      <div
        style={{
          position: "relative",
          width: "100%",
          minHeight: "300px",
          overflow: "hidden",
          borderRadius: "0 0 30px 30px",
          marginTop: "20px",
        }}
      >
        <div
          style={{
            position: "flex",
            top: 0,
            left: 0,
            height: "100%",
            width: "100%",
            backgroundImage: `url(${bannerBg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            opacity: 0.3,
            zIndex: 1,
          }}
        ></div>

        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            height: "100%",
            width: "100%",
            backgroundColor: "#007BFD",
            opacity: 0.73,
            zIndex: 2,
          }}
        ></div>

        <div
          style={{
            position: "relative",
            zIndex: 3,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            color: "white",
            padding: isMobile ? "40px 20px" : "80px 80px",
            marginTop: "25px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "20px",
              flex: 1,
            }}
          >
            <div
              style={{
                backgroundColor: "white",
                padding: "5px",
                borderRadius: "60%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "70px",
                height: "70px",
                marginLeft: "30px",
              }}
            >
              <img
                src="https://cdn-icons-png.flaticon.com/512/3774/3774299.png"
                alt="Medical Icon"
                style={{ width: "45px", height: "45px" }}
              />
            </div>
            <div>
              <h2
                style={{
                  fontSize: isMobile ? "1.2rem" : "2rem",
                  fontWeight: "bold",
                  margin: 0,
                }}
              >
                Connecting you with a trusted medical network <br />
                Access to 100+ Verified Doctors{" "}
                {/* <span style={{ color: "#FFD700" }}>1200+ Patients</span> */}
              </h2>
            </div>
          </div>

          <div
            style={{ flexShrink: 0, marginTop: "20px", marginRight: "70px" }}
          >
            <a
              href="#"
              style={{
                backgroundColor: "white",
                color: "#002570",
                fontWeight: "600",
                padding: "18px 35px",
                borderRadius: "50px",
                textDecoration: "none",
                boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
                fontSize: "1rem",
              }}
            >
              Contact Us&nbsp;↗
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Mabout;
