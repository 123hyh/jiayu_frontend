/*
 * @Author: huangyuhui
 * @Date: 2020-12-15 11:44:09
 * @LastEditors: huangyuhui
 * @LastEditTime: 2020-12-15 13:56:04
 * @Description: scm 国际化
 * @FilePath: \scm_frontend_common\src\locale\index.ts
 */
import Vue from 'vue';
import { cloneDeepWith, set, get } from 'lodash-es';
import { forEachObject } from '../utils';
import zh from './zh';

/**
 * 组件 i18n
 * @description: 
 * @param {*}
 * @return {*}
 */
const messageStore = Vue.observable( {
  ...cloneDeepWith( zh )
} );

/**
 * 获取 组件 i18n message
 * @description: 
 * @param { string } key i8n key
 * @return {*}
 */
export function getScmMsg( key: string ) {
  return  get( messageStore, key ) ?? key;
}

/**
 * 设置 scm 18n
 * @description:
 * @param {any} message
 * @return {*}
 */
export function useLocale(
  message: any,
  cb: ( key: string, value: string ) => string
) {
  forEachObject(
    message,
    ( key, value ) => {
      if ( typeof value === 'object' ) {
        forEachObject( value, ( currentKey, value ) => {
          const splicingKey =  `${key}.${currentKey}`;
          const result = cb( splicingKey, value );
          set(
            messageStore,
            splicingKey,
            result
          );
          return { [ splicingKey ]: result };
        } );
      } else {
        return { [ key ]:cb( key, value ) };
      }
    } );
}
