import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Services, Story, Process, Faq } from '@/components/Sections';
import TrustBadges from '@/components/TrustBadges';
import Inquiry from '@/components/Inquiry';
import { mailto, site } from '@/content/site';

type PageKey = 'services' | 'about' | 'process' | 'contact' | 'privacy' | 'terms';

const pages: Record<PageKey, { crumb: string; title: string; intro?: string; legal?: boolean }> = {
  services: {
    crumb: 'Services',
    title: 'Complete comfort starts here.',
    intro: 'Heating, cooling, air quality, and hot water. The essentials of a comfortable home, cared for by one local team.',
  },
  about: {
    crumb: 'Our story',
    title: 'Good people. Good work. Better comfort.',
    intro: `Founded by ${site.founder} in ${site.founded}. Focused on the everyday comfort of Chicago homes and the people inside them.`,
  },
  process: { crumb: 'How we work', title: 'A clear path to comfortable.' },
  contact: { crumb: 'Contact', title: 'Let’s talk about your comfort.' },
  privacy: { crumb: 'Privacy', title: 'Privacy notice — draft', legal: true },
  terms: { crumb: 'Terms', title: 'Website terms — draft', legal: true },
};

const isPageKey = (key: string): key is PageKey => key in pages;

type Props = { params: Promise<{ page: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return Object.keys(pages).map((page) => ({ page }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { page } = await params;
  if (!isPageKey(page)) return {};
  const config = pages[page];
  return {
    title: config.title,
    description:
      config.intro ??
      'Explore Tabor’s Complete Comfort Mechanical: local heating, cooling, and home comfort service in Chicago and Chicagoland.',
    alternates: { canonical: `/${page}/` },
    ...(config.legal && { robots: { index: false, follow: true } }),
  };
}

export default async function Page({ params }: Props) {
  const { page } = await params;
  if (!isPageKey(page)) notFound();
  const config = pages[page];

  return (
    <>
      <section className="page-intro">
        <nav className="breadcrumb" aria-label="Breadcrumb">
          <ol>
            <li><Link href="/">Home</Link></li>
            <li aria-current="page">{config.crumb}</li>
          </ol>
        </nav>
        <span className="eyebrow">TABOR’S COMPLETE COMFORT MECHANICAL</span>
        <h1>{config.title}</h1>
        {config.intro && <p>{config.intro}</p>}
      </section>

      {page === 'services' && <Services />}
      {page === 'about' && (
        <>
          <Story />
          <TrustBadges />
          <div className="section about-note">
            <span className="eyebrow">OUR APPROACH</span>
            <h2>Your home deserves attention.</h2>
            <p>
              Good service starts by listening. Whether you need a repair, are planning a replacement, or want to give your
              system a seasonal check, we’ll help you understand the next step.
            </p>
            <p>
              Tabor’s Complete Comfort Mechanical serves Chicago and Chicagoland with a customer-first approach to heating
              and cooling. “The Simple Choice” is more than a tagline: it’s the way we want getting help to feel.
            </p>
          </div>
        </>
      )}
      {page === 'process' && <Process />}

      {config.legal ? (
        <div className="section legal">
          <strong>Draft for owner review. Not final legal advice or policy.</strong>
          <p>
            This website provides information about Tabor’s Complete Comfort Mechanical. Its request builder prepares an
            email in your email application; it does not submit or store a service request on this website.
          </p>
          <p>
            {page === 'privacy'
              ? 'Information you choose to send by email is received by the business for responding to your inquiry. Hosting infrastructure may process technical connection data. Retention periods, privacy rights, and applicable business procedures must be confirmed before public launch.'
              : 'Website descriptions are general information. Availability, pricing, appointment times, equipment suitability, and scope of work must be confirmed directly with the business. This website does not confirm bookings or establish a service contract.'}
          </p>
          <p>
            Questions: <a href={mailto}>{site.email}</a>.
          </p>
        </div>
      ) : (
        <>
          <Inquiry />
          {page === 'contact' && <TrustBadges />}
          <Faq />
        </>
      )}
    </>
  );
}
