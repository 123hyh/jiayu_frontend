/*
 * @Author: huangyuhui
 * @Date: 2020-11-05 11:38:41
 * @LastEditors: huangyuhui
 * @LastEditTime: 2020-12-02 15:33:03
 * @Description: 表单自定义校验方法
 * @FilePath: \customs\src\components\common\Form\validators.js
 */
import { debounce } from 'lodash-es';

/**
 * 判断空值
 * @description:
 * @param {*} value
 * @return {*}
 */
function isEmpty( value ) {
  return value === '' || value === undefined || value === null;
}

/**
 * 校验整数类型表单值
 * @description:
 * @param {*}
 * @return {*}
 */
export function checkInteger() {
  return debounce( function checkInteger( rules, value, callback ) {
    const { required = false } = rules;
    const reg = /^-?[1-9]\d*$/;
    if ( required ) {
      callback( !reg.test( value ) ? new Error( '请输入整数' ) : undefined );
    } else {
      callback( isEmpty( value ) === false && !reg.test( value ) ? new Error( '请输入整数' ) : undefined );
    }
  }, 150 );
}

/**
 * 校验整数或者小数
 * @description:
 * @param {number} decimal 保留小数的位数(默认两位小数)
 * @return {*}
 */
export function checkIntegerDecimal( decimal = 2 ) {
  const reg = new RegExp( `^([-+]?[0-9]+[\\d]*(.[0-9]{1,${ decimal }})?)$` );
  function check( value, callback ) {
    if ( !/\d+/.test( value ) ) {
      callback( new Error( '请输入数字' ) );
    } else if ( !reg.test( value ) ) {
      callback( new Error( `不允许超过${ decimal } 位小数` ) );
    } else {
      callback();
    }
  }
  return debounce( function checkIntegerDecimal( rules, value, callback ) {
    const { required = false } = rules;
    if ( required ) {
      check( value, callback );
    } else {
      if ( isEmpty( value ) ) {
        callback();
      } else {
        check( value, callback );
      }
    }
  }, 150 );
}
