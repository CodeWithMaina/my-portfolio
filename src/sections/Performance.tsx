import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function Performance() {
  const sectionRef = useRef<HTMLElement>(null);
  const accentShapeRef = useRef<HTMLDivElement>(null);
  const metricRef = useRef<HTMLDivElement>(null);
  const supportingRef = useRef<HTMLParagraphElement>(null);
  const detailRef = useRef<HTMLParagraphElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=125%',
          pin: true,
          scrub: 0.6,
        },
      });

      // Accent shape entrance (0%–30%)
      scrollTl.fromTo(
        accentShapeRef.current,
        { x: '-40vw', scale: 0.9, opacity: 0 },
        { x: 0, scale: 1, opacity: 0.22, ease: 'none' },
        0
      );

      // Big metric entrance (0%–30%)
      scrollTl.fromTo(
        metricRef.current,
        { y: '18vh', opacity: 0 },
        { y: 0, opacity: 1, ease: 'none' },
        0
      );

      // Supporting line entrance
      scrollTl.fromTo(
        supportingRef.current,
        { y: '12vh', opacity: 0 },
        { y: 0, opacity: 1, ease: 'none' },
        0.1
      );

      // Detail paragraph entrance
      scrollTl.fromTo(
        detailRef.current,
        { y: '10vh', opacity: 0 },
        { y: 0, opacity: 1, ease: 'none' },
        0.15
      );

      // Right image card entrance (5%–30%)
      scrollTl.fromTo(
        imageRef.current,
        { x: '50vw', rotation: 2, opacity: 0 },
        { x: 0, rotation: 0, opacity: 1, ease: 'none' },
        0.05
      );

      // SETTLE (30%–70%): hold

      // EXIT (70%–100%)
      scrollTl.fromTo(
        accentShapeRef.current,
        { x: 0, opacity: 0.22 },
        { x: '-20vw', opacity: 0, ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(
        metricRef.current,
        { x: 0, opacity: 1 },
        { x: '-10vw', opacity: 0, ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(
        [supportingRef.current, detailRef.current],
        { opacity: 1 },
        { opacity: 0, ease: 'power2.in' },
        0.72
      );

      scrollTl.fromTo(
        imageRef.current,
        { x: 0, opacity: 1 },
        { x: '22vw', opacity: 0.3, ease: 'power2.in' },
        0.7
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-screen bg-cream-200 dark:bg-background overflow-hidden z-40"
    >
      {/* Oversized Accent Shape */}
      <div
        ref={accentShapeRef}
        className="absolute -left-[18vw] top-[10vh] w-[70vw] h-[80vh] rounded-[44px] bg-babyblue-300 opacity-0"
      />

      <div className="relative h-full px-6 lg:px-[7vw] flex flex-col lg:flex-row items-center justify-center gap-10 lg:gap-16 pt-20 lg:pt-0">
        {/* Left Content */}
        <div className="flex flex-col justify-center max-w-xl z-10">
          {/* Big Metric */}
          <div ref={metricRef}>
            <span
              className="font-heading font-bold text-babyblue-500 dark:text-babyblue-300 leading-none tracking-tighter"
              style={{ fontSize: 'clamp(4rem, 12vw, 9rem)' }}
            >
              95%
            </span>
            <span
              className="block font-heading font-bold text-foreground leading-none tracking-tight mt-2"
              style={{ fontSize: 'clamp(2rem, 5vw, 4rem)' }}
            >
              faster
            </span>
          </div>

          {/* Supporting Line */}
          <p
            ref={supportingRef}
            className="mt-6 lg:mt-8 text-xl lg:text-2xl font-medium text-foreground"
          >
            Cold starts under 1 second.
          </p>

          {/* Detail Paragraph */}
          <p
            ref={detailRef}
            className="mt-4 text-foreground/70 leading-relaxed max-w-md"
          >
            Re-architected a slow API by moving compute to the app layer, adding caching,
            and trimming payloads—without over-provisioning the database. The result:
            sub-1-second cold starts and under 500ms on every request thereafter.
          </p>
        </div>

        {/* Right Image Card */}
        <div
          ref={imageRef}
          className="w-full max-w-md lg:w-[40vw] lg:max-w-none lg:h-[64vh] rounded-2xl lg:rounded-3xl overflow-hidden shadow-card flex-shrink-0"
        >
          <img
            src="/performance-code.jpg"
            alt="Code optimization"
            className="w-full h-64 lg:h-full object-cover"
          />
        </div>
      </div>
    </section>
  );
}
