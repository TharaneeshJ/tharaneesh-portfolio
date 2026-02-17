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

  const { contextSafe } = useGSAP(
    () => {
      // Always set initial state so it's hidden during loading
      gsap.set(revealTextsRef.current.filter(Boolean), {
        y: '110%',
        skewY: 7,
        opacity: 1,
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

      // 2. Slit-reveal name animation — expo ease for premium feel
      tl.to(
        revealTextsRef.current.filter(Boolean),
        {
          y: 0,
          skewY: 0,
          duration: 1.8,
          ease: 'expo.out',
          stagger: {
            amount: 0.3,
            from: 'start',
          },
        },
        '-=0.2'
      );

      // 3. Sub-reveal description
      tl.fromTo(
        subRevealRef.current,
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 1.5, ease: 'expo.out' },
        '-=1.2'
      );

      // 4. Meta tags
      tl.fromTo(
        metaRef.current,
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' },
        '-=0.8'
      );

      // 5. CTA buttons stagger
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
      <div ref={contentRef} className="max-w-4xl mx-auto relative z-10 will-change-transform">
        {/* Label */}
        <div ref={labelRef} className="mb-8 opacity-0">
          <span className="label">Available for Opportunities</span>
          <div className="accent-line mt-3" />
        </div>

        {/* Name — Slit Reveal */}
        <h1 className="mb-6 sm:mb-8 uppercase font-black tracking-tighter leading-[0.95]">
          {/* Line 1: "Tharaneesh" */}
          <span
            className="block overflow-hidden"
            style={{ height: 'clamp(48px, 10vw, 110px)' }}
          >
            <span
              ref={(el) => { revealTextsRef.current[0] = el; }}
              className="block text-4xl sm:text-5xl md:text-7xl lg:text-8xl text-white will-change-transform"
              style={{ opacity: 0 }}
            >
              Tharaneesh
            </span>
          </span>

          {/* Line 2: "J" */}
          <span
            className="block overflow-hidden"
            style={{ height: 'clamp(48px, 10vw, 110px)' }}
          >
            <span
              ref={(el) => { revealTextsRef.current[1] = el; }}
              className="block text-4xl sm:text-5xl md:text-7xl lg:text-8xl text-neutral-600 will-change-transform"
              style={{ opacity: 0 }}
            >
              J
            </span>
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
    </section>
  );
};

export default Hero;
