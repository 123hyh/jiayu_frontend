/*
 * @Author: huangyuhui
 * @Date: 2020-09-22 14:21:55
 * @LastEditors: huangyuhui
 * @LastEditTime: 2020-11-27 13:48:44
 * @Description: 表格组件
 * @FilePath: \customs\src\components\common\Table\index.js
 */

import { cloneDeepWith, debounce } from 'lodash-es'

/**
 * 遍历对象
 * @param {*} object
 * @param {*} handler
 */
function forEachObject(
  object,
  handler = ( _key, _value ) => { }
) {
  let newData = {}
  for ( const key in object ) {
    // eslint-disable-next-line no-prototype-builtins
    if ( object.hasOwnProperty( key ) ) {
      const data = handler( key, object[key] )
      newData = {
        ...newData,
        ...( data ?? {} )
      }
    }
  }
  return newData
}
import './index.scss'
import ColumnComponent from '@/components/common/Table/component/Column'

export default {
  name: 'ScmTable',
  components: {
    ToolBar: () => import( /* webpackChunkName: "ScmTable_ToolBar" */'@/components/common/Table/component/ToolBar' ),
    ColumnComponent,
    OperationComponent: () => import(  /* webpackChunkName: "ScmTable_column_operation" */'./component/Column/Operation' ),
    Pagination: () => import( /* webpackChunkName: "ScmTable_pagination" */ '@/components/common/Table/component/Pagination' )
  },
  props: {
    
    /* 表格配置 */
    schema: {
      type: Object,
      required: true
    },

    /* 表格数据 */
    list: {
      type: Array,
      required: true
    },

    /* 分页总条数 */
    total: {
      type: Number,
      default: 0
    },
    /* 显示 tool bar标识 */
    showToolBar: {
      type: Boolean,
      default: true
    },
    /* 显示 分页标识 */
    showPagination: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      column: []
    }
  },
  computed: {
    /* 修改后的 表格列数据 ( 如果 修改过则 取 当前组件的 column 否则 props中的 )*/
    newColumn: {
      get() {
        return cloneDeepWith( this.column.length ? this.column : this.schema.column )
      },
      set( val ) {
        this.column = val
      }
    }
  },
  methods: {
    /**
     * 排序事件( 防抖 )
     */
    get handlerSort() {
      return debounce(
        function( data ) {
          this.$emit( 'sortChange', data )
        },
        200
      )
    },
    /**
     * 单击行事件( 防抖 )
     */
    get handlerRowClick() {
      return debounce(
        function( data ) {
          this.$emit( 'rowClick', cloneDeepWith( data ) )
        },
        200
      )
    },
    /**
     * 双击行事件( 防抖 )
     */
    get handlerRowDblclick() {
      return debounce(
        function( data ) {
          this.$emit( 'rowDoubleClick', cloneDeepWith( data ) )
        },
        200
      )
    },
    /**
     * 点击复选框事件（防抖）
     */
    get handlerSelectionChange() {
      return debounce(
        function( data ) {
          this.$emit( 'selectionChange', cloneDeepWith( data ) )
        },
        200
      )
    }
  },
  render( h ) {
    return h(
      'div',
      {
        class: [
          'scm-table-container'
        ]
      },
      [
        /* 工具栏 */
        h(
          'component',
          {
            is: this.showToolBar ? 'ToolBar' : '',
            props: {
              schema: this.newColumn
            },
            on: {
              /* 点击刷新按钮事件 */
              refresh: () => {
                this.$emit( 'refresh' )
              },
              /* 工具栏 修改表格 schema  */
              updateSchema: ( data = [] ) => {
                this.newColumn = data
              }
            },
            scopedSlots: {
            /* 筛选插槽 */
              ...forEachObject( this.$scopedSlots, ( key, value ) => {
                const reg = /^tool_bar$/
                if ( reg.test( key ) ) {
                  return { [key]: value }
                }
              } )
            }
          }
        ),
        /* 表格 */
        h(
          'el-table',
          {
            props: {
              data: this.list,
              border: true
            },
            on: {
              /* 点击排序事件 */
              'sort-change': ( { prop, order } = {} ) => {
                this.handlerSort(
                  {
                    field: prop,
                    order: order === 'descending' ? 0 : 1
                  }
                )
              },
              'row-click': ( row ) => {
                this.handlerRowClick( row )
              },
              'row-dblclick': ( row ) => {
                this.handlerRowDblclick( row )
              },
              'selection-change': ( data ) => {
                this.handlerSelectionChange( data )
              }
            }
          },

          [
            /* 索引列 */
            this.schema.index?.visible && h(
              'el-table-column',
              {
                props: {
                  fixed: 'left',
                  type: 'index',
                  label: this.schema.index?.label ? this.$t( this.schema.index?.label ) : '',
                  width: this.schema.index?.width
                }
              }
            ),
            /* 多选列 */
            this.schema.selection?.visible && h(
              'el-table-column',
              {
                props: {
                  fixed: 'left',
                  type: 'selection',
                  label: this.schema.selection?.label,
                  width: this.schema.selection?.width
                }
              }
            ),
            /* schema 列 */
            ...this.newColumn.reduce(
              ( prev, column = {} ) => {
                if ( column.visible !== false ) {
                  prev.push(
                    h(
                      'ColumnComponent',
                      {
                        props: {
                          columnSchema: column,
                          /* 下传插槽 */
                          columnSlots: forEachObject(
                            this.$scopedSlots,
                            ( key, value ) => (
                              { [key]: value }
                            )
                          )
                        }
                      }
                    )
                  )
                }
                return prev
              },
              []
            ),
            /* 操作列 */
            this.$scopedSlots.operation && h(
              'OperationComponent',
              {
                props: {
                  schema: this.schema.operation
                }
              }
            )
          ].filter( Boolean )
        ),
        /* 分页 */
        h( 'component', {
          is: this.showPagination ? 'Pagination' : '',
          props: {
            total: this.total
          },
          on: {
            change: data => {
              this.$emit( 'pageChange', data )
            }
          }
        } )
      ] )
  }
}
