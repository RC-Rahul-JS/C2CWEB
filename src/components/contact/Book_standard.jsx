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

export default function BookStandard() {
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
        Assure benefits standard policy for Practitioners
      </h1>
      <p style={styles.paragraph}>
        Care2Connect’s mission is to help billions of people live healthier and longer lives by making quality healthcare affordable and accessible to all. In pursuit of this mission, we aim to offer an exceptional experience to both patients and healthcare practitioners on our platform. The Assure benefits program aims to improve the user’s overall experience and the establishment/institution, including its designated practitioners earmarked for Care2Connect Assure.
      </p>
      <p style={styles.paragraph}>
        As per the Assure benefits program, the Practitioner commits to offer one or more of the following benefits to the patients booking appointments through the Care2Connect website or app:
      </p>
      <ol type="1" style={styles.list}>
        <li>Wait time will be within the limit as mentioned on Care2Connect.</li>
        <li>Consultation fees charged by the Practitioner will be the same as published on Care2Connect.</li>
        <li>The location of the Practitioner will be the same as published on Care2Connect.</li>
        <li>Consultation with the same medical practitioner (in an organization or institution), with whom the appointment was booked on Care2Connect.</li>
      </ol>
      <p style={styles.paragraph}>
        The program offers an enhanced listing card with a Assure badge to the Practitioners, who commit to offer the above-mentioned benefits to the users on the Care2Connect app or website.
      </p>
      <p style={styles.paragraph}>
        To enrol for the Assure benefits, please contact the sales representative in your area or request a free demo
      </p>
      <p style={styles.paragraph}>
        Please note: This program is valid only for practitioners in select cities.
      </p>
      <p style={styles.paragraph}>
        For the Practitioners who have enrolled for Assure benefits, the below-mentioned policy is applicable.
      </p>
      <p style={styles.paragraph}>
        These guidelines and terms and conditions must be read in conjunction with the Care2Connect Terms & Conditions. In case of any inconsistency between the two, Care2Connect Terms & Conditions should prevail unless explicitly mentioned here.
      </p>

      <h2 style={styles.heading}>Guidelines</h2>
      <p style={styles.paragraph}>
        Practitioners that have signed up to be part of the Assure benefits program must ensure the following:
      </p>
      <ol type="1" style={styles.list}>
        <li>Check that the individual Practitioner's data such as qualification, services offered, etc. on Care2Connect is correct and up to date at all times.</li>
        <li>Uphold the assurances guaranteed to the users set at the time of booking of the appointment.</li>
        <li>Practitioners offering wait-time promise to the users should comply with the following policies:
          <ul style={styles.list}>
            <li>The wait time for the user should be within the limit committed by the Practitioner, upon enrolling for Assure benefits. Wait time is defined as the duration from the appointment time to the start of consultation by a doctor.</li>
            <li>Communicate to the User about any expected delay/cancellation at least 2 hours before the scheduled appointment time*.</li>
          </ul>
        </li>
        <li>Ensure fees mentioned on Care2Connect is the same as being charged at the Practitioner's establishment. In case of change in the fees, the same should be updated on Care2Connect* or should be brought to the notice of Care2Connect via email sent to <a href="mailto:support@Care2Connect.in">support@Care2Connect.in</a>.</li>
        <li>Ensure the location of the Practitioner's establishment as mentioned on Care2Connect is accurate; fault tolerance is 75 meters or less from the location specified on Care2Connect. In case of the location change, the Practitioner should inform all pending appointments about the location change and update the location mentioned on Care2Connect.</li>
        <li>Practitioners offering preferred doctor meets you promise to the Users should comply with the following policies:
          <ul style={styles.list}>
            <li>Ensure that the User consults the same individual medical practitioner (in an organization or institution) with whom the appointment has been made via the Website. If this is not possible due to an individual's unavailability, the appointment should be cancelled or rescheduled to another time beforehand.</li>
            <li>Communicate to the User about any expected delay/cancellation at least 2 hours before the scheduled appointment time*.</li>
            <li>Update the practitioner's Care2Connect Profile and calendar in the following cases:
              <ul style={styles.list}>
                <li>Any scheduled closure* of the clinic/hospital, e.g. on festivals; and, blocking calendar* on personal holidays.</li>
                <li>Transfer of resident/consulting practitioners to another establishment*.</li>
                <li>Change in Practitioner's consultation timings*.</li>
              </ul>
            </li>
          </ul>
        </li>
        <li>Ensure they only use the Consult platform provided by Care2Connect for the purpose of interacting/communicating with the User and do not attempt to interact with the Users through any other external means of communication including offline consultations.</li>
        <li>Ensure that they comply with the spirit of the agreement and do not undertake activities that may be considered to be fraudulent or otherwise derogatory.</li>
      </ol>
      <p style={styles.paragraph}>
        *The features to perform these actions are available on all Care2Connect platforms. For details on these, please feel free to reach out to us at <a href="mailto:support@Care2Connect.in">support@Care2Connect.in</a> or +91 6265578975.
      </p>

      <h2 style={styles.heading}>Exceptions to the Guidelines</h2>
      <p style={styles.paragraph}>
        We completely understand and respect the complexity of the medical profession, and therefore consider the following exceptions (where a healthcare practitioner was unable to follow the above guidelines):
      </p>
      <ol type="1" style={styles.list}>
        <li>If the user is consulted by a different practitioner followed by the one with whom the appointment was booked, it is not considered non-compliance.</li>
        <li>In case the user reported post the appointment time, only location accuracy will be guaranteed.</li>
        <li>The location mentioned on Care2Connect is within 75 meters of the actual physical location of the establishment.</li>
      </ol>

      <h2 style={styles.heading}>Non-compliance to the Guidelines</h2>
      <p style={styles.paragraph}>
        Non-compliance cases are kept in the record as and when reported to Care2Connect via users as per the Assure benefit policy or are otherwise discovered by Care2Connect by independent verification. All non-compliances reported by users are verified by Care2Connect's team with both, the Practice owner and the user. Each inbound and verified non-compliance case received by Care2Connect will be communicated to the clinic/hospital/practice owner via Email at the practice owner’s registered email ID.
      </p>
      <p style={styles.paragraph}>
        Non-compliance cases lead to poor user experience and may negatively impact the reputation of the Practitioner, therefore Care2Connect may in such instances deactivate both 'Book' and 'Assure benefits' facility, as applicable to assist the Practitioner to become well-versed with the guidelines and ensure they are comfortable using the features associated with it. However, while the Assure benefits and Book facilities are deactivated, the users would still be able to connect with the Practitioner through the 'Call' facility and the provider(s) will not be eligible to provide Assure benefits to the user.
      </p>
      <p style={styles.paragraph}>
        What counts as non-compliance?
      </p>
      <ul style={styles.list}>
        <li><strong>Doctor-No-Show:</strong> When the doctor is not available at the clinic/hospital for a confirmed appointment.</li>
        <li><strong>Doctor-led cancellations:</strong> Repeated instances of confirmed appointments being cancelled by the doctor/clinic/hospital.</li>
        <li><strong>Poor Patient Happiness Score:</strong> Providing an excellent patient experience has been a joint mission for us and our doctor partners. Patient happiness Score helps us measure how satisfied patients are with their appointment experience at the clinic or hospital. A score below 80% reflects poor patient experience.</li>
        <li><strong>Offline Interactions with Users:</strong> Any attempt to cancel confirmed appointments with an aim to interact with Users through other non-Care2Connect and offline channels.</li>
      </ul>
    </div>
  );
}