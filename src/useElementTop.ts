import { useState, useEffect } from 'react';

interface Ref {
  current: HTMLElement;
}

function getOffsetTop(el: HTMLElement): number {
  if (!el) {
    return 0;
  }

  let offsetTop = el.offsetTop;
  type NullableHTMLElement = HTMLElement | null;
  let current: NullableHTMLElement = el.offsetParent as HTMLElement;
  while (current) {
    offsetTop += current.offsetTop;
    current = current.offsetParent as HTMLElement;
  }
  return offsetTop;
}

function useElementTop(ref: Ref): number {
  let [offsetTop, setOffsetTop] = useState(getOffsetTop(ref.current));

  function handleSize() {
    if (ref && ref.current) {
      setOffsetTop(getOffsetTop(ref.current));
    }
  }

  useEffect(() => {
    handleSize();
    window.addEventListener('resize', handleSize);
    return () => {
      window.removeEventListener('resize', handleSize);
    };
  }, []);

  return offsetTop;
}

export default useElementTop;
