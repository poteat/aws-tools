# aws-tools

Upload and invoke lambda functions from npm.

## Installation

```sh
npm i aws-tools
```

Add to package.json:

```json
{
  "scripts": {
    "upload": "node deploy/upload.js",
    "invoke": "node deploy/invoke.js"
  }
}
```

## Usage

To upload to AWS lambda:

```sh
npm run upload
```

To invoke:

```sh
npm run invoke
```
