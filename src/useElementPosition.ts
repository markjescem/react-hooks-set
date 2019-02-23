import { useState, useEffect } from 'react';
import throttle from 'lodash.throttle';
import { on, off } from './utils/event';

interface Ref {
  current: HTMLElement;
}

interface Position {
  left: number;
  top: number;
}

function getPosition(el: HTMLElement): Position {
  if (!el) {
    return {
      left: 0,
      top: 0
    };
  }

  let offsetLeft = el.offsetLeft;
  let offsetTop = el.offsetTop;
  let current: HTMLElement | null = el.offsetParent as HTMLElement;

  while (current) {
    offsetLeft += current.offsetLeft;
    offsetTop += current.offsetTop;
    current = current.offsetParent as HTMLElement;
  }

  return {
    left: offsetLeft,
    top: offsetTop
  };
}

function useElementPosition(ref: Ref): Position {
  let [position, setPosition] = useState(getPosition(ref.current));

  const handleSize = () => {
    if (ref && ref.current) {
      setPosition(getPosition(ref.current));
    }
  };

  const throttleCb = throttle(() => {
    handleSize();
  }, 150);

  useEffect(() => {
    handleSize();
    on(window, 'resize', throttleCb);
    return () => {
      off(window, 'resize', throttleCb);
    };
  }, []);

  return position;
}

export default useElementPosition;
