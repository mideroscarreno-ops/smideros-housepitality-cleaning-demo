import { ArrowLeft, ArrowRight, Phone } from 'lucide-react';
import {
  ADDITIONAL_SERVICES,
  BUSINESS_INFO,
  CORE_PATHWAYS,
} from '../data/businessData';
import { MEDIA } from '../data/media';
import { PageRoute, QuotePrefill } from '../types';
import { EditorialImage } from './EditorialImage';

interface ServiceDetailPageProps {
  route: 'residential' | 'commercial' | 'medical-dental' | 'additional-services';
  onNavigate: (route: PageRoute, prefill?: QuotePrefill) => void;
}

export function ServiceDetailPage({ route, onNavigate }: ServiceDetailPageProps) {
  if (route === 'additional-services') {
    return (
      <div className="py-14 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
          <button
            type="button"
            onClick={() => onNavigate('home')}
            className="inline-flex items-center gap-2 text-sm font-medium text-[#23483F] hover:text-[#C9856C] transition-colors mb-8 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" aria-hidden="true" />
            <span>Back to Home</span>
          </button>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center mb-16">
            <div className="lg:col-span-7 space-y-5">
              <p className="text-xs font-semibold tracking-wider uppercase text-[#C9856C]">
                Additional Services
              </p>
              <h1 className="font-serif text-4xl sm:text-5xl lg:text-[54px] font-semibold leading-[1.08] text-[#29342F]">
                Thoughtful Support for Transitions &amp; Deeper Refreshes.
              </h1>
              <p className="text-base sm:text-lg text-[#29342F]/80 leading-relaxed max-w-2xl">
                Alongside ongoing home, office, and facility care, Housepitality offers Deep
                Cleaning, Move-In/Move-Out Cleaning, and Packing/Unpacking across our confirmed
                Oklahoma City metro service area.
              </p>
              <div className="pt-2 flex flex-wrap gap-4">
                <button
                  type="button"
                  onClick={() => onNavigate('quote', { service: 'Deep Cleaning' })}
                  className="px-6 py-3.5 bg-[#23483F] hover:bg-[#1A362F] text-[#FCF9F3] text-sm font-medium rounded-md transition-colors cursor-pointer min-h-[44px]"
                >
                  Request a Free Quote
                </button>
                <a
                  href={BUSINESS_INFO.phones[0].href}
                  className="inline-flex items-center gap-2 px-6 py-3.5 border border-[#23483F]/30 hover:bg-[#F5EFE4] text-[#23483F] text-sm font-medium rounded-md transition-colors min-h-[44px]"
                >
                  <Phone className="w-4 h-4" aria-hidden="true" />
                  <span>Call or Text Us</span>
                </a>
              </div>
            </div>

            <div className="lg:col-span-5">
              <EditorialImage
                src={MEDIA.additionalKitchen}
                alt="Marble kitchen counter with folded ivory linen towels and ceramic vessel"
                fallbackTitle="Hospitality Detail"
                className="aspect-[4/3] rounded-xl"
                priority
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {ADDITIONAL_SERVICES.map((item, idx) => (
              <div
                key={item.id}
                className="bg-[#F5EFE4]/70 border border-[#29342F]/10 rounded-xl p-7 flex flex-col justify-between space-y-6"
              >
                <div className="space-y-4">
                  <span className="text-xs font-semibold text-[#C9856C] tabular-nums">
                    0{idx + 1}
                  </span>
                  <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-[#29342F]">
                    {item.title}
                  </h2>
                  <p className="text-sm sm:text-base text-[#29342F]/80 leading-relaxed">
                    {item.purpose}
                  </p>
                  <p className="text-sm text-[#23483F] font-medium leading-relaxed pt-2 border-t border-[#29342F]/10">
                    {item.scopeNote}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => onNavigate('quote', { service: item.serviceOption })}
                  className="inline-flex items-center justify-between w-full px-4 py-3 bg-[#FCF9F3] hover:bg-[#23483F] text-[#23483F] hover:text-[#FCF9F3] border border-[#23483F]/25 rounded-md text-sm font-medium transition-colors cursor-pointer min-h-[44px]"
                >
                  <span>Request {item.title} Quote</span>
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const pathway = CORE_PATHWAYS.find((p) => p.route === route) ?? CORE_PATHWAYS[0];

  return (
    <div className="py-14 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
        <button
          type="button"
          onClick={() => onNavigate('home')}
          className="inline-flex items-center gap-2 text-sm font-medium text-[#23483F] hover:text-[#C9856C] transition-colors mb-8 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" aria-hidden="true" />
          <span>Back to Home</span>
        </button>

        {/* Split Hero */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-stretch mb-16">
          <div className="lg:col-span-6 flex flex-col justify-center space-y-6">
            <p className="text-xs font-semibold tracking-wider uppercase text-[#C9856C]">
              {pathway.kicker}
            </p>
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-[54px] font-semibold leading-[1.08] text-[#29342F]">
              {pathway.headline}
            </h1>
            <p className="text-base sm:text-lg text-[#29342F]/85 leading-relaxed">
              {pathway.detailIntro}
            </p>
            <p className="text-sm sm:text-base text-[#29342F]/75 leading-relaxed">
              {pathway.hospitalityNote}
            </p>

            <div className="pt-2 flex flex-wrap gap-4">
              <button
                type="button"
                onClick={() => onNavigate('quote', { service: pathway.serviceOption })}
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#23483F] hover:bg-[#1A362F] text-[#FCF9F3] text-sm font-medium rounded-md transition-colors cursor-pointer min-h-[44px]"
              >
                <span>Request {pathway.kicker} Quote</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </button>
              <a
                href={BUSINESS_INFO.phones[0].href}
                className="inline-flex items-center gap-2 px-6 py-3.5 border border-[#23483F]/30 hover:bg-[#F5EFE4] text-[#23483F] text-sm font-medium rounded-md transition-colors min-h-[44px]"
              >
                <Phone className="w-4 h-4" aria-hidden="true" />
                <span>Call or Text {BUSINESS_INFO.phones[0].display}</span>
              </a>
            </div>
          </div>

          <div className="lg:col-span-6">
            <EditorialImage
              src={pathway.image}
              alt={pathway.imageAlt}
              fallbackTitle={pathway.kicker}
              className="aspect-[4/3] lg:h-full rounded-xl"
              priority
            />
          </div>
        </div>

        {/* Scope & Consultation Guide */}
        <div className="bg-[#F5EFE4] border border-[#29342F]/10 rounded-xl p-8 sm:p-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-5 space-y-3">
            <h2 className="font-serif text-3xl font-semibold text-[#29342F]">
              What We Discuss Together
            </h2>
            <p className="text-sm sm:text-base text-[#29342F]/80 leading-relaxed">
              Rather than forcing your space into a rigid checklist, our team talks through your
              actual needs before preparing a free quote. Contact our team to discuss what’s
              included and the needs of your space.
            </p>
          </div>

          <div className="lg:col-span-7 space-y-4">
            {pathway.discussionPrompts.map((prompt, index) => (
              <div
                key={prompt}
                className="flex items-start gap-4 p-4 rounded-lg bg-[#FCF9F3] border border-[#29342F]/10"
              >
                <span className="font-serif text-xl font-semibold text-[#C9856C] tabular-nums shrink-0">
                  0{index + 1}
                </span>
                <p className="text-sm sm:text-base text-[#29342F] leading-relaxed">{prompt}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Cross-links to other pathways */}
        <div className="mt-16 pt-12 border-t border-[#29342F]/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <p className="text-sm font-medium text-[#29342F]">
              Looking for another type of care?
            </p>
            <p className="text-xs text-[#29342F]/70 mt-0.5">
              {BUSINESS_INFO.serviceRegion}
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            {CORE_PATHWAYS.filter((p) => p.route !== route).map((other) => (
              <button
                key={other.route}
                type="button"
                onClick={() => onNavigate(other.route)}
                className="px-4 py-2.5 text-sm font-medium text-[#23483F] bg-[#F5EFE4] hover:bg-[#E8D6B8]/60 rounded-md transition-colors cursor-pointer min-h-[40px]"
              >
                {other.kicker}
              </button>
            ))}
            <button
              type="button"
              onClick={() => onNavigate('additional-services')}
              className="px-4 py-2.5 text-sm font-medium text-[#23483F] bg-[#F5EFE4] hover:bg-[#E8D6B8]/60 rounded-md transition-colors cursor-pointer min-h-[40px]"
            >
              Deep Clean &amp; Moving Support
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
