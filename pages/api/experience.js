import { connectToDatabase } from '../../lib/mongoose';
import { requireAdmin } from '../../lib/requireAdmin';
import Experience from '../../models/Experience';
import { initialExperiences } from '../../lib/dummyData';

export default async function handler(req, res) {
  if (!['GET', 'POST', 'PUT', 'DELETE'].includes(req.method)) {
    res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
  if (req.method !== 'GET' && !(await requireAdmin(req, res))) return;

  try {
    await connectToDatabase();

    if (req.method === 'GET') {
      let experiences = await Experience.find({}).sort('-createdAt');
      if (!experiences || experiences.length === 0) {
        experiences = await Experience.insertMany(initialExperiences.map(({ _id, ...e }) => e));
      }
      return res.status(200).json(experiences);
    }

    if (req.method === 'POST') {
      const exp = await Experience.create(req.body);
      return res.status(201).json(exp);
    }

    if (req.method === 'PUT') {
      const { _id, ...updates } = req.body;
      const exp = await Experience.findByIdAndUpdate(_id, updates, { new: true, runValidators: true });
      if (!exp) return res.status(404).json({ error: 'Experience not found' });
      return res.status(200).json(exp);
    }

    if (req.method === 'DELETE') {
      const { id } = req.query;
      await Experience.findByIdAndDelete(id);
      return res.status(204).end();
    }
  } catch (err) {
    console.error('MongoDB error, using fallback experience:', err.message);
    if (req.method === 'GET') return res.status(200).json(initialExperiences);
    return res.status(500).json({ error: 'Unable to save experience changes' });
  }
}
