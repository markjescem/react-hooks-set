import { useEffect } from 'react';

interface Ref {
  current: HTMLElement;
}

function useClickOutside(ref: Ref, onClickOutside: CallableFunction) {
  useEffect(
    () => {
      const handleClick = (event: Event) => {
        if (
          !ref.current ||
          !ref.current.contains(event.target as HTMLElement)
        ) {
          onClickOutside(event);
        }
      };
      window.addEventListener('click', handleClick);
      return () => {
        window.removeEventListener('click', handleClick);
      };
    },
    [onClickOutside]
  );
}

export default useClickOutside;
