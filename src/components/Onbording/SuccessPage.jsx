import React from 'react';
import { useNavigate } from 'react-router-dom';

const SuccessPage = ({ 
  title = "Registration Successful!", 
  description = "Your onboarding details have been safely received and are currently being verified by our administrator team.",
  buttonText = "Go Back Home"
}) => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center p-6 font-sans">
      <div className="bg-white max-w-lg w-full rounded-[2.5rem] shadow-2xl border border-slate-100 p-10 flex flex-col items-center text-center relative overflow-hidden transform transition-all duration-500 scale-100 hover:scale-[1.01]">
        
        {/* Animated Background Gradients */}
        <div className="absolute -top-24 -left-24 w-48 h-48 bg-emerald-100/50 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-blue-100/50 rounded-full blur-3xl pointer-events-none"></div>

        {/* Animated Checkmark Circle */}
        <div className="relative mb-8">
          <div className="w-24 h-24 bg-emerald-50 rounded-full flex items-center justify-center animate-[bounce_2.5s_infinite]">
            <svg 
              className="w-12 h-12 text-emerald-500 stroke-current stroke-[3.5] fill-none" 
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle 
                cx="12" 
                cy="12" 
                r="10" 
                className="stroke-emerald-200" 
                strokeWidth="2" 
              />
              <path 
                className="animate-[drawCheck_0.8s_ease-out_forwards]"
                strokeDasharray="30"
                strokeDashoffset="30"
                strokeLinecap="round" 
                strokeLinejoin="round" 
                d="M5 13l4 4L19 7" 
              />
            </svg>
          </div>
          {/* Decorative Sparkles */}
          <div className="absolute -top-2 -right-2 w-3 h-3 bg-emerald-400 rounded-full animate-ping"></div>
          <div className="absolute -bottom-1 -left-2 w-2 h-2 bg-blue-400 rounded-full animate-ping [animation-delay:0.5s]"></div>
        </div>

        {/* Title */}
        <h2 className="text-2xl font-black text-slate-800 uppercase tracking-wide mb-4">
          {title}
        </h2>

        {/* Description */}
        <p className="text-sm font-semibold text-slate-500 leading-relaxed max-w-sm mb-10">
          {description}
        </p>

        {/* Divider */}
        <div className="w-full h-px bg-slate-100 mb-8"></div>

        {/* Home Button */}
        <button
          onClick={() => navigate('/')}
          className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-black py-4 px-8 rounded-2xl shadow-lg shadow-emerald-200 uppercase tracking-widest text-xs transition-all duration-300 hover:shadow-xl hover:shadow-emerald-300 active:scale-[0.98] cursor-pointer"
        >
          {buttonText}
        </button>

        {/* CSS Keyframes Injector */}
        <style dangerouslySetInnerHTML={{ __html: `
          @keyframes drawCheck {
            to {
              stroke-dashoffset: 0;
            }
          }
        `}} />
      </div>
    </div>
  );
};

export default SuccessPage;
