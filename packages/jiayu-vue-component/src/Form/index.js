/*
 * @Author: huangyuhui
 * @Date: 2020-09-22 12:51:44
 * @LastEditors: huangyuhui
 * @LastEditTime: 2020-12-10 16:31:36
 * @Description: Form 组件
 * @FilePath: \scm_frontend_common\src\vue-component\Form\index.js
 */

import { cloneDeepWith } from 'lodash-es';
import StringItem from './FormItem/String';
import SelectItem from './FormItem/Select';
import SwitchItem from './FormItem/Switch';
import DateItem from './FormItem/Date';
import CheckboxItem from './FormItem/Checkbox';
import { Form, FormItem } from 'element-ui';
import { getSize } from '../index.ts';
const getText = ( key, i18nHandler ) => key && i18nHandler ? i18nHandler( key ) : key;



/**
 * type 转 组件别名
 */
const aliasComponents = {
  string: 'StringItem',
  select: 'SelectItem',
  switch: 'SwitchItem',
  date: 'DateItem',
  checkbox: 'CheckboxItem'
};
// eslint-disable-next-line no-unused-vars
const schema = [
  {

    /*  */
    label: '是嘛',

    /* bind 字段名 */
    field: 'name',

    /* 显示清除按钮 */
    clearable: true,

    /* 禁用表单 */
    disabled: true,

    /* 表单类型 */
    type: 'string',

    /* 下拉 , checkbox 的 选项 */
    options: []
  },

  /* 下拉选择 */
  {
    label: 'age',
    field: 'age',
    type: 'select',

    /* 下拉多选标识 */
    multiple: true,
    options: [
      {
        label: '测试1',
        value: '1'
      },
      {
        label: '测试2',
        value: '2'
      }
    ]
  },

  /* 开关 */
  {
    label: '开关',
    field: 'switch',
    type: 'switch',
    disabled: false
  },
  {
    label: '时间选择',
    field: 'date1',
    type: 'date',
    disabled: false,
    clearable: true,
    dateType: 'date',
    valueFormat: 'yyyy-MM-dd'
  }
];


export function useForm() {

}
export default {
  name: 'SCM_Form',
  data() {
    return {
      _formData:{}
    };
  },
  computed:{
    formData:{
      cache: false,
      get() {
        return cloneDeepWith( this.$data._formData );
      }
    }
  },
  props: {

    /* 实体字段 */
    entity: {
      type: String,
      default: ''
    },

    /* 查询栏配置 */
    schema: {
      type: Array,
      default: () => ( [] )
    }
  },
  components: {
    StringItem,
    SelectItem,
    SwitchItem,
    DateItem,
    CheckboxItem,
    ElForm: Form,
    ElFormItem: FormItem
  },
  render( h ) {

    /* 获取 当前 组件 的 form model  */

    const model = this.$data._formData;
    return h(
      'el-form',
      {
        class: [ 'scm_form-container' ],
        props: {
          model,
          inline: true,
          size: getSize()
        }
      },

      /* form item */
      cloneDeepWith( this.schema ).reduce(
        ( prev, currentItemConf ) => {
          const {
            label,
            type = 'string',
            field = '',
            visible = true
          } = currentItemConf;
          // eslint-disable-next-line no-prototype-builtins
          if ( !aliasComponents.hasOwnProperty( type ) ) {
            return h( 'div' );
          }

          /* 控制 是否显示  */
          visible && prev.push(
            h(
              'el-form-item',
              {
                class: [ `form-item-${ type }` ],
                props: {
                  label: getText( label, this?.$t?.bind( this ) ),
                  for: field
                }
              },
              [
                h(
                  aliasComponents[ type ],
                  {
                    props: {
                      entity: this.entity,
                      conf: currentItemConf,
                      value: model[ field ]
                    },
                    on: {
                      input: newVal => {
                      // eslint-disable-next-line no-prototype-builtins
                        if ( model.hasOwnProperty( field ) ) {
                          model[ field ] = newVal;
                        } else {
                          this.$set( model, field, newVal );
                          this.$forceUpdate();
                        }
                      },
                      change: data => {
                        this.$emit(
                          'change',
                          {
                            field,
                            data,
                            formData: cloneDeepWith( model )
                          }
                        );
                      }
                    }
                  }
                )
              ]
            )
          );
          return prev;
        },
        []
      )
    );
  }
};
