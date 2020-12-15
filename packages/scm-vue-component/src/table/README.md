#  表格组件

`import TableComponent from '@/components/common/Table'`

## 1. props：

| 名称  | 类型 | 是否必传 | 默认值 | 备注  |
| ------------ | ------------ | ------------ | ------------ | ------------ |
| schema  | object  |  是  |  -  |  列配置 |
| list  | Array  |  是  |  -  | 列表数据集合 |
| showToolBar  | Boolean  |  否  |  true  | 是否显示工具栏 |
| showPagination  | Boolean  |  否  |  true  |  是否显示分页 |
| total  | number  |  否  |  0  |  分页总条数 |

  - ###   schema 表格列配置项 必传 
  
| 名称  |  类型 |  备注  |
| ------------ | ------------ | ------------ |
| index  | object  | 索引列   |
| selection  | object  |  多选列  |
| operation  | object  |  操作列  |
| column  | object  | 普通列  |
```javascript
{
  /* 索引列 */
  index: {
    /* 列宽 */
    width: '50',
    /* 可见标识 */
    visible: true,
    /* 列头名称 */
    label: 'table.index'
  },
  /* 操作列 */
  operation: {
    width: '200',
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
      label: '年龄',
      /* 绑定的字段 */
      field: 'age',
      /* 可排序标识 */
      sortable: true,
      /* 列 固定方式 （ left | right ） */
      fixed: 'left',
      /* 列宽 */
      width: 200,
      /* 表头嵌套配置(父级配置一致) */
      children: [

      ]
    }
  ]
}
```
- ### list 列表数据集合 必传

------------

## 2. Event：
|  名称  | 参数  |  备注  |
| ------------ | ------------ | ------------ |
| sortChange  | ({"field":"createDate","order":0})  |  点击表头排序事件  |
| rowClick  | row |  点击一行数据事件  |
| rowDoubleClick  | row  |  双击一行数据事件  |
| selectionChange  | array  |  点击复选框列  |
| pageChange  | {page: 1, limit: 10}  |  分页条事件  |
| refresh  | undefined  |  点击工具栏刷新按钮事件   |

- ###   sortChange 分页事件

	点击表格头部列的排序按钮事件 ；
	*params: { field: String, order: Number }*
	`{  field: 触发该事件的列字段名, order: 1 /** 1为 升序，0 为降序 **/ }`

- ### rowClick  单击表格行数据 触发该事件
	*params: { }*

- ### rowDoubleClick  双击表格行数据 触发该事件
	*params: { }*

- ### selectionChange  点击多选列 触发该事件
	*params: [ ]*
  
- ### pageChange  点击分页页码和分页size 触发该事件
	*params: {page: 当前页, limit: 分页条数}*

- ### refresh  点击顶部刷新按钮 触发该事件
	*params: undefined *

------------

## 3. Slot：

|  名称  | 参数  |  备注  |
| ------------ | ------------ | ------------ |
| operation  | row  |  右侧操作列插槽  |
| tool_bar  | -  |  顶部工具栏插槽  |
| [ field ]  | -  |  每一列都具有插槽（对应 schema.colum中每一项的field字段名）  |

 - ### operation 右侧操作列插槽 示例
 ```html
<template v-slot:operation="row">
	.....
</template>
```


 - ### tool_bar 顶部工具栏插槽 示例
 ```html
<template v-slot:tool_bar>
	.....
</template>
```

------------

完整列子 demo
```javascript
<template>
<div>
	<TableComponent
			:schema="schema"
			:list="[]"
			@refresh="handlerRefresh"
			@sortChange="sortChange"
			@rowClick="rowClick"
			@rowDoubleClick="rowDoubleClick"
			@selectionChange="selectionChange"
		>
		<template v-slot:age>
			<div>测试 age</div>
		</template>
		<template v-slot:agex>
			<div>测试age5</div>
		</template>
		<template v-slot:operation="row">
			<el-button @click.stop="handlerOperationClick">测试1</el-button>
			<el-button>测试2</el-button>
			<el-button>测试3</el-button>
		</template>
	</TableComponent>
</div>

</template>

<script>
/**
 * 表格列配置
 */
const schema = [
  {
    label: '年龄',
    /* 绑定的字段 */
    field: 'age',
    /* 可排序的 */
    sortable: true,
    /* 列 固定方式 （ left | right ） */
    fixed: 'left',
    /* 列宽 */
    width: 200,
    /* 表头嵌套配置 */
    children: []
  },
  {
    label: '年龄2',
    field: 'age1',
    width: 200,
    /* 可见标识 */
    visible: false
  },
  {
    label: '地区',
    field: 'age2',
    /* 表头嵌套 */
    children: [
      {
        label: '省',
        field: 'province',
        sortable: true,
        width: 200
      },
      {
        label: '市',
        width: 200,
        field: 'city'
      }
    ],
    width: 200
  },
  {
    label: '年龄',
    field: 'age3',
    width: 200
  },
  {
    label: '年龄',
    field: 'age4',
    width: 200
  },
  {
    label: '年龄5',
    field: 'agex',
    width: 200
  },
  {
    label: '年龄',
    field: 'age',
    width: 200
  },
  {
    label: '年龄',
    field: 'age',
    width: 200
  },
  {
    label: '年龄',
    field: 'age',
    width: 200
  }
]
export default {
  components: {
    /* 表格组件 */
    TableComponent: () => import( '@/components/common/Table/index.js' )
  },
  data() {
    return {
      schema: {
        /* 索引列 */
        index: {
          /* 列宽 */
          width: '50',
          /* 可见标识 */
          visible: true,
          /* 列头名称 */
          label: 'table.index'
        },
        /* 操作列 */
        operation: {
          width: '200',
          label: 'table.operation'
        },
        /* 选择列 */
        selection: {
          visible: true,
          width: '50',
          label: '选择'
        },
        /* 列 配置 */
        column: schema
      }
    }
  },
  methods: {
    handlerRefresh() {
      console.log( '点击刷新' )
    },
    sortChange( e ) {
      console.log( `点击排序事件`, e )
    },
    rowClick( e ) {
      console.log( `点击行事件`, e )
    },
    rowDoubleClick( e ) {
      console.log( `双击行事件`, e )
    },
    selectionChange( e ) {
      console.log( `点击多选框行事件`, e )
    },
    handlerOperationClick() {
      console.log( `点击操作列` )
    }
  }
}
</script>

<style></style>

```