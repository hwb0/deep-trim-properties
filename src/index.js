/**
 * deep-trim-properties
 * 递归处理数据中的字符串属性，去除其首尾空格
 * @module deep-trim-properties
 */

const { isString, isArray, isPlainObject, hasOwnProperty } = require('./utils/typeCheckers');
const { processString } = require('./utils/stringUtils');

/**
 * 递归处理数据中的字符串属性，去除其首尾空格
 * @param {*} data - 要处理的数据，可以是对象、数组或基本类型
 * @param {Array|Object} [options=[]] - 配置选项或排除属性数组
 * @param {string[]} [options.exclude=[]] - 不需要去除首尾空格的属性名数组
 * @param {boolean} [options.convertToFullWidth=true] - 是否将半角的 < 和 > 转换为全角
 * @param {WeakMap} [cache=new WeakMap()] - 用于缓存已处理的对象，处理循环引用
 * @param {string} [currentPath=''] - 当前处理的属性路径
 * @returns {*} 处理后的数据
 */
function deepTrimProperties(data, options, cache = new WeakMap(), currentPath = '') {
  // 规范化参数
  let notTrimParams = [];
  let processOptions = { convertToFullWidth: true };
  
  // 处理兼容性 - 支持老的API形式和新的对象形式
  if (options) {
    if (Array.isArray(options)) {
      // 老的API：第二个参数是数组
      notTrimParams = options;
    } else if (typeof options === 'object') {
      // 新的API：第二个参数是对象
      if (options.exclude && Array.isArray(options.exclude)) {
        notTrimParams = options.exclude;
      }
      if (options.convertToFullWidth !== undefined) {
        processOptions.convertToFullWidth = !!options.convertToFullWidth;
      }
    }
  }
  
  // 处理数组
  if (isArray(data)) {
    // 检查缓存
    if (cache.has(data)) {
      return cache.get(data);
    }
    
    const result = [];
    // 先将结果数组放入缓存
    cache.set(data, result);
    
    // 处理数组元素
    data.forEach(function(item, index) {
      const itemPath = currentPath ? `${currentPath}[${index}]` : `[${index}]`;
      result.push(deepTrimProperties(item, options, cache, itemPath));
    });
    
    return result;
  }
  
  // 处理对象
  if (isPlainObject(data)) {
    // 检查缓存
    if (cache.has(data)) {
      return cache.get(data);
    }
    
    const result = {};
    // 先将结果对象放入缓存
    cache.set(data, result);
    
    // 获取所有属性（包括 Symbol）
    const keys = Object.getOwnPropertyNames(data).concat(Object.getOwnPropertySymbols(data));
    
    for (const key of keys) {
      const value = data[key];
      const keyPath = currentPath ? `${currentPath}.${key}` : key;
      // 检查是否在排除列表中 - 支持点号表示法
      const isKeyNotTrim = typeof key === 'string' && shouldExclude(keyPath, notTrimParams);
      
      if (isString(value)) {
        // 如果属性名在排除列表中，则保持原样不处理
        if (isKeyNotTrim) {
          result[key] = value;
        } else {
          result[key] = processString(value, processOptions);
        }
      } else if (isPlainObject(value) || isArray(value)) {
        // 递归处理嵌套的对象或数组
        result[key] = deepTrimProperties(value, options, cache, keyPath);
      } else {
        // 非字符串、非对象、非数组的值直接赋值
        result[key] = value;
      }
    }
    
    return result;
  }
  
  // 处理字符串
  if (isString(data)) {
    return processString(data, processOptions);
  }
  
  // 其他类型直接返回
  return data;
}

/**
 * 检查属性是否应该被排除
 * @param {string} path - 属性路径
 * @param {string[]} excludeList - 排除列表
 * @returns {boolean} 如果属性应该被排除则返回 true，否则返回 false
 */
function shouldExclude(path, excludeList) {
  if (!excludeList || !Array.isArray(excludeList)) {
    return false;
  }
  
  // 直接匹配
  if (excludeList.indexOf(path) !== -1) {
    return true;
  }
  
  // 检查通配符和点号表示法
  for (let i = 0; i < excludeList.length; i++) {
    const pattern = excludeList[i];
    if (typeof pattern !== 'string') continue;
    
    // 支持通配符
    if (pattern.endsWith('.*')) {
      const prefix = pattern.slice(0, -2);
      if (path.startsWith(prefix + '.')) {
        return true;
      }
    }
  }
  
  return false;
}

module.exports = deepTrimProperties;
module.exports.default = deepTrimProperties; 