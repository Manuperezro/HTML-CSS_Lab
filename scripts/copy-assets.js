import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const dist = path.join(root, 'dist');

if (fs.existsSync(dist)) {
  const assetsDir = path.join(dist, 'assets');
  if (fs.existsSync(assetsDir)) {
    fs.cpSync(assetsDir, path.join(root, 'assets'), { recursive: true, force: true });
  }

  const imagesDir = path.join(dist, 'images');
  if (fs.existsSync(imagesDir)) {
    fs.cpSync(imagesDir, path.join(root, 'images'), { recursive: true, force: true });
  }

  const faviconPath = path.join(dist, 'favicon.svg');
  if (fs.existsSync(faviconPath)) {
    fs.copyFileSync(faviconPath, path.join(root, 'favicon.svg'));
  }

  const iconsPath = path.join(dist, 'icons.svg');
  if (fs.existsSync(iconsPath)) {
    fs.copyFileSync(iconsPath, path.join(root, 'icons.svg'));
  }

  console.log('Static production assets successfully copied to root for GitHub Pages.');
}
