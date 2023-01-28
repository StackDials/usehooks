import React from 'react';

import { deepEqual } from '../utils/deep-equal';

type UseEffectParams = Parameters<typeof React.useEffect>;
type EffectCallback = UseEffectParams[0];
type DependencyList = UseEffectParams[1];
type UseEffectReturn = ReturnType<typeof React.useEffect>;

function isPrimitive(value: any) {
  return value == null || /^[sbn]/.test(typeof value);
}

function checkDeps(deps: DependencyList) {
  if (!deps?.length) {
    throw new Error(
      'useDeepCompareEffect should not be used with no dependencies. Use React.useEffect instead.',
    );
  }
  if (deps.every(isPrimitive)) {
    throw new Error(
      'useDeepCompareEffect should not be used with dependencies that are all primitive values. Use React.useEffect instead.',
    );
  }
}

/**
 * @param value the value to be memoized (usually a dependency list)
 * @returns a memoized version of the value as long as it remains deeply equal
 */
export function useDeepCompareMemoize<T>(value: T) {
  const reference = React.useRef<T>(value);
  const signalReference = React.useRef<number>(0);

  if (!deepEqual(value, reference.current)) {
    reference.current = value;
    signalReference.current += 1;
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  return React.useMemo(() => reference.current, [signalReference.current]);
}

export function useDeepCompareEffect(
  callback: EffectCallback,
  dependencies: DependencyList,
): UseEffectReturn {
  if (process.env.NODE_ENV !== 'production') {
    checkDeps(dependencies);
  }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  return React.useEffect(callback, useDeepCompareMemoize(dependencies));
}

export function useDeepCompareEffectNoCheck(
  callback: EffectCallback,
  dependencies: DependencyList,
): UseEffectReturn {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  return React.useEffect(callback, useDeepCompareMemoize(dependencies));
}
