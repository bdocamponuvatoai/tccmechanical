import Link from 'next/link';
import { Phone, CalendarCheck } from 'lucide-react';
import { site } from '@/content/site';

// Thumb-reachable actions on small screens. Hidden from 768px up via CSS.
export default function MobileCta() {
  return (
    <nav className="mobile-cta" aria-label="Quick contact">
      <a href={site.phoneHref}>
        <Phone size={18} aria-hidden="true" />
        Call now
      </a>
      <Link href="/contact/">
        <CalendarCheck size={18} aria-hidden="true" />
        Request service
      </Link>
    </nav>
  );
}
