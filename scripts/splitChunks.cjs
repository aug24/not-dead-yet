const fs = require('fs');
const path = require('path');

const CHUNK_SIZE = 1000;
const INPUT_FILE = path.join(__dirname, '../src/data/peopleByDay.json');
const OUTPUT_DIR = path.join(__dirname, '../public/data/chunks');

// Load the data
const data = require(INPUT_FILE);

// Create output directory
fs.mkdirSync(OUTPUT_DIR, { recursive: true });

// Group by chunk
const chunks = {};
Object.keys(data).forEach(dayKey => {
  const day = parseInt(dayKey);
  const bucket = Math.floor(day / CHUNK_SIZE) * CHUNK_SIZE;
  if (!chunks[bucket]) chunks[bucket] = {};
  chunks[bucket][dayKey] = data[dayKey];
});

// Write each chunk
Object.entries(chunks).forEach(([bucket, chunkData]) => {
  const filename = path.join(OUTPUT_DIR, `${bucket}.json`);
  fs.writeFileSync(filename, JSON.stringify(chunkData));
  const size = (JSON.stringify(chunkData).length / 1024).toFixed(1);
  console.log(`Written ${filename} (${size}KB)`);
});

// Write manifest with available chunks
const manifest = {
  chunkSize: CHUNK_SIZE,
  chunks: Object.keys(chunks).map(Number).sort((a, b) => a - b)
};
fs.writeFileSync(path.join(OUTPUT_DIR, 'manifest.json'), JSON.stringify(manifest));
console.log(`\nWritten manifest.json with ${manifest.chunks.length} chunks`);
console.log(`Chunk range: ${manifest.chunks[0]} - ${manifest.chunks[manifest.chunks.length - 1]}`);
