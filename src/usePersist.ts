import { useState, useEffect } from 'react';
import createStorage from './utils/createStorage';

function usePersist(
  key: string,
  initialState: any,
  persistEvenWindowClosed = false
) {
  const storage = persistEvenWindowClosed
    ? createStorage('local')
    : createStorage('session');

  const getValue = () => {
    return storage.getItem(key) ? storage.getItem(key) : initialState;
  };

  const [state, setState] = useState(getValue());

  const updateState = (value: any) => {
    storage.setItem(key, value);
    setState(value);
  };

  const clearState = () => {
    storage.removeItem(key);
    setState(null);
  };

  const syncState = (e: any) => {
    e.key === key && setState(storage.getItem(key));
  };

  useEffect(() => {
    window.addEventListener('storage', syncState);
    return () => {
      window.removeEventListener('storage', syncState);
    };
  }, []);

  return [state, updateState, clearState];
}

export default usePersist;
