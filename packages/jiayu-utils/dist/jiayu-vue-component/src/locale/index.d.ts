/**
 * 获取 组件 i18n message
 * @description:
 * @param { string } key i8n key
 * @return {*}
 */
export declare function getScmMsg(key: string): any;
/**
 * 设置 scm 18n
 * @description:
 * @param {any} message
 * @return {*}
 */
export declare function useLocale(message: any, cb: (key: string, value: string) => string): void;
