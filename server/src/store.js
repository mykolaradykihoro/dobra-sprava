import { readFile, writeFile, mkdir, rename } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const currentDir = path.dirname(fileURLToPath(import.meta.url));
const dataDir = path.resolve(currentDir, '../data');
const campaignsFile = path.join(dataDir, 'campaigns.json');
const messagesFile = path.join(dataDir, 'messages.json');

async function readJson(file, fallback) {
  await mkdir(dataDir, { recursive: true });
  try { return JSON.parse(await readFile(file, 'utf8')); }
  catch (error) {
    if (error.code !== 'ENOENT') throw error;
    return fallback;
  }
}

async function writeJson(file, data) {
  await mkdir(dataDir, { recursive: true });
  const temporary = `${file}.tmp`;
  await writeFile(temporary, `${JSON.stringify(data, null, 2)}\n`, 'utf8');
  await rename(temporary, file);
}

export const readCampaigns = () => readJson(campaignsFile, []);
export const writeCampaigns = (data) => writeJson(campaignsFile, data);
export const readMessages = () => readJson(messagesFile, []);
export const writeMessages = (data) => writeJson(messagesFile, data);
