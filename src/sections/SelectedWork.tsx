import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const works = [
  {
    title: 'NexuCore',
    description: 'Responsive landing page for a cloud systems brand.',
    image: '/gallery-nexucore.jpg',
    category: 'Web',
  },
  {
    title: 'StayCloud Admin',
    description: 'Analytics dashboard for bookings, payments, and user activity.',
    image: '/gallery-admin.jpg',
    category: 'Web',
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
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Gallery items animation
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
      className="relative w-full py-20 lg:py-32 bg-cream-200 dark:bg-background z-30"
    >
      <div className="px-6 lg:px-[7vw]">
        {/* Heading */}
        <h2
          ref={headingRef}
          className="font-heading font-bold text-foreground leading-tight tracking-tight"
          style={{ fontSize: 'clamp(2rem, 3.6vw, 3.5rem)' }}
        >
          Selected Work
        </h2>

        {/* Gallery Grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 mt-12 lg:mt-16"
        >
          {works.map((work) => (
            <a
              key={work.title}
              href="#"
              className="gallery-item group relative rounded-2xl lg:rounded-3xl overflow-hidden bg-card border border-border/50 shadow-card hover:shadow-hover transition-all duration-500"
            >
              {/* Image */}
              <div className="aspect-video overflow-hidden">
                <img
                  src={work.image}
                  alt={work.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                />
              </div>

              {/* Content Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              {/* Text Content */}
              <div className="absolute bottom-0 left-0 right-0 p-5 lg:p-6 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-xs font-medium text-babyblue-500 dark:text-babyblue-300 uppercase tracking-wider">
                      {work.category}
                    </span>
                    <h3 className="font-heading font-semibold text-lg lg:text-xl text-foreground mt-1">
                      {work.title}
                    </h3>
                    <p className="text-sm text-foreground/70 mt-1">{work.description}</p>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-foreground flex items-center justify-center flex-shrink-0">
                    <ArrowUpRight className="w-5 h-5 text-background" />
                  </div>
                </div>
              </div>

              {/* Always visible title (mobile) */}
              <div className="p-4 lg:hidden">
                <span className="text-xs font-medium text-babyblue-500 dark:text-babyblue-300 uppercase tracking-wider">
                  {work.category}
                </span>
                <h3 className="font-heading font-semibold text-lg text-foreground mt-1">
                  {work.title}
                </h3>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
