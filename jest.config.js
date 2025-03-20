module.exports = {
  // 使用 Babel 转换 JavaScript 文件
  transform: {
    '^.+\\.js$': 'babel-jest',
  },
  // 指定哪些文件需要被转换
  transformIgnorePatterns: [
    '/node_modules/'
  ],
  // 模块路径别名
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1'
  },
  // 测试环境
  testEnvironment: 'node',
  // 测试文件匹配模式
  testMatch: [
    '**/test/**/*.test.js'
  ],
  // 代码覆盖率报告
  collectCoverage: false,
  coverageDirectory: 'coverage',
  collectCoverageFrom: [
    'src/**/*.js',
    '!src/**/*.d.ts'
  ],
  moduleFileExtensions: ['js', 'json', 'node'],
}; 