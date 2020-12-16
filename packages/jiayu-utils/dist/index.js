/*
 * @Author: your name
 * @Date: 2020-12-02 00:24:47
 * @LastEditTime: 2020-12-04 16:06:00
 * @LastEditors: huangyuhui
 * @Description: In User Settings Edit
 * @FilePath: \scm_frontend_common\src\utils\object\camelCaseKeys\mapObj.js
 */

const isObject = value => typeof value === 'object' && value !== null; // Customized for this use-case


const isObjectCustom = value => isObject(value) && !(value instanceof RegExp) && !(value instanceof Error) && !(value instanceof Date);

const mapObject = (object, mapper, options, isSeen = new WeakMap() // eslint-disable-next-line max-params
) => {
  options = {
    deep: false,
    target: {},
    ...options
  };

  if (isSeen.has(object)) {
    return isSeen.get(object);
  }

  isSeen.set(object, options.target);
  const {
    target
  } = options;
  delete options.target;

  const mapArray = array => array.map(element => isObjectCustom(element) ? mapObject(element, mapper, options, isSeen) : element);

  if (Array.isArray(object)) {
    return mapArray(object);
  }

  for (const [key, value] of Object.entries(object)) {
    let [newKey, newValue] = mapper(key, value, object);

    if (options.deep && isObjectCustom(newValue)) {
      newValue = Array.isArray(newValue) ? mapArray(newValue) : mapObject(newValue, mapper, options, isSeen);
    }

    target[newKey] = newValue;
  }

  return target;
};

var mapObj = ((object, mapper, options) => {
  if (!isObject(object)) {
    throw new TypeError(`Expected an object, got \`${object}\` (${typeof object})`);
  }

  return mapObject(object, mapper, options);
});

/*
 * @Author: your name
 * @Date: 2020-12-02 00:26:55
 * @LastEditTime: 2020-12-04 16:06:36
 * @LastEditors: huangyuhui
 * @Description: In User Settings Edit
 * @FilePath: \scm_frontend_common\src\utils\object\camelCaseKeys\camelCase.js
 */

const preserveCamelCase = string => {
  let isLastCharLower = false;
  let isLastCharUpper = false;
  let isLastLastCharUpper = false;

  for (let i = 0; i < string.length; i++) {
    const character = string[i];

    if (isLastCharLower && /[a-zA-Z]/.test(character) && character.toUpperCase() === character) {
      string = string.slice(0, i) + '-' + string.slice(i);
      isLastCharLower = false;
      isLastLastCharUpper = isLastCharUpper;
      isLastCharUpper = true;
      i++;
    } else if (isLastCharUpper && isLastLastCharUpper && /[a-zA-Z]/.test(character) && character.toLowerCase() === character) {
      string = string.slice(0, i - 1) + '-' + string.slice(i - 1);
      isLastLastCharUpper = isLastCharUpper;
      isLastCharUpper = false;
      isLastCharLower = true;
    } else {
      isLastCharLower = character.toLowerCase() === character && character.toUpperCase() !== character;
      isLastLastCharUpper = isLastCharUpper;
      isLastCharUpper = character.toUpperCase() === character && character.toLowerCase() !== character;
    }
  }

  return string;
};

const camelCase = (input, options) => {
  if (!(typeof input === 'string' || Array.isArray(input))) {
    throw new TypeError('Expected the input to be `string | string[]`');
  }

  options = Object.assign({
    pascalCase: false
  }, options);

  const postProcess = x => options.pascalCase ? x.charAt(0).toUpperCase() + x.slice(1) : x;

  if (Array.isArray(input)) {
    input = input.map(x => x.trim()).filter(x => x.length).join('-');
  } else {
    input = input.trim();
  }

  if (input.length === 0) {
    return '';
  }

  if (input.length === 1) {
    return options.pascalCase ? input.toUpperCase() : input.toLowerCase();
  }

  const hasUpperCase = input !== input.toLowerCase();

  if (hasUpperCase) {
    input = preserveCamelCase(input);
  }

  input = input.replace(/^[_.\- ]+/, '').toLowerCase().replace(/[_.\- ]+(\w|$)/g, (_, p1) => p1.toUpperCase()).replace(/\d+(\w|$)/g, m => m.toUpperCase());
  return postProcess(input);
};

class QuickLRU {
  constructor(options = {}) {
    if (!(options.maxSize && options.maxSize > 0)) {
      throw new TypeError('`maxSize` must be a number greater than 0');
    }

    this.maxSize = options.maxSize;
    this.cache = new Map();
    this.oldCache = new Map();
    this._size = 0;
  }

  _set(key, value) {
    this.cache.set(key, value);
    this._size++;

    if (this._size >= this.maxSize) {
      this._size = 0;
      this.oldCache = this.cache;
      this.cache = new Map();
    }
  }

  get(key) {
    if (this.cache.has(key)) {
      return this.cache.get(key);
    }

    if (this.oldCache.has(key)) {
      const value = this.oldCache.get(key);
      this.oldCache.delete(key);

      this._set(key, value);

      return value;
    }
  }

  set(key, value) {
    if (this.cache.has(key)) {
      this.cache.set(key, value);
    } else {
      this._set(key, value);
    }

    return this;
  }

  has(key) {
    return this.cache.has(key) || this.oldCache.has(key);
  }

  peek(key) {
    if (this.cache.has(key)) {
      return this.cache.get(key);
    }

    if (this.oldCache.has(key)) {
      return this.oldCache.get(key);
    }
  }

  delete(key) {
    const deleted = this.cache.delete(key);

    if (deleted) {
      this._size--;
    }

    return this.oldCache.delete(key) || deleted;
  }

  clear() {
    this.cache.clear();
    this.oldCache.clear();
    this._size = 0;
  }

  *keys() {
    for (const [key] of this) {
      yield key;
    }
  }

  *values() {
    for (const [, value] of this) {
      yield value;
    }
  }

  *[Symbol.iterator]() {
    for (const item of this.cache) {
      yield item;
    }

    for (const item of this.oldCache) {
      const [key] = item;

      if (!this.cache.has(key)) {
        yield item;
      }
    }
  }

  get size() {
    let oldCacheSize = 0;

    for (const key of this.oldCache.keys()) {
      if (!this.cache.has(key)) {
        oldCacheSize++;
      }
    }

    return this._size + oldCacheSize;
  }

}

/*
 * @Author: your name
 * @Date: 2020-12-02 00:24:19
 * @LastEditTime: 2020-12-04 16:05:16
 * @LastEditors: huangyuhui
 * @Description: In User Settings Edit
 * @FilePath: \scm_frontend_common\src\utils\object\camelCaseKeys\index.js
 */

const has = (array, key) => array.some(x => {
  if (typeof x === 'string') {
    return x === key;
  }

  x.lastIndex = 0;
  return x.test(key);
});

const cache = new QuickLRU({
  maxSize: 100000
}); // Reproduces behavior from `map-obj`

const isObject$1 = value => typeof value === 'object' && value !== null && !(value instanceof RegExp) && !(value instanceof Error) && !(value instanceof Date);

const camelCaseConvert = (input, options) => {
  if (!isObject$1(input)) {
    return input;
  }

  options = {
    deep: false,
    pascalCase: false,
    ...options
  };
  const {
    exclude,
    pascalCase,
    stopPaths,
    deep
  } = options;
  const stopPathsSet = new Set(stopPaths);

  const makeMapper = parentPath => (key, value) => {
    if (deep && isObject$1(value)) {
      const path = parentPath === undefined ? key : `${parentPath}.${key}`;

      if (!stopPathsSet.has(path)) {
        value = mapObj(value, makeMapper(path));
      }
    }

    if (!(exclude && has(exclude, key))) {
      const cacheKey = pascalCase ? `${key}_` : key;

      if (cache.has(cacheKey)) {
        key = cache.get(cacheKey);
      } else {
        const ret = camelCase(key, {
          pascalCase
        });

        if (key.length < 100) {
          // Prevent abuse
          cache.set(cacheKey, ret);
        }

        key = ret;
      }
    }

    return [key, value];
  };

  return mapObj(input, makeMapper(undefined));
};

var index = ((input, options) => {
  if (Array.isArray(input)) {
    return Object.keys(input).map(key => camelCaseConvert(input[key], options));
  }

  return camelCaseConvert(input, options);
});

/*
 * @Author: huangyuhui
 * @Date: 2020-12-04 16:18:16
 * @LastEditors: huangyuhui
 * @LastEditTime: 2020-12-04 16:19:03
 * @Description:
 * @FilePath: \scm_frontend_common\src\utils\object\index.ts
 */
/**
 * 遍历对象
 * @param {*} object
 * @param {*} handler
 */
function forEachObject(object, handler) {
    let newData = {};
    for (const key in object) {
        if (Object.prototype.hasOwnProperty.call(object, key)) {
            const data = handler(key, object[key]);
            newData = {
                ...newData,
                ...(data ?? {})
            };
        }
    }
    return newData;
}

/*
 * @Author: huangyuhui
 * @Date: 2020-12-02 19:03:16
 * @LastEditors: huangyuhui
 * @LastEditTime: 2020-12-11 11:18:07
 * @Description: 工具函数
 * @FilePath: \scm_frontend_common\src\utils\index.ts
 */
/**
 * 判断是否为空的数据
 * @description:
 * @param {*}
 * @return {*}
 */
function isEmpty(data) {
    return data === undefined || data === null || data === '' || Number.isNaN(data);
}

export { index as camelCaseKeys, forEachObject, isEmpty };
