import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { connectToDatabase } from '../../../lib/mongoose';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

// Admin schema (simple) – stored in same DB
const AdminSchema = new mongoose.Schema({
  email: { type: String, unique: true },
  passwordHash: String,
});
const Admin = mongoose.models.Admin || mongoose.model('Admin', AdminSchema);

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        await connectToDatabase();
        const admin = await Admin.findOne({ email: credentials.email });
        if (!admin) return null;
        const ok = await bcrypt.compare(credentials.password, admin.passwordHash);
        if (!ok) return null;
        return { id: admin._id, email: admin.email };
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: { strategy: 'jwt' },
};

export default NextAuth(authOptions);
