import { mkdirSync } from 'node:fs';
import { spawnSync } from 'node:child_process';

mkdirSync('reports', { recursive: true });
mkdirSync('coverage', { recursive: true });
const result = spawnSync(process.execPath, [
  '--test', '--experimental-test-coverage',
  '--test-reporter=spec', '--test-reporter-destination=stdout',
  '--test-reporter=junit', '--test-reporter-destination=reports/junit.xml',
  '--test-reporter=lcov', '--test-reporter-destination=coverage/lcov.info',
  'test/format.test.js',
], { stdio: 'inherit' });
if (result.error) {
  console.error(result.error.message);
}
process.exit(result.status ?? 1);
