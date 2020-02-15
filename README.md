# CLI Stylizer

![NPM Version](https://img.shields.io/npm/v/cli-stylizer.svg?maxAge=3600) ![NPM Downloads](https://img.shields.io/npm/dt/cli-stylizer.svg?maxAge=3600)

The reliable CLI stylizer.

```js
const stylizer = require("cli-stylizer");

stylizer.red("Red text!");

stylizer.bold("Bold text too!");

stylizer.bgBlue("Blue background!");

stylizer.green.bold("Combinations!");

stylizer.hex("DEADED")("Custom colors!");
```

All the default colors are all the css keywords.

Special thanks to [Sindre Sorhus](https://github.com/sindresorhus) for inspiring me to create this package.
