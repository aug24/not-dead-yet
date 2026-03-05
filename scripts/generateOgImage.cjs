const { createCanvas } = require('canvas');
const fs = require('fs');
const path = require('path');

const width = 1200;
const height = 630;

const canvas = createCanvas(width, height);
const ctx = canvas.getContext('2d');

// Background gradient (cream/parchment)
const gradient = ctx.createLinearGradient(0, 0, 0, height);
gradient.addColorStop(0, '#f8f4e8');
gradient.addColorStop(0.5, '#f5f0e1');
gradient.addColorStop(1, '#efe9d9');
ctx.fillStyle = gradient;
ctx.fillRect(0, 0, width, height);

// Subtle texture
ctx.globalAlpha = 0.02;
for (let i = 0; i < 8000; i++) {
  ctx.fillStyle = Math.random() > 0.5 ? '#000' : '#fff';
  ctx.fillRect(Math.random() * width, Math.random() * height, 1, 1);
}
ctx.globalAlpha = 1;

// Border
ctx.strokeStyle = '#8b7355';
ctx.lineWidth = 4;
ctx.strokeRect(40, 40, width - 80, height - 80);
ctx.strokeStyle = '#c4b59d';
ctx.lineWidth = 2;
ctx.strokeRect(52, 52, width - 104, height - 104);

// Corner ornaments
function drawCorner(x, y, flipX, flipY) {
  ctx.save();
  ctx.translate(x, y);
  ctx.scale(flipX ? -1 : 1, flipY ? -1 : 1);

  ctx.strokeStyle = '#8b7355';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(0, 50);
  ctx.quadraticCurveTo(0, 0, 50, 0);
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(8, 42);
  ctx.quadraticCurveTo(8, 8, 42, 8);
  ctx.stroke();

  ctx.fillStyle = '#8b7355';
  ctx.beginPath();
  ctx.arc(20, 20, 4, 0, Math.PI * 2);
  ctx.fill();

  ctx.restore();
}

drawCorner(40, 40, false, false);
drawCorner(width - 40, 40, true, false);
drawCorner(40, height - 40, false, true);
drawCorner(width - 40, height - 40, true, true);

// Main title
ctx.fillStyle = '#2d2820';
ctx.font = 'bold 72px Georgia, serif';
ctx.textAlign = 'center';
ctx.fillText('Not Dead Yet', width / 2, 200);

// Decorative divider
ctx.strokeStyle = '#c4b59d';
ctx.lineWidth = 2;
ctx.beginPath();
ctx.moveTo(350, 240);
ctx.lineTo(width / 2 - 40, 240);
ctx.stroke();
ctx.beginPath();
ctx.moveTo(width / 2 + 40, 240);
ctx.lineTo(width - 350, 240);
ctx.stroke();

ctx.fillStyle = '#8b7355';
ctx.beginPath();
ctx.arc(width / 2, 240, 6, 0, Math.PI * 2);
ctx.fill();

// Tagline
ctx.fillStyle = '#5c5041';
ctx.font = 'italic 36px Georgia, serif';
ctx.fillText('See who you\'ve outlived', width / 2, 320);

// Description
ctx.fillStyle = '#6b6255';
ctx.font = '28px Georgia, serif';
ctx.fillText('Enter your birthday and discover which', width / 2, 420);
ctx.fillText('famous people you\'ve already outlived', width / 2, 460);

// URL
ctx.fillStyle = '#8b6914';
ctx.font = 'bold 32px Georgia, serif';
ctx.fillText('notdeadyet.uk', width / 2, 550);

// Save to file
const buffer = canvas.toBuffer('image/png');
const outputPath = path.join(__dirname, '..', 'public', 'og-image.png');
fs.writeFileSync(outputPath, buffer);
console.log('Generated:', outputPath);
