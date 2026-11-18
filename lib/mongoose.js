import mongoose from 'mongoose';

const cache = global.mongoose ||= { promise: null, retryAfter: 0 };

export async function connectToDatabase() {
  if (!process.env.MONGODB_URI) throw new Error('MONGODB_URI is required');
  if (!cache.promise && cache.retryAfter > Date.now()) {
    throw new Error('Database retry is temporarily paused after a connection failure.');
  }
  cache.promise ||= mongoose.connect(process.env.MONGODB_URI, {
    serverSelectionTimeoutMS: 1500,
  }).catch((error) => {
    cache.promise = null;
    cache.retryAfter = Date.now() + 120000;
    throw error;
  });
  return cache.promise;
}
