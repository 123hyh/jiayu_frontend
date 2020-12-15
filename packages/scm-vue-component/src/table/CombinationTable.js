/*
 * @Author: huangyuhui
 * @Date: 2020-09-23 17:07:25
 * @LastEditors: huangyuhui
 * @LastEditTime: 2020-12-09 14:17:38
 * @Description: 组合表格( 查询栏 、工具、表格 、分页 )
 * @FilePath: \scm_frontend_common\src\vue-component\table\CombinationTable.js
 */
import QueryBar from '../QueryBar/index.js';
import ToolBar from './component/ToolBar/index.js';
import Pagination from './component/Pagination/index.js';
import BaseTable from './BaseTable.js';
import { forEachObject } from '../utils';
import { useIndexedDb } from '../indexedDb';
import { cloneDeepWith } from 'lodash-es';
function addSuffix( str ) {
  const date = Date.now();
  return `${date}_combinationTable_${str}`;
}

/* 当前排序数据 */
const sortMap = new Map();

export default {
  name: 'ScmCombinationTable',
  inheritAttrs:false,
  destroy() {
    const uid = this._uid;
    sortMap.delete( uid );
  },
  methods: {

    /**
     * 初始化db 数据
     * @description:
     * @param {*}
     * @return {*}
     */
    async initDbData() {
      if ( this.entityName ) {
        this.dbResult = Object.freeze( await useIndexedDb( 'CombinationTable' ) );
        const db = await this.dbResult;
        const result = await db.getItem( this.entityName );
        if ( result ) {
          this.column = result;
        } else {
          this.column = this.tableSchema.column;
        }
      } else {
        this.column = this.tableSchema.column;
      }
      this.isLoadDbData = true;
    },

    /**
     * 注册刷新组件参数
     */
    _registerRefresh() {
      this.$data._refreshMap =  {
        QueryBar: addSuffix( 'queryBar' ),
        BaseTable: addSuffix( 'baseTable' ),
        Pagination: addSuffix( 'pagination' )
      };
    },

    /* 刷新组件 */
    refreshComponent( updateKeys = [ 'QueryBar', 'BaseTable', 'Pagination' ] ) {
      const refreshData = this.$data._refreshMap;

      /* 在刷新表格时 把当前组件 的 sortData 数据清理 */
      if ( updateKeys.includes( 'BaseTable' ) ) {
        sortMap.set( this._uid, {} );
      }
      if ( refreshData ) {
        const r = refreshData;
        for ( const item of updateKeys ) {
          r[ item ] = addSuffix( item );
        }
      }
    },

    /**
     * 重置表格 top left 值
     * @description: 分页变化时触发
     * @param {*}
     * @return {*}
     */
    _resetTableContainer() {
      const target = this.$refs?.BaseTable?.$refs?.Table?.$refs.bodyWrapper;
      if ( target ) {
        target.scrollTop = 0;
        target.scrollLeft = 0;
      }
    }
  },
  created() {
    this._registerRefresh();
    sortMap.set( this._uid, {} );
    this.initDbData();
  },
  components: {
    QueryBar,
    ToolBar,
    BaseTable,
    Pagination
  },
  props: {

    /* 查询栏参数( 不传则不显示 ) */
    queryBarSchema: {
      type: Array
    },

    /* 表格参数 */
    tableSchema: {
      type: Object,
      required: true
    },

    /* 分页总数 ( 不传则不显示 ) */
    total: {
      type: Number
    },

    /* 列表数据 */
    list: {
      type: Array,
      required: true
    },

    /* 存储schema 的实体名称 */
    entityName: String
  },
  data() {
    return {
      column: [],

      /* db实例 */
      dbResult: null,

      /* 读取完 db 标识 */
      isLoadDbData: false,

      /* 刷新标识 */
      _refreshMap:{
        QueryBar: addSuffix( 'queryBar' ),
        BaseTable: addSuffix( 'baseTable' ),
        Pagination: addSuffix( 'pagination' )
      }

    };
  },
  computed: {

    /* 修改后的 表格列数据 ( 如果 修改过则 取 当前组件的 column 否则 props中的 )*/
    newColumn: {
      get() {
        return cloneDeepWith( this?.column?.length ? this.column : [] );
      },
      set( val ) {
        this.column = val;
      }
    },

    /* 当前 表格的多选框数据 ( 向外暴露 )*/
    selections: {
      cache: false,
      get() {
        return cloneDeepWith( this.$refs?.BaseTable?.$selectData || [] );
      },
      set( val = [] ) {
        this.$refs.BaseTable.$selectData = val;
      }
    },

    /* 当前组合表格的查询数据 */
    currentTableSearchData:{
      cache: false,
      get() {
        const queryBarFormData = this.$refs?.QueryBar?.formData ?? {};
        const sortData = sortMap.get( this._uid );
        return {
          formData:queryBarFormData,
          ...sortData
        };
      }
    },

    /* 当前表格需要 减去的高度 */
    currentBoxHeight: {
      cache: false,
      get() {
        const { QueryBar, BaseTable, pagination } = this.$refs;
        const data = ( QueryBar?.$el?.offsetHeight ?? 0 ) +
          ( pagination ? 40 : 0 );
        return data;
      }
    }
  },
  render( h ) {
    const currentRefreshs = this.$data._refreshMap; 
    const {
      QueryBar: queryBarKey,
      BaseTable: baseTableKey,
      Pagination: paginationKey
    } = currentRefreshs;
    return h(
      'div',
      {
        class: [ 'scm-combination-table' ]
      },
      [

        /* 查询栏 */
        this.queryBarSchema && h(
          'QueryBar',
          {
            ref: 'QueryBar',
            key: queryBarKey,
            props: {
              schema: this.queryBarSchema
            },
            on: {
              opration: data => {
                this.refreshComponent( [
                  'BaseTable',
                  'Pagination'
                ] );
                this.$emit( 'queryBarOpration', data );
              },
              change: data => {
                this.refreshComponent( [
                  'BaseTable',
                  'Pagination'
                ] );
                this.$emit( 'queryBarChange', data );
              }
            }
          }
        ),

        /* 工具栏 */
        h(
          'ToolBar',
          {
            props: {
              schema: this.newColumn
            },
            scopedSlots: {
              // eslint-disable-next-line camelcase
              tool_bar: this.$scopedSlots.tool_bar
            },
            on: {
              refresh: () => {
                this.refreshComponent();
                this.$emit( 'refresh' );
              },

              /* 工具栏 修改表格 schema  */
              updateSchema: ( data = [] ) => {
                if ( this.entityName ) {
                  this.dbResult?.setItem( this.entityName, data );
                }
                this.newColumn = data;
              }
            }
          }
        ),

        /* 表格 */
        this.isLoadDbData && h(
          'BaseTable',
          {
            ref: 'BaseTable',
            key: baseTableKey,
            scopedSlots: {

              /* 每个字段都拥有插槽 */
              ...forEachObject(
                this.$scopedSlots,
                // eslint-disable-next-line consistent-return
                ( key, value ) => {
                  const reg = /^table_/;
                  if ( reg.test( key ) ) {
                    return {
                      [ key.replace( reg, '' ) ]: value
                    };
                  }
                }
              )
            },
            attrs: this.$attrs,
            props: {
              ...this.$attrs,
              schema: {
                ...this.tableSchema,
                column: this.newColumn
              },
              list: this.list
            },
            on: {
              sortChange: [
                data => {

                  /* 点击排序重置分页 */
                  this.refreshComponent( [ 'Pagination' ] );

                  /* 缓存当前 排序参数 */
                  sortMap.set( this._uid, data );

                  const result = { ...data };
                  if ( this.$refs.QueryBar ) {
                    result.formData = this.$refs.QueryBar.formData;
                  }
                  this.$emit( 'sortChange', result );
                }
              ],
              rowClick: ( ...args ) => this.$emit( 'rowClick', ...args ),
              rowDoubleClick: ( ...args ) => this.$emit( 'rowDoubleClick', ...args ),
              selectionChange: ( ...args ) => this.$emit( 'selectionChange', ...args ),
              selectAll: ( ...args ) => this.$emit( 'selectAll', ...args ),
              select: ( ...args ) => this.$emit( 'select', ...args ),
              updateColumn: ( ...data ) => {
                this.$emit( 'updateColumn', ...data );
              }
            }
          }
        ),

        /* 统计插槽 */
        this.$scopedSlots.summary && this.$scopedSlots.summary(),

        /* 分页组件 */
        typeof this.total === 'number' && h(
          'Pagination',
          {
            ref: 'pagination',
            props: {
              refreshKey: paginationKey,
              total: this.total
            },
            on: {

              /* 分页变化事件 */
              change: data => {
                
                /* 1、清空 表格选中数据 */
                this.selections = [];

                /* 2、重置表格滚动条高度 */
                this._resetTableContainer();
                const result = {
                  ...data,
                  sortData: sortMap.get( this._uid )
                };
                if ( this.$refs.QueryBar ) {
                  result.formData = this.$refs.QueryBar.formData;
                }
                this.$emit(
                  'pageChange',
                  result
                );
              }
            }
          }
        )
      ].filter( Boolean )
    );
  },

  /**
 * 向外暴露组件
 * @description: 
 * @param {*}
 * @return {*}
 */  
  QueryBar:QueryBar,
  BaseTable:BaseTable,
  Pagination
};
