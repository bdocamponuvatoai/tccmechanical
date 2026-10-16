import type { MetadataRoute } from 'next';
import { site, services } from '@/content/site';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const paths = ['/', '/services/', '/about/', '/process/', '/contact/', ...services.map((s) => `/services/${s.slug}/`)];
  return paths.map((path) => ({ url: site.url + path, lastModified }));
}
