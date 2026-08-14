import React, { useState, useEffect, useRef } from 'react';
import { 
  ArrowLeft, 
  ShoppingBag, 
  Coffee, 
  Shirt, 
  FileText, 
  Award, 
  Handshake, 
  Globe, 
  Users, 
  Sparkles,
  Plane,
  Heart
} from 'lucide-react';
import { ImageAutoSlider } from './ui/image-auto-slider';

export default function AboutUsPage({ onBack }) {
  const [visibleNodes, setVisibleNodes] = useState(new Set());
  const nodeRefs = useRef([]);

  // Detailed timeline extracted from Adarsh Bafna's diary pages
  const timelineData = [
    {
      year: '1984 - 1987',
      phase: 'Early Hustle',
      title: 'Diwali Firecrackers & Jewellery Stall',
      description: 'Began the journey of self-reliance by selling firecrackers during Diwali and running an imitation jewellery stall throughout the year.',
      icon: ShoppingBag,
      gradient: 'from-blue-500 to-indigo-600',
      accentColor: '#4f46e5',
      textColor: 'text-indigo-600',
      bgColor: 'bg-indigo-50',
      borderColor: 'border-indigo-200',
      glowColor: 'shadow-indigo-200/60',
    },
    {
      year: '1988 - 1990',
      phase: 'Early Hustle',
      title: 'Bread, Milk & Tea Stall',
      description: 'Woke up early to sell milk and bread on a bicycle in the mornings, and operated a local tea stall throughout the rest of the day.',
      icon: Coffee,
      gradient: 'from-amber-500 to-orange-600',
      accentColor: '#d97706',
      textColor: 'text-amber-600',
      bgColor: 'bg-amber-50',
      borderColor: 'border-amber-200',
      glowColor: 'shadow-amber-200/60',
    },
    {
      year: '1990 - 2001',
      phase: 'The Retail Era',
      title: 'Cloth Store & Garment Retail',
      description: 'Established "Jeevan Vastra Bhandar" cloth store and "Jeevan Collection" readymade garment store, catering to local fashion and apparel needs.',
      icon: Shirt,
      gradient: 'from-pink-500 to-rose-600',
      accentColor: '#e11d48',
      textColor: 'text-rose-600',
      bgColor: 'bg-rose-50',
      borderColor: 'border-rose-200',
      glowColor: 'shadow-rose-200/60',
    },
    {
      year: 'Aug 1999',
      phase: 'Entering Insurance',
      title: 'Began Insurance Journey',
      description: 'Took the first step into the insurance world. Started as a licensed LIC Agent and National Insurance Co. Agent.',
      icon: FileText,
      gradient: 'from-violet-500 to-purple-700',
      accentColor: '#7c3aed',
      textColor: 'text-violet-600',
      bgColor: 'bg-violet-50',
      borderColor: 'border-violet-200',
      glowColor: 'shadow-violet-200/60',
    },
    {
      year: '2002',
      phase: 'Entering Insurance',
      title: 'First Major LIC Recognition',
      description: 'Achieved outstanding performance goals and was awarded first major recognition by Life Insurance Corporation of India (LIC).',
      icon: Award,
      gradient: 'from-emerald-500 to-teal-600',
      accentColor: '#059669',
      textColor: 'text-emerald-600',
      bgColor: 'bg-emerald-50',
      borderColor: 'border-emerald-200',
      glowColor: 'shadow-emerald-200/60',
    },
    {
      year: '2004 - 2007',
      phase: 'Co-op Partnerships',
      title: 'Bajaj Allianz & Co-op Bank Tie-up',
      description: 'Negotiated and successfully tied up with Bajaj Allianz for insurance services for Nanded Merchant Co-op Bank, under the guidance of President Kandalurkar sir.',
      icon: Handshake,
      gradient: 'from-sky-500 to-blue-600',
      accentColor: '#0284c7',
      textColor: 'text-sky-600',
      bgColor: 'bg-sky-50',
      borderColor: 'border-sky-200',
      glowColor: 'shadow-sky-200/60',
    },
    {
      year: 'Oct 2010',
      phase: 'Star Health Era',
      title: 'The partnership that started it all',
      description: 'Joined Star Health as an Agent. Concurrently, Mrs. Vaishali Bafna began her professional corporate career as a Sales Manager at the Ch. Sambhaji Nagar (Aurangabad) branch, laying the foundation of a dynamic power team.',
      icon: Heart,
      gradient: 'from-red-500 to-rose-600',
      accentColor: '#dc2626',
      textColor: 'text-red-600',
      bgColor: 'bg-red-50',
      borderColor: 'border-red-200',
      glowColor: 'shadow-red-200/60',
    },
    {
      year: '2011 - 2014',
      phase: 'Star Health Era',
      title: 'Regional In-charge Club Member',
      description: 'Appointed as Star Agent Regional In-charge\'s Club Member in National Insurance Company (NIC) for 3 consecutive years due to exceptional regional output.',
      icon: Users,
      gradient: 'from-cyan-500 to-teal-600',
      accentColor: '#0891b2',
      textColor: 'text-cyan-600',
      bgColor: 'bg-cyan-50',
      borderColor: 'border-cyan-200',
      glowColor: 'shadow-cyan-200/60',
    },
    {
      year: '2014 - 2015',
      phase: 'Global Horizons',
      title: 'Thailand Convention & Executive Director Club',
      description: 'Qualified for the first International Convention to Thailand in 2014. Shortly after in 2015, inducted into the highly prestigious Executive Director\'s Club of Star Health.',
      icon: Plane,
      gradient: 'from-indigo-500 to-purple-600',
      accentColor: '#6366f1',
      textColor: 'text-indigo-600',
      bgColor: 'bg-indigo-50',
      borderColor: 'border-indigo-200',
      glowColor: 'shadow-indigo-200/60',
    },
    {
      year: '2016 - 2018',
      phase: 'Global Horizons',
      title: 'Frankfurt, Rome & Istanbul Conventions',
      description: 'Consistently qualified as a CMD Club Member and Vice President\'s Club member. Attended the global conventions in Frankfurt (2016), Rome (2017), and Istanbul (2018).',
      icon: Globe,
      gradient: 'from-orange-500 to-red-600',
      accentColor: '#ea580c',
      textColor: 'text-orange-600',
      bgColor: 'bg-orange-50',
      borderColor: 'border-orange-200',
      glowColor: 'shadow-orange-200/60',
    },
    {
      year: '2019 - 2021',
      phase: 'Global Horizons',
      title: 'Australia, Covid Resilience & Switzerland',
      description: 'Qualified for Australia Convention (2019), maintained CMD club membership during the challenging pandemic year (2020), and rose to CMD Elite Club Member in 2021 with a convention to Switzerland.',
      icon: Sparkles,
      gradient: 'from-fuchsia-500 to-purple-600',
      accentColor: '#c026d3',
      textColor: 'text-fuchsia-600',
      bgColor: 'bg-fuchsia-50',
      borderColor: 'border-fuchsia-200',
      glowColor: 'shadow-fuchsia-200/60',
    },
    {
      year: '2022 - 2026',
      phase: 'Top Tier Leadership',
      title: 'CMD London, South Africa, Japan & President\'s Club',
      description: 'Continued global leadership with CMD Conventions in London (2022), South Africa (2023), and Japan (2024). Qualified as President\'s Gold Club Member with Phuket trip (2025) and currently serving as a top-tier President\'s Club Member (2026).',
      icon: Award,
      gradient: 'from-yellow-500 to-amber-600',
      accentColor: '#d97706',
      textColor: 'text-amber-700',
      bgColor: 'bg-amber-50/80',
      borderColor: 'border-amber-200',
      glowColor: 'shadow-amber-300/60',
    }
  ];

  useEffect(() => {
    // Pre-reveal top items so mobile screens load smoothly without blank cards
    setVisibleNodes(new Set([0, 1]));

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const idx = Number(entry.target.dataset.idx);
            setVisibleNodes(prev => new Set([...prev, idx]));
          }
        });
      },
      { threshold: 0.05, rootMargin: '0px 0px 100px 0px' }
    );
    nodeRefs.current.forEach(ref => { if (ref) observer.observe(ref); });
    return () => observer.disconnect();
  }, []);

  return (
    <div className="w-full min-h-screen bg-slate-50/50 pt-4 pb-20 px-4 sm:px-6 relative overflow-hidden">
    
      {/* Background Decorative Blobs */}
      <div className="absolute top-[10%] right-[-10%] w-[400px] h-[400px] rounded-full bg-blue-100/30 blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-[20%] left-[-10%] w-[500px] h-[500px] rounded-full bg-purple-100/20 blur-3xl pointer-events-none"></div>
      <div className="absolute top-[50%] left-[20%] w-[350px] h-[350px] rounded-full bg-orange-100/20 blur-3xl pointer-events-none"></div>

      {/* Navigation & Back Button */}
      <div className="flex justify-start px-4 sm:px-6 mb-4 relative z-10">
        <button 
          onClick={onBack}
          className="group flex items-center gap-2 px-5 py-2.5 bg-white hover:bg-slate-900 hover:text-white rounded-full text-slate-700 font-bold text-[15px] shadow-sm border border-slate-200/60 transition-all duration-300 hover:-translate-x-1"
        >
          <ArrowLeft className="h-5 w-5 text-slate-400 group-hover:text-white transition-colors" />
          Back to Home
        </button>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">

        {/* Header Heading */}
        <div className="text-left space-y-4 mb-12">
          <h2 className="text-xs sm:text-sm font-extrabold uppercase tracking-widest text-insurance-orange bg-orange-50 border border-orange-100 px-4 py-1.5 rounded-full w-fit">
            OUR INSPIRING STORY
          </h2>
          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight uppercase">
            THE JOURNEY BEHIND <br />
            <span className="bg-gradient-to-r from-insurance-darkblue via-insurance-orange to-insurance-violet bg-clip-text text-transparent">
              THE INSURANCE HUB
            </span>
          </h1>
          
          {/* Quote Block from Adarsh Bafna */}
          <div className="max-w-2xl pt-2">
            <div className="relative p-8 rounded-3xl bg-white border border-slate-100 shadow-xl shadow-blue-100/40 overflow-hidden group">
              <div className="absolute top-0 left-0 w-1.5 h-full bg-gradient-to-b from-insurance-darkblue to-insurance-orange"></div>
              
              <span className="absolute right-6 top-4 text-8xl font-serif text-slate-100 select-none pointer-events-none font-black leading-none group-hover:text-blue-50 transition-colors duration-500">"</span>
              
              <blockquote className="relative z-10 text-left">
                <p className="text-2xl sm:text-3xl font-extrabold italic text-slate-800 tracking-wide leading-normal font-sans">
                  &ldquo;Every journey begins with people.&rdquo;
                </p>
                <cite className="mt-4 block not-italic">
                  <span className="block text-[15px] font-extrabold uppercase tracking-wider text-insurance-darkblue">
                    — Adarsh Bafna
                  </span>
                  <span className="block text-[11px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">
                    Co-Founder, The Insurance Hub
                  </span>
                </cite>
              </blockquote>
            </div>
          </div>
        </div>

        {/* ═══════════════════════════════════════════════════════
            CURVED ROADMAP WITH POLES & HIGHWAY (Desktop & Mobile)
            ═══════════════════════════════════════════════════════ */}
        <div className="relative mt-6">

          {/* ── The winding road SVG (visible on md+ screens) ── */}
          <svg
            className="hidden md:block absolute inset-0 w-full h-full pointer-events-none"
            viewBox="0 0 1000 3600"
            preserveAspectRatio="none"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ zIndex: 0 }}
          >
            {/* Road shadow */}
            <path
              d="M 500 0 L 500 3600"
              stroke="#e2e8f0"
              strokeWidth="60"
              strokeLinecap="round"
              opacity="0.5"
            />
            {/* Road main */}
            <path
              d="M 500 0 L 500 3600"
              stroke="#cbd5e1"
              strokeWidth="36"
              strokeLinecap="round"
              opacity="0.35"
            />
            {/* Road dashed center line */}
            <path
              d="M 500 0 L 500 3600"
              stroke="white"
              strokeWidth="3"
              strokeDasharray="20 16"
              strokeLinecap="round"
              opacity="0.5"
            />
          </svg>

          {/* ── Mobile Roadmap Highway Track (visible on mobile screens) ── */}
          <div className="md:hidden absolute left-[22px] top-2 bottom-4 w-7 -translate-x-1/2 rounded-full bg-gradient-to-b from-slate-200 via-slate-300 to-slate-200 shadow-inner flex items-center justify-center z-0 border border-slate-300/80">
            {/* Asphalt center stripe */}
            <div className="w-full h-full flex items-center justify-center">
              <div className="w-0.5 h-full border-r-2 border-dashed border-white/90"></div>
            </div>
          </div>

          {/* ── Timeline Nodes ── */}
          <div className="relative z-10 space-y-7 md:space-y-0">
            {timelineData.map((node, idx) => {
              const IconComponent = node.icon;
              const isEven = idx % 2 === 0;
              const isVisible = visibleNodes.has(idx);

              return (
                <div
                  key={node.year}
                  ref={el => (nodeRefs.current[idx] = el)}
                  data-idx={idx}
                  className={`
                    relative md:flex md:items-center
                    ${isEven ? 'md:justify-start' : 'md:justify-end'}
                    md:py-8 w-full
                    transition-all duration-700 ease-out
                    ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}
                  `}
                  style={{ transitionDelay: `${idx * 80}ms` }}
                >
                  {/* Desktop Milestone circle laying on central road */}
                  <div
                    className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 rounded-full items-center justify-center bg-white border-[3px] shadow-lg z-20 transition-transform duration-500 hover:scale-110"
                    style={{ borderColor: node.accentColor, boxShadow: `0 4px 20px ${node.accentColor}33` }}
                  >
                    <div
                      className={`w-9 h-9 rounded-full bg-gradient-to-br ${node.gradient} flex items-center justify-center text-white shadow-inner`}
                    >
                      <IconComponent className="h-4 w-4" />
                    </div>
                  </div>

                  {/* Mobile Milestone circle laying directly on the roadmap */}
                  <div
                    className="md:hidden absolute left-[22px] top-6 -translate-x-1/2 w-11 h-11 rounded-full flex items-center justify-center bg-white border-[2.5px] shadow-md z-20"
                    style={{ borderColor: node.accentColor, boxShadow: `0 4px 14px ${node.accentColor}40` }}
                  >
                    <div
                      className={`w-7 h-7 rounded-full bg-gradient-to-br ${node.gradient} flex items-center justify-center text-white shadow-inner`}
                    >
                      <IconComponent className="h-3.5 w-3.5" />
                    </div>
                  </div>

                  {/* Mobile Connector arm from roadmap to card */}
                  <div 
                    className="md:hidden absolute left-[28px] top-[46px] w-6 h-[2px] z-10"
                    style={{ background: `linear-gradient(to right, ${node.accentColor}, ${node.accentColor}40)` }}
                  ></div>

                  {/* ── Content Card ── */}
                  <div
                    className={`
                      relative w-[calc(100%-2.6rem)] ml-auto md:ml-0 md:w-[43%]
                      ${isEven ? 'md:ml-[2%]' : 'md:mr-[2%]'}
                    `}
                  >
                    <div className="group relative bg-white rounded-2xl border border-slate-100/90 shadow-md hover:shadow-xl transition-all duration-500 overflow-hidden">

                      {/* Top accent bar */}
                      <div
                        className={`h-1.5 w-full bg-gradient-to-r ${node.gradient}`}
                      ></div>

                      <div className="p-4 sm:p-6">

                        {/* Year + Phase Row */}
                        <div className="flex flex-wrap items-center gap-2 mb-3">
                          <span className={`px-3 py-1 rounded-full ${node.bgColor} ${node.textColor} font-black text-[12px] border ${node.borderColor} tracking-wider shadow-sm`}>
                            {node.year}
                          </span>
                          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                            {node.phase}
                          </span>
                        </div>

                        {/* Title */}
                        <h3 className="text-[16px] sm:text-[19px] font-extrabold text-slate-800 group-hover:text-insurance-darkblue transition-colors leading-snug mb-2">
                          {node.title}
                        </h3>

                        {/* Description */}
                        <p className="text-[13px] sm:text-[14px] leading-relaxed text-slate-600 font-medium">
                          {node.description}
                        </p>
                      </div>

                      {/* Bottom glow on hover */}
                      <div
                        className="absolute bottom-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                        style={{ background: `linear-gradient(to right, transparent, ${node.accentColor}, transparent)` }}
                      ></div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

        </div>

        {/* End marker */}
        <div className="flex justify-center mt-12">
          <div className="flex flex-col items-center gap-3">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-insurance-darkblue via-insurance-orange to-insurance-violet flex items-center justify-center shadow-xl shadow-purple-200/50 animate-pulse">
              <Sparkles className="h-7 w-7 text-white" />
            </div>
            <p className="text-[12px] font-black text-slate-400 uppercase tracking-[0.2em]">
              The journey continues...
            </p>
          </div>
        </div>

      </div>

      {/* ═══════════════════════════════════════════════════════
          OUR HUB SECTION
          ═══════════════════════════════════════════════════════ */}
      <section className="relative w-full rounded-3xl overflow-hidden bg-slate-900 mt-24 mb-12 z-10 py-16">
        {/* Decorative blobs */}
        <div className="absolute top-[10%] left-[-10%] w-[400px] h-[400px] rounded-full bg-insurance-darkblue/10 blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-[10%] right-[-10%] w-[400px] h-[400px] rounded-full bg-insurance-orange/10 blur-3xl pointer-events-none"></div>
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-insurance-green via-insurance-darkblue to-insurance-violet"></div>

        <div className="text-center space-y-4 mb-12 px-6">
          <h2 className="text-xs sm:text-sm font-extrabold uppercase tracking-widest text-insurance-green bg-green-950/60 border border-green-800/50 px-4 py-1.5 rounded-full w-fit mx-auto">
            OUR HUB
          </h2>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight uppercase">
            A GLIMPSE INTO <br />
            <span className="bg-gradient-to-r from-insurance-green to-teal-400 bg-clip-text text-transparent">
              OUR WORKSPACE
            </span>
          </h1>
          <p className="text-lg text-slate-400 font-medium max-w-2xl mx-auto">
            Take a tour of The Insurance Hub — designed to reflect the trust, warmth, and professionalism we offer every client.
          </p>
        </div>
        
        <ImageAutoSlider />
      </section>


      {/* Inline keyframe styles for scroll-triggered animations */}
      <style>{`
        @keyframes roadmapFadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
