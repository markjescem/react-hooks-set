import { useState, useEffect } from 'react';
import throttle from 'lodash.throttle';

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

  const handleSize = () => {
    if (ref && ref.current) {
      setOffsetLeft(getOffsetLeft(ref.current));
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

  return offsetLeft;
}

export default useElementLeft;
