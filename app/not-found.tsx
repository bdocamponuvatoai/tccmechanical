import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

export default function NotFound() {
  return (
    <section className="page-intro not-found">
      <span className="eyebrow">404 / A LITTLE OFF COURSE</span>
      <h1>Let’s get you<br />back to comfortable.</h1>
      <p>We couldn’t find that page.</p>
      <Link className="button" href="/">
        Back home <ArrowUpRight size={18} aria-hidden="true" />
      </Link>
    </section>
  );
}
