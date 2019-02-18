/* eslint-disable node/no-unsupported-features, node/no-unpublished-require, no-console */
const { execSync } = require('child_process');
const generateChangelog = require('ember-cli-changelog/lib/tasks/release-with-changelog');

function runCommand(command) {
  console.log(`running: ${command}`);
  const output = execSync(command, { encoding: 'utf8' });
  console.log(output);
}

module.exports = {
  publish: true,
  beforeCommit: generateChangelog,

  afterPublish(project, versions) {
    // Publish dummy app with docs to gh-pages
    runCommand('git branch -f gh-pages origin/gh-pages');
    runCommand(
      `ember github-pages:commit --message "Released ${versions.next}"`
    );
    runCommand('git push origin gh-pages:gh-pages');
  }
};
