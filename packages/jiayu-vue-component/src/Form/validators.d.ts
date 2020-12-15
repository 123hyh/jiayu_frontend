/*
 * @Author: huangyuhui
 * @Date: 2020-12-03 13:58:44
 * @LastEditors: huangyuhui
 * @LastEditTime: 2020-12-03 14:08:19
 * @Description: 
 * @FilePath: \customs\src\components\common\Form\validators.d.ts
 */
import { Rules, ValidateSource, ValidateOption } from 'async-validator'

type validator = (
  rule: Rules,
  value: any,
  callback: (error: string | string[] | void) => void,
  source?: ValidateSource,
  options?: ValidateOption,
) => void;

/**
 * 校验整数类型表单值
 * @description:
 * @param {*}
 */
export declare const checkInteger: () => validator

/**
 * 校验整数或者小数
 * @description:
 * @param {number} decimal 保留小数的位数(默认两位小数)
 * @return {*}
 */

export declare const checkIntegerDecimal: (decimal = 2) => validator