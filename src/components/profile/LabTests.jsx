import React, { useState } from 'react';
import { 
  Search, ShoppingCart, ArrowLeft, Activity, 
  CheckCircle2, Plus, Minus, Trash2, Calendar, 
  User, MapPin, Home, Star, ChevronRight, 
  FlaskConical, HeartPulse, Droplets, Zap, Clock, ShieldCheck, 
  Scan, Pill, Bone, Brain, Stethoscope, Microscope, X
} from 'lucide-react';

// --- Expanded Data (Unchanged) ---

const PACKAGES = [
  {
    id: 'p1',
    title: 'Full Body Power',
    price: 999,
    originalPrice: 1999,
    rating: 4.8,
    reviews: 120,
    tags: ['Popular'],
    image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=800&q=80',
    desc: 'Includes Liver, Kidney, Lipid, Thyroid & more. Best for annual screening.',
    testsCount: 65,
    color: 'bg-blue-500'
  },
  {
    id: 'p2',
    title: 'Diabetes Screening',
    price: 499,
    originalPrice: 800,
    rating: 4.9,
    reviews: 85,
    tags: ['Diabetic Care'],
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&q=80',
    desc: 'HbA1c, Fasting Blood Sugar & Urine Glucose monitoring.',
    testsCount: 3,
    color: 'bg-emerald-500'
  },
  {
    id: 'p3',
    title: 'Senior Citizen Care',
    price: 2499,
    originalPrice: 4500,
    rating: 4.7,
    reviews: 210,
    tags: ['Senior'],
    image: 'https://images.unsplash.com/photo-1581595220892-b0739db3ba8c?w=800&q=80',
    desc: 'Comprehensive checkup for cardiac, bone health & arthritis.',
    testsCount: 85,
    color: 'bg-indigo-500'
  },
  {
    id: 'p4',
    title: 'Women Wellness',
    price: 1899,
    originalPrice: 3000,
    rating: 4.9,
    reviews: 150,
    tags: ['Women'],
    image: 'https://images.unsplash.com/photo-1631815589968-fdb09a223b1e?w=800&q=80',
    desc: 'PCOD, Thyroid, Iron Deficiency & Hormone check.',
    testsCount: 55,
    color: 'bg-pink-500'
  }
];

const CATEGORIES = [
  { id: 'all', name: 'All Tests', icon: <Activity size={18} /> },
  { id: 'Blood', name: 'Blood', icon: <Droplets size={18} /> },
  { id: 'Heart', name: 'Heart', icon: <HeartPulse size={18} /> },
  { id: 'Thyroid', name: 'Thyroid', icon: <Activity size={18} /> },
  { id: 'Diabetes', name: 'Diabetes', icon: <Pill size={18} /> },
  { id: 'Kidney', name: 'Kidney', icon: <FlaskConical size={18} /> },
  { id: 'Bone', name: 'Bone', icon: <Bone size={18} /> },
  { id: 'Scan', name: 'MRI/CT', icon: <Scan size={18} /> },
  { id: 'Vitamin', name: 'Vitamin', icon: <Zap size={18} /> },
];

const INDIVIDUAL_TESTS = [
  { id: 't1', title: 'Complete Blood Count (CBC)', price: 299, category: 'Blood', time: '24h', desc: 'Checks overall health, anemia, infection.' },
  { id: 't2', title: 'Thyroid Profile (Total)', price: 599, category: 'Thyroid', time: '24h', desc: 'T3, T4, TSH hormone levels.' },
  { id: 't3', title: 'HbA1c (Sugar)', price: 450, category: 'Diabetes', time: '12h', desc: '3-month average blood sugar.' },
  { id: 't4', title: 'Lipid Profile', price: 650, category: 'Heart', time: '24h', desc: 'Cholesterol & Triglycerides.' },
  { id: 't5', title: 'Vitamin D Total', price: 899, category: 'Vitamin', time: '36h', desc: 'Bone health & immunity.' },
  { id: 't6', title: 'Liver Function Test', price: 550, category: 'Liver', time: '24h', desc: 'SGOT, SGPT, Bilirubin.' },
  { id: 't7', title: 'Kidney Function Test', price: 800, category: 'Kidney', time: '24h', desc: 'Creatinine, Urea, Uric Acid.' },
  { id: 't8', title: 'Vitamin B12', price: 900, category: 'Vitamin', time: '24h', desc: 'Nerve health & energy levels.' },
  { id: 't9', title: 'Iron Studies', price: 750, category: 'Blood', time: '24h', desc: 'Iron deficiency check.' },
  { id: 't10', title: 'MRI Brain (Plain)', price: 4500, category: 'Scan', time: '48h', desc: 'Detailed imaging of brain tissue.' },
  { id: 't11', title: 'Arthritis Profile', price: 1200, category: 'Bone', time: '24h', desc: 'RA Factor, CRP, Uric Acid.' },
  { id: 't12', title: 'Allergy Panel', price: 2500, category: 'Blood', time: '72h', desc: 'Screening for food & dust allergies.' },
];

const TIME_SLOTS = ['07:00 AM', '08:00 AM', '09:00 AM', '10:00 AM', '02:00 PM', '04:00 PM'];

// --- Main Component ---

export default function MedicalApp() {
  const [view, setView] = useState('home'); 
  const [activeTab, setActiveTab] = useState('all');
  const [selectedItem, setSelectedItem] = useState(null);
  const [cart, setCart] = useState([]);
  const [details, setDetails] = useState({ name: '', phone: '', address: '', slot: '' });
  const [searchTerm, setSearchTerm] = useState('');

  // --- Logic ---
  const toggleCart = (e, item) => {
    e?.stopPropagation();
    const exists = cart.find(c => c.id === item.id);
    if (exists) {
      setCart(cart.filter(c => c.id !== item.id));
    } else {
      setCart([...cart, item]);
    }
  };

  const cartTotal = cart.reduce((sum, item) => sum + item.price, 0);

  const filteredTests = INDIVIDUAL_TESTS.filter(test => {
    const matchesCategory = activeTab === 'all' || test.category === activeTab;
    const matchesSearch = test.title.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // --- Components ---

  // 1. Success Screen
  if (view === 'success') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50 flex flex-col items-center justify-center p-6 text-center">
        <div className="w-28 h-28 bg-white/50 backdrop-blur-xl rounded-full flex items-center justify-center shadow-xl mb-6 animate-bounce border border-white">
          <CheckCircle2 size={56} className="text-blue-500" />
        </div>
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Booking Confirmed!</h2>
        <p className="text-gray-500 mb-8 max-w-md text-lg">
          Thank you, {details.name}. Your sample collection is scheduled for <span className="text-blue-600 font-bold">{details.slot || 'Tomorrow morning'}</span>.
        </p>
        <button 
          onClick={() => { setView('home'); setCart([]); setDetails({ name: '', phone: '', address: '', slot: '' }); }}
          className="bg-blue-600 text-white px-10 py-4 rounded-2xl font-bold hover:bg-blue-700 transition shadow-lg shadow-blue-200"
        >
          Back to Home
        </button>
      </div>
    );
  }

  // 2. Booking Screen
  if (view === 'booking') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50 font-sans pb-24">
        <Header title="Patient Details" onBack={() => setView('cart')} />
        
        <div className="max-w-4xl mx-auto p-4 md:p-8 pt-24 grid md:grid-cols-2 gap-8">
          
          <div className="space-y-6">
             <div className="bg-white/70 backdrop-blur-lg p-8 rounded-3xl shadow-sm border border-white">
                <h3 className="font-bold text-gray-800 mb-6 flex items-center gap-2 text-lg">
                  <User className="text-blue-500"/> Patient Information
                </h3>
                <div className="space-y-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-500 uppercase ml-1">Full Name</label>
                    <input 
                      type="text" placeholder="e.g. Rahul Sharma" 
                      className="w-full bg-white border-0 ring-1 ring-gray-100 rounded-2xl p-4 focus:ring-2 focus:ring-blue-500 transition shadow-sm"
                      value={details.name} onChange={e => setDetails({...details, name: e.target.value})}
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-500 uppercase ml-1">Phone Number</label>
                    <input 
                      type="tel" placeholder="+91 98765 43210" 
                      className="w-full bg-white border-0 ring-1 ring-gray-100 rounded-2xl p-4 focus:ring-2 focus:ring-blue-500 transition shadow-sm"
                      value={details.phone} onChange={e => setDetails({...details, phone: e.target.value})}
                    />
                  </div>
                </div>
             </div>

             <div className="bg-white/70 backdrop-blur-lg p-8 rounded-3xl shadow-sm border border-white">
                <h3 className="font-bold text-gray-800 mb-6 flex items-center gap-2 text-lg">
                  <MapPin className="text-blue-500"/> Address
                </h3>
                <textarea 
                   rows="3" placeholder="House No, Street, Landmark..."
                   className="w-full bg-white border-0 ring-1 ring-gray-100 rounded-2xl p-4 focus:ring-2 focus:ring-blue-500 transition shadow-sm resize-none"
                   value={details.address} onChange={e => setDetails({...details, address: e.target.value})}
                ></textarea>
             </div>
          </div>

          <div className="space-y-6">
             <div className="bg-white/70 backdrop-blur-lg p-8 rounded-3xl shadow-sm border border-white h-fit">
                <h3 className="font-bold text-gray-800 mb-6 flex items-center gap-2 text-lg">
                  <Calendar className="text-blue-500"/> Select Slot
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {TIME_SLOTS.map(slot => (
                    <button 
                      key={slot}
                      onClick={() => setDetails({...details, slot: slot})}
                      className={`py-3 px-2 text-sm font-bold rounded-xl transition shadow-sm ${
                        details.slot === slot 
                          ? 'bg-blue-600 text-white shadow-blue-300' 
                          : 'bg-white text-gray-600 hover:bg-blue-50'
                      }`}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
             </div>

             <div className="bg-blue-900 text-white p-8 rounded-3xl shadow-xl shadow-blue-200">
               <div className="flex justify-between items-center mb-6">
                  <span className="text-blue-200">Total Amount</span>
                  <span className="text-3xl font-bold">₹{cartTotal}</span>
               </div>
               <button 
                  onClick={() => setView('success')}
                  className="w-full bg-white text-blue-900 py-4 rounded-xl font-bold hover:bg-blue-50 transition"
                >
                  Confirm Booking
               </button>
             </div>
          </div>
        </div>
      </div>
    );
  }

  // 3. Cart View - REDESIGNED FOR DESKTOP
  if (view === 'cart') {
    return (
      <div className="min-h-screen bg-gray-50 font-sans pb-32">
        {/* Simple Header for Cart */}
        <div className="bg-white border-b border-gray-100 sticky top-0 z-50">
           <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <button onClick={() => setView('home')} className="p-2 -ml-2 hover:bg-gray-100 rounded-full transition text-gray-500">
                   <ArrowLeft size={22} />
                </button>
                <h2 className="text-xl font-bold text-gray-900">Cart</h2>
              </div>
              <span className="text-sm font-medium text-gray-400">{cart.length} Items</span>
           </div>
        </div>
        
        <div className="max-w-6xl mx-auto px-6 pt-10">
          {cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center pt-24 pb-20">
              <div className="w-32 h-32 bg-white rounded-full flex items-center justify-center mb-6 shadow-sm border border-gray-100">
                <ShoppingCart size={48} className="text-gray-300"/>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Your cart is empty</h3>
              <p className="text-gray-500 mb-8">Looks like you haven't added any tests yet.</p>
              <button onClick={() => setView('home')} className="bg-gray-900 text-white px-8 py-3.5 rounded-xl font-bold hover:bg-gray-800 transition shadow-lg">
                Start Browsing
              </button>
            </div>
          ) : (
            <div className="flex flex-col lg:flex-row gap-8 items-start">
              
              {/* Left Column: Cart Items */}
              <div className="flex-1 w-full space-y-4">
                <div className="flex items-center justify-between pb-2 px-2">
                   <h3 className="font-bold text-lg text-gray-800">Selected Tests</h3>
                </div>

                {cart.map(item => (
                  <div key={item.id} className="group bg-white p-5 rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 flex items-center justify-between">
                    
                    <div className="flex items-center gap-5">
                      {/* Icon Box */}
                      <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center shrink-0 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                        <Activity size={24}/>
                      </div>
                      
                      {/* Text Details */}
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-blue-500 bg-blue-50 px-2 py-0.5 rounded-md">
                            {item.category}
                          </span>
                        </div>
                        <h4 className="font-bold text-gray-900 text-lg leading-tight">{item.title}</h4>
                        <p className="text-sm text-gray-400 mt-1">Home Sample Collection</p>
                      </div>
                    </div>

                    {/* Right Side: Price & Action */}
                    <div className="flex items-center gap-8 pl-4 border-l border-gray-50 md:border-none">
                      <div className="text-right">
                        <span className="block font-bold text-xl text-gray-900">₹{item.price}</span>
                        {item.originalPrice && (
                          <span className="block text-xs text-gray-400 line-through">₹{item.originalPrice}</span>
                        )}
                      </div>
                      
                      <button 
                        onClick={() => toggleCart(null, item)} 
                        className="w-10 h-10 rounded-full bg-gray-50 text-gray-400 flex items-center justify-center hover:bg-red-50 hover:text-red-500 transition-colors"
                        title="Remove item"
                      >
                        <Trash2 size={18}/>
                      </button>
                    </div>

                  </div>
                ))}
              </div>

              {/* Right Column: Order Summary */}
              <div className="w-full lg:w-[380px] shrink-0">
                <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100 sticky top-28">
                   <h3 className="font-bold text-xl text-gray-900 mb-6">Order Summary</h3>
                   
                   <div className="space-y-4">
                     <div className="flex justify-between text-gray-500 text-sm font-medium">
                       <span>Subtotal ({cart.length} items)</span>
                       <span className="text-gray-900">₹{cartTotal}</span>
                     </div>
                     <div className="flex justify-between text-gray-500 text-sm font-medium">
                       <span>Consultation Fee</span>
                       <span className="text-gray-900">₹0</span>
                     </div>
                     <div className="flex justify-between text-gray-500 text-sm font-medium">
                       <span>Home Collection Charges</span>
                       <span className="text-green-600 font-bold bg-green-50 px-2 py-0.5 rounded text-xs">FREE</span>
                     </div>
                   </div>

                   {/* Dashed Separator */}
                   <div className="my-6 border-t border-dashed border-gray-200"></div>

                   <div className="flex justify-between items-end mb-8">
                     <span className="font-bold text-gray-800">Total Amount</span>
                     <span className="font-extrabold text-3xl text-blue-600">₹{cartTotal}</span>
                   </div>

                   <div className="space-y-3">
                     <button 
                       onClick={() => setView('booking')}
                       className="w-full bg-gray-900 text-white py-4 rounded-xl font-bold hover:bg-black transition shadow-lg flex items-center justify-center gap-2"
                     >
                       Proceed to Checkout <ChevronRight size={18} />
                     </button>
                     <p className="text-xs text-center text-gray-400 mt-4 flex items-center justify-center gap-1">
                       <ShieldCheck size={12}/> Safe & Secure Payment
                     </p>
                   </div>
                </div>
              </div>

            </div>
          )}
        </div>
      </div>
    );
  }

  // 4. Details View
  if (view === 'details' && selectedItem) {
    const inCart = cart.find(c => c.id === selectedItem.id);
    return (
      <div className="fixed inset-0 z-50 bg-gradient-to-br from-blue-50 via-white to-cyan-50 flex flex-col overflow-y-auto animate-fade-in">
        {/* Full Width Image Banner */}
        <div className="relative h-80 w-full">
          <img src={selectedItem.image || 'https://images.unsplash.com/photo-1579154204601-01588f351e67?w=1200&q=80'} className="w-full h-full object-cover" alt=""/>
          <div className="absolute inset-0 bg-gradient-to-t from-blue-900/60 to-transparent"></div>
          
          <div className="absolute top-0 left-0 w-full p-6 flex justify-between items-start">
             <button onClick={() => setView('home')} className="p-3 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-white/30 transition border border-white/20">
               <ArrowLeft size={24}/>
             </button>
          </div>

          <div className="absolute bottom-0 left-0 w-full p-8 text-white">
             <span className="bg-white/20 backdrop-blur-md px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-wider border border-white/20">
               {selectedItem.category || 'Package'}
             </span>
             <h1 className="text-4xl font-bold mt-3 shadow-sm">{selectedItem.title}</h1>
          </div>
        </div>

        <div className="max-w-5xl mx-auto w-full p-6 md:p-8 -mt-8 relative z-10 grid md:grid-cols-3 gap-8">
           {/* Left Content */}
           <div className="md:col-span-2 space-y-6">
              <div className="bg-white/80 backdrop-blur-xl p-8 rounded-[2rem] shadow-sm border border-white">
                 <div className="flex items-center justify-between mb-6">
                    <h3 className="font-bold text-gray-900 text-xl">About Test</h3>
                    {selectedItem.rating && (
                      <div className="flex items-center gap-1 bg-yellow-50 px-3 py-1.5 rounded-xl text-sm font-bold text-yellow-600">
                        <Star size={16} fill="currentColor"/> {selectedItem.rating}
                      </div>
                    )}
                 </div>
                 <p className="text-gray-600 leading-relaxed text-lg">
                   {selectedItem.desc || 'Comprehensive diagnostic test to evaluate health status. Includes safe home sample collection.'}
                 </p>
              </div>

              <div className="bg-white/80 backdrop-blur-xl p-8 rounded-[2rem] shadow-sm border border-white">
                 <h3 className="font-bold text-gray-900 text-xl mb-6">Process Flow</h3>
                 <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {['Book', 'Collection', 'Processing', 'Report'].map((step, i) => (
                      <div key={i} className="text-center p-4 bg-blue-50 rounded-2xl">
                        <div className="w-8 h-8 bg-blue-200 rounded-full flex items-center justify-center text-blue-700 font-bold mx-auto mb-2 text-sm">{i+1}</div>
                        <span className="text-sm font-bold text-gray-700">{step}</span>
                      </div>
                    ))}
                 </div>
              </div>
           </div>

           {/* Right Sticky Pricing Card */}
           <div className="md:col-span-1">
              <div className="bg-white p-8 rounded-[2rem] shadow-xl border border-gray-100 sticky top-6">
                 <p className="text-gray-400 font-bold uppercase text-xs mb-1">Total Cost</p>
                 <div className="flex items-baseline gap-3 mb-6">
                   <span className="text-4xl font-extrabold text-blue-600">₹{selectedItem.price}</span>
                   {selectedItem.originalPrice && <span className="text-lg text-gray-400 line-through">₹{selectedItem.originalPrice}</span>}
                 </div>
                 
                 <div className="space-y-3 mb-8">
                   <div className="flex items-center gap-3 text-sm text-gray-600 bg-gray-50 p-3 rounded-xl">
                     <Clock className="text-blue-500"/> {selectedItem.time || '24 Hours'} Report
                   </div>
                   <div className="flex items-center gap-3 text-sm text-gray-600 bg-gray-50 p-3 rounded-xl">
                     <Home className="text-blue-500"/> Home Visit
                   </div>
                 </div>

                 <button 
                   onClick={(e) => { toggleCart(e, selectedItem); if(!inCart) setView('home'); }}
                   className={`w-full py-4 rounded-xl font-bold shadow-lg transition flex justify-center items-center gap-2 text-lg ${
                     inCart 
                     ? 'bg-red-50 text-red-500 border border-red-100 hover:bg-red-100' 
                     : 'bg-blue-600 text-white hover:bg-blue-700 shadow-blue-200'
                   }`}
                 >
                   {inCart ? 'Remove' : 'Add to Cart'}
                 </button>
              </div>
           </div>
        </div>
      </div>
    );
  }

  // 5. Home View (Desktop Wide)
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50 font-sans pb-24">
      {/* Navbar */}
      <nav className="sticky top-0 z-40 bg-white/80 backdrop-blur-lg border-b border-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 md:px-8 h-20 flex items-center justify-between">
          {/* <div className="flex items-center gap-2">
            <div className="bg-gradient-to-tr from-blue-500 to-cyan-400 p-2 rounded-xl text-white shadow-lg shadow-blue-200">
              <Activity size={24} />
            </div>
            <h1 className="text-2xl font-bold text-gray-800 tracking-tight">Medi<span className="text-blue-500">Care+</span></h1>
          </div> */}
          
          {/* Desktop Search */}
          <div className="hidden md:flex flex-1 max-w-lg mx-8 relative">
             <Search className="absolute left-4 top-3.5 text-gray-400" size={20}/>
             <input 
               type="text" 
               placeholder="Search for tests (e.g. MRI, Thyroid)..." 
               value={searchTerm}
               onChange={(e) => setSearchTerm(e.target.value)}
               className="w-full bg-gray-100/50 border-0 rounded-2xl pl-12 pr-4 py-3 focus:bg-white focus:ring-2 focus:ring-blue-100 transition outline-none"
             />
          </div>

          <div className="flex items-center gap-6">
            <button 
              onClick={() => setView('cart')}
              className="relative p-3 bg-white border border-gray-100 rounded-full hover:bg-gray-50 transition shadow-sm group"
            >
              <ShoppingCart size={22} className="text-gray-600 group-hover:text-blue-600"/>
              {cart.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-bold border-2 border-white">
                  {cart.length}
                </span>
              )}
            </button>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 md:px-8 pt-8 space-y-12">
        
        {/* Mobile Search */}
        <div className="md:hidden relative">
          <Search className="absolute left-4 top-3.5 text-gray-400" size={20}/>
          <input 
            type="text" 
            placeholder="Search tests..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-white border border-gray-100 rounded-2xl pl-12 pr-4 py-3 shadow-sm focus:outline-none focus:border-blue-400"
          />
        </div>

        {/* Packages Grid - Modified for Horizontal Scroll on Mobile */}
        {!searchTerm && (
          <section>
            <div className="flex justify-between items-end mb-6">
               <h2 className="text-2xl font-bold text-gray-800">Popular Packages</h2>
               <div className="flex items-center gap-2">
                 {/* Visual cue for horizontal scroll on mobile */}
                 <span className="md:hidden text-xs font-bold text-gray-400 animate-pulse">Swipe &rarr;</span>
                 <button className="text-blue-600 font-bold hover:bg-blue-50 px-3 py-1 rounded-lg transition">View All</button>
               </div>
            </div>
            
            <div className="flex md:grid md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 overflow-x-auto md:overflow-visible pb-6 -mx-4 px-4 md:mx-0 md:px-0 snap-x snap-mandatory hide-scrollbar">
              {PACKAGES.map(pkg => (
                <div 
                  key={pkg.id} 
                  onClick={() => { setSelectedItem(pkg); setView('details'); }}
                  className="min-w-[85%] md:min-w-0 snap-center md:snap-align-none bg-white rounded-[2rem] p-4 shadow-sm hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 border border-white cursor-pointer group"
                >
                  <div className="h-40 rounded-[1.5rem] overflow-hidden relative mb-4">
                    <img src={pkg.image} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt=""/>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    <span className="absolute bottom-3 left-4 text-white font-bold text-lg">{pkg.title}</span>
                  </div>
                  
                  <div className="px-2 pb-2">
                    <p className="text-xs text-gray-500 mb-4 line-clamp-2">{pkg.desc}</p>
                    <div className="flex justify-between items-center">
                      <div>
                          <p className="text-xs text-gray-400 line-through">₹{pkg.originalPrice}</p>
                          <p className="text-xl font-bold text-blue-600">₹{pkg.price}</p>
                      </div>
                      <button 
                        onClick={(e) => toggleCart(e, pkg)}
                        className={`w-10 h-10 rounded-full flex items-center justify-center transition shadow-lg ${
                          cart.find(c => c.id === pkg.id) 
                            ? 'bg-green-100 text-green-600' 
                            : 'bg-gray-900 text-white group-hover:bg-blue-600'
                        }`}
                      >
                        {cart.find(c => c.id === pkg.id) ? <CheckCircle2 size={20}/> : <Plus size={20}/>}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Categories - Modified for Horizontal Scroll on Mobile */}
        {!searchTerm && (
          <section>
             <div className="flex justify-between items-end mb-6">
               <h2 className="text-2xl font-bold text-gray-800">Browse by Category</h2>
             </div>
             <div className="flex md:flex-wrap gap-3 overflow-x-auto md:overflow-visible pb-2 -mx-4 px-4 md:mx-0 md:px-0 hide-scrollbar">
               {CATEGORIES.map(cat => (
                 <button 
                  key={cat.id}
                  onClick={() => setActiveTab(cat.id)}
                  className={`flex items-center flex-shrink-0 gap-2 px-6 py-3 rounded-2xl border transition-all whitespace-nowrap ${
                    activeTab === cat.id 
                      ? 'bg-blue-600 text-white border-blue-600 shadow-lg shadow-blue-200' 
                      : 'bg-white text-gray-600 border-white hover:border-blue-100 shadow-sm hover:shadow-md'
                  }`}
                 >
                   {cat.icon} <span className="font-bold text-sm">{cat.name}</span>
                 </button>
               ))}
             </div>
          </section>
        )}

        {/* Tests Grid */}
        <section className="pb-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Diagnostic Tests</h2>
          {filteredTests.length === 0 ? (
             <div className="text-center py-20 bg-white/50 rounded-3xl border border-dashed border-gray-300 text-gray-400">
               No tests found matching your search.
             </div>
          ) : (
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
               {filteredTests.map(test => {
                 const inCart = cart.find(c => c.id === test.id);
                 return (
                   <div 
                     key={test.id}
                     onClick={() => { setSelectedItem(test); setView('details'); }}
                     className={`bg-white/80 backdrop-blur-md p-6 rounded-[2rem] border transition-all cursor-pointer group flex flex-col h-full ${
                       inCart ? 'border-blue-300 shadow-md ring-1 ring-blue-100' : 'border-white shadow-sm hover:shadow-xl hover:-translate-y-1'
                     }`}
                   >
                     <div className="flex justify-between items-start mb-4">
                       <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-colors ${
                         inCart ? 'bg-blue-100 text-blue-600' : 'bg-blue-50 text-blue-400 group-hover:bg-blue-600 group-hover:text-white'
                       }`}>
                          {test.category === 'Blood' ? <Droplets size={22}/> : 
                           test.category === 'Heart' ? <HeartPulse size={22}/> :
                           test.category === 'Scan' ? <Scan size={22}/> : 
                           test.category === 'Bone' ? <Bone size={22}/> :
                           test.category === 'Brain' ? <Brain size={22}/> :
                           test.category === 'Vitamin' ? <Zap size={22}/> : <Activity size={22}/>}
                       </div>
                       {inCart && <CheckCircle2 className="text-blue-500" size={24}/>}
                     </div>
                     
                     <div className="flex-1">
                       <span className="text-[10px] font-bold uppercase text-gray-400 tracking-wider">{test.category}</span>
                       <h3 className="font-bold text-gray-800 text-lg leading-tight mb-2 mt-1">{test.title}</h3>
                       <p className="text-xs text-gray-500 line-clamp-2">{test.desc}</p>
                     </div>
                     
                     <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-100">
                       <span className="font-bold text-xl text-gray-900">₹{test.price}</span>
                       <button 
                          onClick={(e) => toggleCart(e, test)}
                          className={`text-xs font-bold px-4 py-2 rounded-xl transition ${
                            inCart 
                              ? 'bg-red-50 text-red-500 hover:bg-red-100' 
                              : 'bg-blue-50 text-blue-600 hover:bg-blue-100'
                          }`}
                       >
                          {inCart ? 'Remove' : 'Add +'}
                       </button>
                     </div>
                   </div>
                 );
               })}
             </div>
          )}
        </section>
      </div>

      {/* Helper Component for Mobile Header */}
      <style>{`
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
}

const Header = ({ title, onBack }) => (
  <div className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-white shadow-sm px-4 py-4 flex items-center">
    <button onClick={onBack} className="p-2 -ml-2 rounded-full hover:bg-gray-100 transition text-gray-600">
      <ArrowLeft size={20}/>
    </button>
    <h2 className="ml-2 text-lg font-bold text-gray-800">{title}</h2>
  </div>
);