/*
 * @Author: huangyuhui
 * @Date: 2020-09-22 10:13:26
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-11-14 13:16:23
 * @Description:
 * @FilePath: \SCM 2.0\src\components\common\Form\FormItem\Switch.js
 */
import { debounce } from 'lodash-es';
import { Switch } from 'element-ui';
export default {
  abstract: true,
  components:{
    ElSwitch: Switch
  },
  props: {
    conf: {
      type: Object,
      required: true
    },
    value: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    get emit() {
      return debounce( function ( data ) {
        this.$emit( 'change', data );
      }, 200 );
    }
  },
  render( h ) {
    const {
      disabled = false,
      field
    } = this.conf;
    return h(
      'el-switch',
      {
        props: {
          value: this.value,
          disabled,
          activeColor: '#13ce66'
        },
        attrs: {
          name: field
        },
        on: {
          input: [
            this.$listeners.input,
            val => {
              this.emit( val );
            }
          ]
        }
      }
    );
  }
};
