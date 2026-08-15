import React, { useState } from 'react';
import { 
  ArrowLeft, 
  HeartPulse, 
  Award, 
  Car, 
  BarChart2, 
  Building, 
  ShieldCheck, 
  ArrowRight, 
  Phone, 
  CheckCircle2, 
  Sparkles
} from 'lucide-react';

export default function ServicesPage({ onBack, onNavigate }) {
  const [activeCategory, setActiveCategory] = useState('all');

  const services = [
    {
      id: 'health',
      category: 'personal',
      title: 'Health Insurance',
      subtitle: 'Cashless Hospitalization & Family Floaters',
      icon: HeartPulse,
      tag: 'Star Health & Top TPAs',
      iconBg: 'bg-blue-50 text-insurance-darkblue border-blue-100',
      badgeBg: 'bg-blue-50 text-insurance-darkblue border-blue-200',
      description: 'Comprehensive covers for hospitalization, critical illnesses, OPD, and daycare treatments with 14,000+ cashless hospitals across India.',
      bullets: [
        'Cashless treatments in top hospitals',
        'Individual & Family Floater plans',
        'Senior citizen & critical illness covers',
        'Zero waiting period add-ons available'
      ]
    },
    {
      id: 'term',
      category: 'personal',
      title: 'Term Life Insurance',
      subtitle: 'Pure Life Protection for Family Security',
      icon: Award,
      tag: 'LIC & Leading Insurers',
      iconBg: 'bg-orange-50 text-insurance-orange border-orange-100',
      badgeBg: 'bg-orange-50 text-insurance-orange border-orange-200',
      description: 'High-value financial protection ensuring your family’s standard of living, children’s education, and liabilities remain safe.',
      bullets: [
        'High sum assured at low premiums',
        'Accidental death & disability riders',
        'Terminal illness early payout option',
        'Tax exemption under Section 80C'
      ]
    },
    {
      id: 'motor',
      category: 'general',
      title: 'Motor & Car Insurance',
      subtitle: 'Zero Dep & Instant Digital Issuance',
      icon: Car,
      tag: 'Cars, Bikes & Commercial',
      iconBg: 'bg-blue-50 text-insurance-darkblue border-blue-100',
      badgeBg: 'bg-blue-50 text-insurance-darkblue border-blue-200',
      description: 'Zero-depreciation covers, 24/7 roadside assistance, and instant digital policy issuance for private cars, bikes, and fleet vehicles.',
      bullets: [
        'Bumper-to-bumper Zero Dep cover',
        'Cashless repairs at 10,000+ garages',
        '24/7 Roadside Assistance & towing',
        'Instant policy delivery in 5 minutes'
      ]
    },
    {
      id: 'mutual-funds',
      category: 'investment',
      title: 'Mutual Funds & Wealth SIP',
      subtitle: 'Disciplined Goal-Based Wealth Creation',
      icon: BarChart2,
      tag: 'Certified AMFI Desk',
      iconBg: 'bg-orange-50 text-insurance-orange border-orange-100',
      badgeBg: 'bg-orange-50 text-insurance-orange border-orange-200',
      description: 'Expert-curated Systematic Investment Plans (SIP) and portfolio management tailored for your financial milestones.',
      bullets: [
        'SIPs starting from ₹500/month',
        'Top-rated Equity & Hybrid funds',
        'Tax-saving ELSS (Section 80C)',
        'Regular review & portfolio rebalancing'
      ]
    },
    {
      id: 'business',
      category: 'general',
      title: 'Business Insurance',
      subtitle: 'Enterprise Liability & Asset Protection',
      icon: Building,
      tag: 'Commercial Covers',
      iconBg: 'bg-blue-50 text-insurance-darkblue border-blue-100',
      badgeBg: 'bg-blue-50 text-insurance-darkblue border-blue-200',
      description: 'Complete risk coverage for shops, manufacturing plants, marine cargo, and employee group health policies.',
      bullets: [
        'Marine Transit & Cargo insurance',
        'Fire, Burglary & Shopkeeper cover',
        'Group Health & Accident for staff',
        'Public & Product Liability covers'
      ]
    },
    {
      id: 'claims',
      category: 'support',
      title: 'Claims Assistance Desk',
      subtitle: '1-on-1 Settlement Coordination',
      icon: ShieldCheck,
      tag: 'Dedicated Support Cell',
      iconBg: 'bg-emerald-50 text-emerald-700 border-emerald-100',
      badgeBg: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      description: 'End-to-end support for delayed, queried, or cashless claims with 25+ years of trusted advisory and advocacy.',
      bullets: [
        'Document verification before submission',
        'Direct hospital TPA liaison support',
        'Reimbursement claim query resolution',
        '25+ years of claim settlement trust'
      ]
    }
  ];

  const filteredServices = activeCategory === 'all' 
    ? services 
    : services.filter(s => s.category === activeCategory);

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800 pb-16">
      
      {/* ── 1. Top Hero Header ── */}
      <div className="relative bg-gradient-to-b from-slate-900 via-slate-900 to-insurance-darkblue text-white pt-8 pb-16 px-4 sm:px-6 overflow-hidden">
        {/* Subtle glow */}
        <div className="absolute top-0 right-[-10%] w-96 h-96 bg-insurance-orange/15 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-7xl mx-auto relative z-10">
          
          {/* Back to Home & Breadcrumb */}
          <div className="flex items-center justify-between gap-4 mb-6">
            <button 
              onClick={onBack}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-bold backdrop-blur-md border border-white/10 transition-all active:scale-95 cursor-pointer"
            >
              <ArrowLeft size={14} /> Back to Home
            </button>

            <span className="text-xs text-slate-400 font-semibold">
              Home &nbsp;/&nbsp; <span className="text-insurance-orange">Services</span>
            </span>
          </div>

          {/* Heading */}
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-1.5 bg-orange-500/20 text-insurance-orange border border-orange-400/30 px-3.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-widest">
              <Sparkles size={12} /> Complete Advisory Portfolio
            </div>
            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight uppercase font-sans">
              Insurance &amp; Investment Solutions <br />
              <span className="bg-gradient-to-r from-insurance-orange via-amber-400 to-white bg-clip-text text-transparent">
                Under One Roof
              </span>
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 font-medium max-w-xl mx-auto">
              Compare, secure, and manage all your policies with 100% transparency and personalized guidance.
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
            {[
              { id: 'all', label: 'All Services' },
              { id: 'personal', label: 'Health & Life' },
              { id: 'general', label: 'Motor & Business' },
              { id: 'investment', label: 'Mutual Funds' },
              { id: 'support', label: 'Claims Desk' }
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  activeCategory === cat.id
                    ? 'bg-insurance-orange text-white shadow-md shadow-orange-500/30 scale-105'
                    : 'bg-white/10 text-slate-300 hover:bg-white/20 hover:text-white border border-white/10'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

        </div>
      </div>

      {/* ── 2. Crisp, Short Service Cards (3 Columns) ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 -mt-8 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredServices.map((service) => {
            const Icon = service.icon;
            return (
              <div 
                key={service.id}
                className="bg-white rounded-2xl p-5 sm:p-6 shadow-md border border-slate-100 hover:shadow-xl hover:border-blue-100 transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  {/* Card Header */}
                  <div className="flex items-center justify-between gap-3 mb-4">
                    <div className={`w-11 h-11 rounded-xl flex items-center justify-center border ${service.iconBg} group-hover:scale-105 transition-transform`}>
                      <Icon size={22} className="stroke-[2.2]" />
                    </div>
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider border ${service.badgeBg}`}>
                      {service.tag}
                    </span>
                  </div>

                  {/* Title & Subtitle */}
                  <h2 className="text-lg font-black text-slate-900 font-sans tracking-tight leading-snug">
                    {service.title}
                  </h2>
                  <p className="text-[11px] font-bold text-insurance-orange mb-2.5">
                    {service.subtitle}
                  </p>
                  <p className="text-xs text-slate-600 leading-relaxed mb-4 font-medium">
                    {service.description}
                  </p>

                  {/* 4 Crisp Bullets */}
                  <div className="space-y-1.5 mb-5 bg-slate-50/80 p-3 rounded-xl border border-slate-100">
                    {service.bullets.map((b, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs text-slate-700 font-semibold">
                        <CheckCircle2 size={13} className="text-emerald-600 flex-shrink-0" />
                        <span className="truncate">{b}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Card Actions */}
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                  <a
                    href="https://wa.me/message/WXX5A5BNS2LBL1?src=qr"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3.5 py-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-700 text-xs font-bold border border-emerald-200/60 transition-all flex items-center gap-1 active:scale-95"
                  >
                    WhatsApp Inquire
                  </a>

                  <button
                    onClick={() => onNavigate && onNavigate('contact')}
                    className="px-3.5 py-1.5 rounded-lg bg-insurance-darkblue hover:bg-blue-900 text-white text-xs font-bold transition-all shadow-xs active:scale-95 cursor-pointer flex items-center gap-1"
                  >
                    Get Quote <ArrowRight size={12} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── 3. Four-Step Advisory Process (Crisp & White) ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 mt-14">
        <div className="text-center max-w-xl mx-auto mb-8">
          <h3 className="text-[11px] font-black uppercase text-insurance-orange tracking-widest mb-1">Our Simple Process</h3>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">How We Guide You</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { step: '01', title: 'Need Analysis', desc: 'Assess your family coverage requirements, budget, and future goals.' },
            { step: '02', title: 'Comparison', desc: 'Compare plan features, room rent limits, and premiums across 15+ insurers.' },
            { step: '03', title: 'Instant Issuance', desc: 'Minimal paperwork with immediate policy delivery to your phone and email.' },
            { step: '04', title: 'Claim Support', desc: 'Lifelong personal coordination with TPA and hospital for hassle-free claims.' }
          ].map((item) => (
            <div key={item.step} className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-100 shadow-xs relative">
              <span className="text-2xl font-black text-insurance-darkblue/15 absolute top-3 right-3 font-mono">
                {item.step}
              </span>
              <h4 className="text-sm font-black text-slate-900 mb-1">{item.title}</h4>
              <p className="text-xs text-slate-600 font-medium leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── 4. Bottom Consultation Banner (Solid Dark Blue + Orange Button) ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 mt-12">
        <div className="bg-insurance-darkblue rounded-2xl p-6 sm:p-8 text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-1.5 text-center sm:text-left">
            <h3 className="text-xl sm:text-2xl font-black tracking-tight">Need Expert Advice for Your Policy?</h3>
            <p className="text-blue-100 text-xs sm:text-sm max-w-lg">
              Connect with senior advisors for free plan comparisons and claim guidance.
            </p>
          </div>
          <div className="flex items-center gap-3 flex-shrink-0">
            <a
              href="tel:+919423924568"
              className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-extrabold text-xs border border-white/20 transition-all flex items-center gap-1.5"
            >
              <Phone size={14} /> Call +91 94239 24568
            </a>
            <button
              onClick={() => onNavigate && onNavigate('contact')}
              className="px-5 py-2.5 rounded-xl bg-insurance-orange hover:bg-orange-600 text-white font-extrabold text-xs transition-all shadow-md active:scale-95 cursor-pointer"
            >
              Free Consultation
            </button>
          </div>
        </div>
      </div>

    </div>
  );
}
