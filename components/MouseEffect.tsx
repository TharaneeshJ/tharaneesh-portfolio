
import React, { useEffect } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

const MouseEffect: React.FC = () => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth spring configuration for the glow
  const springX = useSpring(mouseX, { damping: 40, stiffness: 250 });
  const springY = useSpring(mouseY, { damping: 40, stiffness: 250 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <div className="fixed inset-0 pointer-events-none z-[1] overflow-hidden bg-gray-950">
      {/* Background Gradients for Depth */}
      <div className="absolute top-0 left-0 w-full h-full opacity-30">
        <div className="absolute top-[-15%] left-[-10%] w-[70%] h-[70%] bg-blue-900/20 rounded-full blur-[160px]" />
        <div className="absolute bottom-[-15%] right-[-10%] w-[70%] h-[70%] bg-purple-900/20 rounded-full blur-[160px]" />
      </div>

      {/* Main Interactive Glow - Outer Layer */}
      <motion.div
        className="absolute w-[800px] h-[800px] bg-blue-600/5 rounded-full blur-[140px]"
        style={{
          x: springX,
          y: springY,
          translateX: '-50%',
          translateY: '-50%',
        }}
      />

      {/* Main Interactive Glow - Mid Layer */}
      <motion.div
        className="absolute w-[400px] h-[400px] bg-indigo-500/10 rounded-full blur-[100px]"
        style={{
          x: springX,
          y: springY,
          translateX: '-50%',
          translateY: '-50%',
        }}
      />

      {/* Main Interactive Glow - Inner Focus */}
      <motion.div
        className="absolute w-[150px] h-[150px] bg-blue-400/10 rounded-full blur-[60px]"
        style={{
          x: springX,
          y: springY,
          translateX: '-50%',
          translateY: '-50%',
        }}
      />

      {/* Subtle Scanline/Grid Overlay to catch the light */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:80px_80px] opacity-20" />
      
      {/* Noise Texture for organic feel */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
    </div>
  );
};

export default MouseEffect;
