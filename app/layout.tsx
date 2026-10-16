import type { Metadata, Viewport } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import MobileCta from '@/components/MobileCta';
import JsonLd from '@/components/JsonLd';
import { site } from '@/content/site';
import './globals.css';

const description =
  'Heating, cooling, indoor air quality, and water heater service in Chicago and Chicagoland. 24/7 emergency service from Alan Tabor’s local team since 2005.';

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: 'Chicago HVAC Services | Tabor’s Complete Comfort', template: '%s | Tabor’s Complete Comfort' },
  description,
  applicationName: site.name,
  robots: site.indexable ? { index: true, follow: true } : { index: false, follow: false },
  formatDetection: { telephone: false },
  openGraph: {
    type: 'website',
    siteName: site.name,
    locale: 'en_US',
    title: 'Home feels better with Tabor’s.',
    description: 'Complete home comfort. Local Chicago care.',
    images: [{ url: '/assets/photos/home.webp', width: 1536, height: 1024, alt: 'Sunlit Chicago living room' }],
  },
  twitter: { card: 'summary_large_image' },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
    apple: '/apple-icon.png',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#121c33',
};

const business = {
  '@context': 'https://schema.org',
  '@type': 'HVACBusiness',
  '@id': `${site.url}/#business`,
  name: site.name,
  url: site.url,
  telephone: '+1-773-715-3860',
  email: site.email,
  image: `${site.url}/assets/photos/home.webp`,
  foundingDate: String(site.founded),
  founder: { '@type': 'Person', name: site.founder },
  address: {
    '@type': 'PostalAddress',
    streetAddress: site.address.street,
    addressLocality: site.address.city,
    addressRegion: site.address.region,
    postalCode: site.address.postalCode,
    addressCountry: site.address.country,
  },
  areaServed: site.areaServed,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <a href="#main" className="skip-link">Skip to content</a>
        <Header />
        <main id="main" tabIndex={-1}>{children}</main>
        <Footer />
        <MobileCta />
        <JsonLd data={business} />
      </body>
    </html>
  );
}
