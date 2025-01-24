#!/bin/bash -e
node scripts/prepare_data.js
npm run build
sed -i '' 's|"/assets/index.*.css"|"assets/index.css"|g' dist/index.html
sed -i '' 's|"/assets/index.*.js"|"assets/index.js"|g' dist/index.html
mv dist/assets/index-*css dist/assets/index.css
mv dist/assets/index-*js dist/assets/index.js
magick notdeadyet.png -resize 16x16 -define icon:auto-resize favicon.ico
cp favicon.ico dist
rm -rf ../aug24.co.uk/site/not-dead-yet/*
cp -pr dist/* ../aug24.co.uk/site/not-dead-yet/
