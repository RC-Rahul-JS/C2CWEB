import React from "react";

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
};

export default function ConsultLetter() {
  return (
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
       Assure benefits claim policy for Users
      </h1>
      <h3 style={styles.subheading}>Overview</h3>
      <p style={styles.paragraph}>
        Care2Connect Assure benefits program (“Care2Connect benefits”) is aimed
        to ensure a superior visit experience for Users searching and booking
        appointments with the establishment/institution including its designated
        practitioners earmarked for Care2Connect Assure (“Practitioner”), through
        Care2Connect.
      </p>
      <p style={styles.paragraph}>
        The program enables the practitioners to offer, one or more of the below
        mentioned assurances, they are extending to the Users:
      </p>
      <ol style={styles.list}>
        <li>
          The wait time will be within the time limit as mentioned on
          Care2Connect
        </li>
        <li>
          Consultation fees charged by the Practitioner will be the same as
          mentioned on Care2Connect
        </li>
        <li>
          Location of the Practitioner will be same as indicated on Care2Connect
        </li>
        <li>
          Consultation will be with the same individual medical practitioner
          (within the Practitioner’s organization or institution), with whom the
          appointment was booked on the Website.
        </li>
      </ol>
      <p style={styles.paragraph}>
       <b> The above-mentioned assurances are available only with select healthcare
        Practitioners on Care2Connect, which are highlighted with a Assure badge.
        The assurances shall be extended to a User who is identified by a unique
        mobile number, and thereby it is advised to ensure that all
        communications with Care2Connect and/or the Practitioner(s) are carried
        out via the same mobile number used to book the appointment.</b>
      </p>
      <p style={styles.paragraph}>
        The 'Max 15/30/45/60/90 mins wait or FREE' assurance is subject to a
        maximum entitlement of upto ₹200 Care Cash from Care2Connect.
      </p>
      <p style={styles.paragraph}>
        If the assurance (one or more, subject to the Practitioners’ offering
        them) promised while booking an appointment is not adhered by the
        Practitioner, the User is eligible for upto ₹200 Care Cash (Assure
        benefits Entitlement) subject to, at all times, the terms and conditions
        mentioned herein below (“Assure benefits Terms”).
      </p>
      <p style={styles.paragraph}>
       <b> This program is valid only for appointments made with Practitioners
        listed on the Website which are earmarked with a Assure Badge.</b>
      </p>

      <h3 style={styles.subheading}><b>How to claim Care Cash?</b></h3>
      <ol style={styles.list}>
        <li>Write to us at support@Care2Connect.in.</li>
        <li>
          In case you booked the appointment via Book feature, please provide
          your appointment ID.
        </li>
        <li>
          In case you booked the appointment via Call feature, our support team
          will request for your phone number and permission to listen to your
          call recording with the Practitioner.
        </li>
      </ol>

      <h3 style={styles.subheading}>Terms and Conditions</h3>
      <ol style={styles.list}>
        <li>
          Assure benefits Entitlement (subject to clause 5 herein below) is
          applicable only on appointments made with select Assure Practitioners,
          using <b>'Book Appointment'</b> button or <b>'Contact Clinic/Hospital'</b> button on
          the Website. Only the promise made at the time of appointment booking or
          call will be valid.
        </li>
        <li>
          Claim for Assure benefits Entitlement will only be registered within 5
          days from the scheduled appointment date.
          <ul style={styles.list}>
            <li>
              E.g. If the Practitioner, you booked an appointment with,
              cancels/reschedules or doesn’t turn up on 25 sep 2025, then claim
              made on or before 30 sep 2025 will be valid.
            </li>
          </ul>
        </li>
        <li>
          Appointment ID, if available, must match with the registered phone
          number of the User.
        </li>
        <li>
          Phone number used for contacting Care2Connect support team must match
          with the phone number used for contacting the Practitioner in case there
          is no appointment already registered on Care2Connect.
        </li>
        <li>
          Assure benefits Entitlement claim for non-adherence to wait time promise
          is valid under following circumstances (subject to exceptions in clause
          6):
          <ul style={styles.list}>
            <li>
              You had to wait for your consultation, for more than the wait time
              mentioned on Website for that Practitioner. The actual wait time is
              calculated from the start of the appointment time slot.
            </li>
            <li>
              Your appointment has been rescheduled (postponed) and (i) the
              difference between the original appointment time and the
              rescheduled appointment time is higher than the wait time
              communicated to you and (ii) the rescheduling was communicated to
              you in less than 120 minutes prior to the original appointment time.
            </li>
          </ul>
        </li>
        <li>
          Assure benefits Entitlement claim for non-adherence to wait time promise
          is NOT valid under following circumstances:
          <ul style={styles.list}>
            <li>
              Your appointment is cancelled or rescheduled, due to your personal
              reasons or unavailability.
              <ul style={styles.list}>
                <li>E.g. If you/your friends/family cancel or reschedule due to any reason.</li>
                <li>
                  E.g. If anyone from Practitioner’s establishment, you booked an
                  appointment with, canceled or rescheduled on your behalf or as per
                  your request, and not due to individual Practitioner’s
                  unavailability.
                </li>
              </ul>
            </li>
            <li>
              Your appointment has been cancelled or rescheduled more than 2 hours
              prior to your original appointment time.
            </li>
            <li>
              You have booked an appointment not more than 2 hours 15 minutes
              before the appointment time and you are informed of any cancellation
              or rescheduling of appointment within 15 mins of the booking time.
            </li>
            <li>
              Your wait time is more than the wait time mentioned on the Website
              and same had been communicated to you over call at the time of
              booking of the appointment or at least 2 hours prior to the
              appointment time.
            </li>
          </ul>
        </li>
        <li>
          Assure benefits Entitlement claim for non-adherence to verified
          consultation fees promise is valid under following circumstances (subject
          to exceptions in clause 8):
          <ul style={styles.list}>
            <li>
              You were charged more than the consultation fees prescribed for
              other patients using the same service at the Practitioner.
            </li>
            <li>
              You were charged a consultation fees amount which was more than the
              fees mentioned on the Website for that Practitioner.
            </li>
          </ul>
        </li>
        <li>
          Assure benefit Entitlement claim for non-adherence to verified
          consultation fees promise is NOT valid under following circumstances:
          <ul style={styles.list}>
            <li>
              The fees structure communicated by the Practitioner to you directly
              over call/email, prior to your appointment time, is different from
              the fees mentioned on Care2Connect.
            </li>
            <li>
              Fees charged by the Practitioner is other than the consultation fees.
              Care2Connect does not give any assurance on the registration fees
              charged by the Practitioner.
            </li>
          </ul>
        </li>
        <li>
          Assure benefit Entitlement claim for non-adherence to verified location
          promise is valid under following circumstances (subject to exceptions in
          clause 10):
          <ul style={styles.list}>
            <li>
              The actual location of the clinic/hospital (of the Practitioner) was
              more than 100 meters away from the location as mentioned on the
              Website for that Practitioner’s establishment.
            </li>
          </ul>
        </li>
        <li>
          Assure benefit Entitlement claim for non-adherence to verified location
          promise is NOT valid under following circumstances:
          <ul style={styles.list}>
            <li>
              The actual location of the clinic/hospital (of the Practitioner) was
              less than 100 meters away from the location as mentioned on the
              Website for that Practitioner’s establishment
            </li>
          </ul>
        </li>
        <li>
          Assure benefit Entitlement claim for non-adherence to the assurance of
          appointment with preferred doctor is valid under following circumstances
          (subject to exceptions in clause 12):
          <ul style={styles.list}>
            <li>
              Your appointment has been cancelled at any time after Cancellation
              Threshold Period. “Cancellation Threshold Period” means 120 minutes
              before the scheduled appointment time.
            </li>
            <li>
              Your appointment has been rescheduled(preponed) to a time that is
              more than 30 mins prior to your original appointment time, and the
              rescheduling was communicated to you in less than 120 minutes prior
              to the original appointment time.
              <ul style={styles.list}>
                <li>
                  E.g. If your original appointment is on 8 June - 1 p.m, and it
                  is rescheduled (rescheduling is done anytime between 11 am - 1
                  pm) to a time prior to 8 June - 12:30 p.m.
                </li>
              </ul>
            </li>
            <li>
              Your appointment has been rescheduled(postponed) and (i) the
              difference between the original appointment time and the rescheduled
              appointment time is more than 120 minutes and (ii) the rescheduling
              was communicated to you in less than 120 minutes prior to the
              original appointment time.
            </li>
            <li>
              You did not get a consultation with the individual Practitioner with
              whom you had made an appointment via Care2Connect.
            </li>
          </ul>
        </li>
        <li>
          Assure benefit Entitlement claim for non-adherence to the assurance of
          appointment with preferred doctor is NOT valid under following
          circumstances:
          <ul style={styles.list}>
            <li>
              Your appointment was scheduled for a time slot outside the timings
              mentioned for that Practitioner on the Website by way of a telephone
              call provided the timings mentioned on the Website are correct.
            </li>
            <li>
              You have been consulted by another doctor followed by a consultation
              with the doctor with whom you had booked an appointment. This has
              been introduced to cover the cases where a doctor prepares the
              patients and understands the case to brief senior doctors (with whom
              the appointment has been booked) about the case. However, this does
              not affect the quality of service.
            </li>
            <li>
              Your appointment is cancelled or rescheduled, due to your personal
              reasons or unavailability.
              <ul style={styles.list}>
                <li>E.g. If you/your friends/family cancel or reschedule due to any reason.</li>
                <li>
                  E.g. If anyone from Practitioner’s establishment, you booked an
                  appointment with, canceled or rescheduled on your behalf or as per
                  your request, and not due to individual Practitioner’s
                  unavailability.
                </li>
              </ul>
            </li>
            <li>
              Your appointment has been cancelled or rescheduled more than 2 hours
              prior to your original appointment time.
            </li>
            <li>
              You have booked an appointment not more than 2 hours 15 minutes
              before the appointment time and you are informed of any cancellation
              or rescheduling of appointment within 15 mins of the booking time.
            </li>
          </ul>
        </li>
        <li>
          Any Assure benefit Entitlement claim is NOT valid under following
          circumstances:
          <ul style={styles.list}>
            <li>
              In adverse cases beyond the reasonable control of the Practitioner
              such as acts of god, nature - flood, fire, etc., when Business-As-Usual
              is not possible.
            </li>
            <li>
              You have received 2 Assure benefit Entitlements in the past 45 days.
              (45 days counted from day of first appointment for which Assure
              benefit Entitlement was paid).
            </li>
            <li>
              Your appointment was scheduled for a time slot outside the timings
              mentioned for that Practitioner on the Website by way of a telephone
              call provided the timings mentioned on Care2Connect are correct.
            </li>
            <li>
              You are unable to reach the Practitioner at your confirmed appointment
              time provided address and contact details of the Practitioner on the
              Website are correct.
            </li>
            <li>
              You have been provided with Assure benefit Entitlement for an
              appointment in the same Practitioner’s establishment for the same day.
              <ul style={styles.list}>
                <li>
                  E.g : You have an appointment with Dr. Megha in Test Dental Clinic,
                  JP Nagar at 10:00 a.m, 15 June and you have received a Assure
                  benefits Entitlement claim for this, then if there is an
                  appointment for you with Dr. Neha in Test Dental Clinic, JP Nagar
                  at 14:00 p.m , 15 June a Assure benefits claim for this
                  appointment will not be considered.
                </li>
              </ul>
            </li>
            <li>
              Your appointment is on a announced or unannounced State Government or
              Centre Government holiday, or national / state-wide shutdown (planned
              or unplanned) like strikes, bandhs etc.
            </li>
          </ul>
        </li>
      </ol>

      <ol style={styles.list}>
        <li>
          The Care Cash will only be issued in the name of the User who booked the
          appointment.
        </li>
        <li>
          The Care Cash can neither be transferred to someone else nor can it be
          redeemed for cash.
        </li>
        <li>
          Care2Connect reserves the right to not extend this offer to Users with
          repeated instances of ‘patient no-show’ post booking appointment and
          suspected fraud Users.
        </li>
        <li>
          The above-mentioned specific terms relating to Care2Connect Assure
          benefits program are without prejudice to the Terms and Conditions and
          the Privacy policy available on the Care2Connect website/ Application.
        </li>
        <li>
          Care2Connect reserves the right to revoke or revise Care2Connect Assure
          benefits without any prior notice.
        </li>
        <li>
          All capitalized terms used, and not otherwise expressly defined in this
          terms and conditions have the meaning given to such terms in the 
           <a href="/privacy_policy">
   _Care2Connect Terms & Conditions_
</a>.
        </li>
      </ol>

      <h3 style={styles.subheading}>Care2Connect Care Cash as Cashback</h3>
      <p style={styles.paragraph}>
        Each User shall be entitled to a cashback of Rs. 50 (Rupees Fifty only)
        (“Cashback”) for their first appointment that is booked and completed
        through the Website in relation to every unique Practitioner where such a
        Promise is explicitly stated on the website; for this paragraph the term
        “Practitioner” shall be understood to be an institution and not the
        individual practitioner. Cashback shall be denominated as 'Care Cash' which
        is a credit balance that can utilized within a period of 30 days in lieu
        of the services being offered on the Website. User is not entitled to
        Cashback in case of appointment cancellations and “no show”. If Care Cash
        is not credited within 48 hours post the appointment time (as recorded on
        the Website), please reach out to us at support@Care2Connect.in
      </p>
    </div>
  );
}