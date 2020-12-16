import './transtion.scss';
/**
 * 包装 router-view组件
 * @param { string } componentName 组件name
 * @param { boolean | { exclude: string[] } } keepAlive 是否缓存该组件 | 不需要缓存组件的名称
 * @param { boolean } animated 启用动画
 */
export default function routerView(componentName: string, keepAlive?: {
    exclude: string[];
} | boolean, animated?: boolean): {
    name: string;
    render(h: any): any;
};
