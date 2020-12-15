/*
 * @Author: your name
 * @Date: 2020-12-09 23:22:06
 * @LastEditTime: 2020-12-15 23:31:43
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \jiayu_frontend\scripts\prod.js
 */
const path = require('path');
const getPath = (_path) => path.resolve(__dirname, _path);
import generateRollupConfig from '../rollup.config.copy.js';
const targets = [
  getPath('../packages/jiayu-filters'),
  getPath('../packages/jiayu-utils'),
  getPath('../packages/jiayu-directives')
];

export default targets.map(generateRollupConfig);
