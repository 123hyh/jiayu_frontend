/*
 * @Author: your name
 * @Date: 2020-12-09 23:22:06
 * @LastEditTime: 2020-12-16 13:33:31
 * @LastEditors: huangyuhui
 * @Description: In User Settings Edit
 * @FilePath: \jiayu_frontend\rollup.config.copy.js
 */
const path = require('path');
const getPath = (_path) => path.resolve(__dirname, _path);
import json from '@rollup/plugin-json';
import babel from '@rollup/plugin-babel';
import tsPlugin from 'rollup-plugin-typescript2';
// import sass from 'rollup-plugin-sass';
const extensions = ['.js', '.ts', '.tsx'];
export default (packPath) => {
  return {
    input: `${packPath}/src/index.ts`,
    output: {
      file: `${packPath}/dist/index.js`,
      format: 'esm',
    },
    plugins: [
      json(),
      tsPlugin({
        // 导入本地ts配置
        tsconfig: path.resolve(process.cwd(), 'tsconfig.json'),
        extensions,
        tsconfigOverride: {
          compilerOptions: {
            declaration: true,
          },
        },
      }),
      babel({
        exclude: 'node_modules/**',
        babelHelpers: 'bundled',
      }),
      /* sass({
        insert: true,
      }), */
    ],
  };
};
