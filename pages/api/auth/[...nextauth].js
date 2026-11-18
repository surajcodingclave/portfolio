import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { connectToDatabase } from '../../../lib/mongoose';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import { timingSafeEqual } from 'crypto';

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
        const email = String(credentials.email || '').trim().toLowerCase();
        const password = String(credentials.password || '');
        if (!email || !password) return null;

        try {
          await connectToDatabase();
        } catch (error) {
          if (process.env.NODE_ENV !== 'development') throw error;

          const localEmail = String(process.env.ADMIN_EMAIL || '').trim().toLowerCase();
          const localPassword = Buffer.from(process.env.ADMIN_PASSWORD || '');
          const providedPassword = Buffer.from(password);
          const passwordMatches = localPassword.length === providedPassword.length &&
            timingSafeEqual(localPassword, providedPassword);
          return email === localEmail && localEmail && passwordMatches
            ? { id: 'local-admin', email: localEmail }
            : null;
        }

        const admin = await Admin.findOne({ email });
        if (!admin) return null;
        const ok = await bcrypt.compare(password, admin.passwordHash);
        if (!ok) return null;
        return { id: admin._id, email: admin.email };
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: { strategy: 'jwt' },
};

export default NextAuth(authOptions);
