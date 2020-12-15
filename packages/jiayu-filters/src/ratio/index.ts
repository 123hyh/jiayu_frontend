/*
 * @Author: huangyuhui
 * @Date: 2020-12-03 15:11:59
 * @LastEditors: huangyuhui
 * @LastEditTime: 2020-12-11 15:11:41
 * @Description: 比例转换
 * @FilePath: \scm_frontend_common\src\filters\ratio\index.ts
 */

 
function isEmpty( val:any ) {
  return val === '' || val === undefined || val === null || Number.isNaN( val ); 
}

/**
 * 百分比 / 千分比
 * @description: 
 * @param {*}
 * @return {*}
 */
export function numberToRatio( radix: 100 | 1000 ) {
  return function numberToRatio( val: string | number ) {
    if ( isEmpty( val ) === false ) {
      let multiplier:string|number = val.toString();
      multiplier = Number( '1' + '0'.repeat( ( multiplier.split( '.' )[ 1 ] ?? '' ).length ) );
      val = Number( val );
      return  Math.round( val * multiplier * radix * multiplier ) / ( multiplier * multiplier );  
    } else {
      return '';
    }
  };
}

/**
 *  比例转为 1
 * @description: 
 * @param {*} num
 * @param {*} radix
 * @return {*}
 */
export function ratioToNumber( radix = 100 | 1000 ) {
  return function ( num:string | number ) {
    if ( isEmpty( num ) ) {
      return 0;
    } else {
      let multiplier:any = num.toString();
      multiplier = Number( '1' + '0'.repeat( ( multiplier.split( '.' )[ 1 ] ?? '' ).length ) );
      num = Number( num );
      return ( num  * multiplier ) / ( radix * multiplier ); 
    }
  };
}