import React, { useState, useEffect, useLayoutEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Header from './components/Header';
import Logo from './components/Logo';
import AboutUsPage from './components/AboutUsPage';
import ServicesPage from './components/ServicesPage';
import ContactUsPage from './components/ContactUsPage';
import { ImageAutoSlider } from './components/ui/image-auto-slider';
import { Component as Testimonials } from './components/ui/marquee-card';
import FeedbackForm from './components/FeedbackForm';
import { 
  Phone, 
  Mail, 
  HeartPulse, 
  Award, 
  Car, 
  BarChart2, 
  Building, 
  ShieldCheck, 
  ArrowRight, 
  MessageSquare, 
  Send, 
  CheckCircle2, 
  Sparkles 
} from 'lucide-react';
import { Marquee } from './components/ui/marquee';
import FAQs from './components/ui/faqs-component';
import TypewriterText from './components/ui/typewriter-text';

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [activeTab, setActiveTab] = useState('Home');
  // Intro: true = show overlay, false = show main content
  const [showIntro, setShowIntro] = useState(true);

  // Force scroll to top before anything renders (defeats browser scroll restoration)
  useLayoutEffect(() => {
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
    if (window.location.hash) {
      window.history.replaceState(null, '', window.location.pathname);
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    const onPageShow = () => window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    window.addEventListener('pageshow', onPageShow);
    return () => window.removeEventListener('pageshow', onPageShow);
  }, []);

  // Lock body scroll while intro is showing, release when done
  useEffect(() => {
    if (showIntro) {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });

      // Auto-dismiss intro after 2.8s
      const timer = setTimeout(() => setShowIntro(false), 2800);
      return () => {
        clearTimeout(timer);
        document.body.style.overflow = '';
        document.documentElement.style.overflow = '';
      };
    } else {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    }
  }, [showIntro]);

  const handleNavigate = (page, targetId) => {
    if (page === 'about') {
      setActiveTab('About Us');
    } else if (page === 'services') {
      setActiveTab('Services');
    } else if (page === 'contact') {
      setActiveTab('Contact Us');
    } else if (page === 'home') {
      if (targetId === 'services') {
        setActiveTab('Services');
        setCurrentPage('services');
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      } else if (targetId === 'contact') setActiveTab('Contact Us');
      else if (targetId === 'testimonials' || targetId === 'feedback') setActiveTab('Feedbacks');
      else if (targetId === 'faqs') setActiveTab('FAQs');
      else setActiveTab('Home');
    }

    setTimeout(() => {
      setCurrentPage(page);
      if (page === 'home' && targetId) {
        setTimeout(() => {
          const element = document.getElementById(targetId);
          if (element) element.scrollIntoView({ behavior: 'smooth' });
        }, 50);
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }, 200);
  };

  return (
    <div className="flex flex-col min-h-screen w-full max-w-full overflow-x-clip bg-zinc-50 antialiased font-sans relative">

      {/* ── ICICI-style Intro Overlay ── */}
      <AnimatePresence>
        {showIntro && (
          <motion.div
            key="intro-overlay"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0 } }}
            className="fixed inset-0 z-[999] flex flex-col items-center justify-center bg-white px-6"
            onClick={() => setShowIntro(false)}
          >
            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, scale: 0.85, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="mb-8 sm:mb-10"
            >
              <Logo className="h-24 sm:h-28 lg:h-32" />
            </motion.div>

            {/* Tagline Question */}
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35, ease: 'easeOut' }}
              className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight font-serif bg-gradient-to-r from-insurance-darkblue to-insurance-orange bg-clip-text text-transparent uppercase text-center max-w-3xl mb-5"
            >
              Confused about choosing the right insurance?
            </motion.h1>

            {/* Answer */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6, ease: 'easeOut' }}
              className="text-base sm:text-2xl font-bold text-slate-800 text-center leading-relaxed"
            >
              All companies, insurance and mutual funds under one roof.
            </motion.p>

            {/* Italic Quote */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.9, ease: 'easeOut' }}
              className="text-sm sm:text-lg italic font-medium text-slate-400 tracking-wide font-serif text-center mt-4"
            >
              &ldquo;Secure today, protect tomorrow.&rdquo;
            </motion.p>

            {/* Loading bar — like ICICI */}
            <motion.div
              className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-insurance-darkblue via-insurance-orange to-insurance-green"
              initial={{ width: '0%' }}
              animate={{ width: '100%' }}
              transition={{ duration: 2.6, ease: 'linear' }}
            />

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.4 }}
              className="absolute bottom-4 text-xs text-slate-300 tracking-widest"
            >
              tap anywhere to skip
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>



      {/* 1. Header Navigation */}
      <Header
        onNavigate={handleNavigate}
        currentPage={currentPage}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />

      {currentPage === 'about' ? (
        <main className="flex-grow">
          <AboutUsPage onBack={() => { setCurrentPage('home'); setActiveTab('Home'); }} />
        </main>
      ) : currentPage === 'services' ? (
        <main className="flex-grow">
          <ServicesPage 
            onBack={() => { setCurrentPage('home'); setActiveTab('Home'); }} 
            onNavigate={handleNavigate}
          />
        </main>
      ) : currentPage === 'contact' ? (
        <main className="flex-grow">
          <ContactUsPage 
            onBack={() => { setCurrentPage('home'); setActiveTab('Home'); }} 
            onNavigate={handleNavigate}
          />
        </main>
      ) : (
        <>
          {/* 2. Hero Section */}
      <section className="relative z-30 pt-4 pb-16 lg:pt-8 lg:pb-24 flex-grow flex items-center overflow-hidden w-full">
        {/* Uniform clean background */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-50/50 via-white to-slate-50/30 pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 w-full">
          <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-14">

            {/* LEFT: Question, Answer & Quote */}
            <div id="hero-text-block" className="flex-1 space-y-6 sm:space-y-7 relative z-30 w-full text-center lg:text-left">
              
              {/* Core Question */}
              <div id="hero-question-anchor" className="w-full">
                <h1
                  id="hero-question"
                  className="text-2xl sm:text-4xl lg:text-5xl xl:text-6xl font-extrabold tracking-tight leading-tight font-serif bg-gradient-to-r from-insurance-darkblue to-insurance-orange bg-clip-text text-transparent pb-2 uppercase relative z-30 text-center lg:text-left w-full"
                >
                  <TypewriterText duration={0.8}>
                    Confused about choosing the right insurance?
                  </TypewriterText>
                </h1>
              </div>
              
              {/* Statement Block */}
              <div id="hero-statement-anchor" className="w-full">
                <div
                  id="hero-statement"
                  className="space-y-4 sm:space-y-5 relative z-30 flex flex-col items-center lg:items-start text-center lg:text-left w-full"
                >
                  {/* Answer */}
                  <p id="hero-answer" className="text-base sm:text-2xl lg:text-3xl font-bold text-black leading-relaxed font-sans border-insurance-orange text-center lg:text-left">
                    All companies, insurance and mutual funds <br className="hidden sm:inline" />
                    under one roof.
                  </p>

                  {/* Italic Quote */}
                  <p id="hero-quote" className="text-[14px] sm:text-[19px] italic font-medium text-slate-500 tracking-wide font-serif text-center lg:text-left">
                    &ldquo;Secure today, protect tomorrow.&rdquo;
                  </p>
                </div>
              </div>
            </div>

            {/* RIGHT: Moving Floating Cards Gallery */}
            <div
              className="flex-shrink-0 w-full lg:w-[460px] xl:w-[520px] h-[390px] sm:h-[450px] lg:h-[500px] xl:h-[540px] relative overflow-hidden rounded-[32px] sm:rounded-[40px] flex justify-center items-center shadow-2xl shadow-blue-900/10 border-4 sm:border-[8px] border-white/60 bg-white/30 backdrop-blur-3xl"
            >
              {/* Glow background */}
              <div className="absolute inset-0 bg-gradient-to-br from-insurance-darkblue/20 via-insurance-orange/10 to-insurance-green/20 blur-3xl z-0"></div>
              
              <div className="relative z-10 flex gap-2 sm:gap-4 w-full h-full p-2 sm:p-4">
                  {/* Left Column (Moves Up) */}
                  <Marquee vertical className="w-1/2 h-full" repeat={3} pauseOnHover>
                    <div onClick={() => handleNavigate('services')} className="w-full h-[175px] sm:h-[210px] lg:h-[235px] bg-white p-1.5 sm:p-2 rounded-2xl sm:rounded-3xl shadow-xl border border-slate-100 group overflow-hidden relative cursor-pointer">
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
                    <div onClick={() => handleNavigate('services')} className="w-full h-[175px] sm:h-[210px] lg:h-[235px] bg-white p-1.5 sm:p-2 rounded-2xl sm:rounded-3xl shadow-xl border border-slate-100 group overflow-hidden relative cursor-pointer">
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
                    <div onClick={() => handleNavigate('services')} className="w-full h-[175px] sm:h-[210px] lg:h-[235px] bg-white p-1.5 sm:p-2 rounded-2xl sm:rounded-3xl shadow-xl border border-slate-100 group overflow-hidden relative cursor-pointer">
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
                    <div onClick={() => handleNavigate('services')} className="w-full h-[175px] sm:h-[210px] lg:h-[235px] bg-white p-1.5 sm:p-2 rounded-2xl sm:rounded-3xl shadow-xl border border-slate-100 group overflow-hidden relative cursor-pointer">
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
            </div>

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
              <div className="w-[144px] h-[144px] sm:w-44 sm:h-44 rounded-full bg-gradient-to-br from-insurance-darkblue to-blue-700 flex flex-col items-center justify-center shadow-2xl shadow-blue-300/40 border-4 border-white ring-4 ring-insurance-darkblue/10 transition-transform duration-500 group-hover:scale-105 p-2">
                <span className="text-3xl sm:text-5xl font-black text-white leading-none">25+</span>
                <span className="text-[11px] sm:text-sm font-bold text-blue-100 tracking-wider uppercase mt-1">Years</span>
                <span className="text-[8.5px] sm:text-[10px] font-bold text-blue-200 uppercase tracking-wider text-center">Experience</span>
              </div>
            </div>

            {/* 5 Crore+ Portfolio Badge */}
            <div className="relative group">
              <div className="w-[144px] h-[144px] sm:w-44 sm:h-44 rounded-full bg-gradient-to-br from-insurance-orange to-amber-600 flex flex-col items-center justify-center shadow-2xl shadow-orange-300/40 border-4 border-white ring-4 ring-insurance-orange/10 transition-transform duration-500 group-hover:scale-105 p-2">
                <span className="text-2xl sm:text-4xl font-black text-white leading-none">5 Cr+</span>
                <span className="text-[11px] sm:text-sm font-bold text-orange-100 tracking-wider uppercase mt-1">Portfolio</span>
                <span className="text-[8px] sm:text-[9.5px] font-bold text-orange-200 uppercase tracking-wider text-center leading-tight">Under Management</span>
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
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 items-stretch max-w-7xl mx-auto">

            {/* Card 1 - Adarsh & Vaishali Bafna */}
            <div className="relative w-full h-full bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl border border-slate-100 flex flex-col sm:flex-row group hover:bg-blue-50/10 transition-all duration-500">
              {/* Gradient top/side accent bar */}
              <div className="absolute top-0 left-0 right-0 sm:bottom-0 sm:right-auto sm:w-1.5 sm:h-full h-1.5 bg-gradient-to-r sm:bg-gradient-to-b from-insurance-darkblue to-insurance-orange z-10"></div>

              {/* Photo */}
              <div className="w-full sm:w-[220px] md:w-[240px] xl:w-[260px] flex-shrink-0 relative overflow-hidden bg-slate-100 flex items-center justify-center min-h-[260px] sm:min-h-full">
                <img
                  src="/founders_new.jpg"
                  alt="Adarsh and Vaishali Bafna"
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full min-h-[260px] sm:min-h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
                />
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0 p-5 sm:p-6 lg:p-7 flex flex-col justify-between">
                <div>
                  <div className="inline-flex items-center gap-1.5 bg-blue-50 text-insurance-darkblue text-[10px] font-extrabold uppercase tracking-widest px-3 py-1 rounded-full mb-2.5 w-fit border border-blue-100/80">
                    Founders
                  </div>
                  <h2 className="text-xl sm:text-2xl font-black text-slate-900 leading-tight font-sans">
                    Adarsh &amp; Vaishali Bafna
                  </h2>
                  <div className="mt-2 w-12 h-1 rounded-full bg-gradient-to-r from-insurance-darkblue to-insurance-orange"></div>
                </div>
                  
                <div className="mt-4 flex flex-col gap-3">
                  {/* Adarsh Profile */}
                  <div className="bg-slate-50 p-3 sm:p-3.5 rounded-2xl border border-slate-100 group-hover:bg-white group-hover:shadow-xs transition-all">
                    <p className="font-bold text-insurance-darkblue text-[14px] sm:text-[15px]">Adarsh G. Bafna</p>
                    <p className="text-[11px] sm:text-[11.5px] font-bold text-insurance-orange">Insurance Advisor &nbsp;|&nbsp; 25+ yrs Exp</p>
                    
                    <div className="mt-2 pt-2 border-t border-slate-200/60 flex flex-col gap-1.5 text-[11px] sm:text-[12px] font-semibold">
                      <a href="tel:+919175033300" className="inline-flex items-center gap-2 text-slate-700 hover:text-insurance-darkblue transition-colors">
                        <Phone className="h-3.5 w-3.5 text-insurance-darkblue flex-shrink-0" />
                        <span>+91 91750 33300</span>
                      </a>
                      <a href="mailto:theinsurancehub70@gmail.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-slate-600 hover:text-insurance-orange transition-colors min-w-0 max-w-full">
                        <Mail className="h-3.5 w-3.5 text-insurance-orange flex-shrink-0" />
                        <span className="truncate text-[11px] sm:text-[11.5px] font-medium" title="theinsurancehub70@gmail.com">theinsurancehub70@gmail.com</span>
                      </a>
                    </div>
                  </div>
                  
                  {/* Vaishali Profile */}
                  <div className="bg-slate-50 p-3 sm:p-3.5 rounded-2xl border border-slate-100 group-hover:bg-white group-hover:shadow-xs transition-all">
                    <p className="font-bold text-insurance-darkblue text-[14px] sm:text-[15px]">Vaishali A. Bafna</p>
                    <p className="text-[11px] sm:text-[11.5px] font-bold text-insurance-orange">Senior Sales Manager &nbsp;|&nbsp; 15+ yrs Exp</p>
                    
                    <div className="mt-2 pt-2 border-t border-slate-200/60 flex flex-col gap-1.5 text-[11px] sm:text-[12px] font-semibold">
                      <a href="tel:+919112063150" className="inline-flex items-center gap-2 text-slate-700 hover:text-insurance-darkblue transition-colors">
                        <Phone className="h-3.5 w-3.5 text-insurance-darkblue flex-shrink-0" />
                        <span>+91 91120 63150</span>
                      </a>
                      <a href="mailto:bafana.vaishali@starinsurance.in" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-slate-600 hover:text-insurance-orange transition-colors min-w-0 max-w-full">
                        <Mail className="h-3.5 w-3.5 text-insurance-orange flex-shrink-0" />
                        <span className="truncate text-[11px] sm:text-[11.5px] font-medium" title="bafana.vaishali@starinsurance.in">bafana.vaishali@starinsurance.in</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 2 - Divyesh Bafna */}
            <div className="relative w-full h-full bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl border border-slate-100 flex flex-col sm:flex-row group hover:bg-orange-50/10 transition-all duration-500">
              {/* Gradient top/side accent bar */}
              <div className="absolute top-0 left-0 right-0 sm:bottom-0 sm:right-auto sm:w-1.5 sm:h-full h-1.5 bg-gradient-to-r sm:bg-gradient-to-b from-insurance-orange to-insurance-violet z-10"></div>

              {/* Photo */}
              <div className="w-full sm:w-[220px] md:w-[240px] xl:w-[260px] flex-shrink-0 relative overflow-hidden bg-slate-100 flex items-center justify-center min-h-[260px] sm:min-h-full">
                <img
                  src="/divyesh_new.jpg"
                  alt="Divyesh Bafna"
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full min-h-[260px] sm:min-h-full object-cover object-[50%_10%] group-hover:scale-105 transition-transform duration-700"
                />
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0 p-5 sm:p-6 lg:p-7 flex flex-col justify-between">
                <div>
                  <div className="inline-flex items-center gap-1.5 bg-orange-50 text-insurance-orange text-[10px] font-extrabold uppercase tracking-widest px-3 py-1 rounded-full mb-2.5 w-fit border border-orange-100/80">
                    Director
                  </div>
                  <h2 className="text-xl sm:text-2xl font-black text-slate-900 leading-tight font-sans">
                    Divyesh Bafna
                  </h2>
                  <div className="mt-2 w-12 h-1 rounded-full bg-gradient-to-r from-insurance-orange to-insurance-violet"></div>
                </div>
                  
                <div className="mt-4 flex flex-col gap-3">
                  <div className="bg-slate-50 p-3 sm:p-3.5 rounded-2xl border border-slate-100 group-hover:bg-white group-hover:shadow-xs transition-all">
                    <p className="font-bold text-insurance-orange text-[14px] sm:text-[15px]">Divyesh Adarsh Bafna</p>
                    <p className="text-[11px] sm:text-[11.5px] font-bold text-insurance-darkblue">Mutual Fund Distributor &nbsp;|&nbsp; Investment Advisor</p>
                    
                    <div className="mt-2 pt-2 border-t border-slate-200/60 flex flex-col gap-1.5 text-[11px] sm:text-[12px] font-semibold">
                      <a href="tel:+919423924568" className="inline-flex items-center gap-2 text-slate-700 hover:text-insurance-orange transition-colors">
                        <Phone className="h-3.5 w-3.5 text-insurance-orange flex-shrink-0" />
                        <span>+91 94239 24568</span>
                      </a>
                      <a href="mailto:bafnadivyesh405@gmail.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-slate-600 hover:text-insurance-violet transition-colors min-w-0 max-w-full">
                        <Mail className="h-3.5 w-3.5 text-insurance-violet flex-shrink-0" />
                        <span className="truncate text-[11px] sm:text-[11.5px] font-medium" title="bafnadivyesh405@gmail.com">bafnadivyesh405@gmail.com</span>
                      </a>
                    </div>
                  </div>

                  {/* Core Investment Specializations Box */}
                  <div className="bg-slate-50 p-3 sm:p-3.5 rounded-2xl border border-slate-100 group-hover:bg-white group-hover:shadow-xs transition-all">
                    <p className="font-bold text-slate-800 text-[12px] sm:text-[13px] uppercase tracking-wider">Investment Specializations</p>
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      <span className="text-[10px] sm:text-[11px] font-bold text-insurance-darkblue bg-blue-50 px-2.5 py-1 rounded-lg border border-blue-100">Mutual Funds &amp; SIP</span>
                      <span className="text-[10px] sm:text-[11px] font-bold text-insurance-orange bg-orange-50 px-2.5 py-1 rounded-lg border border-orange-100">PMS &amp; AIF Advisory</span>
                      <span className="text-[10px] sm:text-[11px] font-bold text-insurance-violet bg-purple-50 px-2.5 py-1 rounded-lg border border-purple-100">Financial Planning</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          OUR HUB SECTION (Home Page)
          ═══════════════════════════════════════════════════════ */}
      <section className="relative py-20 overflow-hidden bg-slate-900 w-full max-w-full">
        {/* Background decorative blobs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-[10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-insurance-darkblue/10 blur-3xl"></div>
          <div className="absolute bottom-[10%] right-[-10%] w-[500px] h-[500px] rounded-full bg-insurance-orange/10 blur-3xl"></div>
        </div>
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-insurance-green via-insurance-darkblue to-insurance-violet"></div>
        
        <div className="text-center space-y-4 mb-14 relative z-10 px-6 max-w-7xl mx-auto">
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
        
        <div className="relative z-10 w-full max-w-full overflow-hidden">
          <ImageAutoSlider />
        </div>
      </section>


      {/* ═══════════════════════════════════════════════════════
          TESTIMONIALS SECTION (Home Page)
          ═══════════════════════════════════════════════════════ */}
      <section id="testimonials" className="relative py-24 overflow-hidden bg-zinc-50 border-t border-b border-slate-100 w-full max-w-full">
        {/* Background decorative elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] rounded-full bg-blue-100/20 blur-3xl animate-blob"></div>
          <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-orange-100/20 blur-3xl animate-blob animation-delay-2000"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 w-full">
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
          CUSTOMER FEEDBACK SECTION ("Share Your Experience")
          ═══════════════════════════════════════════════════════ */}
      <FeedbackForm />

      {/* ═══════════════════════════════════════════════════════
          FAQS SECTION (Home Page)
          ═══════════════════════════════════════════════════════ */}
      <FAQs />

      {/* ═══════════════════════════════════════════════════════
          CONTACT US SECTION (Home Page)
          ═══════════════════════════════════════════════════════ */}
      <section id="contact" className="relative py-24 overflow-hidden bg-white w-full max-w-full">
        {/* Decorative elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-[20%] left-[-10%] w-[400px] h-[400px] rounded-full bg-violet-50/50 blur-3xl"></div>
          <div className="absolute bottom-[20%] right-[-10%] w-[450px] h-[450px] rounded-full bg-blue-50/50 blur-3xl"></div>
        </div>

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
                      className="w-full px-5 py-3.5 bg-white border border-slate-200 rounded-2xl text-[14px] text-slate-700 outline-none focus:border-insurance-darkblue transition-all font-semibold"
                    >
                      <option>Fire Insurance</option>
                      <option>Life Insurance</option>
                      <option>Motor &amp; Car Insurance</option>
                      <option>Business Insurance (Fire, Burglary, Shop)</option>
                      <option>House &amp; Property</option>
                      <option>Professional Indemnity</option>
                      <option>Group Policies</option>
                      <option>Workmen Compensation</option>
                      <option>Miscellaneous Insurance</option>
                      <option>Mutual Funds &amp; SIF</option>
                      <option>PMS &amp; AIF</option>
                      <option>Claims Assistance Desk</option>
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
            <div className="w-full lg:w-[420px] flex flex-col justify-between gap-5">
              
              {/* Call desk */}
              <div className="bg-slate-50 border border-slate-100 p-5 sm:p-6 rounded-3xl hover:shadow-lg transition-all">
                <h4 className="text-xs font-black uppercase text-insurance-orange tracking-widest mb-3">Direct Call Desk</h4>
                <div className="space-y-3.5">
                  <div className="flex justify-between items-center text-[13.5px] sm:text-[14px] font-bold text-slate-800 border-b border-slate-200/60 pb-2">
                    <span>Adarsh Bafna</span>
                    <a href="tel:+919175033300" className="text-insurance-darkblue hover:underline font-extrabold">+91 91750 33300</a>
                  </div>
                  <div className="flex justify-between items-center text-[13.5px] sm:text-[14px] font-bold text-slate-800 border-b border-slate-200/60 pb-2">
                    <span>Vaishali Bafna</span>
                    <a href="tel:+919112063150" className="text-insurance-darkblue hover:underline font-extrabold">+91 91120 63150</a>
                  </div>
                  <div className="flex justify-between items-center text-[13.5px] sm:text-[14px] font-bold text-slate-800">
                    <span>Divyesh Bafna</span>
                    <a href="tel:+919423924568" className="text-insurance-orange hover:underline font-extrabold">+91 94239 24568</a>
                  </div>
                </div>
              </div>

              {/* Email Card */}
              <div className="bg-slate-50 border border-slate-100 p-5 sm:p-6 rounded-3xl hover:shadow-lg transition-all flex items-center gap-4">
                <div className="w-11 h-11 rounded-2xl bg-blue-50 text-insurance-darkblue flex items-center justify-center border border-blue-100/50 flex-shrink-0">
                  <Mail size={20} className="stroke-[2.2]" />
                </div>
                <div className="min-w-0 flex-1">
                  <h4 className="text-[11px] font-black uppercase text-slate-400 tracking-wider">Email Us</h4>
                  <a href="mailto:theinsurancehub70@gmail.com" className="text-[14px] sm:text-[15px] font-extrabold text-slate-800 hover:text-insurance-darkblue truncate block">
                    theinsurancehub70@gmail.com
                  </a>
                </div>
              </div>

              {/* Address Card */}
              <div className="bg-slate-50 border border-slate-100 p-5 sm:p-6 rounded-3xl hover:shadow-lg transition-all flex items-start gap-4">
                <div className="w-11 h-11 rounded-2xl bg-orange-50 text-insurance-orange flex items-center justify-center border border-orange-100/50 flex-shrink-0">
                  <Building size={20} className="stroke-[2.2]" />
                </div>
                <div className="min-w-0 flex-1">
                  <h4 className="text-[11px] font-black uppercase text-slate-400 tracking-wider">Registered Corporate Office</h4>
                  <p className="text-[12.5px] sm:text-[13px] font-bold text-slate-800 mt-1 leading-relaxed">
                    The Insurance Hub, Shop no. 57, Sanman Prestige, Beside Zilla Parishad, Railway station road, Nanded - 431601
                  </p>
                  <a 
                    href="https://www.google.com/maps/search/?api=1&query=The+Insurance+Hub,+Shop+no.+57,+Sanman+Prestige,+Beside+Zilla+Parishad,+Railway+Station+Road,+Nanded+431601" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="inline-flex items-center gap-1.5 text-xs font-black text-insurance-orange mt-2.5 hover:underline"
                  >
                    Open in Google Maps <ArrowRight size={12} />
                  </a>
                </div>
              </div>

              {/* Fast-Track Claims Card */}
              <div className="bg-gradient-to-r from-emerald-500/10 via-emerald-500/5 to-teal-500/10 border border-emerald-200/80 p-4 sm:p-5 rounded-3xl flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-10 h-10 rounded-2xl bg-emerald-600 text-white flex items-center justify-center flex-shrink-0 shadow-sm shadow-emerald-500/20">
                    <ShieldCheck size={20} />
                  </div>
                  <div className="min-w-0">
                    <h4 className="text-[11px] sm:text-[12px] font-extrabold uppercase text-emerald-800 tracking-wider">Claims Assistance Desk</h4>
                    <p className="text-[11px] text-slate-600 font-medium truncate">Direct insurer coordination &amp; claim settlement</p>
                  </div>
                </div>
                <a
                  href="https://wa.me/message/WXX5A5BNS2LBL1?src=qr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-all flex items-center gap-1 flex-shrink-0 shadow-xs"
                >
                  WhatsApp
                </a>
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
              <li><a href="#services" onClick={(e) => { e.preventDefault(); handleNavigate('services'); }} className="hover:text-white transition-colors cursor-pointer">Fire Insurance</a></li>
              <li><a href="#services" onClick={(e) => { e.preventDefault(); handleNavigate('services'); }} className="hover:text-white transition-colors cursor-pointer">Life Insurance</a></li>
              <li><a href="#services" onClick={(e) => { e.preventDefault(); handleNavigate('services'); }} className="hover:text-white transition-colors cursor-pointer">Motor &amp; Car Insurance</a></li>
              <li><a href="#services" onClick={(e) => { e.preventDefault(); handleNavigate('services'); }} className="hover:text-white transition-colors cursor-pointer">Business Insurance (Fire, Burglary, Shop)</a></li>
              <li><a href="#services" onClick={(e) => { e.preventDefault(); handleNavigate('services'); }} className="hover:text-white transition-colors cursor-pointer">House &amp; Property</a></li>
              <li><a href="#services" onClick={(e) => { e.preventDefault(); handleNavigate('services'); }} className="hover:text-white transition-colors cursor-pointer">Mutual Funds &amp; SIF / PMS</a></li>
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


