import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Stethoscope, 
  Star, 
  ArrowRight, 
  Sparkles,
  FlaskConical,
  ShieldCheck,
  MapPin,
  ArrowLeft
} from 'lucide-react';
const API_BASE_URL = import.meta.env.VITE_API_URL;
import useApi from '../../functions/api';
import Cookies from "js-cookie";
import { useNavigate } from 'react-router-dom';
import dyjson from '../profile/Diagonistic.json';

const UnifiedMedicalPortal = () => {
  const [isDocPaused, setIsDocPaused] = useState(false);
  const [isLabPaused, setIsLabPaused] = useState(false);
  const navi = useNavigate()
  const {getapi} = useApi()
  
  const cardEntrance = {
    hidden: { opacity: 0, scale: 0.9, y: 30 },
    visible: (i) => ({
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { delay: i * 0.1, duration: 0.6, ease: "easeOut" }
    })
  };

  const [doctors, setdoctors] = useState([])
  
  const fetch_doc = async () => {
    try {
      const result = await getapi('/doctors');
      const rawDoctors = (result.data).map(element => ({
        id: element._id,
        name: element.name,
        image: element.ImageUrl,
        rating: 4.9,
        role: element.speciality,
        dept: element.specialization
      }));
      localStorage.setItem("userData", JSON.stringify(rawDoctors));
      setdoctors(rawDoctors);
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem("userData"));
    if (savedUser) {
      setdoctors(savedUser);
    }
    fetch_doc();
  }, []);

  const labs = dyjson.map(element => ({
    id: element.id,
    name: element.name,
    logo: element.image_url,
    rating: element.rating,
    color: "#00a99d",
    location: element.address
  }))

  const marqueeDoctors = [...doctors, ...doctors];
  const marqueeLabs = [...labs, ...labs];

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-blue-500/40 via-sky-300/50 flex flex-col items-center justify-center p-4 lg:p-10 overflow-hidden font-sans gap-8 lg:gap-12 select-none cursor-default">
      
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes marquee-reverse {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
        .animate-marquee-reverse {
          animation: marquee-reverse 35s linear infinite;
        }
        @media (min-width: 1024px) {
          .animate-marquee { animation-duration: 40s; }
          .animate-marquee-reverse { animation-duration: 45s; }
        }
        .pause-animation {
          animation-play-state: paused !important;
        }
      `}} />

      {/* DOCTORS ROW */}
      <div className="max-w-[1440px] w-full flex flex-col xl:flex-row gap-6 lg:gap-8 items-center">
        <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} className="xl:w-[28%] w-full z-10">
          <div className="bg-white/40 backdrop-blur-2xl border border-white/40 p-6 lg:p-8 rounded-[24px] lg:rounded-[30px] shadow-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-600 text-white mb-4">
              <Sparkles size={12} fill="currentColor" />
              <span className="text-[10px] font-bold uppercase tracking-wider">Top Specialists</span>
            </div>
            <h2 className="text-2xl lg:text-3xl font-black text-slate-900 leading-tight mb-3">Find Your <br className="hidden lg:block"/>Expert Doctor.</h2>
            <p className="text-slate-700 text-[13px] lg:text-[14px] leading-relaxed mb-6">Verified consultants available for instant booking.</p>
            <button className="w-full py-3 lg:py-4 rounded-xl bg-slate-900 text-white text-[12px] lg:text-[13px] font-bold flex items-center justify-center gap-2 hover:bg-blue-700 transition-all">
              Book Appointment <ArrowRight size={16} />
            </button>
          </div>
        </motion.div>

        <div className="xl:w-[72%] w-full overflow-hidden relative" style={{ maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)' }}>
          <div 
            className={`flex gap-4 lg:gap-6 py-4 animate-marquee ${isDocPaused ? 'pause-animation' : ''}`}
            style={{ width: "max-content" }}
            onMouseEnter={() => setIsDocPaused(true)}
            onMouseLeave={() => setIsDocPaused(false)}
          >
            {marqueeDoctors.map((doc, index) => (
              <DoctorCard key={`doc-${index}`} doc={doc} index={index} variants={cardEntrance} />
            ))}
          </div>
        </div>
      </div>

      {/* LABS ROW */}
      <div className="max-w-[1440px] w-full flex flex-col xl:flex-row-reverse gap-6 lg:gap-8 items-center">
        <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} className="xl:w-[28%] w-full z-10">
          <div className="bg-white/40 backdrop-blur-2xl border border-white/40 p-6 lg:p-8 rounded-[24px] lg:rounded-[30px] shadow-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-600 text-white mb-4">
              <FlaskConical size={12} />
              <span className="text-[10px] font-bold uppercase tracking-wider">Partner Labs</span>
            </div>
            <h2 className="text-2xl lg:text-3xl font-black text-slate-900 leading-tight mb-3">Pathology <br className="hidden lg:block"/>Services.</h2>
            <p className="text-slate-700 text-[13px] lg:text-[14px] leading-relaxed mb-6">Rahul, book verified home sample collections easily.</p>
            <button className="w-full py-3 lg:py-4 rounded-xl bg-indigo-600 text-white text-[12px] lg:text-[13px] font-bold flex items-center justify-center gap-2 hover:bg-indigo-800 transition-all">
              <ArrowLeft size={16} /> View Labs 
            </button>
          </div>
        </motion.div>

        <div className="xl:w-[72%] w-full overflow-hidden relative" style={{ maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)' }}>
          <div 
            className={`flex gap-4 lg:gap-6 py-4 animate-marquee-reverse ${isLabPaused ? 'pause-animation' : ''}`}
            style={{ width: "max-content" }}
            onMouseEnter={() => setIsLabPaused(true)}
            onMouseLeave={() => setIsLabPaused(false)}
          >
            {marqueeLabs.map((lab, index) => (
              <LabCard key={`lab-${index}`} lab={lab} index={index} variants={cardEntrance} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const DoctorCard = ({ doc, index, variants }) => {
  const navi = useNavigate();
  return (
    <motion.div 
      onClick={() => navi('/doctor_profile/'+doc.id)}
      custom={index % 6} initial="hidden" animate="visible" variants={variants}
      className="group w-[170px] h-[225px] lg:w-[240px] lg:h-[320px] bg-white/95 rounded-[20px] lg:rounded-[28px] overflow-hidden border border-white shadow-lg flex-shrink-0"
    >
      <div className="h-[55%] w-full relative overflow-hidden">
        <img src={doc.image} alt={doc.name} className="w-full h-full object-cover pointer-events-none group-hover:scale-110 transition-transform duration-700" />
        <div className="absolute top-2 right-2 lg:top-3 lg:right-3 bg-white/90 px-1.5 py-0.5 lg:px-2 lg:py-1 rounded-md lg:rounded-lg flex items-center gap-1 shadow-sm">
          <Star size={8} className="lg:size-[10px] fill-amber-400 text-amber-400" />
          <span className="text-[8px] lg:text-[10px] font-bold text-slate-800">{doc.rating}</span>
        </div>
      </div>
      <div className="h-[45%] p-3 lg:p-5 relative flex flex-col justify-between">
        <div className="absolute -top-4 lg:-top-6 left-3 lg:left-5">
          <div className="w-8 h-8 lg:w-12 lg:h-12 bg-white rounded-xl lg:rounded-2xl flex items-center justify-center border border-slate-100 shadow-xl text-blue-600">
            <Stethoscope size={16} className="lg:size-[22px]" />
          </div>
        </div>
        <div className="mt-4 lg:mt-5">
          <p className="text-[7px] lg:text-[9px] font-bold uppercase tracking-widest text-blue-600 mb-0.5 lg:mb-1">{doc.role}</p>
          <h3 className="text-[11px] lg:text-[15px] font-bold text-slate-900 leading-tight truncate">{doc.name}</h3>
          <p className="text-[9px] lg:text-[12px] text-slate-500 font-medium">{doc.dept}</p>
        </div>
        <div className="flex items-center gap-1 lg:gap-2 border-t border-slate-50 pt-2 lg:pt-3">
          <div className="w-1.5 h-1.5 lg:w-2 lg:h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-[7px] lg:text-[10px] text-emerald-600 font-bold uppercase tracking-tight">Available Today</span>
        </div>
      </div>
    </motion.div>
  );
};

const LabCard = ({ lab, index, variants }) => (
  <motion.div 
    custom={index % 5} initial="hidden" animate="visible" variants={variants}
    className="group w-[170px] h-[225px] lg:w-[240px] lg:h-[320px] bg-white/95 rounded-[20px] lg:rounded-[28px] overflow-hidden border border-white shadow-lg flex-shrink-0"
  >
    <div className="h-[55%] w-full relative overflow-hidden">
      <img src={lab.logo} alt={lab.name} className="w-full h-full object-cover pointer-events-none group-hover:scale-110 transition-transform duration-700" />
      <div className="absolute top-2 right-2 lg:top-3 lg:right-3 bg-white/90 px-1.5 py-0.5 lg:px-2 lg:py-1 rounded-md lg:rounded-lg flex items-center gap-1 shadow-sm">
        <ShieldCheck size={10} className="lg:size-[12px] text-emerald-500" />
        <span className="text-[7px] lg:text-[9px] font-bold text-slate-800 uppercase">Verified</span>
      </div>
    </div>
    <div className="h-[45%] p-3 lg:p-5 relative flex flex-col justify-between">
      <div className="absolute -top-4 lg:-top-6 left-3 lg:left-5">
        <div className="w-8 h-8 lg:w-12 lg:h-12 bg-white rounded-xl lg:rounded-2xl flex items-center justify-center border border-slate-100 shadow-xl text-indigo-600">
          <FlaskConical size={16} className="lg:size-[22px]" />
        </div>
      </div>
      <div className="mt-4 lg:mt-5">
        <p className="text-[7px] lg:text-[9px] font-bold uppercase tracking-widest text-indigo-600 mb-0.5 lg:mb-1">Lab Partner</p>
        <h3 className="text-[11px] lg:text-[15px] font-bold text-slate-900 leading-tight truncate">{lab.name}</h3>
        <div className="flex items-center gap-1 mt-0.5 lg:mt-1 text-slate-500">
          <MapPin size={10} className="lg:size-[12px]" />
          <p className="text-[9px] lg:text-[12px] truncate font-medium">{lab.location}</p>
        </div>
      </div>
      <div 
        className="w-full py-1.5 lg:py-2 rounded-lg lg:rounded-xl text-[8px] lg:text-[10px] font-bold flex items-center justify-center gap-1 lg:gap-2 transition-all cursor-pointer"
        style={{ backgroundColor: `${lab.color}15`, color: lab.color }}
      >
        View Profile <ArrowRight size={10} className="lg:size-[12px]" />
      </div>
    </div>
  </motion.div>
);

export default UnifiedMedicalPortal;