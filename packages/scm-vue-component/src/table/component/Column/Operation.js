/*
 * @Author: huangyuhui
 * @Date: 2020-09-22 16:49:17
 * @LastEditors: huangyuhui
 * @LastEditTime: 2020-12-15 13:42:25
 * @Description:
 * @FilePath: \scm_frontend_common\src\vue-component\table\component\Column\Operation.js
 */

import { cloneDeepWith } from 'lodash-es';
import { getScmMsg } from '../../../../locale';

const getText = ( key, i18nHandler ) => key && i18nHandler  ? i18nHandler( key ) : key;

export default {
  functional: true,
  render( _, ctx ) {
    const { parent, data: { props: { schema = {} } = {} } } = ctx;
    const _i18n$T = parent?.$t?.bind( parent );

    return parent.$createElement(
      'el-table-column',
      {
        props: {
          'class-name': 'scm-table-column-operation',
          label:  _i18n$T ? getText( schema?.label, _i18n$T ) : getScmMsg( schema.label ?? 'table.operation' ),
          width: schema.width,
          fixed: 'right',
          align: schema.align ?? 'center'
        },
        scopedSlots: {
          default: ( props ) => {
            return parent.$scopedSlots.operation( cloneDeepWith( props.row ) );
          }
        }
      }
    );
  }
};
