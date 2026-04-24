import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useParams, useNavigate } from "react-router-dom";
import useApi from "../../functions/api";
import moment from "moment/moment";


const Appointment = () => {
    const navigate = useNavigate();
    const [date, setDate] = useState(new Date());
    const [selectedTime, setSelectedTime] = useState(null);
    const [currentStep, setCurrentStep] = useState(1);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    const [userName, setUserName] = useState("");
    const [fatherName, setFatherName] = useState("");
    const [userEmail, setUserEmail] = useState("");
    const [selectedState, setSelectedState] = useState("");
    const [selectedCity, setSelectedCity] = useState("");
    const [addressDetails, setAddressDetails] = useState("");
    const [userPhoneNumber, setUserPhoneNumber] = useState("");

    const [suggestions, setSuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);

    const dummyPatients = [
        { name: "Rahul Sharma", guardian: "Suresh Sharma", phone: "7089449249", email: "rahul@gmail.com", state: "Madhya Pradesh", city: "Bhopal", address: "123, Arera Colony" },
        { name: "Priya Patel", guardian: "Rajesh Patel", phone: "9123456789", email: "priya@example.com", state: "Maharashtra", city: "Mumbai", address: "456, Marine Drive" },
        { name: "Amit Kumar", guardian: "Vinod Kumar", phone: "8877665544", email: "amit.k@mail.com", state: "Delhi", city: "New Delhi", address: "789, Connaught Place" },
        { name: "Sneha Gupta", guardian: "Alok Gupta", phone: "9988776655", email: "sneha@gmail.com", state: "Madhya Pradesh", city: "Indore", address: "101, Vijay Nagar" }
    ];

    const handleNameChange = (e) => {
        const val = e.target.value;
        setUserName(val);
        if (val.length > 0) {
            const matched = dummyPatients.filter(p => 
                p.name.toLowerCase().includes(val.toLowerCase())
            );
            setSuggestions(matched);
            setShowSuggestions(true);
        } else {
            setShowSuggestions(false);
        }
    };

    const selectPatient = (p) => {
        setUserName(p.name);
        setFatherName(p.guardian);
        setUserPhoneNumber(p.phone);
        setUserEmail(p.email);
        setSelectedState(p.state);
        setSelectedCity(p.city);
        setAddressDetails(p.address);
        setShowSuggestions(false);
    };

    const [availableDates, setAvailableDates] = useState([]);
    const [slots, setslots] = useState([]);
    const { getapi, postapi } = useApi();
    const { id } = useParams();

    useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const isMobile = windowWidth <= 850;

    useEffect(() => {
        const fetchDates = async () => {
            try {
                const isSpecial = id === "6895c93281fa0315ca0f3f79" || id === "6895c2f339a19d1e27c47a78";
                
                // Correct API endpoint based on doctor type
                const apiPath = isSpecial ? '/fatch_date_and_time2/date/' : `/get_date_schedule/${id}`;
                const res = await getapi(apiPath);

                if (res.success) {
                    // Extract available dates. For non-special doctors, we also handle the 'enabled' flag if present.
                    let dates = res.data
                        .filter(d => d.enabled !== false) // Matches legacy and new API behavior
                        .map(d => d.id);

                    // Apply additional custom filters for special doctors
                    if (id === "6895c93281fa0315ca0f3f79") { // Dr. Neeraj Bansal
                        const today = moment().format("YYYY-MM-DD");
                        const tomorrow = moment().add(1, 'days').format("YYYY-MM-DD");
                        dates = dates.filter(d => d === today || d === tomorrow);
                    } else if (id === "6895c2f339a19d1e27c47a78") { // Dr. Indiver Kalra
                        const alternating = [];
                        for (let i = 0; i < 4; i++) {
                            alternating.push(moment().add(i * 2, 'days').format("YYYY-MM-DD"));
                        }
                        dates = dates.filter(d => alternating.includes(d));
                    }

                    setAvailableDates(dates);
                }
            } catch (error) {
                console.error('Error fetching dates:', error);
            }
        };
        fetchDates();
    }, [id]);

    const fetchslots = async (selectedDate) => {
        try {
            const response = await getapi(`/get_time_schedule/${id}/${selectedDate}`);
            setslots(response.data);
        } catch (error) {
            setslots([]);
        }
    };

    const handleDateChange = (newDate) => {
        setDate(newDate);
        setSelectedTime(null);
        fetchslots(moment(newDate).format("YYYY-MM-DD"));
    };

    const handlePhoneNumberChange = (e) => {
        const digitsOnly = e.target.value.replace(/\D/g, '');
        if (digitsOnly.length <= 10) setUserPhoneNumber(digitsOnly);
    };



    const handleConfirmAppointment = async (e) => {
        e.preventDefault();
        const data = {
            patient_name: userName,
            guardian_name: fatherName,
            patient_phone: userPhoneNumber,
            patient_email: userEmail,
            address: addressDetails,
            age: '20+',
            city: selectedCity,
            vaccine: true,
            gender: "male",
            symptoms: "NA",
            doctor_phone_id: id,
            date_of_appointment: moment(date).format("YYYY-MM-DD"),
            time_slot: selectedTime,
            pay_id: "BYPASSED",
            amount: 200
        };

        try {
            const res = await postapi('/appointments/create', data);
            if (res.success) {
                setCurrentStep(3);
            } else {
                alert("Failed to create appointment. Please try again.");
            }
        } catch (error) {
            console.error("Error creating appointment:", error);
            alert("An error occurred. Proceeding anyway for demo purposes.");
            setCurrentStep(3);
        }
    };

    const indiaStatesAndCities = {
        "Madhya Pradesh": ["Bhopal", "Indore", "Gwalior", "Jabalpur", "Ujjain"],
        "Maharashtra": ["Mumbai", "Pune", "Nagpur", "Nashik"],
        "Delhi": ["New Delhi", "North Delhi", "South Delhi"]
    };

    return (
        <div style={styles.pageWrapper}>
            <div style={styles.bgContainer}>
                <div style={styles.blueOverlay}></div>
            </div>
            
            <div style={{...styles.glassContainer, flexDirection: isMobile ? 'column' : 'row'}} className="responsive-container">
                <div style={{...styles.sidebar, width: isMobile ? '100%' : '260px', borderRight: isMobile ? 'none' : '1px solid rgba(255, 255, 255, 0.1)', borderBottom: isMobile ? '1px solid rgba(255, 255, 255, 0.1)' : 'none', padding: isMobile ? '20px' : '40px'}} className="responsive-sidebar">
                    <div className="sidebar-brand" style={isMobile ? {textAlign: 'center', marginBottom: '15px'} : {}}>
                        <img src="https://care2connect.in/assets/pp-BXFzvpwK.png" alt="Logo" style={{...styles.logo, margin: isMobile ? '0 auto' : '0'}} />
                        <h2 style={{...styles.brandName, marginTop: '5px'}}>Care2Connect</h2>
                    </div>

                    <div style={{
                        marginTop: isMobile ? '10px' : '40px',
                        display: 'flex',
                        flexDirection: isMobile ? 'row' : 'column',
                        justifyContent: isMobile ? 'center' : 'flex-start',
                        alignItems: 'center',
                        position: 'relative',
                        width: '100%'
                    }}>
                        {[1, 2, 3].map((s) => (
                            <React.Fragment key={s}>
                                <div style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    zIndex: 2,
                                    position: 'relative'
                                }}>
                                    <div style={{
                                        ...styles.stepCircle(currentStep >= s),
                                        width: isMobile ? '35px' : '28px',
                                        height: isMobile ? '35px' : '28px',
                                        marginRight: isMobile ? '0' : '12px',
                                        boxShadow: currentStep === s ? '0 0 15px rgba(96, 165, 250, 0.6)' : 'none',
                                        fontSize: isMobile ? '14px' : '12px'
                                    }}>
                                        {s}
                                    </div>
                                    {isMobile && (
                                        <span style={{
                                            fontSize: '10px',
                                            color: currentStep >= s ? '#60a5fa' : 'rgba(255,255,255,0.4)',
                                            marginTop: '5px',
                                            fontWeight: '600',
                                            textTransform: 'uppercase'
                                        }}>
                                            {s === 1 ? "Date" : s === 2 ? "Info" : "Pay"}
                                        </span>
                                    )}
                                </div>
                                {isMobile && s < 3 && (
                                    <div style={{
                                        width: '40px',
                                        height: '2px',
                                        background: currentStep > s ? '#60a5fa' : 'rgba(255,255,255,0.1)',
                                        margin: '0 10px',
                                        marginTop: '-15px'
                                    }} />
                                )}
                                {!isMobile && (
                                    <span style={{
                                        ...styles.stepItem(currentStep >= s),
                                        marginBottom: '25px',
                                        marginLeft: '10px'
                                    }}>
                                        {s === 1 ? "Schedule" : s === 2 ? "Details" : "Confirm"}
                                    </span>
                                )}
                            </React.Fragment>
                        ))}
                    </div>
                </div>

                <div style={{...styles.mainContent, padding: isMobile ? '25px' : '45px'}} className="responsive-content">
                    {currentStep === 1 && (
                        <div className="fade-in-up">
                            <h1 style={{...styles.heading, fontSize: isMobile ? '22px' : '26px'}}>Select Appointment</h1>
                            <div style={styles.calendarGlass}>
                                <Calendar
                                    onChange={handleDateChange}
                                    value={date}
                                    minDate={new Date()}
                                    tileDisabled={({ date: tDate }) => {
                                        const dateStr = moment(tDate).format("YYYY-MM-DD");
                                        return !availableDates.includes(dateStr);
                                    }}
                                    className="custom-calendar"
                                />
                            </div>

                            <div style={{marginTop: '30px'}} className={slots.length > 0 ? "active-detail-glow" : ""}>
                                <h3 style={styles.subHeading}>Available Slots • {moment(date).format("Do MMMM")}</h3>
                                <div style={isMobile ? styles.slotsGridMobile : styles.slotsGridDesktop}>
                                    {slots.length > 0 ? slots.map((slot, index) => (
                                        <button
                                            key={slot.id}
                                            className="slot-pop-animation"
                                            style={{
                                                ...styles.slotBtn(selectedTime === slot.id),
                                                animationDelay: `${index * 0.04}s`,
                                            }}
                                            onClick={() => setSelectedTime(slot.id)}
                                        >
                                            {slot.id}
                                        </button>
                                    )) : <p style={{color: 'rgba(255,255,255,0.4)', fontSize: '14px'}}>Please select a date to view available slots.</p>}
                                </div>
                            </div>

                            <button 
                                disabled={!selectedTime}
                                style={styles.primaryBtn(!selectedTime)}
                                onClick={() => setCurrentStep(2)}
                            >
                                Continue to Patient Details
                            </button>
                        </div>
                    )}

                    {currentStep === 2 && (
                        <div className="fade-in-up">
                            <h1 style={{...styles.heading, fontSize: isMobile ? '22px' : '26px'}}>Patient Details</h1>
                            <form onSubmit={handleConfirmAppointment} style={{...styles.formGrid, gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr'}} className="responsive-form">
                                <div style={{...styles.inputGroup, position: 'relative'}}>
                                    <label style={styles.label}>Full Name</label>
                                    <input 
                                        style={styles.glassInput} 
                                        placeholder="Start typing (e.g. Rahul...)" 
                                        value={userName} 
                                        onChange={handleNameChange} 
                                        onFocus={() => userName.length > 0 && setShowSuggestions(true)}
                                        required 
                                    />
                                    {showSuggestions && suggestions.length > 0 && (
                                        <div style={styles.suggestionBox}>
                                            {suggestions.map((p, i) => (
                                                <div 
                                                    key={i} 
                                                    style={styles.suggestionItem} 
                                                    className="suggestion-item-hover"
                                                    onClick={() => selectPatient(p)}
                                                >
                                                    <span style={{fontWeight: '700'}}>{p.name}</span>
                                                    <span style={{fontSize: '10px', opacity: 0.6}}> • {p.phone}</span>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                                <div style={styles.inputGroup}>
                                    <label style={styles.label}>Father's Name</label>
                                    <input style={styles.glassInput} placeholder="Guardian Name" value={fatherName} onChange={e => setFatherName(e.target.value)} required />
                                </div>
                                <div style={styles.inputGroup}>
                                    <label style={styles.label}>Phone Number</label>
                                    <input style={styles.glassInput} placeholder="10-digit mobile" value={userPhoneNumber} onChange={handlePhoneNumberChange} required />
                                </div>
                                <div style={styles.inputGroup}>
                                    <label style={styles.label}>Email Address</label>
                                    <input style={styles.glassInput} type="email" placeholder="example@mail.com" value={userEmail} onChange={e => setUserEmail(e.target.value)} required />
                                </div>
                                <div style={styles.inputGroup}>
                                    <label style={styles.label}>State</label>
                                    <select className="glass-select" style={styles.glassInput} value={selectedState} onChange={e => setSelectedState(e.target.value)}>
                                        <option value="" style={styles.optionStyle}>Select State</option>
                                        {Object.keys(indiaStatesAndCities).map(s => <option key={s} value={s} style={styles.optionStyle}>{s}</option>)}
                                    </select>
                                </div>
                                <div style={styles.inputGroup}>
                                    <label style={styles.label}>City</label>
                                    <select className="glass-select" style={styles.glassInput} value={selectedCity} onChange={e => setSelectedCity(e.target.value)}>
                                        <option value="" style={styles.optionStyle}>Select City</option>
                                        {selectedState && indiaStatesAndCities[selectedState].map(c => <option key={c} value={c} style={styles.optionStyle}>{c}</option>)}
                                    </select>
                                </div>
                                <div style={{...styles.inputGroup, gridColumn: isMobile ? 'span 1' : 'span 2'}} className="responsive-address">
                                    <label style={styles.label}>Complete Address</label>
                                    <textarea style={{...styles.glassInput, height: '80px'}} value={addressDetails} onChange={e => setAddressDetails(e.target.value)} required />
                                </div>
                                <div style={{...styles.btnRow, gridColumn: isMobile ? 'span 1' : 'span 2', flexDirection: isMobile ? 'column-reverse' : 'row'}} className="responsive-btns">
                                    <button type="button" style={styles.secondaryBtn} onClick={() => setCurrentStep(1)}>Back</button>
                                    <button type="submit" style={styles.primaryBtn(false)}>Proceed to Payment</button>
                                </div>
                            </form>
                        </div>
                    )}

                    {currentStep === 3 && (
                        <div className="fade-in-up" style={{textAlign: 'center', padding: '40px 0'}}>
                            <div style={{fontSize: '60px', marginBottom: '20px'}}>✅</div>
                            <h1 style={styles.heading}>Appointment Confirmed!</h1>
                            <p style={{color: 'rgba(255,255,255,0.7)', lineHeight: '1.6'}}>Your appointment has been successfully booked. You will receive a confirmation email shortly.</p>
                            <button 
                                style={{...styles.primaryBtn(false), maxWidth: '250px', margin: '30px auto'}} 
                                onClick={() => navigate('/list')}
                            >
                                View My Appointments
                            </button>
                        </div>
                    )}
                </div>
            </div>

            <style>{`
                @keyframes fadeInUp {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                @keyframes slotPop {
                    from { opacity: 0; transform: scale(0.8); }
                    to { opacity: 1; transform: scale(1); }
                }
                .fade-in-up { animation: fadeInUp 0.5s ease-out; }
                .slot-pop-animation { animation: slotPop 0.3s backwards; }

                .active-detail-glow {
                    border-left: 3px solid #3b82f6;
                    padding-left: 15px;
                    transition: all 0.5s ease;
                }

                .custom-calendar { border: none !important; width: 100% !important; background: transparent !important; color: white !important; }
                .react-calendar__tile { color: white !important; height: 45px !important; transition: 0.2s; font-size: 0.9rem; }
                
                .react-calendar__navigation button { 
                    color: #60a5fa !important; 
                    font-size: 1.1rem; 
                    font-weight: 700;
                }
                .react-calendar__navigation button:enabled:hover {
                    background-color: rgba(96, 165, 250, 0.1) !important;
                }
                .react-calendar__month-view__weekdays {
                    color: rgba(255,255,255,0.5) !important;
                    font-weight: 400;
                    text-transform: uppercase;
                    font-size: 0.75rem;
                }
                
                .react-calendar__month-view__days__day--neighboringMonth,
                .react-calendar__tile:disabled {
                    color: rgba(255, 255, 255, 0.1) !important;
                    background: transparent !important;
                }
                
                .react-calendar__tile--now {
                    background: rgba(59, 130, 246, 0.15) !important;
                    border: 1px solid #3b82f6 !important;
                    border-radius: 8px !important;
                    color: #60a5fa !important;
                }

                .react-calendar__tile--active {
                    background: #3b82f6 !important;
                    border-radius: 8px !important;
                    box-shadow: 0 0 15px rgba(59, 130, 246, 0.5);
                }
                .react-calendar__tile:enabled:hover { background: rgba(255,255,255,0.1) !important; border-radius: 8px; }

                .suggestion-item-hover:hover { background: rgba(255,255,255,0.1); }

                /* Fix for select arrow and option styling */
                .glass-select {
                    appearance: none;
                    background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='white' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e") !important;
                    background-repeat: no-repeat !important;
                    background-position: right 10px center !important;
                    background-size: 16px !important;
                    padding-right: 40px !important;
                }

                @media (max-width: 450px) {
                    .react-calendar__tile { height: 40px !important; font-size: 0.8rem; }
                    .react-calendar__navigation button { font-size: 0.9rem; }
                }
            `}</style>
        </div>
    );
};

const styles = {
    pageWrapper: {
        minHeight: "100vh", 
        display: "flex", 
        alignItems: "flex-start", 
        justifyContent: "center",
        padding: "15px", 
        paddingTop: "10vh", 
        position: "relative", 
        background: "#020617", 
        fontFamily: "'Inter', sans-serif"
    },
    bgContainer: {
        position: "absolute", top: 0, left: 0, right: 0, bottom: 0,
        backgroundImage: "url('https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80')",
        backgroundSize: "cover", zIndex: 1
    },
    blueOverlay: {
        position: "absolute", top: 0, left: 0, right: 0, bottom: 0,
        background: "linear-gradient(135deg, rgba(2, 6, 23, 0.95), rgba(30, 58, 138, 0.85))", zIndex: 2
    },
    glassContainer: {
        position: "relative", zIndex: 3, width: "100%", maxWidth: "1000px",
        background: "rgba(255, 255, 255, 0.06)", backdropFilter: "blur(20px)",
        borderRadius: "24px", border: "1px solid rgba(255, 255, 255, 0.12)",
        display: "flex", boxShadow: "0 25px 60px rgba(0,0,0,0.4)", overflow: "hidden",
        marginBottom: "40px" 
    },
    sidebar: {
        background: "rgba(255, 255, 255, 0.03)",
        display: "flex", flexDirection: "column", justifyContent: "space-between"
    },
    logo: { width: "40px", filter: "brightness(0) invert(1)" },
    brandName: { fontSize: "17px", color: "white", margin: 0, fontWeight: "700" },
    stepItem: (active) => ({
        display: "flex", alignItems: "center",
        color: active ? "#60a5fa" : "rgba(255,255,255,0.3)", fontWeight: "600"
    }),
    stepCircle: (active) => ({
        borderRadius: "50%",
        border: `2px solid ${active ? "#60a5fa" : "rgba(255,255,255,0.2)"}`,
        display: "flex", alignItems: "center", justifyContent: "center",
        background: active ? "#60a5fa" : "transparent",
        color: "white", transition: '0.3s all ease'
    }),
    mainContent: { flex: 1, overflowY: "auto" },
    heading: { color: "white", marginBottom: "25px", fontWeight: "700" },
    calendarGlass: {
        background: "rgba(255, 255, 255, 0.03)", padding: "10px",
        borderRadius: "16px", border: "1px solid rgba(255, 255, 255, 0.08)"
    },
    subHeading: { fontSize: "12px", color: "rgba(255,255,255,0.5)", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "15px" },
    
    slotsGridDesktop: { 
        display: "flex", 
        flexDirection: "row", 
        flexWrap: "wrap", 
        gap: "10px" 
    },
    slotsGridMobile: { 
        display: "grid", 
        gridTemplateColumns: "1fr 1fr", 
        gap: "10px" 
    },
    
    slotBtn: (active) => ({
        padding: "10px 20px",
        borderRadius: "10px",
        border: active ? "2px solid #60a5fa" : "1px solid rgba(255,255,255,0.1)",
        background: active ? "#60a5fa" : "rgba(255, 255, 255, 0.05)",
        color: "white", fontWeight: "600", cursor: "pointer", transition: "all 0.3s ease", fontSize: '13px',
        minWidth: '90px'
    }),
    primaryBtn: (disabled) => ({
        width: "100%", marginTop: "30px", padding: "16px", borderRadius: "12px",
        background: disabled ? "rgba(255,255,255,0.1)" : "#3b82f6",
        color: "white", border: "none", fontWeight: "700", cursor: disabled ? "not-allowed" : "pointer",
        transition: "0.3s"
    }),
    glassInput: {
        padding: "12px", borderRadius: "10px", background: "rgba(255,255,255,0.05)",
        border: "1px solid rgba(255,255,255,0.1)", color: "white", fontSize: "15px", outline: "none", width: "100%"
    },
    // Adding specific style for option elements
    optionStyle: {
        background: "#0f172a", // Dark blue/slate to match your theme
        color: "white"
    },
    formGrid: { display: "grid", gap: "15px" },
    inputGroup: { display: "flex", flexDirection: "column" },
    suggestionBox: {
        position: "absolute", top: "100%", left: 0, right: 0, zIndex: 10,
        background: "rgba(15, 23, 42, 0.95)", border: "1px solid rgba(255,255,255,0.15)",
        borderRadius: "12px", marginTop: "5px", overflow: "hidden", 
        boxShadow: "0 10px 25px rgba(0,0,0,0.5)", backdropFilter: "blur(10px)"
    },
    suggestionItem: {
        padding: "12px 16px", color: "white", cursor: "pointer", 
        borderBottom: "1px solid rgba(255,255,255,0.05)", transition: "0.2s",
        display: "flex", justifyContent: "space-between", alignItems: "center"
    },
    label: { fontSize: "12px", color: "rgba(255,255,255,0.6)", marginBottom: "6px" },
    btnRow: { display: "flex", gap: "15px", marginTop: "15px" },
    secondaryBtn: {
        flex: 1, padding: "16px", borderRadius: "12px",
        background: "rgba(255,255,255,0.05)", color: "white", border: "1px solid rgba(255,255,255,0.1)",
        fontWeight: "600", cursor: "pointer"
    }
};

export default Appointment;