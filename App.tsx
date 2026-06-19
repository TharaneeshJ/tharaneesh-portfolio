import React, { useRef, useState, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import SmoothScroller from './lib/SmoothScroller';
import Header from './components/Header';
import Hero from './components/Hero';
import Skills from './components/Skills';
import ExperienceTimeline from './components/ExperienceTimeline';
import Projects from './components/Projects';
import Education from './components/Education';
import Contact from './components/Contact';
import SkeletonLoader from './components/SkeletonLoader';
import SectionSeparator from './components/SectionSeparator';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const App: React.FC = () => {
  const appRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);

  const handleLoadingComplete = useCallback(() => {
    setIsLoading(false);
  }, []);

  useGSAP(
    () => {
      if (isLoading) return;

      // Scroll progress bar
      gsap.fromTo(
        progressBarRef.current,
        { scaleX: 0 },
        {
          scaleX: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: document.documentElement,
            start: 'top top',
            end: 'bottom bottom',
            scrub: 0.3,
          },
        }
      );
    },
    { scope: appRef, dependencies: [isLoading] }
  );



  return (
    <>
      {isLoading && <SkeletonLoader onComplete={handleLoadingComplete} />}

      <SmoothScroller>
        <div ref={appRef} className="relative min-h-screen bg-black">
          {/* Scroll Progress Bar */}
          <div
            ref={progressBarRef}
            className="fixed top-0 left-0 right-0 h-px bg-white origin-left z-[60]"
            style={{ transform: 'scaleX(0)' }}
          />

          <Header isLoading={isLoading} />

          <main className="relative z-[1]">
            <section className="min-h-screen flex items-center justify-center bg-black relative">
              <Hero isLoading={isLoading} />
            </section>
            <SectionSeparator />

            <section className="bg-black py-16 sm:py-24 relative" id="skills">
              <Skills />
            </section>
            <SectionSeparator />

            <section className="bg-black py-16 sm:py-24 relative" id="experience">
              <ExperienceTimeline />
            </section>
            <SectionSeparator />

            <section className="bg-black py-16 sm:py-24 relative" id="projects">
              <Projects />
            </section>
            <SectionSeparator />

            <section className="bg-black py-16 sm:py-24 relative" id="education">
              <Education />
            </section>
            <SectionSeparator />

            <section className="bg-black py-16 sm:py-24 text-white relative" id="contact">
              <Contact />
            </section>
          </main>

          <footer className="py-6 sm:py-8 bg-black text-center border-t border-white/[0.06] relative z-[10]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
              <div className="flex flex-col items-center gap-4">
                <p className="text-xs font-medium text-neutral-600">
                  © {new Date().getFullYear()} Tharaneesh J. All rights reserved.
                </p>
                <div className="flex flex-wrap justify-center gap-x-4 sm:gap-x-6 text-[10px] uppercase tracking-[0.2em] font-bold text-neutral-700">
                  <span>Innovation</span>
                  <span className="text-white/[0.08]">|</span>
                  <span>Design</span>
                  <span className="text-white/[0.08]">|</span>
                  <span>Technology</span>
                </div>
                <p className="text-[11px] text-neutral-800 font-medium">
                  Built with precision and passion.
                </p>
              </div>
            </div>
          </footer>
        </div>
      </SmoothScroller>
    </>
  );
};

export default App;
