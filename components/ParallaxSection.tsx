import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger, useGSAP);

/**
 * ParallaxSection — reusable wrapper with ambient depth effect.
 *
 * IMPORTANT: Does NOT wrap children in a moving container or add
 * `overflow-hidden`. Doing so would break nested ScrollTriggers
 * (their start/end positions would be relative to the moving wrapper
 * instead of the viewport, causing animation triggers to fire at
 * wrong times). Only decorative orbs get parallax.
 */
interface ParallaxSectionProps {
    children: React.ReactNode;
    speed?: number;
    className?: string;
    showDecorations?: boolean;
}

const ParallaxSection: React.FC<ParallaxSectionProps> = ({
    children,
    speed = 0.3,
    className = '',
    showDecorations = true,
}) => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const bgLayerRef = useRef<HTMLDivElement>(null);

    useGSAP(
        () => {
            if (!sectionRef.current) return;

            // Only the decorative background layer gets parallax.
            // Child content is NOT wrapped in a moving container — doing so
            // would shift nested ScrollTrigger positions and break animations.
            if (bgLayerRef.current) {
                gsap.fromTo(
                    bgLayerRef.current,
                    { y: -60 * speed },
                    {
                        y: 60 * speed,
                        ease: 'none',
                        force3D: true,
                        scrollTrigger: {
                            trigger: sectionRef.current,
                            start: 'top bottom',
                            end: 'bottom top',
                            scrub: true,
                        },
                    }
                );
            }
        },
        { scope: sectionRef }
    );

    return (
        <div
            ref={sectionRef}
            className={`relative ${className}`}
        >
            {/* Background parallax layer — purely decorative */}
            {showDecorations && (
                <div
                    ref={bgLayerRef}
                    className="absolute inset-0 pointer-events-none will-change-transform overflow-hidden"
                    aria-hidden="true"
                >
                    <div className="absolute top-[10%] right-[-5%] w-[500px] h-[500px] bg-white/[0.02] blur-[120px]" />
                    <div className="absolute bottom-[10%] left-[-5%] w-[400px] h-[400px] bg-white/[0.02] blur-[100px]" />
                    <div className="absolute top-[50%] left-[30%] w-[300px] h-[300px] bg-white/[0.01] blur-[80px]" />
                </div>
            )}

            {/* Children rendered directly — no wrapper div that could break ScrollTriggers */}
            <div className="relative z-10">
                {children}
            </div>
        </div>
    );
};

export default ParallaxSection;
