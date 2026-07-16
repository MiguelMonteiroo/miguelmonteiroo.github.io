import { statSync, writeFileSync } from 'fs';
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
  const mtime = statSync(file).mtime;

  try {
    const log = execSync(
      `git log --diff-filter=A --follow --format=%aI -- "${relative}"`,
      { cwd: postsDir, encoding: 'utf-8', stdio: ['pipe', 'pipe', 'pipe'] }
    );
    const dateStr = log.trim().split('\n')[0];
    dates[slug] = dateStr || mtime.toISOString();
  } catch {
    dates[slug] = mtime.toISOString();
  }
}

writeFileSync(outFile, JSON.stringify(dates, null, 2));
