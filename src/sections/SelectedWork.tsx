import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight, Github, ExternalLink } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const works = [
  {
    title: 'NexuCore',
    description: 'Responsive landing page for a cloud systems brand.',
    image: '/gallery-nexucore.jpg',
    category: 'Web',
    links: {
      live: 'https://nexucore.netlify.app/',
      github: 'https://github.com/CodeWithMaina/NexuCore',
    },
  },
  {
    title: 'StayCloud',
    description: 'Analytics dashboard for bookings, payments, and user activity.',
    image: '/gallery-admin.jpg',
    category: 'Web',
    links: {
      live: 'https://stay-cloud-rooms.netlify.app/',
      github: 'https://github.com/CodeWithMaina/Hotel-Room-Booking-Frontend',
    },
  },
  {
    title: 'Credit Platform',
    description: 'Digital lending workflows for SMEs.',
    image: '/gallery-credit.jpg',
    category: 'Mobile',
  },
  {
    title: 'Design System',
    description: 'Reusable component library used across products.',
    image: '/gallery-designsystem.jpg',
    category: 'Design',
  },
];

export function SelectedWork() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        headingRef.current,
        { y: 24, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          scrollTrigger: {
            trigger: headingRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      const items = gridRef.current?.querySelectorAll('.gallery-item');

      if (items) {
        items.forEach((item, index) => {
          gsap.fromTo(
            item,
            { y: 50, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.6,
              delay: index * 0.1,
              scrollTrigger: {
                trigger: item,
                start: 'top 85%',
                toggleActions: 'play none none reverse',
              },
            }
          );
        });
      }
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-x-hidden py-16 sm:py-20 lg:py-32 bg-cream-200 dark:bg-background z-30"
    >
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-[7vw]">
        {/* Heading */}
        <h2
          ref={headingRef}
          className="font-heading font-bold text-foreground leading-tight tracking-tight"
          style={{ fontSize: 'clamp(2rem, 3.6vw, 3.5rem)' }}
        >
          Selected Work
        </h2>

        {/* Grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 lg:gap-8 mt-10 sm:mt-12 lg:mt-16"
        >
          {works.map((work) => (
            <div
              key={work.title}
              className="gallery-item group relative w-full max-w-full rounded-2xl lg:rounded-3xl overflow-hidden bg-card border border-border/50 shadow-card hover:shadow-hover transition-all duration-500"
            >
              {/* Image */}
              <div className="relative w-full aspect-[16/9] overflow-hidden">
                <img
                  src={work.image}
                  alt={work.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                />
              </div>

              {/* Hover Overlay (Desktop) */}
              <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden lg:block" />

              {/* Hover Content (Desktop) */}
              <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 hidden lg:block">
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-xs font-medium text-babyblue-500 dark:text-babyblue-300 uppercase tracking-wider">
                      {work.category}
                    </span>

                    <h3 className="font-heading font-semibold text-xl text-foreground mt-1">
                      {work.title}
                    </h3>

                    <p className="text-sm text-foreground/70 mt-1">
                      {work.description}
                    </p>

                    <div className="flex gap-3 mt-4">
                      {work.links?.live && (
                        <a
                          href={work.links.live}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center text-xs font-medium px-3 py-1.5 rounded-lg bg-foreground text-background hover:bg-foreground/90 transition-colors"
                        >
                          <ExternalLink className="w-3.5 h-3.5 mr-1" />
                          Live
                        </a>
                      )}

                      {work.links?.github && (
                        <a
                          href={work.links.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center text-xs font-medium px-3 py-1.5 rounded-lg border border-border hover:bg-muted transition-colors"
                        >
                          <Github className="w-3.5 h-3.5 mr-1" />
                          GitHub
                        </a>
                      )}
                    </div>
                  </div>

                  <div className="w-10 h-10 rounded-full bg-foreground flex items-center justify-center flex-shrink-0">
                    <ArrowUpRight className="w-5 h-5 text-background" />
                  </div>
                </div>
              </div>

              {/* Mobile Content */}
              <div className="p-4 lg:hidden">
                <span className="text-xs font-medium text-babyblue-500 dark:text-babyblue-300 uppercase tracking-wider">
                  {work.category}
                </span>

                <h3 className="font-heading font-semibold text-lg text-foreground mt-1">
                  {work.title}
                </h3>

                <p className="text-sm text-foreground/70 mt-1">
                  {work.description}
                </p>

                <div className="flex gap-4 mt-3">
                  {work.links?.live && (
                    <a
                      href={work.links.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-medium underline"
                    >
                      Live
                    </a>
                  )}

                  {work.links?.github && (
                    <a
                      href={work.links.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-medium underline"
                    >
                      GitHub
                    </a>
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
