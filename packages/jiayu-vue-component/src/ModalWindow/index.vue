<!--
 * @Author: huangyuhui
 * @Date: 2020-09-25 11:34:10
 * @LastEditors: huangyuhui
 * @LastEditTime: 2020-12-14 18:25:38
 * @Description: 模态窗组件
 * @FilePath: \scm_frontend_common\src\vue-component\ModalWindow\index.vue
-->
<template>
  <div
    :class="classList"
    :style="{zIndex: zIndex}"
    >
    <div
      v-drag="dragConfig"
      :class="{'x-window':true}"
      :style="{
        width,
        left: `calc(50% - ${width} / 2)`,
        top:'20%'
      }"
      :disabled-drag="disabledDrag"
      :disabled-resize="disabledResize"
      >
      <div class="app-window-resize resize-top-left"/>
      <div class="app-window-resize resize-top-right"/>
      <div class="app-window-resize resize-bottom-left"/>
      <div class="app-window-resize resize-bottom-right"/>
      <div class="app-window-resize resize-top-border"/>
      <div class="app-window-resize resize-right-border"/>
      <div class="app-window-resize resize-bottom-border"/>
      <div class="app-window-resize resize-left-border"/>
      <div class="close-box">
        <i
          class="el-icon-close"
          @click.stop="handlerClose"
          />
      </div>
      <div class="x-window-header">
        <div class="x-window-title">
          <slot name="title"/>
        </div>
      </div>
      <div class="x-window-body">
        <slot name="default"/>
        <!-- 底部拖拽条 -->
        <!-- <div class="x-window-bar"></div> -->
      </div>
      <div class="x-window-footer">
        <slot name="footer"/>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import dragDirective from './directive';

import PopupManager from 'element-ui/src/utils/popup/popup-manager.js';
const Modal = {
  name: 'ScmModalWindow',
  directives: {
    drag: dragDirective()
  },
  props: {

    /* 是否可见 */
    visible: {
      type: Boolean,
      default: false
    },
    width: {
      type: String,
      default: '30%'
    },
    disabledDrag: {
      type: Boolean,
      default: false
    },

    disabledResize: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {

      /* 显示初始动画 */
      dragConfig: {

        // Drag and drop configuration
        drag: {

          // Whether to enable drag and drop
          enable: true,

          // Specify drag and drop handle element, support for one or more handles
          handler: [
            '.x-window-title'

            /* '.x-window-bar' */
          ],

          // Drag the different stages of className
          class: {
            start: 'x-drag-start',
            move: 'x-drag-move',
            done: 'x-drag-done',
            main: 'x-drag'
          },

          // callback
          callback: {
            start: null,
            move: null,
            done: ( style ) => {
              console.log( 'drag done', style );
            }
          }
        },

        // Zoom configuration
        resize: {

          // Whether to enable zooming
          enable: true,

          // Specify the zoom handle element to support one or more handles
          handler: {
            'top-left': '.resize-top-left',
            'top-right': '.resize-top-right',
            'bottom-left': '.resize-bottom-left',
            'bottom-right': '.resize-bottom-right',
            'top-border': '.resize-top-border',
            'right-border': '.resize-right-border',
            'bottom-border': '.resize-bottom-border',
            'left-border': '.resize-left-border'
          },

          // Scaling different stages of className
          class: {
            start: 'x-resize-start',
            move: 'x-resize-move',
            done: 'x-resize-done',
            main: 'x-resize'
          },

          // callback
          callback: {
            start: null,
            move: null,
            done: ( style ) => {
              console.log( 'resize done', style );
            }
          }
        }
      }
    };
  },
  computed: {

    /* 获取 elementUi modal zIndex */
    zIndex() {
      return PopupManager.nextZIndex();
    },
    classList() {
      return [ 'drag-box', this.visible ? 'show' : 'hide' ];
    }
  },
  methods: {
    handlerClose() {
      this.$emit( 'close' );
    }
  }
};
export default Modal;

export const MessageBox = {
  confirm(
    { elem = document.body, title = '', content = '' } = {},
    confirmHandler = () => {}
  ) {
    let modalEl = null;
    const Com = Vue.extend( {
      extends: Modal,
      methods: {
        handlerClose() {
          this.visible = false;
          document.body.removeChild( modalEl );
        }
      }
    } );
    const instance = new Com( {
      propsData: {
        visible: true,
        width: '400px'
      }
    } );
    modalEl = instance.$mount( ).$el;
    elem.appendChild( modalEl );
  }
};
</script>

<style lang="scss">
@keyframes animate {
  0% {
    top: -100%;
    opacity: 0;

  }
  25% {
    top: 60;
    opacity: 1;

  }
  50% {
    top: 25%;
    opacity: 1;
  }
  75% {
    top: 15%;
    opacity: 1;
  }
  100%{
    top: 20%;
    opacity: 1;

  }
}

.drag-box {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  &::after {
    display: block;
    content: "";
    width: 100%;
    height: 100%;
    opacity: .4;
    background: #000;
  }
  &.show {
    display: block;
  }
  &.hide {
    display: none;
  }
  .x-window {
    left: 50%;
    height: 50%;
    position: absolute;
    width: 300px;
    height: auto;
    background: #fff;
    box-sizing: border-box;
    overflow: hidden;

    .x-window-header {
      box-sizing: border-box;
      background: #f4f9ff;
      min-height: 40px;
      padding: 0 10px;
      cursor: default;

      &:hover {
        background: #eff6fd;
      }

      .x-window-title {
        padding: 0 20px;
        min-height: 40px;
        display: flex;
        align-items: center;
        box-sizing: border-box;
        text-align: left;
        cursor: default;
      }
    }
    .close-box {
      z-index: 3;
      position: absolute;
      right: 20px;
      top: 20px;
      transform: translateY(-50%);
      .el-icon-close {
        font-weight: 600;
        font-size: 1.2em;
        cursor: pointer;
      }
    }
    .x-window-body {
      max-height: calc(100vh - 25vh - 100px);
      overflow: auto;
      padding: 10px;
      .x-window-bar {
        padding: 10px;
        border: 1px solid rgba(0, 0, 0, 0.1);
        background: rgba(245, 247, 249, 1);
        cursor: default;
        &:hover {
          background: rgba(0, 0, 0, 0.1);
        }
      }
    }
  }
  .x-window-footer{
    text-align: right;
    margin-right: 20px;
    margin-bottom: 10px;
    button{
      border-radius: 1px;
    }
  }

  .x-drag-start,
  .x-drag-move {
    transition: none;
    opacity: 0.7;

    .x-window-header {
      .x-window-title {
        cursor: move !important;
      }
    }
    .x-window-body {
      .x-window-bar {
        cursor: move !important;
      }
    }
  }

  .app-window-resize {
    width: 20px;
    height: 20px;
    position: absolute;
    background: transparent;
    &.resize-top-left {
      cursor: nw-resize;
      top: 0;
      left: 0;
      z-index: 2;
    }
    &.resize-top-right {
      cursor: ne-resize;
      top: 0;
      right: 0;
      z-index: 2;
    }
    &.resize-bottom-left {
      cursor: sw-resize;
      bottom: 0;
      left: 0;
    }
    &.resize-bottom-right {
      cursor: se-resize;
      bottom: 0;
      right: 0;
    }
    &.resize-top-border {
      cursor: ns-resize;
      top: 0;
      width: 100%;
      height: 2px;
    }
    &.resize-right-border {
      cursor: ew-resize;
      right: 0;
      width: 2px;
      height: 100%;
    }
    &.resize-bottom-border {
      cursor: ns-resize;
      bottom: 0;
      width: 100%;
      height: 2px;
    }
    &.resize-left-border {
      cursor: ew-resize;
      left: 0;
      width: 2px;
      height: 100%;
    }
  }
}
</style>
