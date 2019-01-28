import { useState, useEffect } from 'react';

interface Ref {
  current: HTMLElement;
}

function getOffsetLeft(el: HTMLElement): number {
  if (!el) {
    return 0;
  }

  let offsetLeft = el.offsetLeft;
  type NullableHTMLElement = HTMLElement | null;
  let current: NullableHTMLElement = el.offsetParent as HTMLElement;
  while (current) {
    offsetLeft += current.offsetLeft;
    current = current.offsetParent as HTMLElement;
  }
  return offsetLeft;
}

function useElementLeft(ref: Ref): number {
  let [offsetLeft, setOffsetLeft] = useState(getOffsetLeft(ref.current));

  function handleSize() {
    if (ref && ref.current) {
      setOffsetLeft(getOffsetLeft(ref.current));
    }
  }

  useEffect(() => {
    handleSize();
    window.addEventListener('resize', handleSize);
    return () => {
      window.removeEventListener('resize', handleSize);
    };
  }, []);

  return offsetLeft;
}

export default useElementLeft;
