import mongoose from 'mongoose';

const ServiceSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  icon: String, // icon name or emoji
  features: [String],
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Service || mongoose.model('Service', ServiceSchema);
