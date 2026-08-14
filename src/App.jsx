import React, { useState, useEffect, useLayoutEffect } from 'react';
import { motion } from 'framer-motion';
import Header from './components/Header';
import Logo from './components/Logo';
import AboutUsPage from './components/AboutUsPage';
import { ImageAutoSlider } from './components/ui/image-auto-slider';
import { Component as Testimonials } from './components/ui/marquee-card';
import { Phone, Mail, HeartPulse, Award, Car, BarChart2, Building, ShieldCheck, ArrowRight, MessageSquare, Send } from 'lucide-react';
import { Marquee } from './components/ui/marquee';
import FAQs from './components/ui/faqs-component';
import TypewriterText from './components/ui/typewriter-text';


export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [activeTab, setActiveTab] = useState('Home');
  const [introPhase, setIntroPhase] = useState('center'); // 'center' -> 'move' -> 'done'
  const [offsets, setOffsets] = useState(null);

  useLayoutEffect(() => {
    const calculateOffsets = () => {
      const vW = window.innerWidth;
      const vH = window.innerHeight;
      const cX = vW / 2;
      const cY = vH / 2;

      const logoEl = document.getElementById('header-logo-wrapper') || document.getElementById('header-logo');
      const qEl = document.getElementById('hero-question');
      const sEl = document.getElementById('hero-statement');

      if (logoEl && qEl && sEl) {
        const lRect = logoEl.getBoundingClientRect();
        const qRect = qEl.getBoundingClientRect();
        const sRect = sEl.getBoundingClientRect();

        // On mobile, also measure the logo wrapper directly for accurate x centering
        const logoWrapperEl = document.getElementById('header-logo-wrapper');
        const lWRect = logoWrapperEl ? logoWrapperEl.getBoundingClientRect() : lRect;

        const isSmallMobile = vW < 480;
        const isMobile = vW < 768;

        // Full viewport centering — header is hidden during intro so full vH is available
        // Logo sits comfortably above center, Question in middle, Statement below with clear gaps
        const logoH = lRect.height;
        const qH = qRect.height;
        const sH = sRect.height;
        const gap = isSmallMobile ? 32 : isMobile ? 40 : 48;

        // Total block height: logo + gap + question + gap + statement
        const totalH = logoH + gap + qH + gap + sH;
        const blockTop = cY - totalH / 2;

        const logoCenter = blockTop + logoH / 2;
        const qCenter = blockTop + logoH + gap + qH / 2;
        const sCenter = blockTop + logoH + gap + qH + gap + sH / 2;

        setOffsets({
          logo: {
            // Use wrapper rect for accurate x centering on all screen sizes
            x: cX - (lWRect.left + lWRect.width / 2),
            y: logoCenter - (lWRect.top + lWRect.height / 2)
          },
          question: {
            // On mobile, question spans full width so x is already at cX — force 0 to avoid sub-pixel drift
            x: isMobile ? 0 : cX - (qRect.left + qRect.width / 2),
            y: qCenter - (qRect.top + qRect.height / 2)
          },
          statement: {
            // On mobile, statement spans full width so x is already at cX — force 0 to avoid sub-pixel drift
            x: isMobile ? 0 : cX - (sRect.left + sRect.width / 2),
            y: sCenter - (sRect.top + sRect.height / 2)
          }
        });
      }
    };

    calculateOffsets();
    window.addEventListener('resize', calculateOffsets);

    // 1. Centered for 2.2s so user can comfortably read
    // 2. Smooth continuous glide to home begins at 2.2s
    const moveTimer = setTimeout(() => {
      setIntroPhase('move');
    }, 2200);

    // 3. Completes naturally at 3.55s and locks permanently
    const doneTimer = setTimeout(() => {
      setIntroPhase('done');
    }, 3550);

    return () => {
      clearTimeout(moveTimer);
      clearTimeout(doneTimer);
      window.removeEventListener('resize', calculateOffsets);
    };
  }, []);

  const handleNavigate = (page, targetId) => {
    // 1. Immediately update the tab state so the tubelight animates smoothly
    if (page === 'about') {
      setActiveTab('About Us');
    } else if (page === 'home') {
      if (targetId === 'services') {
        setActiveTab('Services');
      } else if (targetId === 'contact') {
        setActiveTab('Contact Us');
      } else if (targetId === 'testimonials') {
        setActiveTab('Feedbacks');
      } else if (targetId === 'faqs') {
        setActiveTab('FAQs');
      } else {
        setActiveTab('Home');
      }
    }

    // 2. Page navigation with smooth scroll
    setTimeout(() => {
      setCurrentPage(page);
      
      if (page === 'home' && targetId) {
        setTimeout(() => {
          const element = document.getElementById(targetId);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        }, 50);
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }, 250);
  };

  const handleSkipIntro = () => {
    if (introPhase === 'center') {
      setIntroPhase('move');
    }
  };

  return (
    <div 
      onClick={handleSkipIntro}
      className="flex flex-col min-h-screen w-full bg-zinc-50 antialiased font-sans relative"
    >
      {/* ── Background Veil Backdrop (Uniform, Clean, Dissolves softly on move) ── */}
      {introPhase !== 'done' && (
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: introPhase === 'move' ? 0 : 1 }}
          transition={{ duration: 1.35, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-20 bg-slate-50/98 backdrop-blur-xl pointer-events-none"
        />
      )}

      {/* 1. Header Navigation */}
      <Header
        onNavigate={handleNavigate}
        currentPage={currentPage}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        introPhase={introPhase}
        logoOffset={offsets?.logo}
      />

      {currentPage === 'about' ? (
        <main className="flex-grow">
          <AboutUsPage onBack={() => { setCurrentPage('home'); setActiveTab('Home'); }} />
        </main>
      ) : (
        <>
          {/* 2. Hero Section */}
      <section className="relative z-30 overflow-hidden pt-4 pb-16 lg:pt-8 lg:pb-24 flex-grow flex items-center">
        {/* Uniform clean background */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-50/50 via-white to-slate-50/30 pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 w-full">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">

            {/* LEFT: Question, Answer & Quote */}
            <div id="hero-text-block" className="flex-1 space-y-7 relative z-30 w-full text-center">
              
              {/* Core Question -> Single-source continuous motion directly into its fixed home position */}
              <motion.h1
                id="hero-question"
                initial={false}
                animate={
                  introPhase === 'center' && offsets
                    ? { x: offsets.question.x, y: offsets.question.y, opacity: 1 }
                    : { x: 0, y: 0, opacity: 1 }
                }
                transition={{
                  duration: introPhase === 'move' ? 1.35 : 0,
                  ease: [0.22, 1, 0.36, 1]
                }}
                className="text-2xl sm:text-4xl lg:text-5xl xl:text-6xl font-extrabold tracking-tight leading-tight font-serif bg-gradient-to-r from-insurance-darkblue to-insurance-orange bg-clip-text text-transparent pb-2 uppercase relative z-30 text-center w-full"
                style={{ willChange: 'transform' }}
              >
                <TypewriterText duration={0.8}>
                  Confused about choosing the right insurance?
                </TypewriterText>
              </motion.h1>
              
              {/* Statement Block -> Single-source continuous motion directly into its fixed home position */}
              <motion.div
                id="hero-statement"
                initial={false}
                animate={
                  introPhase === 'center' && offsets
                    ? { x: offsets.statement.x, y: offsets.statement.y, opacity: 1 }
                    : { x: 0, y: 0, opacity: 1 }
                }
                transition={{
                  duration: introPhase === 'move' ? 1.35 : 0,
                  ease: [0.22, 1, 0.36, 1]
                }}
                className="space-y-4 sm:space-y-7 relative z-30 flex flex-col items-center text-center w-full"
                style={{ willChange: 'transform' }}
              >
                {/* Answer */}
                <p id="hero-answer" className="text-base sm:text-2xl lg:text-3xl font-bold text-black leading-relaxed font-sans border-insurance-orange text-center">
                  All companies, insurance and mutual funds <br className="hidden sm:inline" />
                  under one roof.
                </p>

                {/* Italic Quote */}
                <p id="hero-quote" className="text-[14px] sm:text-[19px] italic font-medium text-slate-500 tracking-wide font-serif text-center">
                  &ldquo;Secure today, protect tomorrow.&rdquo;
                </p>
              </motion.div>
            </div>

            {/* RIGHT: Moving Floating Cards Gallery */}
            <motion.div
              initial={false}
              animate={{ opacity: introPhase === 'center' ? 0 : 1 }}
              transition={{ duration: 1.35, ease: [0.22, 1, 0.36, 1] }}
              className="flex-shrink-0 w-full lg:w-[460px] xl:w-[540px] h-[340px] sm:h-[450px] xl:h-[580px] relative overflow-hidden rounded-[32px] sm:rounded-[40px] flex justify-center items-center shadow-2xl shadow-blue-900/10 border-4 sm:border-[8px] border-white/60 bg-white/30 backdrop-blur-3xl"
            >
              {/* Glow background */}
              <div className="absolute inset-0 bg-gradient-to-br from-insurance-darkblue/20 via-insurance-orange/10 to-insurance-green/20 blur-3xl z-0"></div>
              
              <div className="relative z-10 flex gap-2 sm:gap-4 w-full h-full p-2 sm:p-4">
                 {/* Left Column (Moves Up) */}
                 <Marquee vertical className="w-1/2 h-full" repeat={3} pauseOnHover>
                    <div className="w-full h-[200px] sm:h-[280px] bg-white p-1.5 sm:p-2 rounded-2xl sm:rounded-3xl shadow-xl border border-slate-100 group overflow-hidden relative cursor-pointer">
                      <div className="w-full h-full relative rounded-xl sm:rounded-2xl overflow-hidden">
                        <img src="/health_card.png" alt="Health Guard" loading="eager" decoding="async" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent"></div>
                        <div className="absolute bottom-3 sm:bottom-5 left-3 sm:left-5 right-3 sm:right-5">
                           <div className="w-7 h-7 sm:w-10 sm:h-10 rounded-full bg-blue-500/30 backdrop-blur-md flex items-center justify-center mb-1.5 sm:mb-3 border border-blue-400/30">
                              <HeartPulse size={16} className="text-white" />
                           </div>
                           <h3 className="text-white font-bold text-[13px] sm:text-lg font-sans leading-tight">Health Guard</h3>
                           <p className="text-blue-100 text-[9px] sm:text-[11px] font-semibold mt-0.5 sm:mt-1">Cashless &amp; Comprehensive</p>
                        </div>
                      </div>
                    </div>
                    <div className="w-full h-[200px] sm:h-[280px] bg-white p-1.5 sm:p-2 rounded-2xl sm:rounded-3xl shadow-xl border border-slate-100 group overflow-hidden relative cursor-pointer">
                      <div className="w-full h-full relative rounded-xl sm:rounded-2xl overflow-hidden">
                        <img src="/wealth_card.png" alt="Wealth SIP" loading="eager" decoding="async" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent"></div>
                        <div className="absolute bottom-3 sm:bottom-5 left-3 sm:left-5 right-3 sm:right-5">
                           <div className="w-7 h-7 sm:w-10 sm:h-10 rounded-full bg-purple-500/30 backdrop-blur-md flex items-center justify-center mb-1.5 sm:mb-3 border border-purple-400/30">
                              <BarChart2 size={16} className="text-white" />
                           </div>
                           <h3 className="text-white font-bold text-[13px] sm:text-lg font-sans leading-tight">Wealth SIP</h3>
                           <p className="text-purple-100 text-[9px] sm:text-[11px] font-semibold mt-0.5 sm:mt-1">Smart Mutual Funds</p>
                        </div>
                      </div>
                    </div>
                 </Marquee>

                 {/* Right Column (Moves Down) */}
                 <Marquee vertical reverse className="w-1/2 h-full" repeat={3} pauseOnHover>
                    <div className="w-full h-[200px] sm:h-[280px] bg-white p-1.5 sm:p-2 rounded-2xl sm:rounded-3xl shadow-xl border border-slate-100 group overflow-hidden relative cursor-pointer">
                      <div className="w-full h-full relative rounded-xl sm:rounded-2xl overflow-hidden">
                        <img src="/life_card.png" alt="Life Shield" loading="eager" decoding="async" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent"></div>
                        <div className="absolute bottom-3 sm:bottom-5 left-3 sm:left-5 right-3 sm:right-5">
                           <div className="w-7 h-7 sm:w-10 sm:h-10 rounded-full bg-orange-500/30 backdrop-blur-md flex items-center justify-center mb-1.5 sm:mb-3 border border-orange-400/30">
                              <Award size={16} className="text-white" />
                           </div>
                           <h3 className="text-white font-bold text-[13px] sm:text-lg font-sans leading-tight">Life Shield</h3>
                           <p className="text-orange-100 text-[9px] sm:text-[11px] font-semibold mt-0.5 sm:mt-1">Term &amp; Protection</p>
                        </div>
                      </div>
                    </div>
                    <div className="w-full h-[200px] sm:h-[280px] bg-white p-1.5 sm:p-2 rounded-2xl sm:rounded-3xl shadow-xl border border-slate-100 group overflow-hidden relative cursor-pointer">
                      <div className="w-full h-full relative rounded-xl sm:rounded-2xl overflow-hidden">
                        <img src="/motor_card.png" alt="Motor Safe" loading="eager" decoding="async" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent"></div>
                        <div className="absolute bottom-3 sm:bottom-5 left-3 sm:left-5 right-3 sm:right-5">
                           <div className="w-7 h-7 sm:w-10 sm:h-10 rounded-full bg-emerald-500/30 backdrop-blur-md flex items-center justify-center mb-1.5 sm:mb-3 border border-emerald-400/30">
                              <Car size={16} className="text-white" />
                           </div>
                           <h3 className="text-white font-bold text-[13px] sm:text-lg font-sans leading-tight">Motor Safe</h3>
                           <p className="text-emerald-100 text-[9px] sm:text-[11px] font-semibold mt-0.5 sm:mt-1">Zero Dep Covers</p>
                        </div>
                      </div>
                    </div>
                 </Marquee>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* 3. About Us Section */}
      <section className="relative py-16 sm:py-24 overflow-hidden bg-white/70 backdrop-blur-md">
        {/* Subtle background texture */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-blue-50/30 pointer-events-none"></div>
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-insurance-darkblue via-insurance-orange via-insurance-green to-insurance-violet"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">

          {/* Stats Badges */}
          <div className="flex flex-wrap justify-center gap-4 sm:gap-8 mb-12 sm:mb-16">
            {/* 25 Years Badge */}
            <div className="relative group">
              <div className="w-36 h-36 sm:w-44 sm:h-44 rounded-full bg-gradient-to-br from-insurance-darkblue to-blue-700 flex flex-col items-center justify-center shadow-2xl shadow-blue-300/40 border-4 border-white ring-4 ring-insurance-darkblue/10 transition-transform duration-500 group-hover:scale-105">
                <span className="text-4xl sm:text-5xl font-black text-white leading-none">25+</span>
                <span className="text-[11px] sm:text-sm font-bold text-blue-100 tracking-wider uppercase mt-1">Years</span>
                <span className="text-[9px] sm:text-[10px] font-semibold text-blue-200 uppercase tracking-widest">Experience</span>
              </div>
            </div>

            {/* 5 Crore+ Portfolio Badge */}
            <div className="relative group">
              <div className="w-36 h-36 sm:w-44 sm:h-44 rounded-full bg-gradient-to-br from-insurance-orange to-amber-600 flex flex-col items-center justify-center shadow-2xl shadow-orange-300/40 border-4 border-white ring-4 ring-insurance-orange/10 transition-transform duration-500 group-hover:scale-105">
                <span className="text-3xl sm:text-4xl font-black text-white leading-none">5 Cr+</span>
                <span className="text-[11px] sm:text-sm font-bold text-orange-100 tracking-wider uppercase mt-1">Portfolio</span>
                <span className="text-[9px] sm:text-[10px] font-semibold text-orange-200 uppercase tracking-widest">Under Management</span>
              </div>
            </div>
          </div>

          {/* Description Text */}
          <div className="max-w-4xl mx-auto text-center mb-16 sm:mb-20">
            <p className="text-[15px] sm:text-[19px] leading-[1.8] sm:leading-[1.9] text-slate-700 font-medium font-sans tracking-wide">
              At <span className="font-extrabold text-insurance-darkblue">The Insurance Hub</span>, we are committed to helping individuals, families, and businesses make confident and informed insurance decisions through trusted guidance and years of industry experience. With expertise across life, health, and general insurance, we simplify complex policies and provide honest, transparent advice tailored to every client's unique needs.
            </p>
            <p className="text-[15px] sm:text-[19px] leading-[1.8] sm:leading-[1.9] text-slate-700 font-medium font-sans tracking-wide mt-4 sm:mt-6">
              Our team works with reputed insurance providers to offer unbiased plan comparisons, personalized recommendations, and complete support from choosing the right policy to claim assistance. We believe insurance is not just about coverage, but about protecting what matters most and building long-term trust through <span className="font-extrabold text-insurance-orange">clarity</span>, <span className="font-extrabold text-insurance-green">reliability</span>, and <span className="font-extrabold text-insurance-violet">dedicated service</span>.
            </p>
          </div>

          {/* Profile Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-stretch max-w-[90rem] mx-auto lg:px-6">

            {/* Card 1 - Adarsh & Vaishali Bafna */}
            <div className="relative w-full bg-white rounded-3xl overflow-hidden shadow-2xl border border-slate-100 flex flex-col lg:flex-row group hover:shadow-2xl hover:shadow-blue-200/80 hover:bg-blue-50/20 transition-all duration-500">
              {/* Gradient top accent bar */}
              <div className="absolute top-0 left-0 right-0 lg:bottom-0 lg:right-auto lg:w-1 lg:h-full h-1 bg-gradient-to-r lg:bg-gradient-to-b from-insurance-darkblue to-insurance-orange z-10"></div>

              {/* Photo */}
              <div className="w-full lg:w-[260px] xl:w-[290px] flex-shrink-0 relative overflow-hidden bg-slate-50 flex items-center justify-center">
                <img
                  src="/founders_new.jpg"
                  alt="Adarsh and Vaishali Bafna"
                  loading="lazy"
                  decoding="async"
                  className="w-full h-[320px] sm:h-[380px] lg:h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
                />
              </div>

              {/* Info */}
              <div className="flex-1 p-5 xl:p-6 flex flex-col justify-center">
                  <div className="inline-flex items-center gap-1.5 bg-blue-50 text-insurance-darkblue text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full mb-3 w-fit border border-blue-100">
                    Founders
                  </div>
                  <h2 className="text-xl sm:text-2xl font-black text-slate-900 leading-tight font-sans">
                    Adarsh &amp; Vaishali Bafna
                  </h2>
                  <div className="mt-2.5 w-10 h-1 rounded-full bg-gradient-to-r from-insurance-darkblue to-insurance-orange"></div>
                  
                  <div className="mt-4 flex flex-col gap-3">
                    {/* Adarsh */}
                    <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-100 group-hover:bg-white group-hover:shadow-sm transition-all">
                      <p className="font-bold text-insurance-darkblue text-[14px]">Adarsh G. Bafna</p>
                      <p className="text-[11px] text-slate-600 font-bold text-insurance-orange">Insurance Advisor &nbsp;|&nbsp; 25+ yrs Exp</p>
                      <div className="mt-2 pt-2 border-t border-slate-200 flex flex-wrap gap-x-4 gap-y-1 text-[11px] font-semibold">
                         <a href="tel:+919175033300" className="flex items-center gap-1 hover:text-insurance-darkblue"><Phone className="h-3 w-3"/> 91750 33300</a>
                         <a href="https://mail.google.com/mail/?view=cm&fs=1&to=theinsurancehub70@gmail.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:text-insurance-orange"><Mail className="h-3 w-3 flex-shrink-0"/> theinsurancehub70@gmail.com</a>
                      </div>
                    </div>
                    
                    {/* Vaishali */}
                    <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-100 group-hover:bg-white group-hover:shadow-sm transition-all">
                      <p className="font-bold text-insurance-darkblue text-[14px]">Vaishali A. Bafna</p>
                      <p className="text-[11px] text-slate-600 font-bold text-insurance-orange">Senior Sales Manager &nbsp;|&nbsp; 15+ yrs Exp</p>
                      <div className="mt-2 pt-2 border-t border-slate-200 flex flex-wrap gap-x-4 gap-y-1 text-[11px] font-semibold">
                         <a href="tel:+919112063150" className="flex items-center gap-1 hover:text-insurance-darkblue"><Phone className="h-3 w-3"/> 91120 63150</a>
                         <a href="https://mail.google.com/mail/?view=cm&fs=1&to=bafana.vaishali@starinsurance.in" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:text-insurance-orange"><Mail className="h-3 w-3 flex-shrink-0"/> bafana.vaishali@starinsurance.in</a>
                      </div>
                    </div>
                  </div>
              </div>
            </div>

            {/* Card 2 - Divyesh Bafna */}
            <div className="relative w-full bg-white rounded-3xl overflow-hidden shadow-xl border border-slate-100 flex flex-col lg:flex-row group hover:shadow-2xl hover:shadow-orange-200/80 hover:bg-orange-50/20 transition-all duration-500">
              {/* Gradient top accent bar */}
              <div className="absolute top-0 left-0 right-0 lg:bottom-0 lg:right-auto lg:w-1 lg:h-full h-1 bg-gradient-to-r lg:bg-gradient-to-b from-insurance-orange to-insurance-violet z-10"></div>

              {/* Photo */}
              <div className="w-full lg:w-[260px] xl:w-[290px] flex-shrink-0 relative overflow-hidden bg-slate-50 flex items-center justify-center">
                <img
                  src="/divyesh_new.jpg"
                  alt="Divyesh Bafna"
                  loading="lazy"
                  decoding="async"
                  className="w-full h-[320px] sm:h-[380px] lg:h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
                />
              </div>

              {/* Info */}
              <div className="flex-1 p-5 xl:p-6 flex flex-col justify-center">
                  <div className="inline-flex items-center gap-1.5 bg-orange-50 text-insurance-orange text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full mb-3 w-fit border border-orange-100">
                    Director
                  </div>
                  <h2 className="text-xl sm:text-2xl font-black text-slate-900 leading-tight font-sans">
                    Divyesh Bafna
                  </h2>
                  <div className="mt-2.5 w-10 h-1 rounded-full bg-gradient-to-r from-insurance-orange to-insurance-violet"></div>
                  
                  <div className="mt-4 flex flex-col gap-3">
                    <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-100 group-hover:bg-white group-hover:shadow-sm transition-all">
                      <p className="font-bold text-insurance-orange text-[14px]">Divyesh Adarsh Bafna</p>
                      <p className="text-[11px] text-slate-600 font-bold text-insurance-darkblue">Mutual Fund Distributor &nbsp;|&nbsp; Chief AP</p>
                      <div className="mt-2 pt-2 border-t border-slate-200 flex flex-wrap gap-x-4 gap-y-1 text-[11px] font-semibold">
                         <a href="tel:+919423924568" className="flex items-center gap-1 hover:text-insurance-orange"><Phone className="h-3 w-3"/> 94239 24568</a>
                         <a href="https://mail.google.com/mail/?view=cm&fs=1&to=bafnadivyesh405@gmail.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:text-insurance-violet"><Mail className="h-3 w-3 flex-shrink-0"/> bafnadivyesh405@gmail.com</a>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <span className="text-[11px] font-semibold text-insurance-darkblue bg-blue-50 px-3 py-1.5 rounded-full border border-blue-100">Strategy</span>
                    <span className="text-[11px] font-semibold text-insurance-violet bg-purple-50 px-3 py-1.5 rounded-full border border-purple-100">Digital Innovation</span>
                  </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          SERVICES SECTION (Home Page)
          ═══════════════════════════════════════════════════════ */}
      <section id="services" className="relative py-24 overflow-hidden bg-white">
        {/* Subtle background glow */}
        <div className="absolute top-[30%] left-[-10%] w-[500px] h-[500px] rounded-full bg-blue-50/50 blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-[10%] right-[-10%] w-[500px] h-[500px] rounded-full bg-orange-50/50 blur-3xl pointer-events-none"></div>
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          
          {/* Section Heading */}
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-xs sm:text-sm font-extrabold uppercase tracking-widest text-insurance-orange bg-orange-50 border border-orange-100 px-4 py-1.5 rounded-full w-fit mx-auto">
              OUR SERVICES
            </h2>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight uppercase">
              COMPREHENSIVE COVERAGE <br />
              <span className="bg-gradient-to-r from-insurance-darkblue to-insurance-orange bg-clip-text text-transparent">
                UNDER ONE ROOF
              </span>
            </h1>
            <p className="text-lg text-slate-600 font-medium max-w-2xl mx-auto">
              We partner with all leading providers to offer unbiased advice, complete transparency, and hassle-free claim settlements.
            </p>
          </div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            
            {/* Service 1: Health Insurance */}
            <div className="group relative bg-slate-50 hover:bg-white rounded-3xl p-8 border border-slate-100 hover:border-blue-200/60 shadow-sm hover:shadow-2xl hover:shadow-blue-100/50 transition-all duration-500 flex flex-col justify-between overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-insurance-darkblue opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div>
                <div className="w-14 h-14 rounded-2xl bg-blue-50 text-insurance-darkblue flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500 border border-blue-100/50">
                  <HeartPulse size={28} className="stroke-[2.2]" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-insurance-darkblue transition-colors">Health Insurance</h3>
                <p className="text-[14px] text-slate-500 font-medium leading-relaxed">
                  Protect yourself and your family against rising medical inflation. Access comprehensive covers including cashless treatments, OPD visits, critical illnesses, and top-up health plans.
                </p>
              </div>
              <div className="mt-8 flex items-center justify-between border-t border-slate-200/50 pt-4">
                <span className="text-[12px] font-bold text-insurance-darkblue/70">ALL LEADING COMPANIES</span>
                <a href="#contact" onClick={(e) => { e.preventDefault(); handleNavigate('home', 'contact'); }} className="text-slate-400 group-hover:text-insurance-darkblue flex items-center gap-1.5 text-xs font-bold transition-colors">
                  Get Quote <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </div>

            {/* Service 2: Term Life Insurance */}
            <div className="group relative bg-slate-50 hover:bg-white rounded-3xl p-8 border border-slate-100 hover:border-orange-200/60 shadow-sm hover:shadow-2xl hover:shadow-orange-100/50 transition-all duration-500 flex flex-col justify-between overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-400 to-insurance-orange opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div>
                <div className="w-14 h-14 rounded-2xl bg-orange-50 text-insurance-orange flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500 border border-orange-100/50">
                  <Award size={28} className="stroke-[2.2]" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-insurance-orange transition-colors">Term Life Insurance</h3>
                <p className="text-[14px] text-slate-500 font-medium leading-relaxed">
                  Secure your family's future even in your absence. Compare high-value life protection policies offering high coverage limits at extremely affordable premiums, with custom riders.
                </p>
              </div>
              <div className="mt-8 flex items-center justify-between border-t border-slate-200/50 pt-4">
                <span className="text-[12px] font-bold text-insurance-orange/70">100% SECURE CLAIM</span>
                <a href="#contact" onClick={(e) => { e.preventDefault(); handleNavigate('home', 'contact'); }} className="text-slate-400 group-hover:text-insurance-orange flex items-center gap-1.5 text-xs font-bold transition-colors">
                  Get Quote <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </div>

            {/* Service 3: Motor & Car Insurance */}
            <div className="group relative bg-slate-50 hover:bg-white rounded-3xl p-8 border border-slate-100 hover:border-emerald-200/60 shadow-sm hover:shadow-2xl hover:shadow-emerald-100/50 transition-all duration-500 flex flex-col justify-between overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-400 to-insurance-green opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div>
                <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-insurance-green flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500 border border-emerald-100/50">
                  <Car size={28} className="stroke-[2.2]" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-insurance-green transition-colors">Motor &amp; Car Insurance</h3>
                <p className="text-[14px] text-slate-500 font-medium leading-relaxed">
                  Fast quotes and complete coverage for private cars, corporate vehicle fleets, two-wheelers, and commercial cargo trucks, featuring bumper-to-bumper and zero-depreciation add-ons.
                </p>
              </div>
              <div className="mt-8 flex items-center justify-between border-t border-slate-200/50 pt-4">
                <span className="text-[12px] font-bold text-insurance-green/70">INSTANT PAPERLESS ISSUANCE</span>
                <a href="#contact" onClick={(e) => { e.preventDefault(); handleNavigate('home', 'contact'); }} className="text-slate-400 group-hover:text-insurance-green flex items-center gap-1.5 text-xs font-bold transition-colors">
                  Get Quote <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </div>

            {/* Service 4: Mutual Funds & SIP */}
            <div className="group relative bg-slate-50 hover:bg-white rounded-3xl p-8 border border-slate-100 hover:border-purple-200/60 shadow-sm hover:shadow-2xl hover:shadow-purple-100/50 transition-all duration-500 flex flex-col justify-between overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-400 to-insurance-violet opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div>
                <div className="w-14 h-14 rounded-2xl bg-purple-50 text-insurance-violet flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500 border border-purple-100/50">
                  <BarChart2 size={28} className="stroke-[2.2]" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-insurance-violet transition-colors">Mutual Funds &amp; SIP</h3>
                <p className="text-[14px] text-slate-500 font-medium leading-relaxed">
                  Start building long-term wealth. Our certified mutual fund distribution desk provides smart SIP planning, asset allocation, and personalized portfolio tracking based on your goals.
                </p>
              </div>
              <div className="mt-8 flex items-center justify-between border-t border-slate-200/50 pt-4">
                <span className="text-[12px] font-bold text-insurance-violet/70">TOP MUTUAL FUNDS AVAILABLE</span>
                <a href="#contact" onClick={(e) => { e.preventDefault(); handleNavigate('home', 'contact'); }} className="text-slate-400 group-hover:text-insurance-violet flex items-center gap-1.5 text-xs font-bold transition-colors">
                  Get Quote <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </div>

            {/* Service 5: Business & Commercial Cover */}
            <div className="group relative bg-slate-50 hover:bg-white rounded-3xl p-8 border border-slate-100 hover:border-slate-300 shadow-sm hover:shadow-2xl hover:shadow-slate-200/50 transition-all duration-500 flex flex-col justify-between overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-slate-400 to-slate-800 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div>
                <div className="w-14 h-14 rounded-2xl bg-slate-100 text-slate-700 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500 border border-slate-200/50">
                  <Building size={28} className="stroke-[2.2]" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-slate-800 transition-colors">Business Insurance</h3>
                <p className="text-[14px] text-slate-500 font-medium leading-relaxed">
                  Mitigate your business liabilities. We distribute marine transit insurance, fire policies, shopkeepers coverage, employee health covers, and customized general commercial risks.
                </p>
              </div>
              <div className="mt-8 flex items-center justify-between border-t border-slate-200/50 pt-4">
                <span className="text-[12px] font-bold text-slate-500">COMPLETE BUSINESS RISK COVERS</span>
                <a href="#contact" onClick={(e) => { e.preventDefault(); handleNavigate('home', 'contact'); }} className="text-slate-400 group-hover:text-slate-800 flex items-center gap-1.5 text-xs font-bold transition-colors">
                  Get Quote <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </div>

            {/* Service 6: Claims Assistance Desk */}
            <div className="group relative bg-slate-50 hover:bg-white rounded-3xl p-8 border border-slate-100 hover:border-blue-200/60 shadow-sm hover:shadow-2xl hover:shadow-blue-100/50 transition-all duration-500 flex flex-col justify-between overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-400 to-teal-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div>
                <div className="w-14 h-14 rounded-2xl bg-teal-50 text-teal-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500 border border-teal-100/50">
                  <ShieldCheck size={28} className="stroke-[2.2]" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-teal-600 transition-colors">Claims Assistance Desk</h3>
                <p className="text-[14px] text-slate-500 font-medium leading-relaxed">
                  Stuck with a delayed claim? We offer end-to-end guidance to resolve your health, term, and general insurance claims smoothly. Get professional review and transparent support desk help.
                </p>
              </div>
              <div className="mt-8 flex items-center justify-between border-t border-slate-200/50 pt-4">
                <span className="text-[12px] font-bold text-teal-600">DEDICATED SUPPORT DESK</span>
                <a href="#contact" onClick={(e) => { e.preventDefault(); handleNavigate('home', 'contact'); }} className="text-slate-400 group-hover:text-teal-600 flex items-center gap-1.5 text-xs font-bold transition-colors">
                  Get Support <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          OUR HUB SECTION (Home Page)
          ═══════════════════════════════════════════════════════ */}
      <section className="relative py-20 overflow-hidden bg-slate-900">
        {/* Background decorative blobs */}
        <div className="absolute top-[10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-insurance-darkblue/10 blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-[10%] right-[-10%] w-[500px] h-[500px] rounded-full bg-insurance-orange/10 blur-3xl pointer-events-none"></div>
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-insurance-green via-insurance-darkblue to-insurance-violet"></div>
        
        <div className="text-center space-y-4 mb-14 relative z-10 px-6">
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
        
        <div className="relative z-10">
          <ImageAutoSlider />
        </div>
      </section>


      {/* ═══════════════════════════════════════════════════════
          TESTIMONIALS SECTION (Home Page)
          ═══════════════════════════════════════════════════════ */}
      <section id="testimonials" className="relative py-24 overflow-hidden bg-zinc-50 border-t border-b border-slate-100">
        {/* Background decorative elements */}
        <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] rounded-full bg-blue-100/20 blur-3xl animate-blob"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-orange-100/20 blur-3xl animate-blob animation-delay-2000"></div>

        <div className="max-w-7xl mx-auto px-6 relative z-10 w-full">
          {/* Section Heading */}
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-xs sm:text-sm font-extrabold uppercase tracking-widest text-insurance-orange bg-orange-50 border border-orange-100 px-4 py-1.5 rounded-full w-fit mx-auto font-sans">
              TESTIMONIALS
            </h2>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight uppercase font-sans">
              WHAT OUR CUSTOMERS <br />
              <span className="bg-gradient-to-r from-insurance-darkblue to-insurance-orange bg-clip-text text-transparent">
                SAY ABOUT US
              </span>
            </h1>
            <p className="text-lg text-slate-600 font-medium max-w-2xl mx-auto font-sans">
              Real feedback from families and businesses who trust The Insurance Hub to secure their future.
            </p>
          </div>

          <Testimonials />
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          FAQS SECTION (Home Page)
          ═══════════════════════════════════════════════════════ */}
      <FAQs />

      {/* ═══════════════════════════════════════════════════════
          CONTACT US SECTION (Home Page)
          ═══════════════════════════════════════════════════════ */}
      <section id="contact" className="relative py-24 overflow-hidden bg-white">
        {/* Decorative elements */}
        <div className="absolute top-[20%] left-[-10%] w-[400px] h-[400px] rounded-full bg-violet-50/50 blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-[20%] right-[-10%] w-[450px] h-[450px] rounded-full bg-blue-50/50 blur-3xl pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          
          {/* Header */}
          <div className="text-left space-y-4 mb-16">
            <h2 className="text-xs sm:text-sm font-extrabold uppercase tracking-widest text-insurance-orange bg-orange-50 border border-orange-100 px-4 py-1.5 rounded-full w-fit">
              CONTACT US
            </h2>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight uppercase">
              LET'S START A <br />
              <span className="bg-gradient-to-r from-insurance-darkblue to-insurance-orange bg-clip-text text-transparent">
                CONVERSATION
              </span>
            </h1>
            <p className="text-lg text-slate-600 font-medium max-w-2xl">
              Confused about your choice? Get a free consultation, premium comparison, or claim checkup with our experts.
            </p>
          </div>

          <div className="flex flex-col lg:flex-row gap-12 items-stretch">
            
            {/* Left side: Contact Form */}
            <div className="flex-1 bg-slate-50/80 backdrop-blur-md p-8 sm:p-10 rounded-3xl border border-slate-100 shadow-xl shadow-slate-100/50">
              <h3 className="text-2xl font-black text-slate-900 mb-6 flex items-center gap-2 font-sans">
                <MessageSquare size={24} className="text-insurance-orange" /> Request a Callback
              </h3>
              
              <form onSubmit={(e) => { 
                e.preventDefault(); 
                const fd = new FormData(e.target);
                const text = `*New Request from Website*\n\n*Name:* ${fd.get('name')}\n*Phone:* ${fd.get('phone')}\n*Email:* ${fd.get('email')}\n*Category:* ${fd.get('category')}\n*Message:* ${fd.get('message')}`;
                window.open(`https://api.whatsapp.com/send?phone=919423924568&text=${encodeURIComponent(text)}`, '_blank');
              }} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[12px] font-extrabold uppercase tracking-wider text-slate-500">Your Name</label>
                    <input 
                      type="text" 
                      name="name"
                      required 
                      placeholder="Enter full name" 
                      className="w-full px-5 py-3.5 bg-white border border-slate-200 rounded-2xl text-[14px] text-slate-800 outline-none focus:border-insurance-darkblue transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[12px] font-extrabold uppercase tracking-wider text-slate-500">Phone Number</label>
                    <input 
                      type="tel" 
                      name="phone"
                      required 
                      placeholder="Enter mobile number" 
                      className="w-full px-5 py-3.5 bg-white border border-slate-200 rounded-2xl text-[14px] text-slate-800 outline-none focus:border-insurance-darkblue transition-all"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[12px] font-extrabold uppercase tracking-wider text-slate-500">Email Address</label>
                    <input 
                      type="email" 
                      name="email"
                      required 
                      placeholder="Enter email address" 
                      className="w-full px-5 py-3.5 bg-white border border-slate-200 rounded-2xl text-[14px] text-slate-800 outline-none focus:border-insurance-darkblue transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[12px] font-extrabold uppercase tracking-wider text-slate-500">Interest Category</label>
                    <select 
                      name="category"
                      className="w-full px-5 py-3.5 bg-white border border-slate-200 rounded-2xl text-[14px] text-slate-500 outline-none focus:border-insurance-darkblue transition-all font-semibold"
                    >
                      <option>Health Insurance</option>
                      <option>Term Life Insurance</option>
                      <option>Motor &amp; Car Insurance</option>
                      <option>Mutual Funds &amp; SIP</option>
                      <option>Claims Assistance</option>
                      <option>General / Business Insurance</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[12px] font-extrabold uppercase tracking-wider text-slate-500">Your Message</label>
                  <textarea 
                    name="message"
                    rows={4} 
                    required 
                    placeholder="Tell us about your requirements (e.g. family size, vehicle details, claims issue)" 
                    className="w-full px-5 py-3.5 bg-white border border-slate-200 rounded-2xl text-[14px] text-slate-800 outline-none focus:border-insurance-darkblue transition-all resize-none font-medium"
                  ></textarea>
                </div>

                <button 
                  type="submit" 
                  className="w-full py-4 px-6 bg-gradient-to-r from-insurance-darkblue to-blue-700 hover:from-blue-700 hover:to-insurance-darkblue text-white font-extrabold text-[15px] rounded-2xl transition-all duration-300 shadow-lg shadow-blue-100 flex items-center justify-center gap-2 group hover:scale-[1.01]"
                >
                  Send Request <Send size={16} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </form>
            </div>

            {/* Right side: Contact Cards & Info */}
            <div className="w-full lg:w-[400px] flex flex-col justify-between gap-6">
              
              {/* Call desk */}
              <div className="bg-slate-50 border border-slate-100 p-6 rounded-3xl hover:shadow-lg transition-all">
                <h4 className="text-xs font-black uppercase text-insurance-orange tracking-widest mb-3">Direct Call Desk</h4>
                <div className="space-y-4">
                  <div className="flex justify-between items-center text-[14px] font-bold text-slate-800 border-b border-slate-200/60 pb-2.5">
                    <span>Adarsh Bafna</span>
                    <a href="tel:+919175033300" className="text-insurance-darkblue hover:underline">+91 91750 33300</a>
                  </div>
                  <div className="flex justify-between items-center text-[14px] font-bold text-slate-800 border-b border-slate-200/60 pb-2.5">
                    <span>Vaishali Bafna</span>
                    <a href="tel:+919112063150" className="text-insurance-darkblue hover:underline">+91 91120 63150</a>
                  </div>
                  <div className="flex justify-between items-center text-[14px] font-bold text-slate-800">
                    <span>Divyesh Bafna</span>
                    <a href="tel:+919423924568" className="text-insurance-orange hover:underline">+91 94239 24568</a>
                  </div>
                </div>
              </div>

              {/* Email Card */}
              <div className="bg-slate-50 border border-slate-100 p-6 rounded-3xl hover:shadow-lg transition-all flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-blue-50 text-insurance-darkblue flex items-center justify-center border border-blue-100/50">
                  <Mail size={22} className="stroke-[2.2]" />
                </div>
                <div>
                  <h4 className="text-[11px] font-black uppercase text-slate-400 tracking-wider">Email Us</h4>
                  <a href="mailto:theinsurancehub70@gmail.com" className="text-[15px] font-extrabold text-slate-800 hover:text-insurance-darkblue truncate block">
                    theinsurancehub70@gmail.com
                  </a>
                </div>
              </div>

              {/* Address Card */}
              <div className="bg-slate-50 border border-slate-100 p-6 rounded-3xl hover:shadow-lg transition-all flex items-start gap-4 flex-1">
                <div className="w-12 h-12 rounded-2xl bg-orange-50 text-insurance-orange flex items-center justify-center border border-orange-100/50 flex-shrink-0">
                  <Building size={22} className="stroke-[2.2]" />
                </div>
                <div>
                  <h4 className="text-[11px] font-black uppercase text-slate-400 tracking-wider">Registered Corporate Office</h4>
                  <p className="text-[13px] font-bold text-slate-800 mt-1 leading-relaxed">
                    The Insurance Hub, Shop no. 57, Sanman Prestige, Beside Zilla Parishad, Railway station road, Nanded - 431601
                  </p>
                  <a 
                    href="https://www.google.com/maps/search/?api=1&query=The+Insurance+Hub,+Shop+no.+57,+Sanman+Prestige,+Beside+Zilla+Parishad,+Railway+Station+Road,+Nanded+431601" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="inline-flex items-center gap-1.5 text-xs font-black text-insurance-orange mt-3 hover:underline"
                  >
                    Open in Google Maps <ArrowRight size={12} />
                  </a>
                </div>
              </div>

            </div>

          </div>

        </div>
      </section>
        </>
      )}

      {/* 4. Comprehensive Footer */}
      <footer className="bg-slate-900 text-slate-400 pt-20 pb-12 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 lg:grid-cols-3 gap-12 pb-16 border-b border-slate-800">
          
          {/* Col 1: About company */}
          <div className="lg:col-span-1 space-y-6 text-left">
            <Logo className="h-14" dark={true} />
            <p className="text-[13px] text-slate-400 leading-relaxed font-medium">
              TheInsuranceHub is one of India's premier online insurance comparison platforms. We bring together all major companies, policies, health plans, term protections, and mutual funds under one single roof with 100% transparency.
            </p>
          </div>


          {/* Col 2: Quick Links */}
          <div className="text-left space-y-4">
            <h4 className="text-white font-bold text-[14px] uppercase tracking-wider">Insurance Categories</h4>
            <ul className="text-[13px] space-y-2.5 font-medium">
              <li><a href="#contact" onClick={(e) => { e.preventDefault(); handleNavigate('home', 'contact'); }} className="hover:text-white transition-colors cursor-pointer">Term Life Insurance</a></li>
              <li><a href="#contact" onClick={(e) => { e.preventDefault(); handleNavigate('home', 'contact'); }} className="hover:text-white transition-colors cursor-pointer">Health Insurance</a></li>
              <li><a href="#contact" onClick={(e) => { e.preventDefault(); handleNavigate('home', 'contact'); }} className="hover:text-white transition-colors cursor-pointer">Car &amp; Motor Insurance</a></li>
              <li><a href="#contact" onClick={(e) => { e.preventDefault(); handleNavigate('home', 'contact'); }} className="hover:text-white transition-colors cursor-pointer">Travel Protection</a></li>
              <li><a href="#contact" onClick={(e) => { e.preventDefault(); handleNavigate('home', 'contact'); }} className="hover:text-white transition-colors cursor-pointer">Business Coverage</a></li>
            </ul>
          </div>

          {/* Col 3: Office Address */}
          <div className="text-left space-y-5">
            <h4 className="text-white font-bold text-[14px] uppercase tracking-wider">Our Office</h4>
            <div className="space-y-4">
              <div>
                <p className="text-[11px] text-slate-500 font-semibold uppercase tracking-wider mb-1">Registered Corporate Office</p>
                <a 
                  href="https://www.google.com/maps/search/?api=1&query=The+Insurance+Hub,+Shop+no.+57,+Sanman+Prestige,+Beside+Zilla+Parishad,+Railway+Station+Road,+Nanded+431601"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[13px] text-slate-300 font-medium leading-relaxed hover:text-insurance-orange transition-colors block"
                  title="View on Google Maps"
                >
                  The Insurance Hub, Shop no. 57, Sanman Prestige,<br />
                  Beside Zilla Parishad, Railway Station Road,<br />
                  Nanded - 431601
                </a>
              </div>
              <div>
                <p className="text-[11px] text-slate-500 font-semibold uppercase tracking-wider mb-1">Contact</p>
                <a href="tel:+919175033300" className="text-[13px] text-slate-300 font-medium hover:text-white transition-colors block">+91 91750 33300</a>
                <a href="https://mail.google.com/mail/?view=cm&fs=1&to=theinsurancehub.nanded@gmail.com" target="_blank" rel="noopener noreferrer" className="text-[13px] text-slate-300 font-medium hover:text-white transition-colors block mt-1">theinsurancehub.nanded@gmail.com</a>
              </div>
            </div>
          </div>



        </div>


      </footer>
</div>
  );
}


