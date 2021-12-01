import * as React from 'react';

export default function SplitImage({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className='grid grid-cols-2 gap-4 items-start'>{children}</div>;
}

export function Split({ children }: { children: React.ReactNode }) {
  return <div className='flex flex-col space-y-4 !mb-0'>{children}</div>;
}
