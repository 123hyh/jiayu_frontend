/*
 * @Author: huangyuhui
 * @Date: 2020-12-04 16:18:16
 * @LastEditors: huangyuhui
 * @LastEditTime: 2020-12-04 16:19:03
 * @Description: 
 * @FilePath: \scm_frontend_common\src\utils\object\index.ts
 */

/**
 * 遍历对象
 * @param {*} object
 * @param {*} handler
 */
export function forEachObject<T extends Object>(
  object: T,
  handler: ( key:string, value: any )=>{[propName:string]: any} | void
) {
  let newData:{[propName:string]: any} = {};
  for ( const key in object ) {
    if ( Object.prototype.hasOwnProperty.call( object, key )  ) {
      const data = handler( key, object[ key ] );
      newData = {
        ...newData,
        ...( data ?? {} )
      };
    }
  }
  return newData;
}