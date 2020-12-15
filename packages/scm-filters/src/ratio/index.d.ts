/**
 * 百分比 / 千分比
 * @description:
 * @param {*}
 * @return {*}
 */
export declare function numberToRatio(radix: 100 | 1000): (val: string | number) => number | "";
/**
 *  比例转为 1
 * @description:
 * @param {*} num
 * @param {*} radix
 * @return {*}
 */
export declare function ratioToNumber(radix?: number): (num: string | number) => number | "";
