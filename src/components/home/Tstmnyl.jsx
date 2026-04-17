import React, { useState, useEffect } from "react";
import bannerBg from '../../assets/dr.jpg';
import { Target, Users, Crosshair } from "lucide-react";

const Tstmnyl = () => {
  // Real-time window width tracking for responsive styles
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isMobile = windowWidth < 768;
  const isTablet = windowWidth >= 768 && windowWidth < 1024;

  const testimonials = [
    {
      name: "Gurpreet Singh",
      role: "SATISFIED CLIENT",
      quote: "Commerce end interfaces with collaborative growth strategies wireless recapitualize one-to-one potentialities through client-focused medic.",
    },
    {
      name: "Simranjit Singh",
      role: "HAPPY PATIENT",
      quote: "The experience was amazing. I highly recommend their professional approach and the friendliness of the staff.",
    },
    {
      name: "Harman Singh",
      role: "PATIENT",
      quote: "Efficient service, and the team really listens. I feel confident and satisfied with the treatment provided.",
    },
    {
      name: "Navdeep Singh",
      role: "CLIENT",
      quote: "Modern equipment and friendly doctors. A trustworthy healthcare experience from start to finish.",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 3000); // Increased time for better readability
    return () => clearInterval(interval);
  }, []);

  const styles = {
    container: {
      padding: isMobile ? "20px 15px" : "60px 30px",
      backgroundColor: "#fff",
    },
    section: {
      display: "flex",
      flexDirection: isMobile ? "column" : "row",
      justifyContent: "space-between",
      alignItems: "center",
      backgroundColor: "#f0f6ff",
      padding: isMobile ? "30px 20px" : isTablet ? "40px 50px" : "60px 100px",
      borderRadius: "20px",
      fontFamily: "Arial, sans-serif",
      gap: "30px",
    },
    leftContent: {
      flex: isMobile ? "1 1 100%" : "1 1 50%",
      width: "100%",
    },
    tag: {
      color: "#0d6efd",
      fontWeight: "bold",
      fontSize: "14px",
      marginBottom: "10px",
      textAlign: isMobile ? "center" : "left",
    },
    title: {
      fontSize: isMobile ? "28px" : "40px",
      fontWeight: "bold",
      color: "#0b1f47",
      marginBottom: "15px",
      textAlign: isMobile ? "center" : "left",
      lineHeight: "1.2",
    },
    description: {
      fontSize: "16px",
      color: "#555",
      marginBottom: "30px",
      maxWidth: isMobile ? "100%" : "500px",
      lineHeight: "1.6",
      textAlign: isMobile ? "center" : "left",
    },
    card: {
      backgroundColor: "#fff",
      padding: isMobile ? "20px" : "30px",
      borderRadius: "20px",
      boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
      display: "flex",
      flexDirection: "column",
      gap: "15px",
      width: "100%",
      boxSizing: "border-box",
    },
    profile: {
      display: "flex",
      alignItems: "center",
      gap: "15px",
      flexWrap: "wrap",
    },
    profileImage: {
      width: "50px",
      height: "50px",
      borderRadius: "50%",
      objectFit: "cover",
    },
    profileText: {
      display: "flex",
      flexDirection: "column",
      flex: 1,
    },
    name: {
      fontWeight: "bold",
      color: "#0b1f47",
      fontSize: "16px",
    },
    role: {
      fontSize: "12px",
      color: "#777",
    },
    quote: {
      fontStyle: "italic",
      fontSize: isMobile ? "14px" : "16px",
      color: "#444",
      lineHeight: "1.6",
    },
    quoteIcon: {
      fontSize: "24px",
      color: "#0d6efd",
      marginLeft: "auto",
    },
    dots: {
      display: "flex",
      gap: "6px",
      marginTop: "15px",
      justifyContent: isMobile ? "center" : "flex-start",
    },
    dot: (active) => ({
      width: "8px",
      height: "8px",
      borderRadius: "50%",
      backgroundColor: active ? "#0d6efd" : "#ccc",
      transition: "all 0.3s ease",
    }),
    imageSide: {
      flex: isMobile ? "1 1 100%" : "1 1 40%",
      width: "100%",
      display: "flex",
      justifyContent: "center",
    },
    image: {
      width: "100%",
      maxWidth: isMobile ? "300px" : "100%",
      borderRadius: "20px",
      height: "auto",
      objectFit: "contain",
    },
  };

  const current = testimonials[currentIndex];

  return (
    <div style={styles.container}>
      <section style={styles.section}>
        {/* Left Content Area */}
        <div style={styles.leftContent}>
          <div style={styles.tag}>OUR TESTIMONIALS</div>
          <h2 style={styles.title}>Our Happy Patients</h2>
          <p style={styles.description}>
            We are proud to share feedback from our happy patients who have used
            our platform to find quality medical care.
          </p>

          <div
            key={currentIndex}
            style={{
              ...styles.card,
              transition: "opacity 0.8s ease, transform 0.8s ease",
            }}
          >
            <div style={styles.profile}>
              <img
                src="https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExbnFvNDRiNWJyNXBqM29odDB5Mm40cXFvbnZobXI2cnQ5c3JoN3pyNCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9ZQ/hof5uMY0nBwxyjY9S2/giphy.gif"
                alt="Profile Icon"
                style={styles.profileImage}
              />
              <div style={styles.profileText}>
                <span style={styles.name}>{current.name}</span>
                <span style={styles.role}>{current.role}</span>
              </div>
              <div style={styles.quoteIcon}>❞</div>
            </div>

            <p style={styles.quote}>{current.quote}</p>
            
            <div style={styles.dots}>
              {testimonials.map((_, i) => (
                <div key={i} style={styles.dot(i === currentIndex)} />
              ))}
            </div>
          </div>
        </div>

        {/* Right Content Area (Image) */}
        <div style={styles.imageSide}>
          <img
            src="https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExcDlxZG9xNWxpdWdlemF0YjVkZDFpNWJ5ZDl6MmJoN29wNHoyN2c0NiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/f7YCJwa0XZbLvW3gav/giphy.gif"
            alt="Happy Patients Animation"
            style={styles.image}
          />
        </div>
      </section>
    </div>
  );
};

export default Tstmnyl;