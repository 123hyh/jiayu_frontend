<!--
 * @Author: huangyuhui
 * @Date: 2020-09-24 12:26:36
 * @LastEditors: huangyuhui
 * @LastEditTime: 2020-09-24 18:52:11
 * @Description: 
 * @FilePath: \SCM 2.0\src\components\common\Table\BaseTableSchema.md
-->
#  表格 schema 表格列配置项 
  
| 名称  |  类型 |  备注  |
| ------------ | ------------ | ------------ |
| index  | object  | 索引列   |
| selection  | object  |  多选列  |
| operation  | object  |  操作列  |
| column  | Array\<object\>  | 字段列  |
```javascript
{
  /* 索引列 */
  index: {
    /* 列宽 */
    width: '50',
    /* 文字排列 （ left | center | right	） */
    align: '',
    /* 可见标识 */
    visible: true,
    /* 列头名称 */
    label: 'table.index'
  },
  /* 操作列 */
  operation: {
    width: '200',
     /* 文字排列 （ left | center | right	） */
    align: '',
     /* 可见标识 */
    visible: true,
    label: 'table.operation'
  },
  /* 选择列 */
  selection: {
    visible: true,
    width: '50',
    label: '选择'
  },
  /* 列 配置 */
  column: [
    {
      /* 列头名 */
      label: '年龄',
      /* 字段 */
      field: 'age',
      /* 可排序标识 */
      sortable: true,
      /* 可见标识 */
      visible: true,
      /* 列 文字排列方式 （ left | center | right	） */
      align:'',
      /* 列 固定方式 （ left | right ） */
      fixed: 'left',
      /* 列宽 */
      width: 200,
      /* 列头提示 */
      tip:'提示信息'
      /* 表头嵌套配置(父级配置一致) */
      children: [

      ]
    }
  ]
}
```