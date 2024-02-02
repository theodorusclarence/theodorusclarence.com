import axios from 'axios';

import { SpotifyData } from '@/types/spotify';

export async function getSpotifyNowPlaying() {
  return axios.get<SpotifyData>('/api/spotify').then((res) => res.data);
}
