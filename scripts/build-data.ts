import { execSync } from 'child_process';
import * as path from 'path';

console.log('Running build-data.ts pipeline...');
try {
  execSync('python scripts/build_data.py', { stdio: 'inherit' });
  console.log('build-data.ts finished successfully.');
} catch (err) {
  console.error('Error running build_data.py:', err);
  process.exit(1);
}
