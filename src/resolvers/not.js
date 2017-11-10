import { isResolver, resolve } from "../core";

/**
 * The <code>not</code> function is for resolving logical "not" of some
 * <em>single condition</em>. Given <code>value</code>, <code>not</code> will
 * return a boolean value immediately if possible. Otherwise, it returns a
 * function which accepts a value to resolve later.
 * @function
 * @param {Resolver|String} value The value to return the opposite of.
 * @returns {Resolver|Boolean} A value or a resolver.
 */
const not = value => (isResolver(value) ? o => !resolve(value, o) : !value);

export default not;
