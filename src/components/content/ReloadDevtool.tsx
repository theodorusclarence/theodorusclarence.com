import { useRouter } from 'next/router';
import * as React from 'react';
import { HiRefresh } from 'react-icons/hi';

import ButtonLink from '@/components/links/ButtonLink';

import { isProd } from '@/constants/env';

export default function ReloadDevtool() {
  const router = useRouter();

  return !isProd ? (
    <ButtonLink href={router.asPath} className='fixed bottom-4 left-4'>
      <HiRefresh />
    </ButtonLink>
  ) : null;
}
