import { isResolver, resolve } from "../core";

/**
 * The <code>is</code> function is for resolving a <code>===</code> check of two
 * values. Given <code>a</code> and <code>b</code>, <code>is</code> will return
 * a boolean value immediately if possible. Otherwise, it returns a function
 * which accepts a value to resolve later.
 * @function
 * @param {Resolver|String} a The first value in the equality check.
 * @param {Resolver|String} b The second value in the equality check.
 * @returns {Resolver|Boolean} A value or a resolver.
 */
const is = (a, b) =>
  isResolver(a)
    ? isResolver(b)
      ? o => resolve(a, o) === resolve(b, o)
      : o => resolve(a, o) === b
    : isResolver(b) ? o => a === resolve(b, o) : a === b;

export default is;
