import * as React from 'react';
import throttle from 'lodash.throttle';
import { on, off } from './utils/event';

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
  let [elementSize, setElementSize] = React.useState(getSize(ref.current));

  const handleSize = () => {
    if (ref && ref.current) {
      setElementSize(getSize(ref.current));
    }
  };

  const throttleCb = throttle(() => {
    handleSize();
  }, 150);

  React.useEffect(() => {
    handleSize();
    on(window, 'resize', throttleCb);
    return () => {
      off(window, 'resize', throttleCb);
    };
  }, []);

  return elementSize;
}

export default useElementSize;
