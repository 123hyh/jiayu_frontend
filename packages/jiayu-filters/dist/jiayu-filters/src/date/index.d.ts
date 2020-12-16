/**
* 日期时间格式化
* {{ Date() | formatDate }} -> 2020-09-28 15:54:52
* {{ '2020/11/06 12:30:45' | formatDate('yyyy-MM-dd hh:mm:ss w') }} -> 2020-11-06 12:30:45 星期四
* @param {Date} value 可以被 new Date(value) 解析的时间格式，如 Date()、2020/11/06、2020-11-06 12:00 等
* @param {String} fmt 格式化模版
*/
export declare const formatDate: (value: string | number | Date, fmt?: string) => string;
