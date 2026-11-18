import { connectToDatabase } from '../../lib/mongoose';
import { requireAdmin } from '../../lib/requireAdmin';
import { readSiteInfo, refreshPages } from '../../lib/publicData';
import SiteInfo from '../../models/SiteInfo';
import { initialSiteInfo } from '../../lib/dummyData';
import { readLocalSiteInfo, writeLocalSiteInfo } from '../../lib/localStore';

const fields = [
  'name', 'tagline', 'bio', 'avatarUrl', 'contactEmail', 'phone', 'location',
  'socialLinks', 'siteContent', 'skillCategories', 'skills',
];

export default async function handler(req, res) {
  if (!['GET', 'PUT'].includes(req.method)) {
    res.setHeader('Allow', ['GET', 'PUT']);
    return res.status(405).end();
  }

  const editor = req.query.editor === '1';
  if ((req.method === 'PUT' || editor) && !(await requireAdmin(req, res))) return;

  try {
    await connectToDatabase();
    if (req.method === 'GET') return res.json(await readSiteInfo());

    const body = req.body || {};
    const changes = Object.fromEntries(fields.filter((key) => Object.hasOwn(body, key))
      .map((key) => [key, body[key]]));
    const existing = await SiteInfo.findOne().select('_id').lean();
    const updated = await SiteInfo.findOneAndUpdate(
      { _id: existing?._id || '000000000000000000000001' },
      { $set: changes },
      { new: true, upsert: true, runValidators: true }
    );
    await refreshPages(res);
    return res.json(updated);
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      if (req.method === 'GET') return res.json(await readLocalSiteInfo());
      const body = req.body || {};
      const changes = Object.fromEntries(fields.filter((key) => Object.hasOwn(body, key))
        .map((key) => [key, body[key]]));
      if (!String(changes.name || '').trim()) {
        return res.status(400).json({ error: 'A profile name is required.' });
      }
      const updated = await writeLocalSiteInfo(changes);
      await refreshPages(res);
      return res.json(updated);
    }
    if (req.method === 'GET' && !editor) return res.json(initialSiteInfo);
    if (['ValidationError', 'CastError'].includes(error.name)) {
      return res.status(400).json({ error: error.message });
    }
    return res.status(503).json({ error: 'Portfolio database is unavailable. Try again shortly.' });
  }
}
