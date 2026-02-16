import { useState, useEffect } from 'react';
import { X, Sun, Moon } from 'lucide-react';
import { useTheme } from '@/hooks/useTheme';
import { Button } from '@/components/ui/button';

const navLinks = [
  { label: 'Work', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Skills', href: '#skills' },
  { label: 'Contact', href: '#contact' },
];

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const handleLinkClick = (href: string) => {
    setIsOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Fixed Header */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'bg-background/80 backdrop-blur-xl border-b border-border/50'
            : 'bg-transparent'
        }`}
      >
        <div className="flex items-center justify-between px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 py-3 sm:py-4 lg:py-5 max-w-screen-2xl mx-auto">
          {/* Logo */}
          <a
            href="#"
            className="font-heading font-semibold text-base sm:text-lg lg:text-xl tracking-tight text-foreground hover:opacity-70 transition-opacity"
          >
            <span className="hidden sm:inline">Peter Maina Chege</span>
            <span className="sm:hidden">PMC</span>
          </a>

          {/* Right side actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Theme Toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="rounded-full w-9 h-9 sm:w-10 sm:h-10 hover:bg-muted"
              aria-label="Toggle theme"
            >
              {theme === 'light' ? (
                <Moon className="w-4 h-4 sm:w-5 sm:h-5" />
              ) : (
                <Sun className="w-4 h-4 sm:w-5 sm:h-5" />
              )}
            </Button>

            {/* Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(true)}
              className="font-medium text-xs sm:text-sm hover:bg-muted rounded-full px-3 sm:px-4"
            >
              Menu
            </Button>
          </div>
        </div>
      </header>

      {/* Full-screen Menu Overlay */}
      <div
        className={`fixed inset-0 z-[100] transition-all duration-500 ${
          isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-background/95 backdrop-blur-xl"
          onClick={() => setIsOpen(false)}
        />

        {/* Menu Content */}
        <div className="relative h-full flex flex-col">
          {/* Menu Header */}
          <div className="flex items-center justify-between px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 py-3 sm:py-4 lg:py-5 max-w-screen-2xl mx-auto w-full">
            <span className="font-heading font-semibold text-base sm:text-lg lg:text-xl tracking-tight text-foreground">
              <span className="hidden sm:inline">Peter Maina Chege</span>
              <span className="sm:hidden">PMC</span>
            </span>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(false)}
              className="rounded-full w-9 h-9 sm:w-10 sm:h-10 hover:bg-muted"
              aria-label="Close menu"
            >
              <X className="w-4 h-4 sm:w-5 sm:h-5" />
            </Button>
          </div>

          {/* Menu Links */}
          <nav className="flex-1 flex flex-col justify-center px-4 sm:px-6 md:px-10 lg:px-20 xl:px-24 max-w-screen-2xl mx-auto w-full">
            <ul className="space-y-1 sm:space-y-2">
              {navLinks.map((link, index) => (
                <li
                  key={link.href}
                  className={`transform transition-all duration-500 ${
                    isOpen
                      ? 'translate-y-0 opacity-100'
                      : 'translate-y-8 opacity-0'
                  }`}
                  style={{ transitionDelay: `${index * 80 + 100}ms` }}
                >
                  <button
                    onClick={() => handleLinkClick(link.href)}
                    className="group flex items-center gap-3 sm:gap-4 py-2 sm:py-3 w-full text-left"
                  >
                    <span className="text-[10px] sm:text-xs font-medium text-muted-foreground uppercase tracking-widest w-6 sm:w-8 flex-shrink-0">
                      0{index + 1}
                    </span>
                    <span className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-medium text-foreground group-hover:text-babyblue-400 transition-colors leading-tight">
                      {link.label}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          {/* Menu Footer */}
          <div className="px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 py-4 sm:py-6 lg:py-8 max-w-screen-2xl mx-auto w-full">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
              <p className="text-xs sm:text-sm text-muted-foreground">
                Full-Stack Engineer based in Kenya
              </p>
              <div className="flex items-center gap-4 sm:gap-6">
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs sm:text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  GitHub
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs sm:text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  LinkedIn
                </a>
                <a
                  href="mailto:peter@example.com"
                  className="text-xs sm:text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Email
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
