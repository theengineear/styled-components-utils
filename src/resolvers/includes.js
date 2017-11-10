import { isResolver } from "../core";

/**
 * The <code>includes</code> function is for resolving whether or not some value
 * is <em>included</em> in an array of values. Given <code>array</code> and
 * <code>test</code>, <code>includes</code> will return a boolean value
 * immediately if possible. Otherwise, it returns a function which accepts a
 * value to resolve later. Array's elements <bold>may not</bold> be
 * resolvers. I.e., they must be resolved along with the parent array.
 * @function
 * @param {Resolver|Array} array The array to check inclusion with.
 * @param {Resolver|*} test The value or resolver to look for in the array.
 * @returns {Resolver|Boolean} A value or a resolver.
 */
export const includes = (array, test) =>
  isResolver(array)
    ? isResolver(test)
      ? o => array(o).includes(test(o))
      : o => array(o).includes(test)
    : isResolver(test) ? o => array.includes(test(o)) : array.includes(test);

export default includes;
