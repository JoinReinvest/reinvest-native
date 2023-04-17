import { useEffect, useRef } from 'react';

type Timer = ReturnType<typeof setTimeout>;
type ParamFunction = (...args: any[]) => void;

export function useDebounce<Func extends ParamFunction>(func: Func, delay = 1000) {
  const timer = useRef<Timer>();

  useEffect(() => {
    return () => {
      if (!timer.current) return;

      clearTimeout(timer.current);
    };
  }, []);

  const debouncedFunction = ((...args: any[]) => {
    const newTimer = setTimeout(() => {
      return func(...args);
    }, delay);
    clearTimeout(timer.current);
    timer.current = newTimer;
  }) as Func;

  return debouncedFunction;
}
