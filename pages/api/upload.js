import multer from 'multer';
import { allowLocalFallback, connectToDatabase } from '../../lib/mongoose';
import { requireAdmin } from '../../lib/requireAdmin';
import Media from '../../models/Media';
import { writeLocalMedia } from '../../lib/localStore';

const upload = multer({ limits: { fileSize: 4 * 1024 * 1024, files: 1, fields: 0 } }).single('file');

function imageType(bytes) {
  if (!bytes) return '';
  if (bytes.subarray(0, 3).equals(Buffer.from([255, 216, 255]))) return 'image/jpeg';
  if (bytes.subarray(0, 8).equals(Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]))) return 'image/png';
  if (bytes.toString('ascii', 0, 4) === 'RIFF' && bytes.toString('ascii', 8, 12) === 'WEBP') return 'image/webp';
  return '';
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).end();
  }

  if (!(await requireAdmin(req, res))) return;

  try {
    await new Promise((resolve, reject) => upload(req, res, (error) => error ? reject(error) : resolve()));
  } catch {
    return res.status(400).json({ error: 'Choose a JPEG, PNG, or WebP image up to 4 MB.' });
  }

  const bytes = req.file?.buffer;
  const contentType = imageType(bytes);
  if (!contentType) return res.status(400).json({ error: 'Choose a JPEG, PNG, or WebP image.' });

  try {
    await connectToDatabase();
    const media = await Media.create({ bytes, contentType });
    return res.status(201).json({ url: '/api/media/' + media.id });
  } catch {
    if (allowLocalFallback()) {
      const media = await writeLocalMedia(bytes, contentType);
      return res.status(201).json({ url: '/api/media/' + media.id });
    }
    return res.status(503).json({ error: 'Unable to store this image. Try again shortly.' });
  }
}

export const config = { api: { bodyParser: false } };
