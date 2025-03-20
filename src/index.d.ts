/**
 * 配置选项
 */
export interface Options {
  /**
   * 不需要去除首尾空格的属性名数组
   * 支持点号表示法，如 'user.address.street'
   * 支持通配符，如 'user.*' 会排除 user 下的所有属性
   */
  exclude?: string[];

  /**
   * 是否将半角的 < 和 > 转换为全角的 ＜ 和 ＞
   * 注意: 只处理这两个特定字符，不处理其他半角字符
   * @default true
   */
  convertToFullWidth?: boolean;
}

/**
 * 递归处理数据中的字符串属性，去除其首尾空格
 * @param data - 要处理的数据，可以是对象、数组或基本类型
 * @param options - 配置选项或排除属性数组
 * @returns 处理后的数据
 * 
 * @example
 * // 基本使用
 * deepTrimProperties({ name: '  John  ' }) // 返回 { name: 'John' }
 * 
 * @example
 * // 使用排除列表
 * deepTrimProperties({ name: '  John  ', password: '  secret  ' }, { exclude: ['password'] })
 * // 返回 { name: 'John', password: '  secret  ' }
 * 
 * @example
 * // 使用老版本API（兼容）
 * deepTrimProperties({ name: '  John  ' }, ['name'])
 * // 返回 { name: '  John  ' }
 */
declare function deepTrimProperties<T>(
  data: T,
  options?: string[] | Options
): T;

export default deepTrimProperties; 