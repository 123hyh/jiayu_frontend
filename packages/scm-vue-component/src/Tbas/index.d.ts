/*
 * @Author: huangyuhui
 * @Date: 2020-12-08 15:05:37
 * @LastEditors: huangyuhui
 * @LastEditTime: 2020-12-08 15:10:09
 * @Description: 
 * @FilePath: \scm_frontend_common\src\vue-component\Tbas\index.d.ts
 */
import { ComponentOptions } from 'vue'

declare const Tbas: ComponentOptions<{
  props: {
    list: Array<{
      label: string,
      path: string,
      disabled?: boolean,
      reg: RegExp
    }>
  }
}>

export default Tbas