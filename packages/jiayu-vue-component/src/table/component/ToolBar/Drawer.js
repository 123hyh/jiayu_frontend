/*
 * @Author: huangyuhui
 * @Date: 2020-09-25 13:38:01
 * @LastEditors: huangyuhui
 * @LastEditTime: 2020-12-15 13:52:42
 * @Description: 工具栏 抽屉 - 用于 表格字段修改
 * @FilePath: \scm_frontend_common\src\vue-component\table\component\ToolBar\Drawer.js
 */
import { cloneDeepWith } from 'lodash-es';
import { Drawer, Tree, Button, InputNumber } from 'element-ui';
import './Drawer.scss';
import { getScmMsg } from '../../../../locale';
export default {
  props: {
    visible: {
      type: Boolean,
      default: false
    },

    /* 列表字段配置 */
    schema: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      checkeds: []
    };
  },
  watch: {
    schema: {
      handler( val = [] ) {
        this.checkeds = val.reduce( ( prev, item ) => {
          if ( item.visible !== false ) {
            prev.push( item.field );
          }
          return prev;
        }, [] );
      },
      deep: true
    }
  },
  components: {
    ElDrawer: Drawer,
    ElTree: Tree,
    ElButton: Button,
    ElInputNumber: InputNumber
  },
  render( h ) {
    const i18n$T = this?.$t?.bind( this );

    return h(
      'el-drawer',
      {
        props: {
          visible: this.visible,
          direction: 'rtl',
          'close-on-press-escape': false,
          'destroy-on-close': true,
          wrapperClosable: false,
          'custom-class': 'scm-tool-bar-drawer',
          size: '400px'
        },
        on: this.$listeners
      },
      [

        /* 标题 */
        h(
          'p',
          {
            slot: 'title'
          },
          getScmMsg( 'table.selectField' )
        ),

        /* 字段显示 */
        h( 'el-tree', {
          ref: 'tree',
          on: {
            'check-change': ( checkData, isCheck ) => {
              this.$set( checkData, 'visible', isCheck );
            }
          },
          props: {
            data: cloneDeepWith( this.schema ),
            draggable: true,
            'node-key': 'field',
            'show-checkbox': true,
            'default-expand-all': true,
            'default-checked-keys': this.checkeds,
            'allow-drop': ( draggingNode, dropNode, type ) => {
              return true;
            }
          },
          scopedSlots: {
            default: ( { node, data } ) => {
              return h(
                'div',
                {
                  class: [ 'tree-row-block' ]
                },
                [

                  /* 固定锁按钮 */
                  h(
                    'div',
                    {
                      class: [ 'lock-icon-block' ],
                      on: {
                        click: e => {
                          e.stopPropagation();
                          const { fixed } = data;
                          if ( fixed ) {
                            data.fixed = '';
                          } else {
                            this.$set( data, 'fixed', 'left' );
                          }
                        }
                      }
                    },
                    [
                      h( 'i', {

                        /* 锁样式  */
                        class: [
                          data.fixed
                            ? 'el-icon-lock is-fixed'
                            : 'el-icon-unlock'
                        ]
                      } )
                    ]
                  ),

                  /* 文字 */
                  h( 'div', { class: [ 'field-label' ] }, i18n$T ? i18n$T( node.label ) :  node.label ),

                  /* 排序 */
                  h( 'div', [
                    h( 'i', {
                      class: [ 'el-icon-sort', data.sortable ? 'is-sort' : '' ],
                      on: {
                        click: e => {
                          e.stopPropagation();
                          this.$set( data, 'sortable', !data.sortable );
                        }
                      }
                    } )
                  ] ),

                  /* 宽度设置 */
                  h( 'div',
                    {
                      class: [ 'setting-width-wrap' ]
                    },
                    [
                      h( 'label', 'W: ' ),
                      h( 'ElInputNumber', {
                        props: {
                          disabled: data.visible === false,
                          size: 'mini',
                          controls: false,
                          value: data.width ?? ''
                        },
                        on: {
                          input:( v ) => {
                            this.$set( data, 'width', v );
                          }
                        }
                      } )
                    ]
                  )
                ]
              );
            }
          },
          slot: 'default'
        } ),

        /* 底部按钮 */
        h(
          'div',
          {
            class: [ 'scm-tool-bar-drawer-block' ],
            slot: 'default'
          },
          [

            /* 取消 */
            h(
              'el-button',
              {
                on: {
                  click: e => {
                    e.stopPropagation();
                    this.$emit( 'update:visible' );
                  }
                }
              },
              getScmMsg( 'button.cancel' )
            ),

            /* 保存 */
            h(
              'el-button',
              {
                props: {
                  type: 'primary'
                },
                on: {
                  click: e => {
                    e.stopPropagation();
                    this.$emit(
                      'updateSchema',
                      cloneDeepWith( this.$refs.tree.children )
                    );
                  }
                }
              },
              getScmMsg( 'button.save' )
            )
          ]
        )
      ]
    );
  }
};
