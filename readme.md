# aws-tools

Upload and invoke lambda functions from npm.

## Installation

```sh
npm i -g npx
npm i -D @mpoteat/aws-tools webpack webpack-cli
```

Add to package.json:

```json
{
  "arn": "arn:aws:lambda:us-east-1:749275109232548:function:example"
}
```

Must have webpack configuration file defined.

## Usage

To upload to AWS lambda:

```sh
npx upload
```

To invoke:

```sh
npx invoke
```
