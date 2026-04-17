import React from 'react';

export default function Achievement() {
  return (
    <div className="achievement-container">
      <style>{`
        /* --- BASE / DESKTOP STYLES (Original) --- */
        .achievement-container {
          background-color: #007bff;
          height: 200px;
          display: flex;
          justify-content: space-around;
          align-items: center;
          font-family: 'Arial, sans-serif';
          color: white;
        }

        .content-wrapper {
          display: flex;
          align-items: center;
          gap: 40px;
          padding: 20px;
        }

        .image-container {
          width: 300px;
          height: 100px;
          border-radius: 50px;
          overflow: hidden;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          border: 5px solid white;
          flex-shrink: 0;
        }

        .text-section {
          flex: 1;
        }

        .text-section h1 {
          font-size: 36px;
          font-weight: bold;
          margin: 0 0 30px 0;
        }

        .stats-section {
          display: flex;
          gap: 40px;
        }

        .stat-item {
          text-align: center;
        }

        .stat-number {
          font-size: 48px;
          font-weight: bold;
        }

        .stat-divider {
          border: none;
          border-top: 1px solid rgba(255, 255, 255, 0.3);
          width: 100px;
          margin: 10px auto;
        }

        .stat-label {
          font-size: 18px;
          text-transform: capitalize;
        }

        /* --- MOBILE VIEW ONLY --- */
        @media (max-width: 768px) {
          .achievement-container {
            height: auto;
            padding: 30px 10px;
          }

          .content-wrapper {
            display: grid;
            grid-template-columns: 1fr 1.5fr 1fr; /* 3 Columns for Stat-Image-Stat */
            grid-template-areas: 
              "title title title"
              "left-stat middle-img right-stat";
            gap: 15px;
            padding: 10px;
            align-items: center;
          }

          .text-section {
            grid-area: title;
            text-align: center;
          }

          .text-section h1 {
            font-size: 22px;
            margin: 0 0 15px 0;
          }

          .image-container {
            grid-area: middle-img;
            width: 100%; /* Fits the middle column */
            height: 60px;
            border-width: 3px;
          }

          /* Stat 1 to the Left */
          .stats-section .stat-item:first-child {
            grid-area: left-stat;
          }

          /* Stat 2 to the Right */
          .stats-section .stat-item:last-child {
            grid-area: right-stat;
          }

          .stats-section {
            display: contents; /* Allows individual items to use grid areas */
          }

          .stat-number {
            font-size: 20px;
          }

          .stat-label {
            font-size: 10px;
          }

          .stat-divider {
            width: 40px;
          }
        }
      `}</style>

      <div className="content-wrapper">
        {/* Image Container */}
        <div className="image-container">
          <img 
            src="https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExMWdwOHVjZDZ5Nmt1b2Z1MGVvcmdjNTRxcGlxNHA5bG5xbW8zZWFobCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/NsDgJPXkk5CK7pPYkJ/giphy.gif" 
            alt="Doctor and Patient"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover'
            }}
          />
        </div>

        {/* Text Section */}
        <div className="text-section">
          <h1>
            Medical Achievement<br />
            Health Protection
          </h1>
        </div>

        {/* Stats Section */}
        <div className="stats-section">
          {/* Stat Item 1 (Left on Mobile) */}
          <div className="stat-item">
            <div className="stat-number">100+</div>
            <hr className="stat-divider" />
            <div className="stat-label">Satisfied Patients</div>
          </div>

          {/* Stat Item 2 (Right on Mobile) */}
          <div className="stat-item">
            <div className="stat-number">100%</div>
            <hr className="stat-divider" />
            <div className="stat-label">Satisfaction Rates</div>
          </div>
        </div>
      </div>
    </div>
  );
}