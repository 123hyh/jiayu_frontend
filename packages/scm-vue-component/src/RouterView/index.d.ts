import { CreateElement } from 'vue';
/**
 * 包装 router-view组件
 * @param { string } componentName 组件name
 * @param { boolean | { exclude: string[] } } keepAlive 是否缓存该组件 | 不需要缓存组件的名称
 */
export default function routerView(componentName: string, keepAlive?: {
    exclude: string[];
} | boolean): {
    name: string;
    render(h: CreateElement): import("vue").VNode;
};
