'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef } from 'react';
import { ArrowUpRight, Phone, X, Menu } from 'lucide-react';
import Brand from './Brand';
import { nav, site } from '@/content/site';

const mobileNav = [{ href: '/', label: 'Home' }, ...nav, { href: '/contact/', label: 'Request service' }];

export default function Header() {
  const dialog = useRef<HTMLDialogElement>(null);
  const pathname = usePathname();

  const open = () => {
    dialog.current?.showModal();
    document.documentElement.classList.add('menu-open');
  };
  const close = () => dialog.current?.close();
  const trim = (path: string) => path.replace(/(.)\/$/, '$1');
  const isCurrent = (href: string) => (trim(href) === trim(pathname) ? 'page' : undefined);

  // Never leave the page scroll-locked if the component unmounts with the menu open.
  useEffect(() => () => document.documentElement.classList.remove('menu-open'), []);

  return (
    <>
      <div className="topbar">
        <span>Chicago &amp; Chicagoland</span>
        <span>24/7 emergency service</span>
        <a href={site.phoneHref}>
          Let’s talk comfort <span aria-hidden="true">↗</span>
        </a>
      </div>
      <header className="site-header">
        <Link href="/" aria-label="Tabor’s Complete Comfort Mechanical — home">
          <Brand />
        </Link>
        <nav aria-label="Main navigation">
          {nav.map(({ href, label }) => (
            <Link key={href} href={href} aria-current={isCurrent(href)}>
              {label}
            </Link>
          ))}
        </nav>
        <a className="header-phone" href={site.phoneHref}>
          <Phone size={16} aria-hidden="true" />
          {site.phone}
        </a>
        <Link className="button small header-cta" href="/contact/">
          Request service <ArrowUpRight size={16} aria-hidden="true" />
        </Link>
        <button className="menu-button" type="button" aria-label="Open menu" aria-haspopup="dialog" onClick={open}>
          <Menu aria-hidden="true" />
        </button>
      </header>
      <dialog ref={dialog} className="menu-dialog" aria-label="Menu" onClose={() => document.documentElement.classList.remove('menu-open')}>
        <div className="dialog-top">
          <Brand />
          <button type="button" onClick={close} aria-label="Close menu">
            <X aria-hidden="true" />
          </button>
        </div>
        <nav aria-label="Mobile navigation">
          {mobileNav.map(({ href, label }) => (
            <Link key={href} href={href} onClick={close} aria-current={isCurrent(href)}>
              {label}
              <ArrowUpRight aria-hidden="true" />
            </Link>
          ))}
        </nav>
        <a className="dialog-phone" href={site.phoneHref}>
          <Phone size={22} aria-hidden="true" />
          {site.phone}
        </a>
        <p className="dialog-note">24/7 emergency service across Chicago &amp; Chicagoland.</p>
      </dialog>
      <noscript>
        <nav className="fallback-nav" aria-label="Main navigation">
          {nav.map(({ href, label }) => (
            <a key={href} href={href}>{label}</a>
          ))}
          <a href="/contact/">Request service</a>
        </nav>
      </noscript>
    </>
  );
}
