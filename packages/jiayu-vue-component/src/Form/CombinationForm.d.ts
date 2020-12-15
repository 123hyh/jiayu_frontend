/*
 * @Author: your name
 * @Date: 2020-12-05 11:19:48
 * @LastEditTime: 2020-12-05 16:48:00
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \scm_frontend_common\src\vue-component\Form\CombinationForm.d.ts
 */
import { ComponentOptions } from 'vue'

import { FormSchema } from "./formSchema";

declare const CombinationForm: ComponentOptions<{
  props: {
    /* 表单schema */
    schema: FormSchema,
    size: 'medium' | 'small' | 'mini'
  },
  methods: {
    /* 获取当前表单数据 */
    getAllFormData: () => any,
    /* 修改表单数据 */
    setFormData: (setFn: (currentFormComponentData) => { [prop: string]: any }) => Promise<any>,
    /*  校验表单，通过后返回 data */
    validate: () => Promise<{ [prop: string]: any }> | false,
    /* 重置表单 */
    resetFields: () => boolean,
    /* 移除表单校验结果 */
    clearValidate: (fields: string | string[]) => boolean,
  }
}>
export default CombinationForm

/* 设置 码值 api  */
export const setCodeApi: (codeApi: () => Promise<any[]> | any[]) => boolean

/* 获取 码值 api  */
export const getCodeDict: () => () => Promise<any[]> | any[]