function getVal( x, y ) {
  return '必填';
}
export default {
  baseData: {

    /* 卡片 标识 */
    card: true,

    /* 卡片 的 title */
    label: '基础信息',

    /* 是否渲染该表单 （默认显示） */
    visible: true,

    /* 如果 card && type === 'object' 则会 properties 表单的数据 创建一个新的集合 */
    // type: 'object',
    properties: {
      name: {

        /* 表单类型 */
        type: 'string',
        label: '姓名',

        /* tip */
        tip: '测试年龄tip',

        /* 码值关键字（会自动获取码值并放入 options 参数中） */
        dict: 'dict',
        clearable: true,

        /* 校验规则 */
        rules: [ {
          required: true,
          get message() {

            /* 避免 切换语言 国际化无响应 */
            // eslint-disable-next-line no-undef
            return getVal( 'validate.notEmpty', { propName: getVal( 'xxx' ) } );
          },
          trigger: 'blur'
        } ]
      },
      test1: {
        card: true,
        label: '测试内',
        properties: {
          obj1: {
            type: 'string',
            label: '测试哦'
          }
        }
      },
      age: {
        type: 'select',
        clearable: true,

        /* 如需过滤 options 则添加该方法 */
        filterOptions( options = [] ) {
          return options;
        },

        /* 是否多选 */
        multiple: true,
        options: [
          {
            label: '难',
            value: 1,
            disabled: true
          },
          {
            label: '难2',
            value: 2
          },
          {
            label: '难3',
            value: 3
          }
        ],
        label: '年龄'
      },
      remark: {
        type: 'textarea',
        label: '备注'
      },

      /* 时间组件 参考element-ui DateTimePicker 组件 */
      startTime: {
        type: 'date',
        label: '出生日期',

        /* element-ui 时间组件的 Type */
        dateType: 'date',

        /* element-ui 时间组件的 value-format */
        valueFormat: 'yyyy-MM-dd',

        /* element-ui 时间组件的 format */
        format: 'yyyy-MM-dd'
      },
      sex: {
        type: 'checkbox',
        options: [
          {
            label: '测试1',
            value: 1
          }, {
            label: '测试2',
            value: 2
          }
        ],
        label: '性别'
      }

    }
  },
  businessData: {
    card: true,
    label: '工商信息',
    type: 'object',
    properties: {
      field1: {
        type: 'string',
        label: '往来编号',
        rules: [ {
          required: true,
          message: '请输入名字',
          trigger: 'blur'
        } ]
      },
      field2: {
        type: 'radio',
        label: '公司名称',
        options: [
          {
            label: '测试1',
            value: 1,
            disabled: true
          },
          {
            label: '测试2',
            value: 2
          }
        ]
      },
      field3: {
        type: 'string',
        label: '公司全称'
      },
      field4: {
        type: 'string',
        label: '公司全称'
      },
      field5: {
        type: 'string',
        label: '英文名称'
      }
    }
  },
  field2: {
    type: 'radio',
    label: '公司名称',
    options: [
      {
        label: '测试1',
        value: 1,
        disabled: true
      },
      {
        label: '测试2',
        value: 2
      }
    ]
  },
  field3: {
    type: 'string',
    label: '公司全称'
  },
  field4: {
    type: 'string',
    label: '公司全称'
  },
  field5: {
    type: 'string',
    label: '英文名称'
  }
};
