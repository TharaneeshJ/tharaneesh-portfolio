import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { GraduationCap, Award } from 'lucide-react';
import { Education as EduType } from '../types';
import { magneticHover, snapReturn } from '../lib/eases';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const educationData: EduType[] = [
  {
    degree: 'B.Tech — Artificial Intelligence & Data Science',
    institution: 'Kongunadu College of Engineering and Technology, Trichy',
    period: 'Final Year',
    grade: 'CGPA: 7.3',
  },
  {
    degree: 'Higher Secondary Education',
    institution: 'Sri Vidya Mandir Matriculation Higher Secondary School, Rasipuram',
    period: '2023',
    grade: '77%',
  },
];

const Education: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  const { contextSafe } = useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
        defaults: { ease: 'power2.out', force3D: true },
      });

      tl.fromTo(
        headingRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6 }
      );

      const cards = cardsRef.current.filter(Boolean);
      tl.fromTo(
        cards,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.15,
          ease: 'power3.out',
        },
        '-=0.3'
      );
    },
    { scope: containerRef }
  );

  const handleCardHover = contextSafe(
    (el: HTMLDivElement | null, enter: boolean) => {
      if (!el) return;
      gsap.to(el, {
        y: enter ? -6 : 0,
        backgroundColor: enter ? '#0a0a0a' : '#000000',
        borderColor: enter ? 'rgba(255, 255, 255, 0.15)' : 'rgba(255, 255, 255, 0.06)',
        duration: enter ? 0.6 : 0.5,
        ease: enter ? magneticHover : snapReturn,
        overwrite: true,
        force3D: true,
      });
    }
  );

  return (
    <div ref={containerRef} className="max-w-7xl mx-auto px-4 sm:px-6">
      <div ref={headingRef} className="mb-10 sm:mb-16 opacity-0">
        <span className="label">Education</span>
        <h2 className="text-3xl md:text-4xl font-bold mt-3 mb-4 text-white tracking-tight">
          Academic Background
        </h2>
        <div className="accent-line" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        {educationData.map((edu, idx) => (
          <div
            key={edu.degree}
            ref={(el) => {
              cardsRef.current[idx] = el;
            }}
            onMouseEnter={() => handleCardHover(cardsRef.current[idx], true)}
            onMouseLeave={() => handleCardHover(cardsRef.current[idx], false)}
            className="p-6 sm:p-8 md:p-10 bg-black border border-white/[0.06] transition-colors duration-300 cursor-default group will-change-transform opacity-0"
          >
            <div className="flex items-start justify-between mb-6">
              {/* Icon — small color accent */}
              <div className="w-10 h-10 flex items-center justify-center border border-white/[0.08] text-violet-400 group-hover:border-white/20 transition-colors">
                <GraduationCap size={20} />
              </div>
              {/* Grade — small color accent */}
              <div className="flex items-center gap-2 px-3 py-1.5 border border-white/[0.06] text-emerald-400 group-hover:border-white/20 transition-colors">
                <Award size={12} />
                <span className="text-xs font-bold font-mono">{edu.grade}</span>
              </div>
            </div>

            <h3 className="text-lg font-bold text-white mb-2 leading-tight">
              {edu.degree}
            </h3>
            <p className="text-sm text-neutral-600 mb-4">{edu.institution}</p>

            <div className="h-px w-full bg-white/[0.06] mb-4" />

            <span className="text-xs font-semibold text-neutral-600 uppercase tracking-wider font-mono group-hover:text-neutral-500 transition-colors">
              {edu.period}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Education;
