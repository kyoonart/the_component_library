import { useState, useEffect } from "react";

function useDebounce(value: any, delay = 300) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

export default useDebounce;
// useEffect 处理函数的副作用 当useEffect函数返回一个函数的时候代表着下次update的时候清理函数的副作用
//  这里正好利用这一点来clear
