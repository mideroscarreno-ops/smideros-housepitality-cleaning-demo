import { useState } from 'react';
import { ArrowRight, Expand, MapPin, Phone } from 'lucide-react';
import {
  ADDITIONAL_SERVICES,
  BUSINESS_INFO,
  CORE_PATHWAYS,
  GALLERY_ITEMS,
  PROCESS_STEPS,
} from '../data/businessData';
import { MEDIA } from '../data/media';
import { PageRoute, QuotePrefill } from '../types';
import { EditorialImage } from './EditorialImage';
import { LightboxModal } from './LightboxModal';

interface HomePageProps {
  onNavigate: (route: PageRoute, prefill?: QuotePrefill) => void;
}

export function HomePage({ onNavigate }: HomePageProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [quickArea, setQuickArea] = useState('');

  const handleAreaJump = (e: React.FormEvent) => {
    e.preventDefault();
    onNavigate('quote', {
      cityOrZip: quickArea.trim() || undefined,
    });
  };

  return (
    <div>
      {/* B. EXCEPTIONAL HERO SECTION */}
      <section className="relative overflow-hidden border-b border-[#29342F]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-10 sm:py-14 lg:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
            <div className="lg:col-span-6 flex flex-col justify-center space-y-6 py-2">
              <p className="text-xs sm:text-sm font-medium tracking-wide text-[#23483F]">
                {BUSINESS_INFO.brandStatement}
              </p>

              <h1 className="font-serif text-[40px] sm:text-5xl lg:text-[60px] font-semibold leading-[1.06] tracking-tight text-[#29342F]">
                A Cleaner Space. A Warmer Welcome.
              </h1>

              <p className="text-base sm:text-lg text-[#29342F]/80 leading-relaxed max-w-xl">
                Thoughtful cleaning services for homes, businesses, and professional facilities
                throughout the Oklahoma City metro.
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-4">
                <button
                  type="button"
                  onClick={() => onNavigate('quote')}
                  className="inline-flex items-center gap-2.5 px-7 py-3.5 bg-[#23483F] hover:bg-[#1A362F] text-[#FCF9F3] text-sm sm:text-base font-medium rounded-md transition-colors duration-150 cursor-pointer min-h-[48px]"
                >
                  <span>Request Your Free Quote</span>
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </button>

                <a
                  href="#services-overview"
                  className="inline-flex items-center justify-center px-6 py-3.5 border border-[#23483F]/30 hover:bg-[#F5EFE4] text-[#23483F] text-sm sm:text-base font-medium rounded-md transition-colors duration-150 min-h-[48px]"
                >
                  Explore Our Services
                </a>
              </div>

              <div className="pt-4 border-t border-[#29342F]/10 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-[#29342F]/70">
                <span>Newcastle, Oklahoma</span>
                <span aria-hidden="true">·</span>
                <span className="tabular-nums">Mon–Fri, 8:00 AM–6:00 PM</span>
                <span aria-hidden="true">·</span>
                <a
                  href={BUSINESS_INFO.phones[0].href}
                  className="font-medium text-[#23483F] hover:underline tabular-nums"
                >
                  {BUSINESS_INFO.phones[0].display}
                </a>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="relative h-full min-h-[300px] sm:min-h-[400px] lg:min-h-[480px] rounded-2xl overflow-hidden">
                <EditorialImage
                  src={MEDIA.heroLivingRoom}
                  alt="Warm sunlit modern home living room and kitchen with oak floors and linen sofa"
                  fallbackTitle="Housepitality Cleaning Services"
                  className="w-full h-full"
                  priority
                />
                <div className="hidden sm:block absolute bottom-4 left-4 right-4 bg-[#FCF9F3]/92 backdrop-blur-sm border border-[#29342F]/10 rounded-lg px-4 py-3">
                  <p className="text-xs text-[#29342F]/85">
                    <span className="font-serif text-sm font-semibold text-[#23483F] italic mr-2">
                      “A Little More Care in Every Clean.”
                    </span>
                    Illustrative sunlit living space representing the calm welcome we help create.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* C. THE HOUSEPITALITY DIFFERENCE */}
      <section className="py-16 lg:py-24 bg-[#F5EFE4]/65 border-b border-[#29342F]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
            <div className="lg:col-span-5 order-2 lg:order-1">
              <EditorialImage
                src={MEDIA.storyEntryway}
                alt="Welcoming home entryway with clean oak console table and ceramic vase"
                fallbackTitle="Cleaning With Heart"
                className="aspect-[3/4] max-h-[520px] w-full rounded-xl"
              />
            </div>

            <div className="lg:col-span-7 order-1 lg:order-2 space-y-6">
              <p className="text-xs font-semibold tracking-wider uppercase text-[#C9856C]">
                Our Philosophy
              </p>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-[44px] font-semibold leading-[1.12] text-[#29342F]">
                More Than Cleaning. It’s Caring for Your Space.
              </h2>
              <p className="text-base sm:text-lg text-[#29342F]/85 leading-relaxed max-w-2xl">
                Opening your front door or workplace to a cleaning team takes trust. We never lose
                sight of the personal side of the spaces you live and work in every day.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-[#29342F]/10">
                <div className="space-y-1.5">
                  <h3 className="font-serif text-xl font-semibold text-[#23483F]">
                    Compassion, Not Criticism
                  </h3>
                  <p className="text-sm text-[#29342F]/80 leading-relaxed">
                    Life gets full. We meet every household and workplace with kindness and respect,
                    never judgment.
                  </p>
                </div>
                <div className="space-y-1.5">
                  <h3 className="font-serif text-xl font-semibold text-[#23483F]">
                    Comfortable Asking for Help
                  </h3>
                  <p className="text-sm text-[#29342F]/80 leading-relaxed">
                    Reaching out should feel reassuring and straightforward, from your first call to
                    every visit.
                  </p>
                </div>
                <div className="space-y-1.5">
                  <h3 className="font-serif text-xl font-semibold text-[#23483F]">
                    Personalized Attention
                  </h3>
                  <p className="text-sm text-[#29342F]/80 leading-relaxed">
                    Every home and business has its own priorities—we listen closely and adapt to
                    your space.
                  </p>
                </div>
                <div className="space-y-1.5">
                  <h3 className="font-serif text-xl font-semibold text-[#23483F]">
                    Rooted in Community
                  </h3>
                  <p className="text-sm text-[#29342F]/80 leading-relaxed">
                    As a family-operated company, lasting local relationships matter just as much as
                    spotless counters.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* D. THREE DISTINCT CLEANING PATHWAYS */}
      <section id="services-overview" className="py-16 lg:py-24 border-b border-[#29342F]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 space-y-12">
          <div className="max-w-2xl space-y-3">
            <p className="text-xs font-semibold tracking-wider uppercase text-[#C9856C]">
              Core Cleaning Pathways
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-[44px] font-semibold leading-[1.12] text-[#29342F]">
              Tailored Care for Homes, Offices &amp; Facilities.
            </h2>
            <p className="text-base text-[#29342F]/80 leading-relaxed">
              Select the pathway that matches your space to explore how we work and start a tailored
              free quote.
            </p>
          </div>

          <div className="space-y-8">
            {CORE_PATHWAYS.map((pathway, idx) => {
              const reversed = idx === 1;
              return (
                <article
                  key={pathway.route}
                  className="grid grid-cols-1 lg:grid-cols-12 gap-0 bg-[#F5EFE4]/55 border border-[#29342F]/10 rounded-xl overflow-hidden"
                >
                  <div
                    className={`lg:col-span-6 ${reversed ? 'lg:order-2' : 'lg:order-1'}`}
                  >
                    <EditorialImage
                      src={pathway.image}
                      alt={pathway.imageAlt}
                      fallbackTitle={pathway.kicker}
                      className="aspect-[4/3] lg:h-full w-full"
                      imgClassName="transition-transform duration-300 hover:scale-[1.02]"
                    />
                  </div>

                  <div
                    className={`lg:col-span-6 p-7 sm:p-10 lg:p-12 flex flex-col justify-between space-y-6 ${
                      reversed ? 'lg:order-1' : 'lg:order-2'
                    }`}
                  >
                    <div className="space-y-4">
                      <p className="text-xs font-semibold tracking-wider uppercase text-[#23483F]/75">
                        0{idx + 1} · {pathway.kicker}
                      </p>
                      <h3 className="font-serif text-3xl sm:text-4xl font-semibold text-[#29342F] leading-tight">
                        {pathway.headline}
                      </h3>
                      <p className="text-sm sm:text-base text-[#29342F]/80 leading-relaxed">
                        {pathway.summary}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-[#29342F]/10 flex flex-wrap items-center gap-4">
                      <button
                        type="button"
                        onClick={() => onNavigate(pathway.route)}
                        className="inline-flex items-center gap-2 px-5 py-3 bg-[#23483F] hover:bg-[#1A362F] text-[#FCF9F3] text-sm font-medium rounded-md transition-colors cursor-pointer min-h-[44px]"
                      >
                        <span>{pathway.ctaLabel}</span>
                        <ArrowRight className="w-4 h-4" aria-hidden="true" />
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          onNavigate('quote', { service: pathway.serviceOption })
                        }
                        className="text-sm font-medium text-[#23483F] hover:text-[#C9856C] underline underline-offset-4 transition-colors cursor-pointer py-2"
                      >
                        Request quote
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* E. ADDITIONAL SERVICES */}
      <section className="py-16 lg:py-24 bg-[#23483F] text-[#FCF9F3]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
            <div className="lg:col-span-5 space-y-6">
              <p className="text-xs font-semibold tracking-wider uppercase text-[#E8D6B8]">
                Additional Services
              </p>
              <h2 className="font-serif text-3xl sm:text-4xl font-semibold leading-[1.12] text-[#FCF9F3]">
                Extra Support When Your Space Is in Transition.
              </h2>
              <p className="text-sm sm:text-base text-[#FCF9F3]/80 leading-relaxed">
                Whether preparing for a fresh season or organizing a move, our team coordinates
                each additional service directly around your space and schedule.
              </p>
              <EditorialImage
                src={MEDIA.additionalKitchen}
                alt="Pristine marble kitchen counter with neatly stacked ivory linen dish towels"
                fallbackTitle="Additional Cleaning Care"
                className="aspect-[4/3] rounded-xl"
              />
            </div>

            <div className="lg:col-span-7 divide-y divide-[#FCF9F3]/15 border-t border-b border-[#FCF9F3]/15">
              {ADDITIONAL_SERVICES.map((item) => (
                <div key={item.id} className="py-7 sm:py-8 space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <h3 className="font-serif text-2xl sm:text-3xl font-semibold text-[#FCF9F3]">
                      {item.title}
                    </h3>
                    <button
                      type="button"
                      onClick={() => onNavigate('quote', { service: item.serviceOption })}
                      className="inline-flex items-center gap-2 text-sm font-medium text-[#E8D6B8] hover:text-[#FCF9F3] transition-colors cursor-pointer self-start sm:self-auto"
                    >
                      <span>Request Quote</span>
                      <ArrowRight className="w-4 h-4" aria-hidden="true" />
                    </button>
                  </div>
                  <p className="text-sm sm:text-base text-[#FCF9F3]/85 leading-relaxed max-w-2xl">
                    {item.purpose}
                  </p>
                  <p className="text-xs text-[#A8BDA9]">{item.scopeNote}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* F. ABOUT THE COMPANY & G. TRUST AND CREDIBILITY */}
      <section className="py-16 lg:py-24 border-b border-[#29342F]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 space-y-14">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
            <div className="lg:col-span-6 space-y-5">
              <p className="text-xs font-semibold tracking-wider uppercase text-[#C9856C]">
                About Housepitality
              </p>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-[44px] font-semibold leading-[1.12] text-[#29342F]">
                Built on Hospitality. Guided by Heart.
              </h2>
            </div>

            <div className="lg:col-span-6 space-y-5 text-base text-[#29342F]/85 leading-relaxed">
              <p>
                Established in 2020 and based in Newcastle, Oklahoma, Housepitality Cleaning
                Services, LLC is a locally owned, family-operated business serving clients across
                its confirmed Oklahoma City metropolitan service area.
              </p>
              <p>
                With more than seven years of published team professional cleaning experience, we
                pair dependable attention to detail with genuine warmth—building community
                relationships rooted in kindness, honesty, and care.
              </p>
              <div>
                <button
                  type="button"
                  onClick={() => onNavigate('our-story')}
                  className="inline-flex items-center gap-2 text-sm font-semibold text-[#23483F] hover:text-[#C9856C] transition-colors cursor-pointer"
                >
                  <span>Read Our Story</span>
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>

          {/* G. Restrained Trust & Credibility Strip */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-10 border-t border-[#29342F]/10">
            {BUSINESS_INFO.credibility.map((item) => (
              <div key={item.label} className="space-y-1.5">
                <h3 className="font-serif text-xl font-semibold text-[#23483F]">
                  {item.label}
                </h3>
                <p className="text-xs sm:text-sm text-[#29342F]/75 leading-relaxed">
                  {item.detail}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* H. OUR WORK GALLERY */}
      <section className="py-16 lg:py-24 bg-[#F5EFE4]/60 border-b border-[#29342F]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 space-y-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-3 max-w-2xl">
              <p className="text-xs font-semibold tracking-wider uppercase text-[#C9856C]">
                Our Work &amp; Atmosphere
              </p>
              <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-[#29342F]">
                Sparkling Spaces: Our Best Cleaning Achievements
              </h2>
              <p className="text-sm text-[#29342F]/75 leading-relaxed">
                Illustrative interior and workspace scenes reflecting the calm, well-kept
                environments Housepitality helps clients enjoy. Click any image to view larger.
              </p>
            </div>

            <button
              type="button"
              onClick={() => onNavigate('our-work')}
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#23483F] hover:text-[#C9856C] transition-colors cursor-pointer shrink-0"
            >
              <span>View Full Gallery</span>
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {GALLERY_ITEMS.map((item, idx) => (
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
                <div className="p-5 space-y-1">
                  <p className="text-xs text-[#23483F]/75">
                    {item.category} · Illustrative Interior
                  </p>
                  <h3 className="font-serif text-xl font-semibold text-[#29342F]">
                    {item.title}
                  </h3>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* I. HOW TO GET STARTED */}
      <section className="py-16 lg:py-24 border-b border-[#29342F]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 space-y-12">
          <div className="max-w-2xl space-y-3">
            <p className="text-xs font-semibold tracking-wider uppercase text-[#C9856C]">
              Simple Process
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-[#29342F]">
              How to Get Started
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {PROCESS_STEPS.map((step) => (
              <div
                key={step.number}
                className="p-7 rounded-xl bg-[#F5EFE4]/60 border border-[#29342F]/10 space-y-4"
              >
                <span className="font-serif text-3xl font-semibold text-[#C9856C] tabular-nums block">
                  {step.number}
                </span>
                <h3 className="font-serif text-2xl font-semibold text-[#29342F]">
                  {step.title}
                </h3>
                <p className="text-sm sm:text-base text-[#29342F]/80 leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* J. SERVICE-AREA SECTION */}
      <section className="py-16 lg:py-20 bg-[#F5EFE4]/70 border-b border-[#29342F]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-[#23483F]">
                <MapPin className="w-4 h-4 text-[#C9856C]" aria-hidden="true" />
                <span>Service Region</span>
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-[#29342F]">
                Local Care Across the Oklahoma City Metro.
              </h2>
              <p className="text-base text-[#29342F]/85 leading-relaxed max-w-2xl">
                Based in Newcastle, Housepitality serves customers throughout its confirmed
                Oklahoma City metropolitan service area. {BUSINESS_INFO.serviceAreaNote}
              </p>
            </div>

            <div className="lg:col-span-5">
              <form
                onSubmit={handleAreaJump}
                className="bg-[#FCF9F3] border border-[#29342F]/15 rounded-xl p-6 space-y-4"
              >
                <label
                  htmlFor="home-area-input"
                  className="block text-sm font-medium text-[#29342F]"
                >
                  Enter your city or ZIP code to start a quote inquiry
                </label>
                <div className="flex flex-col sm:flex-row gap-3">
                  <input
                    id="home-area-input"
                    type="text"
                    value={quickArea}
                    onChange={(e) => setQuickArea(e.target.value)}
                    placeholder="e.g., Newcastle or 73065"
                    className="flex-1 px-4 py-3 rounded-md bg-[#FCF9F3] border border-[#29342F]/20 text-sm text-[#29342F] placeholder:text-[#29342F]/45 focus:outline-none focus:border-[#23483F]"
                  />
                  <button
                    type="submit"
                    className="px-5 py-3 bg-[#23483F] hover:bg-[#1A362F] text-[#FCF9F3] text-sm font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer min-h-[44px]"
                  >
                    Confirm &amp; Quote
                  </button>
                </div>
                <p className="text-xs text-[#29342F]/65">
                  Individual locations are confirmed directly with our team.
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* K. FINAL CONVERSION SECTION */}
      <section className="py-16 lg:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-10 text-center space-y-6">
          <h2 className="font-serif text-3xl sm:text-5xl font-semibold leading-[1.1] text-[#29342F]">
            Whatever Your Space Looks Like, You’re Welcome Here.
          </h2>
          <p className="text-base sm:text-lg text-[#29342F]/80 leading-relaxed max-w-2xl mx-auto">
            Tell us what you need. We’re here to listen, understand, and help you explore the right
            cleaning service.
          </p>
          <div className="pt-3 flex flex-wrap items-center justify-center gap-4">
            <button
              type="button"
              onClick={() => onNavigate('quote')}
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-[#23483F] hover:bg-[#1A362F] text-[#FCF9F3] text-sm sm:text-base font-medium rounded-md transition-colors cursor-pointer min-h-[48px]"
            >
              <span>Request a Free Quote</span>
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </button>

            <a
              href={BUSINESS_INFO.phones[0].href}
              className="inline-flex items-center gap-2 px-6 py-3.5 border border-[#23483F]/30 hover:bg-[#F5EFE4] text-[#23483F] text-sm sm:text-base font-medium rounded-md transition-colors min-h-[48px]"
            >
              <Phone className="w-4 h-4" aria-hidden="true" />
              <span>Call or Text Our Team</span>
            </a>
          </div>
        </div>
      </section>

      <LightboxModal
        items={GALLERY_ITEMS}
        activeIndex={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onSelectIndex={setLightboxIndex}
      />
    </div>
  );
}
