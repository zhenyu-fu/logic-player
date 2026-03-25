const path = require('path');
const { spawn } = require('child_process');

const workspaceDir = process.argv[2];
const scriptName = process.argv[3];

if (!workspaceDir || !scriptName) {
  process.stderr.write('Usage: node scripts/run-workspace.cjs <workspaceDir> <scriptName>\n');
  process.exit(1);
}

const cwd = path.resolve(process.cwd(), workspaceDir);

const child = spawn(process.platform === 'win32' ? 'npm.cmd' : 'npm', ['run', scriptName], {
  cwd,
  stdio: 'inherit',
});

child.on('exit', (code) => {
  process.exit(code || 0);
});

