# @we-use/eslint-config
An ESLint configuration that supports JS, TS and React and includes linting and formatting.

## Install
```shell
pnpm i -D eslint @we-use/eslint-config
yarn add -D eslint @we-use/eslint-config
npm i -D eslint @we-use/eslint-config
```

## Create config file (`eslint.config.mjs`)
```js
import { eslintConfig } from "@we-use/eslint-config";

export default eslintConfig();
```

### Add scripts (`package.json`)
For example:
```json
{
  "scripts": {
    "lint": "eslint .",
    "lint:fix": "eslint . --fix"
  }
}
```