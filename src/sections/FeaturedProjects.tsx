import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ExternalLink, Github } from "lucide-react";
import { Button } from "@/components/ui/button";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    title: "StayCloud",
    subtitle: "Hotel Room Booking Platform",
    description:
      "A mobile-first booking system with real-time sync, Stripe payments, and secure role-based access. Built with performance in mind, featuring infinite scroll, lazy loading, and Firestore caching.",
    image: "/project-staycloud.jpg",
    tags: ["React", "Redux Toolkit", "Stripe", "Express", "PostgreSQL"],
    links: {
      live: "https://stay-cloud-rooms.netlify.app/",
      github: "https://github.com/CodeWithMaina/Hotel-Room-Booking-Frontend",
      frontend:
        "https://github.com/CodeWithMaina/Restaurant-Management-Fontend",
      backend: "https://github.com/CodeWithMaina/Restaurant-Management-API",
    },
  },
  {
    title: "Restaurant Management System",
    subtitle: "Role-based Management API",
    description:
      "A comprehensive restaurant management platform with secure authentication, responsive dashboards, and optimized database schema. Reduced data redundancy by 60% using Dockerized architecture.",
    image: "/project-restaurant.jpg",
    tags: [
      "React",
      "TypeScript",
      "Node.js",
      "DrizzleORM",
      "PostgreSQL",
      "Docker",
    ],
    links: {
      frontend:
        "https://github.com/CodeWithMaina/Restaurant-Management-Fontend",
      backend: "https://github.com/CodeWithMaina/Restaurant-Management-API",
    },
  },
];

export function FeaturedProjects() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

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

      // Project cards animation
      const cards = cardsRef.current?.querySelectorAll(".project-card");
      if (cards) {
        cards.forEach((card) => {
          const image = card.querySelector(".project-image");
          const tags = card.querySelectorAll(".project-tag");

          gsap.fromTo(
            card,
            { y: 60, rotateX: 6, opacity: 0 },
            {
              y: 0,
              rotateX: 0,
              opacity: 1,
              duration: 0.7,
              scrollTrigger: {
                trigger: card,
                start: "top 85%",
                toggleActions: "play none none reverse",
              },
            },
          );

          if (image) {
            gsap.fromTo(
              image,
              { scale: 1.06, x: 30, opacity: 0 },
              {
                scale: 1,
                x: 0,
                opacity: 1,
                duration: 0.7,
                delay: 0.1,
                scrollTrigger: {
                  trigger: card,
                  start: "top 85%",
                  toggleActions: "play none none reverse",
                },
              },
            );
          }

          if (tags.length) {
            gsap.fromTo(
              tags,
              { y: 12, opacity: 0 },
              {
                y: 0,
                opacity: 1,
                stagger: 0.05,
                duration: 0.4,
                delay: 0.2,
                scrollTrigger: {
                  trigger: card,
                  start: "top 85%",
                  toggleActions: "play none none reverse",
                },
              },
            );
          }
        });
      }
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="relative w-full py-20 lg:py-32 bg-cream-200 dark:bg-background z-30"
    >
      <div className="px-6 lg:px-[7vw]">
        {/* Heading */}
        <h2
          ref={headingRef}
          className="font-heading font-bold text-foreground leading-tight tracking-tight"
          style={{ fontSize: "clamp(2rem, 3.6vw, 3.5rem)" }}
        >
          Featured Projects
        </h2>

        {/* Project Cards */}
        <div ref={cardsRef} className="mt-12 lg:mt-16 space-y-12 lg:space-y-16">
          {projects.map((project) => (
            <div
              key={project.title}
              className="project-card group grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10 p-6 lg:p-8 bg-card rounded-2xl lg:rounded-3xl border border-border/50 shadow-card hover:shadow-hover transition-all duration-500"
            >
              {/* Image */}
              <div className="project-image relative rounded-xl lg:rounded-2xl overflow-hidden aspect-video lg:aspect-auto lg:h-full min-h-[200px]">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                />
              </div>

              {/* Content */}
              <div className="project-content flex flex-col justify-center">
                <h3 className="font-heading font-bold text-2xl lg:text-3xl text-foreground">
                  {project.title}
                </h3>
                <p className="text-babyblue-500 dark:text-babyblue-300 font-medium mt-1">
                  {project.subtitle}
                </p>
                <p className="mt-4 text-foreground/80 leading-relaxed">
                  {project.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mt-5">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="project-tag px-3 py-1 text-xs font-medium bg-muted rounded-full text-muted-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Links */}
                <div className="flex flex-wrap gap-3 mt-6">
                  {project.links.live && (
                    <Button
                      asChild
                      variant="default"
                      size="sm"
                      className="rounded-xl bg-foreground text-background hover:bg-foreground/90"
                    >
                      <a
                        href={project.links.live}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Live Demo
                      </a>
                    </Button>
                  )}

                  {project.links.github && (
                    <Button
                      asChild
                      variant="outline"
                      size="sm"
                      className="rounded-xl border-border hover:bg-muted"
                    >
                      <a
                        href={project.links.github}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Github className="w-4 h-4 mr-2" />
                        View Code
                      </a>
                    </Button>
                  )}

                  {project.links.frontend && (
                    <Button
                      asChild
                      variant="default"
                      size="sm"
                      className="rounded-xl bg-foreground text-background hover:bg-foreground/90"
                    >
                      <a
                        href={project.links.frontend}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Frontend
                      </a>
                    </Button>
                  )}

                  {project.links.backend && (
                    <Button
                      asChild
                      variant="outline"
                      size="sm"
                      className="rounded-xl border-border hover:bg-muted"
                    >
                      <a
                        href={project.links.backend}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Github className="w-4 h-4 mr-2" />
                        Backend
                      </a>
                    </Button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
