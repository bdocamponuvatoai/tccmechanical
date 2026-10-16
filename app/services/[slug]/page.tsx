import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Check, ArrowUpRight } from 'lucide-react';
import Inquiry from '@/components/Inquiry';
import TrustBadges from '@/components/TrustBadges';
import { Faq } from '@/components/Sections';
import { services, site } from '@/content/site';

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);
  if (!service) return {};
  return {
    title: `${service.name} Services in Chicago`,
    description: service.description,
    alternates: { canonical: `/services/${slug}/` },
  };
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);
  if (!service) notFound();

  return (
    <>
      <section className="page-intro">
        <nav className="breadcrumb" aria-label="Breadcrumb">
          <ol>
            <li><Link href="/">Home</Link></li>
            <li><Link href="/services/">Services</Link></li>
            <li aria-current="page">{service.name}</li>
          </ol>
        </nav>
        <span className="eyebrow">CHICAGO &amp; CHICAGOLAND / {service.name.toUpperCase()}</span>
        <h1>{service.label}</h1>
        <p>{service.description}</p>
        <Link className="button" href="/contact/">
          Request {service.name.toLowerCase()} service <ArrowUpRight size={18} aria-hidden="true" />
        </Link>
      </section>
      <section className="service-detail" aria-labelledby="detail-title">
        <Image
          src={`/assets/photos/${service.image}.webp`}
          width={1536}
          height={1024}
          sizes="(min-width: 1024px) 45vw, 92vw"
          alt={service.imageAlt}
        />
        <div>
          <span className="eyebrow">YOUR SYSTEM. OUR ATTENTION.</span>
          <h2 id="detail-title">Here to help<br />with the details.</h2>
          <ul>
            {service.items.map((item) => (
              <li key={item}><Check size={20} aria-hidden="true" />{item}</li>
            ))}
          </ul>
          <p>Every home and system is different. Talk with the team about your needs, equipment, and service availability before arranging a visit.</p>
          <a className="text-link" href={site.phoneHref}>
            Call {site.phone} <ArrowUpRight size={18} aria-hidden="true" />
          </a>
        </div>
      </section>
      <TrustBadges />
      <section className="section related" aria-labelledby="related-title">
        <h2 id="related-title">Comfort is connected.</h2>
        <div>
          {services
            .filter((s) => s.slug !== service.slug)
            .map((s) => (
              <Link href={`/services/${s.slug}/`} key={s.slug}>
                {s.name}
                <ArrowUpRight size={18} aria-hidden="true" />
              </Link>
            ))}
        </div>
      </section>
      <Faq />
      <Inquiry />
    </>
  );
}
