import { useEffect, useState } from 'react';
import {
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  Check,
  Copy,
  Info,
  Mail,
  Phone,
  RotateCcw,
} from 'lucide-react';
import { BUSINESS_INFO } from '../data/businessData';
import { PageRoute, QuotePrefill, ServiceOption } from '../types';

interface QuoteFormProps {
  prefill?: QuotePrefill;
  onNavigate?: (route: PageRoute) => void;
}

const SERVICE_OPTIONS: { value: ServiceOption; subtitle: string }[] = [
  { value: 'Residential Cleaning', subtitle: 'Ongoing or tailored care for your home' },
  { value: 'Commercial Cleaning', subtitle: 'Upkeep for offices, studios, and workplaces' },
  {
    value: 'Medical/Dental Facility Cleaning',
    subtitle: 'Reception, shared spaces, and scheduling-aware care',
  },
  { value: 'Deep Cleaning', subtitle: 'A thorough refresh beyond routine upkeep' },
  { value: 'Move-In/Move-Out Cleaning', subtitle: 'Support before settling in or handing over keys' },
  { value: 'Packing/Unpacking', subtitle: 'Thoughtful help organizing belongings for a move' },
  { value: 'Not Sure Yet', subtitle: 'Tell us about your space and we will help guide you' },
];

interface FormState {
  service: ServiceOption | '';
  cityOrZip: string;
  spaceType: string;
  approxSize: string;
  frequency: string;
  preferredTiming: string;
  bedrooms: string;
  bathrooms: string;
  businessName: string;
  commercialSqFt: string;
  facilityType: string;
  facilityScheduling: string;
  fullName: string;
  email: string;
  phoneOrMethod: string;
  additionalInfo: string;
}

const INITIAL_STATE: FormState = {
  service: '',
  cityOrZip: '',
  spaceType: '',
  approxSize: '',
  frequency: '',
  preferredTiming: '',
  bedrooms: '',
  bathrooms: '',
  businessName: '',
  commercialSqFt: '',
  facilityType: '',
  facilityScheduling: '',
  fullName: '',
  email: '',
  phoneOrMethod: '',
  additionalInfo: '',
};

export function QuoteForm({ prefill, onNavigate }: QuoteFormProps) {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [form, setForm] = useState<FormState>(() => ({
    ...INITIAL_STATE,
    service: prefill?.service ?? '',
    cityOrZip: prefill?.cityOrZip ?? '',
  }));
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (prefill?.service || prefill?.cityOrZip) {
      setForm((prev) => ({
        ...prev,
        service: prefill.service ?? prev.service,
        cityOrZip: prefill.cityOrZip ?? prev.cityOrZip,
      }));
      if (prefill.service) {
        setStep(2);
      }
      setSubmitted(false);
      setErrors({});
    }
  }, [prefill]);

  const updateField = <K extends keyof FormState>(field: K, value: FormState[K]) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const isMedical = form.service === 'Medical/Dental Facility Cleaning';
  const isCommercial = form.service === 'Commercial Cleaning';
  const isResidential = form.service === 'Residential Cleaning';

  const validateStep = (targetStep: 1 | 2 | 3): boolean => {
    const nextErrors: Record<string, string> = {};

    if (targetStep === 1) {
      if (!form.service) {
        nextErrors.service = 'Please select a service option to continue.';
      }
    }

    if (targetStep === 2) {
      if (!form.cityOrZip.trim()) {
        nextErrors.cityOrZip = 'Please enter your city or ZIP code so we can confirm coverage.';
      }
      if (!isMedical && !form.spaceType.trim()) {
        nextErrors.spaceType = 'Please select or describe the type of space.';
      }
      if (isMedical && !form.facilityType.trim()) {
        nextErrors.facilityType = 'Please indicate the basic facility type (e.g., dental office, clinic).';
      }
      if (!form.frequency.trim()) {
        nextErrors.frequency = 'Please choose your desired cleaning frequency.';
      }
    }

    if (targetStep === 3) {
      if (!form.fullName.trim()) {
        nextErrors.fullName = 'Please enter your full name.';
      }
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!form.email.trim()) {
        nextErrors.email = 'Please enter your email address.';
      } else if (!emailRegex.test(form.email.trim())) {
        nextErrors.email = 'Please enter a valid email address (for example, name@example.com).';
      }
      if (!form.phoneOrMethod.trim()) {
        nextErrors.phoneOrMethod = 'Please provide a phone number or preferred contact method.';
      }
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(step)) {
      setStep((prev) => (prev === 1 ? 2 : 3));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateStep(3)) {
      setSubmitted(true);
    }
  };

  const buildSummaryText = () => {
    const lines = [
      `Service Requested: ${form.service || 'Not specified'}`,
      `City or ZIP Code: ${form.cityOrZip}`,
      isMedical
        ? `Basic Facility Type: ${form.facilityType}`
        : `Type of Space: ${form.spaceType}`,
      `Desired Cleaning Frequency: ${form.frequency}`,
    ];
    if (form.approxSize) lines.push(`Approximate Size: ${form.approxSize}`);
    if (form.preferredTiming) lines.push(`Preferred Timing: ${form.preferredTiming}`);
    if (isResidential && form.bedrooms) lines.push(`Bedrooms: ${form.bedrooms}`);
    if (isResidential && form.bathrooms) lines.push(`Bathrooms: ${form.bathrooms}`);
    if (isCommercial && form.businessName) lines.push(`Business / Facility Name: ${form.businessName}`);
    if (isCommercial && form.commercialSqFt) lines.push(`Approx. Square Footage: ${form.commercialSqFt}`);
    if (isMedical && form.facilityScheduling) lines.push(`Scheduling Needs: ${form.facilityScheduling}`);
    lines.push(`Full Name: ${form.fullName}`);
    lines.push(`Email: ${form.email}`);
    lines.push(`Phone / Preferred Contact: ${form.phoneOrMethod}`);
    if (form.additionalInfo) lines.push(`Additional Information: ${form.additionalInfo}`);
    return lines.join('\n');
  };

  const handleCopySummary = async () => {
    try {
      await navigator.clipboard.writeText(buildSummaryText());
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      setCopied(false);
    }
  };

  const mailtoLink = `${BUSINESS_INFO.emailHref}?subject=${encodeURIComponent(
    `Free Quote Inquiry — ${form.service || 'Cleaning Services'}`
  )}&body=${encodeURIComponent(buildSummaryText())}`;

  const resetForm = () => {
    setForm(INITIAL_STATE);
    setStep(1);
    setSubmitted(false);
    setErrors({});
  };

  const inputClass = (field: string) =>
    `w-full px-4 py-3 rounded-md bg-[#FCF9F3] border text-sm sm:text-base text-[#29342F] placeholder:text-[#29342F]/45 transition-colors focus:outline-none focus:ring-2 ${
      errors[field]
        ? 'border-[#B34034] focus:ring-[#B34034]/30'
        : 'border-[#29342F]/20 focus:border-[#23483F] focus:ring-[#23483F]/20'
    }`;

  if (submitted) {
    return (
      <div className="bg-[#FCF9F3] border border-[#29342F]/15 rounded-xl p-6 sm:p-10 shadow-sm space-y-6">
        <div className="flex items-start gap-3 p-4 rounded-lg bg-[#E8D6B8]/45 border border-[#C9856C]/35 text-[#29342F]">
          <Info className="w-5 h-5 text-[#23483F] shrink-0 mt-0.5" aria-hidden="true" />
          <div className="text-sm space-y-1">
            <p className="font-semibold text-[#23483F]">
              Interactive Demonstration Summary Prepared
            </p>
            <p className="text-[#29342F]/85 leading-relaxed">
              This website redesign concept does not connect to a live backend, so no inquiry was
              automatically transmitted. To send your details directly to Housepitality Cleaning
              Services, LLC, use the pre-filled email button below or call/text our team during
              business hours.
            </p>
          </div>
        </div>

        <div>
          <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-[#23483F]">
            Your Guided Quote Summary
          </h2>
          <p className="text-sm text-[#29342F]/75 mt-1">
            Review your selections below. Location availability and service scope are confirmed
            directly with the Housepitality team.
          </p>
        </div>

        <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-5 rounded-lg bg-[#F5EFE4] border border-[#29342F]/10 text-sm">
          <div>
            <dt className="text-xs font-medium text-[#29342F]/65">Service Type</dt>
            <dd className="font-medium text-[#29342F] mt-0.5">{form.service}</dd>
          </div>
          <div>
            <dt className="text-xs font-medium text-[#29342F]/65">City or ZIP Code</dt>
            <dd className="font-medium text-[#29342F] mt-0.5">{form.cityOrZip}</dd>
          </div>
          <div>
            <dt className="text-xs font-medium text-[#29342F]/65">
              {isMedical ? 'Facility Type' : 'Type of Space'}
            </dt>
            <dd className="font-medium text-[#29342F] mt-0.5">
              {isMedical ? form.facilityType : form.spaceType}
            </dd>
          </div>
          <div>
            <dt className="text-xs font-medium text-[#29342F]/65">Desired Frequency</dt>
            <dd className="font-medium text-[#29342F] mt-0.5">{form.frequency}</dd>
          </div>
          <div>
            <dt className="text-xs font-medium text-[#29342F]/65">Contact Name</dt>
            <dd className="font-medium text-[#29342F] mt-0.5">{form.fullName}</dd>
          </div>
          <div>
            <dt className="text-xs font-medium text-[#29342F]/65">Phone / Preferred Contact</dt>
            <dd className="font-medium text-[#29342F] mt-0.5">{form.phoneOrMethod}</dd>
          </div>
        </dl>

        <div className="flex flex-wrap items-center gap-3 pt-2">
          <a
            href={mailtoLink}
            className="inline-flex items-center gap-2 px-5 py-3 bg-[#23483F] hover:bg-[#1A362F] text-[#FCF9F3] text-sm font-medium rounded-md transition-colors min-h-[44px]"
          >
            <Mail className="w-4 h-4" aria-hidden="true" />
            <span>Open Pre-Filled Email</span>
          </a>

          <a
            href={BUSINESS_INFO.phones[0].href}
            className="inline-flex items-center gap-2 px-5 py-3 border border-[#23483F]/30 hover:bg-[#F5EFE4] text-[#23483F] text-sm font-medium rounded-md transition-colors min-h-[44px]"
          >
            <Phone className="w-4 h-4" aria-hidden="true" />
            <span>Call {BUSINESS_INFO.phones[0].display}</span>
          </a>

          <button
            type="button"
            onClick={handleCopySummary}
            className="inline-flex items-center gap-2 px-4 py-3 border border-[#29342F]/20 hover:bg-[#F5EFE4] text-[#29342F] text-sm font-medium rounded-md transition-colors min-h-[44px] cursor-pointer"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-[#23483F]" aria-hidden="true" />
                <span>Copied</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" aria-hidden="true" />
                <span>Copy Details</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={resetForm}
            className="inline-flex items-center gap-2 px-4 py-3 text-sm font-medium text-[#29342F]/75 hover:text-[#29342F] transition-colors min-h-[44px] cursor-pointer ml-auto"
          >
            <RotateCcw className="w-4 h-4" aria-hidden="true" />
            <span>Start Over</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#FCF9F3] border border-[#29342F]/15 rounded-xl p-6 sm:p-10 shadow-sm">
      {/* Transparent Demonstration Notice */}
      <div className="mb-8 flex items-start gap-3 p-4 rounded-lg bg-[#F5EFE4] border border-[#29342F]/10 text-xs sm:text-sm text-[#29342F]/85">
        <Info className="w-4 h-4 text-[#23483F] shrink-0 mt-0.5" aria-hidden="true" />
        <p>
          <strong className="font-semibold text-[#23483F]">Interactive Quote Demonstration:</strong>{' '}
          This guided form prepares a structured inquiry summary locally and does not submit data to
          an external backend. You can review, copy, or email your prepared details directly to
          Housepitality on the final step.
        </p>
      </div>

      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex items-center justify-between text-xs sm:text-sm mb-3">
          <span className="font-semibold text-[#23483F] tabular-nums">
            Step 0{step} of 03
          </span>
          <span className="text-[#29342F]/70">
            {step === 1 && 'Type of Service'}
            {step === 2 && 'Property & Scheduling Details'}
            {step === 3 && 'Your Contact Details'}
          </span>
        </div>
        <div className="grid grid-cols-3 gap-2" aria-hidden="true">
          {[1, 2, 3].map((idx) => (
            <div
              key={idx}
              className={`h-1.5 rounded-full transition-colors duration-200 ${
                step >= idx ? 'bg-[#23483F]' : 'bg-[#29342F]/15'
              }`}
            />
          ))}
        </div>
      </div>

      <form onSubmit={handleSubmit} noValidate>
        {/* STEP 1: Type of service */}
        {step === 1 && (
          <div className="space-y-6">
            <div>
              <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-[#29342F]">
                What type of cleaning care are you exploring?
              </h2>
              <p className="text-sm text-[#29342F]/75 mt-1">
                Select one option below so we can tailor the next questions to your space. (Required)
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3" role="radiogroup" aria-label="Type of service">
              {SERVICE_OPTIONS.map((option) => {
                const selected = form.service === option.value;
                return (
                  <button
                    key={option.value}
                    type="button"
                    role="radio"
                    aria-checked={selected}
                    onClick={() => updateField('service', option.value)}
                    className={`text-left p-4 rounded-lg border transition-all duration-150 cursor-pointer min-h-[72px] flex items-start justify-between gap-3 ${
                      selected
                        ? 'bg-[#23483F] text-[#FCF9F3] border-[#23483F]'
                        : 'bg-[#F5EFE4]/60 hover:bg-[#F5EFE4] text-[#29342F] border-[#29342F]/15'
                    }`}
                  >
                    <div>
                      <p className="font-medium text-sm sm:text-base">{option.value}</p>
                      <p
                        className={`text-xs mt-1 ${
                          selected ? 'text-[#FCF9F3]/80' : 'text-[#29342F]/70'
                        }`}
                      >
                        {option.subtitle}
                      </p>
                    </div>
                    <span
                      className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 mt-0.5 ${
                        selected
                          ? 'border-[#E8D6B8] bg-[#E8D6B8] text-[#23483F]'
                          : 'border-[#29342F]/30'
                      }`}
                    >
                      {selected && <Check className="w-3 h-3" aria-hidden="true" />}
                    </span>
                  </button>
                );
              })}
            </div>

            {errors.service && (
              <p className="flex items-center gap-2 text-sm text-[#B34034]" role="alert">
                <AlertCircle className="w-4 h-4 shrink-0" aria-hidden="true" />
                <span>{errors.service}</span>
              </p>
            )}

            <div className="pt-4 flex justify-end">
              <button
                type="button"
                onClick={handleNext}
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#23483F] hover:bg-[#1A362F] text-[#FCF9F3] text-sm font-medium rounded-md transition-colors min-h-[44px] cursor-pointer"
              >
                <span>Continue to Property Details</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: Property details */}
        {step === 2 && (
          <div className="space-y-6">
            <div>
              <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-[#29342F]">
                Tell us about your space
              </h2>
              <p className="text-sm text-[#29342F]/75 mt-1">
                Selected service: <strong className="text-[#23483F]">{form.service}</strong>
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {/* City or ZIP */}
              <div className="sm:col-span-2">
                <label htmlFor="quote-city-zip" className="block text-sm font-medium text-[#29342F] mb-1.5">
                  City or ZIP Code <span className="text-[#B36F56]">(Required)</span>
                </label>
                <input
                  id="quote-city-zip"
                  type="text"
                  value={form.cityOrZip}
                  onChange={(e) => updateField('cityOrZip', e.target.value)}
                  placeholder="e.g., Newcastle or 73065"
                  aria-invalid={Boolean(errors.cityOrZip)}
                  className={inputClass('cityOrZip')}
                />
                <p className="text-xs text-[#29342F]/70 mt-1.5">
                  {BUSINESS_INFO.serviceAreaNote}
                </p>
                {errors.cityOrZip && (
                  <p className="flex items-center gap-1.5 text-sm text-[#B34034] mt-1.5" role="alert">
                    <AlertCircle className="w-4 h-4 shrink-0" aria-hidden="true" />
                    <span>{errors.cityOrZip}</span>
                  </p>
                )}
              </div>

              {/* Medical/Dental conditional fields */}
              {isMedical ? (
                <>
                  <div className="sm:col-span-2 p-4 rounded-lg bg-[#E8D6B8]/35 border border-[#29342F]/10 text-xs sm:text-sm text-[#29342F]">
                    For medical and dental practices, please share only basic facility and
                    scheduling information. Do not include patient information, medical records, or
                    sensitive health details.
                  </div>

                  <div>
                    <label htmlFor="quote-facility-type" className="block text-sm font-medium text-[#29342F] mb-1.5">
                      Basic Facility Type <span className="text-[#B36F56]">(Required)</span>
                    </label>
                    <input
                      id="quote-facility-type"
                      type="text"
                      value={form.facilityType}
                      onChange={(e) => updateField('facilityType', e.target.value)}
                      placeholder="e.g., Dental office, outpatient clinic"
                      aria-invalid={Boolean(errors.facilityType)}
                      className={inputClass('facilityType')}
                    />
                    {errors.facilityType && (
                      <p className="flex items-center gap-1.5 text-sm text-[#B34034] mt-1.5" role="alert">
                        <AlertCircle className="w-4 h-4 shrink-0" aria-hidden="true" />
                        <span>{errors.facilityType}</span>
                      </p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="quote-facility-scheduling" className="block text-sm font-medium text-[#29342F] mb-1.5">
                      Facility Scheduling Needs <span className="text-[#29342F]/60">(Optional)</span>
                    </label>
                    <input
                      id="quote-facility-scheduling"
                      type="text"
                      value={form.facilityScheduling}
                      onChange={(e) => updateField('facilityScheduling', e.target.value)}
                      placeholder="e.g., Weekday afternoons after 5 PM"
                      className={inputClass('facilityScheduling')}
                    />
                  </div>
                </>
              ) : (
                <div>
                  <label htmlFor="quote-space-type" className="block text-sm font-medium text-[#29342F] mb-1.5">
                    Type of Space <span className="text-[#B36F56]">(Required)</span>
                  </label>
                  <select
                    id="quote-space-type"
                    value={form.spaceType}
                    onChange={(e) => updateField('spaceType', e.target.value)}
                    aria-invalid={Boolean(errors.spaceType)}
                    className={inputClass('spaceType')}
                  >
                    <option value="">Select space type...</option>
                    <option value="Single-family home">Single-family home</option>
                    <option value="Apartment, condo, or townhome">Apartment, condo, or townhome</option>
                    <option value="Office or business suite">Office or business suite</option>
                    <option value="Retail or studio space">Retail or studio space</option>
                    <option value="Other property">Other property</option>
                  </select>
                  {errors.spaceType && (
                    <p className="flex items-center gap-1.5 text-sm text-[#B34034] mt-1.5" role="alert">
                      <AlertCircle className="w-4 h-4 shrink-0" aria-hidden="true" />
                      <span>{errors.spaceType}</span>
                    </p>
                  )}
                </div>
              )}

              {/* Desired Frequency */}
              <div>
                <label htmlFor="quote-frequency" className="block text-sm font-medium text-[#29342F] mb-1.5">
                  Desired Cleaning Frequency <span className="text-[#B36F56]">(Required)</span>
                </label>
                <select
                  id="quote-frequency"
                  value={form.frequency}
                  onChange={(e) => updateField('frequency', e.target.value)}
                  aria-invalid={Boolean(errors.frequency)}
                  className={inputClass('frequency')}
                >
                  <option value="">Select frequency...</option>
                  <option value="One-time service">One-time service</option>
                  <option value="Weekly">Weekly</option>
                  <option value="Bi-weekly">Bi-weekly</option>
                  <option value="Monthly">Monthly</option>
                  <option value="Not sure yet — would like to discuss">
                    Not sure yet — would like to discuss
                  </option>
                </select>
                {errors.frequency && (
                  <p className="flex items-center gap-1.5 text-sm text-[#B34034] mt-1.5" role="alert">
                    <AlertCircle className="w-4 h-4 shrink-0" aria-hidden="true" />
                    <span>{errors.frequency}</span>
                  </p>
                )}
              </div>

              {/* Approximate Size */}
              {!isMedical && (
                <div>
                  <label htmlFor="quote-size" className="block text-sm font-medium text-[#29342F] mb-1.5">
                    Approximate Size <span className="text-[#29342F]/60">(Optional)</span>
                  </label>
                  <input
                    id="quote-size"
                    type="text"
                    value={form.approxSize}
                    onChange={(e) => updateField('approxSize', e.target.value)}
                    placeholder="e.g., 1,800 sq ft or medium 3-bedroom"
                    className={inputClass('approxSize')}
                  />
                </div>
              )}

              {/* Preferred Timing */}
              <div>
                <label htmlFor="quote-timing" className="block text-sm font-medium text-[#29342F] mb-1.5">
                  Preferred Timing <span className="text-[#29342F]/60">(Optional)</span>
                </label>
                <input
                  id="quote-timing"
                  type="text"
                  value={form.preferredTiming}
                  onChange={(e) => updateField('preferredTiming', e.target.value)}
                  placeholder="e.g., Weekday mornings (Mon–Fri, 8 AM–6 PM)"
                  className={inputClass('preferredTiming')}
                />
              </div>

              {/* Residential-specific optional fields */}
              {isResidential && (
                <>
                  <div>
                    <label htmlFor="quote-bedrooms" className="block text-sm font-medium text-[#29342F] mb-1.5">
                      Number of Bedrooms <span className="text-[#29342F]/60">(Optional)</span>
                    </label>
                    <input
                      id="quote-bedrooms"
                      type="text"
                      value={form.bedrooms}
                      onChange={(e) => updateField('bedrooms', e.target.value)}
                      placeholder="e.g., 3"
                      className={inputClass('bedrooms')}
                    />
                  </div>
                  <div>
                    <label htmlFor="quote-bathrooms" className="block text-sm font-medium text-[#29342F] mb-1.5">
                      Number of Bathrooms <span className="text-[#29342F]/60">(Optional)</span>
                    </label>
                    <input
                      id="quote-bathrooms"
                      type="text"
                      value={form.bathrooms}
                      onChange={(e) => updateField('bathrooms', e.target.value)}
                      placeholder="e.g., 2.5"
                      className={inputClass('bathrooms')}
                    />
                  </div>
                </>
              )}

              {/* Commercial-specific optional fields */}
              {isCommercial && (
                <>
                  <div>
                    <label htmlFor="quote-business-name" className="block text-sm font-medium text-[#29342F] mb-1.5">
                      Business or Facility Name <span className="text-[#29342F]/60">(Optional)</span>
                    </label>
                    <input
                      id="quote-business-name"
                      type="text"
                      value={form.businessName}
                      onChange={(e) => updateField('businessName', e.target.value)}
                      placeholder="Your business name"
                      className={inputClass('businessName')}
                    />
                  </div>
                  <div>
                    <label htmlFor="quote-commercial-sqft" className="block text-sm font-medium text-[#29342F] mb-1.5">
                      Approximate Square Footage <span className="text-[#29342F]/60">(Optional)</span>
                    </label>
                    <input
                      id="quote-commercial-sqft"
                      type="text"
                      value={form.commercialSqFt}
                      onChange={(e) => updateField('commercialSqFt', e.target.value)}
                      placeholder="e.g., 3,500 sq ft"
                      className={inputClass('commercialSqFt')}
                    />
                  </div>
                </>
              )}
            </div>

            <div className="pt-4 flex flex-wrap items-center justify-between gap-4">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="inline-flex items-center gap-2 px-4 py-3 text-sm font-medium text-[#29342F] hover:bg-[#F5EFE4] rounded-md transition-colors min-h-[44px] cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" aria-hidden="true" />
                <span>Back</span>
              </button>

              <button
                type="button"
                onClick={handleNext}
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#23483F] hover:bg-[#1A362F] text-[#FCF9F3] text-sm font-medium rounded-md transition-colors min-h-[44px] cursor-pointer"
              >
                <span>Continue to Contact Details</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: Contact details */}
        {step === 3 && (
          <div className="space-y-6">
            <div>
              <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-[#29342F]">
                How should our team reach you?
              </h2>
              <p className="text-sm text-[#29342F]/75 mt-1">
                We respond during published business hours (Monday–Friday, 8:00 AM–6:00 PM).
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="sm:col-span-2">
                <label htmlFor="quote-full-name" className="block text-sm font-medium text-[#29342F] mb-1.5">
                  Full Name <span className="text-[#B36F56]">(Required)</span>
                </label>
                <input
                  id="quote-full-name"
                  type="text"
                  value={form.fullName}
                  onChange={(e) => updateField('fullName', e.target.value)}
                  placeholder="Your full name"
                  aria-invalid={Boolean(errors.fullName)}
                  className={inputClass('fullName')}
                />
                {errors.fullName && (
                  <p className="flex items-center gap-1.5 text-sm text-[#B34034] mt-1.5" role="alert">
                    <AlertCircle className="w-4 h-4 shrink-0" aria-hidden="true" />
                    <span>{errors.fullName}</span>
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="quote-email" className="block text-sm font-medium text-[#29342F] mb-1.5">
                  Email Address <span className="text-[#B36F56]">(Required)</span>
                </label>
                <input
                  id="quote-email"
                  type="email"
                  value={form.email}
                  onChange={(e) => updateField('email', e.target.value)}
                  placeholder="you@example.com"
                  aria-invalid={Boolean(errors.email)}
                  className={inputClass('email')}
                />
                {errors.email && (
                  <p className="flex items-center gap-1.5 text-sm text-[#B34034] mt-1.5" role="alert">
                    <AlertCircle className="w-4 h-4 shrink-0" aria-hidden="true" />
                    <span>{errors.email}</span>
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="quote-phone" className="block text-sm font-medium text-[#29342F] mb-1.5">
                  Phone Number or Preferred Contact Method{' '}
                  <span className="text-[#B36F56]">(Required)</span>
                </label>
                <input
                  id="quote-phone"
                  type="text"
                  value={form.phoneOrMethod}
                  onChange={(e) => updateField('phoneOrMethod', e.target.value)}
                  placeholder="(405) 555-0199 or text/email"
                  aria-invalid={Boolean(errors.phoneOrMethod)}
                  className={inputClass('phoneOrMethod')}
                />
                {errors.phoneOrMethod && (
                  <p className="flex items-center gap-1.5 text-sm text-[#B34034] mt-1.5" role="alert">
                    <AlertCircle className="w-4 h-4 shrink-0" aria-hidden="true" />
                    <span>{errors.phoneOrMethod}</span>
                  </p>
                )}
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="quote-notes" className="block text-sm font-medium text-[#29342F] mb-1.5">
                  Additional Information <span className="text-[#29342F]/60">(Optional)</span>
                </label>
                <textarea
                  id="quote-notes"
                  rows={4}
                  value={form.additionalInfo}
                  onChange={(e) => updateField('additionalInfo', e.target.value)}
                  placeholder="Share any priorities, questions, or helpful context about your space."
                  className={inputClass('additionalInfo')}
                />
              </div>
            </div>

            <div className="pt-4 flex flex-wrap items-center justify-between gap-4">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="inline-flex items-center gap-2 px-4 py-3 text-sm font-medium text-[#29342F] hover:bg-[#F5EFE4] rounded-md transition-colors min-h-[44px] cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" aria-hidden="true" />
                <span>Back</span>
              </button>

              <button
                type="submit"
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-[#23483F] hover:bg-[#1A362F] text-[#FCF9F3] text-sm sm:text-base font-medium rounded-md transition-colors min-h-[48px] cursor-pointer"
              >
                <span>Request My Free Cleaning Quote</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </button>
            </div>
          </div>
        )}
      </form>

      {onNavigate && (
        <div className="mt-8 pt-6 border-t border-[#29342F]/10 flex flex-wrap items-center justify-between gap-3 text-xs text-[#29342F]/70">
          <span>Prefer to talk right away? Call or text (405) 816-9990.</span>
          <button
            type="button"
            onClick={() => onNavigate('contact')}
            className="underline underline-offset-4 hover:text-[#23483F] cursor-pointer"
          >
            View all contact details
          </button>
        </div>
      )}
    </div>
  );
}
