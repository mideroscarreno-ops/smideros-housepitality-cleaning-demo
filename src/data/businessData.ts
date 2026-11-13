import { GalleryItem, PageRoute, ServiceOption } from '../types';
import { MEDIA } from './media';

export const BUSINESS_INFO = {
  legalName: 'Housepitality Cleaning Services, LLC',
  shortName: 'Housepitality',
  tagline: 'A Little More Care in Every Clean.',
  brandStatement: 'Locally Owned. Family Operated. Rooted in Care.',
  established: '2020',
  teamExperience: 'More than seven years of published team cleaning experience',
  location: 'Newcastle, Oklahoma, USA',
  serviceRegion: 'Oklahoma City metropolitan area, subject to confirmation of individual locations.',
  serviceAreaNote: 'Contact us to confirm availability in your area.',
  phones: [
    { display: '(405) 816-9990', href: 'tel:+14058169990', smsHref: 'sms:+14058169990' },
    { display: '(405) 588-3752', href: 'tel:+14055883752', smsHref: 'sms:+14055883752' },
  ],
  email: 'housepitalitycleaningservices@gmail.com',
  emailHref: 'mailto:housepitalitycleaningservices@gmail.com',
  hours: [
    { days: 'Monday – Friday', time: '8:00 AM – 6:00 PM' },
    { days: 'Saturday – Sunday', time: 'Closed' },
  ],
  credibility: [
    {
      label: 'Established 2020',
      detail: 'Locally owned and family operated in Newcastle, Oklahoma',
    },
    {
      label: '7+ Years Experience',
      detail: 'Published team professional cleaning background',
    },
    {
      label: 'BBB Accredited · A+ Rating',
      detail: 'Listed as an Accredited Business with an A+ rating by the Better Business Bureau',
    },
    {
      label: 'STROLL Magazine Partner',
      detail: 'Published local business partnership with STROLL Magazine, Brookhaven Edition',
    },
  ],
  disclosure: 'Independent website redesign concept by S.Mideros Agency.',
};

export interface ServicePathway {
  route: PageRoute;
  serviceOption: ServiceOption;
  kicker: string;
  headline: string;
  summary: string;
  ctaLabel: string;
  image: string;
  imageAlt: string;
  detailIntro: string;
  hospitalityNote: string;
  discussionPrompts: string[];
}

export const CORE_PATHWAYS: ServicePathway[] = [
  {
    route: 'residential',
    serviceOption: 'Residential Cleaning',
    kicker: 'Residential Cleaning',
    headline: 'Your Home, Beautifully Cared For.',
    summary:
      'Inviting someone into your home is deeply personal. Our family-operated team cares for living spaces with warmth, discretion, and zero judgment—so you can return to calm, comfortable rooms.',
    ctaLabel: 'Explore Home Cleaning',
    image: MEDIA.residentialBedroom,
    imageAlt: 'Sunlit residential bedroom with freshly arranged ivory linen bedding and oak furnishings',
    detailIntro:
      'Every household has its own rhythm, priorities, and season of life. Whether you are balancing family schedules, welcoming guests, or simply ready for a lighter week, Housepitality approaches your home with kindness and respect.',
    hospitalityNote:
      'We believe you should always feel comfortable asking for help—no matter what your home looks like today. Our team listens first and tailors each visit around your space.',
    discussionPrompts: [
      'Preferred cleaning cadence (one-time visit, weekly, bi-weekly, or monthly)',
      'Rooms and surfaces you want prioritized during your visit',
      'Household preferences, pets, or timing needs within our Monday–Friday hours',
    ],
  },
  {
    route: 'commercial',
    serviceOption: 'Commercial Cleaning',
    kicker: 'Commercial Cleaning',
    headline: 'Professional Care for Professional Spaces.',
    summary:
      'From client-facing lobbies to everyday workrooms, we help businesses across our confirmed OKC metro service area maintain orderly, welcoming interiors that reflect pride in their work.',
    ctaLabel: 'Explore Business Cleaning',
    image: MEDIA.commercialOffice,
    imageAlt: 'Clean modern commercial office and glass conference room with walnut table and natural light',
    detailIntro:
      'A well-kept workplace supports the people who work there and greets every visitor with quiet confidence. Housepitality partners with local offices and businesses to provide dependable, attentive upkeep.',
    hospitalityNote:
      'We work collaboratively with owners and office managers to understand the flow of your workspace and coordinate scheduling that fits your operating rhythm.',
    discussionPrompts: [
      'Type of commercial property and approximate square footage',
      'Common areas, restrooms, or workspace zones requiring regular attention',
      'Preferred schedule and frequency tailored to your business hours',
    ],
  },
  {
    route: 'medical-dental',
    serviceOption: 'Medical/Dental Facility Cleaning',
    kicker: 'Medical & Dental Facility Cleaning',
    headline: 'Thoughtful Cleaning for Care Environments.',
    summary:
      'Waiting rooms, reception desks, and administrative areas shape how patients feel the moment they arrive. We provide attentive, respectful facility cleaning tailored to your practice’s scheduling needs.',
    ctaLabel: 'Explore Facility Cleaning',
    image: MEDIA.medicalReception,
    imageAlt: 'Bright, orderly dental and medical practice reception lounge with warm limestone desk and clean flooring',
    detailIntro:
      'Medical and dental practices thrive on calm, welcoming atmospheres. Housepitality offers dedicated facility cleaning focused on maintaining neat, comfortable reception areas, corridors, and shared spaces for staff and visitors.',
    hospitalityNote:
      'Contact our team to discuss the specific areas of your facility, your scheduling windows, and what is included for your practice environment.',
    discussionPrompts: [
      'Basic facility type (e.g., dental office, outpatient clinic, wellness practice)',
      'Preferred days and timing windows around patient hours',
      'Scope of reception, office, and shared facility areas to review with our team',
    ],
  },
];

export interface AdditionalServiceItem {
  id: string;
  title: string;
  serviceOption: ServiceOption;
  purpose: string;
  scopeNote: string;
}

export const ADDITIONAL_SERVICES: AdditionalServiceItem[] = [
  {
    id: 'deep-cleaning',
    title: 'Deep Cleaning',
    serviceOption: 'Deep Cleaning',
    purpose:
      'Designed for homes and workspaces ready for a thorough refresh beyond routine upkeep—helping restore comfort and order when life gets busy or seasons change.',
    scopeNote:
      'Contact our team to discuss what’s included and the needs of your space.',
  },
  {
    id: 'move-in-out',
    title: 'Move-In / Move-Out Cleaning',
    serviceOption: 'Move-In/Move-Out Cleaning',
    purpose:
      'Helps ease the transition of relocating—preparing a welcoming environment before you settle in, or leaving a former residence or suite tidy as you hand over the keys.',
    scopeNote:
      'Contact our team to discuss what’s included and the needs of your space.',
  },
  {
    id: 'packing-unpacking',
    title: 'Packing & Unpacking',
    serviceOption: 'Packing/Unpacking',
    purpose:
      'Thoughtful, hands-on assistance to take the overwhelm out of organizing belongings during a move—helping you pack systematically or settle into your new rooms sooner.',
    scopeNote:
      'Contact our team to discuss what’s included and the needs of your space.',
  },
];

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'g-living',
    title: 'Sunlit Open Living & Kitchen Space',
    category: 'Residential',
    caption: 'Illustrative residential interior showcasing warm natural light and spotless open-plan living.',
    image: MEDIA.heroLivingRoom,
    alt: 'Sunlit modern living room and kitchen island with clean oak floors and crisp linen sofa',
  },
  {
    id: 'g-bedroom',
    title: 'Restful Primary Suite',
    category: 'Residential',
    caption: 'Illustrative bedroom environment reflecting calm hospitality presentation and neat linens.',
    image: MEDIA.residentialBedroom,
    alt: 'Serene residential bedroom with freshly made ivory bedding and clean hardwood flooring',
  },
  {
    id: 'g-commercial',
    title: 'Glass-Walled Conference & Office Suite',
    category: 'Commercial',
    caption: 'Illustrative commercial workspace environment kept orderly for daily teams and visiting clients.',
    image: MEDIA.commercialOffice,
    alt: 'Modern glass conference suite with walnut table and organized adjacent desks',
  },
  {
    id: 'g-medical',
    title: 'Welcoming Practice Reception Lounge',
    category: 'Medical & Dental',
    caption: 'Illustrative medical and dental reception setting designed around visitor comfort and order.',
    image: MEDIA.medicalReception,
    alt: 'Clean, bright medical and dental waiting area with limestone desk and neat seating',
  },
  {
    id: 'g-detail',
    title: 'Countertop & Linen Presentation',
    category: 'Hospitality Details',
    caption: 'Illustrative detail study highlighting thoughtful finishing touches and cared-for surfaces.',
    image: MEDIA.additionalKitchen,
    alt: 'Marble kitchen countertop with neatly folded ivory linen towels and ceramic pitcher',
  },
  {
    id: 'g-entry',
    title: 'Warm Threshold & Entryway',
    category: 'Hospitality Details',
    caption: 'Illustrative entryway interior expressing the calm welcome Housepitality aims to support.',
    image: MEDIA.storyEntryway,
    alt: 'Sunlit home entryway with clean oak console table and ceramic vase of eucalyptus',
  },
];

export const PROCESS_STEPS = [
  {
    number: '01',
    title: 'Tell Us About Your Space',
    description:
      'Share your cleaning needs, location, and type of property through our guided quote form or by phone.',
  },
  {
    number: '02',
    title: 'Discuss Your Requirements',
    description:
      'Connect with our team to confirm service availability in your area, review your priorities, and receive a free quote.',
  },
  {
    number: '03',
    title: 'Plan Your Cleaning',
    description:
      'Coordinate the appropriate service scope and scheduling details directly with our family-operated team.',
  },
];
