import { path as _path } from "../core";

/**
 * Takes a path; returns a value-resolving function.
 * @function
 * @param {String} path A valid path in a props object.
 * @returns {Resolver} A resolver.
 */
const prop = path => o => _path(o, path);

export default prop;
