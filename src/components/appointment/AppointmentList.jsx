import React, { useEffect, useState } from "react";
import useApi from "../../functions/api";

const dummyData = [
  {
    id: 1,
    patient: "JOHN DOE",
    doctor: "DR. SMITH",
    department: "CARDIOLOGY",
    date: "03/02/25",
    time: "6:30 PM",
    status: "UPCOMING",
  },
  {
    id: 2,
    patient: "LISA CARTER",
    doctor: "DR. EDWARDS",
    department: "DERMATOLOGY",
    date: "03/02/25",
    time: "5:00 PM",
    status: "COMPLETED",
  },
  {
    id: 3,
    patient: "SARAH LEE",
    doctor: "DR. CLARK",
    department: "ORTHOPEDICS",
    date: "03/02/25",
    time: "03:30 AM",
    status: "CANCELLED",
  },
  // Add more items up to 46+ for pagination
];

const AppointmentList = () => {
  const [appointments, setAppointments] = useState(dummyData);
  const [filterStatus, setFilterStatus] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const statusColors = {
    UPCOMING: "#FFEB3B",
    COMPLETED: "#4CAF50",
    CANCELLED: "#F44336",
  };

  const filteredAppointments = appointments.filter((appt) => {
    const statusMatch =
      filterStatus === "All" || appt.status === filterStatus;
    const searchMatch = `${appt.patient} ${appt.doctor} ${appt.department}`
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return statusMatch && searchMatch;
  });
    const {getapi} = useApi();
    useEffect(() => {
      const fetchDoctors = async () => {
        try {
          const response = await getapi('/appointments/get'); // Adjust the endpoint as needed
          console.log('Appointments:', response);
          setAppointments(response.data);
        } catch (error) {
          console.error('Error fetching appointments:', error);
        }
      };
      fetchDoctors();
    }, []);

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" , marginTop:100, height:'80vh',overflow:'scroll'}}>
      {/* TOP CARDS */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
        gap: "20px",
        marginBottom: "30px",
      }}>
        <Card label="Today's Appointments" count="46" color="#D6C8FF" onClick={() => setFilterStatus("All")} />
        <Card label="Upcoming Appointments" count="26" color="#E8F4C9" onClick={() => setFilterStatus("UPCOMING")} />
        <Card label="Completed Appointments" count="14" color="#D2F4DC" onClick={() => setFilterStatus("COMPLETED")} />
        <Card label="Cancelled Appointments" count="6" color="#FFD5D5" onClick={() => setFilterStatus("CANCELLED")} />
      </div>

      {/* SEARCH + FILTER */}
      <div style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "15px",
        marginBottom: "20px",
        alignItems: "center"
      }}>
        <input
          type="text"
          placeholder="Search Doctor, Patient, etc..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{
            padding: "10px",
            border: "1px solid #ccc",
            borderRadius: "8px",
            flex: "1"
          }}
        />
      </div>

      {/* APPOINTMENTS TABLE */}
      <div style={{
        overflowX: "auto",
        border: "1px solid #eee",
        borderRadius: "10px",
      }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead style={{ backgroundColor: "#f4f4f4" }}>
            <tr>
              <th style={th}>#</th>
              <th style={th}>PATIENT NAME</th>
              <th style={th}>DOCTOR</th>
              <th style={th}>DEPARTMENT</th>
              <th style={th}>DATE</th>
              <th style={th}>TIME</th>
              <th style={th}>STATUS</th>
              {/* <th style={th}>ACTION</th> */}
            </tr>
          </thead>
          <tbody>
            {filteredAppointments.map((appt, index) => (
              <tr key={appt.id} style={{ borderBottom: "1px solid #eee" }}>
                <td style={td}>{index + 1}</td>
                <td style={td}>{appt.patient_name}</td>
                <td style={td}>{appt.doctor_name}</td>
                <td style={td}>{appt.doctor_speciality}</td>
                <td style={td}>{new Date(appt.created_at).toDateString()}</td>
                <td style={td}>{appt.time_slot}</td>
                <td style={{ ...td, fontWeight: "bold", color: statusColors[appt.status] }}>{appt.status||"UPCOMING"}</td>
                {/* <td style={td}>
                  <button style={{
                    backgroundColor: "#007BFF",
                    color: "#fff",
                    padding: "5px 12px",
                    borderRadius: "6px",
                    border: "none",
                    cursor: "pointer",
                  }}>
                    View
                  </button>
                </td> */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// Table styles
const th = {
  padding: "12px",
  textAlign: "left",
  fontWeight: "bold",
};

const td = {
  padding: "12px",
};

// Stat Card
const Card = ({ label, count, color, onClick }) => (
  <div onClick={onClick} style={{
    backgroundColor: color,
    padding: "20px",
    borderRadius: "12px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    fontWeight: "bold",
    cursor: "pointer"
  }}>
    <span>{label}</span>
    {/* <span style={{ fontSize: "22px" }}>{count}</span> */}
  </div>
);

export default AppointmentList;
