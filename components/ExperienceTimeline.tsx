
import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useSpring, useMotionValue, useTransform } from 'framer-motion';
import { Briefcase } from 'lucide-react';
import { Experience } from '../types';

const experienceData: Experience[] = [
  {
    role: 'Posters & Brochures Designer',
    company: 'Pencil Bitz',
    period: 'April 2025 - November 2025',
    points: [
      'Designed posters and brochures using Canva.',
      'Created clean and attractive designs for marketing use.',
      'Completed design work on time while following brand style.'
    ]
  }
];

const InteractiveCard = ({ exp, idx }: { exp: Experience, idx: number }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Rotation based on mouse position
  const rotateX = useTransform(mouseY, [-100, 100], [10, -10]);
  const rotateY = useTransform(mouseX, [-100, 100], [-10, 10]);

  // Smooth springs for the glow position
  const smoothX = useSpring(mouseX, { damping: 20, stiffness: 150 });
  const smoothY = useSpring(mouseY, { damping: 20, stiffness: 150 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <div className={`w-full md:w-1/2 ${idx % 2 === 0 ? 'md:pl-12' : 'md:pr-12'} pl-10 md:pl-0`}>
      <motion.div 
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ 
          rotateX, 
          rotateY,
          transformStyle: "preserve-3d"
        }}
        whileHover={{ scale: 1.05 }}
        className="p-8 bg-gray-900/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white/5 hover:border-blue-500/30 transition-all cursor-default group relative overflow-hidden"
      >
        {/* Enhanced Circular Glow Effect with More Feather */}
        <motion.div 
          className="absolute pointer-events-none rounded-full bg-blue-500/15 blur-[80px] w-64 h-64 -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{ 
            left: smoothX, 
            top: smoothY,
            translateX: '-50%',
            translateY: '-50%'
          }}
        />
        
        {/* Secondary Purple Glow for color depth */}
        <motion.div 
          className="absolute pointer-events-none rounded-full bg-purple-500/10 blur-[100px] w-80 h-80 -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-75"
          style={{ 
            left: smoothX, 
            top: smoothY,
            translateX: '-30%',
            translateY: '-30%'
          }}
        />

        <div className="relative z-10">
          <div className="flex items-center space-x-3 text-blue-400 mb-2">
            <Briefcase size={18} className="group-hover:scale-110 transition-transform" />
            <span className="text-sm font-semibold uppercase tracking-wider">{exp.period}</span>
          </div>
          <h3 className="text-xl font-bold text-gray-100 group-hover:text-white transition-colors">{exp.role}</h3>
          <p className="text-blue-400 font-medium mb-4">{exp.company}</p>
          <ul className="space-y-3">
            {exp.points.map((pt, i) => (
              <li key={i} className="flex items-start text-gray-400 text-sm leading-relaxed group-hover:text-gray-300 transition-colors">
                <span className="mr-2 mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-500/50 flex-shrink-0 group-hover:bg-blue-400" />
                {pt}
              </li>
            ))}
          </ul>
        </div>
      </motion.div>
    </div>
  );
};

const ExperienceTimeline: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const pathLength = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30
  });

  return (
    <div className="max-w-4xl mx-auto px-6" ref={containerRef}>
      <div className="text-center mb-16">
        <h2 className="text-3xl font-bold mb-4 text-white">Professional Journey</h2>
        <div className="h-1 w-20 bg-blue-500 mx-auto rounded-full" />
      </div>

      <div className="relative">
        {/* Continuous Line */}
        <div className="absolute left-0 md:left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-gray-800" />
        <motion.div 
          style={{ 
            scaleY: pathLength,
            transformOrigin: 'top' 
          }}
          className="absolute left-0 md:left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-blue-500 z-10" 
        />

        {experienceData.map((exp, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, x: idx % 2 === 0 ? -50 : 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className={`relative mb-20 flex flex-col md:flex-row items-center ${
              idx % 2 === 0 ? 'md:flex-row-reverse' : ''
            }`}
          >
            {/* Interactive Timeline Marker */}
            <motion.div 
              whileHover={{ scale: 1.8, backgroundColor: '#60a5fa' }}
              className="absolute left-0 md:left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full bg-blue-500 border-4 border-gray-950 shadow-lg z-20 cursor-pointer" 
            >
              <div className="absolute inset-0 rounded-full animate-ping bg-blue-500/30 -z-10" />
            </motion.div>

            <InteractiveCard exp={exp} idx={idx} />
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ExperienceTimeline;
