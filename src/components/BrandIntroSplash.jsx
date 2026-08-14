import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import logoImg from '../assets/logo.jpg';

export default function BrandIntroSplash({ onComplete }) {
  const [phase, setPhase] = useState('center'); // 'center' -> 'move' -> 'done'
  const [logoTarget, setLogoTarget] = useState({ x: -350, y: -260, scale: 0.7 });
  const [questionTarget, setQuestionTarget] = useState({ x: -280, y: -40, scale: 1 });
  const [statementTarget, setStatementTarget] = useState({ x: -280, y: 100, scale: 1 });

  const splashLogoRef = useRef(null);
  const splashQuestionRef = useRef(null);
  const splashStatementRef = useRef(null);
  const hasTriggeredRef = useRef(false);

  // Measure exact pixel positions of target elements on the live page
  const measureTargetCoordinates = () => {
    try {
      const headerLogoEl = document.getElementById('header-logo');
      const heroQuestionEl = document.getElementById('hero-question');
      const heroStatementEl = document.getElementById('hero-statement');

      if (headerLogoEl && splashLogoRef.current) {
        const dest = headerLogoEl.getBoundingClientRect();
        const src = splashLogoRef.current.getBoundingClientRect();
        setLogoTarget({
          x: dest.left - src.left,
          y: dest.top - src.top,
          scale: dest.height / src.height || 0.7
        });
      }

      if (heroQuestionEl && splashQuestionRef.current) {
        const dest = heroQuestionEl.getBoundingClientRect();
        const src = splashQuestionRef.current.getBoundingClientRect();
        setQuestionTarget({
          x: dest.left - src.left,
          y: dest.top - src.top,
          scale: dest.width / src.width || 1
        });
      }

      if (heroStatementEl && splashStatementRef.current) {
        const dest = heroStatementEl.getBoundingClientRect();
        const src = splashStatementRef.current.getBoundingClientRect();
        setStatementTarget({
          x: dest.left - src.left,
          y: dest.top - src.top,
          scale: 1
        });
      }
    } catch (e) {
      // Fallback
    }
  };

  useEffect(() => {
    measureTargetCoordinates();
    window.addEventListener('resize', measureTargetCoordinates);

    // 1. All 3 elements (Logo, Question, Statement) are displayed in the center
    // 2. Smooth continuous glide to home positions begins at 2.2s
    const moveTimer = setTimeout(() => {
      startMove();
    }, 2200);

    return () => {
      clearTimeout(moveTimer);
      window.removeEventListener('resize', measureTargetCoordinates);
    };
  }, []);

  const startMove = () => {
    if (hasTriggeredRef.current) return;
    hasTriggeredRef.current = true;

    measureTargetCoordinates();
    setPhase('move');

    // Glide duration 1.2s
    setTimeout(() => {
      setPhase('done');
      if (onComplete) onComplete();
    }, 1200);
  };

  if (phase === 'done') return null;

  return (
    <div
      onClick={startMove}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center cursor-pointer select-none overflow-hidden"
    >
      {/* ── Background Veil Backdrop (Dissolves softly on move) ── */}
      <motion.div
        initial={{ opacity: 1 }}
        animate={{ opacity: phase === 'move' ? 0 : 1 }}
        transition={{ duration: 1.2, ease: "easeInOut" }}
        className="absolute inset-0 bg-slate-50/95 backdrop-blur-2xl pointer-events-none"
      >
        {/* Soft Ambient Brand Glows */}
        <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-blue-300/25 blur-[120px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-[600px] h-[600px] rounded-full bg-orange-300/25 blur-[120px] pointer-events-none" />
      </motion.div>

      {/* ── Open Content Container (All 3 elements displayed together in center at start) ── */}
      <div className="relative z-20 flex flex-col items-center text-center px-4 sm:px-6 max-w-4xl pointer-events-none">
        
        {/* 1. Centered Logo -> Glides into Header Logo and STOPS */}
        <motion.div
          ref={splashLogoRef}
          animate={
            phase === 'move'
              ? {
                  x: logoTarget.x,
                  y: logoTarget.y,
                  scale: logoTarget.scale,
                  opacity: 1,
                  transition: {
                    duration: 1.2,
                    ease: [0.25, 1, 0.5, 1]
                  }
                }
              : {
                  x: 0,
                  y: 0,
                  scale: 1.1,
                  opacity: 1
                }
          }
          className="relative mb-4 sm:mb-6"
          style={{ transformOrigin: 'top left', willChange: 'transform' }}
        >
          <img
            src={logoImg}
            alt="The Insurance Hub"
            className="h-16 sm:h-22 w-auto object-contain mix-blend-multiply drop-shadow-sm"
          />
        </motion.div>

        {/* 2. Question -> Centered at start, Glides into Hero Question and STOPS */}
        <motion.h1
          ref={splashQuestionRef}
          animate={
            phase === 'move'
              ? {
                  x: questionTarget.x,
                  y: questionTarget.y,
                  scale: questionTarget.scale,
                  opacity: 1,
                  transition: {
                    duration: 1.2,
                    ease: [0.25, 1, 0.5, 1]
                  }
                }
              : {
                  x: 0,
                  y: 0,
                  scale: 1,
                  opacity: 1
                }
          }
          className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight font-serif bg-gradient-to-r from-insurance-darkblue to-insurance-orange bg-clip-text text-transparent pb-2 uppercase text-center"
          style={{ transformOrigin: 'top left', willChange: 'transform' }}
        >
          Confused about choosing the right insurance?
        </motion.h1>

        {/* 3. Statement -> Centered at start, Glides into Hero Statement and STOPS */}
        <motion.div
          ref={splashStatementRef}
          animate={
            phase === 'move'
              ? {
                  x: statementTarget.x,
                  y: statementTarget.y,
                  scale: statementTarget.scale,
                  opacity: 1,
                  transition: {
                    duration: 1.2,
                    ease: [0.25, 1, 0.5, 1]
                  }
                }
              : {
                  x: 0,
                  y: 0,
                  scale: 1,
                  opacity: 1
                }
          }
          className="mt-4 sm:mt-6 space-y-3 sm:space-y-4 flex flex-col items-center text-center"
          style={{ transformOrigin: 'top left', willChange: 'transform' }}
        >
          {/* Answer */}
          <p className="text-base sm:text-2xl lg:text-3xl font-bold text-black leading-relaxed font-sans border-l-4 border-insurance-orange pl-4 sm:pl-5 text-left sm:text-center">
            All companies, insurance and mutual funds <br className="hidden sm:inline" />
            under one roof.
          </p>

          {/* Italic Quote */}
          <p className="text-[14px] sm:text-[18px] italic font-medium text-slate-500 pl-1 border-l-2 border-insurance-darkblue/30 tracking-wide font-serif">
            &ldquo;Secure today, protect tomorrow.&rdquo;
          </p>
        </motion.div>

      </div>
    </div>
  );
}
