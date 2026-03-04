import { PeopleByDay } from '../types/PeopleByDay.tsx';
import { Person } from '../types/Person.tsx';

const CHUNK_SIZE = 1000;
const chunkCache: Map<number, PeopleByDay> = new Map();

async function fetchChunk(bucket: number): Promise<PeopleByDay | null> {
  if (chunkCache.has(bucket)) {
    return chunkCache.get(bucket)!;
  }

  try {
    const response = await fetch(`/data/chunks/${bucket}.json`);
    if (!response.ok) return null;
    const data = await response.json();
    chunkCache.set(bucket, data);
    return data;
  } catch {
    return null;
  }
}

function getChunkBucket(daysOld: number): number {
  return Math.floor(daysOld / CHUNK_SIZE) * CHUNK_SIZE;
}

async function getAllCelebs(daysOld: number | null): Promise<Person[] | null> {
  if (!daysOld) return null;

  let searchDay = daysOld - 1; // Always start with someone who died at least one day younger
  let currentBucket = getChunkBucket(searchDay);
  let chunk = await fetchChunk(currentBucket);

  while (searchDay > 0) {
    // If we've crossed into a new bucket, fetch it
    const newBucket = getChunkBucket(searchDay);
    if (newBucket !== currentBucket) {
      currentBucket = newBucket;
      chunk = await fetchChunk(currentBucket);
    }

    // No more data available
    if (!chunk) return null;

    // Check if we have celebs for this day
    if (searchDay.toString() in chunk) {
      return chunk[searchDay.toString()].map((celeb) => ({
        ...celeb,
        o: searchDay
      }));
    }

    searchDay -= 1;
  }

  return null;
}

export default getAllCelebs;
