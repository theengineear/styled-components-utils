import { isResolver, resolve } from "../core";

/**
 * The <code>and</code> function is for resolving the logical "and" of two
 * values. Given <code>a</code> and <code>b</code>, <code>and</code> will return
 * a boolean value immediately if possible. Otherwise, it returns a function
 * which accepts a value to resolve later.
 * @function
 * @param {Resolver|String} a The first value to "and".
 * @param {Resolver|String} b The second value to "and".
 * @returns {Resolver|Boolean} A value or a resolver.
 */
const and = (a, b) =>
  isResolver(a)
    ? isResolver(b)
      ? o => Boolean(resolve(a, o) && resolve(b, o))
      : !b ? false : o => Boolean(resolve(a, o))
    : isResolver(b)
      ? !a ? false : o => Boolean(resolve(b, o))
      : Boolean(a && b);

export default and;
