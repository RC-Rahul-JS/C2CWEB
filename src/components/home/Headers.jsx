import React, { useState, useEffect } from "react";

const Header = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const columns = 10;
  const rows = 10;
  const totalPieces = columns * rows;
  const [gridItems] = useState(Array.from({ length: totalPieces }));

  useEffect(() => {
    setIsLoaded(true);
    const contentTimer = setTimeout(() => {
      setShowContent(true);
    }, 800);
    return () => clearTimeout(contentTimer);
  }, []);

  const getDelay = (index) => {
    const col = index % columns;
    const row = Math.floor(index / columns);
    const centerCol = columns / 2;
    const centerRow = rows / 2;
    const distance = Math.sqrt(Math.pow(col - centerCol, 2) + Math.pow(row - centerRow, 2));
    return (distance * 0.1 + 0.2).toFixed(2);
  };

  const navItems = [
    { title: "Book Appointment", subtitle: "Schedule Visit" },
    { title: "Find Hospital", subtitle: "Locations" },
    { title: "Health Check", subtitle: "Preventive Care" },
    { title: "Expert Opinion", subtitle: "Consultation" },
  ];

  return (
    <section className="relative w-full h-[80vh] md:h-[85vh] flex items-end justify-center overflow-hidden bg-black m-0 p-0 select-none cursor-default">
      <style>
        {`
          @keyframes levitate {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-15px); }
          }
          @keyframes shineFlow {
            0% { background-position: -200% center; }
            100% { background-position: 200% center; }
          }
          @keyframes flipOnly {
            0% { transform: rotateY(0deg); }
            100% { transform: rotateY(360deg); }
          }
          .animate-levitate { animation: levitate 6s ease-in-out infinite; }
          .animate-shineFlow { animation: shineFlow 4s linear infinite; }
          .animate-flipOnly { animation: flipOnly 3s linear infinite; }
          .text-gradient-shine {
            background-image: linear-gradient(120deg, #FFFFFF 40%, #cce0ff 50%, #FFFFFF 60%);
            background-size: 200% auto;
            -webkit-background-clip: text;
            background-clip: text;
            -webkit-text-fill-color: transparent;
          }
        `}
      </style>

      {/* --- 1. THE PUZZLE LAYER --- */}
      <div 
        className="fixed inset-0 grid z-50 pointer-events-none"
        style={{ gridTemplateColumns: `repeat(${columns}, 1fr)`, gridTemplateRows: `repeat(${rows}, 1fr)` }}
      >
        {gridItems.map((_, index) => (
          <div
            key={index}
            className="w-full h-full bg-[#002570] border border-white/10 box-border transition-all duration-[800ms] ease-in-out"
            style={{
              opacity: isLoaded ? 0 : 1,
              transform: isLoaded ? "scale(0.8) rotate(10deg)" : "scale(1) rotate(0deg)",
              transitionDelay: `${getDelay(index)}s`,
            }}
          />
        ))}
      </div>

      {/* --- 2. VIDEO LAYER --- */}
      <video
        autoPlay loop muted playsInline
        className="absolute inset-0 w-full h-full object-cover z-0"
        src="https://videos.pexels.com/video-files/3249935/3249935-hd_1280_720_25fps.mp4"
      />
      <div className="absolute inset-0 w-full h-full bg-gradient-to-b from-[#002570]/30 to-[#002570]/80 backdrop-blur-[3px] z-[1]" />

      {/* --- 3. CONTENT WRAPPER --- */}
      <div className="relative w-full max-w-[1400px] h-full flex justify-center items-end z-10 px-4">
        
        {/* CARE2CONNECT Title - Shifted 7% further down */}
        <div 
          className={`absolute top-[27%] md:top-[32%] w-full flex justify-center items-center z-[1] font-black uppercase text-center tracking-[1px] md:tracking-[4px] drop-shadow-[0_10px_20px_rgba(0,0,0,0.6)] text-gradient-shine animate-shineFlow transition-all duration-1000 cubic-bezier(0.2,0.8,0.2,1) delay-200 pointer-events-none
            ${showContent ? "opacity-100 scale-100" : "opacity-0 scale-110"}`}
          style={{ fontSize: "clamp(1.6rem, 7vw, 5rem)" }}
        >
          CARE2CONNECT
          <img src="/heart.png" alt="heart" className="h-[0.8em] w-auto ml-[5px] md:ml-[10px] align-middle drop-shadow-[0_0_10px_rgba(255,0,0,0.6)] animate-flipOnly" />
        </div>

        {/* Doctor Image */}
        <img 
          src="/drhero.png" 
          alt="Doctor" 
          className={`relative z-[10] h-[60vh] md:h-[75vh] w-auto object-contain pointer-events-none transition-all duration-1000 cubic-bezier(0.2,0.8,0.2,1)
            translate-y-[-10%] md:translate-y-0 drop-shadow-[0_20px_50px_rgba(0,0,0,0.7)]
            ${showContent ? "opacity-100 animate-levitate" : "opacity-0"}`}
        />

        {/* DOCTORS Foreground Text */}
        <div 
          className={`absolute bottom-[35%] md:bottom-[25%] left-0 md:left-[15%] w-full text-center md:text-left z-[11] font-black uppercase tracking-[2px] md:tracking-[4px] text-gradient-shine animate-shineFlow transition-all duration-1000 cubic-bezier(0.2,0.8,0.2,1) delay-200 pointer-events-none
            ${showContent ? "opacity-100 scale-100" : "opacity-0 scale-110"}`}
          style={{ fontSize: "clamp(2rem, 8vw, 5rem)" }}
        >
          DOCTORS
        </div>
      </div>

      {/* --- 4. NAVIGATION BAR --- */}
      <div 
        className={`absolute bottom-[10%] md:bottom-[10%] left-1/2 -translate-x-1/2 w-[95%] max-w-[1100px] grid grid-cols-2 md:grid-cols-4 gap-[8px] md:gap-[15px] z-20 pointer-events-auto transition-all duration-700 ease-out delay-500
          ${showContent ? "opacity-100 translate-y-0" : "opacity-0 translate-y-[50px]"}`}
      >
        {navItems.map((item, index) => (
          <div 
            key={index} 
            className={`group relative flex items-center justify-between p-[6px_10px] md:p-[8px_12px] rounded-[12px] cursor-pointer transition-all duration-300 backdrop-blur-[12px] border
              ${hoveredIndex === index 
                ? "bg-white/15 border-white/50 shadow-[0_10px_30px_rgba(0,150,255,0.2)]" 
                : "bg-[#002570]/40 border-white/10 shadow-[0_4px_10px_rgba(0,0,0,0.2)]"}`}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <div className="flex flex-col items-start pointer-events-none">
              <span className="text-[7px] md:text-[9px] text-[#a0c4ff] uppercase tracking-[1px]">{item.subtitle}</span>
              <span className="text-[11px] md:text-[13px] font-semibold text-white tracking-[0.5px] font-sans truncate max-w-[80px] md:max-w-none">{item.title}</span>
            </div>
            
            <div className={`w-[22px] h-[22px] md:w-[28px] md:h-[28px] rounded-full flex items-center justify-center transition-all duration-300 pointer-events-none
              ${hoveredIndex === index ? "bg-white" : "bg-white/10"}`}>
              <svg 
                width="12" height="12" viewBox="0 0 24 24" fill="none" 
                stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                className={`transition-all duration-300 transform group-hover:-rotate-45
                  ${hoveredIndex === index ? "text-[#002570] translate-x-0" : "text-white -translate-x-[2px]"}`}
              >
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Header;