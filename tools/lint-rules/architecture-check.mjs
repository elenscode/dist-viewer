import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const srcRoot = path.join(root, 'src');
const maxLines = 260;
const allowLargeFiles = new Set([
  'src/components/ui/sidebar.tsx',
]);

const failures = [];

function walk(dir) {
  if (!fs.existsSync(dir)) return [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  return entries.flatMap((entry) => {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) return walk(full);
    if (/\.(ts|tsx)$/.test(entry.name)) return [full];
    return [];
  });
}

function rel(file) {
  return path.relative(root, file).replaceAll(path.sep, '/');
}

function layerFor(relativeFile) {
  if (relativeFile === 'src/main.tsx' || relativeFile === 'src/App.tsx') return 'app';
  if (relativeFile.startsWith('src/components/ui/')) return 'ui';
  if (relativeFile.startsWith('src/components/')) return 'components';
  if (relativeFile.startsWith('src/api/')) return 'api';
  if (relativeFile.startsWith('src/lib/')) return 'lib';
  if (relativeFile.startsWith('src/hooks/')) return 'hooks';
  if (relativeFile.startsWith('src/types/')) return 'types';
  return 'unknown';
}

function resolveImport(fromFile, specifier) {
  if (specifier.startsWith('@/')) return `src/${specifier.slice(2)}`;
  if (!specifier.startsWith('.')) return null;

  const fromDir = path.dirname(fromFile);
  const resolved = path.normalize(path.join(fromDir, specifier));
  return rel(resolved);
}

function importedLayer(fromFile, specifier) {
  const resolved = resolveImport(fromFile, specifier);
  if (!resolved) return null;
  if (!resolved.startsWith('src/')) return null;
  return layerFor(resolved);
}

const forbidden = {
  types: new Set(['app', 'components', 'ui', 'api', 'lib', 'hooks']),
  lib: new Set(['app', 'components', 'ui', 'api', 'hooks']),
  api: new Set(['app', 'components', 'ui', 'hooks']),
  ui: new Set(['app', 'components', 'api']),
  hooks: new Set(['app', 'components', 'api']),
};

function checkImports(file, content) {
  const relativeFile = rel(file);
  const fromLayer = layerFor(relativeFile);
  const importRe = /import\s+(?:type\s+)?(?:[^'"]+\s+from\s+)?['"]([^'"]+)['"]/g;
  let match;
  while ((match = importRe.exec(content))) {
    const specifier = match[1];
    const toLayer = importedLayer(file, specifier);
    if (!toLayer || toLayer === 'unknown') continue;
    if (forbidden[fromLayer]?.has(toLayer)) {
      failures.push(`${relativeFile}: ${fromLayer} must not import ${toLayer} via "${specifier}". Move shared code to src/lib or src/types, or invert the dependency.`);
    }
  }
}

function checkNaming(file) {
  const relativeFile = rel(file);
  const base = path.basename(file);
  const layer = layerFor(relativeFile);
  if (layer === 'components' && !/^[A-Z][A-Za-z0-9]+\.tsx$/.test(base)) {
    failures.push(`${relativeFile}: React component files must be PascalCase.tsx. Rename the file or move non-component code to src/lib.`);
  }
  if (layer === 'ui' && !/^[a-z0-9-]+\.tsx$/.test(base)) {
    failures.push(`${relativeFile}: reusable UI primitive files must use kebab-case.tsx to match shadcn conventions.`);
  }
  if (layer === 'hooks' && !/^use[-A-Za-z0-9]+\.ts$/.test(base)) {
    failures.push(`${relativeFile}: hook files must start with "use" and export a React hook.`);
  }
}

function checkFileSize(file, content) {
  const relativeFile = rel(file);
  const lineCount = content.split('\n').length;
  if (lineCount > maxLines && !allowLargeFiles.has(relativeFile)) {
    failures.push(`${relativeFile}: ${lineCount} lines exceeds ${maxLines}. Split by responsibility or document an allowlist exception in tools/lint-rules/architecture-check.mjs.`);
  }
}

function checkRiskyPatterns(file, content) {
  const relativeFile = rel(file);
  if (relativeFile.startsWith('src/components/') && /fetch\s*\(|axios\.|XMLHttpRequest/.test(content)) {
    failures.push(`${relativeFile}: components must not call external APIs directly. Put boundary calls in src/api/ and pass normalized data into components.`);
  }
  if (/console\.(log|error|warn)\([^)]*(token|secret|password|credential)/i.test(content)) {
    failures.push(`${relativeFile}: possible sensitive value in log statement. Remove the value or log only safe structured context.`);
  }
  if (/dangerouslySetInnerHTML/.test(content)) {
    failures.push(`${relativeFile}: dangerouslySetInnerHTML requires a documented sanitizer and security review.`);
  }
  if (/import\.meta\.env/.test(content) && !relativeFile.startsWith('src/config/')) {
    failures.push(`${relativeFile}: environment variables should be read through a src/config/ boundary before use.`);
  }
}

for (const file of walk(srcRoot)) {
  const content = fs.readFileSync(file, 'utf8');
  checkImports(file, content);
  checkNaming(file);
  checkFileSize(file, content);
  checkRiskyPatterns(file, content);
}

if (failures.length) {
  console.error('Architecture check failed:\n');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log('Architecture check passed.');
