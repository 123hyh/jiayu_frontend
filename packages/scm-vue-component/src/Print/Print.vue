<!--
 * @Author: your name
 * @Date: 2020-12-12 07:42:34
 * @LastEditTime: 2020-12-13 23:37:19
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /scm-common/src/vue-component/Print/Print.vue
-->
<template>
  <div>
    <ElButton @click.stop="handlerClickPrint">
      打印
    </ElButton>
    <PreView
      :visible="visible"
      @close="()=> visible = false"
      >
      <div
        :id="idIndex"
        ref="currentPreView"
        width="50%"
        />
    </PreView>
  </div>
</template>

<script>
import HiPrintJs from './hiprint.bundle.js';
import { Button } from 'element-ui';
import PreView from './PreView.vue';
let index = 0;
export default {
  name:'ScmPrint',
 
  components:{
    ElButton:Button,
    PreView
  },
  data() {
    return {
      visible: false
    };
  },
  computed:{
    idIndex() {
      return `customs-print_${index}`;
    }
  },
  methods:{
    handlerClickPrint() {
      HiPrintJs.init();

      //  2、创建打印模板对象
      let hiprintTemplate = new HiPrintJs.PrintTemplate( {
        settingContainer: `#${this.idIndex}`
      } );

      // 3、模板对象添加打印面板 paperHeader：页眉线 paperFooter：页尾线
      let panel = hiprintTemplate.addPrintPanel( { 
        width: 100, height: 130, paperFooter: 340, paperHeader: 10 
      } );
      panel.addPrintText( { options:{ /*  width:10, height:10, */ top:10, left:0, title:'嗨牛牛牛' } } );

      const previewBox = this.$refs.currentPreView;

      const [ HTMLText ] =  hiprintTemplate.getHtml(); 
      previewBox.appendChild( HTMLText );
      this.visible = true;

      // hiprintTemplate.print();
    }
  }
};
</script>

<style scoped>
  [id^='customs-print_']{
    position: relative;
  }
</style>