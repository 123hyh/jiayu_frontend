/*
 * @Author: your name
 * @Date: 2020-12-09 23:22:06
 * @LastEditTime: 2020-12-15 20:32:50
 * @LastEditors: huangyuhui
 * @Description: In User Settings Edit
 * @FilePath: \jiayu_frontend\scripts\prod.js
 */
const path = require('path');
const execa = require('execa')

const getPath = _path => path.resolve(__dirname, _path);

const targets = [
  getPath('../packages/jiayu-filters/src'),
  getPath('../packages/jiayu-utils/src'),
]
run(targets)
async function  run(targets) {
  const data = await Promise.all(
    targets.map(
      item => execa(
        'rollup',
        [
          '--config ../rollup.config.js',
          '--environment',
        ]
      )
    )
  )
}
