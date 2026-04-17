import { color } from "framer-motion";
import React, { useState,useEffect } from "react";
import { useParams } from "react-router-dom";
import { CgOverflow } from "react-icons/cg";
import useApi from "../../functions/api";
const API_BASE_URL = import.meta.env.VITE_API_URL;
const DisplayProfileEdit = () => {
  const [doctor, setDoctor] = useState({
    name: "Dr. James Graham",
    degree: "MBBS",
    hospital: "Apollo Hospitals, Newark, USA",
    experience: "20 Years +",
    contact: "+41 989 001 989",
    address: "California City State: IA",
    fees: "500",
    ImageUrl: "https://placehold.co/200x200"
  });
const {getapi,uploadImage,postapi} = useApi()
    const {id}=useParams()
   const fetch_doc=async()=>{
            try {
                const result = await getapi('/doctors/'+id);
                console.log(result)
                if(result.data){
                    // setDoctor(result.data)
                    try {
                      const res = await fetch(`${API_BASE_URL}/image/${result.data?.documents?.photo}`, {
                                  headers: {
                                    "ngrok-skip-browser-warning": "true"
                                  }
                                });
                      // console.log(res)
                      const blob = await res.blob();
                      const objectUrl = URL.createObjectURL(blob);
                      setDoctor({...result.data,ImageUrl:objectUrl})
                    } catch (err) {
                      console.error(`Image fetch failed:`, err);
                      return doctor // fallback image
                    }
                }
            } catch (error) {
                console.error(error)
            }
    
        }
        useEffect(() => {
         fetch_doc()
        }, [id])

  const [specialities, setSpecialities] = useState([
    "Cardiology",
    "Neurology",
    "Periodontology",
    "Psychology"
  ]);

  const [image, setimage] = useState("");
  const [newSpeciality, setNewSpeciality] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);
  const [updateMessage, setUpdateMessage] = useState("");
  const handleInputChange = (field, value) => {
    setDoctor(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setimage(file);
        handleInputChange('ImageUrl',e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const addSpeciality = () => {
    if (newSpeciality.trim() && !specialities.includes(newSpeciality.trim())) {
      setSpecialities(prev => [...prev, newSpeciality.trim()]);
      setNewSpeciality("");
    }
  };

  const removeSpeciality = (index) => {
    setSpecialities(prev => prev.filter((_, i) => i !== index));
  };

  // Inline styles
  const styles = {
    container: {
      display: 'flex',
      height: '80%',
      width: '80%',
      backgroundColor: '#f3f4f6',
      padding: '10%',
    },
    profileSection: {
      width: '50%',
      padding: '32px',
      backgroundColor: 'white',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      display: 'flex',
      flexDirection: 'column'
    },
    detailsSection: {
      width: '50%',
      padding: '32px',
      backgroundColor: '#262d69ff',
      color: 'white',
      display: 'flex',
      flexDirection: 'column'
    },
    image: {
      width: 200,
      height: 200,
      objectFit: 'cover',
      borderRadius: '0.5rem',
      marginBottom: '16px'
    },
    label: {
      fontSize: '0.875rem',
      fontWeight: '500',
      color: '#374151',
      marginBottom: '4px'
    },
    input: {
      width: '95%',
      padding: '8px 12px',
      border: '1px solid #d1d5db',
      backgroundColor:'white',
      borderRadius: '0.375rem',
      fontSize: '1rem',
      outline: 'none',
      color:'black'
    },
    inputFocus: {
      border: '1px solid #3b82f6',
      boxShadow: '0 0 0 3px rgba(59, 130, 246, 0.1)'
    },
    redLabel: {
      fontSize: '0.75rem',
      textTransform: 'uppercase',
      color: '#ffffffff',
      marginBottom: '8px'
    },
    feeContainer: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: '16px'
    },
    feeInputContainer: {
      display: 'flex',
      alignItems: 'center'
    },
    rupeeSymbol: {
      marginRight: '4px'
    },
    feeInput: {
      backgroundColor: '#ffffffff',
      color: 'black',
      padding: '8px 12px',
      borderRadius: '0.375rem',
      width: '80px',
      textAlign: 'center',
      border: 'none',
      outline: 'none'
    },
    specialityContainer: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '8px',
      marginTop: '8px',
      marginBottom: '8px'
    },
    specialityTag: {
      backgroundColor: '#374151',
      color: 'white',
      padding: '4px 12px',
      borderRadius: '0.375rem',
      display: 'flex',
      alignItems: 'center',
      fontSize: '0.875rem'
    },
    removeButton: {
      marginLeft: '8px',
      color: '#f87171',
      cursor: 'pointer',
      fontWeight: 'bold'
    },
    addSpecialityContainer: {
      display: 'flex',
      gap: '8px'
    },
    addSpecialityInput: {
      flex: 1,
      padding: '12px 12px',
      border: '1px solid #4b5563',
      borderRadius: '0.375rem',
      backgroundColor: '#ffffffff',
      color: 'black',
      fontSize: '0.875rem'
    },
    addButton: {
      padding: '4px 12px',
      backgroundColor: '#0facbdff',
      color: 'white',
      borderRadius: '0.375rem',
      border: 'none',
      cursor: 'pointer',
      fontSize: '0.875rem'
    },
    addButtonHover: {
      backgroundColor: '#1d4ed8'
    },
    textInput: {
      width: '95%',
      padding: '12px 12px',
      border: '1px solid #4b5563',
      borderRadius: '0.375rem',
      backgroundColor: '#ffffffff',
      color: 'black'
    },
    headerText: {
      fontSize: '1.5rem',
      fontWeight: 'bold',
      marginBottom: '4px'
    },
    subText: {
      color: '#9ca3af',
      marginBottom: '4px'
    },
    updateButton: {
      backgroundColor: '#dc2626',
      color: 'white',
      padding: '12px 24px',
      border: 'none',
      borderRadius: '0.375rem',
      fontSize: '1rem',
      fontWeight: 'bold',
      cursor: 'pointer',
      marginTop: 'auto'
    },
    updateButtonHover: {
      backgroundColor: '#b91c1c'
    },
    updateButtonDisabled: {
      backgroundColor: '#6b7280',
      cursor: 'not-allowed'
    },
    updateMessage: {
      backgroundColor: '#10b981',
      color: 'white',
      padding: '12px',
      borderRadius: '0.375rem',
      marginBottom: '16px',
      textAlign: 'center'
    }
  };

   const handleUpdate = async() => {
    setIsUpdating(true);
    let documents={...doctor.documents}
    try {
      if(image!==''){
        const url=await uploadImage(image)
        documents={...doctor.documents,photo:url?.data?.file_id||null}
      }
      const res=await postapi('/doctors/'+id,{...doctor,documents})
      console.log(res)
    } catch (error) {
      alert(error)
    }
    // Simulate API call
    setTimeout(() => {
      setIsUpdating(false);
      setUpdateMessage("Profile updated successfully!");
      setTimeout(() => {
        setUpdateMessage("");
      }, 3000);
    }, 1000);
  };


  return (
    <div style={styles.container}>
      {/* Doctor Profile Section */}
      <div style={styles.profileSection}>
        <img
          src={doctor.ImageUrl}
          alt="Profile..."
          style={styles.image}
        />
        <div style={{ marginBottom: '16px' }}>
          <label style={styles.label}>Name</label>
          <input
            type="text"
            value={doctor.name}
            onChange={(e) => handleInputChange('name', e.target.value)}
            style={{ ...styles.input, ...styles.inputFocus }}
          />
        </div>
        <div style={{ marginBottom: '16px' }}>
          <label style={styles.label}>Degree</label>
          <input
            type="text"
            value={doctor.degree}
            onChange={(e) => handleInputChange('degree', e.target.value)}
            style={{ ...styles.input, ...styles.inputFocus }}
          />
        </div>
        <div style={{ marginBottom: '16px' }}>
          <label style={styles.label}>About</label>
          <input
            type="text"
            value={doctor.about}
            onChange={(e) => handleInputChange('about', e.target.value)}
            style={{ ...styles.input, ...styles.inputFocus }}
          />
        </div>
        <div style={{ marginBottom: '16px' }}>
          <label style={styles.label}>Profile Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            style={{
              ...styles.input,
              ...styles.inputFocus,
              cursor: 'pointer'
            }}
          />
        </div>
      </div>

      {/* Doctor Details Section */}
      <div style={styles.detailsSection}>
         {updateMessage && (
          <div style={styles.updateMessage}>
            {updateMessage}
          </div>
        )}

        {/* Fee Section */}
        <div style={styles.feeContainer}>
          <p style={styles.redLabel}>PROFILE</p>
          <div style={styles.feeInputContainer}>
            <span style={styles.rupeeSymbol}>₹</span>
            <input
              type="text"
              value={doctor.fees}
              onChange={(e) => handleInputChange('fee', e.target.value)}
              style={styles.feeInput}
            />
          </div>
        </div>

        {/* Doctor Name and Hospital */}
        <div style={{ marginBottom: '16px' }}>
          <h1 style={styles.headerText}>{doctor.name}</h1>
          <p style={styles.subText}>{doctor.degree}</p>
          <p style={styles.subText}>{doctor.hospital}</p>
        </div>

        {/* Speciality Tags */}
        <div style={{ marginBottom: '16px' }}>
          <p style={styles.redLabel}>SPECIALITY</p>
          <div style={styles.specialityContainer}>
            {specialities.map((speciality, index) => (
              <div key={index} style={styles.specialityTag}>
                {speciality}
                <button
                  onClick={() => removeSpeciality(index)}
                  style={styles.removeButton}
                >
                  ×
                </button>
              </div>
            ))}
          </div>
          <div style={styles.addSpecialityContainer}>
            <input
              type="text"
              value={newSpeciality}
              onChange={(e) => setNewSpeciality(e.target.value)}
              placeholder="Add new speciality"
              style={styles.addSpecialityInput}
              onKeyPress={(e) => e.key === 'Enter' && addSpeciality()}
            />
            <button
              onClick={addSpeciality}
              style={styles.addButton}
              onMouseOver={(e) => e.target.style.backgroundColor = styles.addButtonHover.backgroundColor}
              onMouseOut={(e) => e.target.style.backgroundColor = styles.addButton.backgroundColor}
            >
              Add
            </button>
          </div>
        </div>

        {/* Experience */}
        <div style={{ marginBottom: '16px' }}>
          <p style={styles.redLabel}>EXPERIENCE</p>
          <input
            type="text"
            value={doctor.experience}
            onChange={(e) => handleInputChange('experience', e.target.value)}
            style={styles.textInput}
          />
        </div>

        {/* Contact */}
        <div style={{ marginBottom: '16px' }}>
          <p style={styles.redLabel}>CONTACT</p>
          <input
            type="text"
            value={doctor.phone}
            onChange={(e) => handleInputChange('phone', e.target.value)}
            style={styles.textInput}
          />
        </div>

        {/* Address */}
        <div>
          <p style={styles.redLabel}>ADDRESS</p>
          <input
            type="text"
            value={doctor.address}
            onChange={(e) => handleInputChange('address', e.target.value)}
            placeholder="address and State"
            style={{ ...styles.textInput, marginBottom: '8px' }}
          />
          {/* <input
            type="text"
            value={doctor.street}
            onChange={(e) => handleInputChange('street', e.target.value)}
            placeholder="Street and Zip"
            style={styles.textInput}
          /> */}
        </div>

        <button
          onClick={handleUpdate}
          disabled={isUpdating}
          style={{
            ...styles.updateButton,
            ...(isUpdating ? styles.updateButtonDisabled : {}),
            ...(isUpdating ? {} : styles.updateButtonHover)
          }}
          onMouseOver={(e) => !isUpdating && (e.target.style.backgroundColor = styles.updateButtonHover.backgroundColor)}
          onMouseOut={(e) => !isUpdating && (e.target.style.backgroundColor = '#dc2626')}
        >
          {isUpdating ? 'Updating...' : 'Update Profile'}
        </button>

        
      </div>
    </div>
  );
};

export default DisplayProfileEdit;
