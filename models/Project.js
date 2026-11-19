import mongoose from 'mongoose';

const ProjectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  techStack: [String],
  imageUrl: String,
  imageAlt: String,
  projectType: String,
  isSample: { type: Boolean, default: false },
  demoUrl: String,
  repoUrl: String,
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Project || mongoose.model('Project', ProjectSchema);
