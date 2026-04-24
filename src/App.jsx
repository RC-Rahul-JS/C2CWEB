import React, { useEffect, useState,useRef } from 'react'
import Headers from './components/home/Headers'
import './App.css'
import Navbar from './components/home/Navbar'
import Achievement from './components/home/Achivement'
import Booking from './components/home/Booking'
import About from './components/home/About'
import BrandSlider from './components/home/BrandSlider'
import Services from './components/home/Services'
import PrivacyPolicy from './components/home/Privacy'
import Doctors from './components/home/Doctors'
import Footer from './components/home/Footer'
import BrandView from './components/home/BrandView'

import { Route, Routes, BrowserRouter as Router} from "react-router-dom";
import Contact from './components/contact/Contact'
import SignUp from './components/login/SignUp'
import Onboarding from './components/login/Onboarding'
import OurServices from './components/services/OurServices'
import Appointment from './components/appointment/Appointment'
import Mabout from './components/about.jsx/Mabout'
import DoctorProfile from './components/profile/DoctorProfile'
import HospitalProfile from './components/profile/HospitalProfile'
import AppointmentList from './components/appointment/AppointmentList'
import ScrollToTop from './functions/ScrollToTop'
import DoctorList from './components/profile/DoctorList'
import HospitalList from './components/profile/HospitalList'
import MapPage from './components/about.jsx/MapPage'
import { Navigate, Outlet,useLocation } from 'react-router-dom';
import Cookies from 'js-cookie';
import DisplayProfileEdit from './components/profile/DisplayProfileEdit'
import Consult from './components/contact/Consult'
import Medicinal_policy from './components/contact/Medicinal_policy'
import Nps from './components/contact/nps.jsx'
import Assure from './components/contact/Assure.jsx'
import BookStandard from './components/contact/Book_standard.jsx'
import Diagnostic_policy from './components/contact/Diagnostic_policy.jsx'
import ComingSoon from './components/services/ComingSoon.jsx'
import Diagonistic from './components/profile/Diagonistic.jsx'
import TermsAndConditions from './components/contact/TermsAndConditions.jsx'
import { label } from 'framer-motion/client'
import DiagonisticProfile from './components/profile/DiagonisticProfile.jsx'
import Tstmnyl from './components/home/Tstmnyl.jsx'
// import Test from './components/login/test';
import Testing from './components/HMSComponent/Testing.jsx'
import PanelConfiguration from './components/HMSComponent/Panel.jsx'
import AppointmentDetails from './components/appointment/AppointmentDetails'


const ProtectedRoute = () => {
  // const token = Cookies.get('token'); // or sessionStorage.getItem('token')
  // return token ? <Outlet /> : <Navigate to="/signup" replace />;
  const token = Cookies.get('token');
  const location = useLocation();
  console.log(location.pathname);

  if (!token) {
    // Save the intended route to session storage
    sessionStorage.setItem('redirectAfterLogin', location.pathname);
    return <Navigate to="/signup" replace />;
  }

  return <Outlet />;
};


const App = () => {

const [error, setError] = useState(null);


  useEffect(() => {
  if (!navigator.geolocation) {
    setError("Geolocation not supported.");
    return;
  }

  navigator.permissions?.query({ name: "geolocation" }).then((result) => {
    if (result.state === "granted" || result.state === "prompt") {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const location = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          Cookies.set('location', JSON.stringify(location), {
            sameSite: 'Lax',
            expires: 30
          });
          console.log(location);
        },
        (err) => {
          console.error("Geolocation error:", err);
          setError(err.message);
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0
        }
      );
    } else {
      setError("Geolocation permission denied.");
      console.warn("Permission state:", result.state);
    }
  });
}, []);






  return (
     <div>
    <Router>
      <ScrollToTop/>
            <Routes>
                <Route path="/" element={<>
               {/* <ComingSoon/> */}
                <Navbar/>
      <Headers/>
      <Achievement/>  
      <Doctors/>
      {/* <Services/> */}
      {/* <Diagonistic/> */}
      <About/>
      {/* <BrandSlider/> */}
      <Booking/>
      <Tstmnyl/>
      <BrandView/>
      <Footer/>
      </>} />
                <Route path="/contact" element={<><Navbar/><Contact/><Footer/></>} />
                <Route path="/signup" element={<><Navbar/><SignUp/><Footer/></>} />
                <Route path="/onboarding" element={<><Navbar/><Onboarding/><Footer/></>} />
                {/* <Route path="/test" element={<><Navbar/><Test/><Footer/></>} /> */}
                <Route path="/services" element={<><Navbar/><OurServices/><Footer/></>} />
                <Route path="/about" element={<><Navbar/><Mabout/><Footer/></>} />
                <Route path="/privacy_policy" element={<PrivacyPolicy/>} />
                <Route path="/doctor_profile/:id" element={<><Navbar/><DoctorProfile/><Footer/></>} />
                <Route path="/diagonistic_profile/:id" element={<><Navbar/><DiagonisticProfile/><Footer/></>} />
                <Route path="/hospital_profile/:id" element={<><Navbar/><HospitalProfile/><Footer/></>} />
                <Route path="/list" element={<><Navbar/><AppointmentList/><Footer/></>} />
                <Route path="/appointment_details/:id" element={<><Navbar/><AppointmentDetails/><Footer/></>} />
                <Route path="/doctor_list" element={<><Navbar/><DoctorList/><Footer/></>} />
                <Route path="/hospital_list" element={<><Navbar/><HospitalList/><Footer/></>} />
                <Route path="/map" element={<><Navbar/><MapPage/><Footer/></>} />
                <Route path="/profileedit/:id" element={<><Navbar/><DisplayProfileEdit/><Footer/></>} />

                <Route path="/dc" element={<Consult/>} />
                <Route path="/mp" element={<Medicinal_policy/>} />
                <Route path="/nsp" element={<Nps/>} />
                <Route path="/c2c_assure" element={<Assure/>} />
                <Route path="/dp" element={<Diagnostic_policy/>} />
                <Route path="/bsp" element={<BookStandard/>} />
                <Route path="/terms" element={<TermsAndConditions/>} />
                <Route path="/coming" element={<ComingSoon/>} />
                <Route path="/test" element={<Testing/>} />
                <Route path="/panel" element={<PanelConfiguration/>} />
                

               
                    {/* Protected Route */}
                <Route element={<ProtectedRoute />}>
                   <Route path="/appointment/:id" element={<><Navbar/><Appointment/><Footer/></>} />
                </Route>
               
            </Routes>
        </Router>
   
      
    </div>
  )
}

export default App
