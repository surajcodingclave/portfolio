import { connectToDatabase } from '../../lib/mongoose';
import Experience from '../../models/Experience';
import { initialExperiences } from '../../lib/dummyData';

export default async function handler(req, res) {
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

    if (req.method === 'DELETE') {
      const { id } = req.query;
      await Experience.findByIdAndDelete(id);
      return res.status(204).end();
    }
  } catch (err) {
    console.error('MongoDB error, using fallback experience:', err.message);
    if (req.method === 'GET') {
      return res.status(200).json(initialExperiences);
    }
  }

  res.status(405).end();
}
