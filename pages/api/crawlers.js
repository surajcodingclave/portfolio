import { connectToDatabase } from '../../lib/mongoose';
import { readSiteInfo } from '../../lib/publicData';
import { publicRoutes, siteOrigin } from '../../lib/publicRoutes';
import { readLocalSiteInfo } from '../../lib/localStore';

export default async function handler(req, res) {
  let origin = siteOrigin();
  try {
    await connectToDatabase();
    const info = await readSiteInfo();
    origin = siteOrigin(info.siteContent?.seo?.siteUrl || undefined);
  } catch {
    if (process.env.NODE_ENV === 'development') {
      const info = await readLocalSiteInfo();
      origin = siteOrigin(info.siteContent?.seo?.siteUrl || undefined);
    }
  }
  res.setHeader('Cache-Control', 'public, s-maxage=60, stale-while-revalidate=60');
  if (req.query.file === 'robots') {
    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    return res.send('User-agent: *\nAllow: /\nDisallow: /admin/\nDisallow: /api/\n' + (origin ? 'Sitemap: ' + origin + '/sitemap.xml\n' : ''));
  }
  if (!origin) return res.status(404).end('Configure the public site URL to enable the sitemap.');
  res.setHeader('Content-Type', 'application/xml; charset=utf-8');
  return res.send('<?xml version="1.0" encoding="UTF-8"?>\n' +
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">' +
    Object.values(publicRoutes).map((path) => '<url><loc>' + origin + path + '</loc></url>').join('') +
    '</urlset>');
}
