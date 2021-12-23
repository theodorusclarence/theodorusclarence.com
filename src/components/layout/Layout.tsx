import * as React from 'react';

import sayHello from '@/lib/sayHello';

import Footer from '@/components/layout/Footer';
import Header from '@/components/layout/Header';

import { sayHelloFlag } from '@/constants/env';
import { PreloadProvider } from '@/context/PreloadContext';

let saidHello = !sayHelloFlag;

export default function Layout({ children }: { children: React.ReactNode }) {
  if (!saidHello) {
    sayHello();
    saidHello = true;
  }

  return (
    <>
      <Header />
      <PreloadProvider>
        <div id='skip-nav'>{children}</div>
      </PreloadProvider>
      <Footer />
    </>
  );
}
