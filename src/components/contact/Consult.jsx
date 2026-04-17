import React from "react";

const styles = {
  container: {
    maxWidth: "900px",
    margin: "0 auto",
    padding: "50px 30px",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    color: "#333",
    lineHeight: 1.75, 
    backgroundColor: "#fff",
    fontSize: "15px",
  heading: {
    fontSize: "1.4rem",
    fontWeight: "600",
    marginTop: "32px", 
    paddingBottom: "6px",
    borderBottom: "1px solid #e0e0e0",
    color: "#222",
  },
  subheading: {
    fontSize: "1.15rem",
    fontWeight: "600",
    marginTop: "20px",
    marginBottom: "10px",
    color: "#444",
  },
  paragraph: {
    margin: "0 0 16px 0", 
    textAlign: "justify",
  },
  list: {
    paddingLeft: "22px",
    margin: "10px 0 16px 0", 
    fontSize: "14px",
  },
  link: {
    color: "#23298eff", 
    textDecoration: "none",
  },
  linkHover: {
    textDecoration: "underline",
  }}
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
        DC – Care2Connect
      </h1>
      <p style={styles.paragraph}>
        Duniyape Technologies Private Limited ( <b> “DTPL” </b>) is providing online
        medical teleconsultation services through its medical practitioners
        (“Practitioner”) as per the terms and conditions mentioned below. DTPL
        under the brand name ‘Care2Connect’ provides the said Services (as
        defined below) through:
      </p>
      <ul style={styles.list}>
        <li>
          <a
            href="https://www.care2connect.in/dc"
            target="_blank"
            rel="noreferrer"
          >
            https://www.care2connect.in/dc
          </a>
        </li>
        <li>mobile application ‘Care2Connect’</li>
        <li>Whatsapp Chatbot Platform</li>
      </ul>

      <h2 style={styles.heading}>1. NATURE AND APPLICABILITY OF TERMS:</h2>
      <p style={styles.paragraph}>
        Please carefully go through these terms and conditions (<b>“Terms”</b>) and the
        privacy policy available at{" "}
        <a
          href="https://www.care2connect.in/privacy_policy"
          target="_blank"
          rel="noreferrer"
        >
          https://www.care2connect.in/privacy_policy
        </a>{" "}
        (<b>“Privacy Policy”</b>) before you decide to access the Website or avail the
        services from DTPL. These Terms and the Privacy Policy together
        constitute a legal agreement (<b>“Agreement”</b>) between you and DTPL in
        relation to the Services (as defined below).
      </p>
      <p style={styles.paragraph}><b>The Agreement applies to:</b></p>
      <ul style={styles.list}>
        <li>
          A patient, his/her representatives or affiliates, seeking healthcare
          services including searching for Practitioners through the Website
          (<b>“End-User”, “you” or “User”</b>); or
        </li>
        <li>Otherwise, a user of the Website (<b>“you” or “User”</b>).</li>
      </ul>
      <p style={styles.paragraph}>
        This Agreement applies to online medical teleconsultation services
        provided by DTPL through its Practioners on the Website (<b>“Services”</b>). The
        Services may change from time to time, at the sole discretion of DTPL,
        and the Agreement at the time will apply to you for availing the
        Services.
      </p>
      <p style={styles.paragraph}>
        DTPL reserves the right to modify or terminate any portion of the
        Agreement for any reason and at any time. You should read the Agreement
        at regular intervals. Your continued use of the Services following any
        such modification constitutes your agreement to follow and be bound by
        the Agreement so modified. If you do not agree with any part of the
        Agreement, please do not use the Website or avail any Services.
      </p>
      <p style={styles.paragraph}>
        The Agreement is published in compliance of, and is governed by the
        provisions of Indian law, including but not limited to:
      </p>
      <ul style={styles.list}>
        <li>the Indian Contract Act, 1872,</li>
        <li>the (Indian) Information Technology Act, 2000</li>
        <li>
          the Telemedicine Guidelines part of the Indian Medical Council
          (Professional Conduct, Etiquette and Ethics Regulation, 2002
        </li>
      </ul>

      <h2 style={styles.heading}>2. DOCTOR CONSULT</h2>
      <h3 style={styles.subheading}><b>A. Definition:</b></h3>
      <p style={styles.paragraph}>
        Consult is a Service provided by DTPL that allows Users to seek medical
        consultation by communicating with its registered Practitioners on the
        Website/ platform. The Practitioner is assigned by DTPL based on multiple
        parameters such as date and time of consultation request placed by the
        user, health problems etc. via the system’s algorithm/software-program
        that identifies the most relevant Practitioner, or the Users may also
        choose the Practitioner through search options made available on the
        Website/platform. The scope of this feature as detailed herein is
        collectively referred to as "Consult".
      </p>
      <h3 style={styles.subheading}><b>B. Terms for Users:</b></h3>
      <p style={styles.paragraph}>
        The Users expressly understand, acknowledge and agree to the following
        set forth herein below:
      </p>
      <ol style={styles.list}>
        <li>
          DTPL assigns its Practitioners through the system’s
          algorithm/software-program, which identifies the most relevant
          Practitioner. In some cases, the Users can choose the Practitioner of
          choice through the search options made available on the Website /
          platform.
        </li>
        <li>
          In case any prescription is being provided to the User by the
          Practitioner, the same is being provided basis the online consultation,
          however it may vary when examined in person, hence, in no event shall
          the prescription provided by Practitioners be relied upon as a final
          and conclusive solution.
        </li>
        <li>
          The Users agree to use the advice from Practitioner on the Website
          subject to:
          <ul style={styles.list}>
            <li>an ongoing treatment with their medical practitioner;</li>
            <li>
              a condition which does not require emergency treatment, physical
              examination or medical attention;
            </li>
            <li>medical history available as records with them for reference;</li>
            <li>
              a record of physical examination and report thereof with them,
              generated through their local medical practitioner;
            </li>
            <li>
              consultation with their medical practitioner before abandoning or
              modifying their ongoing treatment.
            </li>
          </ul>
        </li>
        <li>
          The User agrees that by using Consult, the Practitioners will not be
          conducting physical examination of the Users, hence, they may not have
          or be able to gain important information that is usually obtained
          through a physical examination. User acknowledges and agrees that he/she
          is aware of this limitation and agrees to assume the complete risk of
          this limitation.
        </li>
        <li>
          The User understands that Consult shall not form a substitute for
          treatment that otherwise needs physical examination/immediate
          consultation. Further, the User understands that the advice provided by
          the Practitioner is based on general medical conditions and practices
          prevalent in India, and to the best of his knowledge and ability, and
          not for conditions which are territory specific i.e., for regions other
          than India, irrespective of location where the User is procuring
          medical services or engaging in communication with the Practitioner.
        </li>
        <li>
          During the consultation and thereafter, the Practitioner may upload the
          prescription/health records of the User on the account of the User on
          the Website for access by the User. However, it is expressly clarified
          that for Users who are not located within India and using Consult, the
          Practitioner may or may not issue a prescription, at his sole
          discretion.
        </li>
        <li>
          The User hereby agrees to DTPL's medical team carrying out an audit of
          his/her consultations with the Practitioner for the purpose of
          improving treatment quality, user experience, and other related
          processes. The User acknowledges that the subject matter of audit may
          include texts, messages, photographs, reports, audio or video
          recordings or any other material exchanged between the User and the
          Practitioner which could inter alia include User's personal
          information, including sensitive personal information. This personal
          information will be processed in accordance with Privacy Policy.
        </li>
        <li>
          User shall refrain from raising any personal queries or seeking advice
          from Practitioner which are not related to a specific disease /
          medicine/medical condition.
        </li>
        <li>
          Users shall not use abusive language with the Practitioner. In the
          event of an abuse from the User is reported by a Practitioner, DTPL
          reserves the right to terminate the Service and shall not provide such
          Services in future. DTPL is not responsible for honouring any refund
          request towards his/her consultation paid to DTPL.
        </li>
        <li>
          Users may share images or videos of the affected areas of their body
          parts with the Practitioner only if it is absolutely necessary for
          diagnosing his/her condition and if he/she is personally comfortable
          in sharing such images or videos.
        </li>
        <li>
          Users shall ensure that any interaction/communication with the
          Practitioners, including sharing images or videos of the body parts,
          shall be only through the Website. The Users shall not rely on any
          other external modes of communication for interacting/communicating
          with the Practitioners.
        </li>
        <li>
          Users shall be prepared to share all relevant documents or reports to
          the Practitioner promptly upon request.
        </li>
        <li>
          For every paid consultation, the Users shall not obtain consultation for
          more than one User. In the event, the Users attempt to obtain
          consultation for more than one User through a single paid consultation,
          such consultations will not be addressed by the relevant Practitioner.
        </li>
        <li>
          Users shall not persuade Practitioners to prescribe drugs (including
          higher dose strength) that do not conform to the regulations under the
          Telemedicine Guidelines. The restricted drugs are as follows:
          <ul style={styles.list}>
            <li>Medication for Medical Termination Pregnancy (MTP)</li>
            <li>
              Drugs under the following pharmaceutical classifications such as;
              sedatives, hypnotics, opioids, schedule X drugs, or fourth
              generation antibiotics.
            </li>
          </ul>
        </li>
        <li>
          If restricted drugs are indicated for treatment or management of a
          disease or condition by a Practitioner, the User shall physically visit
          the Practitioner of their choice to confirm the requirements/necessity
          for prescribing such restricted drugs.
        </li>
        <li>
          User understands and agrees to provide accurate information and will not
          use the Services for any acts that are considered to be illegal in
          nature.
        </li>
        <li>
          The User agrees and understands that the transaction with the
          Practitioner and DTPL are subject to jurisdiction of Indian laws and that
          any claim, dispute or difference arising from it shall be subject to the
          jurisdiction provision as contained in the Terms and Conditions
          hereunder, at all times. The User further agrees and understands that the
          Practitioner is a medical practitioner who is licensed to practice
          medicine in India and the onus is on the User to determine if he/she is
          eligible to consult with the Practitioners via the Website. It is
          expressly clarified that at no point in time can it be construed that
          the Practitioner is practicing medicine in a territory other than India,
          irrespective of where the User is located and procures medical services
          or engages in communication with the Practitioner, in any manner
          whatsoever.
        </li>
        <li>
          The User shall indemnify and hold harmless DTPL and its affiliates,
          subsidiaries, directors, officers, employees and agents from and against
          any and all claims, proceedings, penalties, damages, loss, liability,
          actions, costs and expenses (including but not limited to court fees and
          attorney fees) arising due to or in relation to the use of Website by
          the User, by breach of the Terms or violation of any law, rules or
          regulations by the User, or due to such other actions, omissions or
          commissions of the User that gave rise to the claim.
        </li>
        <li>
          The User shall make payment using the payment gateway to make payments
          online, solely at User's discretion. Should there be any issues with
          regard to the payment not reaching the DTPL account, the User may
          contact DTPL's support team via email: support@care2connect.in.
        </li>
      </ol>

      <h3 style={styles.subheading}><b>C. Refund policy for Users:</b></h3>
      <ol style={styles.list}>
        <li>
          In the event it is proved that the Practitioners have acted in
          contravention of any applicable laws, DTPL shall provide complete refund
          to the User, subject to investigation undertaken by DTPL.
        </li>
        <li>
          If the cancellation is due to the abusive nature of the User, such User
          shall not be eligible for any refund and DTPL shall be entitled to take
          any legal action, depending upon the gravity of the matter.
        </li>
        <li>
          User shall refrain from raising any personal queries or seek advice
          which are not related to a specific disease / medicine/medical condition.
          In the event the User raises any such personal queries or seek advice,
          DTPL reserves the right to terminate the consultation of such Users and
          further, such Users will not be entitled to any refund.
        </li>
        <li>
          In case a Practitioner does not respond to a paid consultation within
          ten (10) minutes from the time of starting a consultation/appointment or
          does not respond for more than fifteen (15) minutes during an active
          consultation, the User shall have the right to request for a refund and
          any amounts paid by the User with respect to the such consultations will
          be refunded.
        </li>
        <li>
          In case a Practitioner does not provide a consultation summary
          prescription for a particular consultation, then the User shall have the
          right to request for a refund and any amounts paid by the User with
          respect to such consultations will be refunded. Refunds will not be
          provided if the Practitioner has provided a consultation summary
          prescription to the User.
        </li>
        <li>
          In case a Practitioner is unreasonably abrupt or quick to complete a
          particular consultation, then the User shall have the right to request
          for a refund. DTPL shall provide complete refund to the User, subject to
          investigation undertaken by DTPL.
        </li>
        <li>
          DTPL reserves the right to permanently block Users from future Services
          in the event DTPL receives multiple cancellation request from such Users
          for reasons which do not form part of the cancellation policy of DTPL.
        </li>
        <li>
          Users are allowed a period of three (3) days to flag any consultation as
          inadequate, and request for a refund. No refund requests shall be
          considered thereafter.
        </li>
        <li>
          Users can request a refund by contacting DTPL’s support email:
          support@care2connect.in
        </li>
        <li>
          DTPL shall check the details and process the refund where applicable,
          solely at its discretion. After a refund request is processed, the money
          will be refunded to the User in seven (7) working days from the day
          refund has been approved by DTPL.
        </li>
        <li>
          In the event a User raises any concerns regarding the inappropriateness
          of a particular consultation on the Consult platform, the User agrees that
          the refund or any other outcome for any such concerns raised by the User
          will be subject to a detailed review of the said concerns by DTPL as per
          DTPL’s internal policies.
        </li>
        <li>
          In all matters related to refund and settlement under this Agreement,
          DTPL shall decide so at its sole and absolute discretion after detailed
          review of the matter and taking into account all the involved parties’
          information. The decision of DTPL shall be final in this regard.
        </li>
      </ol>

      <h3 style={styles.subheading}><b>D. Express Disclaimers:</b></h3>
      <ol style={styles.list}>
        <li>
          Consult is intended for general purposes only and is not meant to be used
          in emergencies/serious illnesses requiring physical consultation. Further,
          if the Practitioner adjudges that a physical examination would be
          required and advises ‘in-person consultation’, it is the sole
          responsibility of the User, to book an appointment for physical
          examination or/and in-person consultation whether the same is with the
          Practitioner listed on the Website or otherwise. In case of any
          negligence on the part of the User in acting on the same and the
          condition of the User deteriorates, DTPL shall not be held liable.
        </li>
        <li>
          Consult is a mode available to Users to assist them to obtain
          consultation from Practitioners and does not intend to replace the
          physical consultation with a medical practitioner.
        </li>
      </ol>

      <h2 style={styles.heading}>TERMINATION</h2>
      <p style={styles.paragraph}>
        DTPL reserves the right to suspend or terminate services provided through
        the Website and under this Agreement, with or without notice at any time,
        and to exercise any other remedy available under law.
      </p>

      <h2 style={styles.heading}>LIMITATION OF LIABILITY</h2>
      <p style={styles.paragraph}>
        In no event, including but not limited to negligence, shall DTPL, or any
        of its directors, officers, employees, agents or service providers,
        affiliates and group companies (collectively, the <b> “Protected Entities” </b>)
        be liable for any direct, indirect, special, incidental, consequential,
        exemplary or punitive damages arising from, or directly or indirectly
        related to, the use of, or the inability to use, the Website or the
        content, materials and functions related thereto, the Services, User’s
        provision of information via the Website, , even if such Protected Entity
        has been advised of the possibility of such damages. In no event shall
        the Protected Entities be liable for:
      </p>
      <ul style={styles.list}>
        <li>
          any content posted, transmitted, exchanged or received by or on behalf
          of any User or other person on or through the Website;
        </li>
        <li>any unauthorized access to or alteration of your transmissions or data</li>
      </ul>

      <h2 style={styles.heading}>SEVERABILITY</h2>
      <p style={styles.paragraph}>
        If any provision of the Agreement is invalid as per applicable law, held
        by a court of competent jurisdiction or arbitral tribunal to be
        unenforceable under applicable law, then such provision shall be excluded
        from this Agreement and the remainder of the Agreement shall be
        interpreted as if such provision were so excluded and shall be
        enforceable in accordance with its terms; provided however that, in such
        event, the Agreement shall be interpreted so as to give effect, to the
        greatest extent consistent with and permitted by applicable law, to the
        meaning and intention of the excluded provision as determined by such
        court of competent jurisdiction or arbitral tribunal.
      </p>

      <h2 style={styles.heading}>WAIVER</h2>
      <p style={styles.paragraph}>
        No provision of this Agreement shall be deemed to be waived and no breach
        excused, unless such waiver or consent shall be in writing and signed by
        DTPL. Any consent by DTPL to, or a waiver by DTPL of any breach by you,
        whether expressed or implied, shall not constitute consent to, waiver of,
        or excuse for any other different or subsequent breach.
      </p>

      <h2 style={styles.heading}>APPLICABLE LAW AND DISPUTE SETTLEMENT</h2>
      <p style={styles.paragraph}>
        The parties agree that this Agreement and any contractual obligation
        between DTPL and User will be governed by the laws of India.
      </p>
      <p style={styles.paragraph}>
        The courts at Bathinda (Punjab) shall have exclusive jurisdiction over any
        disputes arising out of or in relation to this Agreement, User’s use of
        the Website or the Services or the information to which it gives access.
      </p>
    </div>
  );
}