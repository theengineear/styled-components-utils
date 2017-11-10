import { isResolver } from "../core";

/**
 * Takes an array of strings possible interpolation functions. If all the values
 * are strings, a string is returned. Otherwise, a function is returned that
 * accepts an object and returns a string by resolving any functions.
 * @function
 * @param {String} joiner the string to join values with.
 * @param {...(Resolver|String)} values The values to join together.
 * @returns {Resolver|String} Returns string immediately if possible.
 */
const join = (joiner = "", ...values) => {
  if (values.some(isResolver)) {
    return o =>
      values
        .map(v => (isResolver(v) ? v(o) : v))
        .filter(Boolean)
        .join(joiner);
  }
  return values.filter(Boolean).join(joiner);
};

export default join;
