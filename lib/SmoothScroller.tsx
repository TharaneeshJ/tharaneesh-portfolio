import React, { useRef } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger, useGSAP);

/**
 * SmoothScroller — Lenis + GSAP ScrollTrigger integration.
 *
 * KEY: Lenis v1.x uses **native scrolling** (`window.scrollTo` internally).
 * It does NOT transform the scroll container like Locomotive Scroll.
 * Therefore ScrollTrigger.scrollerProxy() is NOT needed and actually BREAKS
 * pinning/scrubbing because it hijacks the scroll reading.
 *
 * The correct integration is:
 *   1. Drive Lenis's RAF from GSAP's ticker (frame-perfect sync)
 *   2. Notify ScrollTrigger on every Lenis scroll event
 *   3. That's it. No scrollerProxy.
 */
const SmoothScroller: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const lenisRef = useRef<Lenis | null>(null);

    useGSAP(() => {
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            orientation: 'vertical',
            gestureOrientation: 'vertical',
            smoothWheel: true,
            touchMultiplier: 2,
        });

        lenisRef.current = lenis;

        // Sync Lenis → ScrollTrigger on every scroll frame.
        // This is all that's needed — Lenis uses native scroll, so ScrollTrigger
        // can read window.scrollY directly. We just need to tell it to update.
        lenis.on('scroll', ScrollTrigger.update);

        // Drive Lenis's raf loop from GSAP's ticker for frame-perfect sync
        const tickerCallback = (time: number) => {
            lenis.raf(time * 1000);
        };

        gsap.ticker.add(tickerCallback);
        gsap.ticker.lagSmoothing(0);

        return () => {
            gsap.ticker.remove(tickerCallback);
            lenis.destroy();
            lenisRef.current = null;
        };
    });

    return <>{children}</>;
};

export default SmoothScroller;
