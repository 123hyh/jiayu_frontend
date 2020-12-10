/*
 * @Author: huangyuhui
 * @Date: 2020-12-02 19:45:39
 * @LastEditors: huangyuhui
 * @LastEditTime: 2020-12-04 16:44:14
 * @Description: 过滤器
 * @FilePath: \scm_frontend_common\src\filters\index.ts
 */

/* 比例转换 */
export { numberToRatio } from './ratio';
export { ratioToNumber } from './ratio';

/* date 过滤器 */
export { formatDate } from './date';

/* 布尔值 转 文字  */
export const booleanToText = ( () => {
  const message: any = {
    zh: {
      true: '是',
      false: '否'
    },
    en: {
      true: 'Yes',
      false: 'No'
    }
  };
  return function booleanToText( value: string | boolean | number | null = '', locale: 'zh' | 'en' = 'zh' ) {
    const map = message[ locale ];
    const key = String( !!value );
    return map[ key ];
  };
} )(); 