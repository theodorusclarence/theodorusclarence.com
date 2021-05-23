import useSWR from 'swr';
import { SiSpotify } from 'react-icons/si';
import { AnimatePresence, motion } from 'framer-motion';

import fetcher from '@/utils/fetcher';

export default function SpotifyPlaying() {
  const { data } = useSWR('/api/spotify', fetcher);

  return (
    <AnimatePresence>
      {data?.isPlaying ? (
        <motion.a
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          target='_blank'
          rel='noopener noreferer'
          href={
            data?.isPlaying
              ? data.songUrl
              : 'https://open.spotify.com/user/erence21?si=yTsrZT5JSHOp7tn3ist7Ig'
          }
          className='relative flex items-center p-5 space-x-4 rounded-md border-thin w-72 ring-vis-0'
        >
          {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
          <div className='w-16 text-dark dark:text-light'>
            {data?.isPlaying ? (
              <img
                className='w-16 shadow-sm'
                src={data?.albumImageUrl}
                alt={data?.album}
              />
            ) : (
              <SiSpotify size={64} />
            )}
          </div>

          <div className='flex-1'>
            <p className='font-medium component'>
              {data?.isPlaying ? data.title : 'Not Listening'}
            </p>
            <p className='text-xs font-dark'>
              {data?.isPlaying ? data.artist : 'Spotify'}
            </p>
          </div>
          <div className='absolute bottom-1.5 right-1.5'>
            <SiSpotify size={20} color={'#1ED760'} />
          </div>
        </motion.a>
      ) : null}
    </AnimatePresence>
  );
}
