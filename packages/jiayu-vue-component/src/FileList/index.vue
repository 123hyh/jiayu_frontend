<!--
 * @Author: huangyuhui
 * @Date: 2020-12-15 16:45:02
 * @LastEditors: huangyuhui
 * @LastEditTime: 2020-12-15 18:50:43
 * @Description: 文件上传公共组件
 * @FilePath: \scm_frontend_common\src\vue-component\FileList\index.vue
-->

<template>
  <CombinationTable
    :tableSchema="schema"
    :list="list"
    @refresh="getFileList"
    >
    <!-- 工具栏插槽 -->
    <template #tool_bar>
      <div class="table-tool-wrap">
        <EButton type="primary">
          {{ getScmMsg('button.fileUpload') }}
        </EButton>
        <EButton>{{ getScmMsg("button.export") }}</EButton>
        <EButton>{{ getScmMsg("button.delete") }}</EButton>
      </div>
    </template>
    <!-- 必须上传 -->
    <template #table_field_isRequired="row">
      <BoolTag :bool="row.isRequired"/>
    </template>
    <!-- 操作插槽 -->
    <template #table_operation>
      <EButton type="text">
        {{ getScmMsg('button.down') }}
      </EButton>
      <EButton
        class="customs-delete-text"
        type="text"
        >
        {{ getScmMsg('button.delete') }}
      </EButton>
    </template>
  </CombinationTable>
</template>

<script>
import CombinationTable from '../table/CombinationTable';
import { Button } from 'element-ui';
import { booleanToText } from '../../filters';
import BoolTag from '../BoolTag';
import { getScmMsg } from '../../locale';
export default {
  name: 'ScmFile',
  components: {
    CombinationTable,
    EButton: Button,
    BoolTag
  },
  filters: {
    booleanToText
  },
  props:{

    /* 文件 id */
    id:{
      type: String,
      required: true
    },

    /* 上传api */
    uoloadeRequest:{
      type: Function,
      default:() => () => {}
    }
  },
  data() {
    return {
      list: [  ],
      schema: {
        index: {
          width: 50,
          label: '#'
        },
        selection: {
          width: 50
        },
        operation: {
          width: 100,
          label: 'table.operation'
        },
        column: [
          {
            field: 'type',
            label: '文件类型'
          },
          {
            field: 'isRequired',
            label: '必须上传'
          },
          {
            field: 'name',
            label: '文件名称'
          },
          {
            field: 'Uploader',
            label: '上传人'
          },
          {
            field: 'time',
            label: '上传时间'
          }
        ]
      }
    };
  },
  mounted() {
    this.getFileList();
  },
  methods: {
    getScmMsg,

    /**
     * 获取文件列表
     * @description: 
     * @param {*}
     * @return {*}
     */
    getFileList() {
      try {
        console.log( 1 );
      } catch ( error ) {
        console.log( error );
      }
    }
  }
};
</script>

<style>
</style>