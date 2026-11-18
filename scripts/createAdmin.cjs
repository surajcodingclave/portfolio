require('dotenv').config({ path: '.env.local' });
require('dotenv').config();

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const MONGODB_URI = process.env.MONGODB_URI;
const email = process.env.ADMIN_EMAIL?.trim().toLowerCase();
const password = process.env.ADMIN_PASSWORD;

const AdminSchema = new mongoose.Schema({
  email: { type: String, unique: true, lowercase: true, trim: true },
  passwordHash: { type: String, required: true },
});
const Admin = mongoose.models.Admin || mongoose.model('Admin', AdminSchema);

async function main() {
  if (!MONGODB_URI) throw new Error('Set MONGODB_URI in .env.local before creating an admin account.');
  if (!email || !password) throw new Error('Set ADMIN_EMAIL and ADMIN_PASSWORD in .env.local before creating an admin account.');
  if (password.length < 12) throw new Error('ADMIN_PASSWORD must be at least 12 characters long.');

  await mongoose.connect(MONGODB_URI, { serverSelectionTimeoutMS: 5000 });
  const existing = await Admin.findOne({ email });
  if (existing) {
    console.log('Admin account already exists for ' + email + '. No changes were made.');
    return;
  }

  await Admin.create({ email, passwordHash: await bcrypt.hash(password, 12) });
  console.log('Admin account created for ' + email + '.');
}

main()
  .catch((error) => {
    console.error(error.message);
    process.exitCode = 1;
  })
  .finally(() => mongoose.disconnect());
