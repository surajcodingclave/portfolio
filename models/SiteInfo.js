import mongoose from 'mongoose';

const SiteInfoSchema = new mongoose.Schema({
  name: { type: String, required: true },
  tagline: String,
  bio: String,
  avatarUrl: String,
  contactEmail: String,
  phone: String,
  location: String,
  socialLinks: { type: mongoose.Schema.Types.Mixed, default: {} },
  siteContent: { type: mongoose.Schema.Types.Mixed, default: {} },
  skillCategories: { type: [mongoose.Schema.Types.Mixed], default: [] },
  skills: [String],
});

export default mongoose.models.SiteInfo || mongoose.model('SiteInfo', SiteInfoSchema);
