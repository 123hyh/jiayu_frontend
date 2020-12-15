/*
 * @Author: huangyuhui
 * @Date: 2020-10-16 16:00:46
 * @LastEditors: huangyuhui
 * @LastEditTime: 2020-12-15 15:12:43
 * @Description: 路由 tabs 组件
 * @FilePath: \scm_frontend_common\src\vue-component\Tbas\index.js
 */
import './index.scss';
import { getType } from '../utils';

export default {
  name: 'ScmTabs',
  props: {

    /**
     * tabs list
     * @example list = [
     *    {
     *      label: '显示的文字',
     *      path: 'routePath',
     *      disabled: '是否禁用 (Boolean)',
     *      reg: '当有该参数时自行匹配高亮，否则按照 path （regexp）'
     *    }
     * ]
     */
    list: {
      type: Array,
      required: true
    }
  },
  render( h ) {
    return h(
      'ul',
      {
        class: [ 'scm-tabs-wrapper' ]
      },
      this.list.map( ( { label = '', path = '', disabled = false, reg } = {}, index ) => {
        return h(
          'li',
          {
            class: [
              'scm-tabs-item',
              disabled ? 'is-disabled' : '',

              /* 如果 有 reg 参数 则匹配该参数 否则 匹配 path */
              { 'is-active': getType( reg ) === 'RegExp' && reg.test( path ) || this.$route.path === path }
            ],
            key: path + index,
            on: {
              click: e => {
                e.stopPropagation();
                if ( disabled !== true ) {
                  this.$emit( 'click', path );
                }
              }
            }
          },
          [
            ( () => {
              const generate = ( label ) => this.$t ? this.$t( label ) : label;
              return disabled
                ? generate( label )
                : h(
                  'router-link',
                  {
                    class: [ 'scm-tabs-item-link' ],
                    props: {
                      to: path,
                      
                      /* 修复replace 引发的bug */
                      replace: path !== this.$route.path 
                    }
                  },
                  generate( label )
                );
            } )()
          ]
        );
      } )
    );
  }
};
