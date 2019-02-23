import { useEffect } from 'react';
import { on, off } from './utils/event';

interface Ref {
  current: HTMLElement;
}

function useOnClickOutside(ref: Ref, onClickOutside: CallableFunction) {
  useEffect(() => {
    const handleClick = (event: any) => {
      if (ref.current && !ref.current.contains(event.target as HTMLElement)) {
        onClickOutside(event);
      }
    };
    on(window, 'click', handleClick);
    on(window, 'touchstart', handleClick);
    return () => {
      off(window, 'click', handleClick);
      off(window, 'touchstart', handleClick);
    };
  }, [onClickOutside]);
}

export default useOnClickOutside;
