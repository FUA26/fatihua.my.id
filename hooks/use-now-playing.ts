import type { SpotifyNowPlayingData } from '@/types/data'
import { fetcher } from '@/utils/misc'
import useSWR from 'swr'

export function useNowPlaying() {
  let { data } = useSWR<SpotifyNowPlayingData>('/api/spotify', fetcher)
  return data || { isPlaying: false }
}
