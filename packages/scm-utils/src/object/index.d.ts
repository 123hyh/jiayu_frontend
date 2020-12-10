/**
 * 遍历对象
 * @param {*} object
 * @param {*} handler
 */
export declare function forEachObject<T extends Object>(object: T, handler: (key: string, value: any) => {
    [propName: string]: any;
} | void): {
    [propName: string]: any;
};
