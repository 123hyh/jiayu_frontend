# 分页组件

 - ### 1、Props:

 | 属性名 | 类型 | 必传 | 默认值 | 备注 |
 | ------------ | ------------ | ------------ | ------------ |------------ |
 | total | number | 是 | - | 总条数
 
 -----
 - ### 2、Events：
 | 事件名 | 回调参数 | 备注 |
 | ------------ | ------------ | ------------ |
 | change | ({ page: number, limit: number }) | | 

 ```javascript 
/**
 * 分页事件（page、size 变化时触发）
 * @param { object } data 
 * @param { number } data.page 当前分页下标 
 * @param { number } data.limit 当前分页size数 
 **/
change({
  page: 1,
  limit: 10
})
 ```
 ----

 ## demo：
 ```html
 <Pagination 
    :total="total" 
    @change="handlerChange">
 </Pagination>
 ```

