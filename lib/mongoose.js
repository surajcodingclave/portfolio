import mongoose from 'mongoose';

const cache = global.mongoose ||= { promise: null, retryAfter: 0 };

export function allowLocalFallback() {
  return process.env.PORTFOLIO_STORAGE === 'local' ||
    (!process.env.PORTFOLIO_STORAGE && process.env.NODE_ENV === 'development');
}

export async function connectToDatabase() {
  if (process.env.PORTFOLIO_STORAGE === 'local') throw new Error('Local portfolio storage is enabled');
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
