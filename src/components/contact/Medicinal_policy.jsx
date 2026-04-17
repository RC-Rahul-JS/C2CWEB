import React from 'react'
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

const Medicinal_policy = () => {
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
       Care2Connect Information System on medicines and other medicinal products
      </h1>
      <p style={styles.paragraph}>
       This feature is an information source on medicines and/or medicinal products and concentrates on providing information (critical or otherwise) required for understanding such information including but not limited to the: components or elements used in the manufacturing of such medicines and/or medicinal products,
      </p>
      <br/>
      <ul style={styles.list}>
       <b> <li>
          the side effects that may be caused or arise owing to the use of the medicines and/or medicinal products,
        </li>
        <li>the alternative medicines/medicinal products that may be used for certain type or category of medicines/medicinal products</li>
        <li>symptoms and associated medicines/medicinal products generally administered in such cases.</li></b>
      </ul>
<br/>
      <h2 style={styles.heading}>1. For Users:</h2>

     
      <ul style={styles.list}>
        <li>
           You understand that any information provided under this feature is not intended to serve as a substitute for clinical advice and should not be relied upon while making treatment related decisions. You are hereby notified that the medicines and/or medicinal products related information differs from country to country and varies from region to region and hence the information/content published herein is India specific and neither Care2Connect nor the content owner is responsible for the applicability of the content outside India. Care2Connect provides information here on an ‘as is’, basis and not with an intention to replace consultation with a qualified medical practitioner.

        </li>
        <li>Care2Connect has used commercially reasonable efforts to source the information from reliable databases, however, you understand that the information contained in this feature is brought to you from open source platforms and third party sites/research reports. Care2Connect shall not be responsible or in any manner be liable for the accuracy of the information or for any errors, omissions or inaccuracies contained herein irrespective of the reason for the cause of such occurrence, or for any consequences arising therefrom. The inclusion or exclusion of any medicines and/or medicinal products does not mean that Care2Connect advocates or rejects the use of a particular medicine and/or medicinal product listed herein.</li>
        <li>You understand that the information on medicines and/or medicinal products contained herein does not constitute an offer or invitation or advise to use the same. The information on medicines and/or medicinal products provided hereunder should not be relied upon in connection with any decision to self-medicate. It is suggestible that you always consult a medical practitioner at all times prior to relying upon any information set out herein.</li>
      </ul>
<br/>
      <h2 style={styles.heading}>2. For Practitioners:</h2>

      <ul style={styles.list}>
        <li>Practitioners agree and acknowledge that Care2Connect does not make any representation or warranty and does not guarantee the accuracy and/or legitimacy of any information or content provided vide the feature mentioned herein.</li>
        <li>The feature herein acts as an information source only and not as a database of medical prescription, and thus, does not warrant or confirm the validity, accuracy, completeness, safety, usefulness, reliability, legality, quality and/ or the applicability thereof. The Practitioners understand that any information provided under this feature is therefore not intended to serve as a substitute for clinical judgement and agrees to use his/her discretion while relying upon the same for treatment related advice, decisions or otherwise.</li>
        <li>Care2Connect does not represent or warrant that the information provided herein will meet with the requirements or expectations of the Practitioner and that any content, material or results that may be obtained from use of information provided under the said feature will be accurate, timely, complete, reliable, genuine and that any errors with regard to the same will be correct at all times.</li>

      </ul>
<br/>
      <h2 style={styles.heading}>3. Disclaimer:</h2>

       <ul style={styles.list}>
            <li>The content/information provided herein, regarding medicine and/or medicinal products including but not limited to dietary supplements etc., have not been evaluated or approved by the Drug Controller of India or any other statutory body.</li>
            <li>THE INFORMATION PROVIDED UNDER THIS FEATURE IS BROUGHT TO THE VIEWERS ON AN, "AS IS" AND "AS AVAILABLE" BASIS, WITHOUT ANY WARRANTY OF ANY KIND, EXPRESS OR IMPLIED. CARE2CONNECT EXPRESSLY DISCLAIMS ALL WARRANTEES OF ANY KIND, WHETHER EXPRESSED OR IMPLIED, STATUTORY OR OTHERWISE, INCLUDING, WITHOUT LIMITATION, IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, NON-INFRINGEMENT, SECURITY, ACCURACY OR COMPLETENESS OF THE INFORMATION PROVIDED HEREIN. CARE2CONNECT ALSO EXPRESSLY DISCLAIMS ANY AND ALL LIABILITY TO ANY PERSON WHOSOEVER IN RESPECT OF ANY LOSS, DAMAGE, DEATH, PERSONAL INJURY OR OTHER CONSEQUENCES WHATSOEVER, HOWSOEVER CAUSED OR ARISING HEREUNDER, BY THEIR USE OF OR RELIANCE UPON, IN ANY WAY, TO THE INFORMATION CONTAINED HEREIN.</li>
      </ul>
<br/>
<h2 style={styles.heading}>4. Limitation of Liability.</h2>

      
      <p style={styles.paragraph}>
       In no event, shall Care2Connect be liable to you for any lost or corrupted data, downtime, lost profits, business interruption, replacement service or other special, incidental, consequential, punitive or indirect damages, however caused and regardless of theory of liability, including without limitation negligence and in no event shall the total aggregate liability of Care2Connect, for all claims arising out of or under these terms and conditions, exceed INR 1000 (Indian Rupees One Thousand only).
      </p>
<br/>
<h2 style={styles.heading}>5. Change or modification: </h2>


      <p style={styles.paragraph}>
       Any reference to any medicines and/or medicinal products thereof, is subject to change/modification depending upon the applicable laws/technical/medical updates. These, changes or improvements to such medicines and/or medicinal products may be made at any time without notice.
      </p>
<br/>
<h2 style={styles.heading}>6. Hold harmless: </h2>


      <ul style={styles.list}>
        <li>The use of the feature herein and the content is at the viewer’s sole risk and consequence. Care2Connect shall not be responsible for the results of viewer’s decisions resulting from the use of this feature.</li>
        <li>The viewers/Users/Practitioners hereby release and agree to hold harmless Care2Connect, its affiliates/group companies, its directors, officers, employees, agents, successors, advisors, consultants, representatives, and assigns from any and all claims, losses, related suits, actions, proceedings, investigations, judgments, deficiencies, damages, settlements, liabilities, reasonable legal fees and expenses incurred, by the viewers/Users/Practitioners arising due to the negligence or misconduct of viewers/Users/Practitioners or due to the access of or decisions taken on the information provided herein.</li>

      </ul>
<br/>
<h2 style={styles.heading}>7. Third Party Links: </h2>

      <p style={styles.paragraph}>
        to may provide links to third party websites or external websites/internal servers or resources including advertisements by others. Care2Connect has no control over such sites and the information provided in them. Care2Connect does not recommend and does not endorse the content on/of any third party websites including that of advertisers. Care2Connect is not responsible or liable for the content of these external sites nor does it endorse, warrant or guarantee the accuracy, genuineness, reliability offered or advertised on the products, services or information provided by such third party websites.
      </p>
<br/>
<h2 style={styles.heading}>8. Payment: </h2>

      <p style={styles.paragraph}>
        The prices mentioned with respect to the medicines/drugs are for indicative purposes.
      </p>
     
    </div>
  )
}

export default Medicinal_policy
