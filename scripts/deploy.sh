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

# Sync to S3
echo "Deploying to S3..."
aws --profile aug24 s3 sync dist/ s3://www.notdeadyet.uk/ --delete

echo "Done! Site deployed to https://www.notdeadyet.uk/"
