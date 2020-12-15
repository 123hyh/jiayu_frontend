# 模态窗 组件

  `import Modal from '@/components/common/ModalWindow'`

 - ## 1. Props：

    | 属性名 | 类型 | 是否必传 | 默认值 | 备注 |  
    ------------ | ------------- | -------------| -------------| -------------
    | visible | boolean | 否 | false | 控制显示 |
    | title | string | 否 | - | 窗口标题 |
    | width | string | 否 | 30% | 窗口宽度 |

----

 - ## 2. Event：

    |  名称  | 参数  |  备注  |
    | ------------ | ------------ | ------------ |
    | close | - | 关闭模态窗事件 |

-----

 - ## 3. Slot：

  |  名称  | 参数  |  备注  |
  | ------------ | ------------ | ------------ |
  | title | - | 窗口标题插槽 |
  | default | - | 窗口body插槽 |
  | footer | - | 底部插槽 |

```html
<!-- 标题插槽 -->
<template v-slot:title>
  <p>测试标题</p>
</template>

<!-- 模态窗 body插槽 -->
<template v-slot>
  <p>测试body</p>
</template>

<!-- 模态窗 底部插槽 -->
<template v-slot:footer>
  <p>测试footer</p>
</template>
```
--------

- 4 完整demo

```html
<Modal 
  :visible='true'
  title="测试标题"
  width="50%"
  @close="() => {}"
>
  <!-- 标题插槽 -->
  <template v-slot:title>
    <p>测试标题</p>
  </template>

  <!-- 模态窗 body插槽 -->
  <template v-slot>
    <p>测试body</p>
  </template>

  <!-- 模态窗 底部插槽 -->
  <template v-slot:footer>
    <p>测试footer</p>
  </template>
</Modal>
```
