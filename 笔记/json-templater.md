```npm i json-template```

```javascript
const render = require('json-templater/string');
const IMPORT_TEMPLATE = 'import {{name}} from \'../packages/{{package}}/index.js\';';

parseStrTemplate = render(IMPORT_TEMPLATE, {name: 'input', package: 'input'});
```