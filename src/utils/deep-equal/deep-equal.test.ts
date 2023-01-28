/* eslint-disable */
import { deepEqual } from './deep-equal';

describe('deep-equal', () => {
  it('scalars', () => {
    expect(deepEqual(1, 1)).toEqual(true);
    expect(deepEqual(1, 2)).toEqual(false);
    expect(deepEqual(1, [])).toEqual(false);
    expect(deepEqual(1, '1')).toEqual(false);
    expect(deepEqual(Infinity, Infinity)).toEqual(true);
    expect(deepEqual(Infinity, -Infinity)).toEqual(false);
    expect(deepEqual(NaN, undefined)).toEqual(false);
    expect(deepEqual(NaN, null)).toEqual(false);
    expect(deepEqual(NaN, NaN)).toEqual(true);
    expect(deepEqual(1, -1)).toEqual(false);
    expect(deepEqual(0, -0)).toEqual(true);

    expect(deepEqual(null, null)).toEqual(true);
    expect(deepEqual(void 0, undefined)).toEqual(true);
    expect(deepEqual(undefined, undefined)).toEqual(true);
    expect(deepEqual(null, undefined)).toEqual(false);
    expect(deepEqual('', null)).toEqual(false);
    expect(deepEqual(0, null)).toEqual(false);

    expect(deepEqual(true, true)).toEqual(true);
    expect(deepEqual(false, false)).toEqual(true);
    expect(deepEqual(true, false)).toEqual(false);
    expect(deepEqual(0, false)).toEqual(false);
    expect(deepEqual(1, true)).toEqual(false);

    expect(deepEqual('a', 'a')).toEqual(true);
    expect(deepEqual('a', 'b')).toEqual(false);
  });

  it('objects', () => {
    expect(deepEqual({}, {})).toEqual(true);
    expect(deepEqual({ a: 1, b: 2 }, { a: 1, b: 2 })).toEqual(true);
    expect(deepEqual({ b: 2, a: 1 }, { a: 1, b: 2 })).toEqual(true);

    expect(deepEqual({ a: 1, b: 2, c: [] }, { a: 1, b: 2 })).toEqual(false);
    expect(deepEqual({ a: 1, b: 2 }, { a: 1, b: 2, c: [] })).toEqual(false);
    expect(deepEqual({ a: 1, c: 3 }, { a: 1, b: 2 })).toEqual(false);

    expect(deepEqual({ a: [{ b: 1 }] }, { a: [{ b: 1 }] })).toEqual(true);
    expect(deepEqual({ a: [{ b: 2 }] }, { a: [{ b: 1 }] })).toEqual(false);
    expect(deepEqual({ a: [{ c: 1 }] }, { a: [{ b: 1 }] })).toEqual(false);

    expect(deepEqual([], {})).toEqual(false);
    expect(deepEqual({}, [])).toEqual(false);
    expect(deepEqual({}, null)).toEqual(false);
    expect(deepEqual({}, undefined)).toEqual(false);

    expect(deepEqual({ a: void 0 }, {})).toEqual(false);
    expect(deepEqual({}, { a: undefined })).toEqual(false);
    expect(deepEqual({ a: undefined }, { b: undefined })).toEqual(false);
  });

  it('dictionary', () => {
    const foo = Object.create(null);
    const bar = Object.create(null);
    expect(deepEqual(foo, bar)).toEqual(true);

    foo.hello = 'world';
    expect(deepEqual(foo, bar)).toEqual(false);
  });

  it('arrays', () => {
    expect(deepEqual([], [])).toEqual(true);
    expect(deepEqual([1, 2, 3], [1, 2, 3])).toEqual(true);
    expect(deepEqual([1, 2, 4], [1, 2, 3])).toEqual(false);
    expect(deepEqual([1, 2], [1, 2, 3])).toEqual(false);

    expect(deepEqual([{ a: 1 }, { b: 2 }], [{ a: 1 }, { b: 2 }])).toEqual(true);
    expect(deepEqual([{ a: 2 }, { b: 2 }], [{ a: 1 }, { b: 2 }])).toEqual(false);

    expect(deepEqual({ '0': 0, '1': 1, length: 2 }, [0, 1])).toEqual(false);
  });

  it('dates', () => {
    expect(
      deepEqual(new Date('2015-05-01T22:16:18.234Z'), new Date('2015-05-01T22:16:18.234Z')),
    ).toEqual(true);

    expect(
      deepEqual(new Date('2015-05-01T22:16:18.234Z'), new Date('2017-01-01T00:00:00.000Z')),
    ).toEqual(false);

    expect(deepEqual(new Date('2015-05-01T22:16:18.234Z'), '2015-05-01T22:16:18.234Z')).toEqual(
      false,
    );

    expect(deepEqual(new Date('2015-05-01T22:16:18.234Z'), 1430518578234)).toEqual(false);

    expect(deepEqual(new Date('2015-05-01T22:16:18.234Z'), {})).toEqual(false);
  });

  it('regexps', () => {
    expect(deepEqual(/foo/, /foo/)).toEqual(true);
    expect(deepEqual(/foo/i, /foo/i)).toEqual(true);

    expect(deepEqual(/foo/, /bar/)).toEqual(false);
    expect(deepEqual(/foo/, /foo/i)).toEqual(false);

    expect(deepEqual(/foo/, 'foo')).toEqual(false);
    expect(deepEqual(/foo/, {})).toEqual(false);
  });

  it('functions', () => {
    let foo = () => {};
    let bar = () => {};

    expect(deepEqual(foo, foo)).toEqual(true);
    expect(deepEqual(foo, bar)).toEqual(false);
    expect(deepEqual(foo, () => {})).toEqual(false);
  });

  it('prototype', () => {
    function Test() {}
    Test.prototype.val = 42;

    expect(deepEqual(Test, Test)).toEqual(true);
  });

  it('constructor properties :: class', () => {
    class Test {
      private value: number;
      constructor(num?: any) {
        this.value = num;
      }
    }

    expect(deepEqual(new Test(), new Test())).toEqual(true);
    expect(deepEqual(new Test(123), new Test(123))).toEqual(true);
    expect(deepEqual(new Test(), new Test(123))).toEqual(false);
  });

  it('constructor properties :: defaults', () => {
    class Test {
      private value: number;
      constructor(num = 123) {
        this.value = num;
      }
    }

    expect(deepEqual(new Test(456), new Test(456))).toEqual(true);
    expect(deepEqual(new Test(123), new Test())).toEqual(true);
  });

  it('accessors', () => {
    class Test {
      get val() {
        return 42;
      }
    }

    expect(deepEqual(new Test(), new Test())).toEqual(true);
  });

  it('values but not prototype', () => {
    class Item {
      public foo: number;
      public bar: number;
      constructor() {
        this.foo = 1;
        this.bar = 2;
      }
    }

    const hello = new Item();
    const world = {
      foo: 1,
      bar: 2,
    };

    expect(deepEqual(hello, world)).toEqual(false);

    hello.foo = world.foo;
    hello.bar = world.bar;

    expect(deepEqual(hello, world)).toEqual(false);
  });

  it('flat', () => {
    const hello = new Map();
    const world = new Map();

    expect(deepEqual(hello, world)).toEqual(true);

    world.set('hello', 'world');
    expect(deepEqual(hello, world)).toEqual(false);

    hello.set('foo', 'bar');
    expect(deepEqual(hello, world)).toEqual(false);

    world.set('foo', 'bar');
    hello.set('hello', 'world');
    expect(deepEqual(hello, world)).toEqual(true);
  });

  it('nested', () => {
    const hello = new Map([
      ['foo', { a: 1 }],
      ['bar', [1, 2, 3]],
    ]);

    const world = new Map([['foo', 'bar']]);

    expect(deepEqual(hello, world)).toEqual(false);

    // @ts-ignore
    world.set('foo', { a: 1 });
    expect(deepEqual(hello, world)).toEqual(false);

    // @ts-ignore
    world.set('bar', [1, 2, 3]);
    expect(deepEqual(hello, world)).toEqual(true);

    // @ts-ignore
    hello.set('baz', new Map([['hello', 'world']]));
    expect(deepEqual(hello, world)).toEqual(false);

    // @ts-ignore
    world.set('baz', new Map([['hello', 'world']]));
    expect(deepEqual(hello, world)).toEqual(true);
  });

  it('keys :: complex', () => {
    const hello = new Map([[{ foo: 1 }, { a: 1 }]]);

    const world = new Map([[{ foo: 1 }, { a: 1 }]]);

    expect(deepEqual(hello, world)).toEqual(true);

    // @ts-ignore
    [...world.keys()][0].bar = 2;

    expect(deepEqual(hello, world)).toEqual(false);
  });

  it('keys :: value-based', () => {
    expect(deepEqual(new Map([[{ a: 1 }, undefined]]), new Map([[{ a: 1 }, {}]]))).toEqual(false);

    expect(deepEqual(new Map([[{ a: 1 }, 1]]), new Map([[{ a: 1 }, 1]]))).toEqual(true);
  });

  it('flat', () => {
    const hello = new Set();
    const world = new Set();

    expect(deepEqual(hello, world)).toEqual(true);

    world.add('hello');
    expect(deepEqual(hello, world)).toEqual(false);

    hello.add('foo');
    expect(deepEqual(hello, world)).toEqual(false);

    world.add('foo');
    hello.add('hello');
    expect(deepEqual(hello, world)).toEqual(true);
  });

  it('flat :: order', () => {
    const hello = new Set(['foo', 'bar']);
    const world = new Set(['bar', 'foo']);
    expect(deepEqual(hello, world)).toEqual(true);
  });

  it('complex', () => {
    const hello = new Set(['foo', 'bar', { a: 1 }, [1, 2, 3]]);

    const world = new Set(['foo', { a: 1 }, 'bar']);

    expect(deepEqual(hello, world)).toEqual(false);

    // @ts-ignore
    world.add([1, 2, 3]);
    expect(deepEqual(hello, world)).toEqual(true);

    world.delete('foo');
    expect(deepEqual(hello, world)).toEqual(false);

    world.add('foo');
    expect(deepEqual(hello, world)).toEqual(true);
  });

  it('buffer', () => {
    expect(deepEqual(Buffer.from('hello'), new Buffer('hello'))).toEqual(true);

    expect(deepEqual(Buffer.from('hello'), Buffer.from('world'))).toEqual(false);

    expect(deepEqual(Buffer.from('hello', 'base64'), Buffer.from('hello', 'utf8'))).toEqual(false);
  });

  it('Int16Array', () => {
    expect(deepEqual(new Int16Array([42]), new Int16Array([42]))).toEqual(true);

    expect(deepEqual(new Int16Array([1, 2, 3]), new Int16Array([1, 2]))).toEqual(false);

    expect(deepEqual(new Int16Array([1, 2, 3]), new Int16Array([4, 5, 6]))).toEqual(false);

    expect(deepEqual(new Int16Array([1, 2, 3]), new Uint16Array([1, 2, 3]))).toEqual(false);

    expect(deepEqual(new Int16Array([1, 2, 3]), new Int8Array([1, 2, 3]))).toEqual(false);
  });

  it('Int32Array', () => {
    expect(
      deepEqual(new Int32Array(new ArrayBuffer(4)), new Int32Array(new ArrayBuffer(4))),
    ).toEqual(true);

    expect(deepEqual(new Int32Array(8), new Uint32Array(8))).toEqual(false);

    expect(
      deepEqual(new Int32Array(new ArrayBuffer(8)), new Int32Array(Array.from({ length: 8 }))),
    ).toEqual(false);
  });

  it('ArrayBuffer', () => {
    expect(deepEqual(new ArrayBuffer(2), new ArrayBuffer(2))).toEqual(true);

    expect(deepEqual(new ArrayBuffer(1), new ArrayBuffer(2))).toEqual(false);
  });

  it('DataView', () => {
    expect(deepEqual(new DataView(new ArrayBuffer(4)), new DataView(new ArrayBuffer(4)))).toEqual(
      true,
    );

    const hello = new Int8Array([1, 2, 3, 4, 5]);
    const world = new Int8Array([1, 2, 3, 4, 5]);

    expect(deepEqual(hello, world)).toEqual(true);
    expect(deepEqual(hello.buffer, world.buffer)).toEqual(true);

    expect(deepEqual(new DataView(hello.buffer), new DataView(world.buffer))).toEqual(true);

    hello.fill(0);

    expect(deepEqual(hello, world)).toEqual(false);
    expect(deepEqual(hello.buffer, world.buffer)).toEqual(false);

    expect(deepEqual(new DataView(hello.buffer), new DataView(world.buffer))).toEqual(false);
  });

  it('kitchen sink', () => {
    expect(
      deepEqual(
        {
          prop1: 'value1',
          prop2: 'value2',
          prop3: 'value3',
          prop4: {
            subProp1: 'sub value1',
            subProp2: {
              subSubProp1: 'sub sub value1',
              subSubProp2: [1, 2, { prop2: 1, prop: 2 }, 4, 5],
            },
          },
          prop5: 1000,
          prop6: new Date(2016, 2, 10),
        },
        {
          prop5: 1000,
          prop3: 'value3',
          prop1: 'value1',
          prop2: 'value2',
          prop6: new Date('2016/03/10'),
          prop4: {
            subProp2: {
              subSubProp1: 'sub sub value1',
              subSubProp2: [1, 2, { prop2: 1, prop: 2 }, 4, 5],
            },
            subProp1: 'sub value1',
          },
        },
      ),
    ).toEqual(true);
  });
});
