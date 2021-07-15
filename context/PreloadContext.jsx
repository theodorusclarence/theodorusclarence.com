import { classNames } from '@/utils/helper';
import sayHello from '@/utils/sayHello';
import { createContext, useContext, useEffect, useState } from 'react';

const PreloadContext = createContext(false);

export const PreloadProvider = ({ children }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    sayHello();
    setTimeout(() => setIsLoaded(true), 100);
  }, []);

  return (
    <PreloadContext.Provider value={isLoaded}>
      <div
        className={classNames(
          'fixed flex items-center justify-center inset-0 transition-opacity bg-white dark:bg-dark',
          isLoaded && 'opacity-0 pointer-events-none'
        )}
      ></div>
      {children}
    </PreloadContext.Provider>
  );
};

export const usePreloadState = () => useContext(PreloadContext);
