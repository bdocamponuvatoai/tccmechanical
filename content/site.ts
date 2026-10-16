// Single source of truth for business facts. Facts below match https://tccmechanical.com/
// (reviewed October 2026). Do not add claims that the business has not published.
export const site = {
  name: 'Tabor’s Complete Comfort Mechanical',
  legalName: 'Tabor’s Complete Comfort Mechanical, LLC',
  founder: 'Alan Tabor',
  founded: 2005,
  phone: '773-715-3860',
  phoneHref: 'tel:+17737153860',
  email: 'sales@ccmechanicalheating.com',
  address: {
    street: '1449 S Michigan Ave',
    city: 'Chicago',
    region: 'IL',
    postalCode: '60605',
    country: 'US',
  },
  areaServed: ['Chicago', 'Chicagoland'],
  // Set NEXT_PUBLIC_SITE_URL per deployment. Canonical URLs, OG images and the sitemap use it.
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? 'https://tccmechanical.com').replace(/\/$/, ''),
  // Search indexing stays off until the owner approves launch (NEXT_PUBLIC_ALLOW_INDEXING=true).
  indexable: process.env.NEXT_PUBLIC_ALLOW_INDEXING === 'true',
};

export const mailto = `mailto:${site.email}`;

export const nav = [
  { href: '/services/', label: 'Services' },
  { href: '/about/', label: 'Our story' },
  { href: '/process/', label: 'How we work' },
  { href: '/#questions', label: 'FAQs' },
];

export const services = [
  {
    slug: 'heating',
    name: 'Heating',
    label: 'Warmth you can count on.',
    short: 'From the first chill to the deepest freeze.',
    description: 'Furnace and boiler repair, replacement, and maintenance for a home that feels right all winter.',
    items: ['Gas and electric furnace repair', 'Furnace installation and replacement', 'Boiler service', 'Seasonal heating maintenance'],
    image: 'heating',
    imageAlt: 'Illustrative furnace, ductwork, and water heater in a residential utility room',
  },
  {
    slug: 'cooling',
    name: 'Cooling',
    label: 'Keep your cool. All summer.',
    short: 'A cooler home. A more comfortable day.',
    description: 'Air conditioning repairs, new systems, and seasonal care to help your home stay comfortable when Chicago heats up.',
    items: ['Central air conditioning repair', 'AC installation and replacement', 'Ductless mini-split systems', 'Seasonal cooling maintenance'],
    image: 'cooling',
    imageAlt: 'Illustrative technician checking gauges on a residential air conditioner beside a Chicago brick home',
  },
  {
    slug: 'air-quality',
    name: 'Indoor air quality',
    label: 'Make room for better air.',
    short: 'Comfort is more than a temperature.',
    description: 'Air quality solutions that address filtration, humidity, and the way air moves through your home.',
    items: ['Air purifiers', 'Whole-home humidifiers', 'Thermostat installation', 'Indoor air quality solutions'],
    image: 'air-quality',
    imageAlt: 'Illustrative technician replacing an HVAC air filter in a Chicago home',
  },
  {
    slug: 'water-heaters',
    name: 'Water heaters',
    label: 'Hot water. Less worry.',
    short: 'Everyday essentials, taken care of.',
    description: 'Service and installation for traditional and tankless water heaters, with guidance on the right system for your household.',
    items: ['Water heater service', 'Water heater installation', 'Tankless water heaters', 'System replacement guidance'],
    image: 'water-heaters',
    imageAlt: 'Illustrative technician inspecting a residential water heater in a Chicago basement',
  },
];

// Trust badges published on https://tccmechanical.com/ under
// "Certified Chicago HVAC Experts You Can Trust". Files: public/assets/badges/.
export const badges = [
  { file: 'five-star-rated', alt: '5 star rated on Google, based on hundreds of reviews' },
  { file: 'emergency-service-24-7', alt: '24/7 emergency service' },
  { file: 'years-in-business', alt: '21+ years in business' },
  { file: 'epa', alt: 'United States Environmental Protection Agency (EPA)' },
  { file: 'ashrae', alt: 'ASHRAE' },
  { file: 'nate', alt: 'NATE — North American Technician Excellence' },
];

export const faqs: [question: string, answer: string][] = [
  ['What heating and cooling services do you offer?', 'We service and install furnaces, boilers, central air conditioning, ductless mini-splits, and water heaters. We also help with maintenance, thermostats, and indoor air quality.'],
  ['What areas do you serve?', 'Tabor’s serves Chicago and the surrounding Chicagoland area. Call with your address so the team can confirm service availability.'],
  ['Should I repair or replace my HVAC system?', 'That depends on the condition of your equipment, repair history, comfort needs, and the cost of the repair. Request an assessment so the team can explain the options for your specific system.'],
  ['How do I request service?', `Call ${site.phone} or use the request builder on this page to prepare an email to the team. Your appointment is confirmed only after the team responds.`],
  ['Can you help with an urgent heating or cooling issue?', `Yes. Tabor’s offers 24/7 emergency service. Call ${site.phone} and the team will confirm the next steps for your situation.`],
];

export const steps: [title: string, body: string][] = [
  ['Tell us what’s happening.', 'A noisy system, uneven temperatures, or time for something new? Start with a call or a service request.'],
  ['Understand your options.', 'Discuss the issue with the team and arrange an assessment. Get clarity on the work your system needs.'],
  ['Get back to comfortable.', 'Agree on the next steps and let the team take care of your heating and cooling needs.'],
];
