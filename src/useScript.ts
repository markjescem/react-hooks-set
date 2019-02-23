import { useState, useEffect } from 'react';
import { on, off } from './utils/event';

let cachedScripts: string[] = [];
function useScript(scriptSrc: string) {
  const [loaded, setLoaded] = useState(false);
  const [loadError, setLoadError] = useState(false);

  useEffect(() => {
    if (!cachedScripts.includes(scriptSrc)) {
      setLoaded(true);
      setLoadError(false);
      return;
    } else {
      cachedScripts.push(scriptSrc);

      const script = document.createElement('script');
      script.src = scriptSrc;
      script.async = true;

      const onLoadResolve = () => {
        setLoaded(true);
        setLoadError(false);
      };

      const onLoadReject = () => {
        const index = cachedScripts.indexOf(scriptSrc);
        index >= 0 && cachedScripts.splice(index, 1);

        script.remove();

        setLoaded(true);
        setLoadError(true);
      };

      on(script, 'load', onLoadResolve);
      on(script, 'error', onLoadResolve);

      document.body.appendChild(script);

      return () => {
        off(script, 'load', onLoadResolve);
        off(script, 'error', onLoadResolve);
      };
    }
  }, [scriptSrc]);

  return [loaded, loadError];
}

export default useScript;
