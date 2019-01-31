import { useState, useEffect } from 'react';
import throttle from 'lodash.throttle';

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

  const handleSize = () => {
    if (ref && ref.current) {
      setOffsetTop(getOffsetTop(ref.current));
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

  return offsetTop;
}

export default useElementTop;
