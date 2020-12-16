/*
 * @Author: your name
 * @Date: 2020-12-09 23:22:06
 * @LastEditTime: 2020-12-16 13:32:16
 * @LastEditors: huangyuhui
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

const rollup = require('rollup');

async function build(options = {}) {
  // create a bundle
  const bundle = await rollup.rollup(options);

  console.log(bundle.imports); // an array of external dependencies
  console.log(bundle.exports); // an array of names exported by the entry point
  console.log(bundle.modules); // an array of module objects

  // generate code and a sourcemap
  const { code, map } = await bundle.generate(options);
  // or write the bundle to disk
  await bundle.write(options);
}

Promise.all(targets.map(path => {
  return build(generateRollupConfig(path))
}))

// export default targets.map(generateRollupConfig);
