import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const failures = [];

const required = [
  'AGENTS.md',
  'ARCHITECTURE.md',
  'docs/index.md',
  'docs/PRODUCT.md',
  'docs/PRODUCT_SENSE.md',
  'docs/DESIGN.md',
  'docs/FRONTEND.md',
  'docs/BACKEND.md',
  'docs/SECURITY.md',
  'docs/RELIABILITY.md',
  'docs/QUALITY_SCORE.md',
  'docs/TESTING.md',
  'docs/OBSERVABILITY.md',
  'docs/REVIEW.md',
  'docs/CONTRIBUTING_AGENT.md',
  'docs/repo-audit.md',
  'docs/generated/repo-map.md',
  'docs/generated/commands.md',
  'docs/generated/db-schema.md',
  'docs/generated/api-map.md',
  'docs/generated/dependency-map.md',
  'docs/generated/route-map.md',
  'docs/generated/risk-register.md',
  'docs/exec-plans/PLAN_TEMPLATE.md',
  'docs/exec-plans/tech-debt-tracker.md',
];

function exists(relativePath) {
  return fs.existsSync(path.join(root, relativePath));
}

for (const file of required) {
  if (!exists(file)) failures.push(`${file}: required documentation file is missing.`);
}

if (exists('AGENTS.md')) {
  const lines = fs.readFileSync(path.join(root, 'AGENTS.md'), 'utf8').trimEnd().split('\n').length;
  if (lines < 40 || lines > 150) {
    failures.push(`AGENTS.md: ${lines} lines. Keep this file between 40 and 150 lines as a short agent map.`);
  }
}

if (exists('docs/index.md')) {
  const index = fs.readFileSync(path.join(root, 'docs/index.md'), 'utf8');
  for (const file of required.filter((item) => item !== 'docs/index.md')) {
    const expected = file.startsWith('docs/') ? file.slice('docs/'.length) : `../${file}`;
    if (!index.includes(expected) && !index.includes(file)) {
      failures.push(`docs/index.md: missing link text for ${file}. Add it so agents can navigate from the index.`);
    }
  }
}

function walkMarkdown(dir) {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) return walkMarkdown(full);
    if (entry.name.endsWith('.md')) return [full];
    return [];
  });
}

const markdownFiles = [path.join(root, 'AGENTS.md'), path.join(root, 'ARCHITECTURE.md'), ...walkMarkdown(path.join(root, 'docs')), ...walkMarkdown(path.join(root, 'evals'))].filter(fs.existsSync);
const linkRe = /\[[^\]]+\]\(([^)]+)\)/g;

for (const file of markdownFiles) {
  const content = fs.readFileSync(file, 'utf8');
  let match;
  while ((match = linkRe.exec(content))) {
    const target = match[1];
    if (/^(https?:|mailto:|#)/.test(target)) continue;
    const cleanTarget = target.split('#')[0];
    if (!cleanTarget) continue;
    const resolved = path.resolve(path.dirname(file), cleanTarget);
    if (!fs.existsSync(resolved)) {
      failures.push(`${path.relative(root, file)}: broken markdown link "${target}". Update the link or create the target.`);
    }
  }
}

if (failures.length) {
  console.error('Docs health check failed:\n');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log('Docs health check passed.');
