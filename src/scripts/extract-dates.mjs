import { readFileSync, writeFileSync } from 'fs';
import { execSync } from 'child_process';
import { globSync } from 'glob';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const postsDir = resolve(__dirname, '../content/posts');
const outFile = resolve(__dirname, '../data/post-dates.json');

const files = globSync('**/[^_]*.md', { cwd: postsDir, absolute: true });

const dates = {};

for (const file of files) {
  const relative = file.replace(postsDir + '\\', '').replace(/\\/g, '/');
  const slug = relative.replace(/\.md$/, '').replace(/\/index\.md$/, '');

  try {
    const log = execSync(
      `git log --diff-filter=A --follow --format=%aI -- "${relative}"`,
      { cwd: resolve(postsDir, '..', '..'), encoding: 'utf-8', stdio: ['pipe', 'pipe', 'pipe'] }
    );
    const dateStr = log.trim().split('\n')[0];
    if (dateStr) {
      dates[slug] = dateStr;
    }
  } catch {
    // fallback: file modification time
    try {
      const stats = readFileSync(file, 'utf-8');
      dates[slug] = new Date().toISOString();
    } catch {}
  }
}

writeFileSync(outFile, JSON.stringify(dates, null, 2));
