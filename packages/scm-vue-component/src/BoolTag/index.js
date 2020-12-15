/*
 * @Author: huangyuhui
 * @Date: 2020-12-15 17:36:59
 * @LastEditors: huangyuhui
 * @LastEditTime: 2020-12-15 17:45:06
 * @Description: 布尔tag 组件
 * @FilePath: \scm_frontend_common\src\vue-component\BoolTag\index.js
 */

import { booleanToText } from '../../filters';
import './index.scss';
export default {
  name:'BoolTag',
  props:{
    bool:{
      type: Boolean,
      default: false
    }
  },
  render( h ) {
    return h( 
      'div',
      {
        class:[
          this.bool ? 'customs-yes' : 'customs-no'
        ]
      },
      booleanToText( this.bool, this?.$i18n?.locale ?? 'zh' )
    );
  }
};