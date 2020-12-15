<!--
 * @Author: your name
 * @Date: 2020-12-13 22:47:58
 * @LastEditTime: 2020-12-13 22:55:12
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /scm-common/src/vue-component/Print/PreView.vue
-->
<template>
  <ScmModal
    v-bind="$attrs"
    v-on="$listeners"
    >
    <slot/>
  </ScmModal>
</template>

<script>
import ScmModal from '../ModalWindow/index.vue';
export default {
  name:'PreView',
  components:{
    ScmModal
  }
};
</script>

<style>

</style>