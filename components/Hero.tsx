import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { ArrowRight, Download } from 'lucide-react';
import { magneticHover, snapReturn } from '../lib/eases';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const Hero: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const metaRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const { contextSafe } = useGSAP(
    () => {
      const tl = gsap.timeline({
        defaults: { ease: 'power3.out', force3D: true },
      });

      tl.fromTo(
        labelRef.current,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.5 }
      )
        .fromTo(
          nameRef.current,
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 0.8 },
          '-=0.2'
        )
        .fromTo(
          descRef.current,
          { opacity: 0, y: 25 },
          { opacity: 1, y: 0, duration: 0.6 },
          '-=0.35'
        )
        .fromTo(
          metaRef.current,
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 0.5 },
          '-=0.25'
        )
        .fromTo(
          ctaRef.current?.children
            ? Array.from(ctaRef.current.children)
            : [],
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            stagger: 0.1,
          },
          '-=0.2'
        );

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
    { scope: sectionRef }
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

        {/* Name */}
        <h1
          ref={nameRef}
          className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter text-white leading-[0.9] mb-6 sm:mb-8 opacity-0"
        >
          Tharaneesh
          <br />
          <span className="text-neutral-600">J</span>
        </h1>

        {/* Description */}
        <p
          ref={descRef}
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

        {/* CTA — color accents allowed here */}
        <div ref={ctaRef} className="flex flex-col sm:flex-row items-start gap-4">
          <button
            onMouseEnter={(e) => handleButtonHover(e, true)}
            onMouseLeave={(e) => handleButtonHover(e, false)}
            onClick={scrollToContact}
            className="px-6 sm:px-8 py-3 sm:py-4 bg-white text-black text-sm font-semibold flex items-center justify-center gap-3 border border-white hover:bg-neutral-200 transition-colors opacity-0 will-change-transform w-full sm:w-auto"
          >
            <span>Hire Me</span>
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
