import isResolver from "./isResolver";

/**
 * Returns value or calls value function with props.
 * @function
 * @ignore
 * @param {Resolver|String} value The value or value-to-be-resolved.
 * @param {Object} obj The obj to resolve with.
 * @returns {String} A resolved value.
 */
const resolve = (value, obj) => (isResolver(value) ? value(obj) : value);

export default resolve;
