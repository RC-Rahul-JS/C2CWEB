import React, { useEffect, useState } from "react";
import useApi from "../../functions/api";
import moment from "moment";
import { useNavigate } from "react-router-dom";

const AppointmentList = () => {
    const [appointments, setAppointments] = useState([]);
    const [filterStatus, setFilterStatus] = useState("All");
    const [searchQuery, setSearchQuery] = useState("");
    const { getapi } = useApi();
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const navigate = useNavigate();

    useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);
        const fetchAppointments = async () => {
            try {
                const response = await getapi('c2c_app/appointments/917089449249');
                if (response.success) setAppointments(response.data);
            } catch (error) {
                console.error('Error fetching appointments:', error);
            }
        };
        fetchAppointments();
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const isMobile = windowWidth <= 850;

    const statusColors = {
        UPCOMING: "#60a5fa",
        COMPLETED: "#4ade80",
        CANCELLED: "#f87171",
    };

    const filteredAppointments = appointments.filter((appt) => {
        const statusMatch = filterStatus === "All" || (appt.status || "UPCOMING") === filterStatus;
        const searchMatch = `${appt.patient_name} ${appt.doctor_name} ${appt.doctor_speciality}`
            .toLowerCase()
            .includes(searchQuery.toLowerCase());
        return statusMatch && searchMatch;
    });

    const stats = {
        total: appointments.length,
        upcoming: appointments.filter(a => (a.status || "UPCOMING") === "UPCOMING").length,
        completed: appointments.filter(a => a.status === "COMPLETED").length,
        cancelled: appointments.filter(a => a.status === "CANCELLED").length,
    };

    return (
        <div style={styles.pageWrapper}>
            <div style={styles.bgContainer}>
                <div style={styles.blueOverlay}></div>
            </div>

            <div style={{...styles.glassContainer, padding: isMobile ? "20px" : "40px"}} className="fade-in-up">
                <h1 style={{...styles.heading, fontSize: isMobile ? "22px" : "28px"}}>Appointment Dashboard</h1>

                {/* STATS GRID */}
                <div style={styles.statsGrid}>
                    <StatCard label="Total" count={stats.total} color="rgba(96, 165, 250, 0.15)" active={filterStatus === "All"} onClick={() => setFilterStatus("All")} />
                    <StatCard label="Upcoming" count={stats.upcoming} color="rgba(250, 204, 21, 0.15)" active={filterStatus === "UPCOMING"} onClick={() => setFilterStatus("UPCOMING")} />
                    <StatCard label="Done" count={stats.completed} color="rgba(74, 222, 128, 0.15)" active={filterStatus === "COMPLETED"} onClick={() => setFilterStatus("COMPLETED")} />
                    <StatCard label="Cancel" count={stats.cancelled} color="rgba(248, 113, 113, 0.15)" active={filterStatus === "CANCELLED"} onClick={() => setFilterStatus("CANCELLED")} />
                </div>

                {/* SEARCH */}
                <div style={styles.searchWrapper}>
                    <input
                        type="text"
                        placeholder="Search patient or doctor..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        style={styles.glassInput}
                    />
                </div>

                {/* RESPONSIVE TABLE/LIST */}
                <div style={styles.tableWrapper}>
                    {!isMobile ? (
                        <table style={styles.table}>
                            <thead>
                                <tr style={styles.tableHeaderRow}>
                                    <th style={styles.th}>#</th>
                                    <th style={styles.th}>PATIENT</th>
                                    <th style={styles.th}>DOCTOR</th>
                                    <th style={styles.th}>SPECIALITY</th>
                                    <th style={styles.th}>DATE</th>
                                    <th style={styles.th}>TIME</th>
                                    <th style={styles.th}>STATUS</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredAppointments.map((appt, index) => {
                                    const apptId = appt.id || appt._id;
                                    return (
                                        <tr 
                                            key={apptId} 
                                            style={styles.tableRow} 
                                            className="table-row-hover"
                                            onClick={() => navigate(`/appointment_details/${apptId}`)}
                                        >
                                            <td style={styles.td}>{index + 1}</td>
                                            <td style={{...styles.td, fontWeight: '600'}}>{appt.patient_name}</td>
                                            <td style={styles.td}>{appt.doctor_name}</td>
                                            <td style={styles.td}>{appt.doctor_speciality}</td>
                                            <td style={styles.td}>{moment(appt.created_at).format("DD MMM YYYY")}</td>
                                            <td style={styles.td}>{appt.time_slot}</td>
                                            <td style={styles.td}>
                                                <span style={styles.statusBadge(statusColors[appt.status || "UPCOMING"])}>
                                                    {appt.status || "UPCOMING"}
                                                </span>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    ) : (
                        /* MOBILE VIEW: STACKED CARDS */
                        <div style={styles.mobileList}>
                            {filteredAppointments.map((appt, index) => {
                                const apptId = appt.id || appt._id;
                                return (
                                    <div 
                                        key={apptId} 
                                        style={styles.mobileCard}
                                        onClick={() => navigate(`/appointment_details/${apptId}`)}
                                    >
                                        <div style={styles.mobileCardHeader}>
                                            <span style={styles.mobileIndex}>#{index + 1}</span>
                                            <span style={styles.statusBadge(statusColors[appt.status || "UPCOMING"])}>
                                                {appt.status || "UPCOMING"}
                                            </span>
                                        </div>
                                        <div style={styles.mobileDataRow}>
                                            <span style={styles.mobileLabel}>Patient:</span>
                                            <span style={styles.mobileValue}>{appt.patient_name}</span>
                                        </div>
                                        <div style={styles.mobileDataRow}>
                                            <span style={styles.mobileLabel}>Doctor:</span>
                                            <span style={styles.mobileValue}>{appt.doctor_name}</span>
                                        </div>
                                        <div style={styles.mobileDataRow}>
                                            <span style={styles.mobileLabel}>Speciality:</span>
                                            <span style={styles.mobileValue}>{appt.doctor_speciality}</span>
                                        </div>
                                        <div style={styles.mobileDataRow}>
                                            <span style={styles.mobileLabel}>Date & Time:</span>
                                            <span style={styles.mobileValue}>
                                                {moment(appt.created_at).format("DD MMM")} • {appt.time_slot}
                                            </span>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
            </div>

            <style>{`
                @keyframes fadeInUp {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .fade-in-up { animation: fadeInUp 0.6s ease-out; }
                ::-webkit-scrollbar { width: 4px; }
                ::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 10px; }
                
                .table-row-hover {
                    cursor: pointer;
                    transition: background 0.2s ease;
                }
                .table-row-hover:hover {
                    background: rgba(255,255,255,0.08) !important;
                }
            `}</style>
        </div>
    );
};

const StatCard = ({ label, count, color, onClick, active }) => (
    <div onClick={onClick} style={{
        ...styles.card,
        backgroundColor: color,
        border: active ? "1px solid #60a5fa" : "1px solid rgba(255,255,255,0.08)",
        transform: active ? "scale(1.02)" : "scale(1)",
    }}>
        <span style={styles.cardLabel}>{label}</span>
        <span style={styles.cardCount}>{count}</span>
    </div>
);

const styles = {
    pageWrapper: {
        minHeight: "100vh", display: "flex", justifyContent: "center",
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
        position: "relative", zIndex: 3, width: "100%", maxWidth: "1100px",
        background: "rgba(255, 255, 255, 0.05)", backdropFilter: "blur(25px)",
        borderRadius: "28px", border: "1px solid rgba(255, 255, 255, 0.12)",
        boxShadow: "0 25px 60px rgba(0,0,0,0.5)", maxHeight: "85vh", display: "flex", flexDirection: "column"
    },
    heading: { color: "white", marginBottom: "25px", fontWeight: "700" },
    statsGrid: {
        display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(100px, 1fr))",
        gap: "12px", marginBottom: "25px"
    },
    card: {
        padding: "15px", borderRadius: "18px", display: "flex", flexDirection: "column",
        cursor: "pointer", transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
    },
    cardLabel: { fontSize: "10px", color: "rgba(255,255,255,0.5)", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "4px" },
    cardCount: { fontSize: "20px", color: "white", fontWeight: "800" },
    searchWrapper: { marginBottom: "20px" },
    glassInput: {
        width: "100%", padding: "14px 20px", borderRadius: "14px",
        background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)",
        color: "white", fontSize: "15px", outline: "none"
    },
    tableWrapper: { overflowY: "auto", flex: 1, paddingRight: "5px" },
    table: { width: "100%", borderCollapse: "separate", borderSpacing: "0 10px" },
    tableHeaderRow: { color: "rgba(255,255,255,0.4)", fontSize: "12px", textAlign: "left" },
    th: { padding: "10px 15px", fontWeight: "600" },
    tableRow: { background: "rgba(255,255,255,0.03)" },
    td: { padding: "16px 15px", color: "rgba(255,255,255,0.9)", fontSize: "14px" },
    statusBadge: (color) => ({
        padding: "4px 10px", borderRadius: "8px", fontSize: "10px", fontWeight: "700",
        backgroundColor: `${color}20`, color: color, border: `1px solid ${color}40`, display: "inline-block"
    }),
    
    // MOBILE SPECIFIC STYLES
    mobileList: { display: "flex", flexDirection: "column", gap: "15px" },
    mobileCard: {
        background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)",
        borderRadius: "18px", padding: "18px", display: "flex", flexDirection: "column", gap: "10px"
    },
    mobileCardHeader: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "5px" },
    mobileIndex: { color: "rgba(255,255,255,0.3)", fontWeight: "700", fontSize: "14px" },
    mobileDataRow: { display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid rgba(255,255,255,0.03)", paddingBottom: "8px" },
    mobileLabel: { color: "rgba(255,255,255,0.4)", fontSize: "12px" },
    mobileValue: { color: "white", fontSize: "13px", fontWeight: "500", textAlign: "right" }
};

export default AppointmentList;