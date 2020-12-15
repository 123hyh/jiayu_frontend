/*
 * @Author: your name
 * @Date: 2020-11-28 10:47:18
 * @LastEditTime: 2020-11-29 20:16:40
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \customs\src\components\common\utils.d.ts
 */

/**
 * 遍历对象
 * @description: 
 * @param { object } object 源对象
 * @param { Function } callback 回调函数
 * @return {*}
 */
export declare const forEachObject: (
  object: { [prop: string]: any },
  callback: ( key: string, value: any ) => any
) => any;