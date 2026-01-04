
import React from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import Header from './components/Header';
import Hero from './components/Hero';
import Skills from './components/Skills';
import ExperienceTimeline from './components/ExperienceTimeline';
import Projects from './components/Projects';
import Education from './components/Education';
import Contact from './components/Contact';
import MouseEffect from './components/MouseEffect';

const App: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-gray-950">
      <MouseEffect />
      
      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-blue-500 origin-left z-[60]"
        style={{ scaleX }}
      />

      <Header />
      
      <main className="relative z-10">
        <Hero />
        
        <section id="skills" className="py-24 bg-gray-950">
          <Skills />
        </section>

        <section id="experience" className="py-24 bg-gray-900/50 overflow-hidden">
          <ExperienceTimeline />
        </section>

        <section id="projects" className="py-24 bg-gray-950">
          <Projects />
        </section>

        <section id="education" className="py-24 bg-gray-900/50">
          <Education />
        </section>

        <section id="contact" className="py-24 bg-gray-950 text-white">
          <Contact />
        </section>
      </main>

      <footer className="py-16 bg-gray-950 text-gray-500 text-center border-t border-white/5 relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="flex flex-col items-center"
          >
            <div className="mb-6 flex items-center justify-center space-x-4">
               <div className="h-px w-12 bg-gradient-to-r from-transparent to-blue-500/20" />
               <span className="text-blue-500/40 text-lg">✦</span>
               <div className="h-px w-12 bg-gradient-to-l from-transparent to-blue-500/20" />
            </div>
            
            <p className="text-sm md:text-base font-medium text-gray-400 mb-2">
              © {new Date().getFullYear()} Tharaneesh J. All rights reserved.
            </p>
            
            <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 text-[10px] uppercase tracking-[0.2em] font-bold text-gray-600">
              <span>Innovation</span>
              <span className="text-blue-500/20">•</span>
              <span>Design</span>
              <span className="text-blue-500/20">•</span>
              <span>Technology</span>
            </div>

            <p className="mt-8 text-[11px] text-gray-700 font-medium italic">
              Built with precision and passion.
            </p>
          </motion.div>
        </div>
      </footer>
    </div>
  );
};

export default App;
