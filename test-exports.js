// Simple test to check what's actually exported
import { readFile } from 'fs/promises';

try {
  const data = await readFile('./lib/design-system/composition-utils.qwik.mjs', 'utf8');
  const exportLines = data.split('\n').filter(line => line.includes('export '));
  console.log('Export statements found in built file:');
  exportLines.forEach(line => console.log(line.trim()));
} catch (error) {
  console.log('Error reading file:', error.message);
}
