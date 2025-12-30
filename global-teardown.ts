import { spawn } from 'child_process';
import * as fs from 'fs';
import * as path from 'path';

export default async function globalTeardown() {
  // Only in local development, not in CI
  if (!process.env.CI) {
    const reportPath = path.resolve(__dirname, 'tests/smart-report.html');
    // Wait longer for the report file to be completely written and released
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    if (fs.existsSync(reportPath)) {
      spawn('start', [reportPath], { shell: true, detached: true });
    }
  }
}