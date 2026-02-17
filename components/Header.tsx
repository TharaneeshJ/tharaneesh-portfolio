import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { Menu, X } from 'lucide-react';
import { magneticHover, snapReturn } from '../lib/eases';

gsap.registerPlugin(useGSAP);

const Header: React.FC<{ isLoading: boolean }> = ({ isLoading }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const headerRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const navItemsRef = useRef<(HTMLButtonElement | null)[]>([]);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const underlineRefs = useRef<(HTMLSpanElement | null)[]>([]);

  const navItems = ['Skills', 'Experience', 'Projects', 'Education', 'Contact'];

  const { contextSafe } = useGSAP(
    () => {
      // Set initial state
      gsap.set(logoRef.current, { opacity: 0, x: -20 });
      gsap.set(navItemsRef.current.filter(Boolean), { opacity: 0, y: -10 });

      if (isLoading) return;

      const tl = gsap.timeline({
        defaults: { ease: 'power3.out', force3D: true },
      });

      tl.fromTo(
        logoRef.current,
        { opacity: 0, x: -20 },
        { opacity: 1, x: 0, duration: 0.6 }
      ).fromTo(
        navItemsRef.current.filter(Boolean),
        { opacity: 0, y: -10 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: 'power2.out',
          stagger: 0.08,
        },
        '-=0.3'
      );
    },
    { scope: headerRef, dependencies: [isLoading] }
  );

  useEffect(() => {
    const options: IntersectionObserverInit = {
      root: null,
      rootMargin: '-20% 0px -70% 0px',
      threshold: 0,
    };

    const callback: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(callback, options);

    navItems.forEach((item) => {
      const element = document.getElementById(item.toLowerCase());
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  const animateUnderlines = contextSafe(() => {
    underlineRefs.current.forEach((el, i) => {
      if (!el) return;
      const isActive = activeSection === navItems[i].toLowerCase();
      gsap.to(el, {
        width: isActive ? '100%' : '0%',
        opacity: isActive ? 1 : 0,
        duration: 0.3,
        ease: 'power2.out',
      });
    });
  });

  useEffect(() => {
    animateUnderlines();
  }, [activeSection]);

  useGSAP(
    () => {
      if (!mobileMenuRef.current) return;

      if (isMobileMenuOpen) {
        gsap.set(mobileMenuRef.current, { display: 'block' });
        gsap.fromTo(
          mobileMenuRef.current,
          { opacity: 0, height: 0 },
          { opacity: 1, height: 'auto', duration: 0.4, ease: 'power3.out' }
        );
      } else {
        gsap.to(mobileMenuRef.current, {
          opacity: 0,
          height: 0,
          duration: 0.3,
          ease: 'power2.in',
          onComplete: () => {
            if (mobileMenuRef.current) {
              gsap.set(mobileMenuRef.current, { display: 'none' });
            }
          },
        });
      }
    },
    { dependencies: [isMobileMenuOpen], scope: headerRef }
  );

  const handleNavHover = contextSafe(
    (el: HTMLButtonElement | null, enter: boolean) => {
      if (!el) return;
      gsap.to(el, {
        y: enter ? -2 : 0,
        color: enter ? '#ffffff' : '',
        duration: enter ? 0.45 : 0.35,
        ease: enter ? magneticHover : snapReturn,
        overwrite: true,
        force3D: true,
      });
    }
  );

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id.toLowerCase());
    if (element) {
      setIsMobileMenuOpen(false);
      const headerHeight = 64;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <header ref={headerRef} className="fixed top-0 left-0 right-0 z-50 bg-glass border-b border-white/[0.06]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <div
          ref={logoRef}
          className="font-bold text-lg tracking-tight text-white cursor-pointer opacity-0 font-mono"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          TJ<span className="text-neutral-500">.</span>
        </div>

        <nav className="hidden md:flex items-center space-x-10">
          {navItems.map((item, idx) => {
            const isActive = activeSection === item.toLowerCase();
            return (
              <button
                key={item}
                ref={(el) => {
                  navItemsRef.current[idx] = el;
                }}
                onClick={() => scrollToSection(item)}
                onMouseEnter={() => handleNavHover(navItemsRef.current[idx], true)}
                onMouseLeave={() => handleNavHover(navItemsRef.current[idx], false)}
                className={`relative text-xs font-medium tracking-wide uppercase transition-colors opacity-0 ${isActive ? 'text-white' : 'text-neutral-600 hover:text-white'
                  }`}
              >
                {item}
                <span
                  ref={(el) => {
                    underlineRefs.current[idx] = el;
                  }}
                  className="absolute -bottom-1 left-0 h-px bg-white"
                  style={{ width: '0%', opacity: 0 }}
                />
              </button>
            );
          })}
        </nav>

        <div className="flex items-center">
          <button
            className="md:hidden p-2 text-neutral-500 hover:text-white transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      <div
        ref={mobileMenuRef}
        className="md:hidden bg-black border-b border-white/[0.06] overflow-hidden"
        style={{ display: 'none', height: 0, opacity: 0 }}
      >
        <div className="flex flex-col p-6 space-y-4">
          {navItems.map((item) => (
            <button
              key={item}
              onClick={() => scrollToSection(item)}
              className={`text-left text-sm font-medium tracking-wide uppercase transition-colors ${activeSection === item.toLowerCase()
                ? 'text-white'
                : 'text-neutral-600 hover:text-white'
                }`}
            >
              {item}
            </button>
          ))}
        </div>
      </div>
    </header>
  );
};

export default Header;
