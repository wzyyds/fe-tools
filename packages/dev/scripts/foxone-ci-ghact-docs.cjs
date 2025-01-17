#!/usr/bin/env node

const execSync = require("./execSync.cjs");

const repo = `https://${process.env.GH_PAT}@github.com/${process.env.GITHUB_REPOSITORY}.git`;

console.log("$ polkadot-ci-ghact-docs", process.argv.slice(2).join(" "));

execSync("git config push.default simple");
execSync("git config merge.ours.driver true");
execSync("git config user.name 'Github Actions'");
execSync("git config user.email 'action@github.com'");
execSync("git checkout master");

execSync("yarn run docs");

execSync(
  `yarn foxone-exec-ghpages --dotfiles --repo ${repo} --dist ${process.env.GH_PAGES_SRC} --dest .`,
  true
);
