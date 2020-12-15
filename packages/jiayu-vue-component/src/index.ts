/*
 * @Author: your name
 * @Date: 2020-12-02 23:58:52
 * @LastEditTime: 2020-12-10 17:29:57
 * @LastEditors: huangyuhui
 * @Description: vue 公共组件
 * @FilePath: \scm_frontend_common\src\vue-component\index.ts
 */


/**
 * 组件size 
 * @description: 
 * @param {*}
 * @return {*}
 */
let _SIZE = 'small';

/**
 * 码值 api 接口
 * @description: 
 * @param {string} dictKeyword
 * @return {*}
 */
let _getCodeDict: ( dictKeyword: string ) => Promise<any> | any[] = ( keyword: string ) => [];

export function useScmComponent( options: {
    size: 'medium' | 'small' | 'mini',
    dictRequest: ( dictKeyword: string ) => Promise<any> | any[]
  } ) {
  return  {
    install: function useScmComponent( _Vue: any ) {
      const { size = 'small', dictRequest } = options ?? {};
      _SIZE = size;
      if ( typeof dictRequest === 'function' ) {
        _getCodeDict = dictRequest;
      }
    }
  };
} 

export function getSize() {
  return _SIZE;
}
export function getCodeDict( keyword:string ) {
  return _getCodeDict( keyword );
}
