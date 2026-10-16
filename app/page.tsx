import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, ArrowDown, Phone, Check } from 'lucide-react';
import { Services, Story, Process, Faq, Seasonal } from '@/components/Sections';
import TrustBadges from '@/components/TrustBadges';
import Inquiry from '@/components/Inquiry';
import { site } from '@/content/site';

export const metadata: Metadata = { alternates: { canonical: '/' } };

export default function Home() {
  return (
    <>
      <section className="hero" aria-labelledby="hero-title">
        <div className="hero-copy">
          <span className="eyebrow"><span className="status-dot" /> CHICAGO’S HOME COMFORT TEAM</span>
          <h1 id="hero-title">
            Life happens here.<br />
            <span>Make it comfortable.</span>
          </h1>
          <div className="hero-bottom">
            <p>Heating. Cooling. Everything in between.<br />Thoughtful service for the place you call home.</p>
            <div className="hero-actions">
              <Link className="button" href="/contact/">
                Let’s get comfortable <ArrowUpRight size={18} aria-hidden="true" />
              </Link>
              <a className="circle-link" href="#services" aria-label="Explore services">
                <ArrowDown size={20} aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>
        <div className="hero-photo">
          <Image
            src="/assets/photos/home.webp"
            alt="Sunlit living room with cream furnishings and a view of Chicago brick homes; illustrative brand imagery"
            width={1536}
            height={1024}
            priority
            fetchPriority="high"
            sizes="(min-width: 768px) 96vw, 92vw"
          />
          <div className="photo-label">
            <span className="mini-mark">T/C/C</span>
            <span>YOUR COMFORT.<br />OUR CALLING.</span>
          </div>
          <a className="hero-call" href={site.phoneHref}>
            <Phone size={19} aria-hidden="true" />
            <span>
              Good comfort starts with a conversation.
              <strong>{site.phone} <ArrowUpRight size={17} aria-hidden="true" /></strong>
            </span>
          </a>
        </div>
        <ul className="trust-strip">
          <li><Check size={17} aria-hidden="true" /> Locally owned &amp; operated</li>
          <li><Check size={17} aria-hidden="true" /> Serving Chicago since {site.founded}</li>
          <li><Check size={17} aria-hidden="true" /> 24/7 emergency service</li>
          <li className="trust-tagline">“The Simple Choice”</li>
        </ul>
      </section>
      <TrustBadges />
      <Services />
      <Story />
      <Process />
      <Seasonal />
      <Faq />
      <Inquiry />
    </>
  );
}
