/*
 * @Author: your name
 * @Date: 2020-12-09 23:22:06
 * @LastEditTime: 2020-12-10 16:04:24
 * @LastEditors: huangyuhui
 * @Description: In User Settings Edit
 * @FilePath: \jiayu_frontend\scripts\prod.js
 */
const path = require('path');
const getPath = _path => path.resolve(__dirname, _path);

import json from '@rollup/plugin-json';
import babel from '@rollup/plugin-babel';
import ts from 'rollup-plugin-typescript2';
import sass from 'rollup-plugin-sass';

const extensions = ['.js', '.ts', '.tsx'];

// ts
const tsPlugin = ts({
  tsconfig: getPath('../tsconfig.json'), // 导入本地ts配置
  extensions,
  tsconfigOverride: {
    compilerOptions: {
      baseUrl: getPath('../packages/scm-utils'),
      declaration: true,
    },
  },
});

export default {
  input: getPath('../packages/scm-utils/src/index.ts'),
  output: [
    {
      file: getPath('../dist/index.js'),
      format: 'esm',
    },
  ],
  plugins: [
    json(),
    tsPlugin,
    babel({
      exclude: 'node_modules/**',
      babelHelpers: 'bundled',
    }),
    sass({
      insert: true
    }),
  ],
};
