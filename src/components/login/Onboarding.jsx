import React, { useState } from 'react';
import {useNavigate} from 'react-router-dom';
import imageCompression from 'browser-image-compression';
import Stethoscope from '../../assets/login/stethoscope.png';
import { motion, AnimatePresence } from 'framer-motion';
import care2connect from '../../assets/login/pp.png';
import {useEffect} from 'react';
import jsonfile from '../../functions/1.json'
import useApi from '../../functions/api';
import ConsultLetter from '../contact/Consult';


const Onboarding = () => {
    const {postapi,uploadImage} = useApi()
    const [step, setStep] = useState(3); 
const [uploadedFiles, setUploadedFiles] = useState({
  idProof: null,
  registrationDoc: null,
  hospitalId: null,
  photo: null
});

const fetchDegrees = async () => {
  try {
    const res = await fetch('');
    const data = await res.json();
    setDegreeList(data);
  } catch (err) {
    console.error('Failed to fetch degrees', err);
  }
};

const fetchCities = async () => {
  try {
    const res = await fetch('');
    const data = await res.json();
    setCityList(data);
  } catch (err) {
    console.error('Failed to fetch cities', err);
  }
};

const fetchColleges = async () => {
  try {
    const res = await fetch('');
    const data = await res.json();
    setCollegeList(data);
  } catch (err) {
    console.error('Failed to fetch colleges', err);
  }
};


const SearchableDropdown = ({ label, options, value, onChange, placeholder }) => {
  const [search, setSearch] = useState('');
  const [showList, setShowList] = useState(false);

  const filteredOptions = options.filter(opt =>
    opt.toLowerCase().includes(search.toLowerCase())
  );

  const handleSelect = (opt) => {
    onChange(opt);
    setSearch(opt);
    setShowList(false);
  };

  return (
    <div style={{ marginBottom: '1px', position: 'relative' }}>
      <label style={styles.label}>{label}</label>
      <input
        style={styles.input}
        placeholder={placeholder}
        value={search || value}
        onFocus={() => setShowList(true)}
        onChange={(e) => {
          setSearch(e.target.value);
          setShowList(true);
        }}
      />
      {showList && filteredOptions.length > 0 && (
      <div
    style={{
      position: 'absolute',
      backgroundColor: '#fff',
      color: '#000',
      width: '91%',
      borderRadius: '8px',
      boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
      zIndex: 100,
      maxHeight: '150px',
      overflowY: 'auto',
      scrollbarWidth: 'none', // Firefox
      msOverflowStyle: 'none' // IE and Edge
    }}
    className="dropdown-list"
  >
    {filteredOptions.map((opt, idx) => (
      <div
        key={idx}
        style={{
          padding: '3px',
          cursor: 'pointer',
          borderBottom: '1px solid #eee'
        }}
        onClick={() => handleSelect(opt)}
      >
        {opt}
      </div>
    ))}
  </div>
      )}
    </div>
  );
};


const handleFileChange = async (e, field) => {
  const file = e.target.files[0];
  if (!file) return;

  try {
    const compressedFile = await imageCompression(file, {
      maxSizeMB: 0.3,
      maxWidthOrHeight: 600,
      useWebWorker: true,
    });

    const reader = new FileReader();
    reader.onloadend = () => {
      setUploadedFiles((prev) => ({
        ...prev,file,
       [field]: { file, preview: reader.result }
      }));
    };

    reader.readAsDataURL(compressedFile);
  } catch (err) {
    console.error('Image compression failed, using original file.', err);

    const reader = new FileReader();
    reader.onloadend = () => {
      setUploadedFiles((prev) => ({
        ...prev,
        [field]: { file, preview: reader.result }
      }));
    };

    reader.readAsDataURL(file);
  }
};
// const uploadImage = async (img) => {
//   try {
//     // Create FormData to send file as multipart/form-data
//     const formData = new FormData();
//     formData.append("file", img); // Ensure field name matches Flask API

//     // Make POST request
//     const res = await fetch("http://localhost:5000/upload", {
//       method: "POST",
//       body: formData
//     });

//     if (!res.ok) {
//       throw new Error(`Failed to upload: ${res.statusText}`);
//     }

//     const data = await res.json();
//     console.log("Upload successful:", data);
//     return data; // contains message and file_id

//   } catch (error) {
//     console.error("Error uploading image:", error);
//     return null;
//   }
// };



const handleSubmit = async () => {
  try {
    // Parallel upload for all documents
    const [idProofRes, registrationDocRes, hospitalIdRes, photoRes] = await Promise.all([
      uploadImage(uploadedFiles.idProof.file),
      uploadImage(uploadedFiles.registrationDoc.file),
      uploadImage(uploadedFiles.hospitalId.file),
      uploadImage(uploadedFiles.photo.file)
    ]);

    // Build final data
    const finalData = {
      ...formData,
      documents: {
        idProof: idProofRes?.data?.file_id || null,
        registrationDoc: registrationDocRes?.data?.file_id || null,
        hospitalId: hospitalIdRes?.data?.file_id || null,
        photo: photoRes?.data?.file_id || null
      }
    };

    console.log("Final Data to Submit:", finalData);

    // ✅ Send finalData to your backend (if needed)
  await postapi("/onboard", finalData);
  console.log("📝Doctor Registration Data:", JSON.stringify(finalData, null, 2));
  alert('Thank you! Your application has been submitted');
  navigate('/');

  } catch (error) {
    console.error("Error in submitting form:", error);
    alert("Fail")
  }
};



const [formData, setFormData] = useState({
  terms:'',
  fullName: '',
  phone: '',
  title: '',
  specialization: '',
  gender: '',
  city: '',
  registrationNumber: '',
  registrationCouncil: '',
  registrationYear: '',
  degree: '',
  college: '',
  completionYear: '',
  experience: '',
  clinicLocation: '',
  state:'',
  timings: '',
  fees: '',
  status:'Pending'
});
  
useEffect(() => {
  if (formData.state) {
    const filteredData = jsonfile.filter(item => item.state === formData.state);

    const filteredDegrees = [...new Set(filteredData.map(item => item.course))];
    const filteredColleges = [...new Set(filteredData.map(item => item.college))];

    setDegreeList(filteredDegrees);
    setCollegeList(filteredColleges);
  } else {
    // fallback when no state is selected
    setDegreeList([]);
    setCollegeList([]);
  }
}, [formData.state]);

useEffect(() => {
  // Get unique states from the JSON file
  const states = [...new Set(jsonfile.map(item => item.state))];
  setCityList(states);
}, []);

useEffect(() => {
  if (formData.state && formData.college) {
    const filteredData = jsonfile.filter(
      item => item.state === formData.state && item.college === formData.college
    );
    const filteredDegrees = [...new Set(filteredData.map(item => item.course))];
    setDegreeList(filteredDegrees);
  } else {
    setDegreeList([]);
  }
}, [formData.college, formData.state]);


const [degreeList, setDegreeList] = useState([]);
const [cityList, setCityList] = useState([]);
const [collegeList, setCollegeList] = useState([]);


    
    const [infoMessage, setInfoMessage] = useState('');
    const [showBanner, setShowBanner] = useState(false);
    const navigate = useNavigate();
     
    const setInfoWithTimeout = (message) => {
        setInfoMessage(message);
        setTimeout(() => {
            setInfoMessage('');
        }, 2000);
    };
// console.log("Loaded JSON", jsonfile);

    const stepVariants = {
        initial: { opacity: 0, x: 30 },
        animate: { opacity: 1, x: 0 },
        exit: { opacity: 0, x: -30 },
    };

    const validateStep = () => {
  switch (step) {
    case 2:
      return formData.terms
    case 3:
      return formData.title && formData.specialization && formData.gender && formData.city &&formData.phone;
    case 4:
      return formData.registrationNumber && formData.registrationCouncil && formData.registrationYear;
    case 5:
      return formData.degree && formData.state && formData.college && formData.completionYear && formData.experience;

    case 6:
      return uploadedFiles.idProof.file && uploadedFiles.registrationDoc.file && uploadedFiles.hospitalId.file && uploadedFiles.photo.file;
    case 7:
      return formData.clinicLocation && formData.timings && formData.fees;
    default:
      return true;
  }
};

    
    
    return (
        <div style={styles.fullScreenContainer}>
            <style>{globalStyles}</style>
            <div style={styles.container}>
                <div style={styles.leftPanel}>
                    <div style={styles.leftContent}>
                        <img style={{ width: '200px', alignItems: 'center' }} src={care2connect} alt="care2connectlogo" srcset="" />
                        <p style={styles.leftSubtext}>Join Care2Connect as a Verified Doctor</p>
                        <div style={{ paddingTop: 20, color: '#000' }}>
                            <p>
                                Care2Connect helps doctors expand their reach by connecting them with patients online. Create your verified profile, offer secure consultations, and manage your appointments—all in one place.
                            </p>
                            

                        </div>
                    </div>
                    <div style={styles.stethoscopeWrapper}>
                        <img src={Stethoscope} alt="Stethoscope" style={styles.stethoscopeImage} />
                    </div>
                </div>


<div style={styles.rightPanel}>
  {infoMessage && <div style={styles.infoBox}>{infoMessage}</div>}



  {step === 3 && (
    <>
      <h2>Hello Dr. {formData.fullName}! Let's build your dedicated profile.</h2>
      <label style={styles.label}>Full Name</label>
      <input style={styles.input} placeholder="Full Name" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} />

      <label style={styles.labelspeciali}>Specialization</label>
      <select style={styles.specialization} value={formData.specialization} onChange={(e) => setFormData({ ...formData, specialization: e.target.value })}>
        <option value="">Select</option>
        <option value="Cardiologist">Cardiologist</option>
        <option value="Dermatologist">Dermatologist</option>
        <option value="Pediatrician">Pediatrician</option>
      </select>

      <label style={styles.label}>Gender</label>
      <div>
        {['Male', 'Female', 'Other'].map(g => (
          <label key={g} style={{ marginLeft: 40 ,padding: 10, }}>
            <input
              type="radio"
              name="gender"
              checked={formData.gender === g}
              onChange={() => setFormData({ ...formData, gender: g })}
            /> {g}
          </label>
        ))}
      </div>

      <label style={styles.label}>Phone Number</label>
      <input style={styles.input} value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} placeholder="Enter Phone Number" />

      <label style={styles.label}>City</label>
      <input style={styles.input} value={formData.city} onChange={(e) => setFormData({ ...formData, city: e.target.value })} placeholder="Enter city" />

{/* Checkbox Agreement */}
    <label htmlFor="agree" style={{ display: "block", fontSize: 14 }}>
      <input
        type="checkbox"
        id="agree"
        name="agree"
        checked={formData.terms}
        onChange={(e) => setFormData({ ...formData, terms: e.target.checked })}
        style={{ marginRight: "8px" }}
      />
      By continuing, I agree to the <a href="/terms">Terms and Conditions</a>
    </label>

    {/* Error Message */}
    {!formData.terms && (
      <div
        role="alert"
        style={{ color: "#ff6969ff", marginTop: "6px" }}
      >
        Please accept the Terms & Conditions to continue.
      </div>
    )}

 <button
      style={{ ...styles.button, padding: "8px 12px", fontSize: "14px" }}
      onClick={() => {
        if (formData.terms) {
          setStep(step + 1);
        } else {
          setInfoWithTimeout("Please accept Terms & Conditions");
        }
      }}
    >
      Continue
    </button>

  {step === 3 && (
  <>
    <div style={{ display: 'inline-flex', gap: '10px', marginTop: '20px' }}>
      {/* <button
        style={{ ...styles.button }}
         onClick={() => {
    if (validateStep()) {
      setStep(step + 1);
    } else {
      setInfoWithTimeout("Please fill all required fields before proceeding.");
    }
  }}
      >
        Continue
      </button> */}
    </div>
  </>
)}

 </>
  )}

  {step === 4 && (
    <>
      <h2>Medical Registration</h2>
      <label style={styles.label}>Registration Number</label>
      <input style={styles.input} value={formData.registrationNumber} onChange={(e) => setFormData({ ...formData, registrationNumber: e.target.value })} />

      <label style={styles.label}>Registration Council</label>
      <input style={styles.input} value={formData.registrationCouncil} onChange={(e) => setFormData({ ...formData, registrationCouncil: e.target.value })} />

      <label style={styles.label}>Registration Year</label>
      <input style={styles.input} value={formData.registrationYear} onChange={(e) => setFormData({ ...formData, registrationYear: e.target.value })} />
  <div style={{ display: 'inline-flex', gap: '10px', marginTop: '20px' }}>
  <button style={{ ...styles.buttonSecondary, padding: '8px 12px', fontSize: '14px' }} onClick={() => setStep(step - 1)}>
    Previous
  </button>
  <button style={{ ...styles.button, padding: '8px 12px', fontSize: '14px' }}  onClick={() => {
    if (validateStep()) {
      setStep(step + 1);
    } else {
      setInfoWithTimeout("Please fill all required fields before proceeding.");
    }
  }}
>
    Continue
  </button>
</div>

   </>
  )}

  {step === 5 && (
    <>
      <h2>Education Qualification</h2>
    <SearchableDropdown
  label="State"
  options={cityList}
  value={formData.state}
  placeholder="Select or type a state"
  onChange={(val) => setFormData({ ...formData, state: val })}
/>


<SearchableDropdown
  label="College"
  options={collegeList}
  value={formData.college}
  placeholder="Select or type a college"
  onChange={(val) => setFormData({ ...formData, college: val })}
/>

<SearchableDropdown
  label="Degree"
  options={degreeList}
  value={formData.degree}
  placeholder="Select or type a degree"
  onChange={(val) => setFormData({ ...formData, degree: val })}
/>


      <label style={styles.label}>Year of Completion</label>
      <input style={styles.input} value={formData.completionYear} onChange={(e) => setFormData({ ...formData, completionYear: e.target.value })} />

      <label style={styles.label}>Years of Experience</label>
      <input style={styles.input} value={formData.experience} onChange={(e) => setFormData({ ...formData, experience: e.target.value })} />

    <div style={{ display: 'inline-flex', gap: '10px', marginTop: '20px' }}>
  <button style={{ ...styles.buttonSecondary, padding: '8px 12px', fontSize: '14px' }} onClick={() => setStep(step - 1)}>
    Previous
  </button>
  <button style={{ ...styles.button, padding: '8px 12px', fontSize: '14px' }}
    onClick={() => {
    if (validateStep()) {
      setStep(step + 1);
    } else {
      setInfoWithTimeout("Please fill all required fields before proceeding.");
    }
  }}
>
    Continue
  </button>
</div>


    </>
  )}


{step === 6 && (
  <>
    <h2>Upload Documents</h2>


    <div style={styles.fileUploadContainer}>
      <div style={styles.fileInputWrapper}>
    <label style={styles.label}>Upload ID Proof</label>
    <input type="file" accept="image/*,.pdf" onChange={(e) => handleFileChange(e, 'idProof')} style={styles.input} />
    </div>
    {uploadedFiles.idProof&& (
      <img src={uploadedFiles.idProof.preview} alt="ID Proof Preview" style={styles.thumbnail} />
    )}
</div>


<div style={styles.fileUploadContainer}>
      <div style={styles.fileInputWrapper}>
    <label style={styles.label}>Upload Medical Registration Document</label>
    <input type="file" accept="image/*,.pdf" onChange={(e) => handleFileChange(e, 'registrationDoc')} style={styles.input} />
   </div>
    {uploadedFiles.registrationDoc && (
      <img src={uploadedFiles.registrationDoc.preview} alt="Registration Doc Preview" style={styles.thumbnail} />
    )}
</div>

<div style={styles.fileUploadContainer}>
      <div style={styles.fileInputWrapper}>
    <label style={styles.label}>Upload Hospital ID</label>
    <input type="file" accept="image/*,.pdf" onChange={(e) => handleFileChange(e, 'hospitalId')} style={styles.input} />
    </div>
    {uploadedFiles.hospitalId && (
      <img src={uploadedFiles.hospitalId.preview} alt="Hospital ID Preview" style={styles.thumbnail} />
    )}
</div>

 <div style={styles.fileUploadContainer}>
      <div style={styles.fileInputWrapper}>
    <label style={styles.label}>Upload Passport Size Photo</label>
    <input type="file" accept="image/*" onChange={(e) => handleFileChange(e, 'photo')} style={styles.input} />
    </div>
    {uploadedFiles.photo && (
      <img src={uploadedFiles.photo.preview} alt="Photo Preview" style={styles.thumbnail} />
    )}
    </div>

   <div style={{ display: 'inline-flex', gap: '10px', marginTop: '20px' }}>
  <button style={{ ...styles.buttonSecondary, padding: '8px 12px', fontSize: '14px' }} onClick={() => setStep(step - 1)}>
    Previous
  </button>
  <button style={{ ...styles.button, padding: '8px 12px', fontSize: '14px' }}
    onClick={() => {
    if (validateStep()) {
      setStep(step + 1);
    } else {
      setInfoWithTimeout("Please fill all required fields before proceeding.");
    }
  }}
   >
    Continue
  </button>
</div>

  </>
)}

{step === 7 && (
  <>
    <h2>Clinic Location & Timings</h2>

    <label style={styles.label}>Clinic Address</label>
    <input style={styles.input} value={formData.clinicLocation || ''} onChange={(e) => setFormData({ ...formData, clinicLocation: e.target.value })} />

    <label style={styles.label}>Available Timings</label>
    <input style={styles.input} value={formData.timings || ''} onChange={(e) => setFormData({ ...formData, timings: e.target.value })} placeholder="Eg: 10am - 1pm, 5pm - 8pm" />

    <label style={styles.label}>Consultation Fee (₹)</label>
    <input style={styles.input} value={formData.fees || ''} onChange={(e) => setFormData({ ...formData, fees: e.target.value })} type="number" />

   <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', gap: '12px', marginTop: '20px' }}>
  <button
    style={{ ...styles.buttonSecondary, padding: '8px 16px', fontSize: '14px' }}
    onClick={() => setStep(step - 1)}
  >
    Previous
  </button>
<button
  style={{ ...styles.button, padding: '8px 16px', fontSize: '14px' }}
  onClick={handleSubmit}
>
  Finish
</button>

</div>

  </>
)}


</div>

            </div>
        </div>
    );
};

export default Onboarding;

const styles = {
    fullScreenContainer: {
        backgroundColor: '#f0f4f8',
        minHeight: '100vh',
        width: '100vw',

        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        // padding: '10px',
        fontFamily: 'Inter, sans-serif',
        marginTop:100
    },
    container: {
        display: 'flex',
        width: '85%',
        maxWidth: '1100px',
        backgroundColor: '#fff',
        borderRadius: '16px',
        boxShadow: '0 12px 30px rgba(0, 0, 0, 0.15)',
        overflow: 'visible',
        minHeight: '550px',
    },
    thumbnail: {
  width: '100px',
  height: '100px',
  objectFit: 'cover',
  borderRadius: '8px',
  marginTop: '8px',
  border: '1px solid #ccc'
},
    leftPanel: {
        flex: 1.5,
        background: 'linear-gradient(180deg, #e3f2fd 0%, #c1e4ff 100%)',
        padding: '5px',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        // justifyContent: 'end',
        // boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px',

        alignItems: 'end',
        borderTopLeftRadius: '16px',
        borderBottomLeftRadius: '16px',
        overflow: 'visible',
    },
    rightPanel: {
        flex: 1,
        padding: '35px',
        background: 'linear-gradient(135deg, #4a69bd, #3c54a6)',
        color: '#fff',
        position: 'relative',
        borderTopRightRadius: '16px',
        borderBottomRightRadius: '16px',
        display: 'flex',

        flexDirection: 'column',
        justifyContent: 'center',
    },
    leftContent: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
        justifyContent: 'start',
        height: '100%',
        zIndex: 1,
        padding: '50px 40px',
        textAlign: 'right',
        width: '300px',
        // backgroundColor: '#fff',
    },
    thumbnail: {
    width: '60px',
    height: '60px',
    objectFit: 'cover',
    borderRadius: '8px',
    marginTop: '0px', // Removed the top margin
    border: '1px solid #ccc'
  },
  fileUploadContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '15px', // Adds space between the file input and the preview
    marginBottom: '18px',
    width: '100%',
  },
  fileInputWrapper: {
    flex: 1, // Allows the input container to take up the remaining space
    display: 'flex',
    flexDirection: 'column',
  },
    leftHeading: {
        fontSize: '44px',
        color: '#0A2E50',
        fontWeight: 'bold',
        marginBottom: '10px',
        textShadow: '2px 2px 4px rgba(0,0,0,0.1)',
        textAlign: 'right',
    },
    leftSubtext: {
        color: '#1A4B7D',
        fontSize: '18px',
        lineHeight: '1.4',
        textAlign: 'right',
        fontWeight: 'bold',
    },
    successBanner: {
        backgroundColor: '#4caf50',
        color: 'white',
        padding: '12px',
        borderRadius: '8px',
        textAlign: 'center',
        marginBottom: '15px',
        fontWeight: 'bold',
        fontSize: '16px',
    },

    phoneWrapper: {
        display: 'flex',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.15)',
        border: '1px solid rgba(255, 255, 255, 0.3)',
        borderRadius: '8px',
        marginBottom: '18px',
        padding: '0 8px',
        width: '91%',
    },

    prefix: {
        color: '#fff',
        fontSize: '15px',
        marginRight: '8px',
        fontWeight: 'bold',
    },

    phoneInput: {
        backgroundColor: 'transparent',
        border: 'none',
        outline: 'none',
        color: '#fff',
        fontSize: '15px',
        width: '100%',
        padding: '12px 0',
    },

    stethoscopeWrapper: {
        position: 'absolute',
        top: '-70px',
        bottom: '-50px',
        left: '-6%',
        transform: 'translateX(-50%)',
        zIndex: 0,
    },
    stethoscopeImage: {
        height: '650px',
        objectFit: 'contain',
        opacity: 0.95,
    },
    chevron: {
        position: 'absolute',
        left: '-20px',
        top: '50%',
        transform: 'translateY(-50%)',
        backgroundColor: '#D6EDFE',
        color: '#4a69bd',
        fontSize: '30px',
        borderRadius: '50%',
        width: '35px',
        height: '65px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1,
    },
    heading: {
        fontSize: '28px',
        fontWeight: '700',
        textAlign: 'center',
        marginBottom: '15px',
    },
    infoBox: {
        backgroundColor: '#46df23ff',
        color: '#333',
        textAlign: 'center',
        padding: '10px 16px',
        borderRadius: '6px',
        marginBottom: '20px',
        fontSize: '14px',
    },
    label: {
        display: 'block',
        marginBottom: '6px',
        fontWeight: '600',
        fontSize: '15px',
        color: '#e0e0e0',
        
    },
    input: {
        width: '91%',
        padding: '12px',
        borderRadius: '8px',
        border: '1px solid rgba(255, 255, 255, 0.3)',
        backgroundColor: 'rgba(255, 255, 255, 0.15)',
        fontSize: '15px',
        marginBottom: '18px',
        color: '#fff',
        outline: 'none',
    },
     specialization: {
        width: '98%',
        padding: '12px',
        borderRadius: '8px',
        border: '1px solid rgba(255, 255, 255, 0.3)',
        backgroundColor: 'rgba(255, 255, 255, 0.53)',
        fontSize: '15px',
        marginBottom: '18px',
        color: 'rgba(55, 40, 40, 1)',

        
        outline: 'none',
    },
    inputgender: {
        width: '97%',
        padding: '12px',
        borderRadius: '8px',
        border: '1px solid rgba(255, 255, 255, 0.3)',
        backgroundColor: 'rgba(255, 255, 255, 0.15)',
        fontSize: '15px',
        marginBottom: '18px',
        color: '#fff',
        outline: 'none',
    },
    textarea: {
        width: '100%',
        height: '100px',
        borderRadius: '8px',
        border: '1px solid rgba(255, 255, 255, 0.3)',
        backgroundColor: 'rgba(255, 255, 255, 0.15)',
        fontSize: '15px',
        marginBottom: '18px',
        color: '#fff',
        outline: 'none',
        padding: '10px',
        resize: 'vertical',
    },
    button: {
        width: '96.5%',
        backgroundColor: '#ffffff',
        color: '#4a69bd',
        padding: '14px',
        borderRadius: '8px',
        fontSize: '16px',
        fontWeight: '700',
        border: 'none',
        cursor: 'pointer',
        marginTop: '10px',
        boxShadow: '0 6px 20px rgba(0, 0, 0, 0.2)',
    },
    buttonSecondary: {
  width: '96.5%',
  backgroundColor: 'transparent',
  color: '#ffffff',
  padding: '14px',
  borderRadius: '8px',
  fontSize: '16px',
  fontWeight: '600',
  border: '2px solid #ffffff',
  cursor: 'pointer',
  marginTop: '10px',
},
    scrollableForm: {
        maxHeight: '340px',
        overflowY: 'auto',
        paddingRight: '5px',
        scrollbarWidth: 'none',
        msOverflowStyle: 'none',
    },
};

const globalStyles = `
  *::placeholder {
    color: rgba(255, 255, 255, 0.6);
  }
  .scrollable-form::-webkit-scrollbar {
    display: none;
  }
`;