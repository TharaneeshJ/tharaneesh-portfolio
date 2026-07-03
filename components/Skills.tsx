import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { Code2, Wrench, Users, Languages, BookOpen } from 'lucide-react';
import { SkillCategory } from '../types';
import { magneticHover, snapReturn } from '../lib/eases';

gsap.registerPlugin(ScrollTrigger, useGSAP);

/* Multi-color only on icons */
const iconColors = [
  'text-emerald-400',
  'text-cyan-400',
  'text-amber-400',
  'text-violet-400',
  'text-rose-400',
];

const skillCategories: (SkillCategory & { icon: React.ReactNode })[] = [
  {
    title: 'Technical Skills',
    icon: <Code2 size={20} />,
    skills: ['Java', 'MongoDB'],
  },
  {
    title: 'Core Concepts',
    icon: <BookOpen size={20} />,
    skills: ['Data Structures & Algorithms (DSA)', 'Object-Oriented Programming (OOPs)'],
  },
  {
    title: 'Tools & Platforms',
    icon: <Wrench size={20} />,
    skills: ['Git/GitHub', 'Supabase', 'n8n', 'Excel', 'Canva'],
  },
  {
    title: 'Professional Skills',
    icon: <Users size={20} />,
    skills: ['Problem Solving', 'Analytical Thinking', 'Adaptability', 'Self-Learning', 'Teamwork & Management'],
  },
  {
    title: 'Languages Spoken',
    icon: <Languages size={20} />,
    skills: ['English', 'Tamil'],
  },
];

const Skills: React.FC = () => {
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
      ).fromTo(
        cardsRef.current.filter(Boolean),
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
        },
        '-=0.2'
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
        <span className="label">Capabilities</span>
        <h2 className="text-3xl md:text-4xl font-bold mt-3 mb-4 text-white tracking-tight">
          Core Competencies
        </h2>
        <div className="accent-line" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 sm:gap-6">
        {skillCategories.map((cat, idx) => (
          <div
            key={cat.title}
            ref={(el) => {
              cardsRef.current[idx] = el;
            }}
            onMouseEnter={() => handleCardHover(cardsRef.current[idx], true)}
            onMouseLeave={() => handleCardHover(cardsRef.current[idx], false)}
            className="p-6 sm:p-8 bg-black border border-white/[0.06] transition-colors duration-300 group cursor-default opacity-0"
          >
            {/* Icon — multi-color accent */}
            <div className={`mb-6 w-10 h-10 flex items-center justify-center border border-white/[0.08] ${iconColors[idx]} group-hover:border-white/20 transition-all duration-300`}>
              {cat.icon}
            </div>
            <h3 className="text-sm font-semibold mb-4 text-neutral-300 uppercase tracking-wider group-hover:text-white transition-colors">
              {cat.title}
            </h3>
            <div className="flex flex-wrap gap-2">
              {cat.skills.map((skill) => (
                <span
                  key={skill}
                  className="px-3 py-1.5 bg-neutral-950 text-[11px] font-medium text-neutral-600 border border-white/[0.04] group-hover:text-neutral-400 group-hover:border-white/[0.08] transition-colors"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Skills;
