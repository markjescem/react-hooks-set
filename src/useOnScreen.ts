import { useState, useEffect } from 'react';
import throttle from 'lodash.throttle';

interface Ref {
  current: HTMLElement;
}

function checkVisible(
  ref: Ref,
  offset: number = 0,
  partialVisibility: boolean = false
) {
  if (!ref || !ref.current || !ref.current.getBoundingClientRect) return false;

  const {
    width,
    height,
    left,
    right,
    top,
    bottom
  } = ref.current.getBoundingClientRect();

  const windowWidth = window.innerWidth || document.documentElement.clientWidth;
  const windowHeight =
    window.innerHeight || document.documentElement.clientHeight;

  const topThreshold = 0 - offset;
  const leftThreshold = 0 - offset;
  const widthCheck = windowWidth + offset;
  const heightCheck = windowHeight + offset;

  return partialVisibility
    ? left + width >= topThreshold &&
        top + height >= leftThreshold &&
        right - width <= widthCheck &&
        bottom - height <= heightCheck
    : left >= topThreshold &&
        top >= leftThreshold &&
        right <= widthCheck &&
        bottom <= heightCheck;
}

function useOnScreen(
  ref: Ref,
  offset: number,
  partialVisibility: boolean = false
) {
  const [isVisible, setVisible] = useState(false);

  useEffect(() => {
    const throttleCb = throttle(() => {
      setVisible(checkVisible(ref, offset, partialVisibility));
    }, 150);

    setVisible(checkVisible(ref, offset, partialVisibility));

    window.addEventListener('scroll', throttleCb);
    window.addEventListener('resize', throttleCb);

    return () => {
      window.removeEventListener('scroll', throttleCb);
      window.removeEventListener('resize', throttleCb);
    };
  }, []);

  return isVisible;
}

export default useOnScreen;
