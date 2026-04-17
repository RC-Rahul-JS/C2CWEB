import React, { useState, useEffect } from 'react';
import { 
  Activity, ShieldCheck, Save, XCircle, Search, 
  Layers, DollarSign, Percent, Settings2, 
  ToggleLeft, CheckCircle2, RefreshCw, Palette
} from 'lucide-react';

// --- Custom Reusable Components ---
const GradientInput = ({ label, icon: Icon, name, value, onChange, ...props }) => (
  <div className="space-y-1.5">
    <label className="block text-[9px] font-bold text-slate-600 uppercase tracking-wider px-1">
      {label} {props.required && <span className="text-rose-500">*</span>}
    </label>
    <div className="relative group">
      <div className="absolute inset-y-0 left-3 flex items-center text-slate-400 group-focus-within:text-blue-500 transition-colors pointer-events-none">
        <Icon size={13} strokeWidth={2.5} />
      </div>
      <input 
        name={name}
        value={value}
        onChange={onChange}
        {...props}
        className="w-full text-xs pl-9 pr-3 py-2 bg-white/50 border border-white/80 rounded-lg focus:outline-none focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all shadow-[inset_0_1px_2px_rgba(0,0,0,0.05)] font-medium text-slate-800"
      />
    </div>
  </div>
);

const GradientSelect = ({ label, icon: Icon, name, value, onChange, options = [] }) => (
  <div className="space-y-1.5">
    <label className="block text-[9px] font-bold text-slate-600 uppercase tracking-wider px-1">{label}</label>
    <div className="relative group">
      <div className="absolute inset-y-0 left-3 flex items-center text-slate-400 group-focus-within:text-blue-500 transition-colors pointer-events-none">
        <Icon size={13} strokeWidth={2.5} />
      </div>
      <select 
        name={name}
        value={value}
        onChange={onChange}
        className="w-full text-xs pl-9 pr-3 py-2 bg-white/50 border border-white/80 rounded-lg appearance-none focus:outline-none focus:bg-white focus:border-blue-500 transition-all font-medium text-slate-800"
      >
        {options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
      </select>
    </div>
  </div>
);

const PanelMasterWorking = () => {
  // --- State Management ---
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    panelName: '',
    panelType: 'General',
    priceList: 'Not Applicable',
    regCharges: '',
    discountType: 'Not Applicable',
    isDefault: true,
    allowSMS: false,
    opdDiscount: '0',
    labDiscount: '0',
    pharmacyDiscount: '0',
    pharmacyProfit: '0',
    opdBilling: '0',
    ipdDiscount: '0',
    isActive: 'Yes',
    ipdBillSeries: 'Select--',
    mandatoryAuth: false,
    colorCode: '#4f46e5'
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API Call
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 1500);
  };

  const resetForm = () => {
    setSubmitted(false);
    setFormData({
      panelName: '',
      panelType: 'General',
      priceList: 'Not Applicable',
      regCharges: '',
      discountType: 'Not Applicable',
      isDefault: false,
      allowSMS: false,
      opdDiscount: '0',
      labDiscount: '0',
      pharmacyDiscount: '0',
      pharmacyProfit: '0',
      opdBilling: '0',
      ipdDiscount: '0',
      isActive: 'Yes',
      ipdBillSeries: 'Select--',
      mandatoryAuth: false,
      colorCode: '#4f46e5'
    });
  };

  // --- Success State View ---
  if (submitted) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="max-w-sm w-full bg-white/70 backdrop-blur-2xl rounded-2xl shadow-2xl p-8 text-center border border-white/80 animate-in zoom-in-95 duration-500">
          <div className="w-16 h-16 bg-gradient-to-tr from-blue-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl shadow-blue-500/20">
            <CheckCircle2 className="w-9 h-9 text-white" />
          </div>
          <h2 className="text-xl font-bold text-slate-900 mb-2 tracking-tight">Panel Committed</h2>
          <p className="text-slate-500 text-[10px] mb-8 uppercase font-bold tracking-widest">Master record synchronized successfully.</p>
          <button onClick={resetForm} className="w-full py-3 bg-slate-900 hover:bg-black text-white rounded-xl font-bold transition-all text-[10px] uppercase tracking-widest">
            Create Another Panel
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 py-6 px-4 font-sans antialiased relative overflow-hidden">
      
      {/* Background Blobs */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-5%] left-[-5%] w-[45%] h-[45%] bg-gradient-to-br from-blue-400/20 to-indigo-500/20 blur-[100px] rounded-full animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-5%] w-[45%] h-[45%] bg-gradient-to-tr from-emerald-400/20 to-teal-500/20 blur-[120px] rounded-full animate-pulse delay-700" />
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
        
        {/* Header */}
        <div className="bg-white/30 backdrop-blur-3xl rounded-t-2xl border-x border-t border-white/60 px-5 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-slate-800 to-slate-950 text-white rounded-xl flex items-center justify-center shadow-lg border border-white/30">
              <Layers size={20} />
            </div>
            <div>
              <h1 className="text-sm font-black bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-700 uppercase tracking-tight leading-none">
                Panel / TPA Master Terminal
              </h1>
              <span className="text-[9px] text-slate-500 font-bold uppercase flex items-center gap-1 mt-0.5">
                <ShieldCheck size={10} className="text-emerald-500" /> System Live: Node-774
              </span>
            </div>
          </div>
        </div>

        {/* Main Form */}
        <form onSubmit={handleSubmit} className="bg-white/20 backdrop-blur-3xl border border-white/50 shadow-2xl rounded-b-2xl overflow-hidden">
          <div className="p-6 space-y-8">
            
            {/* 01 Identity Panel */}
            <section className="space-y-4">
              <div className="flex items-center gap-2 px-1">
                <div className="h-3 w-1 bg-gradient-to-b from-blue-500 to-indigo-600 rounded-full" />
                <h3 className="text-[9px] font-black text-slate-500 uppercase tracking-[0.2em]">01 Identity & Auth</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="md:col-span-2">
                  <GradientInput label="Organization / TPA Name" icon={Activity} name="panelName" value={formData.panelName} onChange={handleChange} placeholder="Enter Name..." required />
                </div>
                <div className="flex items-end pb-1 gap-6 px-2">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" name="isDefault" checked={formData.isDefault} onChange={handleChange} className="w-4 h-4 rounded border-slate-300 text-blue-600" />
                      <span className="text-[10px] font-black text-slate-600 uppercase tracking-tighter">Default</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" name="allowSMS" checked={formData.allowSMS} onChange={handleChange} className="w-4 h-4 rounded border-slate-300 text-blue-600" />
                      <span className="text-[10px] font-black text-slate-600 uppercase tracking-tighter">SMS Alert</span>
                    </label>
                </div>
                <GradientInput label="Marker Color" icon={Palette} type="color" name="colorCode" value={formData.colorCode} onChange={handleChange} />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <GradientSelect label="Panel Type" icon={Settings2} name="panelType" value={formData.panelType} onChange={handleChange} options={['General', 'Corporate', 'Insurance']} />
                <GradientInput label="Reg. Charges" icon={DollarSign} name="regCharges" value={formData.regCharges} onChange={handleChange} placeholder="0.00" />
                <GradientSelect label="Price List" icon={Layers} name="priceList" value={formData.priceList} onChange={handleChange} options={['Not Applicable', 'Standard 2026', 'Corporate-A']} />
                <GradientSelect label="Disc Type" icon={Percent} name="discountType" value={formData.discountType} onChange={handleChange} options={['Not Applicable', 'Percentage', 'Fixed']} />
              </div>
            </section>

            {/* 02 Revenue Grid Col 4 */}
            <section className="space-y-4">
              <div className="flex items-center gap-2 px-1">
                <div className="h-3 w-1 bg-gradient-to-b from-emerald-400 to-teal-500 rounded-full" />
                <h3 className="text-[9px] font-black text-slate-500 uppercase tracking-[0.2em]">02 Revenue & Percentage Matrix</h3>
              </div>

              <div className="bg-white/10 backdrop-blur-md p-5 rounded-2xl border border-white/40 shadow-inner grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-6">
                <GradientInput label="OPD Discount %" icon={Percent} name="opdDiscount" value={formData.opdDiscount} onChange={handleChange} />
                <GradientInput label="Lab Discount %" icon={Percent} name="labDiscount" value={formData.labDiscount} onChange={handleChange} />
                <GradientInput label="Pharmacy Disc %" icon={Percent} name="pharmacyDiscount" value={formData.pharmacyDiscount} onChange={handleChange} />
                <GradientInput label="Pharm. Profit %" icon={Percent} name="pharmacyProfit" value={formData.pharmacyProfit} onChange={handleChange} />
                
                <GradientInput label="OPD Billing %" icon={Percent} name="opdBilling" value={formData.opdBilling} onChange={handleChange} />
                <GradientInput label="IPD Discount %" icon={Percent} name="ipdDiscount" value={formData.ipdDiscount} onChange={handleChange} />
                <div className="md:col-span-2">
                   <GradientSelect label="IPD Bill Series" icon={Layers} name="ipdBillSeries" value={formData.ipdBillSeries} onChange={handleChange} options={['Select--', 'Series-SR', 'Series-GEN']} />
                </div>
              </div>
            </section>

            {/* 03 Operational Config */}
            <section className="space-y-4 pb-4">
              <div className="flex items-center gap-2 px-1">
                <div className="h-3 w-1 bg-gradient-to-b from-purple-400 to-pink-500 rounded-full" />
                <h3 className="text-[9px] font-black text-slate-500 uppercase tracking-[0.2em]">03 Operational Constraints</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <GradientSelect label="Is Active" icon={ToggleLeft} name="isActive" value={formData.isActive} onChange={handleChange} options={['Yes', 'No']} />
                <div className="md:col-span-2 flex items-end pb-1">
                    <label className="flex items-center gap-3 cursor-pointer p-2.5 bg-rose-500/5 border border-rose-500/10 rounded-xl w-full hover:bg-rose-500/10 transition-all">
                      <input type="checkbox" name="mandatoryAuth" checked={formData.mandatoryAuth} onChange={handleChange} className="w-4 h-4 rounded border-rose-300 text-rose-600" />
                      <span className="text-[10px] font-black text-rose-700 uppercase tracking-tight">Mandatory Auth Number for every service</span>
                    </label>
                </div>
              </div>
            </section>
          </div>

          {/* Action Footer */}
          <div className="px-6 py-5 bg-white/20 backdrop-blur-3xl border-t border-white/40 flex items-center justify-between">
            <button type="button" className="flex items-center gap-2 text-[10px] font-black text-slate-500 hover:text-slate-800 transition-all uppercase tracking-[0.2em]">
              <Search size={14} /> Global Search
            </button>
            
            <div className="flex gap-3">
              <button type="button" onClick={resetForm} className="px-6 py-2.5 text-[9px] font-black text-slate-600 bg-white/40 border border-white/60 rounded-xl hover:bg-white/60 transition-all uppercase tracking-widest flex items-center gap-2">
                <XCircle size={14} /> Clear
              </button>
              <button type="submit" disabled={isSubmitting} className="px-10 py-2.5 text-[9px] font-black text-white bg-slate-900 rounded-xl transition-all uppercase tracking-[0.15em] flex items-center gap-2 shadow-xl shadow-slate-200 active:scale-95 disabled:opacity-50 min-w-[160px] justify-center">
                {isSubmitting ? <RefreshCw size={14} className="animate-spin" /> : <><Save size={14} /> Commit Master</>}
              </button>
            </div>
          </div>
        </form>

        <p className="mt-6 text-center text-[8px] font-black text-slate-400 uppercase tracking-[0.5em] opacity-80">
          HEALTHCORE OS v4.5.1 // LIQUID_UI // PANEL_MASTER
        </p>
      </div>
    </div>
  );
};

export default PanelMasterWorking;