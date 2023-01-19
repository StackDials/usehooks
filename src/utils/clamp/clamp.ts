/**
 * "Clamp a number between a minimum and maximum value."
 *
 * @since 0.0.1-alpha.0
 * @category Function
 * @param {number} value - The value to clamp.
 * @param {number} min - The minimum value that the returned value can be.
 * @param {number} max - The maximum value that the returned value can be.
 * @returns the minimum of the maximum of the value and the min, and the max.
 * @type {number}
 * @example
 *
 * Limit the output of this computation to between 0 and 255
 *
 * const data = clamp(255, 0, 255);
 * => data is 255;
 */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}
