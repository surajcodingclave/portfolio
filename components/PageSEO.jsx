import Head from 'next/head';
import { useSite } from '../lib/siteContext';
import { publicRoutes, publicUrl } from '../lib/publicRoutes';

export default function PageSEO({ page, origin }) {
  const { siteInfo, content } = useSite();
  const section = content[page];
  const name = siteInfo?.name || 'Suraj Gupta';
  const title = section.metaTitle || (page === 'home'
    ? [name, siteInfo?.tagline || 'Full-Stack Web Developer'].join(' | ')
    : [section.title, name].join(' | '));
  const description = section.metaDescription;
  const canonical = origin ? new URL(publicRoutes[page], origin).href : '';
  const image = publicUrl(section.shareImage || section.imageUrl || content.seo.shareImage || siteInfo?.avatarUrl, origin);
  const favicon = publicUrl(content.seo.favicon, origin) || (content.seo.favicon?.startsWith('/api/media/') ? content.seo.favicon : '/favicon.svg');

  const person = {
    '@type': 'Person',
    name,
    jobTitle: siteInfo?.tagline,
    image: publicUrl(siteInfo?.avatarUrl, origin) || undefined,
    url: canonical || undefined,
    sameAs: Object.values(siteInfo?.socialLinks || {}).map((url) => publicUrl(url)).filter(Boolean),
    knowsAbout: siteInfo?.skills?.length ? siteInfo.skills : undefined,
    address: siteInfo?.location ? {
      '@type': 'PostalAddress',
      addressLocality: siteInfo.location.split(',')[0]?.trim(),
      addressRegion: siteInfo.location.split(',')[1]?.trim(),
      addressCountry: siteInfo.location.split(',').slice(-1)[0]?.trim(),
    } : undefined,
  };
  const data = page === 'home'
    ? { '@context': 'https://schema.org', '@type': 'ProfilePage', name: title, mainEntity: person }
    : { '@context': 'https://schema.org', '@type': 'WebPage', name: title, description };
  if (canonical) data.url = canonical;

  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="icon" href={favicon} />
      {canonical && <link rel="canonical" href={canonical} />}
      <meta property="og:type" content={page === 'home' ? 'profile' : 'website'} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:site_name" content={name} />
      {canonical && <meta property="og:url" content={canonical} />}
      {image && <meta property="og:image" content={image} />}
      <meta name="twitter:card" content={image ? 'summary_large_image' : 'summary'} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      {image && <meta name="twitter:image" content={image} />}
      <script type="application/ld+json" dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, '\\u003c'),
      }} />
    </Head>
  );
}
