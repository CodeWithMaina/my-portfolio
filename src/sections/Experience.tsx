import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MapPin, Calendar } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const experiences = [
  {
    role: 'Engineer',
    company: 'Griffin Global Technologies',
    location: 'Nyeri, Kenya',
    period: 'Dec 2025 – Present',
    achievements: [
      'Delivered full-stack systems across Next.js/React/TypeScript, C#/.NET, and cloud platforms supporting core business operations',
      'Improved API performance by 95%+ (25s → <1s), boosting platform reliability and customer experience',
      'Designed scalable cloud infrastructure, data layers, and reusable component libraries to enable rapid product growth',
      'Partnered with product and leadership to translate business requirements into high-impact technical solutions',
    ],
  },
  {
    role: 'Software Engineer',
    company: 'Opesha Solutions',
    location: 'Nairobi, Kenya',
    period: 'July 2023 – Dec 2025',
    achievements: [
      'Designed and optimized a cloud-based digital credit platform using React, React Native, Node.js, and TypeScript—improving performance by 30% and enabling 24/7 access for SMEs',
      'Engineered secure REST APIs and a scalable microservices architecture powering automated loan processing and investment workflows',
      'Enhanced system performance, accessibility, and scalability—driving financial inclusion for SMEs across Kenya',
      'Collaborated with distributed Agile teams across time zones, leveraging Dockerized CI/CD pipelines for continuous deployment',
    ],
  },
  {
    role: 'Software Engineering Attaché',
    company: 'Teach2Give',
    location: 'Laikipia, Kenya',
    period: 'May 2025 – Aug 2025',
    achievements: [
      'Trainee in the Teach2Give Software Engineering Cohort, leading a peer team in full-stack projects with React.js, Node.js, and PostgreSQL',
      'Delivered real-world apps using Agile, CI/CD, and secure RESTful APIs',
      'Developed problem-solving skills, communication, and teamwork through collaborative coding',
    ],
  },
];

export function Experience() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
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

      // Timeline line draw
      gsap.fromTo(
        timelineRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          duration: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: cardsRef.current,
            start: 'top 70%',
            end: 'bottom 50%',
            scrub: true,
          },
        }
      );

      // Cards animation
      const cards = cardsRef.current?.querySelectorAll('.experience-card');
      if (cards) {
        cards.forEach((card, index) => {
          gsap.fromTo(
            card,
            { x: '10vw', opacity: 0 },
            {
              x: 0,
              opacity: 1,
              duration: 0.6,
              delay: index * 0.12,
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
      id="experience"
      className="relative w-full py-20 lg:py-32 bg-cream-200 dark:bg-background z-30"
    >
      <div className="px-6 lg:px-[7vw]">
        {/* Heading */}
        <h2
          ref={headingRef}
          className="font-heading font-bold text-foreground leading-tight tracking-tight"
          style={{ fontSize: 'clamp(2rem, 3.6vw, 3.5rem)' }}
        >
          Experience
        </h2>

        {/* Timeline Container */}
        <div className="relative mt-12 lg:mt-16">
          {/* Vertical Line (desktop only) */}
          <div
            ref={timelineRef}
            className="hidden lg:block absolute left-[3vw] top-0 bottom-0 w-px bg-border origin-top"
          />

          {/* Experience Cards */}
          <div ref={cardsRef} className="space-y-8 lg:space-y-12 lg:pl-[8vw]">
            {experiences.map((exp) => (
              <div
                key={exp.company}
                className="experience-card relative p-6 lg:p-8 bg-card rounded-2xl lg:rounded-3xl border border-border/50 shadow-card"
              >
                {/* Timeline dot (desktop) */}
                <div className="hidden lg:block absolute -left-[5.5vw] top-10 w-3 h-3 rounded-full bg-babyblue-400 ring-4 ring-babyblue-100 dark:ring-babyblue-900/30" />

                {/* Header */}
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-2 lg:gap-4">
                  <div>
                    <h3 className="font-heading font-semibold text-xl lg:text-2xl text-foreground">
                      {exp.role}
                    </h3>
                    <p className="text-babyblue-500 dark:text-babyblue-300 font-medium mt-1">
                      {exp.company}
                    </p>
                  </div>
                  <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1.5">
                      <MapPin className="w-4 h-4" />
                      {exp.location}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Calendar className="w-4 h-4" />
                      {exp.period}
                    </span>
                  </div>
                </div>

                {/* Achievements */}
                <ul className="mt-5 space-y-2">
                  {exp.achievements.map((achievement, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-3 text-sm lg:text-base text-foreground/80 leading-relaxed"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-babyblue-400 mt-2 flex-shrink-0" />
                      {achievement}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
