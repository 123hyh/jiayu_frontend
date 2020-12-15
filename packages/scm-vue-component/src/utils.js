/*
 * @Author: huangyuhui
 * @Date: 2020-09-28 15:40:35
 * @LastEditors: huangyuhui
 * @LastEditTime: 2020-11-27 17:47:50
 * @Description: 公共组件 工具 函数
 * @FilePath: \customs\src\components\common\utils.js
 */

/**
 * 遍历对象
 * @param {*} object
 * @param {*} handler
 */
export function forEachObject(
  object,
  handler = ( _key, _value ) => { }
) {
  let newData = {};
  for ( const key in object ) {
    // eslint-disable-next-line no-prototype-builtins
    if ( object.hasOwnProperty( key ) ) {
      const data = handler( key, object[ key ] );
      newData = {
        ...newData,
        ...( data ?? {} )
      };
    }
  }
  return newData;
}

/**
 * 获取类型
 * @description:
 * @param {type}
 * @return {type}
 */
export function getType( val ) {
  return Object.prototype.toString.call( val ).slice( 8, -1 );
}

/**
 * 指定dom节点 向下查找指定节点
 * @description: 
 * @param { HTMLElement } node 开始查找的节点
 * @param {(node: HTMLElement) => boolean} condition 条件回调方法
 * @return {HTMLElement | undefined}
 */
export function findDomNode( node, condition ) {
  return [ ...node.children ].reduce( ( prev, item ) => {
    const target = condition( item );
    if ( target ) {
      prev.push( item );
    } else {
      prev.push( ...findDomNode( item, condition ) );
    }
    return prev;
  }, [] );
}