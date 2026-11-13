import { useEffect, useRef, useState } from 'react';
import { ChevronDown, Menu, Phone, X } from 'lucide-react';
import { BUSINESS_INFO } from '../data/businessData';
import { PageRoute, QuotePrefill } from '../types';

interface HeaderProps {
  activeRoute: PageRoute;
  onNavigate: (route: PageRoute, prefill?: QuotePrefill) => void;
}

const SERVICE_SUBLINKS: { route: PageRoute; label: string }[] = [
  { route: 'residential', label: 'Residential Cleaning' },
  { route: 'commercial', label: 'Commercial Cleaning' },
  { route: 'medical-dental', label: 'Medical & Dental Facility' },
  { route: 'additional-services', label: 'Deep Clean, Move & Packing' },
];

export function Header({ activeRoute, onNavigate }: HeaderProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const isServiceActive =
    activeRoute === 'residential' ||
    activeRoute === 'commercial' ||
    activeRoute === 'medical-dental' ||
    activeRoute === 'additional-services';

  useEffect(() => {
    const handleOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setServicesOpen(false);
      }
    };
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setServicesOpen(false);
        setMobileOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutside);
    document.addEventListener('keydown', handleKey);
    return () => {
      document.removeEventListener('mousedown', handleOutside);
      document.removeEventListener('keydown', handleKey);
    };
  }, []);

  const navigateAndClose = (route: PageRoute, prefill?: QuotePrefill) => {
    setMobileOpen(false);
    setServicesOpen(false);
    onNavigate(route, prefill);
  };

  const navLinkClass = (isActive: boolean) =>
    `text-sm font-medium transition-colors duration-150 whitespace-nowrap shrink-0 py-1 border-b ${
      isActive
        ? 'text-[#23483F] border-[#23483F]'
        : 'text-[#29342F]/80 border-transparent hover:text-[#23483F] hover:border-[#23483F]/40'
    }`;

  return (
    <header className="sticky top-0 z-40 bg-[#FCF9F3]/95 backdrop-blur-md border-b border-[#29342F]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 h-16 lg:h-20 flex items-center justify-between gap-4 lg:gap-8">
        {/* Zone 1: Single-line Brand Wordmark */}
        <a
          href="#home"
          onClick={(e) => {
            e.preventDefault();
            navigateAndClose('home');
          }}
          className="font-serif text-2xl sm:text-[26px] font-semibold tracking-tight text-[#23483F] whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4"
        >
          Housepitality
        </a>

        {/* Zone 2: Concise single-line desktop navigation */}
        <nav aria-label="Main navigation" className="hidden lg:flex items-center gap-7">
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              navigateAndClose('home');
            }}
            className={navLinkClass(activeRoute === 'home')}
          >
            Home
          </a>

          <div className="relative" ref={dropdownRef}>
            <button
              type="button"
              onClick={() => setServicesOpen((prev) => !prev)}
              aria-expanded={servicesOpen}
              aria-haspopup="true"
              className={`inline-flex items-center gap-1 text-sm font-medium transition-colors duration-150 whitespace-nowrap shrink-0 py-1 border-b cursor-pointer ${
                isServiceActive
                  ? 'text-[#23483F] border-[#23483F]'
                  : 'text-[#29342F]/80 border-transparent hover:text-[#23483F]'
              }`}
            >
              <span>Services</span>
              <ChevronDown
                className={`w-3.5 h-3.5 transition-transform duration-150 ${
                  servicesOpen ? 'rotate-180' : ''
                }`}
                aria-hidden="true"
              />
            </button>

            {servicesOpen && (
              <div
                role="menu"
                className="absolute left-0 top-full mt-3 w-64 bg-[#FCF9F3] border border-[#29342F]/15 rounded-lg shadow-lg py-2 z-50"
              >
                {SERVICE_SUBLINKS.map((item) => (
                  <button
                    key={item.route}
                    type="button"
                    role="menuitem"
                    onClick={() => navigateAndClose(item.route)}
                    className={`w-full text-left px-4 py-2.5 text-sm transition-colors cursor-pointer ${
                      activeRoute === item.route
                        ? 'bg-[#23483F]/8 text-[#23483F] font-semibold'
                        : 'text-[#29342F] hover:bg-[#F5EFE4]'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          <a
            href="#our-story"
            onClick={(e) => {
              e.preventDefault();
              navigateAndClose('our-story');
            }}
            className={navLinkClass(activeRoute === 'our-story')}
          >
            Our Story
          </a>

          <a
            href="#our-work"
            onClick={(e) => {
              e.preventDefault();
              navigateAndClose('our-work');
            }}
            className={navLinkClass(activeRoute === 'our-work')}
          >
            Our Work
          </a>

          <a
            href="#service-areas"
            onClick={(e) => {
              e.preventDefault();
              navigateAndClose('service-areas');
            }}
            className={navLinkClass(activeRoute === 'service-areas')}
          >
            Service Areas
          </a>

          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              navigateAndClose('contact');
            }}
            className={navLinkClass(activeRoute === 'contact')}
          >
            Contact
          </a>
        </nav>

        {/* Zone 3: Primary CTA + Secondary Contact Action */}
        <div className="flex items-center gap-3 sm:gap-5 shrink-0">
          <a
            href={BUSINESS_INFO.phones[0].href}
            className="hidden xl:inline-flex items-center gap-1.5 text-sm font-medium text-[#23483F] hover:text-[#C9856C] transition-colors whitespace-nowrap shrink-0"
          >
            <Phone className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Call or Text Us</span>
          </a>

          <button
            type="button"
            onClick={() => navigateAndClose('quote')}
            className="hidden sm:inline-flex items-center justify-center px-5 py-2.5 text-xs sm:text-sm font-medium text-[#FCF9F3] bg-[#23483F] hover:bg-[#1A362F] rounded-md transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer min-h-[40px]"
          >
            Get a Free Quote
          </button>

          {/* Mobile Controls */}
          <a
            href={BUSINESS_INFO.phones[0].href}
            aria-label="Call or Text Housepitality at (405) 816-9990"
            className="sm:hidden inline-flex items-center justify-center w-11 h-11 text-[#23483F] rounded-md hover:bg-[#F5EFE4] transition-colors"
          >
            <Phone className="w-5 h-5" aria-hidden="true" />
          </a>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-expanded={mobileOpen}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            className="lg:hidden inline-flex items-center justify-center w-11 h-11 text-[#29342F] rounded-md hover:bg-[#F5EFE4] transition-colors cursor-pointer"
          >
            {mobileOpen ? (
              <X className="w-5 h-5" aria-hidden="true" />
            ) : (
              <Menu className="w-5 h-5" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {/* Accessible Mobile Navigation Drawer */}
      {mobileOpen && (
        <div className="lg:hidden bg-[#FCF9F3] border-t border-[#29342F]/10 px-4 py-6 max-h-[82vh] overflow-y-auto">
          <nav aria-label="Mobile navigation" className="flex flex-col gap-1">
            <button
              type="button"
              onClick={() => navigateAndClose('home')}
              className={`text-left px-3 py-3 rounded-md text-base font-medium min-h-[44px] cursor-pointer ${
                activeRoute === 'home' ? 'bg-[#23483F]/8 text-[#23483F]' : 'text-[#29342F]'
              }`}
            >
              Home
            </button>

            <div className="pt-2 pb-1 px-3 text-xs font-medium text-[#29342F]/60">
              Services
            </div>
            {SERVICE_SUBLINKS.map((item) => (
              <button
                key={item.route}
                type="button"
                onClick={() => navigateAndClose(item.route)}
                className={`text-left pl-6 pr-3 py-3 rounded-md text-base min-h-[44px] cursor-pointer ${
                  activeRoute === item.route
                    ? 'bg-[#23483F]/8 text-[#23483F] font-semibold'
                    : 'text-[#29342F]'
                }`}
              >
                {item.label}
              </button>
            ))}

            <div className="my-2 border-t border-[#29342F]/10" />

            {(
              [
                { route: 'our-story', label: 'Our Story' },
                { route: 'our-work', label: 'Our Work' },
                { route: 'service-areas', label: 'Service Areas' },
                { route: 'contact', label: 'Contact' },
              ] as { route: PageRoute; label: string }[]
            ).map((item) => (
              <button
                key={item.route}
                type="button"
                onClick={() => navigateAndClose(item.route)}
                className={`text-left px-3 py-3 rounded-md text-base font-medium min-h-[44px] cursor-pointer ${
                  activeRoute === item.route ? 'bg-[#23483F]/8 text-[#23483F]' : 'text-[#29342F]'
                }`}
              >
                {item.label}
              </button>
            ))}

            <div className="mt-5 pt-5 border-t border-[#29342F]/10 flex flex-col gap-3">
              <button
                type="button"
                onClick={() => navigateAndClose('quote')}
                className="w-full py-3.5 px-5 bg-[#23483F] text-[#FCF9F3] text-base font-medium rounded-md text-center min-h-[48px] cursor-pointer"
              >
                Get a Free Quote
              </button>

              <div className="grid grid-cols-2 gap-3">
                <a
                  href={BUSINESS_INFO.phones[0].href}
                  className="flex items-center justify-center gap-2 py-3 px-3 border border-[#23483F]/30 text-[#23483F] rounded-md text-sm font-medium min-h-[44px]"
                >
                  <Phone className="w-4 h-4" aria-hidden="true" />
                  <span className="tabular-nums">(405) 816-9990</span>
                </a>
                <a
                  href={BUSINESS_INFO.phones[1].href}
                  className="flex items-center justify-center gap-2 py-3 px-3 border border-[#23483F]/30 text-[#23483F] rounded-md text-sm font-medium min-h-[44px]"
                >
                  <Phone className="w-4 h-4" aria-hidden="true" />
                  <span className="tabular-nums">(405) 588-3752</span>
                </a>
              </div>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
