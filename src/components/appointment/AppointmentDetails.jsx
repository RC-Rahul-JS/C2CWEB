import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useApi from "../../functions/api";
import moment from "moment";

const AppointmentDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { getapi } = useApi();
    const [appointment, setAppointment] = useState(null);
    const [loading, setLoading] = useState(true);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);
        
        const fetchDetails = async () => {
            setLoading(true);
            let found = null;
            
            try {
                // 1. Try fetching the specific appointment directly
                const res = await getapi(`/appointments/get/${id}`);
                if (res.success && res.data && !Array.isArray(res.data)) {
                    found = res.data;
                }
            } catch (error) {
                console.warn("Direct fetch failed, trying list fallback...", error);
            }

            // 2. If not found yet, try fetching the full list and filtering
            if (!found) {
                try {
                    const listRes = await getapi('/appointments/get');
                    if (listRes.success && Array.isArray(listRes.data)) {
                        found = listRes.data.find(a => String(a.id || a._id) === String(id));
                    }
                } catch (error) {
                    console.error("List fallback also failed:", error);
                }
            }

            setAppointment(found);
            setLoading(false);
        };

        fetchDetails();
        return () => window.removeEventListener('resize', handleResize);
    }, [id]);

    const isMobile = windowWidth <= 850;

    if (loading) {
        return (
            <div style={styles.pageWrapper}>
                <div style={styles.bgContainer}><div style={styles.blueOverlay}></div></div>
                <div style={{...styles.loadingText, zIndex: 3, textAlign: 'center'}}>
                    <div className="spinner"></div>
                    <p>Fetching Appointment Details...</p>
                </div>
            </div>
        );
    }

    if (!appointment) {
        return (
            <div style={styles.pageWrapper}>
                <div style={styles.bgContainer}><div style={styles.blueOverlay}></div></div>
                <div style={styles.glassContainer}>
                    <h2 style={{color: 'white', textAlign: 'center'}}>Appointment Not Found</h2>
                    <p style={{color: 'rgba(255,255,255,0.5)', textAlign: 'center', marginBottom: '20px'}}>The requested appointment ID could not be retrieved.</p>
                    <button style={styles.primaryBtn} onClick={() => navigate('/list')}>Back to Appointments</button>
                </div>
            </div>
        );
    }

    return (
        <div style={styles.pageWrapper}>
            <div style={styles.bgContainer}>
                <div style={styles.blueOverlay}></div>
            </div>

            <div style={{...styles.glassContainer, maxWidth: '800px'}} className="fade-in-up">
                <div style={styles.header}>
                    <button style={styles.iconBtn} onClick={() => navigate('/list')}>←</button>
                    <h1 style={styles.heading}>Appointment Details</h1>
                    <div style={styles.statusBadge}>{(appointment.status || "UPCOMING").toUpperCase()}</div>
                </div>

                <div style={styles.contentGrid}>
                    {/* Patient Information Section */}
                    <div style={styles.section}>
                        <h2 style={styles.sectionTitle}>👤 Patient Identity</h2>
                        <div style={styles.infoRow}>
                            <InfoItem label="Full Name" value={appointment.patient_name} />
                            <InfoItem label="Guardian's Name" value={appointment.guardian_name} />
                        </div>
                        <div style={styles.infoRow}>
                            <InfoItem label="Gender" value={appointment.gender} />
                            <InfoItem label="Age Group" value={appointment.age} />
                        </div>
                        <div style={styles.infoRow}>
                            <InfoItem label="Vaccine Requirement" value={appointment.vaccine ? "YES" : "NO"} />
                            <InfoItem label="Status" value={appointment.status || "Confirmed"} color="#60a5fa" />
                        </div>
                    </div>

                    {/* Contact & Location Section */}
                    <div style={styles.section}>
                        <h2 style={styles.sectionTitle}>📍 Contact & Location</h2>
                        <div style={styles.infoRow}>
                            <InfoItem label="Phone Number" value={appointment.patient_phone} />
                            <InfoItem label="Email Address" value={appointment.patient_email} />
                        </div>
                        <div style={styles.infoRow}>
                            <InfoItem label="State" value={appointment.state || "Madhya Pradesh"} />
                            <InfoItem label="City" value={appointment.city} />
                        </div>
                        <div style={styles.fullWidthInfo}>
                            <InfoItem label="Physical Address" value={appointment.address} />
                        </div>
                    </div>

                    {/* Booking & Clinical Details Section */}
                    <div style={styles.section}>
                        <h2 style={styles.sectionTitle}>🏥 Booking & Clinical Details</h2>
                        <div style={styles.infoRow}>
                            <InfoItem label="Assigned Doctor" value={appointment.doctor_name} />
                            <InfoItem label="Department / Speciality" value={appointment.doctor_speciality} />
                        </div>
                        <div style={styles.infoRow}>
                            <InfoItem label="Appointment Date" value={moment(appointment.date_of_appointment || appointment.created_at).format("dddd, Do MMMM YYYY")} />
                            <InfoItem label="Scheduled Time" value={appointment.time_slot} />
                        </div>
                        <div style={styles.fullWidthInfo}>
                            <InfoItem label="Reported Symptoms" value={appointment.symptoms} />
                        </div>
                        <div style={{...styles.infoRow, marginTop: '15px'}}>
                           <InfoItem label="Booking ID" value={appointment.id || appointment._id} />
                           <InfoItem label="Created On" value={moment(appointment.created_at).format("DD/MM/YY HH:mm")} />
                        </div>
                    </div>

                    {/* Payment Section */}
                    <div style={styles.section}>
                        <h2 style={styles.sectionTitle}>💳 Financial Summary</h2>
                        <div style={styles.infoRow}>
                            <InfoItem label="Consultation Fee" value={appointment.amount ? `₹${appointment.amount}` : '₹200'} color="#4ade80" />
                            <InfoItem label="Transaction Status" value="COMPLETED" color="#4ade80" />
                        </div>
                        <div style={styles.infoRow}>
                            <InfoItem label="Reference ID" value={appointment.pay_id || "BYPASSED"} />
                            <InfoItem label="Method" value="Digital Payment" />
                        </div>
                    </div>
                </div>

                <div style={styles.footer}>
                    <button style={styles.primaryBtn} onClick={() => window.print()}>Save as PDF / Print</button>
                </div>
            </div>

            <style>{`
                @keyframes fadeInUp {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .fade-in-up { animation: fadeInUp 0.5s ease-out; }
                .spinner { width: 40px; height: 40px; border: 4px solid rgba(255,255,255,0.1); border-top-color: #3b82f6; border-radius: 50%; animation: spin 1s linear infinite; margin: 0 auto 20px auto; }
                @keyframes spin { to { transform: rotate(360deg); } }
            `}</style>
        </div>
    );
};

const InfoItem = ({ label, value, color }) => (
    <div style={styles.infoItem}>
        <span style={styles.label}>{label}</span>
        <span style={{...styles.value, color: color || 'white'}}>{(value && value !== 'undefined') ? value : 'N/A'}</span>
    </div>
);

const styles = {
    pageWrapper: {
        minHeight: "100vh", display: "flex", justifyContent: "center", alignItems: "center",
        padding: "100px 15px 40px 15px", position: "relative",
        background: "#020617", fontFamily: "'Inter', sans-serif"
    },
    bgContainer: {
        position: "absolute", top: 0, left: 0, right: 0, bottom: 0,
        backgroundImage: "url('https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80')",
        backgroundSize: "cover", zIndex: 1
    },
    blueOverlay: {
        position: "absolute", top: 0, left: 0, right: 0, bottom: 0,
        background: "linear-gradient(135deg, rgba(2, 6, 23, 0.96), rgba(30, 58, 138, 0.88))", zIndex: 2
    },
    glassContainer: {
        position: "relative", zIndex: 3, width: "100%", 
        background: "rgba(255, 255, 255, 0.05)", backdropFilter: "blur(25px)",
        borderRadius: "28px", border: "1px solid rgba(255, 255, 255, 0.12)",
        boxShadow: "0 25px 60px rgba(0,0,0,0.5)", padding: "35px", overflow: "hidden"
    },
    header: { display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "30px", borderBottom: "1px solid rgba(255,255,255,0.1)", paddingBottom: "20px" },
    iconBtn: { background: "rgba(255,255,255,0.05)", border: "none", color: "white", fontSize: "20px", cursor: "pointer", padding: "8px 12px", borderRadius: "10px" },
    heading: { color: "white", fontSize: "22px", fontWeight: "700", margin: 0 },
    statusBadge: { padding: "6px 12px", borderRadius: "10px", background: "rgba(96, 165, 250, 0.15)", color: "#60a5fa", fontSize: "10px", fontWeight: "800", letterSpacing: "1px" },
    contentGrid: { display: "flex", flexDirection: "column", gap: "25px" },
    section: { background: "rgba(255,255,255,0.02)", padding: "20px", borderRadius: "20px", border: "1px solid rgba(255,255,255,0.05)" },
    sectionTitle: { fontSize: "12px", color: "rgba(255,255,255,0.4)", textTransform: "uppercase", letterSpacing: "1.5px", marginBottom: "15px", fontWeight: "700" },
    infoRow: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", marginBottom: "15px" },
    fullWidthInfo: { marginTop: "10px" },
    infoItem: { display: "flex", flexDirection: "column", gap: "4px" },
    label: { fontSize: "11px", color: "rgba(255,255,255,0.4)" },
    value: { fontSize: "14px", color: "white", fontWeight: "600" },
    footer: { marginTop: "30px", display: "flex", justifyContent: "center" },
    primaryBtn: { width: "100%", maxWidth: "300px", padding: "14px", borderRadius: "12px", background: "#3b82f6", color: "white", border: "none", fontWeight: "700", cursor: "pointer", transition: "0.3s" },
    backBtn: { marginTop: "20px", background: "transparent", color: "white", border: "1px solid white", padding: "10px 20px", borderRadius: "10px", cursor: "pointer" },
    loadingText: { position: "relative", zIndex: 3, color: "white", fontSize: "18px" }
};

export default AppointmentDetails;
