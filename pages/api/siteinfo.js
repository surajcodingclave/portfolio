import { connectToDatabase } from '../../lib/mongoose';
import { requireAdmin } from '../../lib/requireAdmin';
import SiteInfo from '../../models/SiteInfo';
import { initialSiteInfo } from '../../lib/dummyData';

export default async function handler(req, res) {
  if (req.method !== 'GET' && req.method !== 'PUT') {
    res.setHeader('Allow', ['GET', 'PUT']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  if (req.method === 'PUT' && !(await requireAdmin(req, res))) return;

  try {
    await connectToDatabase();

    if (req.method === 'GET') {
      let info = await SiteInfo.findOne({});
      if (!info) {
        info = await SiteInfo.create(initialSiteInfo);
      }
      return res.status(200).json(info);
    }

    if (req.method === 'PUT') {
      const data = req.body;
      const updated = await SiteInfo.findOneAndUpdate({}, data, {
        new: true,
        upsert: true,
        runValidators: true,
        setDefaultsOnInsert: true,
      });
      return res.status(200).json(updated);
    }
  } catch (err) {
    // If DB is offline or throws error, gracefully serve the fallback dummy data
    console.error('MongoDB connection error, falling back to dummy siteinfo:', err.message);
    if (req.method === 'GET') return res.status(200).json(initialSiteInfo);
    return res.status(500).json({ error: 'Unable to save site content' });
  }
}
