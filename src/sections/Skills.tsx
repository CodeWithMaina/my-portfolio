import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Code2,
  Layout,
  Server,
  Database,
  Cloud,
  Wrench,
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const skills = [
  {
    icon: Code2,
    title: 'Languages',
    items: ['TypeScript', 'JavaScript (ES6+)', 'C#', '.NET'],
  },
  {
    icon: Layout,
    title: 'Frontend',
    items: ['React', 'React Native', 'Next.js', 'Redux', 'HTML5', 'CSS3', 'Tailwind CSS'],
  },
  {
    icon: Server,
    title: 'Backend',
    items: ['Node.js', 'Express', 'ORM', 'RESTful APIs', 'JWT', 'Microservices'],
  },
  {
    icon: Database,
    title: 'Databases',
    items: ['PostgreSQL', 'MySQL', 'Firebase', 'Supabase', 'SQL Server'],
  },
  {
    icon: Cloud,
    title: 'DevOps & Cloud',
    items: ['Docker', 'Kubernetes', 'Git', 'CI/CD', 'Azure', 'AWS', 'Terraform'],
  },
  {
    icon: Wrench,
    title: 'Methods & Tools',
    items: ['Agile/Scrum', 'Jira', 'Confluence', 'Code reviews', 'GitHub'],
  },
];

export function Skills() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const introRef = useRef<HTMLParagraphElement>(null);
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
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Intro animation
      gsap.fromTo(
        introRef.current,
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          scrollTrigger: {
            trigger: introRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Cards animation
      const cards = cardsRef.current?.querySelectorAll('.skill-card');
      if (cards) {
        cards.forEach((card, index) => {
          gsap.fromTo(
            card,
            { y: 40, scale: 0.98, opacity: 0 },
            {
              y: 0,
              scale: 1,
              opacity: 1,
              duration: 0.5,
              delay: index * 0.08,
              scrollTrigger: {
                trigger: card,
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
      id="skills"
      className="relative w-full py-20 lg:py-32 bg-cream-200 dark:bg-background z-30"
    >
      <div className="px-6 lg:px-[7vw]">
        {/* Heading */}
        <h2
          ref={headingRef}
          className="font-heading font-bold text-center text-foreground leading-tight tracking-tight"
          style={{ fontSize: 'clamp(2rem, 3.6vw, 3.5rem)' }}
        >
          Skills & Stack
        </h2>

        {/* Intro */}
        <p
          ref={introRef}
          className="mt-4 text-center text-muted-foreground text-base lg:text-lg max-w-xl mx-auto"
        >
          A practical toolkit for building, deploying, and maintaining production systems.
        </p>

        {/* Skills Grid */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6 mt-12 lg:mt-16"
        >
          {skills.map((skill) => (
            <div
              key={skill.title}
              className="skill-card group p-6 lg:p-8 bg-card rounded-2xl lg:rounded-3xl border border-border/50 shadow-card hover:shadow-hover transition-all duration-300 hover:-translate-y-1.5"
            >
              {/* Icon */}
              <div className="w-12 h-12 rounded-xl bg-babyblue-100 dark:bg-babyblue-900/30 flex items-center justify-center mb-5">
                <skill.icon className="w-6 h-6 text-babyblue-500 dark:text-babyblue-300" />
              </div>

              {/* Title */}
              <h3 className="font-heading font-semibold text-lg text-foreground mb-3">
                {skill.title}
              </h3>

              {/* Items */}
              <div className="flex flex-wrap gap-2">
                {skill.items.map((item) => (
                  <span
                    key={item}
                    className="px-3 py-1 text-xs font-medium bg-muted rounded-full text-muted-foreground"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
