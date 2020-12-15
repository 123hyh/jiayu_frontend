/*
 * @Author: your name
 * @Date: 2020-11-15 14:34:19
 * @LastEditTime: 2020-12-15 14:40:35
 * @LastEditors: huangyuhui
 * @Description: In User Settings Edit
 * @FilePath: \scm_frontend_common\src\vue-component\RouterView\index.ts
 */
import './transtion.scss';
let id = 0;

function generateBox( h: any ) {
  return h(
    'router-view',
    {
      class: [ 'scm-paved-wrapper' ]
    }
  );
}

/**
 * 包装 router-view组件
 * @param { string } componentName 组件name
 * @param { boolean | { exclude: string[] } } keepAlive 是否缓存该组件 | 不需要缓存组件的名称
 * @param { boolean } animated 启用动画
 */

export default function routerView(
  componentName: string,
  keepAlive: { exclude: string[] } | boolean = true,
  animated = true
) {
  return {
    name: componentName || `RouterWrapper_${id++}`,
    render( h: any ) {
      return h(
        'div',
        [
          h(
            'transition',
            {
              props: {
                name:  animated ? 'side' : undefined
              }
            },
            [
              keepAlive
                ? h(
                  'keep-alive',
                  {
                    props: {
                      exclude: typeof keepAlive === 'object' ? keepAlive.exclude : undefined
                    }
                  },
                  [
                    generateBox( h )
                  ]
                )
                : generateBox( h )
            ]
          )
        ]
      );
    }
  };
}
