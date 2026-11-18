import { connectToDatabase } from '../../../lib/mongoose';
import Media from '../../../models/Media';
import { readLocalMedia } from '../../../lib/localStore';

export default async function handler(req, res) {
  if (!['GET', 'HEAD'].includes(req.method)) {
    res.setHeader('Allow', 'GET, HEAD');
    return res.status(405).end();
  }
  if (!/^[a-f0-9]{24}$/i.test(req.query.id)) return res.status(404).end();

  try {
    await connectToDatabase();
    const media = await Media.findById(req.query.id);
    if (!media) return res.status(404).end();
    res.setHeader('Content-Type', media.contentType);
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('Content-Length', media.bytes.length);
    res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
    return res.end(req.method === 'HEAD' ? undefined : media.bytes);
  } catch {
    if (process.env.NODE_ENV === 'development') {
      const media = await readLocalMedia(req.query.id);
      if (!media) return res.status(404).end();
      res.setHeader('Content-Type', media.contentType);
      res.setHeader('X-Content-Type-Options', 'nosniff');
      res.setHeader('Content-Length', media.bytes.length);
      res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
      return res.end(req.method === 'HEAD' ? undefined : media.bytes);
    }
    return res.status(503).end();
  }
}
