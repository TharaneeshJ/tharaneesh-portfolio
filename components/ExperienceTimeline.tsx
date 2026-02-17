import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { Briefcase } from 'lucide-react';
import { Experience } from '../types';
import { magneticHover, snapReturn } from '../lib/eases';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const experienceData: Experience[] = [
  {
    role: 'Posters & Brochures Designer',
    company: 'Pencil Bitz',
    period: 'April 2025 — November 2025',
    points: [
      'Designed posters and brochures using Canva.',
      'Created clean and attractive designs for marketing use.',
      'Completed design work on time while following brand style.',
    ],
  },
];

const ExperienceTimeline: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  const { contextSafe } = useGSAP(
    () => {
      const tl = gsap.timeline({
        delay: 0.2,
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
        borderColor: enter ? 'rgba(255, 255, 255, 0.15)' : 'rgba(255, 255, 255, 0.06)',
        duration: enter ? 0.6 : 0.5,
        ease: enter ? magneticHover : snapReturn,
        overwrite: true,
        force3D: true,
      });
    }
  );

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6" ref={containerRef}>
      <div ref={headingRef} className="mb-10 sm:mb-16" style={{ opacity: 0 }}>
        <span className="label">Career</span>
        <h2 className="text-3xl md:text-4xl font-bold mt-3 mb-4 text-white tracking-tight">
          Professional Journey
        </h2>
        <div className="accent-line" />
      </div>

      <div className="space-y-6">
        {experienceData.map((exp, idx) => (
          <div
            key={idx}
            ref={(el) => {
              cardsRef.current[idx] = el;
            }}
            onMouseEnter={() => handleCardHover(cardsRef.current[idx], true)}
            onMouseLeave={() => handleCardHover(cardsRef.current[idx], false)}
            style={{ opacity: 0 }}
            className="p-6 sm:p-8 md:p-10 bg-black border border-white/[0.06] hover:bg-neutral-950 transition-all cursor-default group will-change-transform"
          >
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  {/* Icon — small color accent */}
                  <Briefcase size={16} className="text-amber-400" />
                  <span className="text-xs font-semibold text-neutral-500 uppercase tracking-wider font-mono">
                    {exp.period}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-white">
                  {exp.role}
                </h3>
                <p className="text-sm font-medium text-neutral-600 mt-1">{exp.company}</p>
              </div>
            </div>

            <div className="h-px w-full bg-white/[0.06] mb-6" />

            <ul className="space-y-3">
              {exp.points.map((pt, i) => (
                <li
                  key={i}
                  className="flex items-start text-neutral-500 text-sm leading-relaxed group-hover:text-neutral-400 transition-colors"
                >
                  <span className="mr-3 mt-2 w-1 h-1 bg-neutral-600 flex-shrink-0" />
                  {pt}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExperienceTimeline;
