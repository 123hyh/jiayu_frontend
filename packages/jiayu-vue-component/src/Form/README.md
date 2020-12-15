<!--
 * @Author: huangyuhui
 * @Date: 2020-09-27 18:38:29
 * @LastEditors: huangyuhui
 * @LastEditTime: 2020-09-28 10:02:51
 * @Description: 
 * @FilePath: \SCM 2.0\src\components\common\Form\README.md
-->
#表单组件

 - ## 1、Props：

      | 属性名 | 类型  | 是否必传 | 默认值 | 备注 |
      | ----------- | ----------- | ----------- | ----------- | ----------- |
      | schema | object | 是 | - | 表单配置 |

      [schema配置](./CombinationFormSchema.js)

---

 - ## 2、Event：

      | 事件名 | 回调参数 |  备注 |  
      ------------ |  ------------- | -------------|
      | change | Function({field: string, data: any, formData: object}) | 表单值变化事件 |

      ```javascript
      /**
       * 表单值变化事件 
       * @param { object } params
       * @param { string } params.field 触发该事件的字段名
       * @param { any } params.data 触发事件的数据
       * @param { object } params.formData 表单数据集合
       */
      schema({field: 'name',data: 10, formData: { }})
      ```
      
----

  - ## method: 表单操作方法：

      | 方法名 | 参数 |  备注 |  
      ------------ |  ------------- | -------------|
      | setFormData | Function(callback: Function(object)) |  设置表单值 |
      | validate | Function(): Promise\<object\> | 校验表单，返回form集合 |
      | resetFields | Function(): boolean | 重置表单 |
      |  clearValidate | Function(props: array \| string): boolean | 移除表单校验结果（） |

      ```html
        <template>
          <FormComponent ref="form"></FormComponent>
        </template>
        <script>
          
            import FormComponent from '@/components/common/Form/CombinationForm.js'
            
            export default {
              components: {
                FormComponent
              },
              methods: {
                /**
                 * 校验表单
                 */
                async validate(){
                  const formData = await this.$refs.form.validate();
                },
                /**
                 * 设置表单数据
                 * @description 必须返回表单数据
                 */
                async setFormData(){
                  this.$refs.form.setFormData( data => {
                    data.name = '修改'
                    return data
                  });
                },
              }
            }
        </script>
      ```


