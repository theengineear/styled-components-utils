/**
 * @typedef {Function} Resolver These functions help to generate CSS strings. If
 * the string requires information at runtime, these functions will return a
 * function (a <em>resolver</em>) which can be passed an object
 * (e.g., <code>props</code>) at runtime to return a chunk of CSS.
 * @param {Object} props Resolver functions are resolved with a "props" object.
 * @returns {String|Boolean} Typically, this is a String.
 */

/**
 * Used to tell if a given value is known now or must be resolved later.
 * @function
 * @ignore
 * @param {*|Resolver} value
 * @returns {Boolean} Returns true if the value should be resolved later.
 */
const isResolver = value => typeof value === "function";

export default isResolver;
