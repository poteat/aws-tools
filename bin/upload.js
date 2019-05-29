#!/usr/bin/env node
const util = require("util");
const exec = util.promisify(require("child_process").exec);
const readFile = util.promisify(require("fs").readFile);

const chalk = require("chalk");

let log = s => console.log(chalk.gray(s));
let good = s => console.log(chalk.green(s));
let bad = s => console.log(chalk.bgRed(s));

(async () => {
  await exec("mkdir -p dist");

  log("Getting ARN from package.json...");
  const package = JSON.parse(await readFile("package.json", "utf8"));
  const arn = package.arn;

  if (arn === undefined) {
    bad("package.json missing .arn attribute!");
    return;
  }

  log("Bundling via webpack...");
  await exec("npx webpack");

  log("Zipping bundle...");
  await exec("zip dist/index.zip dist/index.js -q -j");

  log("Uploading bundle to AWS...");
  const response = await exec(
    `aws lambda update-function-code --function-name ${arn} --zip-file fileb://dist/index.zip`
  );

  if (response.stderr !== "") {
    bad("A problem occurred:");
    bad(response.stderr);
  } else {
    good("Success!");
  }
})();
