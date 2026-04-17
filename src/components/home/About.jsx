import React from 'react';
import { Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';

const MissionServiceUI = () => {
  const points = [
    "Easy Online Scheduling", "Access to a Network of Surgeons",
    "24/7 Customer Support", "Dedicated to Patient Satisfaction",
    "Seamless Booking Process", "Verified Medical Professionals"
  ];

  const globalStyles = `
    .no-select-zone {
      -webkit-user-select: none;
      -moz-user-select: none;
      -ms-user-select: none;
      user-select: none;
      cursor: default !important;
    }
    .no-select-zone * {
      cursor: default !important;
    }
    .btn-pointer, .btn-pointer * {
      cursor: pointer !important;
    }
    @keyframes spin-slow {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }
    @keyframes y-flip {
      0% { transform: perspective(400px) rotateY(0deg); }
      100% { transform: perspective(400px) rotateY(360deg); }
    }
    @keyframes float {
      0%, 100% { transform: translateY(0px); }
      50% { transform: translateY(-15px); }
    }
    .animate-spin-slow { animation: spin-slow 12s linear infinite; }
    .animate-y-flip { animation: y-flip 4s linear infinite; }
    .animate-float { animation: float 6s ease-in-out infinite; }
  `;

  return (
    /* Reduced min-height from screen to 80vh and reduced padding to remove height from top/bottom */
    <div className="no-select-zone relative min-h-[80vh] lg:min-h-screen w-full flex items-center overflow-hidden font-sans select-none cursor-default py-2 lg:py-0">
      <style>{globalStyles}</style>
      
      {/* 1. Background Overlay */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center pointer-events-none"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=2000')" }}
      />
      <div className="absolute inset-0 z-10 bg-gradient-to-br from-blue-600/60 via-sky-400/40 to-blue-900/80 backdrop-blur-[8px] pointer-events-none" />

      {/* Main Content Wrapper: Kept the 10% downward shift for mobile as requested previously */}
      <div className="relative z-20 w-full max-w-7xl mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center transform translate-y-[10%] lg:translate-y-0">
        
        {/* LEFT CONTENT AREA */}
        <div className="lg:col-span-7 space-y-6 lg:space-y-8">
          
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-blue-100 text-[10px] font-bold uppercase tracking-widest shadow-xl">
              <Sparkles size={14} className="text-blue-300" /> Our Mission
            </div>
            
            <h1 className="text-3xl lg:text-5xl font-black text-white leading-[1.1] tracking-tighter">
              Elevate <br />
              <div className="flex items-center gap-4 lg:gap-6">
                <span className="text-blue-900 drop-shadow-sm">Your Health</span>
                
                <div className="relative w-14 h-14 lg:w-20 lg:h-20 flex items-center justify-center scale-90 lg:scale-100">
                  <svg className="absolute w-full h-full animate-spin-slow" viewBox="0 0 100 100">
                    <defs>
                      <path id="circlePath" d="M 50, 50 m -35, 0 a 35,35 0 1,1 70,0 a 35,35 0 1,1 -70,0" />
                    </defs>
                    <text className="text-[10px] font-bold uppercase fill-white/70 tracking-[0.15em] pointer-events-none">
                      <textPath href="#circlePath">
                        • QUALITY CARE • TRUSTED • EXPERTISE •
                      </textPath>
                    </text>
                  </svg>
                  <img src="/heart.png" alt="Heart" className="w-5 h-5 lg:w-8 lg:h-8 object-contain animate-y-flip relative z-10 pointer-events-none" />
                </div>
              </div>
            </h1>
            
            <p className="text-[12px] lg:text-base text-white/80 max-w-lg leading-relaxed font-medium italic border-l-4 border-blue-500 pl-4 bg-white/5 py-2 rounded-r-xl">
              "To simplify healthcare by connecting you with top-rated medical professionals 
              and ensuring a seamless, patient-first experience for everyone."
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2 lg:gap-y-3 pt-2">
            {points.map((text, i) => (
              <div key={i} className="flex items-center gap-2 lg:gap-3 group">
                <CheckCircle2 size={14} className="text-blue-400 group-hover:text-blue-200 transition-colors pointer-events-none" />
                <span className="text-[11px] lg:text-[13px] font-bold text-white tracking-tight">{text}</span>
              </div>
            ))}
          </div>

          {/* ACTION AREA */}
          <div className="pt-6 flex items-center justify-between lg:justify-start gap-4 relative">
            <button className="btn-pointer group px-5 lg:px-10 py-3.5 lg:py-5 bg-white text-blue-900 rounded-full font-black text-[10px] lg:text-sm shadow-2xl hover:bg-blue-900 hover:text-white transition-all duration-500 flex items-center gap-2 z-10">
              Book a Consultation <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform" />
            </button>

            {/* MOBILE DOCTOR */}
            <div className="block lg:hidden w-[35vw] h-[35vw] max-w-[200px] relative flex-shrink-0 pointer-events-none">
               <img 
                src="/drabout.png" 
                alt="Doctor Specialist" 
                className="w-full h-full object-contain drop-shadow-2xl animate-float translate-x-4"
              />
            </div>
          </div>
        </div>

        {/* DESKTOP DOCTOR: Unchanged */}
        <div className="hidden lg:flex lg:col-span-5 relative justify-end items-end h-full min-h-[400px]">
          <div className="absolute bottom-[-5%] right-[-10%] w-full max-w-[800px] animate-float pointer-events-none">
            <img 
              src="/drabout.png" 
              alt="Doctor Specialist" 
              style={{ height: 'calc(100% + 10px)' }}
              className="w-full object-contain drop-shadow-[-20px_20px_60px_rgba(0,0,0,0.5)] pointer-events-none"
            />
          </div>
        </div>

      </div>
    </div>
  );
};

export default MissionServiceUI;