/*
 * @Author: huangyuhui
 * @Date: 2020-09-22 14:21:55
 * @LastEditors: huangyuhui
 * @LastEditTime: 2020-12-10 16:34:26
 * @Description: 基础表格组件
 * @FilePath: \scm_frontend_common\src\vue-component\table\BaseTable.js
 */

import { cloneDeepWith, debounce } from 'lodash-es';
import { getSize } from '../index';
import './BaseTable.scss';
import ColumnComponent from './component/Column/index.js';
import OperationComponent from './component/Column/Operation.js'; 
import { forEachObject } from '../utils';
import { Table, TableColumn, Checkbox, Radio } from 'element-ui';

export default {
  name: 'ScmTable',
  inheritAttrs: false,
  components: {
    ElTable: Table,
    ElTableColumn: TableColumn,
    ElCheckbox: Checkbox,
    ElRadio: Radio,
    ColumnComponent,
    OperationComponent
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

    /* 表格高度 */
    height: {
      type: String
    },

    /* 行选择 自定义回调 */
    selectionMethod: Function,

    /* 点击行 是否触发选择状态 */
    clickRowSelected: Boolean
  },
 
  methods: {

    /**
     * 排序事件( 防抖 )
     */
    get handlerSort() {
      return debounce( function ( data ) {
        this.$emit( 'sortChange', data );
      }, 200 );
    },

    /**
     * 单击行事件( 防抖 )
     */
    get handlerRowClick() {
      return debounce( function ( data ) {
        this.$emit( 'rowClick', cloneDeepWith( data ) );
      }, 200 );
    },

    /**
     * 双击行事件( 防抖 )
     */
    get handlerRowDblclick() {
      return debounce( function ( data ) {
        this.$emit( 'rowDoubleClick', cloneDeepWith( data ) );
      }, 200 );
    },

    /**
     * 点击复选框事件（防抖）
     */
    get handlerSelectionChange() {
      return debounce( function ( data ) {
        this.$emit( 'selectionChange', cloneDeepWith( data ) );
      }, 200 );
    }
  },
  data() {
    return {

      /* 选中的多选 */
      selections: []

    };
  },
  computed: {

    /* 向外暴露 */
    $selectData: {
      catch: false,
      get() {
        return cloneDeepWith( this.selections );
      },
      set( v = [] ) {
        this.selections = v;
      }
    }
  },
  render( h ) {
    const i18n$T = this?.$t?.bind( this );

    return h(
      'div',
      {
        class: [ 'scm-table-container' ]
      },
      [

        /* 表格 */
        h(
          'el-table',
          {
            ref:'Table',
            props: {
              size: getSize(),
              data: this.list,
              border: false,
              height: this.height,
              'cell-class-name': e => {
                const index = this.selections.findIndex( item => item === e.row );
                if ( ~index ) {
                  return 'scm-table-cell-checked';
                }
              },
              ...this.$attrs,
              rowClassName: e => {
                const { rowIndex } = e;

                /* 编辑时添加行样式*/
                return `scm-table_row_${rowIndex}`;
              }
            },
            on: {

              /* 点击排序事件 */
              'sort-change': ( { prop, order } = {} ) => {

                /* 点击排序清空 当前选中的 数据 */
                this.$selectData = [];
                this.handlerSort( {
                  field: prop,
                  order: order === 'descending' ? 0 : 1
                } );
              },
              'row-click': ( () => {
                return ( row, _, event ) => {
                  
                  this.handlerRowClick( cloneDeepWith( row ) );
                  const { target } = event;
                  const containsClass = [ 'el-checkbox__inner', 'el-radio__label', 'el-radio__inner' ];

                  /* 单击列头 选择 无效 */
                  if (
                    this.clickRowSelected &&
                      containsClass.every( item => target.classList.contains( item ) === false ) && 
                    ( this.selectionMethod ? this.selectionMethod( row ) !== true : true )
                  ) {
                    
                    if ( 
                      this.selections.some( item => item === row ) === false 
                    ) {
                      if ( this.schema.selection.isMultiple === true ) {
                        this.selections.push( row );
                      } else {
                        this.selections = [ row ];
                      }
                    } else {
                      this.selections = this.selections.filter( item => item !== row );
                    }
                    
                    this.$emit( 'select', {
                      isSelect: this.selections.some( item => item === row ),
                      row: row,
                      selects: this.selections
                    } );
                  }
                };
              } )(),
              'row-dblclick': row => {
                this.handlerRowDblclick( cloneDeepWith( row ) );
              },
              'selection-change': data => {
                
                this.handlerSelectionChange( cloneDeepWith( data ) );
              },
              select: ( ...args ) => this.$emit( 'select', ...args )
            }
          },

          [

            /* 索引列 */
            this.schema.index &&
            this.schema.index.visible !== false &&
            h( 'el-table-column', {
              props: {
                fixed: 'left',
                type: 'index',
                align: this?.schema?.index?.align ?? 'center',
                label: this?.schema?.index?.label
                  ? i18n$T ? i18n$T( this?.schema?.index?.label ) : this?.schema?.index?.label ?? ''
                  : '',
                width: this?.schema?.index?.width
              }
            } ),

            /* 多选列 */
            /* this.schema.selection && this.schema.selection.visible !== false && h(
              'el-table-column',
              {
                props: {
                  align: this.schema.selection.align ?? 'center',
                  fixed: 'left',
                  type: 'selection',
                  label: this.schema.selection?.label,
                  width: this.schema.selection?.width
                }
              }
            ), */
            /* 自定义多选列 */
            this.schema.selection &&
            this.schema.selection.visible !== false &&
            h( 'el-table-column', {
              props: {
                align: this.schema.selection.align ?? 'center',
                fixed: 'left',
                width: this.schema.selection?.width
              },
              scopedSlots: {
                header: () => {
                  return this.schema.selection.isMultiple ?? true
                    ? h( 'el-checkbox', {
                      ref: 'allCheckbox',
                      props: {
                        indeterminate:
                          this.selections.length > 0 &&
                          this.selections.length < this.list.length,
                        value: this.selections.length === this.list.length
                      },
                      on: {
                        change: ( isChecked = false ) => {
                          let result = [];
                          if ( isChecked ) {

                            /* 自定义 筛选 条件 */
                            if ( this.selectionMethod ) {
                              // eslint-disable-next-line no-multi-assign
                              result = this.selections = this.list.filter(
                                row => !this.selectionMethod( row )
                              );
                            } else {
                              // eslint-disable-next-line no-multi-assign
                              result = this.selections = this.list;
                            }
                          } else {
                            this.selections = [];
                          }
                          this.$emit( 'selectAll', isChecked ? result : [] );

                          /* 如果 true 修改其选中状态 */
                          if ( isChecked ) {
                            this.$refs.allCheckbox.selfModel = true;
                          }
                        }
                      }
                    } )
                    : h( '' );
                },
                default: props => {
                  return this.schema.selection.isMultiple ?? true
                    ? h(
                      'el-checkbox',
                      {
                        ref: `columnCheckbox-${props.$index}`,
                        class: [ 'scm-table-column-checkbox' ],
                        props: {
                          value: this.selections,
                          label: props.row,
                          align: 'center',
                          disabled: this.selectionMethod
                            ? this.selectionMethod( props.row )
                            : false
                        },
                        on: {
                          input: e => {
                            this.selections = e;
                          },
                          change: ( isSelect = false ) => {
                            this.$emit( 'select', {
                              isSelect,
                              row: props.row,
                              selects: this.selections
                            } );
                          }
                        }
                      },
                      '  '
                    )
                    : h(
                      'el-radio',
                      {
                        props: {
                          label: props.row,
                          value: this.selections[ 0 ],
                          disabled: this.selectionMethod
                            ? this.selectionMethod( props.row )
                            : false
                        },
                        on: {
                          input: val => {
                            if ( this.selections.length ) {
                              this.selections = [];
                            }
                            this.selections.push( val );
                            this.$emit( 'select', {
                              isSelect: true,
                              row: props.row
                            } );
                          }
                        }
                      },
                      '  '
                    );
                }
              }
            } ),

            /* 张开 */
            this.schema.expand &&
            this.schema.expand.visible !== false &&
            h( 'el-table-column', {
              props: {
                type: 'expand',
                fixed: 'left',
                label: this.schema.expand?.label,
                width: this.schema.expand?.width
              },
              scopedSlots: {
                default: props => {
                  return this.$scopedSlots.expand( props );
                }
              }
            } ),

            /* schema 列 */
            ...( this.schema?.column ?? [] ).reduce( ( prev, column = {}, index ) => {
              if ( column.visible !== false ) {
                prev.push(
                  h( 'ColumnComponent', {
                    key: `${column.field}-${index}`,
                    props: {
                      columnSchema: column,

                      /* 下传插槽 */
                      columnSlots: forEachObject(
                        this.$scopedSlots,
                        ( key, value ) => {
                          const reg = /^field_(.)/;
                          if ( reg.test( key ) ) {
                            return {
                              [ key.replace( reg, '$1' ) ]: value
                            };
                          }
                        }
                      )
                    },
                    on: {

                      /* 列 修改数据 点击确定后 事件 */
                      updateColumn: this.$emit.bind( this, 'updateColumn' )
                    }
                  } )
                );
              }
              return prev;
            }, [] ),

            /* 操作列 */
            this.$scopedSlots.operation &&
            h( 'OperationComponent', {
              props: {
                schema: this.schema.operation
              }
            } )
          ].filter( Boolean )
        )
      ]
    );
  }
};
