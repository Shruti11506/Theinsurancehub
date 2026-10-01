import React, { useState } from 'react';
import { 
  ArrowLeft, 
  ArrowRight, 
  Phone,
  Sparkles,
  CheckCircle2,
  Filter
} from 'lucide-react';
import { servicesList } from '../data/servicesData';

export default function ServicesPage({ onBack, onNavigate }) {
  const [selectedFilter, setSelectedFilter] = useState('All');

  const categories = [
    'All',
    'General Insurance',
    'Life & Savings',
    'Commercial & Retail',
    'Property Insurance',
    'Liability Insurance',
    'Corporate & Employee',
    'Wealth & Investment',
    'Claims & Resolution'
  ];

  const filteredServices = selectedFilter === 'All' 
    ? servicesList 
    : servicesList.filter(s => s.category === selectedFilter);

  return (
    <div className="min-h-screen w-full max-w-full overflow-x-clip bg-slate-50 font-sans text-slate-800 pb-16">
      
      {/* ── 1. Top Header Banner ── */}
      <div className="relative bg-gradient-to-b from-slate-950 via-slate-900 to-insurance-darkblue text-white pt-8 pb-20 px-4 sm:px-6 overflow-hidden w-full max-w-full">
        {/* Subtle Brand Glows */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 right-[-10%] w-[500px] h-[500px] bg-insurance-orange/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-600/15 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          
          {/* Back to Home & Breadcrumbs */}
          <div className="flex items-center justify-between gap-4 mb-6">
            <button 
              onClick={onBack}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs sm:text-sm font-semibold backdrop-blur-md border border-white/15 transition-all active:scale-95 cursor-pointer shadow-xs"
            >
              <ArrowLeft size={15} /> Back to Home
            </button>

            <span className="text-xs sm:text-sm text-slate-400 font-medium">
              <button onClick={onBack} className="hover:text-white transition-colors cursor-pointer">Home</button> &nbsp;/&nbsp; <span className="text-insurance-orange font-semibold">Services</span>
            </span>
          </div>

          {/* Heading */}
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-1.5 bg-orange-500/20 text-insurance-orange border border-orange-400/30 px-4 py-1.5 rounded-full text-[11px] font-extrabold uppercase tracking-widest">
              <Sparkles size={13} /> COMPLETE PRODUCT PORTFOLIO
            </div>
            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight uppercase font-sans text-white">
              COMPREHENSIVE COVERAGE <br />
              <span className="bg-gradient-to-r from-insurance-orange via-amber-400 to-white bg-clip-text text-transparent">
                UNDER ONE ROOF
              </span>
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 font-medium max-w-2xl mx-auto leading-relaxed">
              From personal assets and life security to enterprise risks, statutory covers, and high-growth wealth management — we provide unbiased advisory with 100% transparency.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="mt-8 flex items-center justify-center flex-wrap gap-2 max-w-4xl mx-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedFilter(cat)}
                className={`text-xs font-bold px-3.5 py-1.5 rounded-full transition-all cursor-pointer ${
                  selectedFilter === cat
                    ? 'bg-insurance-orange text-white shadow-md shadow-orange-950/40 scale-105'
                    : 'bg-white/10 hover:bg-white/20 text-slate-300 border border-white/10'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

        </div>
      </div>

      {/* ── 2. Services Cards Grid ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 -mt-10 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
          {filteredServices.map((service) => {
            const Icon = service.icon;
            return (
              <div 
                key={service.id}
                className="bg-white rounded-3xl p-6 sm:p-7 shadow-sm hover:shadow-2xl border border-slate-100 hover:border-slate-200 transition-all duration-300 flex flex-col justify-between group relative overflow-hidden"
              >
                {/* Gradient Top Line on hover */}
                <div className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${service.topBarGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>

                <div>
                  {/* Top Bar: Icon & Category Tag */}
                  <div className="flex items-center justify-between gap-3 mb-5">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border ${service.iconBg} group-hover:scale-110 transition-transform duration-300 shadow-xs`}>
                      <Icon size={24} className="stroke-[2.2]" />
                    </div>
                    <span className={service.tagColor}>
                      {service.tag}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-extrabold text-slate-900 mb-2.5 group-hover:text-insurance-darkblue transition-colors font-sans flex items-center gap-2">
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p className="text-[13.5px] text-slate-500 font-medium leading-relaxed mb-4">
                    {service.description}
                  </p>

                  {/* Sub-items if available (e.g. for Business Insurance) */}
                  {service.subItems && service.subItems.length > 0 && (
                    <div className="mb-4 bg-slate-50 p-3 rounded-2xl border border-slate-100">
                      <p className="text-[11px] font-black uppercase text-slate-400 tracking-wider mb-2">
                        Core Business Covers:
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {service.subItems.map((sub, idx) => (
                          <span key={idx} className="inline-flex items-center gap-1 text-[11px] font-bold text-blue-900 bg-blue-100/70 border border-blue-200/60 px-2 py-0.5 rounded-md">
                            <CheckCircle2 size={11} className="text-insurance-darkblue" /> {sub}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Highlight Feature Badges */}
                  {service.highlights && (
                    <div className="flex flex-wrap gap-1.5 mb-6">
                      {service.highlights.map((item, idx) => (
                        <span key={idx} className="text-[11px] font-medium text-slate-600 bg-slate-100 px-2 py-0.5 rounded-md border border-slate-200/50">
                          • {item}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Footer Bar */}
                <div className="flex items-center justify-between border-t border-slate-100 pt-4 mt-auto">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                    {service.category}
                  </span>
                  
                  <button 
                    onClick={() => onNavigate && onNavigate('contact')} 
                    className="text-slate-600 group-hover:text-insurance-darkblue flex items-center gap-1.5 text-xs font-black transition-colors cursor-pointer bg-slate-50 group-hover:bg-blue-50 px-3 py-1.5 rounded-xl border border-slate-100 group-hover:border-blue-100"
                  >
                    {service.actionText} <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform text-insurance-orange" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── 3. Bottom Consultation Banner (Solid Dark Blue + Orange Button) ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 mt-14">
        <div className="bg-insurance-darkblue rounded-3xl p-6 sm:p-8 text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-insurance-orange/15 rounded-full blur-3xl pointer-events-none"></div>
          
          <div className="space-y-2 text-center sm:text-left relative z-10">
            <h3 className="text-xl sm:text-2xl font-bold font-sans tracking-tight text-white">Need Insurance or Investment Advice?</h3>
            <p className="text-blue-100/90 text-xs sm:text-sm max-w-lg font-sans font-normal leading-relaxed">
              Talk directly with our experienced advisors for customized policy comparisons, corporate covers, and portfolio consultations.
            </p>
          </div>
          <div className="flex items-center gap-3 flex-shrink-0 relative z-10">
            <a
              href="tel:+919423924568"
              className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs border border-white/20 transition-all flex items-center gap-1.5"
            >
              <Phone size={14} /> Call +91 94239 24568
            </a>
            <button
              onClick={() => onNavigate && onNavigate('contact')}
              className="px-5 py-2.5 rounded-xl bg-insurance-orange hover:bg-orange-600 text-white font-bold text-xs transition-all shadow-md active:scale-95 cursor-pointer"
            >
              Get Free Consultation
            </button>
          </div>
        </div>
      </div>

    </div>
  );
}
