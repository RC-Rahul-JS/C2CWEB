import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import './Calender.css';
import logo from '../../assets/login/pp.png';
import { useParams } from "react-router-dom";
import useApi from "../../functions/api";
import moment from "moment/moment";
import axios from "axios";


const Appointment = () => {
    const [date, setDate] = useState(new Date());
    const [selectedTime, setSelectedTime] = useState(null);
    const [hoveredTime, setHoveredTime] = useState(null);

    const [currentStep, setCurrentStep] = useState(1);

    const [userName, setUserName] = useState("");
    const [fatherName, setFatherName] = useState("");
    const [userEmail, setUserEmail] = useState("");
    const [selectedState, setSelectedState] = useState("");
    const [selectedCity, setSelectedCity] = useState("");
    const [addressDetails, setAddressDetails] = useState("");
    const [userPhoneNumber, setUserPhoneNumber] = useState("");

    const timeSlots = ["5:30 PM", "6:30 PM", "7:30 PM", "8:30 PM", "9:30 PM"];
      const [disabledDates, setdisabledDates] = useState([]);
  const {getapi,postapi} = useApi();

  const {id}=useParams();
   const [slots, setslots] = useState([])
    useEffect(() => {
      const fetchDate = async () => {
        try {
          const date = await getapi(`/get_date_schedule/${id}`); // Adjust the endpoint as needed
          console.log('Dates:', date);
          const Dates = date.data
          .filter(d => d.enabled === false)
          .map(d => new Date(d.id));
          setdisabledDates(Dates);
        } catch (error) {
          console.error('Error fetching dates:', error);
        }
      };
  
      fetchDate();
    }, []);

     const fetchslots = async (date) => {
        try {
          const response = await getapi(`/get_time_schedule/${id}/${date}`); // Adjust the endpoint as needed
          console.log('Time slots:', response);
          setslots(response.data); // Assuming response.data contains the list of doctors
        } catch (error) {
          console.error('Error fetching slots:', error);
          setslots([]); 
        }
      };


    const indiaStatesAndCities = {
        "Andhra Pradesh": [
            "Alluri Sitharama Raju", "Anakapalli", "Ananthapuramu", "Annamayya",
            "Bapatla", "Chittoor", "Dr. B.R. Ambedkar Konaseema", "East Godavari",
            "Eluru", "Guntur", "Kakinada", "Krishna", "Kurnool", "Nandyal",
            "Nellore", "NTR", "Palnadu", "Parvathipuram Manyam", "Prakasam",
            "Srikakulam", "Sri Sathya Sai", "Tirupati", "Visakhapatnam",
            "Vizianagaram", "West Godavari", "YSR Kadapa"
        ],
        "Arunachal Pradesh": [
            "Anjaw", "Changlang", "Dibang Valley", "East Kameng", "East Siang",
            "Kra Daadi", "Kurung Kumey", "Lepa Rada", "Lohit", "Longding",
            "Lower Dibang Valley", "Lower Siang", "Lower Subansiri", "Namsai",
            "Pakke-Kessang", "Papum Pare", "Shi Yomi", "Siang", "Tawang", "Tirap",
            "Upper Siang", "Upper Subansiri", "West Kameng", "West Siang",
            "Itanagar Capital Complex", "Khamle", "Kamle" // Added based on recent data
        ],
        "Assam": [
            "Baksa", "Barpeta", "Biswanath", "Bongaigaon", "Cachar", "Charaideo",
            "Chirang", "Darrang", "Dhemaji", "Dhubri", "Dibrugarh", "Dima Hasao",
            "Goalpara", "Golaghat", "Hailakandi", "Hojai", "Jorhat", "Kamrup",
            "Kamrup Metropolitan", "Karbi Anglong", "Karimganj", "Kokrajhar",
            "Lakhimpur", "Majuli", "Morigaon", "Nagaon", "Nalbari", "Sivasagar",
            "Sonitpur", "South Salmara-Mankachar", "Tinsukia", "Udalguri",
            "West Karbi Anglong", "Bajali", "Tamulpur" // Added based on recent data
        ],
        "Bihar": [
            "Araria", "Arwal", "Aurangabad", "Banka", "Begusarai", "Bhagalpur",
            "Bhojpur", "Buxar", "Darbhanga", "East Champaran", "Gaya", "Gopalganj",
            "Jamui", "Jehanabad", "Kaimur (Bhabua)", "Katihar", "Khagaria",
            "Kishanganj", "Lakhisarai", "Madhepura", "Madhubani", "Munger",
            "Muzaffarpur", "Nalanda", "Nawada", "Patna", "Purnia", "Rohtas",
            "Saharsa", "Samastipur", "Saran", "Sheikhpura", "Sheohar", "Sitamarhi",
            "Siwan", "Supaul", "Vaishali", "West Champaran"
        ],
        "Chhattisgarh": [
            "Balod", "Baloda Bazar", "Balrampur-Ramanujganj", "Bastar", "Bemetara",
            "Bijapur", "Bilaspur", "Dantewada (South Bastar)", "Dhamtari", "Durg",
            "Gariaband", "Gaurela-Pendra-Marwahi", "Janjgir-Champa", "Jashpur",
            "Kabirdham (Kawardha)", "Kanker (North Bastar)", "Kondagaon", "Korba",
            "Korea (Koriya)", "Mahasamund", "Mungeli", "Narayanpur", "Raigarh",
            "Raipur", "Rajnandgaon", "Sarangarh-Bilaigarh", "Sukma", "Surajpur",
            "Surguja", "Khairagarh-Chhuikhadan-Gandai", "Manendragarh-Chirmiri-Bharatpur",
            "Mohla-Manpur-Ambagarh Chowki", "Sakti" // Added based on recent data
        ],
        "Goa": [
            "North Goa", "South Goa"
        ],
        "Gujarat": [
            "Ahmedabad", "Amreli", "Anand", "Aravalli", "Banaskantha", "Bharuch",
            "Bhavnagar", "Botad", "Chhota Udaipur", "Dahod", "Dang", "Devbhoomi Dwarka",
            "Gandhinagar", "Gir Somnath", "Jamnagar", "Junagadh", "Kachchh", "Kheda",
            "Mahisagar", "Mehsana", "Morbi", "Narmada", "Navsari", "Panchmahal",
            "Patan", "Porbandar", "Rajkot", "Sabarkantha", "Surat", "Surendranagar",
            "Tapi", "Valsad", "Vadodara"
        ],
        "Haryana": [
            "Ambala", "Bhiwani", "Charkhi Dadri", "Faridabad", "Fatehabad", "Gurugram",
            "Hisar", "Jhajjar", "Jind", "Kaithal", "Karnal", "Kurukshetra",
            "Mahendragarh", "Nuh", "Palwal", "Panchkula", "Panipat", "Rewari",
            "Rohtak", "Sirsa", "Sonipat", "Yamunanagar"
        ],
        "Himachal Pradesh": [
            "Bilaspur", "Chamba", "Hamirpur", "Kangra", "Kinnaur", "Kullu",
            "Lahaul and Spiti", "Mandi", "Shimla", "Sirmaur", "Solan", "Una"
        ],
        "Jharkhand": [
            "Bokaro", "Chatra", "Deoghar", "Dhanbad", "Dumka", "East Singhbhum",
            "Garhwa", "Giridih", "Godda", "Gumla", "Hazaribagh", "Jamtara", "Khunti",
            "Koderma", "Latehar", "Lohardaga", "Pakur", "Palamu", "Ramgarh", "Ranchi",
            "Sahebganj", "Seraikela Kharsawan", "Simdega", "West Singhbhum"
        ],
        "Karnataka": [
            "Bagalkot", "Ballari", "Belagavi", "Bengaluru Rural", "Bengaluru Urban",
            "Bidar", "Chamarajanagar", "Chikkaballapur", "Chikkamagaluru",
            "Chitradurga", "Dakshina Kannada", "Davangere", "Dharwad", "Gadag",
            "Kalaburagi", "Hassan", "Haveri", "Kodagu", "Kolar", "Koppal", "Mandya",
            "Mysuru", "Raichur", "Ramanagara", "Shivamogga", "Tumakuru", "Udupi",
            "Uttara Kannada", "Vijayapura", "Yadgir", "Vijayanagara" // Added recently
        ],
        "Kerala": [
            "Alappuzha", "Ernakulam", "Idukki", "Kannur", "Kasaragod", "Kollam",
            "Kottayam", "Kozhikode", "Malappuram", "Palakkad", "Pathanamthitta",
            "Thiruvananthapuram", "Thrissur", "Wayanad"
        ],
        "Madhya Pradesh": [
            "Agar Malwa", "Alirajpur", "Anuppur", "Ashoknagar", "Balaghat", "Barwani",
            "Betul", "Bhind", "Bhopal", "Burhanpur", "Chhatarpur", "Chhindwara",
            "Damoh", "Datia", "Dewas", "Dhar", "Dindori", "Guna", "Gwalior",
            "Harda", "Hoshangabad", "Indore", "Jabalpur", "Jhabua", "Katni",
            "Khandwa", "Khargone", "Mandla", "Mandsaur", "Morena", "Narsinghpur",
            "Neemuch", "Niwar", "Panna", "Raisen", "Rajgarh", "Ratlam", "Rewa",
            "Sagar", "Satna", "Sehore", "Seoni", "Shahdol", "Shajapur", "Sheopur",
            "Shivpuri", "Sidhi", "Singrauli", "Tikamgarh", "Ujjain", "Umaria",
            "Vidisha"
        ],
        "Maharashtra": [
            "Ahmednagar", "Akola", "Amravati", "Aurangabad", "Beed", "Bhandara",
            "Buldhana", "Chandrapur", "Dhule", "Gadchiroli", "Gondia", "Hingoli",
            "Jalgaon", "Jalna", "Kolhapur", "Latur", "Mumbai City", "Mumbai Suburban",
            "Nagpur", "Nanded", "Nandurbar", "Nashik", "Osmanabad", "Palghar",
            "Parbhani", "Pune", "Raigad", "Ratnagiri", "Sangli", "Satara", "Sindhudurg",
            "Solapur", "Thane", "Wardha", "Washim", "Yavatmal", "Chhatrapati Sambhajinagar"
        ],
        "Manipur": [
            "Bishnupur", "Chandel", "Churachandpur", "Kangpokpi", "Kamjong", "Kakching",
            "Kwangpokpi", "Imphal East", "Imphal West", "Jiribam", "Kakching",
            "Noney", "Pherzawl", "Senapati", "Tamenglong", "Tengnoupal", "Thoubal", "Ukhrul"
        ],
        "Meghalaya": [
            "East Garo Hills", "East Jaintia Hills", "East Khasi Hills", "North Garo Hills",
            "Ri-Bhoi", "South Garo Hills", "South West Garo Hills", "South West Khasi Hills",
            "West Garo Hills", "West Jaintia Hills", "West Khasi Hills", "Eastern West Khasi Hills" // Added based on recent data
        ],
        "Mizoram": [
            "Aizawl", "Champhai", "Hnahthial", "Khawzawl", "Kolasib", "Lawngtlai",
            "Lunglei", "Mamit", "Saitual", "Serchhip", "Siaha"
        ],
        "Nagaland": [
            "Chumoukedima", "Dimapur", "Kiphire", "Kohima", "Longleng", "Mokokchung",
            "Mon", "Niuland", "Noklak", "Peren", "Phek", "Shamator", "Tseminyü",
            "Tuensang", "Wokha", "Zunheboto", "Meluri", "Satakha" // Some recent additions might still be evolving
        ],
        "Odisha": [
            "Angul", "Balangir", "Balasore", "Bargarh", "Bhadrak", "Boudh",
            "Cuttack", "Debagarh (Deogarh)", "Dhenkanal", "Gajapati", "Ganjam",
            "Jagatsinghpur", "Jajpur", "Jharsuguda", "" +
            "Kalahandi", "Kandhamal", "Kendrapara", "Kendujhar (Keonjhar)",
            "Khordha", "Koraput", "Malkangiri", "Mayurbhanj", "Nabarangpur",
            "Nayagarh", "Nuapada", "Puri", "Rayagada", "Sambalpur", "Subarnapur (Sonepur)",
            "Sundargarh"
        ],
        "Punjab": [
            "Amritsar", "Barnala", "Bathinda", "Faridkot", "Fatehgarh Sahib",
            "Fazilka", "Ferozepur", "Gurdaspur", "Hoshiarpur", "Jalandhar",
            "Kapurthala", "Ludhiana", "Mansa", "Moga", "Muktsar", "Pathankot",
            "Patiala", "Rupnagar", "Sahibzada Ajit Singh Nagar (Mohali)",
            "Sangrur", "Shaheed Bhagat Singh Nagar (Nawanshahr)", "Sri Muktsar Sahib",
            "Tarn Taran"
        ],
        "Rajasthan": [
            "Ajmer", "Alwar", "Balotra", "Banswara", "Baran", "Barmer", "Beawar",
            "Bharatpur", "Bhilwara", "Bikaner", "Bundi", "Chittorgarh", "Churu",
            "Dausa", "Dholpur", "Didwana Kuchaman", "Dungarpur", "Hanumangarh",
            "Jaipur", "Jaipur Rural", "Jaisalmer", "Jalore", "Jhalawar", "Jhunjhunu",
            "Jodhpur", "Jodhpur Rural", "Karauli", "Kekri", "Kota", "Kotputli-Behror",
            "Kherthal-Tijara", "Nagaur", "Pali", "Phalodi", "Pratapgarh", "Rajsamand",
            "Salumbar", "Sanchore", "Sawai Madhopur", "Shahpura", "Sikar", "Sirohi",
            "Sri Ganganagar", "Tonk", "Udaipur", "Anupgarh", "Gangapur City",
            "Deeg", "Dudu", "Neem Ka Thana" // Recent additions
        ],
        "Sikkim": [
            "Gangtok", "Gyalshing", "Mangan", "Namchi", "Pakyong", "Soreng" // Added recently
        ],
        "Tamil Nadu": [
            "Ariyalur", "Chengalpattu", "Chennai", "Coimbatore", "Cuddalore", "Dharmapuri",
            "Dindigul", "Erode", "Kallakurichi", "Kancheepuram", "Kanniyakumari",
            "Karur", "Krishnagiri", "Madurai", "Mayiladuthurai", "Nagapattinam",
            "Namakkal", "Nilgiris", "Perambalur", "Pudukkottai", "Ramanathapuram",
            "Ranipet", "Salem", "Sivaganga", "Tenkasi", "Thanjavur", "Theni",
            "Thoothukudi", "Tiruchirappalli", "Tirunelveli", "Tirupattur", "Tiruppur",
            "Tiruvallur", "Tiruvannamalai", "Tiruvarur", "Vellore", "Viluppuram",
            "Virudhunagar"
        ],
        "Telangana": [
            "Adilabad", "Bhadradri Kothagudem", "Hanumakonda", "Hyderabad", "Jagtial",
            "Jangaon", "Jayashankar Bhupalpally", "Jogulamba Gadwal", "Kamareddy",
            "Karimnagar", "Khammam", "Komaram Bheem Asifabad", "Mahabubabad",
            "Mahabubnagar", "Mancherial", "Medak", "Medchal–Malkajgiri", "Mulugu",
            "Nagarkurnool", "Nalgonda", "Narayanpet", "Nirmal", "Nizamabad",
            "Peddapalli", "Rajanna Sircilla", "Ranga Reddy", "Sangareddy", "Siddipet",
            "Suryapet", "Vikarabad", "Wanaparthy", "Warangal", "Yadadri Bhuvanagiri"
        ],
        "Tripura": [
            "Dhalai", "Gomati", "Khowai", "North Tripura", "Sepahijala", "South Tripura",
            "Unakoti", "West Tripura"
        ],
        "Uttar Pradesh": [
            "Agra", "Aligarh", "Ambedkar Nagar", "Amethi", "Amroha", "Auraiya",
            "Ayodhya", "Azamgarh", "Baghpat", "Bahraich", "Ballia", "Balrampur",
            "Banda", "Bara Banki", "Bareilly", "Basti", "Bhadohi", "Bijnor",
            "Budaun", "Bulandshahr", "Chandauli", "Chitrakoot", "Deoria", "Etah",
            "Etawah", "Farrukhabad", "Fatehpur", "Firozabad", "Gautam Buddh Nagar",
            "Ghaziabad", "Ghazipur", "Gonda", "Gorakhpur", "Hamirpur", "Hapur",
            "Hardoi", "Hathras", "Jalaun", "Jaunpur", "Jhansi", "Kannauj", "Kanpur Dehat",
            "Kanpur Nagar", "Kasganj", "Kaushambi", "Kushinagar", "Lakhimpur Kheri",
            "Lalitpur", "Lucknow", "Maharajganj", "Mahoba", "Mainpuri", "Mathura",
            "Mau", "Meerut", "Mirzapur", "" +
            "Moradabad", "Muzaffarnagar", "Pilibhit", "Pratapgarh", "Prayagraj",
            "Raebareli", "Rampur", "Saharanpur", "Sambhal", "Sant Kabir Nagar",
            "Shahjahanpur", "Shamli", "Shravasti", "Siddharthnagar", "Sitapur",
            "Sonbhadra", "Sultanpur", "Unnao", "Varanasi"
        ],
        "Uttarakhand": [
            "Almora", "Bageshwar", "Chamoli", "Champawat", "Dehradun", "Haridwar",
            "Nainital", "Pauri Garhwal", "Pithoragarh", "Rudraprayag", "Tehri Garhwal",
            "Udham Singh Nagar", "Uttarkashi"
        ],
        "West Bengal": [
            "Alipurduar", "Bankura", "Paschim Bardhaman", "Purba Bardhaman", "Birbhum",
            "Cooch Behar", "Dakshin Dinajpur", "Darjeeling", "Hooghly", "Howrah",
            "Jalpaiguri", "Jhargram", "Kalimpong", "Kolkata", "Malda", "Murshidabad",
            "Nadia", "North 24 Parganas", "Paschim Medinipur", "Purba Medinipur",
            "Purulia", "South 24 Parganas", "Uttar Dinajpur"
        ],
        "Andaman and Nicobar Islands": [
            "Nicobar", "North and Middle Andaman", "South Andaman"
        ],
        "Chandigarh": [
            "Chandigarh"
        ],
        "Dadra and Nagar Haveli and Daman and Diu": [
            "Dadra and Nagar Haveli", "Daman", "Diu"
        ],
        "Delhi": [
            "Central Delhi", "East Delhi", "New Delhi", "North Delhi", "North East Delhi",
            "North West Delhi", "Shahdara", "South Delhi", "South East Delhi",
            "South West Delhi", "West Delhi"
        ],
        "Jammu and Kashmir": [
            "Anantnag", "Bandipora", "Baramulla", "Budgam", "Doda", "Ganderbal",
            "Jammu", "Kathua", "Kishtwar", "Kulgam", "Kupwara", "Poonch", "Pulwama",
            "Rajouri", "Ramban", "Reasi", "Samba", "Shopian", "Srinagar", "Udhampur"
        ],
        "Ladakh": [
            "Kargil", "Leh"
        ],
        "Lakshadweep": [
            "Lakshadweep" // Comprises one district for all islands
        ],
        "Puducherry": [
            "Karaikal", "Mahe", "Puducherry", "Yanam"
        ]
    };


    const styles = {
        container: {
            borderRadius: "12px",
            display: "flex",
            minHeight: "80vh",
            fontFamily: "'Inter', sans-serif",
            color: "#1e1e1e",
            backgroundColor: "#f8f9fa",
            overflow: "hidden",
            width: "100%"
        },

        sidebar: {
            width: "280px",
            padding: "2rem",
            backgroundColor: "#fff",
            borderRight: "1px solid #eee",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            boxShadow: "0 0 15px rgba(0,0,0,0.05)",
            flexShrink: 0,
            overflowY: "auto",
            overflowX: "hidden",
            borderRadius: "12px",
        },
        sidebarLogo: {
            marginLeft: "65px",
            width: "80px",
            marginBottom: "10px",
            display: "block",
        },
        profileSection: {
            textAlign: "center",
            marginBottom: "50px",
        },
        profileAvatar: {
            width: "80px",
            // height: "80px",
            // borderRadius: "50%",
            // objectFit: "cover",
            margin: "0 auto 10px",
            // border: "2px solid #ddd",
            display: "block",
        },
        profileTitle: {
            fontSize: "13px",
            color: "#888",
            marginBottom: "5px",
        },
        profileName: {
            fontSize: "20px",
            fontWeight: "600",
            marginBottom: "15px",
        },
        stepIndicator: {
            fontSize: "14px",
            color: "#555",
            lineHeight: "1.5",
        },
        stepNumber: {
            fontWeight: "bold",
            color: "#007265",
        },
        selectedDateBox: {
            display: "inline-block",
            backgroundColor: "#e0f3ef",
            color: "#007265",
            padding: "8px 15px",
            borderRadius: "25px",
            fontWeight: "600",
            marginTop: "15px",
            fontSize: "14px",
        },
        stepsList: {
            fontSize: "14px",
            color: "#999",
            textAlign: "left",
            paddingLeft: "20px",
            position: "relative",
            marginTop: "30px",
        },
        stepItem: {
            marginBottom: "20px",
            display: "flex",
            alignItems: "center",
            position: "relative",
            paddingLeft: "20px",
        },
        stepLine: {
            position: "absolute",
            left: "10px",
            top: "0",
            bottom: "0",
            width: "2px",
            backgroundColor: "#eee",
            zIndex: 0,
        },
        stepBullet: (isActive) => ({
            width: "10px",
            height: "10px",
            borderRadius: "50%",
            border: `2px solid ${isActive ? "#007265" : "#ccc"}`,
            backgroundColor: isActive ? "#007265" : "#fff",
            position: "absolute",
            left: "6px",
            zIndex: 1,
            top: "50%",
            transform: "translateY(-50%)",
        }),
        stepItemText: (isActive) => ({
            color: isActive ? "#333" : "#999",
            fontWeight: isActive ? "600" : "normal",
            marginLeft: "10px",
        }),
        stepIcon: {
            marginRight: "10px",
        },

        main: {
            flex: 1,
            padding: "3rem 4rem",
            backgroundColor: "#f9f9fa",
            display: "flex",
            flexDirection: "column",
            overflowY: "hidden",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
        },
        mainHeading: {
            fontSize: "28px",
            fontWeight: "bold",
            marginBottom: "2rem",
            color: "#333",
            textAlign: "center",
            width: "100%",
            flexShrink: 0,
        },
        calendarAndTimes: {
            display: "flex",
            gap: "4rem",
            flexWrap: "wrap",
            justifyContent: "center",
            alignItems: "flex-start",
            width: "100%",
            flexGrow: 1,
            overflowY: "auto",
            paddingBottom: "25px",
            boxSizing: "border-box",
        },

        calendarWrapper: {
            flex: "0 0 auto",
            width: "350px",
            boxShadow: "0 0 20px rgba(0,0,0,0.08)",
            borderRadius: "12px",
            overflow: "hidden",
            display: "block",
        },
        timeSlotsSection: {
            flex: "0 0 auto",
            width: "200px",
            display: "flex",
            flexDirection: "column",
        },

        selectedDayHeader: {
            fontSize: "18px",
            fontWeight: "600",
            marginBottom: "20px",
            color: "#333",
        },
        timeButtonsContainer: {
            display: "flex",
            flexDirection: "column",
            gap: "12px",
        },
        timeButton: (time) => ({
            padding: "12px 15px",
            backgroundColor: selectedTime === time ? "#004D43" : "#fff",
            color: selectedTime === time ? "#fff" : "#333",
            border: "1px solid #DEDEDE",
            borderRadius: "12px",
            cursor: "pointer",
            fontWeight: "600",
            transition: "all 0.2s ease-in-out",
            textAlign: "center",
            boxShadow:
                selectedTime === time
                    ? "0 5px 15px rgba(0, 77, 67, 0.3)"
                    : "0 2px 5px rgba(0,0,0,0.05)",
            '&:hover': {
                backgroundColor: selectedTime === time ? "#004D43" : "#F0F0F0",
                color: selectedTime === time ? "#fff" : "#333",
            }
        }),
        navigationButtons: {
            display: "flex",
            justifyContent: "space-between",
            marginTop: "25px",
            marginLeft: "85px",
            gap: "15px",
            width: "100%",
            maxWidth: currentStep === 1 ? "550px" : "500px",
            flexShrink: 0,
        },
        actionButton: {
            flex: 1,
            padding: "14px 20px",
            backgroundColor: "#004D43",
            color: "#fff",
            border: "none",
            borderRadius: "12px",
            fontWeight: "700",
            cursor: "pointer",
            fontSize: "16px",
            transition: "background-color 0.2s ease-in-out",
            boxShadow: "0 5px 15px rgba(0, 77, 67, 0.4)",
        },
        previousButton: {
            backgroundColor: "#f0f0f0",
            color: "#333",
            boxShadow: "0 2px 5px rgba(0,0,0,0.05)",
        },
        buttonHover: {
            backgroundColor: "#006050",
        },
        previousButtonHover: {
            backgroundColor: "#e0e0e0",
        },

        formContainer: {
            backgroundColor: "#fff",
            padding: "2rem",
            borderRadius: "12px",
            boxShadow: "0 0 20px rgba(0,0,0,0.08)",
            width: "100%",
            maxWidth: "500px",
            flexGrow: 1,
            overflowY: "auto",
            overflowX: "hidden",
            maxHeight: "calc(100vh - 6rem - 80px - 25px)",
            boxSizing: "border-box",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            margin: "0 auto",
        },
        formInner: {
            width: "100%",
            paddingRight: "15px",
            boxSizing: "border-box",
        },
        formGroup: {
            marginBottom: "1.5rem",
        },
        formLabel: {
            display: "block",
            marginBottom: "0.5rem",
            fontWeight: "600",
            color: "#333",
            fontSize: "15px",

        },
        formInput: {
            width: "100%",
            backgroundColor: "#fff",
            color: "#000",
            padding: "12px",
            border: "1px solid #ddd",
            borderRadius: "8px",
            fontSize: "16px",
            boxSizing: "border-box",
        },
        formTextarea: {
            width: "100%",
            padding: "12px",
            border: "1px solid #ddd",
            borderRadius: "8px",
            fontSize: "16px",
            boxSizing: "border-box",
            minHeight: "80px",
            resize: "vertical",
            backgroundColor: "#fff",
            color: "#000",
        },
        confirmationContainer: {
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#fff",
            padding: "3rem",
            borderRadius: "12px",
            boxShadow: "0 0 20px rgba(0,0,0,0.08)",
            width: "100%",
            maxWidth: "600px",
            margin: "0 auto",
            textAlign: "center",
            minHeight: "300px",
            flexGrow: 1,
            overflowY: "auto",
            overflowX: "hidden",
            boxSizing: "border-box",
        },
        confirmationCheckmarkCircle: {
            width: "100px",
            height: "100px",
            borderRadius: "50%",
            backgroundColor: "#00C896",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: "20px",
            boxShadow: "0 10px 20px rgba(0, 200, 150, 0.3)",
        },
        confirmationCheckmarkIcon: {
            fontSize: "50px",
            color: "#fff",
            fontWeight: "bold",
        },
        confirmationMessage: {
            fontSize: "28px",
            fontWeight: "bold",
            color: "#333",
            marginBottom: "10px",
        },
        confirmationSubMessage: {
            fontSize: "16px",
            color: "#555",
            marginBottom: "30px",
            lineHeight: "1.5",
        },
        confirmationDateTimeSection: {
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            marginBottom: "30px",
            alignItems: "flex-start",
            width: "fit-content",
            margin: "0 auto",
            padding: "15px 25px",
            backgroundColor: "#e8f5e9",
            borderRadius: "12px",
            boxShadow: "0 2px 5px rgba(0,0,0,0.05)",
        },
        confirmationDateTimeItem: {
            display: "flex",
            alignItems: "center",
            fontSize: "18px",
            fontWeight: "600",
            color: "#004D43",
        },
        confirmationIcon: {
            marginRight: "10px",
            fontSize: "22px",
            color: "#007265",
        },
        startNewAppointmentButton: {
            padding: "14px 25px",
            backgroundColor: "#004D43",
            color: "#fff",
            border: "none",
            borderRadius: "12px",
            fontWeight: "700",
            cursor: "pointer",
            fontSize: "16px",
            transition: "background-color 0.2s ease-in-out",
            boxShadow: "0 5px 15px rgba(0, 77, 67, 0.4)",
            marginTop: "30px",
        },
    };

    const handleDateChange = (newDate) => {
        setDate(newDate);
        setSelectedTime(null);
        fetchslots(moment(newDate).format("YYYY-MM-DD"));
    };

    const handleTimeSelect = (time) => {
        setSelectedTime(time);
    };

    const handleNextClick = () => {
        if (currentStep === 1 && selectedTime) {
            setCurrentStep(2);
        } else if (currentStep === 1 && !selectedTime) {
            alert("Please select a time slot before proceeding.");
        }
    };

    const handlePreviousClick = () => {
        setCurrentStep(currentStep - 1);
    };

    const handlePhoneNumberChange = (e) => {
        const rawValue = e.target.value;
        const digitsOnly = rawValue.replace(/\D/g, '');
         if (digitsOnly === '') {
        setUserPhoneNumber('');
        return;
    }
        let finalDigits = digitsOnly;
        if (digitsOnly.startsWith('91') && digitsOnly.length > 2) {
            finalDigits = digitsOnly.substring(2);
        } else if (digitsOnly.startsWith('0') && digitsOnly.length > 1) {
            finalDigits = digitsOnly.substring(1);
        }

        if (finalDigits.length <= 10) {
            setUserPhoneNumber(finalDigits);
        }
    };



    const makePayment = async (datas) => {
    const res = await axios.post('https://api.care2connect.in/create_order', { amount: 200 });

    const { id: order_id, amount, currency } = res.data;

    const options = {
      key: "rzp_live_R9tGl7bLSIBV6f", // same as Flask
      amount: amount.toString(),
      currency,
      name: "Care2connect",
      description: "Care2connect",
      order_id,
      handler: async (response) => {
        const verifyRes = await axios.post('https://api.care2connect.in/verify', {
          razorpay_order_id: response.razorpay_order_id,
          razorpay_payment_id: response.razorpay_payment_id,
          razorpay_signature: response.razorpay_signature
        });

        if (verifyRes.data.status === "success") {
        //   alert("Payment Successful!");


          const responses =  await postapi('/appointments/create', {...datas,pay_id:response.razorpay_payment_id,amount:200});
        console.log(responses);
        setCurrentStep(3);


        } else {
          alert("Payment Failed!");
        }
      },
      theme: {
        color: "#3399cc"
      }
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };




    const handleConfirmAppointment = async(e) => {
        e.preventDefault();

        if (!userName || !fatherName || !userEmail || !selectedState || !selectedCity || !addressDetails || userPhoneNumber.length !== 10) {
            alert("Please fill in all required details correctly (including a 10-digit phone number).");
            return;
        }

        console.log("Booking Details:", {
            date: date.toDateString(),
            time: selectedTime,
            name: userName,
            fatherName: fatherName,
            email: userEmail,
            state: selectedState,
            city: selectedCity,
            address: addressDetails,
            phone: `+91 ${userPhoneNumber}`,
        });

          const data={
        patient_name:userName,
        guardian_name:fatherName,
        address:addressDetails,
        age:'20+',
        city:selectedCity,
        vaccine:true,    
        gender:"male",
        symptoms:"NA",
        doctor_phone_id:id,
        date_of_appointment:moment(date).format("YYYY-MM-DD"),
        time_slot: selectedTime,

      }
      
      try {
        makePayment(data)
        
      } catch (error) {
        console.error('Error submitting appointment:', error);
      }

    };

    const handleStartNewAppointment = () => {
        setCurrentStep(1);
        setDate(new Date());
        setSelectedTime(null);
        setUserName("");
        setFatherName("");
        setUserEmail("");
        setSelectedState("");
        setSelectedCity("");
        setAddressDetails("");
        setUserPhoneNumber("");
    };

    const tileContent = ({ date: tileDate, view }) => {
        if (view === "month" && tileDate.toDateString() === date.toDateString()) {
            return (
                <div
                    style={{
                        position: "absolute",
                        bottom: "2px",
                        left: "50%",
                        transform: "translateX(-50%)",
                        width: 0,
                        height: 0,
                        borderLeft: "5px solid transparent",
                        borderRight: "5px solid transparent",
                        borderTop: "8px solid #FFD700",
                    }}
                ></div>
            );
        }
        return null;
    };

    const formattedDayHeader = date.toLocaleDateString("en-US", {
        weekday: "long",
        day: "2-digit",
        month: "long",
    });

    const formattedBookedDate = date.toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
    });
const maxDate = new Date();
maxDate.setDate(maxDate.getDate() + 7);


    return (
        <div style={{ maxWidth: "1150px", width: "100%", margin: "120px auto 20px auto", overflow: "hidden", backgroundColor: "white", color: "#fff", borderRadius: "13px" }}>
            <div style={styles.container} className="App-container">
                <style>
                    {`
               html, body, #root {
    margin: 0;
    padding: 0;
    overflow-x: hidden;
    font-family: 'Inter', sans-serif;
    background-color: #6993dfff !important; 
}

                .react-calendar {
                    border: none !important;
                    background-color: #fff !important;
                    border-radius: 12px;
                    width: 100%;
                    padding: 15px;
                }

                .App-container{
                 background-color: white;
 padding: 20px;
 border: 1px solid #ccc;
  border-radius: 56px;
                }

                .react-calendar__navigation {
                    display: flex;
                    justify-content: center;
                    margin-bottom: 1em;
                    height: 44px;
                }

                .react-calendar__navigation button {
                    min-width: 44px;
                    background: none;
                    border-radius: 8px;
                    font-size: 20px;
                    color: #555;
                    font-weight: normal;
                    transition: background-color 0.2s;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
                .react-calendar__navigation button:enabled:hover,
                .react-calendar__navigation button:enabled:focus {
                    background-color: #e6e6e6;
                }
                .react-calendar__navigation__arrow {
                    font-size: 1.5em;
                    font-weight: bold;
                    color: #004D43;
                }


                .react-calendar__navigation__label {
                    flex-grow: 1;
                    font-size: 18px;
                    font-weight: 600;
                    color: "#333";
                    pointer-events: none;
                    background: none;
                }
                .react-calendar__navigation__label:enabled:hover,
                .react-calendar__navigation__label:enabled:focus {
                    background-color: transparent;
                }

                .react-calendar__month-view__weekdays {
                    text-align: center;
                    text-transform: uppercase;
                    font-size: 11px;
                    font-weight: 500;
                    color: "#999";
                    margin-bottom: 0.5em;
                }

                .no-scrollbar::-webkit-scrollbar {
  display: none;
}
.no-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

                .react-calendar__month-view__weekdays__weekday abbr {
                    text-decoration: none;
                }

                .react-calendar__tile {
                    padding: 8px 0;
                    font-size: 14px;
                    border-radius: 8px;
                    transition: background-color 0.2s, color 0.2s;
                    position: relative;
                    color: #333;
                }
                .react-calendar__tile--now {
                    background-color: #f0f0f0 !important;
                    color: #333;
                    font-weight: 600;
                }
                .react-calendar__tile:enabled:hover:not(.selected-date-tile),
                .react-calendar__tile:enabled:focus:not(.selected-date-tile) {
                    background-color: #e6e6e6;
                    color: #333;
                }

                .selected-date-tile {
                    background-color: #004D43 !important;
                    color: #fff !important;
                    font-weight: bold;
                    box-shadow: 0 5px 15px rgba(0, 77, 67, 0.3);
                }

                .react-calendar__month-view__days__day--weekend {
                    color: #333;
                }

                .hide-scrollbar {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
                .hide-scrollbar::-webkit-scrollbar {
                    display: none;
                }

                @media (max-width: 768px) {
                    .App-container {
                        flex-direction: column;
                        max-width: 100%;
                        margin: 0;
                        overflow-x: hidden;
                    }
                    .App-sidebar {
                    
                        width: 100%;
                        border-right: none;
                        border-bottom: 1px solid #eee;
                        padding: 1.5rem;
                        box-shadow: none;
                        overflow-y: hidden;
                    }
                    .App-main {
                        padding: 1.5rem;
                    }
                    .App-calendarAndTimes {
                        flex-direction: column;
                        align-items: center;
                        gap: 2rem;
                    }
                    .App-calendarWrapper, .App-timeSlotsSection {
                        width: 100%;
                        max-width: 350px;
                    }
                }
                `}
                </style>

                <div style={styles.sidebar} className="App-sidebar hide-scrollbar">
                    <div>
                        <br />

                        <br />
                        <div style={styles.profileSection}>
                            <img
                                src="https://care2connect.in/assets/pp-BXFzvpwK.png"
                                alt="Doctor's Logo"
                                style={styles.profileAvatar}
                            />
                            {/* <p style={styles.profileTitle}>Founder & Head of IT</p>
                            <h3 style={styles.profileName}>Doctor</h3> */}
                            <p style={styles.stepIndicator}>
                                <span style={styles.stepNumber}>Step {currentStep}</span>
                                <br />
                                Please select your desired appointment.
                            </p>
                            {currentStep > 1 && (
                                <div style={styles.selectedDateBox}>
                                    {date.toLocaleDateString("en-US", {
                                        day: "2-digit",
                                        month: "short",
                                        year: "numeric",
                                    })}
                                    {selectedTime && ` at ${selectedTime}`}
                                </div>
                            )}
                        </div>
                    </div>
                    <div style={styles.stepsList}>
                        <div style={{ ...styles.stepItem, marginBottom: "20px" }}>
                            <div style={styles.stepLine}></div>
                            <div style={styles.stepBullet(currentStep >= 1)}></div>
                            <span style={styles.stepItemText(currentStep >= 1)}>
                                <span style={styles.stepIcon}>📅</span> Date & Time
                            </span>
                        </div>
                        <div style={{ ...styles.stepItem, marginBottom: "20px" }}>
                            <div style={styles.stepLine}></div>
                            <div style={styles.stepBullet(currentStep >= 2)}></div>
                            <span style={styles.stepItemText(currentStep >= 2)}>
                                <span style={styles.stepIcon}>📝</span> Your Details
                            </span>
                        </div>
                        <div style={styles.stepItem}>
                            <div style={{ ...styles.stepLine, height: "0" }}></div>
                            <div style={styles.stepBullet(currentStep >= 3)}></div>
                            <span style={styles.stepItemText(currentStep >= 3)}>
                                {currentStep === 3
                                    ? `Appointment booked on ${formattedBookedDate} at ${selectedTime}`
                                    : "Appointment booked"}
                            </span>
                        </div>
                    </div>
                </div>

                <div style={styles.main} className="App-main">
                    <img
                        src={logo} // ✅ Replace with your image path
                        alt="Background Logo"
                        style={{
                            position: "absolute",
                            top: "50%",
                            left: "50%",
                            transform: "translate(-50%, -50%)",
                            width: "500px",       // ✅ Adjust as needed
                            height: "auto",
                            opacity: 0.27,         // ✅ Faint logo
                            zIndex: 0,
                            pointerEvents: "none", // So it doesn’t block form inputs
                        }}
                    />
                    <div style={{ position: "relative", zIndex: 2, width: "100%" }}>

                        {currentStep === 1 && (
                            <>
                                <h2 style={styles.mainHeading}>Choose Date & Time</h2>
                                <div style={styles.calendarAndTimes} className="App-calendarAndTimes hide-scrollbar">
                                    <div style={styles.calendarWrapper} className="App-calendarWrapper">
                                        <Calendar
                                            onChange={handleDateChange}
                                            minDate={new Date()}
                                            maxDate={maxDate}
                                            value={date}
                                            locale="en-US"
                                            tileClassName={({ date: tileDate, view }) => {
                                                if (view === "month" && tileDate.toDateString() === date.toDateString()) {
                                                    return "selected-date-tile";
                                                }
                                                return null;
                                            }}
                                              // ✅ Disable only dates where enabled=false
                                            tileDisabled={({ date: tileDate }) =>
                                                disabledDates.some(disabled => tileDate.toDateString() === disabled.toDateString())
                                            }
                                            tileContent={tileContent}
                                            prev2Label={null}
                                            next2Label={null}
                                        />
                                    </div>
                                    <div style={styles.timeSlotsSection} className="App-timeSlotsSection">
                                        <h4 style={styles.selectedDayHeader}>
                                            {formattedDayHeader}
                                        </h4>
                                        <div style={styles.timeButtonsContainer}>
                                            {slots.length>0&&slots.map((time) => (
                                                <button
                                                    key={time.id}
                                                    onClick={() => handleTimeSelect(time.id)}
                                                    onMouseEnter={() => setHoveredTime(time.id)}
                                                    onMouseLeave={() => setHoveredTime(null)}
                                                    style={styles.timeButton(time.id)}
                                                >
                                                    {time.id}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                <div style={styles.navigationButtons}>
                                    <button
                                        style={
                                            hoveredTime === "nextButton"
                                                ? { ...styles.actionButton, ...styles.buttonHover }
                                                : styles.actionButton
                                        }
                                        onMouseEnter={() => setHoveredTime("nextButton")}
                                        onMouseLeave={() => setHoveredTime(null)}
                                        onClick={handleNextClick}
                                        disabled={!selectedTime}
                                    >
                                        {selectedTime ? "Next" : "Select a time"}
                                    </button>
                                </div>
                            </>
                        )}

                        {currentStep === 2 && (
                            <>
                                <h2 style={styles.mainHeading}>Your Details</h2>
                                {/* <div className="hide-scrollbar" style={{ padding: "0 10px", width: "100%", display: "flex", justifyContent: "center" }}> */}
                                <div className="hide-scrollbar" style={{ padding: "0", margin: "0", width: "100%", display: "flex", justifyContent: "center" }}>

                                    <form
                                        onSubmit={handleConfirmAppointment}
                                        style={{
                                            display: "grid",
                                            gridTemplateColumns: "1fr 1fr",
                                            gap: "8px",
                                            width: "100%",
                                            maxWidth: "1000px",
                                        }}
                                    >
                                        <div style={styles.formGroup}>
                                            <label htmlFor="userName" style={styles.formLabel}>Full Name</label>
                                            <input
                                                type="text"
                                                id="userName"
                                                style={styles.formInput}
                                                value={userName}
                                                onChange={(e) => setUserName(e.target.value)}
                                                placeholder="Your full name"
                                                required
                                                autoComplete="off"

                                            />
                                        </div>

                                        <div style={styles.formGroup}>
                                            <label htmlFor="fatherName" style={styles.formLabel}>Father's Name</label>
                                            <input
                                                type="text"
                                                id="fatherName"
                                                style={styles.formInput}
                                                value={fatherName}
                                                onChange={(e) => setFatherName(e.target.value)}
                                                placeholder="Your father's full name"
                                                required
                                                autoComplete="off"
                                            />
                                        </div>

                                        <div style={styles.formGroup}>
                                            <label htmlFor="userEmail" style={styles.formLabel}>Email ID</label>
                                            <input
                                                type="email"
                                                id="userEmail"
                                                style={styles.formInput}
                                                value={userEmail}
                                                onChange={(e) => setUserEmail(e.target.value)}
                                                placeholder="your.email@example.com"
                                                required
                                                autoComplete="off"
                                            />
                                        </div>

                                        <div style={styles.formGroup}>
                                            <label htmlFor="userPhone" style={styles.formLabel}>Mobile Number</label>
                                              <div style={{ display: "flex", alignItems: "center" }}>
    <span style={{ marginRight: "6px" }}>+91</span>
                                            <input
                                                type="tel"
                                                id="userPhone"
                                                style={styles.formInput}
                                                value={userPhoneNumber}
                                                onChange={handlePhoneNumberChange}
                                                placeholder="e.g., 9876543210"
                                                required
                                                maxLength="14"
                                                pattern="\d{10}"
                                                autoComplete="off"
                                            />
                                        </div>
                                        </div>

                                        <div style={styles.formGroup}>
                                            <label htmlFor="state" style={styles.formLabel}>State</label>
                                            <select
                                                id="state"
                                                className="no-scrollbar"
                                                style={styles.formInput}
                                                value={selectedState}
                                                onChange={(e) => {
                                                    setSelectedState(e.target.value);
                                                    setSelectedCity("");
                                                }}
                                                required
                                                autoComplete="off"
                                            >
                                                <option value="">Select State</option>
                                                {Object.keys(indiaStatesAndCities).sort().map((stateName) => (
                                                    <option key={stateName} value={stateName}>{stateName}</option>
                                                ))}
                                            </select>
                                        </div>

                                        <div style={styles.formGroup}>
                                            <label htmlFor="city" style={styles.formLabel}>City</label>
                                            <select
                                                id="city"
                                                style={styles.formInput}
                                                className="no-scrollbar"
                                                value={selectedCity}
                                                onChange={(e) => setSelectedCity(e.target.value)}
                                                disabled={!selectedState}
                                                required
                                                autoComplete="off"
                                            >
                                                <option value="">Select City</option>
                                                {selectedState && indiaStatesAndCities[selectedState].sort().map((cityName) => (
                                                    <option key={cityName} value={cityName}>{cityName}</option>
                                                ))}
                                            </select>
                                        </div>

                                        <div style={{ ...styles.formGroup, gridColumn: "1 / -1" }}>
                                            <label htmlFor="addressDetails" style={styles.formLabel}>Address</label>
                                            <textarea
                                                id="addressDetails"
                                                style={styles.formTextarea}
                                                value={addressDetails}
                                                onChange={(e) => setAddressDetails(e.target.value)}
                                                placeholder="Street, Building, Landmark, Pincode"
                                                rows="3"
                                                required
                                                autoComplete="off"
                                            ></textarea>
                                        </div>
                                    </form>
                                </div>

                                <div style={{ ...styles.navigationButtons, marginTop: "30px" }}>
                                    <button
                                        type="button"
                                        style={hoveredTime === "previousButton"
                                            ? { ...styles.actionButton, ...styles.previousButton, ...styles.previousButtonHover }
                                            : { ...styles.actionButton, ...styles.previousButton }}
                                        onMouseEnter={() => setHoveredTime("previousButton")}
                                        onMouseLeave={() => setHoveredTime(null)}
                                        onClick={handlePreviousClick}
                                    >
                                        Previous
                                    </button>

                                    <button
                                        type="submit"
                                        form=""
                                        style={hoveredTime === "confirmButton"
                                            ? { ...styles.actionButton, ...styles.buttonHover }
                                            : styles.actionButton}
                                        onMouseEnter={() => setHoveredTime("confirmButton")}
                                        onMouseLeave={() => setHoveredTime(null)}
                                        onClick={handleConfirmAppointment}
                                    >
                                        Confirm Appointment
                                    </button>
                                </div>
                            </>
                        )}


                        {currentStep === 3 && (
                            <div style={styles.confirmationContainer} className="hide-scrollbar">
                                <div style={styles.confirmationCheckmarkCircle}>
                                    <span style={styles.confirmationCheckmarkIcon}>&#10003;</span>
                                </div>
                                <h3 style={styles.confirmationMessage}>Your Appointment is Booked!</h3>
                                <p style={styles.confirmationSubMessage}>
                                    A confirmation email has been sent to your inbox.
                                </p>
                                <div style={styles.confirmationDateTimeSection}>
                                    <p style={styles.confirmationDateTimeItem}>
                                        <span style={styles.confirmationIcon}>📅</span>
                                        {formattedBookedDate}
                                    </p>
                                    <p style={styles.confirmationDateTimeItem}>
                                        <span style={styles.confirmationIcon}>🕒</span>
                                        {selectedTime}
                                    </p>
                                </div>
                                <button
                                    style={
                                        hoveredTime === "startNewButton"
                                            ? { ...styles.startNewAppointmentButton, ...styles.buttonHover }
                                            : styles.startNewAppointmentButton
                                    }
                                    onMouseEnter={() => setHoveredTime("startNewButton")}
                                    onMouseLeave={() => setHoveredTime(null)}
                                    onClick={handleStartNewAppointment}
                                >
                                    Start New Appointment
                                </button>
                            </div>
                        )}
                    </div>
                </div>

            </div>

        </div>
    );
};

export default Appointment;