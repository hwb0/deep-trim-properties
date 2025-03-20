/**
 * 类型检查工具函数
 * @module typeCheckers
 */

/**
 * 判断一个值是否为字符串
 * @param {*} value - 要判断的值
 * @returns {boolean} 如果值是字符串则返回 true，否则返回 false
 */
function isString(value) {
  return value instanceof String || typeof value === 'string';
}

/**
 * 判断一个值是否为数组
 * @param {*} value - 要判断的值
 * @returns {boolean} 如果值是数组则返回 true，否则返回 false
 */
function isArray(value) {
  return Array.isArray(value);
}

/**
 * 判断一个值是否为普通对象（plain object）
 * @param {*} value - 要判断的值
 * @returns {boolean} 如果值是普通对象则返回 true，否则返回 false
 */
function isPlainObject(value) {
  if (value === null || typeof value !== 'object') {
    return false;
  }
  
  // 使用 Object.prototype.toString 检查对象类型
  const proto = Object.getPrototypeOf(value);
  return proto === Object.prototype || proto === null;
}

/**
 * 判断一个对象是否具有特定属性
 * @param {Object} obj - 要检查的对象
 * @param {string|symbol} prop - 属性名
 * @returns {boolean} 如果对象具有该属性则返回 true，否则返回 false
 */
function hasOwnProperty(obj, prop) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}

/**
 * 判断一个值是否为 Symbol
 * @param {*} value - 要判断的值
 * @returns {boolean} 如果值是 Symbol 则返回 true，否则返回 false
 */
function isSymbol(value) {
  return typeof value === 'symbol';
}

module.exports = {
  isString,
  isArray,
  isPlainObject,
  hasOwnProperty,
  isSymbol
}; 