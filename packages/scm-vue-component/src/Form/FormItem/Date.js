/*
 * @Author: huangyuhui
 * @Date: 2020-09-22 10:17:47
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-11-14 13:13:47
 * @Description:
 * @FilePath: \SCM 2.0\src\components\common\Form\FormItem\Date.js
 */
import { debounce } from 'lodash-es';
import { DatePicker } from 'element-ui';
export default {
  abstract: true,
  components:{
    ElDatePicker: DatePicker
  },
  props: {
    conf: {
      type: Object,
      required: true
    },
    value: {
      type: [ String, Array ],
      default: ''
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
      clearable = false,
      dateType = 'date',
      valueFormat = 'yyyy-MM-dd',
      format = 'yyyy-MM-dd',
      placeholder = '',
      startPlaceholder	= '',
      endPlaceholder	= ''
    } = this.conf;
    return h(
      'el-date-picker',
      {
        props: {
          value: this.value,
          disabled,
          clearable,
          type: dateType,
          format,
          'value-format': valueFormat,
          appendToBody: false,
          'popper-class': `date-item-${ field }`,
          'start-placeholder': this.entity
            ? this.$t( `${ this.entity }.${ startPlaceholder }` )
            : startPlaceholder,
          'end-placeholder': this.entity
            ? this.$t( `${ this.entity }.${ endPlaceholder }` )
            : endPlaceholder
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
      }
    );
  }
};
