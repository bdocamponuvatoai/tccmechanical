'use client';
import { useState, type FormEvent } from 'react';
import { ArrowUpRight, Phone, Mail } from 'lucide-react';
import { mailto, site } from '@/content/site';

const serviceOptions = ['Heating', 'Cooling', 'Indoor air quality', 'Water heater', 'Maintenance', 'Emergency service', 'Not sure yet'];

// Builds an email draft in the visitor's mail app. Nothing is sent or stored by this website,
// so the UI must never claim a request was submitted.
export default function Inquiry() {
  const [ready, setReady] = useState(false);

  function prepareEmail(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const field = (name: string) => String(data.get(name) ?? '').trim();
    const body = [
      `Name: ${field('name')}`,
      `Email: ${field('email')}`,
      `Phone: ${field('phone')}`,
      `Service: ${field('service')}`,
      '',
      field('message'),
    ].join('\n');
    const subject = `Service request — ${field('service')}`;
    window.location.href = `${mailto}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setReady(true);
  }

  return (
    <section className="contact-section" id="request" aria-labelledby="request-title">
      <div className="contact-copy">
        <span className="eyebrow">LET’S MAKE HOME FEEL RIGHT</span>
        <h2 id="request-title">A little help.<br />A lot more comfort.</h2>
        <p>Tell us what you need. Alan’s team will help you take the next step.</p>
        <a className="contact-phone" href={site.phoneHref}>
          <Phone aria-hidden="true" />
          {site.phone}
        </a>
        <a className="contact-email" href={mailto}>
          <Mail size={18} aria-hidden="true" />
          {site.email}
        </a>
        <p className="fine">Heating or cooling emergency? We offer 24/7 emergency service. Call now.</p>
      </div>
      <form action={mailto} method="get" onSubmit={prepareEmail}>
        <h3>What can we help with?</h3>
        <div className="field-row">
          <label>
            Your name
            <input name="name" required autoComplete="name" placeholder="Full name" maxLength={100} />
          </label>
          <label>
            Phone number
            <input name="phone" required type="tel" inputMode="tel" autoComplete="tel" placeholder="(773) 000-0000" maxLength={30} />
          </label>
        </div>
        <label>
          Email address
          <input name="email" required type="email" autoComplete="email" placeholder="you@example.com" maxLength={200} />
        </label>
        <label>
          Service needed
          <select name="service" defaultValue="" required>
            <option value="" disabled>Select a service</option>
            {serviceOptions.map((option) => (
              <option key={option}>{option}</option>
            ))}
          </select>
        </label>
        <label>
          Tell us a little more
          <textarea name="message" required minLength={10} maxLength={3000} rows={4} placeholder="What’s happening with your system?" />
        </label>
        <button className="button" type="submit">
          Prepare service email <ArrowUpRight size={18} aria-hidden="true" />
        </button>
        <p className="form-note">
          Opens your email app with your request. You’ll review and send it there. An appointment is confirmed only when our team responds.
        </p>
        {ready && (
          <p className="form-status" role="status">
            Your email draft is ready to open. Nothing has been sent by this website. If your email app did not open, call {site.phone}.
          </p>
        )}
      </form>
    </section>
  );
}
