import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import {
    Code2,
    Database,
    Cpu,
    Palette,
    BarChart3,
    Cloud,
    Smartphone,
    Brain,
    Layers,
    GitBranch,
    Terminal,
    Zap,
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const techItems = [
    { label: 'Python', icon: <Code2 size={18} />, color: 'text-emerald-400' },
    { label: 'Java', icon: <Terminal size={18} />, color: 'text-amber-400' },
    { label: 'AI / ML', icon: <Brain size={18} />, color: 'text-violet-400' },
    { label: 'Data Science', icon: <Database size={18} />, color: 'text-cyan-400' },
    { label: 'Computer Vision', icon: <Cpu size={18} />, color: 'text-rose-400' },
    { label: 'UI Design', icon: <Palette size={18} />, color: 'text-pink-400' },
    { label: 'Power BI', icon: <BarChart3 size={18} />, color: 'text-amber-400' },
    { label: 'IoT', icon: <Cloud size={18} />, color: 'text-sky-400' },
    { label: 'Flutter', icon: <Smartphone size={18} />, color: 'text-cyan-400' },
    { label: 'FastAPI', icon: <Zap size={18} />, color: 'text-emerald-400' },
    { label: 'Embedded', icon: <Layers size={18} />, color: 'text-orange-400' },
    { label: 'Git', icon: <GitBranch size={18} />, color: 'text-rose-400' },
];

const HorizontalScroll: React.FC = () => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const trackRef = useRef<HTMLDivElement>(null);
    const headingRef = useRef<HTMLDivElement>(null);

    useGSAP(
        () => {
            if (!trackRef.current || !sectionRef.current) return;

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

            const totalWidth = trackRef.current.scrollWidth;
            const viewportWidth = window.innerWidth;
            const scrollDistance = totalWidth - viewportWidth;

            gsap.to(trackRef.current, {
                x: -scrollDistance,
                ease: 'none',
                force3D: true,
                scrollTrigger: {
                    trigger: sectionRef.current,
                    pin: true,
                    scrub: 1,
                    start: 'top top',
                    end: () => `+=${scrollDistance}`,
                    invalidateOnRefresh: true,
                },
            });
        },
        { scope: sectionRef }
    );

    return (
        <div ref={sectionRef} className="relative bg-black">
            <div className="pt-16 sm:pt-24 pb-6 sm:pb-8 px-4 sm:px-6">
                <div ref={headingRef} className="mb-8 sm:mb-12 opacity-0">
                    <span className="label">Ecosystem</span>
                    <h2 className="text-3xl md:text-4xl font-bold mt-3 mb-4 text-white tracking-tight">
                        Technologies & Interests
                    </h2>
                    <div className="accent-line" />
                </div>
            </div>

            <div
                ref={trackRef}
                className="flex items-stretch gap-px px-4 sm:px-6 pb-16 sm:pb-24 will-change-transform"
                style={{ width: 'max-content' }}
            >
                {[...techItems, ...techItems].map((item, idx) => (
                    <div
                        key={`${item.label}-${idx}`}
                        className="h-scroll-item flex-shrink-0 w-[200px] sm:w-[260px] md:w-[300px] p-6 sm:p-8 bg-black border border-white/[0.06] hover:border-white/[0.15] hover:bg-neutral-950 transition-all duration-300 group cursor-default"
                    >
                        {/* Icon — multi-color accent */}
                        <div className={`w-10 h-10 mb-6 flex items-center justify-center border border-white/[0.08] ${item.color} group-hover:border-white/20 transition-colors`}>
                            {item.icon}
                        </div>
                        <h3 className="text-base font-bold mb-2 text-neutral-300 group-hover:text-white transition-colors">
                            {item.label}
                        </h3>
                        <div className="h-px w-full bg-white/[0.06] mb-3" />
                        <p className="text-xs text-neutral-700 leading-relaxed">
                            Part of the toolkit I leverage for building impactful solutions.
                        </p>
                    </div>
                ))}
            </div>

            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-3">
                <div className="h-px w-12 bg-neutral-800" />
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-700">
                    Scroll to explore
                </span>
                <div className="h-px w-12 bg-neutral-800" />
            </div>
        </div>
    );
};

export default HorizontalScroll;
