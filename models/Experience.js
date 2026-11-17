import mongoose from 'mongoose';

const ExperienceSchema = new mongoose.Schema({
  role: { type: String, required: true },
  company: { type: String, required: true },
  location: String,
  period: String, // e.g. "2023 - Present"
  description: String,
  technologies: [String],
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Experience || mongoose.model('Experience', ExperienceSchema);
