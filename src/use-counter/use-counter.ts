import { useState } from 'react';

import { clamp } from '../utils';

interface IOptions {
  min: number;
  max: number;
}

interface IHandlers {
  increment: () => void;
  decrement: () => void;
  set: (value: number) => void;
  reset: () => void;
}

const DEFAULT_OPTIONS: IOptions = {
  min: Number.NEGATIVE_INFINITY,
  max: Number.POSITIVE_INFINITY,
};

/**
 * It returns a tuple of the current count and an object with functions to increment, decrement, set,
 * and reset the count
 *
 * @param [initialValue=0] - The initial value of the counter.
 * @param [options] - Partial<IOptions>
 * @returns The return type is a tuple of two elements. The first element is a number and the second
 * element is an object.
 */
export function useCounter(
  initialValue = 0,
  options?: Partial<IOptions>,
): readonly [number, IHandlers] {
  const { min, max } = { ...DEFAULT_OPTIONS, ...options };
  const [count, setCount] = useState<number>(clamp(initialValue, min, max));

  const increment = () => setCount((current) => clamp(current + 1, min, max));
  const decrement = () => setCount((current) => clamp(current - 1, min, max));
  const set = (value: number) => setCount(clamp(value, min, max));
  const reset = () => setCount(clamp(initialValue, min, max));

  return [
    count,
    {
      increment,
      decrement,
      set,
      reset,
    },
  ] as const;
}
