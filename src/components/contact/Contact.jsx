import React from "react";
import { motion } from "framer-motion";
import bannerBg from "../../assets/dr.jpg"; // ✅ Only once
import { FiMail, FiPhone, FiMapPin } from "react-icons/fi";

const Contact = () => {
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
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    color: "white",
    textAlign: "center",
  };

  const cardContainer = {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: "30px",
    padding: "80px 20px",
    backgroundColor: "#e9f2fc",
  };

  const cardStyle = {
    backgroundColor: "#f3f8fe",
    borderRadius: "20px",
    padding: "30px 25px",
    width: "300px",
    textAlign: "left",
    boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
  };

  const labelRow = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: "20px",
  };

  const labelStyle = {
    color: "#6B6E6F",
    fontSize: "1.1rem",
    fontWeight: "500",
    textTransform: "uppercase",
  };

  const iconWrapper = {
    backgroundColor: "white",
    border: "2px solid rgba(89, 168, 224, 1)",
    borderRadius: "50%",
    width: "50px",
    height: "48px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
  };

  const headingStyle = {
    fontSize: "1.5rem",
    paddingTop: "40px",
    fontWeight: "bold",
    color: "#002570",
    marginTop: "15px",
    marginBottom: "10px",
  };

  const infoStyle = {
    fontSize: "0.75rem",
    color: "#333",
    fontWeight: "22",
    lineHeight: "1.6",
  };

  const mapContainer = {
    width: "100%",
    padding: "50px 20px",
    backgroundColor: "#f9fbff",
    display: "flex",
    justifyContent: "center",
  };

  const iframeStyle = {
    width: "90%",
    height: "450px",
    border: "0",
    borderRadius: "10px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
  };

  return (
    <>
      {/* Banner Section */}
      <div
        style={bannerStyle}
        initial={{ scaleX: 0, originX: 0.5 }}
        whileInView={{ scaleX: 1 }}
        transition={{ duration: 1, ease: "easeInOut" }}
        viewport={{ once: true, amount: 0.5 }}
      >
        <div style={overlayStyle}>
          <h1 style={{ fontSize: "2rem", fontWeight: "bold", textShadow: "2px 2px 5px rgba(0,0,0,0.5)" }}>
            Contact Us
          </h1>
          {/* <p style={{ fontSize: "1.5rem", marginTop: "0.5rem" }}>We’d love to hear from you!</p> */}
        </div>
      </div>

      {/* Contact Info Cards */}
      <motion.div
        style={cardContainer}
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true, amount: 0.3 }}
      >
        {/* Email */}
        <div style={cardStyle}>
          <div style={labelRow}>
            <span style={labelStyle}>Meet Us</span>
            <div style={iconWrapper}>
              <FiMail size={28} color="#4087cfff" strokeWidth={1.5} />
            </div>
          </div>
          <h3 style={headingStyle}>Email Address</h3>
          <p style={infoStyle}><strong>care@care2connect.in</strong></p>
        </div>

        {/* Phone */}
        <div style={cardStyle}>
          <div style={labelRow}>
            <span style={labelStyle}>Call Now</span>
            <div style={iconWrapper}>
              <FiPhone size={28} color="#4087cfff" strokeWidth={1.5} />
            </div>
          </div>
          <h3 style={headingStyle}>Phone Number</h3>
          <p style={infoStyle}><strong>+91 6265578971</strong></p>
        </div>

        {/* Location */}
        <div style={cardStyle}>
          <div style={labelRow}>
            <span style={labelStyle}>Send Now</span>
            <div style={iconWrapper}>
              <FiMapPin size={28} color="#4087cfff" strokeWidth={1.5} />
            </div>
          </div>
          <h3 style={headingStyle}>Our Location</h3>
          <p style={infoStyle}>
            <strong>
              Shop No-28, ModelTown, Phase-3,<br />
              Bathinda-151001, Punjab,<br />
              India
            </strong>
          </p>
        </div>
      </motion.div>

      {/* Google Map */}
      <div data-aos="zoom-in">
        <div style={mapContainer}>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d422.746757079087!2d74.96133115020828!3d30.21443214533888!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x391732ae0598f6cd%3A0xc42eec22e6d506c6!2s6X76%2BQGG%2C%20Model%20Town%2C%20Phase-3%2C%20Model%20Town%2C%20Bathinda%2C%20Punjab%20151001!5e1!3m2!1sen!2sin!4v1755683407680!5m2!1sen!2sin"
            style={iframeStyle}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Google Map Location"
          ></iframe>
        </div>
      </div>

      {/* Stats Section with Local Image and Overlay */}
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
        {/* Local Background */}
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
            marginTop: "25px"
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
<br/>
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

export default Contact;