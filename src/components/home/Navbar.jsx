import { User, LogIn, MapPin, ChevronDown, Calendar, Edit, LogOut, Search, Menu, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import useApi from '../../functions/api';
import Cookies from 'js-cookie';

import React, { useState, useEffect, useRef } from "react";
import care2connect from '../../assets/login/pp.png';

// --- DEBOUNCE HOOK ---
function useDebounce(value, delay) {
    const [debouncedValue, setDebouncedValue] = useState(value);
    useEffect(() => {
        const handler = setTimeout(() => setDebouncedValue(value), delay);
        return () => clearTimeout(handler);
    }, [value, delay]);
    return debouncedValue;
}

const Navbar = () => {
    const { postapi, getapi } = useApi();
    const navigate = useNavigate();
    const token = Cookies.get('token');

    // --- NAVIGATION PILL STATES ---
    const [activeTab, setActiveTab] = useState("Home");
    const [pillStyle, setPillStyle] = useState({ left: 0, width: 0, opacity: 0 });
    const tabsRef = useRef([]);

    // --- SEARCHABLE LOCATION STATES ---
    const [location, setLocation] = useState("Detecting...");
    const [isSearching, setIsSearching] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const [isLoadingLoc, setIsLoadingLoc] = useState(false);
    const debouncedSearch = useDebounce(searchQuery, 500);

    // --- PROFILE & EDIT FORM STATES ---
    const [isOpen, setIsOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); 
    const [showEditForm, setShowEditForm] = useState(false);
    const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
    const dropdownRef = useRef(null);
    const [formData, setFormData] = useState({
        name: 'John Doe', dob: '1990-01-01', gender: 'Male',
        address: '123 Main Street, City, Country', phone: '+91 98765 43210', role: 'patient'
    });

    // 1. PILL ANIMATION LOGIC
    useEffect(() => {
        const currentTab = tabsRef.current.find((ref) => ref && ref.innerText.toUpperCase() === activeTab.toUpperCase());
        if (currentTab) {
            setPillStyle({ left: currentTab.offsetLeft, width: currentTab.offsetWidth, opacity: 1 });
        }
    }, [activeTab, isMobileMenuOpen]);

    // 2. AUTOMATIC INITIAL LOCATION
    useEffect(() => {
        const savedLoc = localStorage.getItem("location");
        if (savedLoc) {
            const loc = JSON.parse(savedLoc);
            setLocation(loc.name.split(',')[0]);
        } else if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(async (pos) => {
                try {
                    const res = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${pos.coords.latitude}&lon=${pos.coords.longitude}&format=json`);
                    const data = await res.json();
                    const city = data.address.city || data.address.town || "Unknown";
                    setLocation(city);
                } catch (e) { setLocation("Bhopal, MP"); }
            }, () => setLocation("Bhopal, MP"));
        }
    }, []);

    // 3. REAL-TIME LOCATION SEARCH
    useEffect(() => {
        if (debouncedSearch.length > 2) {
            setIsLoadingLoc(true);
            fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${debouncedSearch}&limit=5`)
                .then(res => res.json())
                .then(data => {
                    setSuggestions(data);
                    setIsLoadingLoc(false);
                })
                .catch(() => setIsLoadingLoc(false));
        } else {
            setSuggestions([]);
        }
    }, [debouncedSearch]);

    const selectLocation = (loc) => {
        const cityName = loc.display_name.split(',')[0];
        setLocation(cityName);
        localStorage.setItem("location", JSON.stringify({ lat: loc.lat, lng: loc.lon, name: loc.display_name }));
        setSearchQuery("");
        setIsSearching(false);
    };

    // 4. PROFILE LOGIC
    const getuser = async () => {
        try {
            const response = await getapi('/profile');
            setFormData({
                name: response.data.name || 'John Doe',
                dob: response.data.dateOfBirth || '1990-01-01',
                address: response.data.address || '123 Main Street, City, Country',
                gender: response.data.gender || "Male",
                phone: response.data.phone || '+91 98765 43210',
                role: response.data.role || 'patient',
            });
        } catch (error) { console.error('Error fetching profile:', error); }
    };

    const toggleDropdown = async () => {
        if (!isOpen) await getuser();
        setIsOpen(!isOpen);
        setShowEditForm(false);
    };

    const handleLogout = () => {
        Cookies.remove('token');
        setIsOpen(false);
        window.location.reload();
    };

    const Updateuser = async (data) => {
        try {
            await postapi('/update_profile', { name: data.name, dateOfBirth: data.dob, address: data.address, gender: data.gender });
            setShowEditForm(false);
            setIsOpen(false);
        } catch (error) { console.error(error); }
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
                setIsSearching(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const navItems = ["Home", "About", "Services", "Contact"];

    return (
        <>
            <style>
                {`@keyframes buttonPulse { 0% { box-shadow: 0 0 0 0 rgba(255, 255, 255, 0.7); } 70% { box-shadow: 0 0 0 10px rgba(255, 255, 255, 0); } 100% { box-shadow: 0 0 0 0 rgba(255, 255, 255, 0); } }
                .animate-buttonPulse { animation: buttonPulse 2s infinite; }
                .no-scrollbar::-webkit-scrollbar { display: none; }`}
            </style>

            <nav className="fixed top-0 left-0 w-full h-[70px] z-[1000] flex items-center justify-center bg-[#002570] backdrop-blur-md border-b border-white/10 shadow-lg text-white select-none">
                <div className="w-full max-w-[1400px] px-5 md:px-10 grid grid-cols-[auto_1fr_auto] items-center h-full relative overflow-visible">
                    
                    {/* LEFT: Logo */}
                    <div className="flex items-center">
                        <img src={care2connect} alt="Logo" className="h-[48px] md:h-[58px] cursor-pointer shrink-0" onClick={() => navigate('/')} />
                    </div>

                    {/* CENTER: Location and Desktop Nav */}
                    <div className="flex items-center justify-center">
                        <div 
                            className={`flex items-center gap-[8px] bg-white/10 backdrop-blur-[15px] py-[6px] px-3 rounded-full border border-white/20 transition-all duration-300 z-[1002] 
                            ${isSearching ? "w-[200px] md:w-[280px] bg-[#002570]/90 shadow-2xl" : "w-auto cursor-pointer hover:bg-white/20"}`}
                            onClick={() => setIsSearching(true)}
                        >
                            {isSearching ? <Search className="w-3 h-3 text-white opacity-80" /> : <MapPin className="w-3 h-3 text-white opacity-80" />}

                            {isSearching ? (
                                <input autoFocus className="bg-transparent border-none outline-none text-white text-[10px] w-full font-bold uppercase tracking-[0.5px] placeholder:text-white/50" placeholder="SEARCH..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
                            ) : (
                                <span className="text-[9px] md:text-[10px] font-bold text-white tracking-[0.5px] uppercase whitespace-nowrap">{location}</span>
                            )}

                            {isSearching && (searchQuery.length > 2 || isLoadingLoc) && (
                                <ul className="absolute top-11 left-1/2 -translate-x-1/2 w-full max-w-[280px] bg-[#001b52] rounded-[15px] border border-white/10 py-2 shadow-2xl max-h-60 overflow-y-auto no-scrollbar">
                                    {isLoadingLoc ? <li className="px-4 py-2 text-[10px] text-white/60 animate-pulse">Searching areas...</li> : suggestions.map(s => (
                                        <li key={s.place_id} onMouseDown={() => selectLocation(s)} className="px-4 py-2 text-[10px] font-semibold text-white cursor-pointer uppercase hover:bg-white/10 border-b border-white/5 last:border-0 leading-tight">{s.display_name}</li>
                                    ))}
                                </ul>
                            )}
                        </div>

                        {/* DESKTOP ONLY: Navigation Pill */}
                        <div className="hidden lg:flex relative items-center bg-white/5 px-1 py-1 rounded-full border border-white/10 backdrop-blur-[5px] ml-5">
                            <div className="absolute top-1 bottom-1 bg-white rounded-full transition-all duration-500"
                                style={{ left: `${pillStyle.left}px`, width: `${pillStyle.width}px`, opacity: pillStyle.opacity }} />
                            {navItems.map((item, index) => (
                                <div key={item} ref={(el) => (tabsRef.current[index] = el)} onClick={() => { setActiveTab(item); navigate(item === 'Home' ? '/' : `/${item.toLowerCase()}`); }}
                                    className={`relative z-[2] px-6 py-2 text-[13px] font-semibold cursor-pointer transition-colors duration-300 ${activeTab === item ? "text-[#002570]" : "text-white"}`}>
                                    {item}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* RIGHT: Profile & Burger (Always Right Aligned) */}
                    <div className="flex justify-end items-center gap-2 md:gap-3 relative" ref={dropdownRef}>
                        {token ? (
                            <div className="relative">
                                <button onClick={toggleDropdown} className="p-2 md:p-3 bg-white rounded-full text-[#002570] shadow-lg hover:scale-105 transition-transform">
                                    <User size={16} className="md:w-[18px] md:h-[18px]" />
                                </button>

                                {/* DROPDOWN MENU */}
                                <div className={`absolute top-[55px] right-0 w-[260px] md:w-80 bg-white rounded-2xl shadow-2xl z-[2000] p-4 md:p-5 border border-gray-100 transition-all duration-300 transform ${isOpen ? 'scale-100 opacity-100 visible' : 'scale-95 opacity-0 invisible'}`}>
                                    {!showEditForm ? (
                                        <>
                                            <div className="pb-3 mb-3 border-b border-gray-100 text-[#002570]">
                                                <p className="font-extrabold text-base md:text-xl mb-1 truncate">Hi, {formData.name}</p>
                                                <p className="text-[10px] md:text-[12px] opacity-70 font-medium truncate">📞 {formData.phone}</p>
                                                <p className="text-[10px] md:text-[12px] opacity-70 truncate font-medium">📍 {formData.address}</p>
                                            </div>
                                            <ul className="list-none p-0 m-0 space-y-1">
                                                <li onClick={() => { navigate('/list'); setIsOpen(false); }} className="flex items-center space-x-3 text-blue-600 p-2 rounded-xl hover:bg-blue-50 cursor-pointer transition-all">
                                                    <Calendar size={14} /> <span className="text-xs md:text-sm font-bold">My Appointments</span>
                                                </li>
                                                <li onClick={() => setShowEditForm(true)} className="flex items-center space-x-3 text-blue-600 p-2 rounded-xl hover:bg-blue-50 cursor-pointer transition-all">
                                                    <Edit size={14} /> <span className="text-xs md:text-sm font-bold">Edit Account</span>
                                                </li>
                                                <li onClick={() => setShowLogoutConfirm(!showLogoutConfirm)} className="flex items-center space-x-3 text-red-600 p-2 rounded-xl hover:bg-red-50 cursor-pointer border-t mt-2 pt-2">
                                                    <LogOut size={14} /> <span className="text-xs md:text-sm font-bold">Logout</span>
                                                </li>
                                            </ul>
                                        </>
                                    ) : (
                                        <div className="text-[#002570]">
                                            <h4 className="font-black text-[10px] mb-3 border-b pb-1 uppercase tracking-tighter">Settings</h4>
                                            <div className="space-y-2">
                                                <input className="w-full p-2 bg-gray-50 border-none rounded-lg text-[10px] font-bold outline-none" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
                                                <textarea className="w-full p-2 bg-gray-50 border-none rounded-lg text-[10px] font-bold h-14 resize-none" value={formData.address} onChange={(e) => setFormData({ ...formData, address: e.target.value })} />
                                            </div>
                                            <div className="flex gap-2 mt-4">
                                                <button onClick={() => setShowEditForm(false)} className="flex-1 py-2 text-[9px] font-black uppercase hover:bg-gray-100 rounded-lg">Back</button>
                                                <button onClick={() => Updateuser(formData)} className="flex-1 bg-[#002570] text-white py-2 rounded-lg text-[9px] font-black uppercase shadow-md">Save</button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ) : (
                            <button onClick={() => navigate('/signup')} className="px-4 py-2 rounded-full bg-white text-[#002570] font-extrabold text-[9px] md:text-[11px] animate-buttonPulse">LOGIN</button>
                        )}

                        <button onClick={() => setIsMobileMenuOpen(true)} className="lg:hidden p-2 text-white bg-white/10 rounded-lg">
                            <Menu size={20} />
                        </button>
                    </div>

                    {/* MOBILE OVERLAP MENU */}
                    <div className={`fixed inset-0 bg-[#002570] z-[1500] flex items-center justify-center transition-transform duration-300 lg:hidden ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                        {/* Smaller Close Button */}
                        <button onClick={() => setIsMobileMenuOpen(false)} className="absolute right-5 top-5 p-1.5 text-white bg-white/10 rounded-full">
                            <X size={18} />
                        </button>
                        
                        {/* Compact Nav Pill Overlay */}
                        <div className="relative flex items-center bg-white/5 px-0.5 py-0.5 rounded-full border border-white/10 shadow-2xl">
                            <div className="absolute top-0.5 bottom-0.5 bg-white rounded-full transition-all duration-500"
                                style={{ left: `${pillStyle.left}px`, width: `${pillStyle.width}px`, opacity: pillStyle.opacity }} />
                            {navItems.map((item, index) => (
                                <div key={item} ref={(el) => { if(isMobileMenuOpen) tabsRef.current[index] = el }} 
                                     onClick={() => { setActiveTab(item); setIsMobileMenuOpen(false); navigate(item === 'Home' ? '/' : `/${item.toLowerCase()}`); }}
                                     className={`relative z-[2] px-4 py-1.5 text-[10px] font-black uppercase cursor-pointer transition-colors duration-300 ${activeTab === item ? "text-[#002570]" : "text-white"}`}>
                                    {item}
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            </nav>
        </>
    );
};

export default Navbar;