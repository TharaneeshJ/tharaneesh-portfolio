import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(useGSAP);

const MouseEffect: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const outerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const handleMouseMove = (e: MouseEvent) => {
        const x = e.clientX;
        const y = e.clientY;

        gsap.to(outerRef.current, {
          x: x - 300,
          y: y - 300,
          duration: 1.4,
          ease: 'power2.out',
          force3D: true,
        });

        gsap.to(innerRef.current, {
          x: x - 100,
          y: y - 100,
          duration: 0.7,
          ease: 'power2.out',
          force3D: true,
        });
      };

      window.addEventListener('mousemove', handleMouseMove);

      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
      };
    },
    { scope: containerRef }
  );

  return (
    <div ref={containerRef} className="fixed inset-0 pointer-events-none z-[1] overflow-hidden bg-black">
      {/* Outer glow — white/neutral only */}
      <div
        ref={outerRef}
        className="absolute w-[600px] h-[600px] bg-white/[0.02] blur-[120px] will-change-transform"
      />

      {/* Inner focus */}
      <div
        ref={innerRef}
        className="absolute w-[200px] h-[200px] bg-white/[0.04] blur-[80px] will-change-transform"
      />

      {/* Subtle grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px] opacity-20" />
    </div>
  );
};

export default MouseEffect;
