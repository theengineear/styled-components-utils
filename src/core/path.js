/**
 * Return the value inside <code>obj</code> defined by <code>str</code>.
 * @function
 * @ignore
 * @param {Object} obj The object you want an internal value from.
 * @param {String} str The string path in the object.
 * @returns {*} Note, this returns undefined if a path doesn't exist.
 */
function path(obj, str) {
  if (!~str.indexOf(".") && !~str.indexOf("[")) {
    return obj[str];
  }

  const crumbs = str.split(/[.\[\]]/g);
  let i = -1;
  let result;

  while (++i < crumbs.length) {
    if (i === 0) result = obj;
    if (!crumbs[i]) continue;
    if (typeof result === "undefined") break;
    result = result[crumbs[i]];
  }

  return result;
}

export default path;
