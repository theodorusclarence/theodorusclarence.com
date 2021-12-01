import clsx from 'clsx';
import * as React from 'react';

const PreloadContext = React.createContext<boolean>(false);

export function PreloadProvider({ children }: { children: React.ReactNode }) {
  /** If the dom is loaded */
  const [preloaded, setIsPreloaded] = React.useState<boolean>(false);

  React.useEffect(() => {
    setTimeout(() => {
      setIsPreloaded(true);
    }, 200);
  }, []);

  return (
    <PreloadContext.Provider value={preloaded}>
      <div
        className={clsx(
          'flex fixed inset-0 justify-center items-center bg-white transition-opacity dark:bg-dark',
          preloaded && 'opacity-0 pointer-events-none'
        )}
      />
      {children}
    </PreloadContext.Provider>
  );
}

export const usePreloadState = () => React.useContext(PreloadContext);
