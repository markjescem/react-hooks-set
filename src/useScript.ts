import { useState, useEffect } from 'react';

let cachedScripts: string[] = [];
function useScript(scriptSrc: string) {
  const [loaded, setLoaded] = useState(false);
  const [loadError, setLoadError] = useState(false);

  useEffect(
    () => {
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

        script.addEventListener('load', onLoadResolve);
        script.addEventListener('error', onLoadReject);

        document.body.appendChild(script);

        return () => {
          script.removeEventListener('load', onLoadResolve);
          script.removeEventListener('error', onLoadReject);
        };
      }
    },
    [scriptSrc]
  );

  return [loaded, loadError];
}

export default useScript;
