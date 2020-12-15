
/*
 * @Author: huangyuhui
 * @Date: 2020-12-02 19:03:16
 * @LastEditors: huangyuhui
 * @LastEditTime: 2020-12-11 11:18:07
 * @Description: 工具函数
 * @FilePath: \scm_frontend_common\src\utils\index.ts
 */

/**
 * 转驼峰
 * @description: 
 * @param {*}
 * @return {*}
 */ 
export { default as camelCaseKeys } from './object/camelCaseKeys/index';

export { forEachObject } from './object';


/**
 * 判断是否为空的数据
 * @description:
 * @param {*}
 * @return {*}
 */

export function isEmpty( data: any ) {
  return data === undefined || data === null || data === '' || Number.isNaN( data );
}