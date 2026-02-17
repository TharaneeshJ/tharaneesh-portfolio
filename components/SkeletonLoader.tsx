import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';

const SkeletonLoader: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const tl = gsap.timeline();

        // Entrance: stagger skeleton elements in
        const skeletonItems = contentRef.current?.querySelectorAll('.skel-item');
        if (skeletonItems) {
            tl.fromTo(
                skeletonItems,
                { opacity: 0, y: 12 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.4,
                    stagger: 0.06,
                    ease: 'power2.out',
                }
            );
        }

        // Hold for a moment, then exit
        tl.to({}, { duration: 1.2 });

        tl.to(containerRef.current, {
            opacity: 0,
            duration: 0.5,
            ease: 'power2.inOut',
            onComplete,
        });

        return () => {
            tl.kill();
        };
    }, [onComplete]);

    return (
        <div
            ref={containerRef}
            className="fixed inset-0 z-[100] bg-black flex items-center justify-center"
        >
            <div ref={contentRef} className="w-full max-w-3xl px-4 sm:px-8">
                {/* Simulated label */}
                <div className="skel-item mb-6 opacity-0">
                    <div className="skeleton-pulse h-2.5 w-24 bg-neutral-900" />
                </div>

                {/* Simulated heading */}
                <div className="skel-item mb-3 opacity-0">
                    <div className="skeleton-pulse h-8 sm:h-10 w-[80%] bg-neutral-900" />
                </div>
                <div className="skel-item mb-8 opacity-0">
                    <div className="skeleton-pulse h-8 sm:h-10 w-[55%] bg-neutral-900" />
                </div>

                {/* Accent line */}
                <div className="skel-item mb-8 opacity-0">
                    <div className="skeleton-pulse h-px w-10 bg-neutral-800" />
                </div>

                {/* Simulated paragraph lines */}
                <div className="skel-item mb-3 opacity-0">
                    <div className="skeleton-pulse h-3 w-full bg-neutral-900" />
                </div>
                <div className="skel-item mb-3 opacity-0">
                    <div className="skeleton-pulse h-3 w-[90%] bg-neutral-900" />
                </div>
                <div className="skel-item mb-8 opacity-0">
                    <div className="skeleton-pulse h-3 w-[70%] bg-neutral-900" />
                </div>

                {/* Simulated meta tags */}
                <div className="skel-item flex flex-wrap gap-3 sm:gap-4 mb-10 opacity-0">
                    <div className="skeleton-pulse h-8 w-24 sm:w-28 bg-neutral-900" />
                    <div className="skeleton-pulse h-8 w-28 sm:w-36 bg-neutral-900" />
                    <div className="skeleton-pulse h-8 w-20 sm:w-24 bg-neutral-900" />
                </div>

                {/* Simulated CTA buttons */}
                <div className="skel-item flex flex-col sm:flex-row gap-4 opacity-0">
                    <div className="skeleton-pulse h-12 w-full sm:w-36 bg-neutral-800" />
                    <div className="skeleton-pulse h-12 w-full sm:w-40 bg-neutral-900 border border-white/[0.06]" />
                </div>
            </div>
        </div>
    );
};

export default SkeletonLoader;
