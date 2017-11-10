import { isResolver } from "../core";

const _declare = (property, value) => `${property}: ${value};`;

/**
 * The <code>declare</code> function is for resolving whether or not a CSS
 * (property, value) pair string should be declared. In many cases, you know
 * what CSS property you want to declare, but you don't know whether or not to
 * declare it. The alternative would be to set the CSS value to something
 * invalid, but this bloats the CSS unnecessarily. Given
 * <code>cssProperty</code>, <code>value</code>, and <code>test</code>, the
 * <code>declare</code> function will return a string (may be empty)
 * immediately if possible. Otherwise, it returns a function which accepts a
 * value to resolve later. The cssProperty <bold>must</bold> be a string (i.e.,
 * cannot be a resolver). However, both value and test may be resolved later.
 * @function
 * @param {String} cssProperty The CSS property we want to declare.
 * @param {Resolver|*} value The value or resolver to set our CSS property to.
 * @param {Resolver|*} [test] This determines whether or not to declare.
 * @returns {Resolver|String} A declaration string or a resolver.
 */
const declare = (cssProperty, value, test = true) =>
  isResolver(test)
    ? isResolver(value)
      ? o =>
          test(o)
            ? typeof value(o) !== "undefined"
              ? _declare(cssProperty, value(o))
              : ""
            : ""
      : typeof value !== "undefined"
        ? o => (test(o) ? _declare(cssProperty, value) : "")
        : ""
    : test
      ? isResolver(value)
        ? o =>
            typeof value(o) !== "undefined"
              ? _declare(cssProperty, value(o))
              : ""
        : typeof value !== "undefined" ? _declare(cssProperty, value) : ""
      : "";

export default declare;
