/**
 * Temporary GitHub Pages publish from any branch.
 * Builds with the project-site path and pushes ./build to the gh-pages branch.
 * Live preview: https://insaneboi12.github.io/startbiz-code/
 */
const { spawnSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const buildDir = path.join(root, 'build');
const env = {
  ...process.env,
  PUBLIC_URL: '/startbiz-code',
  NODE_ENV: 'production',
  CI: 'false',
};

function run(command, args) {
  const result = spawnSync(command, args, {
    cwd: root,
    env,
    stdio: 'inherit',
    shell: true,
  });
  if (result.status !== 0) {
    process.exit(result.status || 1);
  }
}

run('npx', ['react-scripts', 'build']);
run('node', ['scripts/strip-redirects.js']);
run('node', ['scripts/seo-build.cjs']);

fs.copyFileSync(path.join(buildDir, 'index.html'), path.join(buildDir, '404.html'));
fs.writeFileSync(path.join(buildDir, '.nojekyll'), '');

const ghpages = require('gh-pages');

ghpages.publish(
  buildDir,
  {
    branch: 'gh-pages',
    dotfiles: true,
    message: 'Deploy temporary GitHub Pages preview',
  },
  (err) => {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    console.log('Published to https://insaneboi12.github.io/startbiz-code/');
  }
);
