// Copies non-TypeScript runtime assets (i18n JSON catalogs) into dist/ after
// `tsc` compiles the source, since they're loaded via fs.readFileSync rather
// than a native `import`, so the compiler doesn't know to emit them itself.
import { cpSync, existsSync } from 'node:fs';

const src = 'src/i18n/locales';
const dest = 'dist/i18n/locales';

if (!existsSync(src)) {
  console.error(`copy-assets: source directory not found: ${src}`);
  process.exit(1);
}

cpSync(src, dest, { recursive: true });
console.log(`copy-assets: copied ${src} -> ${dest}`);
