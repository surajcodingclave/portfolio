require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { connectToDatabase } = require('../lib/mongoose');

(async () => {
  await connectToDatabase();
  const AdminSchema = new mongoose.Schema({
    email: { type: String, unique: true },
    passwordHash: String,
  });
  const Admin = mongoose.models.Admin || mongoose.model('Admin', AdminSchema);

  const email = 'admin@demo.com';
  const plain = 'Password123!';
  const hash = await bcrypt.hash(plain, 10);
  const existing = await Admin.findOne({ email });
  if (existing) {
    console.log('Admin already exists');
    process.exit(0);
  }
  await Admin.create({ email, passwordHash: hash });
  console.log(`✅ Admin created → ${email} / ${plain}`);
  process.exit(0);
})();
