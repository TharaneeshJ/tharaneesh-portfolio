import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { Eye, Siren, Activity, HeartPulse, UtensilsCrossed } from 'lucide-react';
import { Project } from '../types';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const projectData: Project[] = [
  {
    title: 'Real-Time Weapon Detection System',
    description:
      'Developed a basic AI system to detect weapons using YOLOv8 and Python. Features live camera input processing and automated alert notifications.',
    tags: ['YOLOv8', 'Python', 'Computer Vision', 'Alerting'],
    category: 'Security',
    icon: <Eye size={16} />,
  },
  {
    title: "Smart Women's Safety Device",
    description:
      'Built an IoT-based safety device using ESP32, LoRa, GPS, and GSM module. Sends real-time emergency alerts with exact location details to pre-configured contacts.',
    tags: ['ESP32', 'LoRa', 'IoT', 'Embedded Systems'],
    category: 'Personal Safety',
    icon: <Siren size={16} />,
  },
  {
    title: 'Personal Health and Fitness Assistant',
    description:
      'Created a mobile application providing personalized workout routines and health tips. Built with Flutter for cross-platform support and FastAPI backend.',
    tags: ['Flutter', 'Python', 'FastAPI', 'HealthTech'],
    category: 'Health Care',
    icon: <Activity size={16} />,
  },
  {
    title: 'Personal Health and Appointment System',
    description:
      'Developed a web application for daily nutrition and health guidance. Enabled elderly users to book doctor appointments from home and attend online consultation sessions.',
    tags: ['Supabase', 'TypeScript', 'n8n'],
    category: 'HealthTech',
    icon: <HeartPulse size={16} />,
  },
  {
    title: 'Restaurant QR Ordering SaaS Product',
    description:
      'Building a service product that enables customers to choose menu items and place orders directly from their table. n8n automate workflows, inspired by digital ordering systems from KFC and Burger King.',
    tags: ['n8n', 'TypeScript', 'Excel'],
    category: 'SaaS',
    icon: <UtensilsCrossed size={16} />,
  },
];

/* Multi-color for icons only */
const iconColors = [
  'text-cyan-400',
  'text-rose-400',
  'text-emerald-400',
  'text-violet-400',
  'text-amber-400',
];

const Projects: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(
    () => {
      if (!sectionRef.current) return;

      gsap.fromTo(
        headingRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: headingRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      );

      gsap.fromTo(
        cardsRef.current.filter(Boolean),
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power3.out',
          force3D: true,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            toggleActions: 'play none none none',
          },
        }
      );
    },
    { scope: sectionRef }
  );

  return (
    <div ref={sectionRef} className="max-w-7xl mx-auto px-4 sm:px-6">
      <div ref={headingRef} className="mb-10 sm:mb-16 opacity-0">
        <span className="label">Portfolio</span>
        <h2 className="text-3xl md:text-4xl font-bold mt-3 mb-4 text-white tracking-tight">
          Featured Projects
        </h2>
        <div className="accent-line" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-white/[0.06]">
        {projectData.map((project, idx) => {
          const iconColor = iconColors[idx % iconColors.length];
          return (
            <div
              key={project.title}
              ref={(el) => {
                cardsRef.current[idx] = el;
              }}
              className="p-6 sm:p-8 bg-black border border-white/[0.06] hover:bg-neutral-950 transition-all duration-300 group cursor-default relative opacity-0"
            >
              <div className="flex flex-col h-full">
                {/* Icon — multi-color accent, category label stays gray */}
                <div className="flex items-center gap-3 mb-6">
                  <div className={`w-8 h-8 flex items-center justify-center border border-white/[0.08] ${iconColor} group-hover:border-white/20 transition-colors`}>
                    {project.icon}
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-neutral-600 group-hover:text-neutral-500 transition-colors">
                    {project.category}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-lg font-bold text-neutral-200 mb-3 leading-tight group-hover:text-white transition-colors">
                  {project.title}
                </h3>

                {/* Divider */}
                <div className="h-px w-full bg-white/[0.06] mb-4" />

                {/* Description */}
                <p className="text-sm text-neutral-600 leading-relaxed mb-6 flex-grow group-hover:text-neutral-500 transition-colors">
                  {project.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mt-auto pt-4 border-t border-white/[0.04]">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 bg-neutral-950 text-[10px] font-semibold text-neutral-700 border border-white/[0.04] uppercase tracking-wider group-hover:text-neutral-500 group-hover:border-white/[0.08] transition-colors"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Projects;