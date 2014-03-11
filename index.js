
/**
 * Module dependencies.
 */

var debug = require('debug')('auto-schema');

/**
 * Expose `autoschema()`.
 */

module.exports = autoschema;

/**
 * Redshfit datatypes:
 *
 * DATE                  - Calendar date (year, month, day)
 * TIMESTAMP             - Date and time (without time zone)
 * SMALLINT - INT2       - Signed two-byte integer
 * INTEGER  - INT, INT4  - Signed four-byte integer
 * BIGINT   - INT8       - Signed eight-byte integer
 * DECIMAL  - NUMERIC    - Exact numeric of selectable precision
 * REAL     - FLOAT4     - Single precision floating-point number
 * BOOLEAN  - BOOL       - Logical Boolean (true/false)
 * DOUBLE   - PRECISION FLOAT8, FLOAT  - Double precision floating-point number
 * CHAR     - CHARACTER, NCHAR, BPCHAR - Fixed-length character string
 * VARCHAR  - CHARACTER VARYING, NVARCHAR, TEXT - Variable-length character string with a user-defined limit
 */

/**
 * Generate a schema for the given `obj`.
 *
 * @param {Object} obj
 * @return {Object} schema
 * @api public
 */

function autoschema(obj) {
  var schema = {};
  type(schema, obj, '');
  return schema;
}

/**
 * Type `obj` recursively.
 *
 * @param {Object} schema
 * @param {Object} obj
 * @param {String} prefix
 * @api private
 */

function type(schema, obj, prefix) {
  Object.keys(obj).forEach(function(key){
    var val = obj[key];

    if (isObject(val)) {
      type(schema, val, key + '.');
    } else {
      var t = typed(key, val);
      if (t) schema[prefix + normalize(key)] = t;
      else debug('cannot type %j', val);
    }
  });
}

/**
 * Return the appropriate type for `val`.
 *
 * @param {String} key
 * @param {Mixed} val
 * @return {String}
 * @api private
 */

function typed(key, val) {
  return keySpecific(key, val)
    || primitive(val);
}

/**
 * Key specific types such as timestamps.
 *
 * @param {String} key
 * @param {Mixed} val
 * @return {String}
 * @api private
 */

function keySpecific(key, val) {
  switch (key) {
    case 'timestamp': return 'timestamp';
  }
}

/**
 * Return appropriate type for primitive `val`.
 *
 * @param {Mixed} val
 * @return {String}
 * @api private
 */

function primitive(val) {
  switch (typeof val) {
    case 'string': return 'varchar';
    case 'number': return 'float';
    case 'boolean': return 'boolean';
  }
}

/**
 * Check if `val` is an object.
 *
 * @param {Mixed} val
 * @return {Boolean}
 * @api private
 */

function isObject(val) {
  return '[object Object]' == Object.prototype.toString.call(val);
}

/**
 * Normalize `key`.
 *
 * @param {String} key
 * @return {String}
 * @api private
 */

function normalize(key) {
  return key
    .trim()
    .toLowerCase()
    .replace(/[\s-]+/g, '_');
}
