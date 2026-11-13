import { BUSINESS_INFO } from '../data/businessData';
import { PageRoute, QuotePrefill } from '../types';

interface FooterProps {
  onNavigate: (route: PageRoute, prefill?: QuotePrefill) => void;
}

export function Footer({ onNavigate }: FooterProps) {
  return (
    <footer className="bg-[#23483F] text-[#FCF9F3] border-t border-[#FCF9F3]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8">
          {/* Brand Summary */}
          <div className="lg:col-span-4 space-y-4">
            <p className="font-serif text-3xl font-semibold tracking-tight text-[#FCF9F3]">
              Housepitality
            </p>
            <p className="text-sm text-[#E8D6B8] font-medium">
              {BUSINESS_INFO.legalName}
            </p>
            <p className="text-sm text-[#FCF9F3]/80 leading-relaxed max-w-sm">
              {BUSINESS_INFO.tagline} Locally owned and family operated in Newcastle, Oklahoma since{' '}
              {BUSINESS_INFO.established}.
            </p>
            <p className="text-xs text-[#A8BDA9] leading-relaxed pt-2">
              BBB Accredited Business (A+ Rating) as listed by the Better Business Bureau ·
              STROLL Magazine, Brookhaven Edition Partner
            </p>
          </div>

          {/* Services Navigation */}
          <div className="lg:col-span-3 space-y-3">
            <h2 className="font-sans text-xs font-semibold tracking-wider uppercase text-[#E8D6B8]">
              Services
            </h2>
            <ul className="space-y-2.5 text-sm text-[#FCF9F3]/85">
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('residential')}
                  className="hover:text-[#E8D6B8] transition-colors cursor-pointer text-left"
                >
                  Residential Cleaning
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('commercial')}
                  className="hover:text-[#E8D6B8] transition-colors cursor-pointer text-left"
                >
                  Commercial Cleaning
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('medical-dental')}
                  className="hover:text-[#E8D6B8] transition-colors cursor-pointer text-left"
                >
                  Medical &amp; Dental Facility Cleaning
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('additional-services')}
                  className="hover:text-[#E8D6B8] transition-colors cursor-pointer text-left"
                >
                  Deep Clean, Move &amp; Packing
                </button>
              </li>
            </ul>
          </div>

          {/* Explore Navigation */}
          <div className="lg:col-span-2 space-y-3">
            <h2 className="font-sans text-xs font-semibold tracking-wider uppercase text-[#E8D6B8]">
              Company
            </h2>
            <ul className="space-y-2.5 text-sm text-[#FCF9F3]/85">
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('our-story')}
                  className="hover:text-[#E8D6B8] transition-colors cursor-pointer"
                >
                  Our Story
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('our-work')}
                  className="hover:text-[#E8D6B8] transition-colors cursor-pointer"
                >
                  Our Work
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('service-areas')}
                  className="hover:text-[#E8D6B8] transition-colors cursor-pointer"
                >
                  Service Areas
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('quote')}
                  className="hover:text-[#E8D6B8] transition-colors cursor-pointer"
                >
                  Request a Free Quote
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('contact')}
                  className="hover:text-[#E8D6B8] transition-colors cursor-pointer"
                >
                  Contact
                </button>
              </li>
            </ul>
          </div>

          {/* Verified Contact Details */}
          <div className="lg:col-span-3 space-y-3">
            <h2 className="font-sans text-xs font-semibold tracking-wider uppercase text-[#E8D6B8]">
              Contact &amp; Hours
            </h2>
            <div className="space-y-2 text-sm text-[#FCF9F3]/85">
              <p>{BUSINESS_INFO.location}</p>
              <p className="text-xs text-[#FCF9F3]/70">
                Serving the Oklahoma City metro, subject to location confirmation.
              </p>
              <div className="pt-1 space-y-1 tabular-nums">
                {BUSINESS_INFO.phones.map((phone) => (
                  <p key={phone.display}>
                    <a
                      href={phone.href}
                      className="hover:text-[#E8D6B8] underline underline-offset-4 decoration-[#FCF9F3]/30 transition-colors"
                    >
                      {phone.display}
                    </a>
                  </p>
                ))}
              </div>
              <p className="pt-1 break-all">
                <a
                  href={BUSINESS_INFO.emailHref}
                  className="hover:text-[#E8D6B8] underline underline-offset-4 decoration-[#FCF9F3]/30 transition-colors"
                >
                  {BUSINESS_INFO.email}
                </a>
              </p>
              <div className="pt-2 text-xs text-[#FCF9F3]/75 space-y-0.5 tabular-nums">
                {BUSINESS_INFO.hours.map((h) => (
                  <p key={h.days}>
                    {h.days}: {h.time}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Quiet Bottom Bar with Required Redesign Disclosure */}
        <div className="mt-14 pt-8 border-t border-[#FCF9F3]/15 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-[#FCF9F3]/70">
          <p>{BUSINESS_INFO.legalName} · {BUSINESS_INFO.location}</p>
          <p className="text-[#E8D6B8]/90">{BUSINESS_INFO.disclosure}</p>
        </div>
      </div>
    </footer>
  );
}
