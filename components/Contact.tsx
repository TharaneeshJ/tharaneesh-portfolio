import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { Mail, Github, Linkedin, Phone, ArrowUpRight } from 'lucide-react';
import { magneticHover, snapReturn } from '../lib/eases';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const Contact: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  const handleEmailClick = () => {
    window.location.href = 'mailto:tharaneeshj@gmail.com?subject=Inquiry from Portfolio';
  };
  const handleLinkedInClick = () => {
    window.open('https://www.linkedin.com/in/tharaneeshj', '_blank');
  };
  const handleGithubClick = () => {
    window.open('https://github.com/TharaneeshJ', '_blank');
  };
  const handlePhoneClick = () => {
    window.location.href = 'tel:+917395936932';
  };

  const { contextSafe } = useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
        defaults: { ease: 'power3.out', force3D: true },
      });

      tl.fromTo(
        headingRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.7 }
      ).fromTo(
        cardsRef.current.filter(Boolean),
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.08,
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

  /* Icon colors — small multi-color accents */
  const contactCards = [
    {
      label: 'Email',
      value: 'tharaneeshj@gmail.com',
      action: 'Send Message',
      onClick: handleEmailClick,
      icon: <Mail size={20} />,
      iconColor: 'text-rose-400',
    },
    {
      label: 'LinkedIn',
      value: 'linkedin.com/in/tharaneeshj',
      action: 'View Profile',
      onClick: handleLinkedInClick,
      icon: <Linkedin size={20} />,
      iconColor: 'text-sky-400',
    },
    {
      label: 'GitHub',
      value: 'github.com/TharaneeshJ',
      action: 'View Projects',
      onClick: handleGithubClick,
      icon: <Github size={20} />,
      iconColor: 'text-white',
    },
    {
      label: 'Phone',
      value: '+91 73959 36932',
      action: 'Call Now',
      onClick: handlePhoneClick,
      icon: <Phone size={20} />,
      iconColor: 'text-emerald-400',
    },
  ];

  return (
    <div ref={containerRef} className="max-w-7xl mx-auto px-4 sm:px-6">
      <div ref={headingRef} className="mb-10 sm:mb-16 opacity-0">
        <span className="label">Contact</span>
        <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold mt-3 mb-4 sm:mb-6 text-white tracking-tight max-w-2xl">
          Let's connect and build something{' '}
          <span className="text-neutral-500">incredible</span> together.
        </h2>
        <p className="text-neutral-600 text-sm sm:text-base leading-relaxed max-w-xl mb-4">
          I'm currently seeking opportunities to apply my AI and Data Science skills to real-world
          challenges. Feel free to reach out for collaborations or just a friendly chat about tech.
        </p>
        <div className="accent-line" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-white/[0.06]">
        {contactCards.map((card, idx) => (
          <div
            key={card.label}
            ref={(el) => {
              cardsRef.current[idx] = el;
            }}
            onClick={card.onClick}
            onMouseEnter={() => handleCardHover(cardsRef.current[idx], true)}
            onMouseLeave={() => handleCardHover(cardsRef.current[idx], false)}
            className="flex flex-col p-6 sm:p-8 bg-black border border-white/[0.06] group hover:bg-neutral-950 transition-all cursor-pointer opacity-0 will-change-transform"
          >
            {/* Icon — multi-color accent */}
            <div className={`w-10 h-10 mb-6 flex items-center justify-center border border-white/[0.08] ${card.iconColor} group-hover:border-white/20 transition-all`}>
              {card.icon}
            </div>

            <p className="text-[10px] text-neutral-700 uppercase font-bold tracking-[0.15em] mb-1">
              {card.label}
            </p>
            <span className="text-sm text-neutral-400 group-hover:text-white transition-colors break-all mb-6 font-mono">
              {card.value}
            </span>

            <div className="mt-auto flex items-center gap-2 text-xs font-semibold text-neutral-700 group-hover:text-white transition-colors">
              <span>{card.action}</span>
              <ArrowUpRight size={12} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Contact;
