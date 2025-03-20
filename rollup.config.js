const babel = require('@rollup/plugin-babel');
const resolve = require('@rollup/plugin-node-resolve');
const commonjs = require('@rollup/plugin-commonjs');
const typescript = require('@rollup/plugin-typescript');
const fs = require('fs');

// 读取package.json文件
const pkg = JSON.parse(fs.readFileSync('./package.json', 'utf8'));

module.exports = [
  // CommonJS (for Node) and ES module (for bundlers) build
  {
    input: 'src/index.js',
    output: [
      {
        file: pkg.main,
        format: 'cjs',
        exports: 'named',
        sourcemap: true
      },
      {
        file: pkg.module,
        format: 'es',
        exports: 'named',
        sourcemap: true
      }
    ],
    plugins: [
      resolve(),
      commonjs(),
      babel({
        babelHelpers: 'bundled',
        exclude: 'node_modules/**',
        presets: [
          ['@babel/preset-env', {
            targets: {
              node: '10'
            }
          }]
        ]
      }),
      typescript({ 
        tsconfig: './tsconfig.json',
        declaration: true,
        declarationDir: 'dist'
      }),
      // 在构建完成后复制类型定义文件
      {
        name: 'copy-dts',
        writeBundle() {
          fs.copyFileSync('./src/index.d.ts', './dist/index.d.ts');
          console.log('TypeScript declaration file copied to dist/');
        }
      }
    ]
  }
]; 