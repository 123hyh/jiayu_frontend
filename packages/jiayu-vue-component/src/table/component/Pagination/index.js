/*
 * @Author: huangyuhui
 * @Date: 2020-09-23 15:44:05
 * @LastEditors: huangyuhui
 * @LastEditTime: 2020-12-03 11:26:06
 * @Description: 分页组件
 * @FilePath: \customs\src\components\common\Table\component\Pagination\index.js
 */
import './index.scss';
import { debounce } from 'lodash-es';
import { Pagination } from 'element-ui';
const PaginationComponent = {
  name: 'Pagination',
  props: {
    total: {
      type: Number,
      default: 0
    }
  },
  components:{
    ElPagination: Pagination
  },
  data() {
    return {

      /* 当前页数 */
      pageNum: 1,

      /* 当前页条目数 */
      pageSize: 10
    };
  },
  render( h ) {
    return h(
      'ElPagination',
      {
        props: {
          background: true,
          total: this.total,
          layout: 'total, sizes, prev, pager, next, jumper',
          'current-page': this.pageNum,
          'page-sizes': [ 10, 20, 30, 40, 50, 100 ]
        },
        on: {
          'size-change': ( pageSize = 10 ) => {
            this.pageSize = pageSize;
            this.pageNum = 1;
            this.handPaginationChange();
          },
          'current-change': ( pageNum = 1 ) => {
            this.pageNum = pageNum;
            this.handPaginationChange();
          }
        }
      }
    );
  },
  methods: {

    /* 向上传递事件 */
    get handPaginationChange() {
      return debounce( function () {
        this.$emit(
          'change',
          {
            page: this.pageNum,
            limit: this.pageSize
          }
        );
      }, 100 );
    }
  }
};
export default {
  abstract: true,
  components: {
    PaginationComponent
  },
  props: {
    total: {
      type: Number
    },
    refreshKey: {
      type: [ String, Number ]
    }
  },
  name: 'Pagination',
  render( h ) {
    return h(
      'div',
      {
        class: [ 'scm-pagination-container' ]
      },
      [
        h(
          'PaginationComponent',
          {
            key: `${ this.total }_${ this.refreshKey ?? '' }`,
            props: {
              total: this.total
            },
            on: this.$listeners
          }
        )
      ]
    );
  }
};
