/*
 * @Author: your name
 * @Date: 2020-10-27 00:51:30
 * @LastEditTime: 2020-11-03 18:40:52
 * @LastEditors: huangyuhui
 * @Description: db api
 * @FilePath: \SCM 2.0\src\utils\indexedDb.js
 */
export function useIndexedDb( storeName ) {
  storeName = `scm_${ storeName }`;
  const generateMethod = ( db ) => {
    function getItem( key ) {
      return new Promise( ( resolve, reject ) => {
        const transaction = db.transaction( storeName );
        const objectStore = transaction.objectStore( storeName );
        const request = objectStore.get( key );
        request.onerror = reject;
        request.onsuccess = function () {
          resolve( request.result?.value );
        };
      } );
    }
    function setItem( key, value ) {
      return new Promise( ( resolve, reject ) => {
        getItem( key ).then( ( data ) => {
          const request = db.
            transaction( [ storeName ], 'readwrite' ).
            objectStore( storeName );
          const result = request[ data ? 'put' : 'add' ]( { id: key,
            value } );
          result.onerror = reject;
          result.onsuccess = () => resolve( true );
        } );
      } );
    }
    function removeItem( key ) {
      return new Promise( ( resolve, reject ) => {
        const request = db.
          transaction( [ storeName ], 'readwrite' ).
          objectStore( storeName ).
          delete( key );
        request.onerror = reject;
        request.onsuccess = function () {
          resolve( true );
        };
      } );
    }
    return {
      getItem,
      setItem,
      removeItem
    };
  };

  return new Promise( ( resolve, reject ) => {
    const instance = window.indexedDB.open( storeName );

    instance.onerror = reject;

    instance.onsuccess = function ( ev ) {
      resolve( generateMethod( ev.target.result ) );
    };

    instance.onupgradeneeded = ( ev ) => {
      const db = ev.target.result;
      // eslint-disable-next-line no-unused-vars
      let objectStore = null;
      if ( !db.objectStoreNames.contains( storeName ) ) {
        objectStore = db.createObjectStore( storeName, { keyPath: 'id' } );
      }

      const transaction = ev.target.transaction;
      transaction.oncomplete = ( e ) => {
        resolve( generateMethod( ev.target.result ) );
      };
    };
  } );
}
