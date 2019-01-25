import { useEffect } from 'react';
import createStorage from './utils/createStorage';

function usePagePosition(
  scollableElementId: string,
  positionDataKey = 'react-hooks-collection-page-positions',
  storePositionEvenWindowClosed = false
) {
  const storage = storePositionEvenWindowClosed
    ? createStorage('local')
    : createStorage('session');

  useEffect(() => {
    let pagePositions = storage.getItem(positionDataKey);
    const scrollPage = scollableElementId
      ? document.getElementById(scollableElementId)
      : null;
    const href = window.location.href;

    if (pagePositions[href]) {
      if (scrollPage) {
        scrollPage.scrollTop = pagePositions[href];
      } else {
        window.scrollTo(0, pagePositions[href]);
      }
    }
    return () => {
      pagePositions = {
        ...pagePositions,
        ...{
          [href]: scrollPage ? scrollPage.scrollTop : window.scrollY
        }
      };
      storage.setItem(positionDataKey, pagePositions);
    };
  }, []);
}

export default usePagePosition;
