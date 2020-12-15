# 查询栏 schema 配置

| 属性名| 类型 | 值 | 备注 | 
| ------------ | ------------ | ------------ | ------------ |
| type | string | - | 表单类型 |
| label | string | - | 表单label |
| field | string | - | 表单字段 |
| clearable | boolean | - | 清空标识 |
| visible | boolean | - | 可见标识 |
| disabled | boolean | - | 禁用标识 |
| multiple | boolean | - | 下拉多选标识 |
| dateType | string | year \/ month \/ date \/ week \/  datetime \/ datetimerange \/ daterange | 时间日期组件类型（ 参考 element-ui  ） |
| valueFormat | string | yyyy-MM-dd \/ yyyy-MM-dd hh:mm:ss \/ timestamp  | 时间日期组件值格式化 |

```javascript
const schema = [
  {
    /* 表单 label */
    label: '名称',
    /*  输入框字段名 */
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
]
```