import React, { useRef, useState, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { Eye, Siren, HeartPulse, UtensilsCrossed, X } from 'lucide-react';
import { Project } from '../types';
import { magneticHover, snapReturn } from '../lib/eases';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const projectData: Project[] = [
  {
    title: 'Real-Time Weapon Detection System',
    description:
      'Developed a basic AI system to detect weapons using YOLOv8 and Python. Features live camera input processing and automated alert notifications.',
    tags: ['YOLOv8', 'Python', 'Computer Vision', 'Alerting'],
    category: 'Security',
    icon: <Eye size={16} />,
    domain: 'AI & Computer Vision',
    tools: 'YOLOv8 · Python · OpenCV',
    solves:
      'Addresses the critical need for automated weapon detection in public spaces. Eliminates human error by providing real-time AI-powered surveillance that instantly identifies firearms and knives in live camera feeds.',
    works:
      'Uses YOLOv8 deep learning model trained on weapon datasets. Processes live video streams frame-by-frame, running inference to detect and classify weapons with bounding boxes. Triggers automated SMS/email alerts when threats are identified.',
  },
  {
    title: "Smart Women's Safety Device",
    description:
      'Built an IoT-based safety device using ESP32, LoRa, GPS, and GSM module. Sends real-time emergency alerts with exact location details to pre-configured contacts.',
    tags: ['ESP32', 'LoRa', 'IoT', 'Embedded Systems'],
    category: 'Personal Safety',
    icon: <Siren size={16} />,
    domain: 'IoT & Embedded Systems',
    tools: 'ESP32 · LoRa · GPS · GSM',
    solves:
      'Provides a discreet, wearable safety solution for women. One-button press sends emergency alerts with precise GPS location to pre-configured contacts, enabling rapid response in dangerous situations.',
    works:
      'ESP32 microcontroller interfaces with GPS for live location, GSM for SMS alerts, and LoRa for long-range mesh communication. A single panic button trigger activates all modules simultaneously, sending coordinates and distress signals.',
  },

  {
    title: 'Personal Health and Appointment System',
    description:
      'Developed a web application for daily nutrition and health guidance. Enabled elderly users to book doctor appointments from home and attend online consultation sessions.',
    tags: ['Supabase', 'TypeScript', 'n8n'],
    category: 'HealthTech',
    icon: <HeartPulse size={16} />,
    domain: 'Web Application',
    tools: 'Supabase · TypeScript · n8n',
    solves:
      'Bridges the healthcare gap for elderly users who struggle with hospital visits. Provides daily nutrition guidance and enables seamless online doctor consultations from the comfort of home.',
    works:
      'Supabase handles authentication and real-time database. n8n automates appointment scheduling workflows, sends reminders, and manages consultation sessions. TypeScript ensures type-safe frontend interactions.',
  },
  {
    title: 'Restaurant QR Ordering SaaS Product',
    description:
      'Building a service product that enables customers to choose menu items and place orders directly from their table. n8n automate workflows, inspired by digital ordering systems from KFC and Burger King.',
    tags: ['n8n', 'TypeScript', 'Excel'],
    category: 'SaaS',
    icon: <UtensilsCrossed size={16} />,
    domain: 'SaaS Product',
    tools: 'n8n · TypeScript · Excel',
    solves:
      'Eliminates wait times and order errors in restaurants. Customers scan a QR code, browse the menu, and place orders instantly — no waiter needed. Reduces operational costs for restaurant owners.',
    works:
      'QR codes link to a dynamic menu interface built with TypeScript. Orders flow through n8n automation pipelines to the kitchen display. Excel-based backend manages menu items, pricing, and order analytics for small restaurant owners.',
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
  const modalRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const sectionsRef = useRef<(HTMLDivElement | null)[]>([]);
  const isAnimatingRef = useRef(false);

  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [activeIconColor, setActiveIconColor] = useState('text-cyan-400');

  const { contextSafe } = useGSAP(
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

  const openProject = useCallback(
    (project: Project, colorClass: string) => {
      if (isAnimatingRef.current) return;
      isAnimatingRef.current = true;

      setActiveProject(project);
      setActiveIconColor(colorClass);

      // Wait for React to render the modal content
      requestAnimationFrame(() => {
        const modal = modalRef.current;
        const card = cardRef.current;
        const sections = sectionsRef.current.filter(Boolean);

        if (!modal || !card) {
          isAnimatingRef.current = false;
          return;
        }

        // Make modal visible
        gsap.set(modal, { autoAlpha: 1 });

        // Animate backdrop + card
        gsap
          .timeline({
            onComplete: () => {
              isAnimatingRef.current = false;
            },
          })
          .to(modal, {
            backgroundColor: 'rgba(0, 0, 0, 0.92)',
            duration: 0.4,
          })
          .fromTo(
            card,
            {
              autoAlpha: 0,
              scale: 0.4,
              rotationY: -180,
              y: 100,
            },
            {
              autoAlpha: 1,
              scale: 1,
              rotationY: 0,
              y: 0,
              duration: 0.9,
              ease: 'back.out(1.4)',
            }
          )
          .from(
            sections,
            {
              y: 20,
              autoAlpha: 0,
              stagger: 0.1,
              duration: 0.5,
            },
            '-=0.4'
          );
      });
    },
    []
  );

  const closeProject = useCallback(() => {
    if (isAnimatingRef.current) return;
    isAnimatingRef.current = true;

    const modal = modalRef.current;
    const card = cardRef.current;

    if (!modal || !card) {
      isAnimatingRef.current = false;
      return;
    }

    gsap
      .timeline({
        onComplete: () => {
          gsap.set(modal, { autoAlpha: 0 });
          setActiveProject(null);
          isAnimatingRef.current = false;
        },
      })
      .to(card, {
        scale: 0.5,
        autoAlpha: 0,
        rotationY: 90,
        duration: 0.4,
        ease: 'power2.in',
      })
      .to(
        modal,
        {
          backgroundColor: 'rgba(0, 0, 0, 0)',
          duration: 0.3,
        },
        '-=0.2'
      );
  }, []);

  const handleBackdropClick = useCallback(
    (e: React.MouseEvent) => {
      if (e.target === modalRef.current) {
        closeProject();
      }
    },
    [closeProject]
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
    <>
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
                onClick={() => openProject(project, iconColor)}
                onMouseEnter={() => handleCardHover(cardsRef.current[idx], true)}
                onMouseLeave={() => handleCardHover(cardsRef.current[idx], false)}
                className="p-6 sm:p-8 bg-black border border-white/[0.06] transition-colors duration-300 group cursor-pointer relative opacity-0"
              >
                <div className="flex flex-col h-full">
                  {/* Icon */}
                  <div className="flex items-center gap-3 mb-6">
                    <div
                      className={`w-8 h-8 flex items-center justify-center border border-white/[0.08] ${iconColor} group-hover:border-white/20 transition-colors`}
                    >
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

                  {/* Click hint */}
                  <div className="mt-4 flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.15em] text-neutral-800 group-hover:text-neutral-500 transition-colors">
                    <span>Click to explore</span>
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="group-hover:translate-x-0.5 transition-transform"
                    >
                      <path d="M5 12h14" />
                      <path d="m12 5 7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ─── Modal Overlay ─── */}
      <div
        ref={modalRef}
        onClick={handleBackdropClick}
        className="fixed inset-0 z-[200] grid place-content-center"
        style={{
          visibility: 'hidden',
          opacity: 0,
          backgroundColor: 'rgba(0, 0, 0, 0)',
        }}
      >
        {/* Close button */}
        <button
          onClick={closeProject}
          className="absolute top-6 right-6 sm:top-8 sm:right-8 text-neutral-400 hover:text-white transition-colors z-10 cursor-pointer"
          aria-label="Close project details"
        >
          <X size={28} />
        </button>

        {/* Card Wrapper with 3D perspective */}
        <div style={{ perspective: '1500px' }}>
          <div
            ref={cardRef}
            className="w-[90vw] max-w-[480px] min-h-[400px] sm:min-h-[520px] p-8 sm:p-12 flex flex-col relative overflow-y-auto max-h-[85vh]"
            style={{
              visibility: 'hidden',
              opacity: 0,
              background: 'linear-gradient(145deg, #111111, #0a0a0a)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              boxShadow:
                '0 40px 80px rgba(0, 0, 0, 0.6), 0 0 0 1px rgba(255, 255, 255, 0.04)',
              backfaceVisibility: 'hidden',
            }}
          >
            {activeProject && (
              <>
                {/* Modal Icon */}
                <div
                  className={`w-12 h-12 flex items-center justify-center border border-white/[0.08] ${activeIconColor} mb-4`}
                >
                  {activeProject.icon}
                </div>

                {/* Title */}
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-1 leading-tight">
                  {activeProject.title}
                </h3>

                {/* Meta line */}
                <p className="text-xs font-semibold text-neutral-500 uppercase tracking-[0.1em] mt-1 mb-6">
                  {activeProject.domain} • {activeProject.tools}
                </p>

                {/* Divider */}
                <div className="h-px w-full bg-white/[0.06] mb-6" />

                {/* Section: What It Solves */}
                <div
                  ref={(el) => {
                    sectionsRef.current[0] = el;
                  }}
                  className="mb-6"
                >
                  <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-cyan-400 mb-2">
                    What It Solves
                  </h4>
                  <p className="text-sm leading-relaxed text-neutral-400">
                    {activeProject.solves}
                  </p>
                </div>

                {/* Section: How It Works */}
                <div
                  ref={(el) => {
                    sectionsRef.current[1] = el;
                  }}
                  className="mb-6"
                >
                  <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-cyan-400 mb-2">
                    How It Works
                  </h4>
                  <p className="text-sm leading-relaxed text-neutral-400">
                    {activeProject.works}
                  </p>
                </div>

                {/* Section: Technologies */}
                <div
                  ref={(el) => {
                    sectionsRef.current[2] = el;
                  }}
                  className="mt-auto pt-4 border-t border-white/[0.06]"
                >
                  <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-cyan-400 mb-3">
                    Technologies
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {activeProject.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1.5 bg-white/[0.04] text-[10px] font-semibold text-neutral-400 border border-white/[0.06] uppercase tracking-wider"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Projects;