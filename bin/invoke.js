const util = require("util");
const exec = util.promisify(require("child_process").exec);
const readFile = util.promisify(require("fs").readFile);

const chalk = require("chalk");

let log = s => console.log(chalk.gray(s));
let good = s => console.log(chalk.green(s));
let bad = s => console.log(chalk.bgRed(s));

(async () => {
  await exec("rm -rf temp");
  await exec("mkdir -p temp");

  log("Getting ARN from package.json...");
  const package = JSON.parse(await readFile("package.json", "utf8"));
  const arn = package.arn;

  if (arn === undefined) {
    bad("package.json missing .arn attribute!");
    return;
  }

  log("Running lambda instance...");
  await exec(`aws lambda invoke --function-name ${arn} temp/response.json`);

  let response = JSON.parse(await readFile("temp/response.json", "utf8")).body;

  log("Cleaning up staging...");
  await exec("rm -rf temp");

  good("Success!");

  console.log("Output was...");

  console.log("\n", response);
})();
