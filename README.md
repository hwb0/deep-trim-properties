# deep-trim-properties

[![npm version](https://img.shields.io/npm/v/deep-trim-properties.svg)](https://www.npmjs.com/package/deep-trim-properties)
[![npm downloads](https://img.shields.io/npm/dm/deep-trim-properties.svg)](https://www.npmjs.com/package/deep-trim-properties)

[English](./README.en.md) | 简体中文

> **注意**: 如果您正在 npm 网站上查看此文档，请访问 [npm包页面](https://www.npmjs.com/package/deep-trim-properties) 并切换到 "Files" 标签，然后点击 README.en.md 查看英文文档。

一个用于去除数据中字符串属性首尾空格的工具。

## 特性

- 支持任意深度的对象和数组
- 支持排除特定属性
- 支持半角 `<` 和 `>` 转全角
- 支持 Node.js 10 及以上版本
- 支持 CommonJS 和 ES Module 两种使用方式
- 完整的 TypeScript 类型支持

## 安装

```bash
npm install deep-trim-properties
```

## 使用

### CommonJS 方式

```javascript
const deepTrimProperties = require('deep-trim-properties');

// 基本使用
const data = {
  name: '  John  ',
  age: 25,
  address: {
    street: '  123 Main St  ',
    city: '  New York  '
  }
};

const result = deepTrimProperties(data);
console.log(result);
// 输出:
// {
//   name: 'John',
//   age: 25,
//   address: {
//     street: '123 Main St',
//     city: 'New York'
//   }
// }

// 排除特定属性
const dataWithExclusions = {
  name: '  John  ',
  password: '  secret  ',
  settings: {
    theme: '  dark  '
  }
};

const resultWithExclusions = deepTrimProperties(dataWithExclusions, {
  exclude: ['password', 'settings.theme']
});
console.log(resultWithExclusions);
// 输出:
// {
//   name: 'John',
//   password: '  secret  ',
//   settings: {
//     theme: '  dark  '
//   }
// }

// 半角转全角
const dataWithHalfWidth = {
  name: '  John  ',
  html: '  <div>Hello</div>  '
};

const resultWithFullWidth = deepTrimProperties(dataWithHalfWidth, {
  convertToFullWidth: true
});
console.log(resultWithFullWidth);
// 输出:
// {
//   name: 'John',
//   html: '＜div＞Hello＜/div＞'
// }
```

### ES Module 方式

```javascript
import deepTrimProperties from 'deep-trim-properties';

// 基本使用
const data = {
  name: '  John  ',
  age: 25,
  address: {
    street: '  123 Main St  ',
    city: '  New York  '
  }
};

const result = deepTrimProperties(data);
console.log(result);

// 排除特定属性
const resultWithExclusions = deepTrimProperties(data, {
  exclude: ['address.street']
});

// 半角转全角
const resultWithFullWidth = deepTrimProperties(data, {
  convertToFullWidth: true
});
```

## API

### deepTrimProperties(data, options?)

参数：
- `data`: 任意类型的数据
- `options?`: 可选的配置对象
  - `exclude?: string[]`: 要排除的属性路径数组
  - `convertToFullWidth?: boolean`: 是否将半角的 `<` 和 `>` 转换为全角的 `＜` 和 `＞`

返回值：
- 处理后的数据，保持原数据结构不变

## 错误处理

该库会安全地处理各种边界情况：

```javascript
// 空对象
deepTrimProperties({})  // 返回 {}

// 空数组
deepTrimProperties([])  // 返回 []

// null 或 undefined
deepTrimProperties(null)  // 返回 null
deepTrimProperties(undefined)  // 返回 undefined

// 非对象类型
deepTrimProperties(123)  // 返回 123
deepTrimProperties('  hello  ')  // 返回 'hello'
deepTrimProperties(true)  // 返回 true
```

## 兼容性

- Node.js: >= 10.0.0
- 支持 CommonJS 和 ES Module 两种使用方式
- 完整的 TypeScript 类型支持

## 注意事项

1. 该库只会处理字符串类型的属性值
2. 对于非对象类型的数据，会直接返回原值
3. 对于 `null` 和 `undefined`，会直接返回原值
4. 排除属性路径支持点号表示法（如：'user.address.street'）

## 性能考虑

该库在处理大型对象时可能会产生一定的性能开销，特别是在处理深层嵌套的对象时。如果性能是关键考虑因素，建议：

1. 使用 `exclude` 选项排除不需要处理的属性
2. 只处理必要的层级
3. 对于频繁调用的场景，考虑缓存处理结果

## 性能测试

在以下配置的机器上测试：
- CPU: Intel i7
- 内存: 16GB
- Node.js: v18.16.1

测试结果：
- 处理 1000 个属性的对象：< 100ms
- 处理 100 层嵌套的对象：< 100ms

## 许可证

MIT 

## 常见问题

### 如何处理循环引用？
deep-trim-properties 使用 WeakMap 来处理循环引用，确保不会陷入无限循环。

### 如何处理 Symbol 属性？
函数会正确处理对象的 Symbol 属性，保持 Symbol 属性的唯一性。

### 如何处理特殊字符？
- 默认会将半角的 `<` 和 `>` 转换为全角的 `＜` 和 `＞`
- 可以通过 `convertToFullWidth: false` 选项禁用此功能

### 如何处理深层嵌套的对象？
函数会递归处理所有层级的对象和数组，但使用 WeakMap 来优化性能，避免重复处理。 