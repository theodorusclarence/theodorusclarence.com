import useSWR from 'swr';
import fetcher from '../utils/fetcher';
import { SiSpotify } from 'react-icons/si';
import CustomLink from './CustomLink';

export default function SpotifyPlaying() {
    const { data } = useSWR('/api/spotify', fetcher);
    return (
        <a
            target='_blank'
            rel='noopener noreferer'
            href={
                data?.isPlaying
                    ? data.songUrl
                    : 'https://open.spotify.com/user/erence21?si=yTsrZT5JSHOp7tn3ist7Ig'
            }
            className='relative flex items-center p-5 space-x-4 rounded-md w-72 border-thin'
        >
            {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
            <div className='w-16'>
                {data?.isPlaying ? (
                    <img
                        className='w-16 shadow-sm'
                        src={data?.albumImageUrl}
                        alt={data?.album}
                    />
                ) : (
                    <SiSpotify size={64} color={'#1ED760'} />
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
        </a>
    );
}
