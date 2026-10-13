/**
 * Writes display-sized WebP copies of the photos the site actually shows.
 * Originals stay in place. Run: node scripts/optimize-images.cjs
 */
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const root = path.join(__dirname, '..', 'public', 'images');

const jobs = [
  { dir: 'services', match: /\.png$/i, width: 960, quality: 80 },
  { file: 'hero-workspace.jpg', width: 1280, quality: 74 },
  { dir: 'solutions', match: /\.jpe?g$/i, width: 800, quality: 72 },
  { file: 'logo-transparent.png', width: 640, quality: 82 },
];

async function writeWebp(input, width, quality) {
  const before = fs.statSync(input).size;
  const meta = await sharp(input).metadata();
  const out = input.replace(/\.(png|jpe?g)$/i, '.webp');
  const info = await sharp(input)
    .resize({ width, withoutEnlargement: true })
    .webp({ quality, effort: 5, alphaQuality: 90 })
    .toFile(out);
  const rel = path.relative(root, out);
  console.log(
    `${rel}  ${meta.width}x${meta.height} ${(before / 1024).toFixed(0)}KB -> ${info.width}x${info.height} ${(info.size / 1024).toFixed(0)}KB`
  );
  return { width: info.width, height: info.height };
}

async function recompressCover() {
  const input = path.join(root, 'cover.webp');
  if (!fs.existsSync(input)) return;
  const before = fs.statSync(input).size;
  const meta = await sharp(input).metadata();
  const buf = await sharp(input)
    .resize({ width: 1200, withoutEnlargement: true })
    .webp({ quality: 74, effort: 5 })
    .toBuffer();
  if (buf.length < before) {
    fs.writeFileSync(input, buf);
    const after = await sharp(buf).metadata();
    console.log(
      `cover.webp  ${meta.width}x${meta.height} ${(before / 1024).toFixed(0)}KB -> ${after.width}x${after.height} ${(buf.length / 1024).toFixed(0)}KB`
    );
  } else {
    console.log(`cover.webp kept ${meta.width}x${meta.height} ${(before / 1024).toFixed(0)}KB`);
  }
}

(async () => {
  for (const job of jobs) {
    if (job.file) {
      await writeWebp(path.join(root, job.file), job.width, job.quality);
      continue;
    }
    const dir = path.join(root, job.dir);
    for (const name of fs.readdirSync(dir)) {
      if (!job.match.test(name)) continue;
      await writeWebp(path.join(dir, name), job.width, job.quality);
    }
  }
  await recompressCover();
})().catch((error) => {
  console.error(error);
  process.exit(1);
});
