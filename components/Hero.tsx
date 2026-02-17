import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { ArrowRight, Download } from 'lucide-react';
import { magneticHover, snapReturn } from '../lib/eases';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const Hero: React.FC<{ isLoading: boolean }> = ({ isLoading }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const revealTextsRef = useRef<(HTMLSpanElement | null)[]>([]);
  const subRevealRef = useRef<HTMLParagraphElement>(null);
  const metaRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  const { contextSafe } = useGSAP(
    () => {
      // Always set initial state so it's hidden during loading
      // (The timeline below will handle the 'from' state, but this prevents FOUC)
      gsap.set(revealTextsRef.current.filter(Boolean), {
        opacity: 0,
      });
      gsap.set(imageRef.current, {
        opacity: 0,
        scale: 0.95,
        rotation: -2,
      });

      // If loading, stop here. dependencies will re-trigger this when isLoading becomes false.
      if (isLoading) return;

      const tl = gsap.timeline({
        defaults: { force3D: true },
      });

      // 1. Label fade in
      tl.fromTo(
        labelRef.current,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' }
      );

      // 2. Image reveal (parallel with label/name start)
      tl.to(
        imageRef.current,
        {
          opacity: 1,
          scale: 1,
          rotation: 0,
          duration: 1.2,
          ease: 'power3.out',
        },
        '-=0.3'
      );

      // 3. Slit-reveal name animation — expo ease for premium feel
      // 3. Simple fade-up for single line title
      if (revealTextsRef.current[0]) {
        tl.fromTo(
          revealTextsRef.current[0],
          { y: 50, opacity: 0, rotateZ: 3 },
          {
            y: 0,
            opacity: 1,
            rotateZ: 0,
            duration: 1.5,
            ease: 'expo.out',
          },
          '-=0.8'
        );
      }

      // 4. Sub-reveal description
      tl.fromTo(
        subRevealRef.current,
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 1.5, ease: 'expo.out' },
        '-=1.2'
      );

      // 5. Meta tags
      tl.fromTo(
        metaRef.current,
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' },
        '-=0.8'
      );

      // 6. CTA buttons stagger
      tl.fromTo(
        ctaRef.current?.children
          ? Array.from(ctaRef.current.children)
          : [],
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power3.out',
        },
        '-=0.5'
      );

      // Parallax on scroll (only needed once, but safe to re-init or check)
      if (contentRef.current) {
        gsap.to(contentRef.current, {
          y: -80,
          opacity: 0.2,
          ease: 'none',
          force3D: true,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        });
      }
    },
    { scope: sectionRef, dependencies: [isLoading] }
  );

  const handleButtonHover = contextSafe(
    (
      e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>,
      enter: boolean
    ) => {
      gsap.to(e.currentTarget, {
        y: enter ? -4 : 0,
        duration: enter ? 0.5 : 0.4,
        ease: enter ? magneticHover : snapReturn,
        overwrite: true,
        force3D: true,
      });
    }
  );

  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 64,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section ref={sectionRef} className="relative pt-24 sm:pt-32 md:pt-40 pb-16 sm:pb-24 px-4 sm:px-6 min-h-[85vh] sm:min-h-[90vh]">
      <div ref={contentRef} className="max-w-7xl mx-auto relative z-10 will-change-transform">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-12 lg:gap-20">

          {/* Left Column: Text Content */}
          <div className="flex-1 order-2 md:order-1">
            {/* Label */}
            <div ref={labelRef} className="mb-8 opacity-0">
              <span className="label">Available for Opportunities</span>
              <div className="accent-line mt-3" />
            </div>

            {/* Name — Slit Reveal */}
            <h1 className="mb-6 sm:mb-8 font-display font-bold text-4xl sm:text-6xl md:text-7xl lg:text-8xl text-white tracking-tight leading-none">
              <span ref={(el) => { revealTextsRef.current[0] = el; }} className="block will-change-transform whitespace-nowrap" style={{ opacity: 0 }}>
                Tharaneesh J
              </span>
            </h1>

            {/* Description — sub reveal */}
            <p
              ref={subRevealRef}
              className="max-w-xl text-base sm:text-lg text-neutral-500 leading-relaxed mb-6 sm:mb-8 opacity-0"
            >
              Creative and curious{' '}
              <span className="text-white font-medium">AI & Data Science student</span> with a
              blend of design thinking and technical skills. Passionate about building practical and
              meaningful solutions.
            </p>

            {/* Meta tags */}
            <div ref={metaRef} className="flex flex-wrap gap-3 sm:gap-6 mb-8 sm:mb-12 opacity-0">
              <span className="text-xs font-medium text-neutral-600 uppercase tracking-wider border-l border-neutral-700 pl-3">
                Data Enthusiast
              </span>
              <span className="text-xs font-medium text-neutral-600 uppercase tracking-wider border-l border-neutral-700 pl-3">
                Analytical Thinker
              </span>
              <span className="text-xs font-medium text-neutral-600 uppercase tracking-wider border-l border-neutral-700 pl-3">
                Innovative Explorer
              </span>
            </div>

            {/* CTA */}
            <div ref={ctaRef} className="flex flex-col sm:flex-row items-start gap-4">
              <button
                onMouseEnter={(e) => handleButtonHover(e, true)}
                onMouseLeave={(e) => handleButtonHover(e, false)}
                onClick={scrollToContact}
                className="px-6 sm:px-8 py-3 sm:py-4 bg-white text-black text-sm font-semibold flex items-center justify-center gap-3 border border-white hover:bg-neutral-200 transition-colors opacity-0 will-change-transform w-full sm:w-auto"
              >
                <span>Contact</span>
                <ArrowRight size={16} />
              </button>

              <a
                href="/Resume.pdf"
                download="Tharaneesh_J_Resume.pdf"
                onMouseEnter={(e) => handleButtonHover(e, true)}
                onMouseLeave={(e) => handleButtonHover(e, false)}
                className="px-6 sm:px-8 py-3 sm:py-4 bg-transparent text-white text-sm font-semibold flex items-center justify-center gap-3 border border-neutral-800 hover:border-neutral-500 transition-colors cursor-pointer opacity-0 will-change-transform w-full sm:w-auto"
              >
                <Download size={16} className="text-neutral-500" />
                <span>Download Resume</span>
              </a>
            </div>
          </div>

          {/* Right Column: Profile Image */}
          <div className="flex-1 order-1 md:order-2 flex justify-center md:justify-end">
            <div
              ref={imageRef}
              className="relative w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 lg:w-[400px] lg:h-[400px] rounded-full overflow-hidden border-2 border-white/10 shadow-2xl opacity-0"
            >
              <img
                src="/profile.webp"
                alt="Tharaneesh J"
                className="w-full h-full object-cover filter grayscale hover:grayscale-0 transition-all duration-700 scale-110 hover:scale-100"
              />
              {/* Optional overlay for better text contrast if needed, but styling seems fine */}
              <div className="absolute inset-0 bg-gradient-to-tr from-black/20 to-transparent pointer-events-none" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
