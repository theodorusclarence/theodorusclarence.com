import clsx from 'clsx';
import { useRouter } from 'next/router';
import * as React from 'react';

import { trackEvent } from '@/lib/analytics';
import clsxm from '@/lib/clsxm';

import UnstyledLink from '@/components/links/UnstyledLink';

export default function CarbonAds({ className }: { className?: string }) {
  const router = useRouter();
  const [showing, setShowing] = React.useState(false);

  React.useEffect(() => {
    const isCarbonExist = document.querySelector('#carbonads');
    if (isCarbonExist) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      _carbonads.refresh();
      return;
    }

    const script = document.createElement('script');
    script.src =
      'https://cdn.carbonads.com/carbon.js?serve=CWYDE23M&placement=theodorusclarencecom';
    script.id = '_carbonads_js';
    script.async = true;

    document.querySelectorAll('#carbon-container')[0].appendChild(script);

    script.addEventListener('load', () => {
      setShowing(true);
    });
  }, [router.asPath]);

  return (
    <div className={clsxm('', className)}>
      <div id='carbon-container'></div>
      {showing && (
        <span
          className={clsx(
            'mt-2 text-center leading-snug',
            'rounded bg-gray-500 bg-opacity-10 px-2 py-0.5 text-[.7rem] text-gray-500 dark:bg-opacity-20'
          )}
        >
          This ad helps me with the server cost. You can also{' '}
          <UnstyledLink
            className='underline hover:text-primary-500 dark:hover:text-primary-400'
            onClick={() => trackEvent('Sponsor Click', { type: 'link' })}
            href='https://github.com/sponsors/theodorusclarence'
          >
            sponsor
          </UnstyledLink>{' '}
          me 😀
        </span>
      )}
    </div>
  );
}
