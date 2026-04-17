import React, { useEffect, useState } from "react";
// import logo from "../../assets/heart.png"; 

const ComingSoon = () => {
  const [time, setTime] = useState(new Date());
  const [hover, setHover] = useState(true);
  const [colorIndex, setColorIndex] = useState(0);

  // Colors for overlay background
  const colors = [
    "rgba(102, 126, 102, 0.96)", 
    "rgba(160, 104, 142, 0.9)",    
    "rgba(89, 131, 136, 0.96)",   
    "rgba(180, 173, 113, 0.9)",   
  ];

  // Clock updater
  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setColorIndex((prevIndex) => (prevIndex + 1) % colors.length);
    }, 2500); 
    return () => clearInterval(interval);
  }, []);

  const seconds = time.getSeconds();
  const secondAngle = seconds * 6; 

  const ticks = [];
  for (let i = 0; i < 360; i += 30) {
    ticks.push(
      <div
        key={i}
        style={{
          position: "absolute",
          width: "2px",
          height: "20px",
          background: "white",
          top: "90%",
          left: "49%",
          transformOrigin: "center -120px",
          transform: `rotate(${i}deg)`,
          opacity: 0.7,
          animation: "pulse 2s infinite alternate",
        }}
      ></div>
    );
  }

  return (
    <div
      style={{
        height: "100vh",
        width: "100%",
        position: "relative",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        transition: "background-color 1s ease",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          height: "100%",
          width: "100%",
          backgroundColor: colors[colorIndex],
          transition: "background-color 1s ease", 
        }}
      ></div>

      <div
        style={{
          position: "relative",
          zIndex: 2,
          textAlign: "center",
          color: "white",
          padding: "20px",
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <p style={{ fontSize: "1.4rem", marginBottom: "10px" }}>THIS PAGE IS</p>
        <h1 style={{ fontSize: "3.5rem", letterSpacing: "5px" }}>
          COMING SOON
        </h1>

        {/* Clock */}
        <div
          style={{
            position: "relative",
            width: "300px",
            height: "300px",
            margin: "40px auto",
            border: "2px solid white",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "1.6rem",
            fontWeight: "bold",
            cursor: "pointer",
          }}
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(true)}
        >
          {time.toLocaleTimeString()}

          {ticks}

          <div
            style={{
              position: "absolute",
              width: "2px",
              height: "120px",
              background: "red",
              top: "30px",
              left: "50%",
              transformOrigin: "bottom center",
              transform: `rotate(${secondAngle}deg)`,
              opacity: hover ? 1 : 0,
              transition: "opacity 0.3s",
            }}
          ></div>
        </div>

        <p style={{ marginTop: "10px", fontSize: "1.2rem" }}>STAY TUNED!</p>
      </div>

      <div
        style={{
          position: "relative",
          zIndex: 2,
          textAlign: "center",
          color: "#222",
          padding: "10px",
          fontSize: "0.9rem",
          marginBottom: "10px",
        }}
      >
        <span style={{ marginRight: "8px" }}>© 2025</span>
        <span style={{ marginLeft: "8px" }}>
          <a
            href="https://duniyape.in"
            style={{ color: "#222", textDecoration: "none" }}
          >
            Duniyape Technologies Private Limited
          </a>{" "}
          All Rights Reserved
        </span>
      </div>

      <style>
        {`
          @keyframes pulse {
            from { opacity: 0.4; }
            to { opacity: 1; }
          }
        `}
      </style>
    </div>
  );
};

export default ComingSoon;
