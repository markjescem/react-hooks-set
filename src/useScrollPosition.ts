import { useEffect } from 'react';
import createStorage from './utils/createStorage';

interface Ref {
  current: HTMLElement;
}

function useScrollPosition(
  srcollRef: Ref,
  positionDataKey = 'react-hooks-set-scroll-positions',
  storePositionEvenWindowClosed = false
) {
  const storage = storePositionEvenWindowClosed
    ? createStorage('local')
    : createStorage('session');

  useEffect(() => {
    let scrollPositions = storage.getItem(positionDataKey);
    const href = window.location.href;
    const scollContainer = srcollRef ? srcollRef.current : null;

    if (scrollPositions[href]) {
      if (scollContainer) {
        scollContainer.scrollTop = scrollPositions[href];
      } else {
        window.scrollTo(0, scrollPositions[href]);
      }
    }
    return () => {
      scrollPositions = {
        ...scrollPositions,
        ...{
          [href]: scollContainer ? scollContainer.scrollTop : window.scrollY
        }
      };
      storage.setItem(positionDataKey, scrollPositions);
    };
  }, []);
}

export default useScrollPosition;
