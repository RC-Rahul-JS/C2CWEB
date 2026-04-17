import React from 'react'
const styles = {
  container: {
    maxWidth: "900px",
    margin: "0 auto",
    padding: "40px 20px",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    color: "#333",
    lineHeight: 1.6,
    backgroundColor: "#fff",
  },
  heading: {
    fontSize: "1.4rem",
    fontWeight: "bold",
    marginTop: "20px",
  },
  subheading: {
    fontSize: "1.1rem",
    fontWeight: "bold",
    marginTop: "15px",
  },
  paragraph: {
    margin: "10px 0",
  },
  list: {
    paddingLeft: "20px",
    margin: "8px 0",
  },
  link: {
    color: "#23298eff", 
    textDecoration: "none",
  },
  linkHover: {
    textDecoration: "underline",
  }
};
const Nps = () => {
 return (
    // <div style={styles.container}>
     <div style={styles.container}>
     <h1 
        style={{ 
          textAlign: 'center', 
          color: '#18201fff', 
          fontSize: '28px', 
          fontWeight: 'bold', 
          marginBottom: '30px',
          borderBottom: '2px solid #131414ff',
          paddingBottom: '10px'
        }}
      >
       Patient No-Show Policy
      </h1>
      <p style={styles.paragraph}>
        Patients not showing up for doctor appointments is a widespread
        phenomenon in India. This can have dire consequences, especially due to
        the dearth of medical practitioners to address the health concerns of a
        growing population.
      </p>
      <p style={styles.paragraph}>
        Our Patient No-Show policy has been put in place to ensure timely
        healthcare for everyone using the Care2Connect platform. In the
        Care2Connect context, Patient No-Show means a patient hasn’t turned up
        on time for an appointment booked through Care2Connect.in or
        Care2Connect App without cancelling, rescheduling, or informing the
        practice/doctor in advance about the same.
      </p>

      <h3 style={styles.subheading}>Capturing patient-no-show from doctors/clinics</h3>
      <p style={styles.paragraph}>
        When a patient doesn’t show up for a confirmed appointment (without
        having cancelled or rescheduled before appointment time), doctors using
        Ray software can mark the specific appointment as PNS on their Ray desktop
         or the Pro app.
      </p>
      <p style={styles.paragraph}>
        PNS can be marked only within 5 days following the scheduled appointment.
      </p>

      <h3 style={styles.subheading}>Verifying PNS from patients</h3>
      <p style={styles.paragraph}>
        Whenever a doctor/clinic marks PNS, patients are sent an SMS and email
        to verify this claim and understand the reason behind the missed
        appointment.
      </p>
      <p style={styles.paragraph}>
        Patients should respond in next 7 days after receiving the SMS/email,
        with the reason.
      </p>

      <h3 style={styles.subheading}>Actions taken on repeat patient no-show</h3>
      <p style={styles.paragraph}>
        Every PNS captured on Care2Connect is dealt with seriousness based on
        past patient behaviour. This is done in order to ensure patients
        understand the importance of a doctor’s time and not misuse the
        convenience provided by Care2Connect. Our PNS Policy aims at minimising
        instances of uninformed missed appointments, thereby making most of a
        doctor’s valuable time.
      </p>

      <ol style={styles.list}>
        <li>
          Repeat PNS actions are taken ONLY for patients who schedule
          appointments using ‘Book Appointment’ feature on Care2Connect.
        </li>
        <li>
          At the third valid instance of PNS in last 12 months, patient’s
          account will be temporarily disabled from booking further online
          appointments on Care2Connect.in for next 4 months. However, the user
          can continue to call the clinic via Care2Connect.in to get an
          appointment.
        </li>
        <li>
          Below are the valid cases of PNS:
          <ol type="a" style={styles.list}>
            <li>
              Patient does not reply to the email/SMS with the reason in next 7
              days from the date of receipt of such email/SMS communication
            </li>
            <li>
              Patient responds to the email/SMS with below reasons:
              <ol type="i" style={styles.list}>
                <li>Forgot the appointment</li>
                <li>Chose to visit another doctor/consulted online</li>
                <li>Busy with other work</li>
                <li>
                  Other reasons (which Care2Connect at its discretion decides to
                  be a reason for valid PNS)
                </li>
              </ol>
            </li>
          </ol>
        </li>
        <li>
          Below are the invalid cases of PNS:
          <ol type="a" style={styles.list}>
            <li>
              Patient says she/he got marked as PNS in spite of visiting the
              practice/doctor. This will be marked valid/invalid only after
              Care2Connect support team validates the authenticity of the claim.
            </li>
            <li>
              Patient says she/he was extremely ill to visit the doctor (This
              will be a one-time consideration only)
            </li>
          </ol>
        </li>
        <li>
          If a patient has a history of repeat PNS, patient’s account can be
          temporarily disabled from booking further online appointments on
          <a href="/">_Care2Connect.in_</a>, even on 1st or 2nd instance of PNS.
        </li>
        <li>
          All refunds with respect to PNS for a pre-paid appointment shall be at
          the discretion of the doctor and Care2Connect has no role with respect
          to such refunds.
        </li>
        <li>
          Care2Connect reserves the right to make the final decision in the case
          of a conflict. The total aggregate liability of Care2Connect with
          respect to any claims made herein shall be INR 200.
        </li>
        <li>
          Care2Connect reserve the right to modify the above mentioned terms
          from time to time.
        </li>
      </ol>
    </div>
  );
}
export default Nps
