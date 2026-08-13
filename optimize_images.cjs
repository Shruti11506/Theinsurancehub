const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, 'public');

async function optimizeAll() {
  const files = fs.readdirSync(publicDir);
  console.log('Optimizing images in public directory...');

  for (const file of files) {
    const ext = path.extname(file).toLowerCase();
    const filePath = path.join(publicDir, file);

    if (['.png', '.jpg', '.jpeg'].includes(ext)) {
      try {
        const stats = fs.statSync(filePath);
        const originalSize = stats.size;
        
        const tempPath = filePath + '.tmp';

        if (ext === '.png') {
          await sharp(filePath)
            .resize({ width: 800, withoutEnlargement: true })
            .png({ quality: 80, compressionLevel: 9, palette: true })
            .toFile(tempPath);
        } else if (ext === '.jpg' || ext === '.jpeg') {
          await sharp(filePath)
            .resize({ width: 1000, withoutEnlargement: true })
            .jpeg({ quality: 82, mozjpeg: true })
            .toFile(tempPath);
        }

        const newStats = fs.statSync(tempPath);
        if (newStats.size < originalSize) {
          fs.unlinkSync(filePath);
          fs.renameSync(tempPath, filePath);
          console.log(`Optimized ${file}: ${Math.round(originalSize/1024)}KB -> ${Math.round(newStats.size/1024)}KB (Saved ${Math.round((originalSize - newStats.size)/originalSize * 100)}%)`);
        } else {
          fs.unlinkSync(tempPath);
          console.log(`Kept original ${file}: already optimal.`);
        }
      } catch (err) {
        console.error(`Error optimizing ${file}:`, err.message);
      }
    }
  }

  console.log('Image optimization complete!');
}

optimizeAll();
