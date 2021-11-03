import clsx from 'clsx';
import * as React from 'react';

import UnstyledLink from '@/components/links/UnstyledLink';

export type HeadingScrollSpy = Array<{
  id: string;
  level: number;
  text: string;
}>;

type TableOfContentsProps = {
  toc?: HeadingScrollSpy;
  activeSection: string | null;
  minLevel: number;
};

export default function TableOfContents({
  toc,
  activeSection,
  minLevel,
}: TableOfContentsProps) {
  return (
    <>
      {toc
        ? toc.map(({ id, level, text }) => (
            <UnstyledLink
              key={id}
              href={`#${id}`}
              className={clsx(
                'font-medium hover:text-gray-700 dark:hover:text-gray-200 focus:outline-none',
                'focus-visible:text-gray-700 dark:focus-visible:text-gray-200',
                activeSection === id
                  ? 'text-gray-900 dark:text-gray-100'
                  : 'text-gray-400 dark:text-gray-500'
              )}
              style={{ marginLeft: (level - minLevel) * 16 }}
            >
              {text}
            </UnstyledLink>
          ))
        : null}
    </>
  );
}
