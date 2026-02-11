import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Mail, Linkedin, Github, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";

gsap.registerPlugin(ScrollTrigger);

export function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subcopyRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Heading animation
      gsap.fromTo(
        headingRef.current,
        { y: 24, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          scrollTrigger: {
            trigger: headingRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        },
      );

      // Subcopy animation
      gsap.fromTo(
        subcopyRef.current,
        { y: 18, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          delay: 0.1,
          scrollTrigger: {
            trigger: subcopyRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        },
      );

      // CTA animation
      gsap.fromTo(
        ctaRef.current,
        { y: 18, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          delay: 0.2,
          scrollTrigger: {
            trigger: ctaRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        },
      );

      // Footer animation
      gsap.fromTo(
        footerRef.current,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 0.5,
          delay: 0.3,
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top 95%",
            toggleActions: "play none none reverse",
          },
        },
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative w-full py-20 lg:py-32 bg-cream-300 dark:bg-muted/30 z-30"
    >
      <div className="px-6 lg:px-[7vw]">
        {/* Main Content */}
        <div className="max-w-2xl mx-auto text-center">
          {/* Heading */}
          <h2
            ref={headingRef}
            className="font-heading font-bold text-foreground leading-tight tracking-tight"
            style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)" }}
          >
            Let's build something calm.
          </h2>

          {/* Subcopy */}
          <p ref={subcopyRef} className="mt-4 text-lg text-muted-foreground">
            Open to full-stack, cloud, and product engineering roles.
          </p>

          {/* CTA Buttons */}
          <div
            ref={ctaRef}
            className="flex flex-wrap justify-center gap-3 mt-8"
          >
            <a href="mailto:petermaina.dev@gmail.com">
              <Button className="bg-foreground text-background hover:bg-foreground/90 rounded-xl px-6 py-5 text-sm font-medium shadow-button hover:shadow-hover transition-all">
                <Mail className="w-4 h-4 mr-2" />
                Email me
              </Button>
            </a>

            <a
              href="https://www.linkedin.com/in/peter-chege-803593349/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                variant="outline"
                className="rounded-xl px-6 py-5 text-sm font-medium border-border hover:bg-muted transition-all"
              >
                <Linkedin className="w-4 h-4 mr-2" />
                LinkedIn
              </Button>
            </a>

            <a
              href="https://github.com/CodeWithMaina"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                variant="outline"
                className="rounded-xl px-6 py-5 text-sm font-medium border-border hover:bg-muted transition-all"
              >
                <Github className="w-4 h-4 mr-2" />
                GitHub
              </Button>
            </a>
          </div>
        </div>

        {/* Footer */}
        <div
          ref={footerRef}
          className="mt-20 lg:mt-32 pt-8 border-t border-border/50"
        >
          <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground">
              © 2026 Peter Maina Chege. Built with Love.
            </p>
            <div className="flex items-center gap-6">
              <a
                href="#"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"
              >
                Back to top
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
