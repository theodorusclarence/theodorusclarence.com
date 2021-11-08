import * as React from 'react';

import { usePreloadState } from '@/context/PreloadContext';

export default function useLoaded() {
  const preloaded = usePreloadState();
  const [isLoaded, setIsLoaded] = React.useState<boolean>(false);

  React.useEffect(() => {
    if (preloaded) {
      setIsLoaded(true);
    } else {
      setTimeout(() => {
        setIsLoaded(true);
      }, 200);
    }
  }, [preloaded]);

  return isLoaded;
}
