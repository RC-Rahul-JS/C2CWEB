import React, { useState, useRef } from 'react';
import { 
  UserPlus, 
  Calendar, 
  Phone, 
  Mail, 
  MapPin, 
  ShieldCheck, 
  CheckCircle2, 
  ArrowLeft, 
  FileText, 
  Save, 
  XCircle, 
  Fingerprint, 
  RefreshCw, 
  KeyRound, 
  Building2, 
  Hash, 
  UserCheck, 
  Users, 
  Upload, 
  Trash2, 
  Paperclip, 
  FileIcon, 
  Clock,
  Activity,
  CreditCard,
  ChevronDown
} from 'lucide-react';


// Constants
const INDIAN_STATES = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal", "Delhi", "Chandigarh"
];

const CITY_MAP = {
  "Maharashtra": ["Mumbai", "Pune", "Nagpur", "Thane", "Nashik", "Aurangabad", "Solapur"],
  "Karnataka": ["Bengaluru", "Mysuru", "Hubballi-Dharwad", "Mangaluru", "Belagavi", "Gulbarga"],
  "Tamil Nadu": ["Chennai", "Coimbatore", "Madurai", "Tiruchirappalli", "Salem", "Erode"],
  "Uttar Pradesh": ["Lucknow", "Kanpur", "Varanasi", "Agra", "Meerut", "Noida", "Ghaziabad"],
  "Gujarat": ["Ahmedabad", "Surat", "Vadodara", "Rajkot", "Bhavnagar", "Jamnagar"],
  "West Bengal": ["Kolkata", "Asansol", "Siliguri", "Durgapur", "Bardhaman"],
  "Telangana": ["Hyderabad", "Warangal", "Nizamabad", "Karimnagar", "Khammam"],
  "Delhi": ["New Delhi", "North Delhi", "South Delhi", "West Delhi", "East Delhi"]
};

const RELATIONSHIPS = ["Father", "Mother", "Spouse", "Sibling", "Guardian", "Son", "Daughter", "Other"];
const DOC_TYPES = ["Aadhaar Card", "Insurance Card", "Birth Certificate", "Other ID Proof"];

/**
 * Glassy Input Component - Tightened widths and padding
 */
const GradientInput = ({ label, icon: Icon, error, ...props }) => (
  <div className="space-y-1 group">
    <label className="block text-[10px] font-bold text-slate-600 uppercase tracking-wider px-1">
      {label} {props.required && <span className="text-rose-500">*</span>}
    </label>
    <div className="relative">
      <div className={`relative flex items-center bg-white/40 backdrop-blur-md rounded border transition-all duration-200 overflow-hidden shadow-[inset_0_1px_1px_rgba(255,255,255,0.6)] 
        ${error ? 'border-rose-500 ring-1 ring-rose-500/20' : 'border-white/60 focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500/20'}`}>
        {Icon && (
          <div className={`pl-2 pr-1.5 py-1 transition-colors ${error ? 'text-rose-500' : 'text-slate-500 group-focus-within:text-blue-600'}`}>
            <Icon size={14} strokeWidth={2.5} />
          </div>
        )}
        <input
          {...props}
          className={`w-full text-xs py-1.5 px-2 focus:outline-none bg-transparent font-semibold placeholder:text-slate-400 ${Icon ? 'pl-0' : ''}`}
        />
      </div>
    </div>
    {error && <p className="text-[9px] text-rose-600 font-bold uppercase mt-0.5 px-1">{error}</p>}
  </div>
);

/**
 * Glassy Select Component
 */
const GradientSelect = ({ label, icon: Icon, options, ...props }) => (
  <div className="space-y-1 group">
    <label className="block text-[10px] font-bold text-slate-600 uppercase tracking-wider px-1">
      {label}
    </label>
    <div className="relative">
      <div className="relative flex items-center bg-white/40 backdrop-blur-md rounded border border-white/60 focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500/20 transition-all duration-200 overflow-hidden shadow-[inset_0_1px_1px_rgba(255,255,255,0.6)]">
        {Icon && (
          <div className="pl-2 pr-1.5 py-1 text-slate-500 group-focus-within:text-blue-600 transition-colors">
            <Icon size={14} strokeWidth={2.5} />
          </div>
        )}
        <select
          {...props}
          className={`w-full text-xs py-1.5 px-2 focus:outline-none bg-transparent font-semibold appearance-none cursor-pointer ${Icon ? 'pl-0' : ''}`}
        >
          <option value="">-- Select --</option>
          {options.map(opt => (
            <option key={opt} value={typeof opt === 'string' ? opt : opt.value}>
              {typeof opt === 'string' ? opt : opt.label}
            </option>
          ))}
        </select>
        <div className="absolute right-2 pointer-events-none text-slate-400">
          <ChevronDown size={12} />
        </div>
      </div>
    </div>
  </div>
);

const App = () => {
  const fileInputRef = useRef(null);
  const [formData, setFormData] = useState({
    titleName:'',firstName: '',middleName:'', lastName: '', dob: '', age: '', gender: '',
    email: '', phone: '', address: '', state: '', city: '',
    pincode: '', aadharNumber: '', otpValue: '', guardianName: '',
    guardianRelation: '', guardianPhone: '', insuranceProvider: '',
    policyNumber: '', medicalHistory: '', emergencyContactName: '',
    emergencyContactPhone: ''
  });

  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [selectedDocType, setSelectedDocType] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});
  const [aadharStatus, setAadharStatus] = useState('idle'); 
  const [showOtpField, setShowOtpField] = useState(false);

  const calculateAge = (dob) => {
    if (!dob) return '';
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) age--;
    return age >= 0 ? age.toString() : '0';
  };

  const handleAadharChange = (e) => {
    let value = e.target.value.replace(/\D/g, ''); 
    if (value.length > 12) value = value.slice(0, 12);
    const formattedValue = value.replace(/(\d{4})(?=\d)/g, '$1 ');
    setFormData(prev => ({ ...prev, aadharNumber: formattedValue }));
    setAadharStatus('idle');
    setShowOtpField(false);
  };

  const handleOtpChange = (e) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 6) value = value.slice(0, 6);
    setFormData(prev => ({ ...prev, otpValue: value }));
  };

  const sendOtp = () => {
    const cleanAadhar = formData.aadharNumber.replace(/\s/g, '');
    if (cleanAadhar.length !== 12) {
      setErrors(prev => ({ ...prev, aadharNumber: 'Invalid' }));
      return;
    }
    setAadharStatus('sending_otp');
    setTimeout(() => {
      setAadharStatus('otp_sent');
      setShowOtpField(true);
    }, 800);
  };

  const verifyOtp = () => {
    if (formData.otpValue.length !== 6) return;
    setAadharStatus('verifying_otp');
    setTimeout(() => setAadharStatus('verified'), 1000);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'dob') {
      const newAge = calculateAge(value);
      setFormData(prev => ({ ...prev, dob: value, age: newAge }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const handleFileSelection = (e) => {
    const file = e.target.files[0];
    if (file && selectedDocType) {
      setUploadedFiles([...uploadedFiles, {
        id: Math.random().toString(36).substr(2, 9),
        name: file.name,
        type: selectedDocType,
        size: (file.size / 1024).toFixed(1) + ' KB'
      }]);
      setSelectedDocType('');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 1200);
  };

  const resetForm = () => {
    setFormData({
      titleName:'',firstName: '',middleName:'', lastName: '', dob: '', age: '', gender: '',
      email: '', phone: '', address: '', state: '', city: '',
      pincode: '', aadharNumber: '', otpValue: '', guardianName: '',
      guardianRelation: '', guardianPhone: '', insuranceProvider: '',
      policyNumber: '', medicalHistory: '', emergencyContactName: '',
      emergencyContactPhone: ''
    });
    setUploadedFiles([]);
    setAadharStatus('idle');
    setShowOtpField(false);
    setSubmitted(false);
    setErrors({});
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-emerald-400/10 rounded-full blur-[120px] animate-pulse" />
        </div>
        
        <div className="max-w-sm w-full bg-white/70 backdrop-blur-2xl rounded-2xl shadow-2xl p-8 text-center border border-white/80 relative z-10 animate-in zoom-in-95 duration-500">
          <div className="w-16 h-16 bg-gradient-to-tr from-emerald-500 to-teal-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl shadow-emerald-500/20">
            <CheckCircle2 className="w-9 h-9 text-white" />
          </div>
          <h2 className="text-xl font-bold text-slate-900 mb-2 tracking-tight">Registration Logged</h2>
          <p className="text-slate-500 text-xs mb-8">Secure database sync complete.</p>
          <button onClick={resetForm} className="w-full py-3 bg-slate-900 hover:bg-black text-white rounded-xl font-bold transition-all text-xs uppercase tracking-widest shadow-lg shadow-slate-200">
            New Entry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 py-6 px-4 font-sans antialiased relative overflow-hidden">
      
      {/* Liquid Glass Background Elements */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-[-15%] left-[-10%] w-[50%] h-[50%] bg-gradient-to-br from-blue-400/20 to-purple-500/20 blur-[100px] rounded-full animate-pulse duration-[8s]" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-gradient-to-tr from-teal-400/20 to-cyan-500/20 blur-[120px] rounded-full animate-pulse delay-1000 duration-[10s]" />
        <div className="absolute top-[30%] right-[-5%] w-[30%] h-[30%] bg-gradient-to-l from-indigo-500/15 to-transparent blur-[80px] rounded-full animate-bounce duration-[15s]" />
        <div className="absolute bottom-[20%] left-[20%] w-[20%] h-[20%] bg-pink-500/10 blur-[90px] rounded-full animate-bounce delay-700 duration-[12s]" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Header */}
        <div className="bg-white/30 backdrop-blur-3xl rounded-t-2xl border-x border-t border-white/60 px-5 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-gradient-to-br from-blue-500 to-indigo-600 text-white rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20 border border-white/30">
              <Activity size={20} />
            </div>
            <div>
              <h1 className="text-sm font-black bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-700 uppercase tracking-tight leading-none">
                Patient Core Terminal
              </h1>
              <span className="text-[9px] text-slate-500 font-bold uppercase flex items-center gap-1 mt-0.5">
                <ShieldCheck size={10} className="text-emerald-500" /> AES-256 SECURED
              </span>
            </div>
          </div>
          <div className="flex gap-2">
            <button className="p-1.5 text-slate-500 bg-white/20 hover:bg-white/40 border border-white/40 rounded-lg transition-all"><ArrowLeft size={14} /></button>
            <button className="p-1.5 text-slate-500 bg-white/20 hover:bg-white/40 border border-white/40 rounded-lg transition-all"><FileText size={14} /></button>
          </div>
        </div>

        {/* Main Form */}
        <form onSubmit={handleSubmit} className="bg-white/20 backdrop-blur-3xl border border-white/50 shadow-2xl rounded-b-2xl overflow-hidden relative">
          
          <div className="p-5 space-y-6 relative z-10">
            
            {/* Identity Info Panel */}
            <section className="space-y-4">
              <div className="flex items-center gap-2 px-1">
                <div className="h-3 w-1 bg-gradient-to-b from-blue-500 to-indigo-600 rounded-full" />
                <h3 className="text-[9px] font-black text-slate-500 uppercase tracking-[0.2em]">01 Identity Auth</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                {/* Aadhaar UID Verification */}
                <div className="md:col-span-4 bg-white/20 p-3 rounded-xl border border-white/40 shadow-sm backdrop-blur-md">
                  <label className="block text-[9px] font-bold text-slate-600 uppercase tracking-wider mb-1.5 px-1">
                    Aadhaar UID Verification <span className="text-rose-500">*</span>
                  </label>
                  <div className="flex flex-col sm:flex-row gap-2">
                    <div className="relative flex-1 group">
                      <div className="absolute inset-y-0 left-3 flex items-center text-slate-400 group-focus-within:text-blue-500 transition-colors pointer-events-none">
                        <Fingerprint size={14} strokeWidth={2.5} />
                      </div>
                      <input 
                        placeholder="0000 0000 0000" 
                        value={formData.aadharNumber} 
                        onChange={handleAadharChange}
                        disabled={aadharStatus === 'verified'}
                        className="w-full text-xs pl-9 pr-3 py-2 bg-white/50 border border-white/80 rounded-lg font-mono tracking-widest focus:outline-none focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all shadow-[inset_0_1px_2px_rgba(0,0,0,0.05)]"
                      />
                    </div>
                    <button 
                      type="button" 
                      onClick={sendOtp} 
                      disabled={aadharStatus !== 'idle'} 
                      className={`px-6 py-2 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all shadow-md active:scale-95 flex items-center justify-center gap-2
                        ${aadharStatus === 'idle' ? 'bg-slate-900 text-white hover:bg-black' : 'bg-slate-200 text-slate-400 cursor-not-allowed'}`}
                    >
                      {aadharStatus === 'sending_otp' ? <RefreshCw className="animate-spin" size={12} /> : 'Request OTP'}
                    </button>
                  </div>

                  {showOtpField && (
                    <div className="mt-3 pt-3 border-t border-white/40 flex flex-col sm:flex-row items-end gap-3 animate-in fade-in slide-in-from-top-1">
                      <div className="w-full sm:flex-1">
                        <GradientInput label="Confirm OTP Code" icon={KeyRound} name="otpValue" value={formData.otpValue} onChange={handleOtpChange} disabled={aadharStatus === 'verified'} placeholder="6-digit" />
                      </div>
                      <button 
                        type="button" 
                        onClick={verifyOtp} 
                        disabled={aadharStatus === 'verified' || formData.otpValue.length !== 6} 
                        className={`h-[30px] px-6 text-[9px] font-black rounded-lg uppercase transition-all shadow-md w-full sm:w-auto
                          ${aadharStatus === 'verified' ? 'bg-emerald-500 text-white' : 'bg-blue-600 text-white hover:bg-blue-700'}`}
                      >
                        {aadharStatus === 'verified' ? 'Verified' : 'Verify'}
                      </button>
                    </div>
                  )}
                </div>

                {/* Patient Details */}
                 <div className="col-span-1">
                  <GradientSelect label="Title Name" icon={Users} name="titleName" options={['Mr', 'Mrs', 'Ms']} value={formData.titleName} onChange={handleChange} />
                </div>
                <div className="col-span-1">
                  <GradientInput label="First Name" icon={UserCheck} name="firstName" value={formData.firstName} onChange={handleChange} required />
                </div>
                <div className="col-span-1">
                  <GradientInput label="Middle Name" icon={UserCheck} name="middleName" value={formData.middleName} onChange={handleChange} required />
                </div>
                <div className="col-span-1">
                  <GradientInput label="Last Name" icon={UserCheck} name="lastName" value={formData.lastName} onChange={handleChange} required />
                </div>
                <div className="col-span-1">
                  <GradientInput label="Father`s Name" icon={Calendar}  name="dob" value={formData.dob} onChange={handleChange} required />
                </div>
                <div className="col-span-1">
                  <GradientInput label="D.O.B of Patient" icon={Calendar} type="date" name="dob" value={formData.dob} onChange={handleChange} required />
                </div>
                <div className="col-span-1">
                  <GradientInput label="Age" icon={Clock} value={formData.age} readOnly />
                </div>
                <div className="col-span-1">
                  <GradientSelect label="Gender" icon={Users} name="gender" options={['Male', 'Female', 'Other']} value={formData.gender} onChange={handleChange} />
                </div>
                 <div className="col-span-1">
                  <GradientSelect label="Matital Status" icon={Users} name="gender" options={['Single', 'Married']} value={formData.gender} onChange={handleChange} />
                </div>
                <div className="col-span-1">
                  <GradientInput label="Occupation" icon={Clock} value={formData.age} readOnly />
                </div>
                <div className="col-span-1"><GradientInput label="Email Address" icon={Mail} name="email" value={formData.email} onChange={handleChange} /></div>
<div className="col-span-1">
                                  <GradientInput label="Phone" icon={Phone} name="phone" value={formData.phone} onChange={handleChange} required />

                </div>
              </div>
            </section>

            {/* Reachability Panel */}
            <section className="space-y-4">
              <div className="flex items-center gap-2 px-1">
                <div className="h-3 w-1 bg-gradient-to-b from-teal-400 to-blue-500 rounded-full" />
                <h3 className="text-[9px] font-black text-slate-500 uppercase tracking-[0.2em]">02 Reachability</h3>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <div className="md:col-span-1"><GradientInput label="Residential Address" icon={MapPin} name="address" value={formData.address} onChange={handleChange} /></div>
                <GradientInput label="State" icon={Building2} name="state" list="states-list" value={formData.state} onChange={handleChange} required />
                <GradientInput label="City" icon={MapPin} name="city" list="cities-list" value={formData.city} onChange={handleChange} required />
                <GradientInput label="Pincode" icon={Hash} name="pincode" maxLength="6" value={formData.pincode} onChange={handleChange} />
              </div>
            </section>

            {/* Data Vault */}
            <section className="space-y-4">
              <div className="flex items-center gap-2 px-1">
                <div className="h-3 w-1 bg-gradient-to-b from-indigo-400 to-purple-500 rounded-full" />
                <h3 className="text-[9px] font-black text-slate-500 uppercase tracking-[0.2em]">03 Data Vault</h3>
              </div>
              <div className="bg-white/10 backdrop-blur-2xl p-3 rounded-xl border border-white/40 shadow-inner">
                <div className="flex gap-3 mb-3">
                  <div className="flex-1"><GradientSelect label="Attachment Category" options={DOC_TYPES} value={selectedDocType} onChange={(e) => setSelectedDocType(e.target.value)} /></div>
                  <div className="flex items-end">
                    <input type="file" ref={fileInputRef} onChange={handleFileSelection} className="hidden" id="f-up" />
                    <label htmlFor="f-up" className={`px-5 h-[30px] flex items-center justify-center gap-2 text-[9px] font-bold rounded-lg border transition-all uppercase cursor-pointer shadow-md ${selectedDocType ? 'bg-white border-blue-400 text-blue-600 hover:bg-blue-50' : 'bg-white/10 border-white/20 text-slate-400 pointer-events-none'}`}>
                      <Upload size={12} /> Attach
                    </label>
                  </div>
                </div>
                {uploadedFiles.length > 0 && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {uploadedFiles.map(file => (
                      <div key={file.id} className="flex items-center justify-between p-2 bg-white/40 backdrop-blur-md rounded-lg border border-white/60 text-[10px] font-bold text-slate-700 shadow-sm">
                        <div className="flex items-center gap-2"><FileIcon size={12} className="text-blue-500" /> {file.name}</div>
                        <button type="button" onClick={() => setUploadedFiles(prev => prev.filter(f => f.id !== file.id))} className="p-1 text-slate-400 hover:text-rose-500 transition-all"><Trash2 size={12} /></button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </section>

         
          </div>

          {/* Action Footer */}
          <div className="px-5 py-4 bg-white/20 backdrop-blur-3xl border-t border-white/40 flex items-center justify-between gap-4 relative z-30">
            <div className="hidden sm:flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <p className="text-[8px] font-black text-slate-500 uppercase tracking-[0.2em]">SYNC ACTIVE</p>
            </div>
            
            <div className="flex gap-2 w-full sm:w-auto">
              <button type="button" onClick={resetForm} className="flex-1 sm:flex-none px-5 py-2 text-[9px] font-black text-slate-600 bg-white/40 border border-white/60 rounded-xl hover:bg-white/60 transition-all uppercase tracking-widest flex items-center justify-center gap-2 backdrop-blur-md">
                <XCircle size={14} /> Wipe
              </button>
              <button type="submit" disabled={isSubmitting} className="flex-1 sm:flex-none px-8 py-2 text-[9px] font-black text-white bg-gradient-to-r from-blue-600 to-indigo-700 rounded-xl transition-all uppercase tracking-[0.15em] flex items-center justify-center gap-2 shadow-lg shadow-blue-500/20 active:scale-95 disabled:opacity-50">
                {isSubmitting ? <RefreshCw size={14} className="animate-spin" /> : <><Save size={14} /> Commit Record</>}
              </button>
            </div>
          </div>
        </form>

        <p className="mt-4 text-center text-[8px] font-black text-slate-400 uppercase tracking-[0.5em] opacity-80">
          HEALTHCORE OS v4.5.1 LIQUID_UI
        </p>
      </div>

      {/* Datalists */}
      <datalist id="states-list">{INDIAN_STATES.map(s => <option key={s} value={s} />)}</datalist>
      <datalist id="cities-list">{CITY_MAP[formData.state]?.map(c => <option key={c} value={c} />)}</datalist>
    </div>
  );
};

export default App;