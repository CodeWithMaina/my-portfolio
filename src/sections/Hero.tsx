import { useEffect, useRef, useLayoutEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowDown, Download } from "lucide-react";
import { Button } from "@/components/ui/button";

gsap.registerPlugin(ScrollTrigger);

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const underlineRef = useRef<HTMLDivElement>(null);
  const subheadlineRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const portraitRef = useRef<HTMLDivElement>(null);
  const captionRef = useRef<HTMLParagraphElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  // Load animation (auto-play on mount)
  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const loadTl = gsap.timeline({
        defaults: { ease: "power3.out" },
        delay: 0.2,
      });

      // Content container fade in
      loadTl.fromTo(
        contentRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.4 },
      );

      // Headline words animation - staggered reveal
      const words = headlineRef.current?.querySelectorAll(".word");
      if (words) {
        loadTl.fromTo(
          words,
          { y: 60, opacity: 0, rotateX: -15 },
          {
            y: 0,
            opacity: 1,
            rotateX: 0,
            duration: 0.8,
            stagger: 0.1,
          },
          0.1,
        );
      }

      // Underline bar - smooth draw
      loadTl.fromTo(
        underlineRef.current,
        { scaleX: 0, opacity: 0 },
        { scaleX: 1, opacity: 1, duration: 0.6, ease: "power2.out" },
        0.5,
      );

      // Subheadline - fade up
      loadTl.fromTo(
        subheadlineRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6 },
        0.7,
      );

      // CTA buttons - staggered fade up
      const buttons = ctaRef.current?.querySelectorAll("button");
      if (buttons) {
        loadTl.fromTo(
          buttons,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.5, stagger: 0.1 },
          0.85,
        );
      }

      // Portrait card - smooth slide in with scale
      loadTl.fromTo(
        portraitRef.current,
        { x: 80, scale: 0.9, opacity: 0 },
        { x: 0, scale: 1, opacity: 1, duration: 0.9, ease: "power2.out" },
        0.3,
      );

      // Caption - gentle fade
      loadTl.fromTo(
        captionRef.current,
        { y: 10, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5 },
        1,
      );
    }, section);

    return () => ctx.revert();
  }, []);

  // Scroll-driven exit animation
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=120%",
          pin: true,
          scrub: 0.5,
          onLeaveBack: () => {
            // Reset all elements when scrolling back to top
            gsap.to(
              [headlineRef.current, subheadlineRef.current, ctaRef.current],
              {
                x: 0,
                y: 0,
                opacity: 1,
                duration: 0.3,
                overwrite: true,
              },
            );
            gsap.to(underlineRef.current, {
              x: 0,
              opacity: 1,
              scaleX: 1,
              duration: 0.3,
              overwrite: true,
            });
            gsap.to(portraitRef.current, {
              x: 0,
              y: 0,
              rotation: 0,
              opacity: 1,
              scale: 1,
              duration: 0.3,
              overwrite: true,
            });
            gsap.to(captionRef.current, {
              opacity: 1,
              duration: 0.3,
              overwrite: true,
            });
          },
        },
      });

      // Phase 1 (0%–60%): hold at settle state - no animation

      // Phase 2 (60%–100%): smooth exit
      // Headline exits left
      scrollTl.fromTo(
        headlineRef.current,
        { x: 0, opacity: 1 },
        { x: "-12vw", opacity: 0, ease: "power2.in" },
        0.6,
      );

      // Underline follows
      scrollTl.fromTo(
        underlineRef.current,
        { x: 0, opacity: 1, scaleX: 1 },
        { x: "-18vw", opacity: 0, scaleX: 0.8, ease: "power2.in" },
        0.62,
      );

      // Subheadline fades down
      scrollTl.fromTo(
        subheadlineRef.current,
        { y: 0, opacity: 1 },
        { y: "8vh", opacity: 0, ease: "power2.in" },
        0.65,
      );

      // CTAs fade down
      scrollTl.fromTo(
        ctaRef.current,
        { y: 0, opacity: 1 },
        { y: "6vh", opacity: 0, ease: "power2.in" },
        0.68,
      );

      // Portrait exits right with slight rotation
      scrollTl.fromTo(
        portraitRef.current,
        { x: 0, y: 0, rotation: 0, opacity: 1, scale: 1 },
        {
          x: "15vw",
          y: "-5vh",
          rotation: 3,
          opacity: 0,
          scale: 0.95,
          ease: "power2.in",
        },
        0.6,
      );

      // Caption fades
      scrollTl.fromTo(
        captionRef.current,
        { opacity: 1 },
        { opacity: 0, ease: "power2.in" },
        0.7,
      );
    }, section);

    return () => ctx.revert();
  }, []);

  const handleScrollToWork = () => {
    const element = document.querySelector("#projects");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-screen bg-cream-200 dark:bg-background overflow-hidden z-10"
    >
      <div
        ref={contentRef}
        className="relative h-full px-5 sm:px-6 lg:px-[7vw] pt-20 sm:pt-24 lg:pt-0"
      >
        <div className="flex flex-col lg:flex-row items-center justify-center h-full gap-8 lg:gap-0">
          {/* Left Content */}
          <div className="flex flex-col justify-center max-w-2xl w-full lg:w-auto text-center lg:text-left">
            {/* Headline */}
            <h1
              ref={headlineRef}
              className="font-heading font-bold text-foreground leading-[0.95] tracking-tight"
              style={{
                fontSize: "clamp(2.25rem, 8vw, 4.75rem)",
                perspective: "1000px",
              }}
            >
              <span className="word inline-block">Full-Stack</span>{" "}
              <span className="word inline-block">Engineer</span>
            </h1>

            {/* Underline bar */}
            <div
              ref={underlineRef}
              className="h-2 lg:h-3 bg-babyblue-300 rounded-full mt-4 lg:mt-6 mx-auto lg:mx-0 w-[70%] sm:w-[60%] lg:w-[62vw] max-w-[500px] lg:max-w-none"
              style={{ transformOrigin: "left center" }}
            />

            {/* Subheadline */}
            <p
              ref={subheadlineRef}
              className="mt-5 lg:mt-8 text-foreground/80 text-base sm:text-lg leading-relaxed max-w-md mx-auto lg:mx-0 px-2 sm:px-0"
            >
              I build calm, high-performance systems, clear architecture, clean
              UI, and measurable impact.
            </p>

            {/* CTA Buttons */}
            <div
              ref={ctaRef}
              className="flex flex-wrap justify-center lg:justify-start gap-3 mt-6 lg:mt-10"
            >
              <Button
                onClick={handleScrollToWork}
                className="bg-foreground text-background hover:bg-foreground/90 rounded-xl px-5 sm:px-6 py-5 text-sm font-medium shadow-button hover:shadow-hover transition-all duration-300 hover:-translate-y-0.5"
              >
                View selected work
                <ArrowDown className="w-4 h-4 ml-2" />
              </Button>
              <a href="/Peter-Maina-Chege-Central-Resume.pdf" download>
                <Button
                  variant="outline"
                  className="rounded-xl px-5 sm:px-6 py-5 text-sm font-medium border-border hover:bg-muted transition-all duration-300 hover:-translate-y-0.5"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download resume
                </Button>
              </a>
            </div>
          </div>

          {/* Right Portrait Card - Desktop */}
          <div
            ref={portraitRef}
            className="hidden lg:block absolute right-[4vw] xl:right-[6vw] top-[15vh] xl:top-[18vh] w-[32vw] xl:w-[34vw] h-[58vh] xl:h-[64vh] rounded-3xl overflow-hidden shadow-card hover:shadow-hover transition-shadow duration-500"
          >
            <img
              src="/me.jpeg"
              alt="Peter Maina Chege"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Caption under portrait - Desktop */}
          <p
            ref={captionRef}
            className="hidden lg:block absolute right-[4vw] xl:right-[6vw] top-[76vh] xl:top-[84vh] w-[32vw] xl:w-[34vw] text-center text-sm text-muted-foreground"
          >
            Based in Kenya • Working worldwide
          </p>
        </div>

        {/* Mobile Portrait - Below content */}
        <div className="lg:hidden absolute bottom-16 sm:bottom-20 left-1/2 -translate-x-1/2">
          <p
            ref={captionRef}
            className="text-center text-xs sm:text-sm text-muted-foreground mt-3"
          >
            Based in Kenya • Working worldwide
          </p>
        </div>
      </div>
    </section>
  );
}
