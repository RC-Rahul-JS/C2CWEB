  // import React, { useState } from 'react';
  // import Stethoscope from '../../assets/login/stethoscope.png';
  // import { motion, AnimatePresence } from 'framer-motion';
  // import care2connect from '../../assets/login/pp.png';
  // import { useNavigate } from 'react-router-dom';
  // import useApi from '../../functions/api';
  // import Cookies from 'js-cookie';


  // const SignUp = () => {
  //       const {postapi} = useApi(); 
  //     const [step, setStep] = useState(1);
  //     const [agree, setAgree] = useState(false)
  //     // const [phone, setPhone] = useState('');
  //     // const [otp, setOtp] = useState('');
  //     const [infoMessage, setInfoMessage] = useState('');
  //     const [showBanner, setShowBanner] = useState(false);
  //     const navigate = useNavigate();
  //     const [mode, setMode] = useState('login'); // 'login' or 'signup'
  //     const [useOtpLogin, setUseOtpLogin] = useState(false);
  //     const [formData, setFormData] = useState({
  //         name: '',
  //         dob: '',
  //         gender: '',
  //         address: '',
  //     });
  //     // const [infoMessage, setInfoMessage] = useState('');

  //     const sendOTP = async () => {
  //   const phoneRegex = /^[6-9]\d{9}$/;

  //   if (!phoneRegex.test(loginData.phone)) {
  //     setInfoWithTimeout('Please enter a valid 10-digit mobile number.');
  //     return;
  //   }

  //   const fullPhone = `+91${loginData.phone}`;
  //   try {
  //     const result = await postapi('/send-otp', { phone: loginData.phone });

  //     if (result.success) {
  //       console.log('Sending OTP to:', loginData.phone);
  //       setInfoWithTimeout(`OTP sent to ${fullPhone}`);
  //       setStep(2); // ✅ Move here to only proceed if OTP sent successfully
  //     } else {
  //       alert(result.message || 'Failed to send OTP. Please try again.');
  //     }
  //   } catch (error) {
  //     console.error('Error sending OTP:', error);
  //     alert('An error occurred. Please try again.');
  //   }
  // };

  //     const setInfoWithTimeout = (message) => {
  //         setInfoMessage(message);
  //         setTimeout(() => {
  //             setInfoMessage('');
  //         }, 2000);
  //     };
  //     const [loginData, setLoginData] = useState({
  //   phone: '',
  //   password: '',
  //   otp: '',
  // });


  // const [signupData, setSignupData] = useState({
  //   fullName: '',
  //   phone: '',
  //   password: '',
  //   offers: true,
  // });

  //     const verifyOTP = async() => {
  //         const fullOtp = loginData.otp;
  //         const phone=loginData.phone
  //     if (fullOtp.length === 6 && /^\d{6}$/.test(fullOtp)) {
  //       console.log({phone:phone,otp:fullOtp.toString()})
  //       try {
  //       const result = await postapi('/verify-otp',{phone:phone.toString(),otp:fullOtp.toString()});
  //       console.log(result)
  //             if (result.success) {
  //               if (result.data.details_required)  setInfoWithTimeout('User Not Exists! Please Register !');
  //               else {
  //                 setInfoWithTimeout('OTP verified successfully!');
  //                 Cookies.set('token', result.data.token, { expires: 1 });
  //                 setTimeout(() => {
  //                     const redirectPath = sessionStorage.getItem('redirectAfterLogin') || '/';
  //                     sessionStorage.removeItem('redirectAfterLogin'); // cleanup
  //                     navigate(redirectPath, { replace: true });
  //                 }, 300);
                  
  //               }
  //             }
  //             } catch (error) {
  //               setInfoWithTimeout(error)
  //       }
  //     } else {
  //       setInfoWithTimeout('Invalid OTP. Please try again.');
  //     }
  //     };

  //     const handleChange = (e) => {
  //         setFormData({ ...formData, [e.target.name]: e.target.value });
  //     };

  //     const Register = async(e) => {
  //         e.preventDefault();

  //         // const { name, dob, gender, address } = formData;

  //         // if (!name || !dob || !gender || !address) {
  //         //     setInfoWithTimeout('Please fill out all the required fields before submitting.');
  //         //     return;
  //         // }
  //         const fullPhone = `+91${phone}`;
  //         const payload={
  //             ...formData,
  //             phone,
  //             dateOfBirth:dob,

  //         }
  //         console.log(payload);
  //         try {
  //             const result = await postapi('/register',payload);
  //             if (result.success) {
  //                 setShowBanner(true);
  //                 Cookies.set('token', result.data.token, { expires: 1 });
  //                 setTimeout(() => {
  //                     setShowBanner(false);
  //                     const redirectPath = sessionStorage.getItem('redirectAfterLogin') || '/';
  //                     sessionStorage.removeItem('redirectAfterLogin'); // cleanup
  //                     navigate(redirectPath, { replace: true });
  //                 }, 3000); 
  //                 } 
  //         } catch (error) {
  //             setInfoWithTimeout(error);
  //         }

          
  //       // 3 seconds
  //     };



  //     const handleKeyDown = (e, nextAction) => {
  //         if (e.key === 'Enter') {
  //             e.preventDefault();
  //             if (step === 1) sendOTP();
  //             else if (step === 2) verifyOTP();
  //         }
  //     };

  //     const stepVariants = {
  //         initial: { opacity: 0, x: 30 },
  //         animate: { opacity: 1, x: 0 },
  //         exit: { opacity: 0, x: -30 },
  //     };
      
  //     const Login=async()=>{
  //       try {
  //         console.log(loginData)
  //         const res= await postapi('/user-login',loginData)
  //         Cookies.set('token', res.data.token, { expires: 1 });
  //         setInfoWithTimeout("Login Successful! Redirecting..");
  //         setTimeout(() => {
  //               const redirectPath = sessionStorage.getItem('redirectAfterLogin') || '/';
  //             sessionStorage.removeItem('redirectAfterLogin'); // cleanup
  //             navigate(redirectPath, { replace: true });
  //         }, 300); 
  //       } catch (error) {
  //         console.error(error)
  //         setInfoWithTimeout("Login Failed");
  //       }
  //     }
  //     const [activeTab, setActiveTab] = useState('patient');

  //     return (
  //         <div style={styles.fullScreenContainer}>
  //             <style>{globalStyles}</style>
  //             <div style={styles.container}>
  //                 <div style={styles.leftPanel}>
  //                     <div style={styles.leftContent}>
  //                         <img style={{ width: '200px', alignItems: 'center' }} src={care2connect} alt="care2connectlogo" srcset="" />
  //                         <p style={styles.leftSubtext}>Always ready to connect you with the right care</p>
  //                         <div style={{ paddingTop: 20, color: '#000' }}>
  //                             <p>
  //                               Care2Connect helps patients and doctors come together on one secure platform.
  //                               Easily manage appointments, access health services, and stay connected with trusted care whenever you need it.
  //                             </p>
  //                         </div>
  //                     </div>
  //                     <div style={styles.stethoscopeWrapper}>
  //                         <img src={Stethoscope} alt="Stethoscope" style={styles.stethoscopeImage} />
  //                     </div>
  //                 </div>


  // <div style={styles.rightPanel}>


  //   <div style={{
  //     display: 'flex',
  //     justifyContent: 'center',
  //     alignItems: 'center',
  //     width: '100%',
  //     padding: '10px'
  //   }}>
  //     <div style={{
  //       display: 'flex',
  //       justifyContent: 'center',
  //       borderRadius: '8px',
  //       overflow: 'hidden',
  //       background:'rgba(255, 255, 255, 0.15)'
  //     }}>
  //       <div
  //         onClick={() => setActiveTab('patient')}
  //         style={{
  //           padding: '10px 25px',
  //           cursor: 'pointer',
  //       borderRadius: '8px',

  //           background: activeTab === 'patient' ? 'rgba(255, 255, 255, 1)' : 'transparent',
  //           color: activeTab !== 'patient' ? 'white' : 'black'
  //         }}
  //       >
  //         <p>Patient</p>
  //       </div>
  //       <div
  //         onClick={() => setActiveTab('doctor')}
  //         style={{
  //           padding: '10px 25px',
  //           cursor: 'pointer',
  //       borderRadius: '8px',

  //           background: activeTab === 'doctor' ? 'rgba(255, 255, 255, 1)' : 'transparent',
  //           color: activeTab !== 'doctor' ? 'white' : 'black'
  //         }}
  //       >
  //         <p>Doctor</p>
  //       </div>
  //     </div>
  //   </div>




  //   {showBanner && (
  //     <div style={styles.successBanner}>
  //       🎉 Registered Successfully! Redirecting...
  //     </div>
  //   )}

  //   {infoMessage && (
  //     <div style={styles.infoBox}>
  //       {infoMessage}
  //     </div>
  //   )}

  //   <h2 style={styles.heading}>
  //     {mode === 'signup' ? 'Register for Seamless Care ✨' : 'Welcome Back 👋'}
  //   </h2>

  
    
  //   {mode === 'login' ? (
  //     <form
  //   onSubmit={(e) => {
  //     e.preventDefault();
  //   if (useOtpLogin) {
  //       if (step === 1) sendOTP();
  //       else if (step === 2) verifyOTP();
  //       } else {
  //       Login()
  //       }
      
      
  //   }}
  // >

  //       <label style={styles.label}>Mobile Number</label>
  //       <input
  //         type="text"
  //         value={loginData.phone}
  //         onChange={(e) => setLoginData({ ...loginData, phone: e.target.value })}
  //         placeholder="Enter Mobile"
  //         style={styles.input}
  //       />

  //   {useOtpLogin ? (
  //   step === 2 ? (
  //     <>
  //       <label style={styles.label}>OTP</label>
  //       <input
  //         type="text"
  //         value={loginData.otp}
  //         onChange={(e) => setLoginData({ ...loginData, otp: e.target.value })}
  //         placeholder="Enter 6-digit OTP"
  //         style={styles.input}
  //       />
  //     </>
  //   ) : null
  // ) : (
  //   <>
  //     <label style={styles.label}>Password</label>
  //     <input
  //       type="password"
  //       value={loginData.password}
  //       onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
  //       placeholder="Enter Password"
  //       style={styles.input}
  //     />
  //   </>
  // )}


  //   <label>
  //     <input
  //       type="checkbox"
  //       checked={useOtpLogin}
  //       onChange={() => {
  //         setUseOtpLogin(!useOtpLogin);
  //         setStep(1);
  //       }}
  //       style={{ marginRight: '6px', marginTop: '10px' }}
  //     />
  //     Login with OTP instead of password
  //   </label>

  //       <button type="submit" style={{ ...styles.button, marginTop: '20px' }}>
  //             {useOtpLogin ? (step === 1 ? 'Send OTP' : 'Login') : 'Login'}
  //       </button>

  //       <p style={{ fontSize: '14px', textAlign: 'center', marginTop: '10px' }}>
  //   Don't have an account? <span onClick={() => setMode('signup')} style={{ textDecoration: 'underline', cursor: 'pointer', color: '#fff' }}>Sign up</span>
  // </p>

  //     </form>

      
  //   ) : (
  //     <form
  //   onSubmit={async (e) => {
  //     e.preventDefault();

  //     if (step === 1) {
  //       const phoneRegex = /^[6-9]\d{9}$/;
  //       if (!phoneRegex.test(signupData.phone)) {
  //         setInfoWithTimeout('Please enter a valid mobile number.');
  //         return;
  //       }
  //     try {
  //       const result = await postapi('/register-otp', { phone: signupData.phone });
  //       if (result.success) {
  //         setInfoWithTimeout(`OTP sent to +91${signupData.phone}`);
  //         console.log(`OTP sent to +91${signupData.phone}`)
  //         setStep(2);
  //       } else {
  //         alert(result.message || 'Failed to send OTP. Please try again.');
  //       }
  //       } catch (error) {
  //         console.log(error)
  //         setInfoWithTimeout(error);
  //       }
  //     } else if (step === 2) {
  //       if (signupData.otp?.length === 6 && /^\d{6}$/.test(signupData.otp)) {
  //         const result = await postapi('/verify-otp', {
  //           phone: signupData.phone,
  //           otp: signupData.otp,
  //         });
  //         if (result.success) {
  //           const res= await postapi('/register', {
  //           name: signupData.fullName,
  //           phone: signupData.phone,
  //           password: signupData.password,
  //           role:activeTab
  //         });

  //           setInfoWithTimeout('OTP verified! Profile Created...');
  //           console.log(`OTP verified! Completing registration...`,res)
  //           Cookies.set('token', res.data.token, { expires: 1 });
  //                 setTimeout(() => {
  //                     const redirectPath = sessionStorage.getItem('redirectAfterLogin') || '/';
  //                     sessionStorage.removeItem('redirectAfterLogin'); // cleanup
  //                     navigate(redirectPath, { replace: true });
  //                 }, 300); 
  //           // setStep(3);
  //         } else {
  //           setInfoWithTimeout('Invalid OTP. Please try again.');
  //         }
  //       } else {
  //         setInfoWithTimeout('Please enter a valid 6-digit OTP.');
  //       }
  //     }
  //   }}
  // >
  //   {/* Always render fields */}
  //   <label style={styles.label}>Full Name</label>
  //   <input
  //     type="text"
  //     value={signupData.fullName}
  //     onChange={(e) => setSignupData({ ...signupData, fullName: e.target.value })}
  //     placeholder="Full Name"
  //     style={styles.input}
  //   />

  //   <label style={styles.label}>Mobile Number</label>
  //   <div style={styles.phoneWrapper}>
  //     <span style={styles.prefix}>+91</span>
  //     <input
  //       type="tel"
  //       maxLength={10}
  //       value={signupData.phone}
  //       onChange={(e) =>
  //         setSignupData({ ...signupData, phone: e.target.value.replace(/\D/, '') })
  //       }
  //       placeholder="Mobile Number"
  //       style={styles.phoneInput}
  //     />
  //   </div>

  //   <label style={styles.label}>Create Password</label>
  //   <input
  //     type="password"
  //     value={signupData.password}
  //     onChange={(e) => setSignupData({ ...signupData, password: e.target.value })}
  //     placeholder="Password"
  //     style={styles.input}
  //   />

  //   {step === 2 && (
  //     <>
  //       <label style={styles.label}>Enter OTP</label>
  //       <input
  //         type="text"
  //         value={signupData.otp || ''}
  //         onChange={(e) => setSignupData({ ...signupData, otp: e.target.value })}
  //         placeholder="Enter 6-digit OTP"
  //         style={styles.input}
  //         maxLength={6}
  //       />
  //     </>
  //   )}

  //     <p style={{ fontSize: "12px", margin: "5px 0" }}>
  //         <input
  //           type="checkbox"
  //           checked={agree}
  //           onChange={(e) => setAgree(e.target.checked)}
  //           style={{ marginRight: "6px", marginTop: "10px" }}
  //         />
  //         By signing up, I agree to the{" "}
  //         <a href="/terms" style={{ color: "#fff", textDecoration: "underline" }}>
  //           Terms
  //         </a>
  //       </p>

  //   <button type="submit" 
  //   disabled={!agree}
  //   style={{ ...styles.button, marginTop: '10px' }}>
  //     {step === 1 ? 'Send OTP' : step === 2 ? 'Verify OTP' : 'Register'}
  //   </button>
  //   {step === 1 && (
  //   <p style={{ fontSize: '14px', textAlign: 'center', marginTop: '10px' }}>
  //     Already have an account?{' '}
  //     <span
  //       onClick={() => {
  //         setMode('login');
  //         setStep(1); // reset to login screen
  //       }}
  //       style={{ textDecoration: 'underline', cursor: 'pointer', color: '#fff' }}
  //     >
  //       Login here
  //     </span>
  //   </p>
  // )}
  // </form>

  //   )}
  // </div>

  //             </div>
  //         </div>
  //     );
  // };

  // export default SignUp;

  // const styles = {
  //     fullScreenContainer: {
  //         backgroundColor: '#f0f4f8',
  //         minHeight: '100vh',
  //         width: '100vw',
  //         display: 'flex',
  //         alignItems: 'center',
  //         justifyContent: 'center',
  //         // padding: '10px',
  //         fontFamily: 'Inter, sans-serif',
  //         marginTop:70
  //     },
  //     container: {
  //         display: 'flex',
  //         width: '85%',
  //         maxWidth: '1100px',
  //         backgroundColor: '#fff',
  //         borderRadius: '16px',
  //         boxShadow: '0 12px 30px rgba(0, 0, 0, 0.15)',
  //         overflow: 'visible',
  //         minHeight: '550px',
  //     },
  //     leftPanel: {
  //         flex: 1.5,
  //         background: 'linear-gradient(180deg, #e3f2fd 0%, #c1e4ff 100%)',
  //         padding: '5px',
  //         position: 'relative',
  //         display: 'flex',
  //         flexDirection: 'column',
  //         // justifyContent: 'end',
  //         // boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px',

  //         alignItems: 'end',
  //         borderTopLeftRadius: '16px',
  //         borderBottomLeftRadius: '16px',
  //         overflow: 'visible',
  //     },
  //     rightPanel: {
  //         flex: 1,
  //         padding: '35px',
  //         background: 'linear-gradient(135deg, #4a69bd, #3c54a6)',
  //         color: '#fff',
  //         position: 'relative',
  //         borderTopRightRadius: '16px',
  //         borderBottomRightRadius: '16px',
  //         display: 'flex',

  //         flexDirection: 'column',
  //         justifyContent: 'center',
  //     },
  //     leftContent: {
  //         display: 'flex',
  //         flexDirection: 'column',
  //         alignItems: 'flex-end',
  //         justifyContent: 'start',
  //         height: '100%',
  //         zIndex: 1,
  //         padding: '50px 40px',
  //         textAlign: 'right',
  //         width: '300px',
  //         // backgroundColor: '#fff',
  //     },
  //     leftHeading: {
  //         fontSize: '44px',
  //         color: '#0A2E50',
  //         fontWeight: 'bold',
  //         marginBottom: '10px',
  //         textShadow: '2px 2px 4px rgba(0,0,0,0.1)',
  //         textAlign: 'right',
  //     },
  //     leftSubtext: {
  //         color: '#1A4B7D',
  //         fontSize: '18px',
  //         lineHeight: '1.4',
  //         textAlign: 'right',
  //         fontWeight: 'bold',
  //     },
  //     successBanner: {
  //         backgroundColor: '#4caf50',
  //         color: 'white',
  //         padding: '12px',
  //         borderRadius: '8px',
  //         textAlign: 'center',
  //         marginBottom: '15px',
  //         fontWeight: 'bold',
  //         fontSize: '16px',
  //     },

  //     phoneWrapper: {
  //         display: 'flex',
  //         alignItems: 'center',
  //         backgroundColor: 'rgba(255, 255, 255, 0.15)',
  //         border: '1px solid rgba(255, 255, 255, 0.3)',
  //         borderRadius: '8px',
  //         marginBottom: '18px',
  //         padding: '0 8px',
  //         width: '91%',
  //     },

  //     prefix: {
  //         color: '#fff',
  //         fontSize: '15px',
  //         marginRight: '8px',
  //         fontWeight: 'bold',
  //     },

  //     phoneInput: {
  //         backgroundColor: 'transparent',
  //         border: 'none',
  //         outline: 'none',
  //         color: '#fff',
  //         fontSize: '15px',
  //         width: '100%',
  //         padding: '12px 0',
  //     },

  //     stethoscopeWrapper: {
  //         position: 'absolute',
  //         top: '-70px',
  //         bottom: '-50px',
  //         left: '-6%',
  //         transform: 'translateX(-50%)',
  //         zIndex: 0,
  //     },
  //     stethoscopeImage: {
  //         height: '650px',
  //         objectFit: 'contain',
  //         opacity: 0.95,
  //     },
  //     chevron: {
  //         position: 'absolute',
  //         left: '-20px',
  //         top: '50%',
  //         transform: 'translateY(-50%)',
  //         backgroundColor: '#D6EDFE',
  //         color: '#4a69bd',
  //         fontSize: '30px',
  //         borderRadius: '50%',
  //         width: '35px',
  //         height: '65px',
  //         display: 'flex',
  //         alignItems: 'center',
  //         justifyContent: 'center',
  //         zIndex: 1,
  //     },
  //     heading: {
  //         fontSize: '28px',
  //         fontWeight: '700',
  //         textAlign: 'center',
  //         marginBottom: '15px',
  //     },
  //     infoBox: {
  //         backgroundColor: '#46df23ff',
  //         color: '#333',
  //         textAlign: 'center',
  //         padding: '10px 16px',
  //         borderRadius: '6px',
  //         marginBottom: '20px',
  //         fontSize: '14px',
  //     },
  //     label: {
  //         display: 'block',
  //         marginBottom: '6px',
  //         fontWeight: '600',
  //         fontSize: '15px',
  //         color: '#e0e0e0',
  //     },
  //     input: {
  //         width: '91%',
  //         padding: '12px',
  //         borderRadius: '8px',
  //         border: '1px solid rgba(255, 255, 255, 0.3)',
  //         backgroundColor: 'rgba(255, 255, 255, 0.15)',
  //         fontSize: '15px',
  //         marginBottom: '18px',
  //         color: '#fff',
  //         outline: 'none',
  //     },
  //     inputgender: {
  //         width: '97%',
  //         padding: '12px',
  //         borderRadius: '8px',
  //         border: '1px solid rgba(255, 255, 255, 0.3)',
  //         backgroundColor: 'rgba(255, 255, 255, 0.15)',
  //         fontSize: '15px',
  //         marginBottom: '18px',
  //         color: '#fff',
  //         outline: 'none',
  //     },
  //     textarea: {
  //         width: '100%',
  //         height: '100px',
  //         borderRadius: '8px',
  //         border: '1px solid rgba(255, 255, 255, 0.3)',
  //         backgroundColor: 'rgba(255, 255, 255, 0.15)',
  //         fontSize: '15px',
  //         marginBottom: '18px',
  //         color: '#fff',
  //         outline: 'none',
  //         padding: '10px',
  //         resize: 'vertical',
  //     },
  //     button: {
  //         width: '96.5%',
  //         backgroundColor: '#ffffff',
  //         color: '#4a69bd',
  //         padding: '14px',
  //         borderRadius: '8px',
  //         fontSize: '16px',
  //         fontWeight: '700',
  //         border: 'none',
  //         cursor: 'pointer',
  //         marginTop: '10px',
  //         boxShadow: '0 6px 20px rgba(0, 0, 0, 0.2)',
  //     },
  //     scrollableForm: {
  //         maxHeight: '340px',
  //         overflowY: 'auto',
  //         paddingRight: '5px',
  //         scrollbarWidth: 'none',
  //         msOverflowStyle: 'none',
  //     },
  // };

  // const globalStyles = `
  //   *::placeholder {
  //     color: rgba(255, 255, 255, 0.6);
  //   }
  //   .scrollable-form::-webkit-scrollbar {
  //     display: none;
  //   }
  // `;

  import React, { useState } from 'react';
import Stethoscope from '../../assets/login/stethoscope.png';
import care2connect from '../../assets/login/pp.png';
import { useNavigate } from 'react-router-dom';
import useApi from '../../functions/api';
import Cookies from 'js-cookie';

const SignUp = () => {
    const { postapi } = useApi();
    const navigate = useNavigate();

    // All original states preserved
    const [step, setStep] = useState(1);
    const [agree, setAgree] = useState(false);
    const [infoMessage, setInfoMessage] = useState('');
    const [showBanner, setShowBanner] = useState(false);
    const [mode, setMode] = useState('login'); 
    const [useOtpLogin, setUseOtpLogin] = useState(false);
    const [activeTab, setActiveTab] = useState('patient');
    const [loginData, setLoginData] = useState({ phone: '', password: '', otp: '' });
    const [signupData, setSignupData] = useState({ fullName: '', phone: '', password: '', offers: true, otp: '' });

    // --- ALL ORIGINAL FUNCTIONS PRESERVED ---

    const setInfoWithTimeout = (message) => {
        setInfoMessage(message);
        setTimeout(() => setInfoMessage(''), 2000);
    };

    const sendOTP = async () => {
        const phoneRegex = /^[6-9]\d{9}$/;
        const phoneToUse = mode === 'login' ? loginData.phone : signupData.phone;

        if (!phoneRegex.test(phoneToUse)) {
            setInfoWithTimeout('Please enter a valid 10-digit mobile number.');
            return;
        }

        const endpoint = mode === 'login' ? '/send-otp' : '/register-otp';
        try {
            const result = await postapi(endpoint, { phone: phoneToUse });
            if (result.success) {
                setInfoWithTimeout(`OTP sent to +91${phoneToUse}`);
                setStep(2);
            } else {
                alert(result.message || 'Failed to send OTP.');
            }
        } catch (error) {
            setInfoWithTimeout('An error occurred. Please try again.');
        }
    };

    const verifyOTP = async () => {
        const phone = loginData.phone;
        const otp = loginData.otp;
        if (otp.length === 6 && /^\d{6}$/.test(otp)) {
            try {
                const result = await postapi('/verify-otp', { phone: phone.toString(), otp: otp.toString() });
                if (result.success) {
                    if (result.data.details_required) setInfoWithTimeout('User Not Exists! Please Register !');
                    else {
                        setInfoWithTimeout('OTP verified successfully!');
                        Cookies.set('token', result.data.token, { expires: 1 });
                        setTimeout(() => {
                            const redirectPath = sessionStorage.getItem('redirectAfterLogin') || '/';
                            sessionStorage.removeItem('redirectAfterLogin');
                            navigate(redirectPath, { replace: true });
                        }, 300);
                    }
                }
            } catch (error) { setInfoWithTimeout(error); }
        } else { setInfoWithTimeout('Invalid OTP.'); }
    };

    const Login = async () => {
        try {
            const res = await postapi('/user-login', loginData);
            Cookies.set('token', res.data.token, { expires: 1 });
            setInfoWithTimeout("Login Successful! Redirecting..");
            setTimeout(() => {
                const redirectPath = sessionStorage.getItem('redirectAfterLogin') || '/';
                sessionStorage.removeItem('redirectAfterLogin');
                navigate(redirectPath, { replace: true });
            }, 300);
        } catch (error) { setInfoWithTimeout("Login Failed"); }
    };

    const handleSignupSubmit = async (e) => {
        e.preventDefault();
        if (step === 1) {
            sendOTP();
        } else if (step === 2) {
            if (signupData.otp?.length === 6 && /^\d{6}$/.test(signupData.otp)) {
                const result = await postapi('/verify-otp', { phone: signupData.phone, otp: signupData.otp });
                if (result.success) {
                    const res = await postapi('/register', {
                        name: signupData.fullName,
                        phone: signupData.phone,
                        password: signupData.password,
                        role: activeTab
                    });
                    setInfoWithTimeout('OTP verified! Profile Created...');
                    Cookies.set('token', res.data.token, { expires: 1 });
                    setTimeout(() => {
                        const redirectPath = sessionStorage.getItem('redirectAfterLogin') || '/';
                        sessionStorage.removeItem('redirectAfterLogin');
                        navigate(redirectPath, { replace: true });
                    }, 300);
                } else { setInfoWithTimeout('Invalid OTP.'); }
            } else { setInfoWithTimeout('Please enter a valid 6-digit OTP.'); }
        }
    };

    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-[#f0f4f8] font-sans p-4 mt-[40px]">
            <style>{`.no-scrollbar::-webkit-scrollbar { display: none; }`}</style>
            
            {/* Main Container - Adjusted for Compactness */}
            <div className="flex w-full max-w-[980px] bg-white rounded-2xl shadow-xl overflow-visible min-h-[520px]">
                
                {/* Left Panel */}
                <div className="hidden md:flex flex-[1.3] relative bg-gradient-to-b from-[#e3f2fd] to-[#c1e4ff] rounded-l-2xl p-4 flex-col items-end overflow-visible">
                    <div className="flex flex-col items-end justify-start h-full z-10 py-10 px-6 text-right w-[280px]">
                        <img src={care2connect} alt="logo" className="w-[170px] mb-4" />
                        <p className="text-[#1A4B7D] text-base font-bold leading-snug">
                            Always ready to connect you with the right care
                        </p>
                        <div className="pt-4 text-black text-xs opacity-90 leading-relaxed">
                            <p>
                               Care2Connect helps patients and doctors come together on one secure platform.
                               Easily manage appointments and access health services.
                            </p>
                        </div>
                    </div>
                    {/* Stethoscope - Compact Scaling */}
                    <div className="absolute top-[-50px] bottom-[-40px] left-[-7%] -translate-x-1/2 z-0 pointer-events-none">
                        <img src={Stethoscope} alt="Stethoscope" className="h-[600px] object-contain opacity-95" />
                    </div>
                </div>

                {/* Right Panel */}
                <div className="flex-1 p-6 md:p-10 bg-gradient-to-br from-[#4a69bd] to-[#3c54a6] text-white rounded-r-2xl md:rounded-l-none rounded-l-2xl flex flex-col justify-center relative">
                    
                    {/* Compact Tab Switcher */}
                    <div className="flex justify-center mb-6">
                        <div className="flex rounded-lg overflow-hidden bg-white/15 p-1">
                            <button onClick={() => setActiveTab('patient')} className={`px-5 py-1.5 text-sm rounded-md transition-all ${activeTab === 'patient' ? 'bg-white text-black' : 'text-white'}`}>Patient</button>
                            <button onClick={() => setActiveTab('doctor')} className={`px-5 py-1.5 text-sm rounded-md transition-all ${activeTab === 'doctor' ? 'bg-white text-black' : 'text-white'}`}>Doctor</button>
                        </div>
                    </div>

                    {infoMessage && <div className="bg-[#46df23] text-[#333] text-center py-2 px-4 rounded-md mb-4 text-xs font-bold">{infoMessage}</div>}

                    <h2 className="text-2xl font-bold text-center mb-5">
                        {mode === 'signup' ? 'Register ✨' : 'Welcome Back 👋'}
                    </h2>

                    {mode === 'login' ? (
                        <form className="space-y-3" onSubmit={(e) => { e.preventDefault(); useOtpLogin ? (step === 1 ? sendOTP() : verifyOTP()) : Login(); }}>
                            <label className="block text-xs font-semibold text-blue-100">Mobile Number</label>
                            <input type="text" value={loginData.phone} onChange={(e) => setLoginData({...loginData, phone: e.target.value})} placeholder="Enter Mobile" className="w-full bg-white/15 border border-white/30 rounded-lg p-2.5 text-sm outline-none placeholder:text-white/50" />
                            
                            {!useOtpLogin ? (
                                <>
                                    <label className="block text-xs font-semibold text-blue-100">Password</label>
                                    <input type="password" value={loginData.password} onChange={(e) => setLoginData({...loginData, password: e.target.value})} placeholder="Enter Password" className="w-full bg-white/15 border border-white/30 rounded-lg p-2.5 text-sm outline-none" />
                                </>
                            ) : (
                                step === 2 && (
                                    <>
                                        <label className="block text-xs font-semibold text-blue-100">OTP</label>
                                        <input type="text" value={loginData.otp} onChange={(e) => setLoginData({...loginData, otp: e.target.value})} placeholder="6-digit OTP" className="w-full bg-white/15 border border-white/30 rounded-lg p-2.5 text-sm outline-none" />
                                    </>
                                )
                            )}

                            <label className="flex items-center text-xs cursor-pointer"><input type="checkbox" checked={useOtpLogin} onChange={() => {setUseOtpLogin(!useOtpLogin); setStep(1);}} className="mr-2" /> Login with OTP instead of password</label>
                            <button type="submit" className="w-full bg-white text-[#4a69bd] py-3 rounded-lg font-bold shadow-lg hover:bg-gray-100 transition-colors">{useOtpLogin ? (step === 1 ? 'Send OTP' : 'Login') : 'Login'}</button>
                            <p className="text-xs text-center">Don't have an account? <span onClick={() => setMode('signup')} className="underline cursor-pointer font-bold">Sign up</span></p>
                        </form>
                    ) : (
                        <form className="space-y-3 no-scrollbar overflow-y-auto max-h-[380px]" onSubmit={handleSignupSubmit}>
                            <label className="block text-xs font-semibold text-blue-100">Full Name</label>
                            <input type="text" value={signupData.fullName} onChange={(e) => setSignupData({...signupData, fullName: e.target.value})} placeholder="Full Name" className="w-full bg-white/15 border border-white/30 rounded-lg p-2.5 text-sm outline-none" />
                            
                            <label className="block text-xs font-semibold text-blue-100">Mobile Number</label>
                            <div className="flex items-center bg-white/15 border border-white/30 rounded-lg px-3">
                                <span className="text-xs font-bold mr-2">+91</span>
                                <input type="tel" maxLength={10} value={signupData.phone} onChange={(e) => setSignupData({...signupData, phone: e.target.value.replace(/\D/, '')})} placeholder="Number" className="bg-transparent w-full py-2.5 text-sm outline-none" />
                            </div>

                            <label className="block text-xs font-semibold text-blue-100">Create Password</label>
                            <input type="password" value={signupData.password} onChange={(e) => setSignupData({...signupData, password: e.target.value})} placeholder="Password" className="w-full bg-white/15 border border-white/30 rounded-lg p-2.5 text-sm outline-none" />

                            {step === 2 && (
                                <>
                                    <label className="block text-xs font-semibold text-blue-100">Enter OTP</label>
                                    <input type="text" value={signupData.otp} onChange={(e) => setSignupData({...signupData, otp: e.target.value})} placeholder="6-digit OTP" className="w-full bg-white/15 border border-white/30 rounded-lg p-2.5 text-sm outline-none" />
                                </>
                            )}

                            <p className="text-[11px]"><input type="checkbox" checked={agree} onChange={(e) => setAgree(e.target.checked)} className="mr-2" /> I agree to the <a href="/terms" className="underline">Terms</a></p>
                            <button type="submit" disabled={!agree} className="w-full bg-white text-[#4a69bd] py-3 rounded-lg font-bold shadow-lg disabled:opacity-50 transition-all">{step === 1 ? 'Send OTP' : 'Verify & Register'}</button>
                            <p className="text-xs text-center">Already have account? <span onClick={() => {setMode('login'); setStep(1);}} className="underline cursor-pointer font-bold">Login here</span></p>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SignUp;