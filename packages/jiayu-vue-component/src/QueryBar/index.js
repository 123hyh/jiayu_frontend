/*
 * @Author: huangyuhui
 * @Date: 2020-09-21 15:55:42
 * @LastEditors: huangyuhui
 * @LastEditTime: 2020-12-15 13:41:15
 * @Description: 查询栏组件
 * @FilePath: \scm_frontend_common\src\vue-component\QueryBar\index.js
 */
import { cloneDeepWith, debounce } from 'lodash-es';
import './index.scss';
import SCMForm from '../Form/index';
import { Button, Link } from 'element-ui';
import { getScmMsg } from '../../locale';
export default {
  name: 'SCM_QueryBar',
  components: {
    SCMForm,
    ElButton: Button,
    ElLink: Link
  },

  computed: {

    /* 查询栏表单数据 */
    formData: {
      get() {
        return cloneDeepWith( this.$refs.form.formData );
      }
    }
  },
  props: {

    /* 表单配置 */
    schema: {
      type: Array,
      required: true
    }
  },
  data() {
    return {

      /* 展开/收起 查询栏  */
      hideMore: true
    };
  },
  render( h ) {
    return h(
      'div',
      {
        class: [
          'scm_query-bar-container'
        ]
      },
      [

        /* 表单组件 */
        h(
          'SCMForm',
          {
            ref: 'form',
            class: [ 'query-bar-form-block' ],
            props: {
              schema: this.schema
            },
            on: {
              change: data => {
                this.formDataChange( data );
              }
            }
          }
        ),

        /* 查询按钮 */
        h(
          'div',
          {
            class: [ 'query-buttons-container' ]
          },
          [

            /* 查询按钮 */
            h(
              'el-button',
              {
                props: {
                  type: 'primary'
                },
                on: {

                  /* 点击查询 事件 */
                  click: e => {
                    e.stopPropagation();
                    this.handlerButtonClick( {
                      trigger: 'search',
                      formData: this.formData
                    } );
                  }
                }
              },
              getScmMsg( 'button.query' )
            ),

            /* 更多查询按钮 */
            h( 'el-link', {
              props: {
                type: 'primary'
              },
              nativeOn: {
                click: ( e ) => {
                  e.stopPropagation();
                  this.hideMore = !this.hideMore;
                  this.hideMore ? this.handlerHide() : this.handlerShow();
                }
              }
            }, 
            getScmMsg( `button.${this.hideMore ? 'moreQuery' : 'retract'}` )
            )
          ]
        )
      ]
    );
  },
  methods: {

    /* 显示 form Item 溢出元素 */
    handlerShow() {
      const formRef = this.$refs.form.$el;
      const children = formRef?.children;
      children?.forEach( item => {
        const top = item.offsetTop;
        if ( top === 0 && item.style.display === 'none' ) {
          item.style.display = '';
        }
      } );
    },

    /* 隐藏 form 溢出元素 */
    handlerHide() {
      this.$nextTick( () => {
        const formElem = this.$refs.form.$el;
        const children = formElem.children;

        /* 暂存 溢出的Elem */
        let overflowElems = [];

        /* 1、收集溢出元素 */
        children?.forEach( ( () => {
          let prevTop = null;
          return item => {
            const top = item.offsetTop;
            if ( prevTop && top > prevTop ) {
              overflowElems.push( item );
            } else {
              prevTop = top;
            }
          };
        } )() );

        /* 2、对溢出元素 进行一次性的隐藏 */
        overflowElems.forEach( elem => { elem.style.display = 'none'; } );
        overflowElems = [];

        /* 3、给 formBox 固定宽度 */
        if ( formElem?.offsetWidth ) {

          /* 之所以加 1px 是避免 实际有小数，获取的是个整数，导致换行 */
          formElem.style.width = formElem.offsetWidth + 1 + 'px';
        }
      } );
    },

    /**
     * form change 事件
     * @description:
     * @param { object } data
     * @param { string } data.field 触发的字段
     * @param { object } data.data 修改的数据
     * @param { object } data.formData 携带的表单数据
     */
    get formDataChange() {
      return debounce(
        function ( data ) {
          this.$emit( 'change', data );
        }, 200
      );
    },

    /**
     * 查询栏点击按钮事件
     * @description:
     * @param { object } data
     * @param { string } data.trigger 触发的类型
     * @param { object } data.formData 携带的表单数据
     */
    get handlerButtonClick() {
      return debounce(
        function ( data ) {
          this.$emit( 'opration', data );
        },
        100
      );
    }
  },
  mounted() {
    this.handlerHide();
  }
};
