import { connectToDatabase } from '../../lib/mongoose';
import Service from '../../models/Service';
import { initialServices } from '../../lib/dummyData';

export default async function handler(req, res) {
  try {
    await connectToDatabase();

    if (req.method === 'GET') {
      let services = await Service.find({}).sort('createdAt');
      if (!services || services.length === 0) {
        services = await Service.insertMany(initialServices.map(({ _id, ...s }) => s));
      }
      return res.status(200).json(services);
    }

    if (req.method === 'POST') {
      const service = await Service.create(req.body);
      return res.status(201).json(service);
    }

    if (req.method === 'DELETE') {
      const { id } = req.query;
      await Service.findByIdAndDelete(id);
      return res.status(204).end();
    }
  } catch (err) {
    console.error('MongoDB error, using fallback services:', err.message);
    if (req.method === 'GET') {
      return res.status(200).json(initialServices);
    }
  }

  res.status(405).end();
}
