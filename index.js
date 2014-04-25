
/**
 * Module dependencies.
 */

var tableize = require('tableize');

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
 * @param {Object} [opts]
 * @return {Object} schema
 * @api public
 */

function autoschema(obj, opts) {
  opts = opts || {};
  return type(tableize(obj), opts);
}

/**
 * Type `obj` and return the schema.
 *
 * @param {Object} obj
 * @param {Object} opts
 * @return {Object} schema
 * @api private
 */

function type(obj, opts) {
  return Object.keys(obj).reduce(function(schema, key){
    var val = obj[key];
    var type = typed(key, val, opts);
    if (type) schema[key] = type;
    return schema;
  }, {});
}

/**
 * Return the appropriate type for `val`.
 *
 * @param {String} key
 * @param {Mixed} val
 * @param {Object} opts
 * @return {String}
 * @api private
 */

function typed(key, val, opts) {
  return keySpecific(key, val, opts)
    || primitive(val, opts);
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

function primitive(val, opts) {
  var size = opts.varchar || 10240;
  switch (typeof val) {
    case 'string': return 'varchar(' + size + ')';
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
