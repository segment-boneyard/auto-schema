
# auto-schema

  Redis automatic schema generator based on a sample object.

## Installation

```
$ npm install auto-schema
```

## Example

```js
var autoschema = require('auto-schema');

var schema = autoschema({
  user: {
    id: 123242123,

    name: {
      first: 'tobi',
      last: 'loki'
    },

    properties: {
      category: 'Buttons',
      label: 'Login'
    },

    context: {
      userAgent: 'Mozilla whatever'
    }
  }
});

console.log(schema);
```

yields:

```js
{ 'user.id': 'float',
  'name.first': 'varchar',
  'name.last': 'varchar',
  'properties.category': 'varchar',
  'properties.label': 'varchar',
  'context.userAgent': 'varchar' }
```

# License

  MIT