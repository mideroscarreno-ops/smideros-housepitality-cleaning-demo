export type PageRoute =
  | 'home'
  | 'residential'
  | 'commercial'
  | 'medical-dental'
  | 'additional-services'
  | 'our-story'
  | 'our-work'
  | 'service-areas'
  | 'quote'
  | 'contact';

export type ServiceOption =
  | 'Residential Cleaning'
  | 'Commercial Cleaning'
  | 'Medical/Dental Facility Cleaning'
  | 'Deep Cleaning'
  | 'Move-In/Move-Out Cleaning'
  | 'Packing/Unpacking'
  | 'Not Sure Yet';

export interface QuotePrefill {
  service?: ServiceOption;
  cityOrZip?: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'Residential' | 'Commercial' | 'Medical & Dental' | 'Hospitality Details';
  caption: string;
  image: string;
  alt: string;
}
