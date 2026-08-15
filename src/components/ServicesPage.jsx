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
  Mail, 
  CheckCircle2, 
  FileText, 
  Sparkles,
  HelpCircle,
  Clock,
  Shield,
  TrendingUp,
  Briefcase,
  Users
} from 'lucide-react';

export default function ServicesPage({ onBack, onNavigate }) {
  const [activeCategory, setActiveCategory] = useState('all');

  const services = [
    {
      id: 'health',
      category: 'personal',
      title: 'Health Insurance',
      subtitle: 'Cashless Hospitalization & Comprehensive Family Floater Plans',
      icon: HeartPulse,
      tag: 'Most Popular',
      color: 'blue',
      gradient: 'from-blue-500 to-indigo-600',
      badgeBg: 'bg-blue-50 text-blue-700 border-blue-200',
      description: 'Protect your savings from escalating medical expenses. We compare and customize high-coverage health policies across India’s premier insurers with cashless access to 14,000+ top hospitals.',
      features: [
        'Cashless treatments in top multi-specialty hospitals',
        'Individual, Family Floater & Senior Citizen covers',
        'Critical illness covers with lump-sum payouts',
        'Maternity, OPD visits, and daycare procedures',
        'Zero waiting period add-ons for pre-existing conditions',
        'No Claim Bonus (NCB) protection up to 100%'
      ],
      partner: 'Star Health, HDFC ERGO, Care, Niva Bupa & all major TPAs'
    },
    {
      id: 'term',
      category: 'personal',
      title: 'Term Life Insurance',
      subtitle: 'Guaranteed Financial Protection for Your Family’s Tomorrow',
      icon: Award,
      tag: 'Essential Security',
      color: 'orange',
      gradient: 'from-orange-500 to-amber-600',
      badgeBg: 'bg-orange-50 text-orange-700 border-orange-200',
      description: 'Ensure your loved ones maintain their lifestyle and achieve their dreams even in your absence. Get high-value life protection offering substantial sums assured at budget-friendly premiums.',
      features: [
        'High sum assured (₹50 Lakhs to ₹10 Crores+)',
        'Accidental death and permanent disability riders',
        'Terminal illness early payout benefits',
        'Return of Premium (TROP) options available',
        'Flexible payout options: Lump sum or monthly income',
        'Tax exemption under Section 80C & 10(10D)'
      ],
      partner: 'LIC of India, Tata AIA, HDFC Life, ICICI Prudential, Max Life'
    },
    {
      id: 'motor',
      category: 'general',
      title: 'Motor & Car Insurance',
      subtitle: 'Zero Depreciation, Instant Paperless Issuance & Spot Claims',
      icon: Car,
      tag: 'Instant Policy',
      color: 'emerald',
      gradient: 'from-emerald-500 to-teal-600',
      badgeBg: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      description: 'From personal private cars and two-wheelers to heavy commercial fleet trucks, secure complete coverage against road accidents, theft, third-party liabilities, and natural calamities.',
      features: [
        'Bumper-to-Bumper Zero Depreciation (Zero Dep) cover',
        'Engine protector & consumables cover',
        '24/7 Roadside Assistance (RSA) & towing support',
        'Cashless repairs at 10,000+ authorized network garages',
        'No Claim Bonus (NCB) transfer from existing policy',
        'Instant digital policy generation within 5 minutes'
      ],
      partner: 'National Insurance, New India, ICICI Lombard, Bajaj Allianz, Digit'
    },
    {
      id: 'mutual-funds',
      category: 'investment',
      title: 'Mutual Funds & Wealth SIP',
      subtitle: 'Goal-Based Financial Planning & Disciplined Wealth Creation',
      icon: BarChart2,
      tag: 'Wealth Growth',
      color: 'purple',
      gradient: 'from-purple-500 to-violet-700',
      badgeBg: 'bg-purple-50 text-purple-700 border-purple-200',
      description: 'Grow your wealth with disciplined Systematic Investment Plans (SIP). As certified distributors, we provide personalized asset allocation, market insight, and regular portfolio rebalancing.',
      features: [
        'Systematic Investment Plans (SIP) starting from ₹500/month',
        'Equity, Hybrid, Large-Cap, Mid-Cap & Small-Cap funds',
        'Tax-saving ELSS funds (Tax deduction up to ₹1.5 Lakh under 80C)',
        'Goal-oriented planning: Children education, marriage & retirement',
        'Zero brokerage on regular fund distributions',
        'Continuous portfolio monitoring and rebalancing advice'
      ],
      partner: 'SBI MF, HDFC MF, ICICI Prudential MF, Nippon India, Kotak MF'
    },
    {
      id: 'business',
      category: 'general',
      title: 'Business & Commercial Insurance',
      subtitle: 'Comprehensive Risk Mitigation for Enterprises & Retailers',
      icon: Building,
      tag: 'Enterprise',
      color: 'slate',
      gradient: 'from-slate-700 to-slate-900',
      badgeBg: 'bg-slate-100 text-slate-800 border-slate-300',
      description: 'Protect your enterprise assets, machinery, inventory, and employees. We design custom commercial policies for retail shops, manufacturing units, logistics fleets, and corporate establishments.',
      features: [
        'Marine Cargo & Transit Insurance for goods on the move',
        'Fire, Earthquake & Special Perils insurance for premises',
        'Jeweller’s Block & Shopkeeper’s comprehensive policy',
        'Group Health & Group Personal Accident for employees',
        'Public Liability & Product Liability protection',
        'Keyman Insurance for directors and key executives'
      ],
      partner: 'United India, Oriental Insurance, Bajaj Allianz, Tata AIG'
    },
    {
      id: 'claims',
      category: 'support',
      title: 'Claims Assistance Desk',
      subtitle: 'End-to-End Handholding & Smooth Claim Settlements',
      icon: ShieldCheck,
      tag: 'Support Guarantee',
      color: 'teal',
      gradient: 'from-teal-500 to-emerald-700',
      badgeBg: 'bg-teal-50 text-teal-700 border-teal-200',
      description: 'Facing delays or queries regarding an insurance claim? Our specialized claims desk guides you through documentation, TPA coordination, hospital liaison, and dispute resolution.',
      features: [
        '1-on-1 claim document review before filing',
        'Direct coordination with TPA and insurance survey desk',
        'Cashless pre-authorization assistance in emergency admissions',
        'Reimbursement claim query resolution and settlement push',
        'Motor accident spot survey guidance and garage liaison',
        'Over 25+ years of claim advocacy and proven client trust'
      ],
      partner: 'Dedicated claims cell operating across all major insurers'
    }
  ];

  const filteredServices = activeCategory === 'all' 
    ? services 
    : services.filter(s => s.category === activeCategory);

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800 pb-20">
      
      {/* ── 1. Top Hero Header ── */}
      <div className="relative bg-gradient-to-b from-slate-900 via-slate-900 to-blue-950 text-white pt-10 pb-20 px-4 sm:px-6 overflow-hidden">
        {/* Background glow decorative blobs */}
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
              Home &nbsp;/&nbsp; <span className="text-insurance-orange">Services</span>
            </span>
          </div>

          {/* Heading */}
          <div className="text-center max-w-4xl mx-auto space-y-4">
            <div className="inline-flex items-center gap-2 bg-orange-500/20 text-insurance-orange border border-orange-400/30 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest">
              <Sparkles size={14} /> Our Complete Portfolio
            </div>
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight uppercase font-sans">
              All Insurance &amp; Investments <br />
              <span className="bg-gradient-to-r from-insurance-orange via-amber-400 to-emerald-400 bg-clip-text text-transparent">
                Under One Trusted Roof
              </span>
            </h1>
            <p className="text-sm sm:text-lg text-slate-300 font-medium max-w-2xl mx-auto leading-relaxed">
              With 25+ years of trusted advisory experience, we help you compare, select, and manage policies from India's top insurers with 100% transparency and full claims support.
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mt-10">
            {[
              { id: 'all', label: 'All Services' },
              { id: 'personal', label: 'Personal & Life' },
              { id: 'general', label: 'General & Motor' },
              { id: 'investment', label: 'Mutual Funds & SIP' },
              { id: 'support', label: 'Claims Desk' }
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 sm:px-5 sm:py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                  activeCategory === cat.id
                    ? 'bg-insurance-orange text-white shadow-lg shadow-orange-500/30 scale-105'
                    : 'bg-white/10 text-slate-300 hover:bg-white/20 hover:text-white border border-white/10'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

        </div>
      </div>

      {/* ── 2. Services Deep Dive Cards ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 -mt-10 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {filteredServices.map((service) => {
            const Icon = service.icon;
            return (
              <div 
                key={service.id}
                className="bg-white rounded-3xl p-6 sm:p-9 shadow-xl border border-slate-100 hover:shadow-2xl hover:border-slate-200 transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  {/* Top Bar inside card */}
                  <div className="flex items-center justify-between gap-4 mb-6">
                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${service.gradient} text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      <Icon size={28} className="stroke-[2.2]" />
                    </div>
                    <span className={`px-3 py-1 rounded-full text-[11px] font-black uppercase tracking-wider border ${service.badgeBg}`}>
                      {service.tag}
                    </span>
                  </div>

                  {/* Title & Subtitle */}
                  <h2 className="text-2xl sm:text-3xl font-black text-slate-900 font-sans tracking-tight mb-2">
                    {service.title}
                  </h2>
                  <p className="text-xs sm:text-sm font-bold text-insurance-orange mb-4">
                    {service.subtitle}
                  </p>
                  <p className="text-sm sm:text-base text-slate-600 leading-relaxed mb-6 font-medium">
                    {service.description}
                  </p>

                  {/* Key Features List */}
                  <div className="space-y-2.5 mb-8 bg-slate-50 p-4 sm:p-5 rounded-2xl border border-slate-100">
                    <p className="text-xs font-black uppercase text-slate-400 tracking-wider mb-3">
                      Key Highlights &amp; Inclusions:
                    </p>
                    {service.features.map((feat, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 font-semibold">
                        <CheckCircle2 size={16} className="text-emerald-500 flex-shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Card Footer: Partners & CTA */}
                <div className="pt-4 border-t border-slate-100">
                  <p className="text-[11px] text-slate-400 font-medium mb-4 truncate">
                    <span className="font-bold text-slate-600">Major Tie-ups:</span> {service.partner}
                  </p>
                  
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <a
                      href="https://wa.me/message/WXX5A5BNS2LBL1?src=qr"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-5 py-2.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-700 text-xs sm:text-sm font-extrabold border border-emerald-200/60 transition-all flex items-center gap-1.5 active:scale-95"
                    >
                      Inquire on WhatsApp <ArrowRight size={14} />
                    </a>

                    <button
                      onClick={() => onNavigate && onNavigate('contact')}
                      className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-insurance-darkblue to-blue-700 hover:from-blue-700 hover:to-insurance-darkblue text-white text-xs sm:text-sm font-extrabold transition-all shadow-md shadow-blue-900/10 active:scale-95 cursor-pointer"
                    >
                      Request Callback
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── 3. Four-Step Advisory Process ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 mt-20">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h3 className="text-xs font-black uppercase text-insurance-orange tracking-widest mb-2">Our Method</h3>
          <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">How We Serve You</h2>
          <p className="text-slate-600 text-sm sm:text-base font-medium mt-2">Zero hassle, transparent recommendations, and dedicated personal advisory.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { step: '01', title: 'Need Assessment', desc: 'We analyze your family size, liabilities, medical history, and future goals to find the right coverage bracket.' },
            { step: '02', title: 'Unbiased Comparison', desc: 'We compare benefits, room-rent caps, network hospitals, and premiums across 15+ top insurance companies.' },
            { step: '03', title: 'Instant Paperless Setup', desc: 'Smooth digital onboarding with minimal documentation and instant policy delivery to your WhatsApp and email.' },
            { step: '04', title: 'Lifelong Claim Support', desc: 'Whenever a claim arises, we personally coordinate with the hospital TPA and insurer until the settlement is complete.' }
          ].map((item) => (
            <div key={item.step} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm relative overflow-hidden group hover:border-blue-200 transition-all">
              <span className="text-4xl sm:text-5xl font-black text-slate-100 group-hover:text-blue-50 transition-colors absolute top-4 right-4">
                {item.step}
              </span>
              <h4 className="text-lg font-black text-slate-900 mb-2 relative z-10">{item.title}</h4>
              <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed relative z-10">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── 4. Bottom Consultation Banner ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 mt-20">
        <div className="bg-gradient-to-br from-insurance-darkblue to-blue-900 rounded-3xl p-8 sm:p-12 text-white flex flex-col lg:flex-row items-center justify-between gap-8 shadow-2xl relative overflow-hidden">
          <div className="space-y-3 text-center lg:text-left">
            <h3 className="text-2xl sm:text-4xl font-black tracking-tight">Need Help Choosing the Right Plan?</h3>
            <p className="text-blue-100 text-sm sm:text-base max-w-xl">
              Talk to our senior insurance advisors today. Free consultation, zero hidden fees, and unbiased comparisons tailored for you.
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-4 flex-shrink-0">
            <a
              href="tel:+919423924568"
              className="px-6 py-3.5 rounded-2xl bg-white text-insurance-darkblue font-extrabold text-sm hover:bg-blue-50 transition-all shadow-lg active:scale-95 flex items-center gap-2"
            >
              <Phone size={18} /> Call +91 94239 24568
            </a>
            <button
              onClick={() => onNavigate && onNavigate('contact')}
              className="px-6 py-3.5 rounded-2xl bg-insurance-orange hover:bg-orange-600 text-white font-extrabold text-sm transition-all shadow-lg active:scale-95 cursor-pointer"
            >
              Book Free Consultation
            </button>
          </div>
        </div>
      </div>

    </div>
  );
}
