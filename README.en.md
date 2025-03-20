# deep-trim-properties

[![npm version](https://img.shields.io/npm/v/deep-trim-properties.svg)](https://www.npmjs.com/package/deep-trim-properties)
[![npm downloads](https://img.shields.io/npm/dm/deep-trim-properties.svg)](https://www.npmjs.com/package/deep-trim-properties)
[![GitHub](https://img.shields.io/github/license/hwb0/deep-trim-properties)](https://github.com/hwb0/deep-trim-properties)

English | [简体中文](./README.md)

> **Note**: If you are viewing this document on the npm website, please visit the [npm package page](https://www.npmjs.com/package/deep-trim-properties) and switch to the "Files" tab, then click on README.md to view the Chinese documentation.

A utility for trimming whitespace from string properties in data structures.

## Features

- Supports objects and arrays of any depth
- Supports property exclusion
- Supports converting angle brackets (`<` and `>`) to full-width characters
- Supports Node.js 10 and above
- Supports both CommonJS and ES Module formats
- Complete TypeScript type definitions

## Installation

```bash
npm install --save-dev deep-trim-properties
```

## Usage

### CommonJS

```javascript
const deepTrimProperties = require('deep-trim-properties');

// Basic usage
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
// Output:
// {
//   name: 'John',
//   age: 25,
//   address: {
//     street: '123 Main St',
//     city: 'New York'
//   }
// }

// Using exclusions
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
// Output:
// {
//   name: 'John',
//   password: '  secret  ',
//   settings: {
//     theme: '  dark  '
//   }
// }

// Converting angle brackets to full-width
const dataWithHalfWidth = {
  name: '  John  ',
  html: '  <div>Hello</div>  '
};

const resultWithFullWidth = deepTrimProperties(dataWithHalfWidth, {
  convertToFullWidth: true
});
console.log(resultWithFullWidth);
// Output:
// {
//   name: 'John',
//   html: '＜div＞Hello＜/div＞'
// }
```

### ES Module

```javascript
import deepTrimProperties from 'deep-trim-properties';

// Basic usage
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

// Using exclusions
const resultWithExclusions = deepTrimProperties(data, {
  exclude: ['address.street']
});

// Converting angle brackets to full-width
const resultWithFullWidth = deepTrimProperties(data, {
  convertToFullWidth: true
});
```

## API

### deepTrimProperties(data, options?)

Parameters:
- `data`: Data of any type
- `options?`: Optional configuration object
  - `exclude?: string[]`: Array of property paths to exclude
  - `convertToFullWidth?: boolean`: Whether to convert angle brackets (`<` and `>`) to full-width characters (`＜` and `＞`)

Returns:
- Processed data with the same structure as input

## Error Handling

The library safely handles various edge cases:

```javascript
// Empty object
deepTrimProperties({})  // returns {}

// Empty array
deepTrimProperties([])  // returns []

// null or undefined
deepTrimProperties(null)  // returns null
deepTrimProperties(undefined)  // returns undefined

// Non-object types
deepTrimProperties(123)  // returns 123
deepTrimProperties('  hello  ')  // returns 'hello'
deepTrimProperties(true)  // returns true
```

## Compatibility

- Node.js: >= 10.0.0
- Supports both CommonJS and ES Module formats
- Complete TypeScript type definitions

## Notes

1. Only string type properties are processed
2. Non-object types are returned as is
3. `null` and `undefined` are returned as is
4. Property paths support dot notation (e.g., 'user.address.street')

## Performance Considerations

When processing large objects, especially deeply nested ones, consider:

1. Using the `exclude` option to skip unnecessary properties
2. Processing only required levels
3. Caching results for frequently called scenarios

## Performance Tests

Tested on:
- CPU: Intel i7
- Memory: 16GB
- Node.js: v18.16.1

Results:
- Processing object with 1000 properties: < 100ms
- Processing object with 100 levels of nesting: < 100ms

## License

MIT 

## FAQ

### How are circular references handled?
deep-trim-properties uses WeakMap to handle circular references, ensuring no infinite loops occur.

### How are Symbol properties handled?
The function correctly processes Symbol properties while maintaining their uniqueness.

### How are special characters handled?
- By default, angle brackets (`<` and `>`) are converted to full-width characters (`＜` and `＞`)
- This can be disabled using the `convertToFullWidth: false` option

### How are deeply nested objects handled?
The function processes all levels of objects and arrays recursively, using WeakMap for performance optimization and to avoid duplicate processing. 