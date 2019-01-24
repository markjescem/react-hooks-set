import { useEffect } from 'react';
import createStorage from './utils/createStorage';

function usePagePosition(elementId: string) {
  const storage = createStorage('local');

  useEffect(() => {
    let pagePositions = storage.getItem('react-hooks-use-page-positions');
    const scrollPage = elementId ? document.getElementById(elementId) : null;
    const pathname = window.location.pathname;

    if (pagePositions[pathname]) {
      if (scrollPage) {
        scrollPage.scrollTop = pagePositions[pathname];
      } else {
        window.scrollTo(0, pagePositions[pathname]);
      }
    }
    return () => {
      pagePositions = {
        ...pagePositions,
        ...{
          [pathname]: scrollPage ? scrollPage.scrollTop : window.scrollY
        }
      };
      storage.setItem('react-hooks-use-page-positions', pagePositions);
    };
  }, []);
}

export default usePagePosition;
