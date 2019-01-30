import { useEffect } from 'react';

interface Ref {
  current: HTMLElement;
}

function useOnClickOutside(ref: Ref, onClickOutside: CallableFunction) {
  useEffect(
    () => {
      const handleClick = (event: Event) => {
        if (ref.current && !ref.current.contains(event.target as HTMLElement)) {
          onClickOutside(event);
        }
      };
      window.addEventListener('click', handleClick);
      window.addEventListener('touchstart', handleClick);
      return () => {
        window.removeEventListener('click', handleClick);
        window.removeEventListener('touchstart', handleClick);
      };
    },
    [onClickOutside]
  );
}

export default useOnClickOutside;
