const has = Object.prototype.hasOwnProperty;

function find(iterator: any, target: any, key?: any) {
  for (key of iterator.keys()) {
    if (deepEqual(key, target)) return key;
  }
}

export function deepEqual(value: any, other: any): boolean {
  let constructor, len, tmp;
  if (value === other) return true;

  if (value && other && (constructor = value.constructor) === other.constructor) {
    if (constructor === Date) return value.getTime() === other.getTime();
    if (constructor === RegExp) return value.toString() === other.toString();

    if (constructor === Array) {
      if ((len = value.length) === other.length) {
        while (len-- && deepEqual(value[len], other[len]));
      }
      return len === -1;
    }

    if (constructor === Set) {
      if (value.size !== other.size) {
        return false;
      }
      for (len of value) {
        tmp = len;
        if (tmp && typeof tmp === 'object') {
          tmp = find(other, tmp);
          if (!tmp) return false;
        }
        if (!other.has(tmp)) return false;
      }
      return true;
    }

    if (constructor === Map) {
      if (value.size !== other.size) {
        return false;
      }
      for (len of value) {
        tmp = len[0];
        if (tmp && typeof tmp === 'object') {
          tmp = find(other, tmp);
          if (!tmp) return false;
        }
        if (!deepEqual(len[1], other.get(tmp))) {
          return false;
        }
      }
      return true;
    }

    if (constructor === ArrayBuffer) {
      value = new Uint8Array(value);
      other = new Uint8Array(other);
    } else if (constructor === DataView) {
      if ((len = value.byteLength) === other.byteLength) {
        while (len-- && value.getInt8(len) === other.getInt8(len));
      }
      return len === -1;
    }

    if (ArrayBuffer.isView(value)) {
      if ((len = value.byteLength) === other.byteLength) {
        while (len-- && (value as any)?.[len] === other[len]);
      }
      return len === -1;
    }

    if (!constructor || typeof value === 'object') {
      len = 0;
      for (constructor in value) {
        if (has.call(value, constructor) && ++len && !has.call(other, constructor)) return false;
        if (!(constructor in other) || !deepEqual(value[constructor], other[constructor]))
          return false;
      }
      return Object.keys(other).length === len;
    }
  }

  return value !== value && other !== other;
}
