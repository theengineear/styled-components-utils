import { isResolver, resolve } from "../core";

/**
 * The <code>or</code> function is for resolving the logical "or" of two values.
 * Given <code>a</code> and <code>b</code>, <code>or</code> will return a
 * boolean value immediately if possible. Otherwise, it returns a function which
 * accepts a value to resolve later.
 * @function
 * @param {Resolver|String} a The first value to "or".
 * @param {Resolver|String} b The second value to "or".
 * @returns {Resolver|Boolean} A value or a resolver.
 */
const or = (a, b) =>
  isResolver(a)
    ? isResolver(b)
      ? o => Boolean(resolve(a, o) || resolve(b, o))
      : b ? true : o => Boolean(resolve(a, o))
    : isResolver(b)
      ? a ? true : o => Boolean(resolve(b, o))
      : Boolean(a || b);

export default or;
