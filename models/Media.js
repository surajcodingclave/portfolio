import mongoose from 'mongoose';

const schema = new mongoose.Schema({
  contentType: { type: String, required: true },
  bytes: { type: Buffer, required: true },
});

export default mongoose.models.Media || mongoose.model('Media', schema);
