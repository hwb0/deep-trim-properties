/**
 * deepTrimProperties 函数的测试
 */

const deepTrimProperties = require('../src/index');

describe('deepTrimProperties', () => {
  test('应该处理简单字符串', () => {
    expect(deepTrimProperties(' hello ')).toBe('hello');
    expect(deepTrimProperties(' <world> ')).toBe('＜world＞');
  });

  test('应该处理非字符串值并保持不变', () => {
    expect(deepTrimProperties(123)).toBe(123);
    expect(deepTrimProperties(null)).toBe(null);
    expect(deepTrimProperties(undefined)).toBe(undefined);
    expect(deepTrimProperties(true)).toBe(true);
  });

  test('应该处理对象中的字符串属性', () => {
    const input = {
      name: ' John Doe ',
      age: 30,
      email: ' john.doe@example.com '
    };
    
    const expected = {
      name: 'John Doe',
      age: 30,
      email: 'john.doe@example.com'
    };
    
    expect(deepTrimProperties(input)).toEqual(expected);
  });

  test('应该处理数组中的字符串元素', () => {
    const input = [' apple ', ' banana ', ' cherry '];
    const expected = ['apple', 'banana', 'cherry'];
    
    expect(deepTrimProperties(input)).toEqual(expected);
  });

  test('应该递归处理嵌套对象和数组', () => {
    const input = {
      user: {
        name: ' John Doe ',
        contacts: [
          { email: ' john.doe@example.com ' },
          { email: ' john.doe@gmail.com ' }
        ]
      },
      tags: [' tag1 ', ' tag2 ']
    };
    
    const expected = {
      user: {
        name: 'John Doe',
        contacts: [
          { email: 'john.doe@example.com' },
          { email: 'john.doe@gmail.com' }
        ]
      },
      tags: ['tag1', 'tag2']
    };
    
    expect(deepTrimProperties(input)).toEqual(expected);
  });

  test('应该使用数组形式排除指定的属性不进行trim处理（老式API）', () => {
    const input = {
      name: ' John Doe ',
      bio: ' Developer '
    };
    
    const expected = {
      name: ' John Doe ',
      bio: 'Developer'
    };
    
    expect(deepTrimProperties(input, ['name'])).toEqual(expected);
  });

  test('应该使用对象形式排除指定的属性不进行trim处理（新式API）', () => {
    const input = {
      name: ' John Doe ',
      bio: ' Developer '
    };
    
    const expected = {
      name: ' John Doe ',
      bio: 'Developer'
    };
    
    expect(deepTrimProperties(input, { exclude: ['name'] })).toEqual(expected);
  });

  test('应该支持点号表示法的属性排除', () => {
    const input = {
      user: {
        name: ' John Doe ',
        profile: {
          bio: ' Developer '
        }
      }
    };
    
    const expected = {
      user: {
        name: ' John Doe ',
        profile: {
          bio: 'Developer'
        }
      }
    };
    
    expect(deepTrimProperties(input, { exclude: ['user.name'] })).toEqual(expected);
  });

  test('应该支持通配符排除', () => {
    const input = {
      user: {
        name: ' John Doe ',
        email: ' john@example.com ',
        profile: {
          bio: ' Developer '
        }
      }
    };
    
    const expected = {
      user: {
        name: ' John Doe ',
        email: ' john@example.com ',
        profile: {
          bio: ' Developer '
        }
      }
    };
    
    expect(deepTrimProperties(input, { exclude: ['user.*'] })).toEqual(expected);
  });

  test('应该将半角 < 和 > 替换为全角', () => {
    const input = {
      html: '<div>Hello</div>',
      text: 'This is a <sample>'
    };
    
    const expected = {
      html: '＜div＞Hello＜/div＞',
      text: 'This is a ＜sample＞'
    };
    
    expect(deepTrimProperties(input)).toEqual(expected);
  });

  test('应该根据选项禁用半角到全角的转换', () => {
    const input = {
      html: '<div>Hello</div>',
      text: ' This is a <sample> '
    };
    
    const expected = {
      html: '<div>Hello</div>',
      text: 'This is a <sample>'
    };
    
    expect(deepTrimProperties(input, { convertToFullWidth: false })).toEqual(expected);
  });

  // 添加边界情况测试
  describe('边界情况处理', () => {
    test('应该正确处理空对象', () => {
      expect(deepTrimProperties({})).toEqual({});
    });

    test('应该正确处理空数组', () => {
      expect(deepTrimProperties([])).toEqual([]);
    });

    test('应该正确处理 null', () => {
      expect(deepTrimProperties(null)).toBeNull();
    });

    test('应该正确处理 undefined', () => {
      expect(deepTrimProperties(undefined)).toBeUndefined();
    });

    test('应该正确处理非对象类型', () => {
      expect(deepTrimProperties(123)).toBe(123);
      expect(deepTrimProperties('  hello  ')).toBe('hello');
      expect(deepTrimProperties(true)).toBe(true);
      expect(deepTrimProperties(new Date())).toBeInstanceOf(Date);
    });

    test('应该正确处理循环引用', () => {
      const obj = { name: '  John  ' };
      obj.self = obj;
      const result = deepTrimProperties(obj);
      expect(result.name).toBe('John');
      expect(result.self).toBe(result);
    });

    test('应该正确处理 Symbol 属性', () => {
      const sym = Symbol('test');
      const obj = {
        [sym]: '  test  ',
        name: '  John  '
      };
      const result = deepTrimProperties(obj);
      expect(result[sym]).toBe('test');
      expect(result.name).toBe('John');
    });
  });

  // 添加性能测试
  describe('性能测试', () => {
    test('应该能够处理大型对象', () => {
      const largeObj = {};
      for (let i = 0; i < 1000; i++) {
        largeObj[`key${i}`] = `  value${i}  `;
      }
      const start = Date.now();
      const result = deepTrimProperties(largeObj);
      const end = Date.now();
      expect(end - start).toBeLessThan(100); // 应该在100ms内完成
      expect(result.key0).toBe('value0');
      expect(result.key999).toBe('value999');
    });

    test('应该能够处理深层嵌套对象', () => {
      let deepObj = { value: '  test  ' };
      for (let i = 0; i < 100; i++) {
        deepObj = { nested: deepObj };
      }
      const start = Date.now();
      const result = deepTrimProperties(deepObj);
      const end = Date.now();
      expect(end - start).toBeLessThan(100); // 应该在100ms内完成
      let current = result;
      for (let i = 0; i < 100; i++) {
        current = current.nested;
      }
      expect(current.value).toBe('test');
    });
  });
}); 