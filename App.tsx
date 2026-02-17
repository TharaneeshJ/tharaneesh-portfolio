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
import MouseEffect from './components/MouseEffect';
import SkeletonLoader from './components/SkeletonLoader';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const App: React.FC = () => {
  const appRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const panelContainerRef = useRef<HTMLDivElement>(null);
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

      // ─── Stacking Panels (pin + content scroll + fade-out) ───
      if (!panelContainerRef.current) return;

      const panels = gsap.utils.toArray<HTMLElement>(
        panelContainerRef.current.querySelectorAll('.panel')
      );

      if (panels.length === 0) return;

      const vh = window.innerHeight;

      panels.forEach((panel, i) => {
        panel.style.zIndex = String(i + 1);

        const panelHeight = panel.scrollHeight;
        const overflow = Math.max(0, panelHeight - vh);
        const fadeDistance = vh * 0.3; // fade only uses 30% of viewport scroll

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: panel,
            start: 'top top',
            end: () => {
              const h = panel.scrollHeight;
              const extra = Math.max(0, h - vh);
              return `+=${extra + vh}`;
            },
            pin: true,
            pinSpacing: true,
            scrub: true,
            invalidateOnRefresh: true,
          },
        });

        // Phase 1: scroll through overflowing content
        if (overflow > 0) {
          tl.to(panel, {
            y: -overflow,
            ease: 'none',
            force3D: true,
            duration: overflow, // proportional to content length
          });
        }

        if (i < panels.length - 1) {
          // Phase 2: hold visible (the section stays fully visible while scrolling)
          tl.to({}, { duration: vh - fadeDistance });

          // Phase 3: quick fade at the very end
          tl.to(panel, {
            opacity: 0,
            scale: 0.98,
            ease: 'power1.in',
            force3D: true,
            duration: fadeDistance,
          });
        }
      });
    },
    { scope: appRef, dependencies: [isLoading] }
  );

  return (
    <>
      {isLoading && <SkeletonLoader onComplete={handleLoadingComplete} />}

      <SmoothScroller>
        <div ref={appRef} className="relative min-h-screen bg-black">
          <MouseEffect />

          {/* Scroll Progress Bar — white line */}
          <div
            ref={progressBarRef}
            className="fixed top-0 left-0 right-0 h-px bg-white origin-left z-[60]"
            style={{ transform: 'scaleX(0)' }}
          />

          <Header />

          <main ref={panelContainerRef} className="relative">
            <section className="panel min-h-screen flex items-center justify-center bg-black relative">
              <Hero />
            </section>

            <section className="panel min-h-screen flex items-center bg-black py-16 sm:py-24 relative">
              <div className="w-full relative z-10" id="skills">
                <Skills />
              </div>
            </section>

            <section className="panel min-h-screen flex items-center bg-black py-16 sm:py-24 relative">
              <div className="w-full relative z-10" id="experience">
                <ExperienceTimeline />
              </div>
            </section>

            <section className="panel min-h-screen flex items-center bg-black py-16 sm:py-24 relative">
              <div className="w-full relative z-10" id="projects">
                <Projects />
              </div>
            </section>

            <section className="panel min-h-screen flex items-center bg-black py-16 sm:py-24 relative">
              <div className="w-full relative z-10" id="education">
                <Education />
              </div>
            </section>

            <section className="panel min-h-screen flex items-center bg-black py-16 sm:py-24 text-white relative">
              <div className="w-full relative z-10" id="contact">
                <Contact />
              </div>
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
