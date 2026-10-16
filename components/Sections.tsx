import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight, Flame, Snowflake, Wind, Droplets, ArrowRight, Check } from 'lucide-react';
import JsonLd from './JsonLd';
import { services, faqs, steps, site } from '@/content/site';

const icons = [Flame, Snowflake, Wind, Droplets];

export function Services() {
  return (
    <section className="section services" id="services" aria-labelledby="services-title">
      <div className="section-heading">
        <div>
          <span className="eyebrow">01 / COMPLETE HOME COMFORT</span>
          <h2 id="services-title">Every season.<br />Every degree of comfort.</h2>
        </div>
        <p>One local team for the systems that make your home feel like home.</p>
      </div>
      <div className="services-grid">
        {services.map((service, i) => {
          const Icon = icons[i];
          return (
            <Link className="service-card" href={`/services/${service.slug}/`} key={service.slug}>
              <div className="service-top">
                <Icon size={33} strokeWidth={1.25} aria-hidden="true" />
                <span aria-hidden="true">0{i + 1}</span>
              </div>
              <div className="service-visual">
                <Image
                  src={`/assets/photos/${service.image}.webp`}
                  width={1536}
                  height={1024}
                  sizes="(min-width: 1024px) 22vw, (min-width: 480px) 44vw, 88vw"
                  alt=""
                />
              </div>
              <h3>{service.name}</h3>
              <p>{service.short}</p>
              <span className="service-link">
                Explore service <ArrowUpRight size={20} aria-hidden="true" />
              </span>
            </Link>
          );
        })}
      </div>
    </section>
  );
}

export function Story() {
  return (
    <section className="story" aria-labelledby="story-title">
      <div className="story-photo">
        <Image
          src="/assets/photos/service.webp"
          width={1536}
          height={1024}
          sizes="(min-width: 768px) 50vw, 100vw"
          alt="Illustrative image of an HVAC technician beside a residential air conditioner"
        />
        <span className="image-caption">The details make the difference.</span>
      </div>
      <div className="story-copy">
        <span className="eyebrow">02 / LOCAL PEOPLE. PERSONAL SERVICE.</span>
        <h2 id="story-title">A familiar name.<br />A higher standard of care.</h2>
        <p>Home comfort is personal. Your HVAC service should be, too.</p>
        <p>
          Founded by {site.founder} in {site.founded}, Tabor’s Complete Comfort Mechanical serves Chicago and the
          surrounding area with heating and cooling service built around the homeowner.
        </p>
        <ul className="check-list">
          <li><Check size={18} aria-hidden="true" /> Locally owned and operated</li>
          <li><Check size={18} aria-hidden="true" /> Repair, replacement, and ongoing care</li>
          <li><Check size={18} aria-hidden="true" /> A direct conversation with the team</li>
        </ul>
        <Link className="text-link" href="/about/">
          Get to know Tabor’s <ArrowUpRight size={18} aria-hidden="true" />
        </Link>
      </div>
    </section>
  );
}

export function Process() {
  return (
    <section className="section process" aria-labelledby="process-title">
      <div className="section-heading">
        <div>
          <span className="eyebrow">03 / COMFORT WITHOUT COMPLICATION</span>
          <h2 id="process-title">Let’s keep it simple.</h2>
        </div>
        <Link className="text-link" href="/contact/">
          Start a conversation <ArrowUpRight size={18} aria-hidden="true" />
        </Link>
      </div>
      <ol className="process-grid">
        {steps.map(([title, body], i) => (
          <li key={title}>
            <span className="step-number" aria-hidden="true">0{i + 1}</span>
            <ArrowRight className="step-arrow" size={24} aria-hidden="true" />
            <h3>{title}</h3>
            <p>{body}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}

export function Faq() {
  return (
    <section className="section faq" id="questions" aria-labelledby="faq-title">
      <div>
        <span className="eyebrow">A FEW GOOD QUESTIONS</span>
        <h2 id="faq-title">A little clarity<br />goes a long way.</h2>
        <p>
          Still have a question?
          <br />
          <a className="text-link" href={site.phoneHref}>
            Give us a call <ArrowUpRight size={16} aria-hidden="true" />
          </a>
        </p>
      </div>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: faqs.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })),
        }}
      />
      <div className="faq-list">
        {faqs.map(([q, a], i) => (
          <details key={q} name="faq">
            <summary>
              <span className="faq-number" aria-hidden="true">0{i + 1}</span>
              <span className="faq-question">{q}</span>
              <span className="plus" aria-hidden="true">+</span>
            </summary>
            <p>{a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}

export function Seasonal() {
  return (
    <section className="seasonal" aria-labelledby="seasonal-title">
      <div>
        <span className="eyebrow">A LITTLE CARE GOES A LONG WAY</span>
        <h2 id="seasonal-title">Stay ahead<br />of the next season.</h2>
        <p>Give your system some attention before it has to work its hardest. Talk to the team about heating and cooling maintenance.</p>
        <Link className="button light" href="/contact/">
          Let’s plan your tune-up <ArrowUpRight size={18} aria-hidden="true" />
        </Link>
      </div>
      <div className="season-art" aria-hidden="true">
        <span className="orbit o1" />
        <span className="orbit o2" />
        <span className="orbit o3" />
        <span className="season-symbol">
          <Snowflake strokeWidth={0.8} />
          <Flame strokeWidth={0.8} />
        </span>
        <span className="season-tag">GOOD COMFORT NEVER GOES OUT OF SEASON</span>
      </div>
    </section>
  );
}
