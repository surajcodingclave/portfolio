import { randomBytes } from 'crypto';
import { mkdir, readFile, rename, writeFile } from 'fs/promises';
import path from 'path';
import { initialSiteInfo, initialProjects, initialServices, initialExperiences } from './dummyData';

const dataDirectory = path.join(process.cwd(), '.data');
const dataFile = path.join(dataDirectory, 'portfolio.json');
let pendingWrite = Promise.resolve();

const copy = (value) => JSON.parse(JSON.stringify(value));

async function readStore() {
  try {
    const parsed = JSON.parse(await readFile(dataFile, 'utf8'));
    return {
      siteInfo: parsed.siteInfo || copy(initialSiteInfo),
      projects: Array.isArray(parsed.projects) ? parsed.projects : copy(initialProjects),
      services: Array.isArray(parsed.services) ? parsed.services : copy(initialServices),
      experience: Array.isArray(parsed.experience) ? parsed.experience : copy(initialExperiences),
      media: parsed.media && typeof parsed.media === 'object' ? parsed.media : {},
    };
  } catch (error) {
    if (error.code !== 'ENOENT') throw error;
    return {
      siteInfo: copy(initialSiteInfo),
      projects: copy(initialProjects),
      services: copy(initialServices),
      experience: copy(initialExperiences),
      media: {},
    };
  }
}

async function updateStore(change) {
  const operation = pendingWrite.then(async () => {
    const store = await readStore();
    const result = change(store);
    await mkdir(dataDirectory, { recursive: true });
    const temporaryFile = dataFile + '.' + process.pid + '.tmp';
    await writeFile(temporaryFile, JSON.stringify(store), 'utf8');
    await rename(temporaryFile, dataFile);
    return copy(result);
  });
  pendingWrite = operation.catch(() => {});
  return operation;
}

export async function readLocalSiteInfo() {
  return (await readStore()).siteInfo;
}

export function writeLocalSiteInfo(changes) {
  return updateStore((store) => {
    store.siteInfo = { ...store.siteInfo, ...changes };
    return store.siteInfo;
  });
}

export async function readLocalCollection(key, limit = 0) {
  const entries = (await readStore())[key];
  return limit ? entries.slice(0, limit) : entries;
}

export function createLocalEntry(key, values) {
  return updateStore((store) => {
    const entry = { _id: randomBytes(12).toString('hex'), ...values, createdAt: new Date().toISOString() };
    store[key].push(entry);
    return entry;
  });
}

export function updateLocalEntry(key, id, values) {
  return updateStore((store) => {
    const index = store[key].findIndex((entry) => entry._id === id);
    if (index < 0) return null;
    store[key][index] = { ...store[key][index], ...values };
    return store[key][index];
  });
}

export function deleteLocalEntry(key, id) {
  return updateStore((store) => {
    const index = store[key].findIndex((entry) => entry._id === id);
    if (index < 0) return false;
    store[key].splice(index, 1);
    return true;
  });
}

export function writeLocalMedia(bytes, contentType) {
  return updateStore((store) => {
    const id = randomBytes(12).toString('hex');
    store.media[id] = { contentType, bytes: bytes.toString('base64') };
    return { id };
  });
}

export async function readLocalMedia(id) {
  const media = (await readStore()).media[id];
  return media ? { contentType: media.contentType, bytes: Buffer.from(media.bytes, 'base64') } : null;
}
