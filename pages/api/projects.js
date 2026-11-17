import { connectToDatabase } from '../../lib/mongoose';
import { requireAdmin } from '../../lib/requireAdmin';
import Project from '../../models/Project';
import { initialProjects } from '../../lib/dummyData';

export default async function handler(req, res) {
  if (!['GET', 'POST', 'PUT', 'DELETE'].includes(req.method)) {
    res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
  if (req.method !== 'GET' && !(await requireAdmin(req, res))) return;

  try {
    await connectToDatabase();

    if (req.method === 'GET') {
      let projects = await Project.find({}).sort('-createdAt');
      if (!projects || projects.length === 0) {
        projects = await Project.insertMany(initialProjects.map(({ _id, ...p }) => p));
      }
      return res.status(200).json(projects);
    }

    if (req.method === 'POST') {
      const proj = await Project.create(req.body);
      return res.status(201).json(proj);
    }

    if (req.method === 'PUT') {
      const { _id, ...updates } = req.body;
      const proj = await Project.findByIdAndUpdate(_id, updates, { new: true, runValidators: true });
      if (!proj) return res.status(404).json({ error: 'Project not found' });
      return res.status(200).json(proj);
    }

    if (req.method === 'DELETE') {
      const { id } = req.query;
      await Project.findByIdAndDelete(id);
      return res.status(204).end();
    }
  } catch (err) {
    console.error('MongoDB error, using fallback projects:', err.message);
    if (req.method === 'GET') return res.status(200).json(initialProjects);
    return res.status(500).json({ error: 'Unable to save project changes' });
  }
}
