
# auto-schema

  Generate Redshift schemas from sample objects.

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
  'name.first': 'varchar(2048)',
  'name.last': 'varchar(2048)',
  'properties.category': 'varchar(2048)',
  'properties.label': 'varchar(2048)',
  'context.userAgent': 'varchar(2048)' }
```

# License

  MIT