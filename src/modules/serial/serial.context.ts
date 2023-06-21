import { createContext } from 'react'
import { IEpisode, ISeasonEpisode, ISerial } from '@/modules/serial/serial.model'

export interface SerialContextValue {
  serial: ISerial

  seasonId: number
  changeSeasonId: (id: number) => void

  episodeId: number
  changeEpisodeId: (id: number, player?: 0 | 1) => void

  episode?: IEpisode
  episodeLoading: boolean
  episodeFetching: boolean

  episodes?: ISeasonEpisode[]
  episodesLoading: boolean
  episodesFetching: boolean
}

export const SerialContext = createContext<SerialContextValue>({
  serial: {} as ISerial,

  seasonId: -1,
  changeSeasonId: () => undefined,

  episodeId: -1,
  changeEpisodeId: () => undefined,

  episode: {} as IEpisode,
  episodeLoading: false,
  episodeFetching: false,

  episodes: [],
  episodesLoading: false,
  episodesFetching: false,
})

SerialContext.displayName = 'SerialContext'
