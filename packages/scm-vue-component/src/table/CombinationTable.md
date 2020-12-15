# 组合表格组件（查询栏、工具栏、表格、分页）适合列表使用

 - ## 1、Props：

| 属性名 | 类型 | 是否必传 | 默认值 | 备注 |  
------------ | ------------- | -------------| -------------| -------------
| queryBarSchema | Array\<Object\> | 是 | - | 查询栏schema
| tableSchema | Object | 是 | - | 表格schema
| total | Number | 是 | - | 列表数据总数
| list | Array\<Object\>  | 是 | - | 列表数据集合
| clickRowSelected | boolean  | 否 | - | 点击行自动 (选中|取消选中)

 - [queryBarSchema 配置参考](../QueryBar/schema.md)

 - [tableSchema 配置参考](./BaseTableSchema.md)


----

 - ## 2、Event：

| 事件名 | 回调参数 |  备注 |  
------------ |  -------------| -------------
| queryBarOpration | ({ formData: { }, trigger: String })| 查询栏点击按钮事件
| queryBarChange | ( { field: String, data: { }, formData: { } }) | 查询栏表单变化事件
| refresh |  -  | 工具栏点击刷新按钮事件
| sortChange | ({ field: String, formData: { }, order: Number })  |  表格列点击排序事件
| rowClick | ({ }) | 单击表格行事件
| rowDoubleClick | ({  }) | 双击表格行事件
| pageChange | ({ page: Number, limit: Number, sortData: { }, formData: { } }) | 分页条变化事件

```javascript
/**
 * 查询栏点击按钮事件
 * @param { string } trigger 触发事件的按钮key
 * @param { object } formData 查询栏数表单据
 **/
queryBarOpration( ( { 
  trigger: 'age',
  formData: { age: 1 } 
} ) );

/**
 * 查询栏表单变化事件
 * @param { string } field 触发字段
 * @param { object } data 触发字段数据
 * @param { object } formData 表单数据
 **/
queryBarChange({
   field: 'age',
   data: { age: 18}, 
   formData: { }
});

/**
 * 工具栏点击刷新按钮事件
 * @param {*}
 **/
refresh();

/**
 * 表格列点击排序事件
 * @param { object } data 
 * @param { string } data.field 点击字段
 * @param { object } data.formData 查询栏数据
 * @param { number } data.order 排序方式（ 1: 升序, 0: 降序 ）
 **/
sortChange({ 
  field: 'age', 
  formData: { }, 
  order: 1 
}) 
/**
 * 表格单击行
 * @param { object } row 点击当前行数据
 **/
rowClick(row = {});

/**
 * 表格双击行
 * @param { object } row 点击当前行数据
 **/
rowDoubleClick(row = {});

/**
 * 分页事件
 * @param { object } data 
 * @param { number } data.page 当前分页数 
 * @param { number } data.limit 当前分页条数
 * @param { object } data.sortData 当前分页条数(具体查看 sortChange 事件参数)
 **/
pageChange({ 
  page: 1, 
  limit: 10, 
  sortData: { }, 
  formData: { } 
})
```


----

- ## 3、Slot：

| 插槽名 | 参数 | 备注
| ------------ | ------------ | ------------ |
| tool_bar | - | 工具栏插槽
| table_[ field ] | row | 表格每列都有字段插槽 ([ 前缀 ]_[ 字段名 ] )
| table_operation | row | 表格操作列插槽

```html
<!-- 工具栏 -->
<template v-slot:tool_bar>
  <div>测试工具栏插槽</div>
</template>

<!-- 列 [ field ] 字段 -->
<template v-slot:table_age="row">
  <div>测试表列插槽{{ row }}</div>
</template>

<!-- 表格操作列 -->
<template v-slot:table_operation="row">
  <div>测试操作列插槽{{ row }}</div>
</template>
```