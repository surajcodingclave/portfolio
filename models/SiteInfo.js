import mongoose from 'mongoose';

const SiteInfoSchema = new mongoose.Schema({
  name: { type: String, required: true },
  tagline: String,
  bio: String,
  avatarUrl: String,
  contactEmail: String,
  skills: [String],
  // add any other fields you want editable via admin
});

export default mongoose.models.SiteInfo || mongoose.model('SiteInfo', SiteInfoSchema);
