import { ReactFlashlight } from 'react-flashlight';
import { GiLightBulb } from 'react-icons/gi';

import UnstyledLink from '@/components/UnstyledLink';
import Seo from '@/components/Seo';

export default function Custom404() {
  return (
    <div style={{ cursor: 'url("/images/cursor.png"), pointer' }}>
      <Seo title='404 Not Found - theodorusclarence.com' />
      <ReactFlashlight
        darkness={0.8}
        size={200}
        showCursor={true}
        initialPosition={{ x: 187, y: 400 }}
      >
        <div className='flex flex-col items-center justify-center min-h-screen'>
          <GiLightBulb
            size={60}
            className='text-yellow-300 animate-flicker drop-shadow-glow'
          />
          <h1 className='mt-8'>Page Not Found</h1>
          <UnstyledLink
            href='/'
            className='p-8 mt-4 text-3xl font-bold hover:text-accent-300'
          >
            Back To Home
          </UnstyledLink>
        </div>
      </ReactFlashlight>
    </div>
  );
}
