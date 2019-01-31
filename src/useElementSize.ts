import { useState, useEffect } from 'react';
import throttle from 'lodash.throttle';

interface Ref {
  current: HTMLElement;
}

interface ElementSize {
  width: number;
  height: number;
}

function getSize(el: HTMLElement): ElementSize | {} {
  if (!el) {
    return {};
  }

  return {
    width: el.offsetWidth,
    height: el.offsetHeight
  };
}

function useElementSize(ref: Ref): ElementSize | {} {
  let [elementSize, setElementSize] = useState(getSize(ref.current));

  const handleSize = () => {
    if (ref && ref.current) {
      setElementSize(getSize(ref.current));
    }
  };

  const throttleCb = throttle(() => {
    handleSize();
  }, 150);

  useEffect(() => {
    handleSize();
    window.addEventListener('resize', throttleCb);
    return () => {
      window.removeEventListener('resize', throttleCb);
    };
  }, []);

  return elementSize;
}

export default useElementSize;
