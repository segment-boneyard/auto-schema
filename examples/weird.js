
/**
 * Module dependencies.
 */

var autoschema = require('..');

var schema = autoschema({
  User: {
    ID: 123242123,
    'First Name': 'tobi',
    'Last Name': 'loki'
  }
});

console.log(schema);