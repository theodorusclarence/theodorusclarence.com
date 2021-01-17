import useSWR from 'swr';
import fetcher from '../utils/fetcher';

export default function SpotifyPlaying() {
    const { data } = useSWR('/api/spotify', fetcher);
    return (
        <div>
            <pre>{JSON.stringify(data, null, 2)}</pre>
            <img src={data?.albumImageUrl} alt={data?.album} />
            <p>{data?.title || 'Not Listening'}</p>
            <p>{data?.artist || 'Spotify'}</p>
        </div>
    );
}
