import { connectToDatabase } from './mongoose';
import { requireAdmin } from './requireAdmin';
import { collections, readCollection, refreshPages } from './publicData';
import { createLocalEntry, deleteLocalEntry, readLocalCollection, updateLocalEntry } from './localStore';

export function collectionHandler(key, fields, pages) {
  const { Model, fallback } = collections[key];
  return async function handler(req, res) {
    const { method } = req;
    const methods = ['GET', 'POST', 'PUT', 'DELETE'];
    if (!methods.includes(method)) {
      res.setHeader('Allow', methods);
      return res.status(405).end();
    }

    const editor = req.query.editor === '1';
    if ((method !== 'GET' || editor) && !(await requireAdmin(req, res))) return;

    try {
      await connectToDatabase();
      if (method === 'GET') return res.json(await readCollection(key));

      const body = req.body || {};
      const values = Object.fromEntries(fields.filter((field) => Object.hasOwn(body, field))
        .map((field) => [field, body[field]]));
      if (method === 'POST') {
        const item = await Model.create(values);
        await refreshPages(res, pages);
        return res.status(201).json(item);
      }
      if (method === 'PUT') {
        const item = await Model.findByIdAndUpdate(body._id, { $set: values }, { new: true, runValidators: true });
        if (!item) return res.status(404).json({ error: 'Entry not found' });
        await refreshPages(res, pages);
        return res.json(item);
      }
      const item = await Model.findByIdAndDelete(req.query.id);
      if (!item) return res.status(404).json({ error: 'Entry not found' });
      await refreshPages(res, pages);
      return res.status(204).end();
    } catch (error) {
      if (['ValidationError', 'CastError'].includes(error.name)) {
        return res.status(400).json({ error: error.message });
      }
      if (process.env.NODE_ENV === 'development') {
        if (method === 'GET') return res.json(await readLocalCollection(key));

        const body = req.body || {};
        const values = Object.fromEntries(fields.filter((field) => Object.hasOwn(body, field))
          .map((field) => [field, body[field]]));
        const requiredFields = {
          projects: ['title'],
          services: ['title'],
          experience: ['role', 'company'],
        }[key];
        if (method !== 'DELETE' && requiredFields.some((field) => !String(values[field] || '').trim())) {
          return res.status(400).json({ error: 'Complete the required fields before saving.' });
        }
        if (method === 'POST') return res.status(201).json(await createLocalEntry(key, values));
        if (method === 'PUT') {
          const entry = await updateLocalEntry(key, body._id, values);
          return entry ? res.json(entry) : res.status(404).json({ error: 'Entry not found' });
        }
        const deleted = await deleteLocalEntry(key, req.query.id);
        return deleted ? res.status(204).end() : res.status(404).json({ error: 'Entry not found' });
      }
      if (method === 'GET' && !editor) return res.json(fallback);
      return res.status(503).json({ error: 'Portfolio database is unavailable. Try again shortly.' });
    }
  };
}
