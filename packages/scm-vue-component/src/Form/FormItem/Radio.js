/*
 * @Author: huangyuhui
 * @Date: 2020-09-22 10:05:04
 * @LastEditors: huangyuhui
 * @LastEditTime: 2020-11-26 09:56:44
 * @Description:
 * @FilePath: \customs\src\components\common\Form\FormItem\Radio.js
 */
import { debounce } from 'lodash-es';
import { RadioGroup, Radio } from 'element-ui';

export default {
  abstract: true,
  components:{
    ElRadioGroup: RadioGroup,
    ElRadio: Radio
  },
  props: {
    conf: {
      type: Object,
      required: true
    },
    value: {
      type: [ String, Number, Boolean ]
    },
    entity: {
      type: String,
      default: ''
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
      field = '',
      disabled = false,
      placeholder = '',
      options = []
    } = this.conf;
    return h(
      'el-radio-group',
      {
        props: {
          value: this.value,
          disabled
        },
        attrs: {
          placeholder: this.entity
            ? this.$t( `${ this.entity }.${ placeholder }` )
            : placeholder,
          name: field,
          id: field
        },
        on: {
          input: [
            this.$listeners.input,
            val => {
              this.emit( val );
            }
          ]
        }
      },
      options.map( ( { label, value, disabled = false } ) => {
        return h(
          'el-radio',
          {
            props: {
              label: value,
              disabled
            },
            key: value
          },
          label
        );
      } )
    );
  }
};
