/* eslint-disable no-prototype-builtins */
/*
 * @Author: huangyuhui
 * @Date: 2020-09-28 15:03:25
 * @LastEditors: huangyuhui
 * @LastEditTime: 2020-12-11 17:23:01
 * @Description:
 * @FilePath: \scm_frontend_common\src\vue-component\Form\useDict.js
 */
import { forEachObject } from '@/utils';
import { getCodeDict } from '../index.ts';
import { cloneDeepWith } from 'lodash-es';

/**
 * 查找码值
 * @param {object} schema 表单 schema
 * @param {function} handler 查找到码值的操作回调
 */
function findDict( schema, handler = () => {} ) {
  forEachObject( schema, ( _, value ) => {
    const { card, properties, dict } = value;
    if ( card ) {
      findDict( properties, handler );
    } else if ( dict ) {
      handler( dict, value );
    }
  } );
}

/**
 * 码值 转换成 [ {label: '', value: ''} ]
 * @param {*} response
 */
export  function transformOptions( data = {} ) {
  const list = [];
  forEachObject( data, ( key, value ) => {
    list.push( {
      label: value,
      value: key
    } );
  } );
  return list;
}

/**
 * 远程获取 dict 并设置表单
 * @description:
 * @param {type}
 * @return {type}
 */
export async function setDictValue( dicts, dictValues ) {
  const data = await Promise.allSettled( dicts.map( type => getCodeDict( type ) ) );

  /* 设置 表单的 options */
  data.forEach( ( { status, value = {} }, index ) => {
    if ( status === 'fulfilled' ) {
      const dict = dicts[ index ];
      dictValues[ dict ]?.forEach(
        schemaItem => {
          const optionsData  = transformOptions( value?.data );

          /* schemaItem 如果存在 filterOptions 方法 则传入过滤 返回新的 options*/
          let options = typeof ( schemaItem?.filterOptions ) === 'function'
            ? schemaItem.filterOptions( cloneDeepWith( optionsData ) )
            : cloneDeepWith( optionsData );

          /* 将 返回结果 存入该 schemaItem */
          schemaItem.__resultOptions =  optionsData;

          if ( Array.isArray( options ) === false && process.env.NODE_ENV === 'development' ) {
            console.error( 'schemaItem 的 options 必须为 Array类型！' );
            options = [];
          }

          /* 保证 options 是响应式的 */
          if ( schemaItem?.hasOwnProperty( 'options' ) ) {
            schemaItem.options = options;
          } else {
            console.warn( '请确保 options 响应式！' );

            /* 避免 无响应 */
            schemaItem.options = options;
          }
        }
      );
    }
  } );
}

/**
 * 挑选 码值
 * @param {*} schema
 * @returns {Array<string>}
 */
export function pickDict( schema ) {
  const list = [];
  findDict( schema, ( key ) => {
    list.push( key );
  } );
  return Array.from( new Set( list ) );
}

/**
 * 获取表单字典 键值对
 * @description:
 * @param {type}
 * @returns {{[propName: string]: Array<object>}}
 */
export function getDictSchemaItem( schema ) {
  const obj = {};
  findDict( schema, ( key, value ) => {

    /* 有可能存在 多个 item 同用一个字典 */
    obj[ key ] ?? ( obj[ key ] = [] );
    obj[ key ].push( value );
  } );
  return obj;
}

/**
 * 过滤码值方法
 * @description:
 * @param { Array<string | number | boolean> } keys 需要 过滤掉的值集合
 * @return { Array<{label: string, value: any}> }
 */
export function filterOptions( keys = [] ) {
  const notItems = new Set( keys );
  return ( options = [] ) => options.filter( option => notItems.has( option.value ) === false );
}
