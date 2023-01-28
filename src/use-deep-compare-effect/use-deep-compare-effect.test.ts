import { renderHook } from '@testing-library/react';

import {
  useDeepCompareEffect,
  useDeepCompareEffectNoCheck,
} from './use-deep-compare-effect';

describe('use-counter', () => {
  it('useDeepCompareEffect throws an error if using it with an empty array', () => {
    const { result } = renderHook(() => useDeepCompareEffect(() => {}, []));
    expect(result.error).toMatchInlineSnapshot(
      '[Error: useDeepCompareEffect should not be used with no dependencies. Use React.useEffect instead.]',
    );
  });

  it('useDeepCompareEffect throws an error if using it with an array of only primitive values', () => {
    const { result } = renderHook(() => useDeepCompareEffect(() => {}, [true, 1, 'string']));
    expect(result.error).toMatchInlineSnapshot(
      '[Error: useDeepCompareEffect should not be used with dependencies that are all primitive values. Use React.useEffect instead.]',
    );
  });

  it('useDeepCompareEffectNoCheck don\'t throw an error if using it with an array of only primitive values', () => {
    const errorMock = jest.spyOn(console, 'error').mockImplementation(() => {});
    expect(() =>
      renderHook(() => useDeepCompareEffectNoCheck(() => {}, [true, 1, 'string'])),
    ).not.toThrow();
    expect(console.error).toHaveBeenCalledTimes(0);
    errorMock.mockRestore();
  });

  it('in production mode there are no errors thrown', () => {
    const environment = process.env.NODE_ENV;
    process.env.NODE_ENV = 'production';
    renderHook(() => useDeepCompareEffect(() => {}, [true, 1, 'string']));
    renderHook(() => useDeepCompareEffect(() => {}, []));
    process.env.NODE_ENV = environment;
  });

  it('useDeepCompareEffect handles changing values as expected', () => {
    const callback = jest.fn();
    let deps = [1, { a: 'b' }, true];
    const { rerender } = renderHook(() => useDeepCompareEffect(callback, deps));

    expect(callback).toHaveBeenCalledTimes(1);
    callback.mockClear();

    // no change
    rerender();
    expect(callback).toHaveBeenCalledTimes(0);
    callback.mockClear();

    // no-change (new object with same properties)
    deps = [1, { a: 'b' }, true];
    rerender();
    expect(callback).toHaveBeenCalledTimes(0);
    callback.mockClear();

    // change (new primitive value)
    deps = [2, { a: 'b' }, true];
    rerender();
    expect(callback).toHaveBeenCalledTimes(1);
    callback.mockClear();

    // no-change
    rerender();
    expect(callback).toHaveBeenCalledTimes(0);
    callback.mockClear();

    // change (new primitive value)
    deps = [1, { a: 'b' }, false];
    rerender();
    expect(callback).toHaveBeenCalledTimes(1);
    callback.mockClear();

    // change (new properties on object)
    deps = [1, { a: 'c' }, false];
    rerender();
    expect(callback).toHaveBeenCalledTimes(1);
    callback.mockClear();
  });

  // this may be useful in the future, but we don't support it today so I thought
  // it'd be good to include as a it as it would be a breaking change if we
  // did add support. I'm inclined to not support this. Manipulation is not good.
  it('useDeepCompareEffect does NOT work with manipulation', () => {
    const callback = jest.fn();
    const deps = [{ a: 'b' }];
    const { rerender } = renderHook(() => useDeepCompareEffect(callback, deps));
    expect(callback).toHaveBeenCalledTimes(1);
    callback.mockClear();

    deps[0].a = 'c';
    rerender();
    expect(callback).toHaveBeenCalledTimes(0);
  });

  it('useDeepCompareEffect works with deep object similarities/differences', () => {
    const callback = jest.fn();
    let deps: Array<Record<string, unknown>> = [{ a: { b: { c: 'd' } } }];
    const { rerender } = renderHook(() => useDeepCompareEffect(callback, deps));
    expect(callback).toHaveBeenCalledTimes(1);
    callback.mockClear();

    // change primitive value
    deps = [{ a: { b: { c: 'e' } } }];
    rerender();
    expect(callback).toHaveBeenCalledTimes(1);
    callback.mockClear();

    // no-change
    deps = [{ a: { b: { c: 'e' } } }];
    rerender();
    expect(callback).toHaveBeenCalledTimes(0);
    callback.mockClear();

    // add property
    deps = [{ a: { b: { c: 'e' }, f: 'g' } }];
    rerender();
    expect(callback).toHaveBeenCalledTimes(1);
    callback.mockClear();
  });

  it('useDeepCompareEffect works with getDerivedStateFromProps', () => {
    const callback = jest.fn();
    const { rerender } = renderHook(
      ({ a }: { a: number }) => {
        const [lastA, setLastA] = useState(a);
        const [c, setC] = useState(5);
        if (lastA !== a) {
          setLastA(a);
          setC(1);
        }
        useDeepCompareEffect(callback, [{ a, c }]);
      },
      { initialProps: { a: 1 } },
    );
    expect(callback).toHaveBeenCalledTimes(1);
    callback.mockClear();

    // change a, and reset c
    rerender({ a: 2 });
    expect(callback).toHaveBeenCalledTimes(1);
    callback.mockClear();
  });
});
