# @bluzzi/eslint-config
An ESLint configuration that supports JS, TS and React and includes linting and formatting.

> [!NOTE]  
> A new version is currently being developed to support ESLint's new flat config, dynamic adaptation to the project (JS, TS, React, etc) and many others things.

## Usage
### Install
```shell
pnpm i -D eslint @bluzzi/eslint-config
```
```shell
npm i -D eslint @bluzzi/eslint-config
```
```shell
yarn add -D eslint @bluzzi/eslint-config
```
<details>
  <summary>Legacy version</summary>

  ```shell
  pnpm i -D eslint @bluzzi/eslint-config@1.2.1
  ```
  ```shell
  npm i -D eslint @bluzzi/eslint-config@1.2.1
  ```
  ```shell
  yarn add -D eslint @bluzzi/eslint-config@1.2.1
  ```
</details>

### Create config file (`eslint.config.js`)
With ESM [`"type": "module"`](https://nodejs.org/api/packages.html#type) in `package.json` (recommended):
```js
// eslint.config.js
import { eslintConfig } from "@bluzzi/eslint-config";

export default eslintConfig()
```

With CJS:
```js
// eslint.config.js
const { eslintConfig } = require("@bluzzi/eslint-config").default

module.exports = eslintConfig()
```

### Add scripts for `package.json`
For example:
```json
{
  "scripts": {
    "lint": "eslint .",
    "lint:fix": "eslint . --fix"
  }
}
```

### Config VS Code auto fix
Install [VS Code ESLint extension](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) and create `.vscode/settings.json`

```jsonc
{
  // Enable the ESlint flat config support:
  "eslint.experimental.useFlatConfig": true,

  // Disable the default formatter, use eslint instead:
  "prettier.enable": false,
  "editor.formatOnSave": false,

  // Auto fix:
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "explicit",
    "source.organizeImports": "never"
  },

  // Silent the stylistic rules in you IDE, but still auto fix them:
  "eslint.rules.customizations": [
    { "rule": "style/*", "severity": "off" },
    { "rule": "*-indent", "severity": "off" },
    { "rule": "*-spacing", "severity": "off" },
    { "rule": "*-spaces", "severity": "off" },
    { "rule": "*-order", "severity": "off" },
    { "rule": "*-dangle", "severity": "off" },
    { "rule": "*-newline", "severity": "off" },
    { "rule": "*quotes", "severity": "off" },
    { "rule": "*semi", "severity": "off" }
  ],

  // Enable eslint for all supported languages:
  "eslint.validate": [
    "javascript",
    "javascriptreact",
    "typescript",
    "typescriptreact",
    "vue",
    "html",
    "markdown",
    "json",
    "jsonc",
    "yaml"
  ]
}
```
<details>
  <summary>Legacy version</summary>

  ```json
  {
    "prettier.enable": false,
    "editor.formatOnSave": false,
    "editor.codeActionsOnSave": {
      "source.fixAll.eslint": true
    }
  }
  ```
</details>

# I need to explore
- https://github.com/dxhuii/eslint-config
- https://github.com/nivalis-studio/eslint-config
- https://github.com/antfu/eslint-config/tree/main