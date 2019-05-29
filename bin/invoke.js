#!/usr/bin/env node
const util = require("util");
const exec = util.promisify(require("child_process").exec);
const readFile = util.promisify(require("fs").readFile);
const writeFile = util.promisify(require("fs").writeFile)

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

  log("Running lambda instance...");
  await exec(
    `aws lambda invoke --function-name ${arn} dist/response.json --cli-read-timeout 0`
  );

  let response = JSON.parse(await readFile("dist/response.json", "utf8"));

  await writeFile("dist/response.json", JSON.stringify(response, null, 2))

  good("Success!");

  console.log("Output was...");

  console.log("\n", response);
})();
