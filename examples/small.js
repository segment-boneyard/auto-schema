
/**
 * Module dependencies.
 */

var autoschema = require('..');

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