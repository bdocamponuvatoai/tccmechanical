import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import Brand from './Brand';
import { mailto, site } from '@/content/site';

export default function Footer() {
  const { street, city, region, postalCode } = site.address;
  return (
    <footer className="site-footer">
      <div className="footer-main">
        <div>
          <Brand />
          <p>The simple choice for your<br />heating and cooling needs.</p>
        </div>
        <div>
          <span className="eyebrow">Explore</span>
          <Link href="/services/">Our services</Link>
          <Link href="/about/">Our story</Link>
          <Link href="/process/">How we work</Link>
          <Link href="/contact/">Request service</Link>
        </div>
        <div>
          <span className="eyebrow">Let’s connect</span>
          <a href={site.phoneHref}>
            {site.phone} <ArrowUpRight size={16} aria-hidden="true" />
          </a>
          <a href={mailto}>{site.email}</a>
          <address>
            {street}<br />
            {city}, {region} {postalCode}
          </address>
          <span>24/7 emergency service</span>
        </div>
      </div>
      <div className="footer-word" aria-hidden="true">Comfort, complete.</div>
      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} {site.legalName}</span>
        <div>
          <Link href="/privacy/">Privacy</Link>
          <Link href="/terms/">Terms</Link>
          <a href="#main">Back to top ↑</a>
        </div>
      </div>
    </footer>
  );
}
