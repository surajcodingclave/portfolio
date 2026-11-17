import { connectToDatabase } from '../../lib/mongoose';
import SiteInfo from '../../models/SiteInfo';
import { initialSiteInfo } from '../../lib/dummyData';

export default async function handler(req, res) {
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
      const updated = await SiteInfo.findOneAndUpdate({}, data, { new: true, upsert: true });
      return res.status(200).json(updated);
    }
  } catch (err) {
    // If DB is offline or throws error, gracefully serve the fallback dummy data
    console.error('MongoDB connection error, falling back to dummy siteinfo:', err.message);
    if (req.method === 'GET') {
      return res.status(200).json(initialSiteInfo);
    }
  }

  res.setHeader('Allow', ['GET', 'PUT']);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}
