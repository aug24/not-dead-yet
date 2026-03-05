#!/bin/bash -e

# Build and deploy to S3

cd "$(dirname "$0")/.."

# Build
node scripts/prepare_data.js
node scripts/splitChunks.cjs
npm run build

# Remove hashes from filenames for cache-friendly URLs
sed -i '' 's|"/assets/index.*.css"|"assets/index.css"|g' dist/index.html
sed -i '' 's|"/assets/index.*.js"|"assets/index.js"|g' dist/index.html
mv dist/assets/index-*css dist/assets/index.css
mv dist/assets/index-*js dist/assets/index.js

# Sync to S3 with cache headers
echo "Deploying to S3..."

# HTML - no cache
aws --profile aug24 s3 sync dist/ s3://www.notdeadyet.uk/ \
  --exclude "*" --include "*.html" \
  --cache-control "no-cache, no-store, must-revalidate"

# JS/CSS - 1 year
aws --profile aug24 s3 sync dist/ s3://www.notdeadyet.uk/ \
  --exclude "*" --include "*.js" --include "*.css" \
  --cache-control "public, max-age=31536000, immutable"

# Data files (JSON) - 60 days
aws --profile aug24 s3 sync dist/ s3://www.notdeadyet.uk/ \
  --exclude "*" --include "*.json" \
  --cache-control "public, max-age=5184000"

# Images - 1 year
aws --profile aug24 s3 sync dist/ s3://www.notdeadyet.uk/ \
  --exclude "*" --include "*.png" --include "*.ico" --include "*.jpg" --include "*.svg" \
  --cache-control "public, max-age=31536000, immutable"

# Everything else (catch-all, no delete until end)
aws --profile aug24 s3 sync dist/ s3://www.notdeadyet.uk/ --delete

echo "Done! Site deployed to https://www.notdeadyet.uk/"
