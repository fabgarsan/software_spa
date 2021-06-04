import {useEffect, useRef} from 'react';

const useInterval = (callback: () => void, delay: number) => {
  const savedCallback = useRef<() => void>();

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    function tick() {
      if (savedCallback.current) savedCallback.current();
    }

    const id = setInterval(tick, delay);
    return () => {
      return clearInterval(id);
    };
  }, [delay]);
};

export default useInterval;
