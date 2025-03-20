/**
 * 字符串处理工具函数
 * @module stringUtils
 */

const { isString } = require('./typeCheckers');

/**
 * 将半角的 < 和 > 替换为全角的 ＜ 和 ＞
 * 注意：此函数仅处理 < 和 > 字符，不处理其他半角字符
 * @param {string} str - 需要处理的字符串
 * @returns {string} 处理后的字符串
 */
function convertToFullWidth(str) {
  if (!isString(str)) {
    return str;
  }
  
  // 将半角 < 替换为全角 ＜
  let result = str.replace(/</g, '＜');
  // 将半角 > 替换为全角 ＞
  result = result.replace(/>/g, '＞');
  
  return result;
}

/**
 * 去除字符串首尾空格
 * @param {string} str - 需要处理的字符串
 * @returns {string} 处理后的字符串
 */
function trimString(str) {
  if (!isString(str)) {
    return str;
  }
  
  return str.trim();
}

/**
 * 处理字符串：去除首尾空格，并可选地进行半角转全角处理
 * @param {string} str - 需要处理的字符串
 * @param {Object} [options={}] - 处理选项
 * @param {boolean} [options.convertToFullWidth=true] - 是否将半角的 < 和 > 转换为全角
 * @returns {string} 处理后的字符串
 */
function processString(str, options) {
  if (!isString(str)) {
    return str;
  }
  
  options = options || {};
  
  // 默认配置
  const defaultOptions = {
    convertToFullWidth: true
  };
  
  // 合并选项
  const mergedOptions = Object.assign({}, defaultOptions, options);
  
  // 先去除首尾空格
  let result = trimString(str);
  
  // 如果需要，进行半角转全角处理
  if (mergedOptions.convertToFullWidth) {
    result = convertToFullWidth(result);
  }
  
  return result;
}

module.exports = {
  convertToFullWidth,
  trimString,
  processString
}; 