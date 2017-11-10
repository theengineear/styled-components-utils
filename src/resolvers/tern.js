import { isResolver, resolve } from "../core";

/**
 * The <code>tern</code> function is for resolving some
 * <em>ternary condition</em>. Given <code>a</code>, <code>b</code>, and
 * <code>test</code>--if <code>tern</code> will return a value immediately if
 * possible. Otherwise, it returns a function which accepts a value to resolve
 * later.
 * @function
 * @param {Resolver|String} a The 'true' case.
 * @param {Resolver|String} b The 'false' case.
 * @param {Boolean|Function} test The value to test for a or b.
 * @returns {Resolver|String} A value or a resolver.
 */
const tern = (a, b, test) =>
  isResolver(test) ? o => resolve(resolve(test, o) ? a : b, o) : test ? a : b;

export default tern;
