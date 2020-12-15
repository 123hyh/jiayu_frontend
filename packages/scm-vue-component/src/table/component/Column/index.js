/*
 * @Author: huangyuhui
 * @Date: 2020-09-22 15:35:45
 * @LastEditors: huangyuhui
 * @LastEditTime: 2020-12-07 18:59:35
 * @Description: table column 组件
 * @FilePath: \scm_frontend_common\src\vue-component\table\component\Column\index.js
 */
import { Popover, TableColumn, Tooltip } from 'element-ui';

const getText = ( key, i18nHandler ) => key && i18nHandler ? i18nHandler( key ) : key;


export default {
  abstract: true,
  name: 'SCMTableColumn',
  components: {
    Popover,
    ElTableColumn: TableColumn,
    ElTooltip: Tooltip
  },
  props: {

    /* 表格配置 */
    columnSchema: {
      type: Object,
      required: true
    },

    /* slots透传 */
    columnSlots: {
      type: Object,
      required: true
    }
  },
  data() {
    return {

      /* 是否处于编辑状态 */
      editble: false
    };
  },
  render( h ) {
    const {
      field,
      fixed,
      sortable,
      label,
      width,
      children = [],
      align = 'center',
      tip

    } = this.columnSchema;
    return h(
      'ElTableColumn',
      {
        props: {
          align,
          prop: field,
          fixed: typeof fixed === 'string' && fixed !== '' ? fixed : undefined,
          sortable: sortable ? 'custom' : sortable,
          label: getText( label, this?.$t?.bind( this ) ),
          'show-overflow-tooltip': true,
          width
        },
        scopedSlots: ( () => {
          const slots = {};
          slots.default = props => {
            const { row } = props;

            /* 点击列 时 修改 可编辑状态 */
            return h(
              'span',
              [
                this.columnSlots[ field ]
                  ? this.columnSlots[ field ]( row )
                  : row[ field ]
              ]
            );
          };

          /* tip 字段 插槽 */
          if ( tip ) {
            slots.header = () =>
              h(
                'el-tooltip',
                {
                  props: {
                    'popper-class': `scm-table-column-header-tip-${ field }`,
                    content: getText( tip, this?.$t?.bind( this ) ) 
                  }
                },
                [
                  h( 'span', { class: [ 'scm-table-header-label' ] }, [
                    h( 'span', getText( label, this?.$t?.bind( this ) )  ),
                    h( 'i', {
                      class: [ 'el-icon-question', 'tip-icon' ]
                    } )
                  ] )
                ]
              );
          }
          return slots;
        } )()
      },
      [
        children &&
          children.length &&
          children.map( item => {
            return h( 'SCMTableColumn', {
              props: {
                columnSchema: item,
                columnSlots: this.columnSlots
              }
            } );
          } )
      ].filter( Boolean )
    );
  }
};
