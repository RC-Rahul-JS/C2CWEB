import React from "react";
import { motion } from "framer-motion";
import bannerBg from "../../assets/dr.jpg"; 
import {
  FaUserFriends,
  FaHandsHelping,
  FaBrain,
  FaTired,
  FaUsers,
  FaUserCircle,
} from "react-icons/fa";

const OurServices = () => {
  const bannerStyle = {
   position: "relative",
    height: 200,
    backgroundImage: `url(https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExODlubHlhemt4MXlhY2kwa2NobHZncXB5c2xzN3BsbGJvdjNoYzU0eiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/YrTJKOe0FhQJAUXTyp/giphy.gif)`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    overflow: "hidden",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginTop:100
  };
   

  const overlayStyle = {
    backgroundColor: "rgba(0, 115, 230, 0.4)",
    
    // backgroundColor: "rgba(3, 66, 130, 0.8)",
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    color: "white",
    textAlign: "center",
  };

  const cardContainerStyle = {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: "20px",
    padding: "60px 20px",
    backgroundColor: "#f0f6ff",
  };

  const cardStyle = {
    flex: "1 1 300px",
    maxWidth: "330px",
    backgroundColor: "#fff",
    padding: "30px",
    borderRadius: "20px",
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.05)",
    border: "1px solid #e0e8f0",
    transition: "all 0.3s ease",
    cursor: "pointer",
  };

  const iconHeadingRow = {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    marginBottom: "15px",
    transition: "color 0.4s ease",
  };

  const iconContainerStyle = {
    backgroundColor: "#f5f8ff",
    width: "50px",
    height: "50px",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#002a7f",
    transition: "all 0.4s ease, transform 0.4s ease",
  };

  const titleStyle = {
    fontSize: "18px",
    fontWeight: "bold",
    color: "#002a7f",
    transition: "color 0.4s ease",
  };

  const descStyle = {
    fontSize: "15px",
    color: "#5f6c7b",
    lineHeight: "1.6",
    marginBottom: "20px",
  };

  const readMoreStyle = {
    color: "#002a7f",
    fontWeight: "600",
    fontSize: "14px",
    background: "none",
    border: "none",
    padding: 0,
    cursor: "pointer",
    transition: "all 0.4s ease",
    textAlign: "left",
  };

  const handleHover = (e) => {
    const icon = e.currentTarget.querySelector(".icon");
    icon.style.color = "#007BFD";
    icon.style.transform = "translateY(-8px)";
    e.currentTarget.querySelector(".title").style.color = "#007BFD";
    const btn = e.currentTarget.querySelector(".read-more");
    btn.style.color = "#007BFD";
    btn.style.textDecoration = "underline";
  };

  const handleLeave = (e) => {
    const icon = e.currentTarget.querySelector(".icon");
    icon.style.color = "#002a7f";
    icon.style.transform = "translateY(0)";
    e.currentTarget.querySelector(".title").style.color = "#002a7f";
    const btn = e.currentTarget.querySelector(".read-more");
    btn.style.color = "#002a7f";
    btn.style.textDecoration = "none";
  };

  return (
    <>
      {/* Banner */}
      <div
        style={bannerStyle}
        initial={{ scaleX: 0, originX: 0.5 }}
        whileInView={{ scaleX: 1 }}
        transition={{ duration: 1, ease: "easeInOut" }}
        viewport={{ once: true, amount: 0.5 }}
      >
        <div style={overlayStyle}>
          <h1
            style={{
              fontSize: "2rem",
              fontWeight: "bold",
              textShadow: "2px 2px 5px rgba(0,0,0,0.5)",
            }}
          >
            Services
          </h1>
          {/* <p style={{ fontSize: "1.5rem", marginTop: "0.5rem" }}>
            mediic / services
          </p> */}
        </div>
      </div>

      {/* Cards */}
      <div style={cardContainerStyle}>
        {[
          {
            icon: <FaUserFriends />,
            title: "Mental Health Specialists",
            aos: "fade-down",
            desc: "Our platform connects you with experienced therapists and psychologists who can help with a wide range of mental health needs, including individual and relationship therapy",
          },
          {
            icon: <FaHandsHelping />,
            title: "Family Wellness",
            aos: "flip-left",
            desc: "Find certified family counselors and pediatricians to support the health and well-being of your entire family, from children to adults.",
          },
          {
            icon: <FaBrain />,
            title: "Stress & Anxiety",
            aos: "fade-up",
            desc: "Find and book appointments with psychiatrists and counselors who can help you learn coping strategies and find solutions for anxiety and stress-related issues.",
          },
          {
            icon: <FaTired />,
            title: "General Healthcare",
            aos: "fade-down",
            desc: "Our network includes a wide range of specialists, making it easy to find an expert for your specific health needs",
          },
          {
            icon: <FaUsers />,
            title: "Personal Therapy",
            aos: "flip-left",
            desc: "Share, connect, and heal in a supportive group environment. Led by professionals, guided by trust and empathy.",
          },
          {
            icon: <FaUserCircle />,
            title: "Personal Meeting",
            aos: "fade-up",
            desc: "Schedule one-on-one sessions tailored to your mental health goals. Safe, private, and fully focused on your growth.",
          },
        ].map((item, index) => (
          <div
            key={index}
            style={cardStyle}
            data-aos={item.aos}
            data-aos-duration="1800"
            onMouseEnter={handleHover}
            onMouseLeave={handleLeave}
          >
            <div style={iconHeadingRow}>
              <div className="icon" style={iconContainerStyle}>
                {React.cloneElement(item.icon, { size: 24 })}
              </div>
              <div className="title" style={titleStyle}>{item.title}</div>
            </div>
            <div style={descStyle}>{item.desc}</div>
            <button className="read-more" style={readMoreStyle}>READ MORE</button>
          </div>
        ))}
      </div>

      {/* Stats Section */}
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
        {/* Background Image */}
        <div
          style={{
            position: "absolute",
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

        {/* Blue Overlay */}
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

        {/* Content */}
        <div
          style={{
            position: "relative",
            zIndex: 3,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            color: "white",
            padding: "80px 80px",
            marginTop: "25px",
          }}
        >
          <div data-aos="fade-up" style={{ display: "flex", alignItems: "center", gap: "20px", flex: 1 }}>
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
              <h2 style={{ fontSize: "2rem", fontWeight: "bold", margin: 0 }}>
                Connecting you with a trusted medical network
 <br />
                Access to 100+ Verified Doctors
                 {/* <span style={{ color: "#FFD700" }}>1200+ Patients</span> */}
              </h2>
            </div>
          </div>

          <div data-aos="fade-left" style={{ flexShrink: 0, marginTop: "20px", marginRight: "70px" }}>
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

export default OurServices;