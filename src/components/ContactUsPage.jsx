import React from 'react';
import { 
  ArrowLeft, 
  Phone, 
  Mail, 
  Building, 
  ArrowRight, 
  MessageSquare, 
  Send, 
  MapPin, 
  Clock, 
  ShieldCheck, 
  Users, 
  Sparkles,
  CheckCircle2
} from 'lucide-react';

// WhatsApp SVG Icon
const WhatsAppIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

export default function ContactUsPage({ onBack, onNavigate }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    const fd = new FormData(e.target);
    const text = `*New Consultation Request (Contact Us Page)*\n\n*Name:* ${fd.get('name')}\n*Phone:* ${fd.get('phone')}\n*Email:* ${fd.get('email')}\n*Category:* ${fd.get('category')}\n*Message:* ${fd.get('message')}`;
    window.open(`https://api.whatsapp.com/send?phone=919423924568&text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800 pb-20">
      
      {/* ── 1. Top Hero Header ── */}
      <div className="relative bg-gradient-to-b from-slate-900 via-slate-900 to-blue-950 text-white pt-10 pb-20 px-4 sm:px-6 overflow-hidden">
        <div className="absolute top-0 right-[-10%] w-[500px] h-[500px] bg-insurance-orange/15 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-[-10%] w-[500px] h-[500px] bg-insurance-darkblue/40 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-7xl mx-auto relative z-10">
          
          {/* Back to Home & Breadcrumb */}
          <div className="flex items-center justify-between gap-4 mb-8">
            <button 
              onClick={onBack}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs sm:text-sm font-bold backdrop-blur-md border border-white/10 transition-all active:scale-95 cursor-pointer"
            >
              <ArrowLeft size={16} /> Back to Home
            </button>

            <span className="text-xs sm:text-sm text-slate-400 font-semibold">
              Home &nbsp;/&nbsp; <span className="text-insurance-orange">Contact Us</span>
            </span>
          </div>

          {/* Heading */}
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <div className="inline-flex items-center gap-2 bg-orange-500/20 text-insurance-orange border border-orange-400/30 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest">
              <Sparkles size={14} /> Get In Touch
            </div>
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight uppercase font-sans">
              Let&rsquo;s Protect <br />
              <span className="bg-gradient-to-r from-insurance-orange via-amber-400 to-emerald-400 bg-clip-text text-transparent">
                What Matters Most
              </span>
            </h1>
            <p className="text-sm sm:text-lg text-slate-300 font-medium max-w-xl mx-auto leading-relaxed">
              Have questions about your health, term, or motor policy? Need help with an ongoing claim? Reach out to our dedicated advisory team.
            </p>
          </div>

        </div>
      </div>

      {/* ── 2. Main Contact Cards & Form Container ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 -mt-10 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT: Callback Request Form (7 cols) */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-10 shadow-xl border border-slate-100">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-orange-50 text-insurance-orange flex items-center justify-center border border-orange-100">
                <MessageSquare size={20} />
              </div>
              <div>
                <h3 className="text-2xl font-black text-slate-900 font-sans">
                  Request a Free Callback
                </h3>
                <p className="text-xs text-slate-500 font-semibold">
                  Get personalized policy quotes and expert guidance delivered instantly.
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="space-y-1.5">
                  <label className="text-[12px] font-extrabold uppercase tracking-wider text-slate-600">Your Full Name</label>
                  <input 
                    type="text" 
                    name="name"
                    required 
                    placeholder="e.g. Ramesh Sharma" 
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-800 outline-none focus:border-insurance-darkblue focus:bg-white transition-all font-medium"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[12px] font-extrabold uppercase tracking-wider text-slate-600">Mobile / WhatsApp No.</label>
                  <input 
                    type="tel" 
                    name="phone"
                    required 
                    placeholder="e.g. 98765 43210" 
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-800 outline-none focus:border-insurance-darkblue focus:bg-white transition-all font-medium"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="space-y-1.5">
                  <label className="text-[12px] font-extrabold uppercase tracking-wider text-slate-600">Email Address</label>
                  <input 
                    type="email" 
                    name="email"
                    required 
                    placeholder="e.g. ramesh@gmail.com" 
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-800 outline-none focus:border-insurance-darkblue focus:bg-white transition-all font-medium"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[12px] font-extrabold uppercase tracking-wider text-slate-600">Requirement Category</label>
                  <select 
                    name="category"
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-700 outline-none focus:border-insurance-darkblue focus:bg-white transition-all font-semibold"
                  >
                    <option>Health Insurance (Star Health / Floater)</option>
                    <option>Term Life Insurance (LIC / Pure Protection)</option>
                    <option>Motor &amp; Car Insurance (Zero Dep)</option>
                    <option>Mutual Funds &amp; SIP Planning</option>
                    <option>Claims Assistance Desk Support</option>
                    <option>Business / Commercial Cover</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[12px] font-extrabold uppercase tracking-wider text-slate-600">Your Query / Requirements</label>
                <textarea 
                  name="message"
                  rows={4} 
                  required 
                  placeholder="Tell us about your requirements (e.g. coverage needed, family members, existing policy renewal, or claim help)" 
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-800 outline-none focus:border-insurance-darkblue focus:bg-white transition-all resize-none font-medium"
                ></textarea>
              </div>

              <button 
                type="submit" 
                className="w-full py-4 px-6 bg-gradient-to-r from-insurance-darkblue to-blue-700 hover:from-blue-700 hover:to-insurance-darkblue text-white font-extrabold text-sm sm:text-base rounded-2xl transition-all duration-300 shadow-lg shadow-blue-900/15 flex items-center justify-center gap-2 group hover:scale-[1.01] active:scale-95 cursor-pointer"
              >
                Send Request via WhatsApp <Send size={16} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </form>
          </div>

          {/* RIGHT: Direct Call Desk & Office Details (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Direct Call Desk Card */}
            <div className="bg-white rounded-3xl p-6 sm:p-7 shadow-xl border border-slate-100">
              <div className="flex items-center gap-2.5 mb-4">
                <div className="w-8 h-8 rounded-lg bg-orange-50 text-insurance-orange flex items-center justify-center">
                  <Phone size={18} />
                </div>
                <h4 className="text-xs font-black uppercase text-insurance-orange tracking-widest">
                  Direct Advisory Desk
                </h4>
              </div>

              <div className="space-y-3.5">
                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between hover:bg-blue-50/50 transition-colors">
                  <div>
                    <p className="text-sm font-extrabold text-slate-900">Adarsh G. Bafna</p>
                    <p className="text-[11px] text-slate-500 font-bold">Insurance Advisor &nbsp;|&nbsp; 25+ Yrs Exp</p>
                  </div>
                  <a 
                    href="tel:+919175033300"
                    className="px-3 py-1.5 rounded-xl bg-blue-100/80 text-insurance-darkblue font-extrabold text-xs hover:bg-insurance-darkblue hover:text-white transition-all flex items-center gap-1"
                  >
                    <Phone size={12} /> Call
                  </a>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between hover:bg-blue-50/50 transition-colors">
                  <div>
                    <p className="text-sm font-extrabold text-slate-900">Vaishali A. Bafna</p>
                    <p className="text-[11px] text-slate-500 font-bold">Senior Sales Manager &nbsp;|&nbsp; 15+ Yrs Exp</p>
                  </div>
                  <a 
                    href="tel:+919112063150"
                    className="px-3 py-1.5 rounded-xl bg-blue-100/80 text-insurance-darkblue font-extrabold text-xs hover:bg-insurance-darkblue hover:text-white transition-all flex items-center gap-1"
                  >
                    <Phone size={12} /> Call
                  </a>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between hover:bg-orange-50/50 transition-colors">
                  <div>
                    <p className="text-sm font-extrabold text-slate-900">Divyesh A. Bafna</p>
                    <p className="text-[11px] text-slate-500 font-bold">Director &nbsp;|&nbsp; Mutual Fund Distributor</p>
                  </div>
                  <a 
                    href="tel:+919423924568"
                    className="px-3 py-1.5 rounded-xl bg-orange-100 text-insurance-orange font-extrabold text-xs hover:bg-insurance-orange hover:text-white transition-all flex items-center gap-1"
                  >
                    <Phone size={12} /> Call
                  </a>
                </div>
              </div>
            </div>

            {/* Email Support Card */}
            <div className="bg-white rounded-3xl p-6 sm:p-7 shadow-xl border border-slate-100 flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-insurance-darkblue flex items-center justify-center flex-shrink-0 mt-0.5">
                <Mail size={20} />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-xs font-black uppercase text-slate-400 tracking-wider mb-1">Official Emails</h4>
                <a href="mailto:theinsurancehub70@gmail.com" className="text-sm font-extrabold text-slate-800 hover:text-insurance-darkblue truncate block">
                  theinsurancehub70@gmail.com
                </a>
                <a href="mailto:bafana.vaishali@starinsurance.in" className="text-xs font-semibold text-slate-500 hover:text-insurance-orange truncate block mt-0.5">
                  bafana.vaishali@starinsurance.in
                </a>
              </div>
            </div>

            {/* Registered Office & Google Maps Link */}
            <div className="bg-white rounded-3xl p-6 sm:p-7 shadow-xl border border-slate-100 space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-orange-50 text-insurance-orange flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Building size={20} />
                </div>
                <div>
                  <h4 className="text-xs font-black uppercase text-slate-400 tracking-wider mb-1">Corporate Office</h4>
                  <p className="text-xs sm:text-sm font-bold text-slate-800 leading-relaxed">
                    The Insurance Hub, Shop no. 57, Sanman Prestige, Beside Zilla Parishad, Railway Station Road, Nanded - 431601
                  </p>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[11px] font-semibold text-slate-500 flex items-center gap-1.5">
                  <Clock size={14} className="text-slate-400" /> Mon - Sat: 10 AM - 8 PM
                </span>
                
                <a 
                  href="https://www.google.com/maps/search/?api=1&query=The+Insurance+Hub,+Shop+no.+57,+Sanman+Prestige,+Beside+Zilla+Parishad,+Railway+Station+Road,+Nanded+431601" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="inline-flex items-center gap-1.5 text-xs font-extrabold text-insurance-orange hover:text-orange-700 hover:underline"
                >
                  <MapPin size={13} /> View on Map
                </a>
              </div>
            </div>

          </div>

        </div>
      </div>

      {/* ── 3. WhatsApp Direct Quick CTA ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 mt-16">
        <div className="bg-emerald-600 rounded-3xl p-8 sm:p-10 text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl shadow-emerald-700/20">
          <div className="flex items-center gap-4 text-center sm:text-left">
            <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center backdrop-blur-md flex-shrink-0">
              <WhatsAppIcon className="w-8 h-8 text-white" />
            </div>
            <div>
              <h3 className="text-xl sm:text-2xl font-black">Need Instant Help on WhatsApp?</h3>
              <p className="text-emerald-100 text-xs sm:text-sm font-medium mt-0.5">Send a message directly to our senior advisors for instant quotes.</p>
            </div>
          </div>
          <a
            href="https://wa.me/message/WXX5A5BNS2LBL1?src=qr"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3.5 rounded-2xl bg-white text-emerald-700 font-extrabold text-sm hover:bg-emerald-50 transition-all shadow-lg active:scale-95 whitespace-nowrap"
          >
            Start WhatsApp Chat
          </a>
        </div>
      </div>

    </div>
  );
}
