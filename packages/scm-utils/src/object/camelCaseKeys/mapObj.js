/*
 * @Author: your name
 * @Date: 2020-12-02 00:24:47
 * @LastEditTime: 2020-12-04 16:06:00
 * @LastEditors: huangyuhui
 * @Description: In User Settings Edit
 * @FilePath: \scm_frontend_common\src\utils\object\camelCaseKeys\mapObj.js
 */
'use strict';

const isObject = value => typeof value === 'object' && value !== null;

// Customized for this use-case
const isObjectCustom = value =>
  isObject( value ) &&
  !( value instanceof RegExp ) &&
  !( value instanceof Error ) &&
  !( value instanceof Date );

const mapObject = ( 
  object, mapper, options, isSeen = new WeakMap()
// eslint-disable-next-line max-params
) => {
  options = {
    deep: false,
    target: {},
    ...options
  };

  if ( isSeen.has( object ) ) {
    return isSeen.get( object );
  }

  isSeen.set( object, options.target );

  const { target } = options;
  delete options.target;

  const mapArray = array => array.map( element => isObjectCustom( element ) ?
    mapObject( element, mapper, options, isSeen ) : element
  );
  if ( Array.isArray( object ) ) {
    return mapArray( object );
  }

  for ( const [ key, value ] of Object.entries( object ) ) {
    let [ newKey, newValue ] = mapper( key, value, object );

    if ( options.deep && isObjectCustom( newValue ) ) {
      newValue = Array.isArray( newValue ) ?
        mapArray( newValue ) :
        mapObject( newValue, mapper, options, isSeen );
    }

    target[ newKey ] = newValue;
  }

  return target;
};

export default ( object, mapper, options ) => {
  if ( !isObject( object ) ) {
    throw new TypeError( `Expected an object, got \`${object}\` (${typeof object})` );
  }

  return mapObject( object, mapper, options );
};
