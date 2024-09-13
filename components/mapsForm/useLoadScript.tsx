import { useEffect, useState } from 'react';

const useLoadScript = (src, options = {}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = src;
    script.async = true;
    script.defer = true;

    Object.keys(options).forEach((key) => {
      script[key] = options[key];
    });

    script.onload = () => {
      setIsLoaded(true);
    };

    script.onerror = (e) => {
      setError(e);
    };

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, [src, options]);

  return { isLoaded, error };
};

export default useLoadScript;
