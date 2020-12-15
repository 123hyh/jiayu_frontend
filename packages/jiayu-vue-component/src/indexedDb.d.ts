/*
 * @Author: your name
 * @Date: 2020-11-28 10:28:30
 * @LastEditTime: 2020-11-28 10:46:30
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \customs\src\components\common\indexedDb.d.ts
 */
 type Methods = 'getItem' | 'setItem' |'removeItem';

export declare const useIndexedDb : ( storeName: string ) => Promise<{
  getItem: ( key: string ) => Promise<any>
  getItem: ( key: string, value: any ) => Promise<boolean>
  removeItem: ( key: string ) => Promise<boolean>
}>;

 