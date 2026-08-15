import React from 'react';
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
  Sparkles
} from 'lucide-react';

export default function ServicesPage({ onBack, onNavigate }) {
  const services = [
    {
      id: 'health',
      title: 'Health Insurance',
      icon: HeartPulse,
      tag: 'STAR HEALTH',
      iconBg: 'bg-blue-50 text-insurance-darkblue border-blue-100/60',
      tagColor: 'text-insurance-darkblue font-bold text-xs',
      description: 'Protect yourself and your family against rising medical inflation. Access comprehensive covers including cashless treatments, OPD visits, critical illnesses, and top-up health plans.',
      actionText: 'Get Quote'
    },
    {
      id: 'term',
      title: 'Term Life Insurance',
      icon: Award,
      tag: '100% SECURE CLAIM',
      iconBg: 'bg-orange-50 text-insurance-orange border-orange-100/60',
      tagColor: 'text-insurance-orange font-bold text-xs',
      description: "Secure your family's future even in your absence. Compare high-value life protection policies offering high coverage limits at extremely affordable premiums, with custom riders.",
      actionText: 'Get Quote'
    },
    {
      id: 'motor',
      title: 'Motor & Car Insurance',
      icon: Car,
      tag: 'INSTANT PAPERLESS ISSUANCE',
      iconBg: 'bg-emerald-50 text-emerald-700 border-emerald-100/60',
      tagColor: 'text-emerald-700 font-bold text-xs',
      description: 'Fast quotes and complete coverage for private cars, corporate vehicle fleets, two-wheelers, and commercial cargo trucks, featuring bumper-to-bumper and zero-depreciation add-ons.',
      actionText: 'Get Quote'
    },
    {
      id: 'mutual-funds',
      title: 'Mutual Funds & SIP',
      icon: BarChart2,
      tag: 'TOP MUTUAL FUNDS AVAILABLE',
      iconBg: 'bg-orange-50 text-insurance-orange border-orange-100/60',
      tagColor: 'text-insurance-orange font-bold text-xs',
      description: 'Start building long-term wealth. Our certified mutual fund distribution desk provides smart SIP planning, asset allocation, and personalized portfolio tracking based on your goals.',
      actionText: 'Get Quote'
    },
    {
      id: 'business',
      title: 'Business Insurance',
      icon: Building,
      tag: 'COMPLETE BUSINESS RISK COVERS',
      iconBg: 'bg-blue-50 text-insurance-darkblue border-blue-100/60',
      tagColor: 'text-slate-600 font-bold text-xs',
      description: "Mitigate your business liabilities. We distribute marine transit insurance, fire policies, jeweller's block insurance, shopkeepers coverage, employee health covers, and customized general commercial risks.",
      actionText: 'Get Quote'
    },
    {
      id: 'claims',
      title: 'Claims Assistance Desk',
      icon: ShieldCheck,
      tag: 'DEDICATED SUPPORT DESK',
      iconBg: 'bg-emerald-50 text-emerald-700 border-emerald-100/60',
      tagColor: 'text-emerald-700 font-bold text-xs',
      description: 'Stuck with a delayed claim? We offer end-to-end guidance to resolve your health, term, and general insurance claims smoothly. Get professional review and transparent support desk help.',
      actionText: 'Get Support'
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800 pb-16">
      
      {/* ── 1. Top Header Banner ── */}
      <div className="relative bg-gradient-to-b from-slate-900 via-slate-900 to-insurance-darkblue text-white pt-8 pb-16 px-4 sm:px-6 overflow-hidden">
        {/* Subtle Brand Glow */}
        <div className="absolute top-0 right-[-10%] w-96 h-96 bg-insurance-orange/15 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-7xl mx-auto relative z-10">
          
          {/* Back to Home & Breadcrumbs */}
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
              <Sparkles size={12} /> OUR SERVICES
            </div>
            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight uppercase font-sans">
              COMPREHENSIVE COVERAGE <br />
              <span className="bg-gradient-to-r from-insurance-orange via-amber-400 to-white bg-clip-text text-transparent">
                UNDER ONE ROOF
              </span>
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 font-medium max-w-xl mx-auto">
              We partner with all leading providers to offer unbiased advice, complete transparency, and hassle-free claim settlements.
            </p>
          </div>

        </div>
      </div>

      {/* ── 2. Exact Service Cards Grid (White cards + Logo Brand Colors) ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 -mt-8 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <div 
                key={service.id}
                className="bg-white rounded-3xl p-6 sm:p-7 shadow-sm hover:shadow-xl border border-slate-100 hover:border-slate-200 transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  {/* Icon */}
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border ${service.iconBg} mb-5 group-hover:scale-105 transition-transform duration-300`}>
                    <Icon size={24} className="stroke-[2.2]" />
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-slate-900 mb-2.5 group-hover:text-insurance-darkblue transition-colors font-sans">
                    {service.title}
                  </h3>

                  {/* Description (Exact text verbatim) */}
                  <p className="text-[13.5px] text-slate-500 font-medium leading-relaxed mb-6">
                    {service.description}
                  </p>
                </div>

                {/* Footer Bar */}
                <div className="flex items-center justify-between border-t border-slate-100 pt-4 mt-auto">
                  <span className={service.tagColor}>
                    {service.tag}
                  </span>
                  
                  <button 
                    onClick={() => onNavigate && onNavigate('contact')} 
                    className="text-slate-400 group-hover:text-insurance-darkblue flex items-center gap-1.5 text-xs font-bold transition-colors cursor-pointer"
                  >
                    {service.actionText} <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── 3. Bottom Consultation Banner (Solid Dark Blue + Orange Button) ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 mt-12">
        <div className="bg-insurance-darkblue rounded-3xl p-6 sm:p-8 text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-1.5 text-center sm:text-left">
            <h3 className="text-xl sm:text-2xl font-black tracking-tight">Need Help Choosing the Right Insurance?</h3>
            <p className="text-blue-100 text-xs sm:text-sm max-w-lg">
              Talk to our experienced advisors for personalized plan comparisons and claim guidance.
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
