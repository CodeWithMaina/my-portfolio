import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { GraduationCap, Award, Users, Calendar, Star } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const certifications = [
  { name: 'Software Engineering Program', issuer: 'Teach2Give', year: '2025' },
  { name: 'API Engineer', issuer: 'API Academy', year: '' },
  { name: 'Cybersecurity Essentials', issuer: 'Cisco Networking Academy', year: '' },
];

const communities = [
  { name: 'Google Developer Student Club (GDSC)', icon: Users },
  { name: 'TechX Ambassador', icon: Star },
  { name: 'LUCOSA - Laikipia University Computer Society', icon: Users },
];

export function Education() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

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

      // Content animation
      const cards = contentRef.current?.querySelectorAll('.edu-card');
      const certItems = contentRef.current?.querySelectorAll('.cert-item');
      const communityItems = contentRef.current?.querySelectorAll('.community-item');

      if (cards) {
        cards.forEach((card, index) => {
          gsap.fromTo(
            card,
            { y: 40, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.6,
              delay: index * 0.1,
              scrollTrigger: {
                trigger: card,
                start: 'top 85%',
                toggleActions: 'play none none reverse',
              },
            }
          );
        });
      }

      if (certItems) {
        certItems.forEach((item, index) => {
          gsap.fromTo(
            item,
            { x: -20, opacity: 0 },
            {
              x: 0,
              opacity: 1,
              duration: 0.4,
              delay: index * 0.06,
              scrollTrigger: {
                trigger: item,
                start: 'top 90%',
                toggleActions: 'play none none reverse',
              },
            }
          );
        });
      }

      if (communityItems) {
        communityItems.forEach((item, index) => {
          gsap.fromTo(
            item,
            { x: -20, opacity: 0 },
            {
              x: 0,
              opacity: 1,
              duration: 0.4,
              delay: index * 0.06,
              scrollTrigger: {
                trigger: item,
                start: 'top 90%',
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
          className="font-heading font-bold text-center text-foreground leading-tight tracking-tight"
          style={{ fontSize: 'clamp(2rem, 3.6vw, 3.5rem)' }}
        >
          Education & Certs
        </h2>

        {/* Content Grid */}
        <div
          ref={contentRef}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mt-12 lg:mt-16"
        >
          {/* Education Card */}
          <div className="edu-card p-6 lg:p-8 bg-card rounded-2xl lg:rounded-3xl border border-border/50 shadow-card">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-12 h-12 rounded-xl bg-babyblue-100 dark:bg-babyblue-900/30 flex items-center justify-center">
                <GraduationCap className="w-6 h-6 text-babyblue-500 dark:text-babyblue-300" />
              </div>
              <h3 className="font-heading font-semibold text-xl text-foreground">
                Education
              </h3>
            </div>

            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-lg text-foreground">
                  BSc. Computer Science
                </h4>
                <p className="text-babyblue-500 dark:text-babyblue-300 font-medium">
                  Laikipia University
                </p>
                <div className="flex items-center gap-3 mt-2 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-4 h-4" />
                    Sep 2021 – Dec 2025
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2 px-4 py-2 bg-babyblue-50 dark:bg-babyblue-900/20 rounded-lg">
                <Star className="w-4 h-4 text-babyblue-500" />
                <span className="text-sm font-medium text-babyblue-700 dark:text-babyblue-300">
                  First Class Honours
                </span>
              </div>

              <p className="text-sm text-muted-foreground leading-relaxed">
                Relevant coursework: Data Structures, Web & Mobile Development, RESTful
                APIs, Cloud Computing, Software Engineering
              </p>
            </div>
          </div>

          {/* Certifications & Community */}
          <div className="space-y-6">
            {/* Certifications */}
            <div className="edu-card p-6 lg:p-8 bg-card rounded-2xl lg:rounded-3xl border border-border/50 shadow-card">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-12 h-12 rounded-xl bg-babyblue-100 dark:bg-babyblue-900/30 flex items-center justify-center">
                  <Award className="w-6 h-6 text-babyblue-500 dark:text-babyblue-300" />
                </div>
                <h3 className="font-heading font-semibold text-xl text-foreground">
                  Certifications
                </h3>
              </div>

              <ul className="space-y-3">
                {certifications.map((cert) => (
                  <li
                    key={cert.name}
                    className="cert-item flex items-start gap-3"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-babyblue-400 mt-2 flex-shrink-0" />
                    <div>
                      <p className="text-foreground font-medium">{cert.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {cert.issuer}
                        {cert.year && ` • ${cert.year}`}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Community */}
            <div className="edu-card p-6 lg:p-8 bg-card rounded-2xl lg:rounded-3xl border border-border/50 shadow-card">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-12 h-12 rounded-xl bg-babyblue-100 dark:bg-babyblue-900/30 flex items-center justify-center">
                  <Users className="w-6 h-6 text-babyblue-500 dark:text-babyblue-300" />
                </div>
                <h3 className="font-heading font-semibold text-xl text-foreground">
                  Community
                </h3>
              </div>

              <ul className="space-y-3">
                {communities.map((community) => (
                  <li
                    key={community.name}
                    className="community-item flex items-center gap-3"
                  >
                    <community.icon className="w-4 h-4 text-babyblue-400" />
                    <span className="text-foreground">{community.name}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
