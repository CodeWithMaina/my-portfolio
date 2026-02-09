import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Calendar, Globe, Layers } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const facts = [
  { icon: Calendar, label: '5+ years shipping' },
  { icon: Layers, label: 'Full-stack / Cloud' },
  { icon: Globe, label: 'Remote-first' },
];

export function Profile() {
  const sectionRef = useRef<HTMLElement>(null);
  const photoRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const paragraphRef = useRef<HTMLParagraphElement>(null);
  const factsRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLAnchorElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  // Scroll-driven animation with three phases
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.4,
          onLeaveBack: () => {
            // Reset all elements when scrolling back
            gsap.to(photoRef.current, { x: 0, scale: 1, opacity: 1, duration: 0.3, overwrite: true });
            gsap.to([nameRef.current, paragraphRef.current], { x: 0, opacity: 1, duration: 0.3, overwrite: true });
            const factItems = factsRef.current?.querySelectorAll('.fact-item');
            if (factItems && factItems.length > 0) {
              gsap.to(factItems, { y: 0, opacity: 1, duration: 0.3, overwrite: true });
            }
            gsap.to(ctaRef.current, { y: 0, opacity: 1, duration: 0.3, overwrite: true });
          },
        },
      });

      // ENTRANCE PHASE (0%–30%)
      // Photo card slides in from left with scale
      scrollTl.fromTo(
        photoRef.current,
        { x: '-50vw', scale: 0.85, opacity: 0 },
        { x: 0, scale: 1, opacity: 1, ease: 'none' },
        0
      );

      // Name slides in from right
      scrollTl.fromTo(
        nameRef.current,
        { x: '35vw', opacity: 0 },
        { x: 0, opacity: 1, ease: 'none' },
        0.05
      );

      // Paragraph follows name
      scrollTl.fromTo(
        paragraphRef.current,
        { x: '35vw', opacity: 0 },
        { x: 0, opacity: 1, ease: 'none' },
        0.1
      );

      // Facts row fades up with stagger
      const factItems = factsRef.current?.querySelectorAll('.fact-item');
      if (factItems) {
        scrollTl.fromTo(
          factItems,
          { y: '8vh', opacity: 0 },
          { y: 0, opacity: 1, stagger: 0.03, ease: 'none' },
          0.12
        );
      }

      // CTA fades up
      scrollTl.fromTo(
        ctaRef.current,
        { y: '6vh', opacity: 0 },
        { y: 0, opacity: 1, ease: 'none' },
        0.18
      );

      // SETTLE PHASE (30%–70%) - Elements hold position
      // No animation needed, elements stay at settle state

      // EXIT PHASE (70%–100%)
      // Photo exits left
      scrollTl.fromTo(
        photoRef.current,
        { x: 0, scale: 1, opacity: 1 },
        { x: '-15vw', scale: 0.95, opacity: 0, ease: 'power2.in' },
        0.7
      );

      // Text content exits right
      scrollTl.fromTo(
        [nameRef.current, paragraphRef.current],
        { x: 0, opacity: 1 },
        { x: '12vw', opacity: 0, ease: 'power2.in' },
        0.7
      );

      // Facts fade down
      if (factItems) {
        scrollTl.fromTo(
          factItems,
          { y: 0, opacity: 1 },
          { y: '6vh', opacity: 0, ease: 'power2.in' },
          0.72
        );
      }

      // CTA fades
      scrollTl.fromTo(
        ctaRef.current,
        { opacity: 1 },
        { opacity: 0, ease: 'power2.in' },
        0.75
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-screen bg-cream-200 dark:bg-background overflow-hidden z-20"
    >
      <div className="relative h-full px-5 sm:px-6 lg:px-[6vw] flex flex-col lg:flex-row items-center justify-center gap-6 sm:gap-8 lg:gap-12 pt-16 sm:pt-20 lg:pt-0">
        {/* Left Photo Card */}
        <div
          ref={photoRef}
          className="w-full max-w-[280px] sm:max-w-sm lg:w-[44vw] lg:max-w-none lg:h-[68vh] rounded-2xl sm:rounded-3xl overflow-hidden shadow-card hover:shadow-hover transition-shadow duration-500 flex-shrink-0"
        >
          <img
            src="/profile-photo.jpg"
            alt="Peter Maina Chege"
            className="w-full h-56 sm:h-64 lg:h-full object-cover"
          />
        </div>

        {/* Right Content */}
        <div ref={contentRef} className="flex flex-col justify-center lg:w-[40vw] text-center lg:text-left">
          {/* Name */}
          <h2
            ref={nameRef}
            className="font-heading font-bold text-foreground leading-tight tracking-tight"
            style={{ fontSize: 'clamp(1.75rem, 6vw, 3.5rem)' }}
          >
            Peter Maina Chege
          </h2>

          {/* Paragraph */}
          <p
            ref={paragraphRef}
            className="mt-3 sm:mt-4 lg:mt-6 text-foreground/80 text-sm sm:text-base lg:text-lg leading-relaxed max-w-md mx-auto lg:mx-0 px-2 sm:px-0"
          >
            Software engineer focused on scalable web apps, cloud infrastructure, and calm
            user experiences. I like systems that are easy to maintain and teams that
            communicate clearly.
          </p>

          {/* Facts Row */}
          <div 
            ref={factsRef} 
            className="flex flex-wrap justify-center lg:justify-start gap-2 sm:gap-3 lg:gap-4 mt-4 sm:mt-6 lg:mt-8"
          >
            {facts.map((fact) => (
              <div
                key={fact.label}
                className="fact-item flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-muted/50 rounded-full"
              >
                <fact.icon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-babyblue-400" />
                <span className="text-xs sm:text-sm font-medium text-foreground">{fact.label}</span>
              </div>
            ))}
          </div>

          {/* CTA Link */}
          <a
            ref={ctaRef}
            href="#experience"
            className="inline-flex items-center justify-center lg:justify-start gap-2 mt-5 sm:mt-6 lg:mt-10 text-sm font-medium text-foreground hover:text-babyblue-400 transition-colors group"
          >
            Read the full story
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      </div>
    </section>
  );
}
