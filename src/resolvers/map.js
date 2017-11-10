import { isResolver, resolve } from "../core";

/**
 * The <code>map</code> function is for <em>mapping</em> keys to values.
 * Given a <code>map</code> and a <code>key</code>, it will resolve to a value
 * immediately (if possible), or return a function with may be passed an object
 * to resolve later.
 * @function
 * @param {Object} map Maps values to values OR value-resolving funcs.
 * @param {Resolver|String} key Value or function that resolves to value.
 * @returns {Resolver|String} A value or a resolver.
 */
const map = (map, key) =>
  isResolver(key) ? o => resolve(map[key(o)], o) : map[key];

export default map;
