import { useEffect, useState } from 'react';
import { usePreloadState } from '@/context/PreloadContext';

export default function useLoadingWithPreload() {
  const preloaded = usePreloadState();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // if initial load, wait for the loader to went off
    if (preloaded) {
      setIsLoaded(true);
    } else {
      setTimeout(() => {
        setIsLoaded(true);
      }, 200);
    }
  }, []);

  return { preloaded, isLoaded, setIsLoaded };
}
