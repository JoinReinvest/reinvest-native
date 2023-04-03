import { ForwardedRef, useEffect, useRef } from 'react';

export const useForwardRef = <T extends object>(ref: ForwardedRef<T>, initialValue: T | null = null) => {
  const targetRef = useRef<T>(initialValue);

  useEffect(() => {
    if (!ref) {
      return;
    }

    if (typeof ref === 'function') {
      ref(targetRef.current);
    }

    if (typeof ref === 'object') {
      ref.current = targetRef.current;
    }
  }, [ref]);

  return targetRef;
};
