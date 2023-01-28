import { useEffect, useLayoutEffect } from 'react';

/**
 * useIsomorphicEffect
 * Resolves to useEffect when "window" or "document" is not in scope and useLayout effect in the browser
 *
 * @param {Function} callback Callback function to be called on mount
 */
export const useIsomorphicEffect = (typeof document !== 'undefined' || typeof window !== 'undefined') ? useLayoutEffect : useEffect;