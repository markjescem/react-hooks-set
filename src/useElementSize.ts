import { useState, useEffect } from 'react';

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

  function handleSize() {
    if (ref && ref.current) {
      setElementSize(getSize(ref.current));
    }
  }

  useEffect(() => {
    handleSize();
    window.addEventListener('resize', handleSize);
    return () => {
      window.removeEventListener('resize', handleSize);
    };
  }, []);

  return elementSize;
}

export default useElementSize;
