import { useState } from 'react';
import { ArrowLeft, ArrowRight, Clock, Expand, Mail, MapPin, Phone } from 'lucide-react';
import { BUSINESS_INFO, GALLERY_ITEMS } from '../data/businessData';
import { MEDIA } from '../data/media';
import { GalleryItem, PageRoute, QuotePrefill } from '../types';
import { EditorialImage } from './EditorialImage';
import { LightboxModal } from './LightboxModal';
import { QuoteForm } from './QuoteForm';

interface PageNavProps {
  onNavigate: (route: PageRoute, prefill?: QuotePrefill) => void;
}

export function OurStoryPage({ onNavigate }: PageNavProps) {
  return (
    <div className="py-14 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 space-y-16">
        <button
          type="button"
          onClick={() => onNavigate('home')}
          className="inline-flex items-center gap-2 text-sm font-medium text-[#23483F] hover:text-[#C9856C] transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" aria-hidden="true" />
          <span>Back to Home</span>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          <div className="lg:col-span-7 space-y-6">
            <p className="text-xs font-semibold tracking-wider uppercase text-[#C9856C]">
              Our Story
            </p>
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-[54px] font-semibold leading-[1.08] text-[#29342F]">
              Built on Hospitality. Guided by Heart.
            </h1>
            <p className="text-base sm:text-lg text-[#29342F]/85 leading-relaxed">
              Housepitality Cleaning Services, LLC was established in 2020 in Newcastle, Oklahoma,
              with a clear conviction: professional cleaning should feel personal, reassuring, and
              rooted in genuine care for the people inside every space.
            </p>
            <p className="text-base text-[#29342F]/80 leading-relaxed">
              As a locally owned and family-operated company backed by more than seven years of
              published team professional cleaning experience, we bring steady attention to detail
              to residential homes, commercial workplaces, and medical or dental facilities across
              our confirmed Oklahoma City metro service area.
            </p>
            <p className="text-base text-[#29342F]/80 leading-relaxed">
              Above all, we believe in compassion without judgment. Asking for help with your home
              or office should feel comfortable—and every client deserves kindness, respect, and
              thoughtful service.
            </p>
          </div>

          <div className="lg:col-span-5">
            <EditorialImage
              src={MEDIA.storyEntryway}
              alt="Welcoming home entryway with warm morning light and oak console"
              fallbackTitle="Our Story"
              className="aspect-[3/4] rounded-xl"
              priority
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-12 border-t border-[#29342F]/10">
          {BUSINESS_INFO.credibility.map((item) => (
            <div
              key={item.label}
              className="p-6 rounded-xl bg-[#F5EFE4]/70 border border-[#29342F]/10 space-y-2"
            >
              <h2 className="font-serif text-2xl font-semibold text-[#23483F]">{item.label}</h2>
              <p className="text-sm text-[#29342F]/80 leading-relaxed">{item.detail}</p>
            </div>
          ))}
        </div>

        <div className="bg-[#23483F] text-[#FCF9F3] rounded-xl p-8 sm:p-12 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <h2 className="font-serif text-3xl font-semibold">
              Ready to talk about your space?
            </h2>
            <p className="text-sm sm:text-base text-[#FCF9F3]/80">
              Tell us what matters most in your home, office, or facility and request a free quote.
            </p>
          </div>
          <button
            type="button"
            onClick={() => onNavigate('quote')}
            className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#E8D6B8] hover:bg-[#FCF9F3] text-[#23483F] text-sm font-semibold rounded-md transition-colors cursor-pointer shrink-0 min-h-[44px]"
          >
            <span>Request a Free Quote</span>
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  );
}

const GALLERY_FILTERS: ('All' | GalleryItem['category'])[] = [
  'All',
  'Residential',
  'Commercial',
  'Medical & Dental',
  'Hospitality Details',
];

export function OurWorkPage({ onNavigate }: PageNavProps) {
  const [filter, setFilter] = useState<'All' | GalleryItem['category']>('All');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const visibleItems =
    filter === 'All'
      ? GALLERY_ITEMS
      : GALLERY_ITEMS.filter((item) => item.category === filter);

  return (
    <div className="py-14 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 space-y-10">
        <button
          type="button"
          onClick={() => onNavigate('home')}
          className="inline-flex items-center gap-2 text-sm font-medium text-[#23483F] hover:text-[#C9856C] transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" aria-hidden="true" />
          <span>Back to Home</span>
        </button>

        <div className="space-y-4 max-w-3xl">
          <p className="text-xs font-semibold tracking-wider uppercase text-[#C9856C]">
            Our Work
          </p>
          <h1 className="font-serif text-4xl sm:text-5xl font-semibold text-[#29342F]">
            Sparkling Spaces: Our Best Cleaning Achievements
          </h1>
          <p className="text-base text-[#29342F]/80 leading-relaxed">
            Explore illustrative interior and workspace scenes reflecting the residential,
            commercial, and medical/dental environments Housepitality cares for. Note: these
            curated editorial photographs represent illustrative space standards rather than claimed
            client before-and-after documentation.
          </p>
        </div>

        {/* Interactive Category Filter Bar */}
        <div
          role="tablist"
          aria-label="Filter gallery spaces"
          className="flex flex-wrap items-center gap-2 p-1.5 bg-[#F5EFE4] border border-[#29342F]/10 rounded-lg w-fit"
        >
          {GALLERY_FILTERS.map((cat) => {
            const active = filter === cat;
            return (
              <button
                key={cat}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => {
                  setFilter(cat);
                  setLightboxIndex(null);
                }}
                className={`px-4 py-2 text-xs sm:text-sm font-medium rounded-md transition-colors cursor-pointer whitespace-nowrap min-h-[38px] ${
                  active
                    ? 'bg-[#23483F] text-[#FCF9F3]'
                    : 'text-[#29342F]/80 hover:text-[#29342F]'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {visibleItems.map((item, idx) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setLightboxIndex(idx)}
              className="group text-left bg-[#FCF9F3] border border-[#29342F]/10 rounded-xl overflow-hidden transition-transform duration-200 hover:-translate-y-0.5 cursor-pointer"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <EditorialImage
                  src={item.image}
                  alt={item.alt}
                  fallbackTitle={item.title}
                  className="w-full h-full"
                  imgClassName="transition-transform duration-300 group-hover:scale-105"
                />
                <span className="absolute bottom-3 right-3 w-9 h-9 rounded-full bg-[#FCF9F3]/90 text-[#23483F] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-150">
                  <Expand className="w-4 h-4" aria-hidden="true" />
                </span>
              </div>
              <div className="p-5 space-y-1.5">
                <p className="text-xs text-[#23483F]/75">
                  {item.category} · Illustrative Interior
                </p>
                <h2 className="font-serif text-xl font-semibold text-[#29342F]">{item.title}</h2>
                <p className="text-xs text-[#29342F]/70 leading-relaxed">{item.caption}</p>
              </div>
            </button>
          ))}
        </div>

        <LightboxModal
          items={visibleItems}
          activeIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onSelectIndex={setLightboxIndex}
        />
      </div>
    </div>
  );
}

export function ServiceAreasPage({ onNavigate }: PageNavProps) {
  const [cityInput, setCityInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNavigate('quote', { cityOrZip: cityInput.trim() || undefined });
  };

  return (
    <div className="py-14 lg:py-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-10 space-y-12">
        <button
          type="button"
          onClick={() => onNavigate('home')}
          className="inline-flex items-center gap-2 text-sm font-medium text-[#23483F] hover:text-[#C9856C] transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" aria-hidden="true" />
          <span>Back to Home</span>
        </button>

        <div className="space-y-5">
          <p className="text-xs font-semibold tracking-wider uppercase text-[#C9856C]">
            Service Areas
          </p>
          <h1 className="font-serif text-4xl sm:text-5xl font-semibold text-[#29342F]">
            Local Care Across the Oklahoma City Metro.
          </h1>
          <p className="text-base sm:text-lg text-[#29342F]/85 leading-relaxed">
            Based in Newcastle, Housepitality Cleaning Services, LLC serves customers throughout
            its confirmed Oklahoma City metropolitan service area.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-8 rounded-xl bg-[#F5EFE4] border border-[#29342F]/10 space-y-4">
            <div className="inline-flex items-center gap-2 text-sm font-semibold text-[#23483F]">
              <MapPin className="w-4 h-4 text-[#C9856C]" aria-hidden="true" />
              <span>Confirmed Home Base &amp; Coverage Policy</span>
            </div>
            <h2 className="font-serif text-2xl font-semibold text-[#29342F]">
              Newcastle, Oklahoma
            </h2>
            <p className="text-sm sm:text-base text-[#29342F]/80 leading-relaxed">
              Our family-operated team operates from Newcastle and serves surrounding communities
              within our confirmed Oklahoma City metropolitan coverage. Because route availability
              varies by neighborhood and schedule, we confirm each individual location directly.
            </p>
            <p className="text-sm font-medium text-[#23483F]">
              {BUSINESS_INFO.serviceAreaNote}
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="p-8 rounded-xl bg-[#FCF9F3] border border-[#29342F]/15 space-y-5 flex flex-col justify-between"
          >
            <div className="space-y-3">
              <h2 className="font-serif text-2xl font-semibold text-[#29342F]">
                Check Your Location With a Free Quote
              </h2>
              <p className="text-sm text-[#29342F]/75 leading-relaxed">
                Enter your city or ZIP code to pre-fill your quote inquiry, or call us directly
                Monday–Friday, 8:00 AM–6:00 PM.
              </p>
              <div>
                <label htmlFor="area-page-input" className="block text-sm font-medium text-[#29342F] mb-1.5">
                  City or ZIP Code
                </label>
                <input
                  id="area-page-input"
                  type="text"
                  value={cityInput}
                  onChange={(e) => setCityInput(e.target.value)}
                  placeholder="e.g., Newcastle or 73065"
                  className="w-full px-4 py-3 rounded-md bg-[#FCF9F3] border border-[#29342F]/20 text-sm text-[#29342F] placeholder:text-[#29342F]/45 focus:outline-none focus:border-[#23483F]"
                />
              </div>
            </div>

            <div className="flex flex-wrap gap-3 pt-2">
              <button
                type="submit"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#23483F] hover:bg-[#1A362F] text-[#FCF9F3] text-sm font-medium rounded-md transition-colors cursor-pointer min-h-[44px]"
              >
                <span>Continue to Free Quote</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </button>
              <a
                href={BUSINESS_INFO.phones[0].href}
                className="inline-flex items-center gap-2 px-5 py-3 border border-[#23483F]/30 hover:bg-[#F5EFE4] text-[#23483F] text-sm font-medium rounded-md transition-colors min-h-[44px]"
              >
                <Phone className="w-4 h-4" aria-hidden="true" />
                <span>{BUSINESS_INFO.phones[0].display}</span>
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export function QuotePage({
  prefill,
  onNavigate,
}: PageNavProps & { prefill?: QuotePrefill }) {
  return (
    <div className="py-14 lg:py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-10 space-y-10">
        <button
          type="button"
          onClick={() => onNavigate('home')}
          className="inline-flex items-center gap-2 text-sm font-medium text-[#23483F] hover:text-[#C9856C] transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" aria-hidden="true" />
          <span>Back to Home</span>
        </button>

        <div className="space-y-3">
          <p className="text-xs font-semibold tracking-wider uppercase text-[#C9856C]">
            Free Quote Inquiry
          </p>
          <h1 className="font-serif text-4xl sm:text-5xl font-semibold text-[#29342F]">
            Request a Free Cleaning Quote
          </h1>
          <p className="text-base text-[#29342F]/80 leading-relaxed max-w-2xl">
            Share a few details about your home, office, or facility so our team can discuss your
            priorities, confirm service-area availability, and prepare a tailored quote.
          </p>
        </div>

        <QuoteForm prefill={prefill} onNavigate={onNavigate} />
      </div>
    </div>
  );
}

export function ContactPage({ onNavigate }: PageNavProps) {
  return (
    <div className="py-14 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 space-y-12">
        <button
          type="button"
          onClick={() => onNavigate('home')}
          className="inline-flex items-center gap-2 text-sm font-medium text-[#23483F] hover:text-[#C9856C] transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" aria-hidden="true" />
          <span>Back to Home</span>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          <div className="lg:col-span-6 space-y-6">
            <p className="text-xs font-semibold tracking-wider uppercase text-[#C9856C]">
              Contact Housepitality
            </p>
            <h1 className="font-serif text-4xl sm:text-5xl font-semibold text-[#29342F]">
              We’re Here to Listen &amp; Help.
            </h1>
            <p className="text-base sm:text-lg text-[#29342F]/85 leading-relaxed">
              Whether you have questions about residential care, commercial scheduling, medical or
              dental facility needs, or confirming coverage in your Oklahoma City metro
              neighborhood, reach out by phone, text, email, or our guided quote form.
            </p>

            <div className="pt-2">
              <button
                type="button"
                onClick={() => onNavigate('quote')}
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-[#23483F] hover:bg-[#1A362F] text-[#FCF9F3] text-sm sm:text-base font-medium rounded-md transition-colors cursor-pointer min-h-[48px]"
              >
                <span>Open Guided Free Quote Form</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </button>
            </div>
          </div>

          <div className="lg:col-span-6 bg-[#F5EFE4] border border-[#29342F]/10 rounded-xl p-7 sm:p-10 space-y-7">
            <div className="space-y-1">
              <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-[#23483F]">
                {BUSINESS_INFO.legalName}
              </h2>
              <p className="text-sm text-[#29342F]/75">{BUSINESS_INFO.brandStatement}</p>
            </div>

            <div className="space-y-5 border-t border-[#29342F]/10 pt-6">
              <div className="flex items-start gap-3.5">
                <MapPin className="w-5 h-5 text-[#C9856C] shrink-0 mt-0.5" aria-hidden="true" />
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-[#29342F]/60">
                    Location &amp; Service Area
                  </p>
                  <p className="text-base font-medium text-[#29342F] mt-0.5">
                    {BUSINESS_INFO.location}
                  </p>
                  <p className="text-sm text-[#29342F]/80 mt-1">
                    {BUSINESS_INFO.serviceRegion} {BUSINESS_INFO.serviceAreaNote}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <Phone className="w-5 h-5 text-[#C9856C] shrink-0 mt-0.5" aria-hidden="true" />
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-[#29342F]/60">
                    Phone (Call or Text)
                  </p>
                  <div className="mt-1 space-y-1.5 tabular-nums">
                    {BUSINESS_INFO.phones.map((phone) => (
                      <p key={phone.display}>
                        <a
                          href={phone.href}
                          className="text-base font-medium text-[#23483F] hover:text-[#C9856C] underline underline-offset-4 transition-colors"
                        >
                          {phone.display}
                        </a>
                      </p>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <Mail className="w-5 h-5 text-[#C9856C] shrink-0 mt-0.5" aria-hidden="true" />
                <div className="min-w-0">
                  <p className="text-xs font-semibold uppercase tracking-wider text-[#29342F]/60">
                    Email
                  </p>
                  <p className="mt-1 break-all">
                    <a
                      href={BUSINESS_INFO.emailHref}
                      className="text-base font-medium text-[#23483F] hover:text-[#C9856C] underline underline-offset-4 transition-colors"
                    >
                      {BUSINESS_INFO.email}
                    </a>
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <Clock className="w-5 h-5 text-[#C9856C] shrink-0 mt-0.5" aria-hidden="true" />
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-[#29342F]/60">
                    Published Business Hours
                  </p>
                  <div className="mt-1 space-y-1 text-sm sm:text-base text-[#29342F] tabular-nums">
                    {BUSINESS_INFO.hours.map((h) => (
                      <p key={h.days}>
                        <span className="font-medium">{h.days}:</span> {h.time}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
