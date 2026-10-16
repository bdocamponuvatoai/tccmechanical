import Image from 'next/image';
import { badges, site } from '@/content/site';

export default function TrustBadges() {
  return (
    <section className="section trust-badges" aria-labelledby="trust-badges-title">
      <div className="section-heading">
        <div>
          <span className="eyebrow">TRUSTED BY CHICAGO HOMES SINCE {site.founded}</span>
          <h2 id="trust-badges-title">
            Certified Chicago HVAC experts <span className="nowrap-md">you can trust.</span>
          </h2>
        </div>
        <p>Five-star rated on Google, ready around the clock for emergencies, and backed by more than two decades of local experience.</p>
      </div>
      <ul className="badge-grid">
        {badges.map((badge) => (
          <li className="badge-card" key={badge.file}>
            <Image
              src={`/assets/badges/${badge.file}.webp`}
              alt={badge.alt}
              width={320}
              height={320}
              sizes="(min-width: 1024px) 180px, (min-width: 560px) 30vw, 45vw"
              unoptimized
            />
          </li>
        ))}
      </ul>
    </section>
  );
}
