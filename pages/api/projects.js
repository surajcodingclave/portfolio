import { connectToDatabase } from '../../lib/mongoose';
import Project from '../../models/Project';
import { initialProjects } from '../../lib/dummyData';

export default async function handler(req, res) {
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
      const proj = await Project.findByIdAndUpdate(_id, updates, { new: true });
      return res.status(200).json(proj);
    }

    if (req.method === 'DELETE') {
      const { id } = req.query;
      await Project.findByIdAndDelete(id);
      return res.status(204).end();
    }
  } catch (err) {
    console.error('MongoDB error, using fallback projects:', err.message);
    if (req.method === 'GET') {
      return res.status(200).json(initialProjects);
    }
  }

  res.status(405).end();
}
