import { FC, ReactNode, useEffect, useState } from 'react'
import useUpdateEffect from '@restart/hooks/useUpdateEffect'

import { SerialContext } from '@/modules/serial/serial.context'
import { useGetEpisodesBySeasonIdQuery, useGetEpisodeByIdQuery } from '@/modules/serial/serial.api'

import { ISerial } from '@/modules/serial/serial.model'

interface SerialProviderProps {
  serial: ISerial
  children: ReactNode
}

const SerialProvider: FC<SerialProviderProps> = ({ serial, children }) => {
  const [seasonId, setSeasonId] = useState(-1)
  const changeSeasonId = (id: number) => setSeasonId(id)

  const [episodeId, setEpisodeId] = useState(-1)
  const changeEpisodeId = (id: number) => setEpisodeId(id)

  const {
    data: episodes,
    isLoading: episodesLoading,
    isFetching: episodesFetching,
  } = useGetEpisodesBySeasonIdQuery(seasonId, { skip: seasonId === -1 })

  const {
    data: episode,
    isLoading: episodeLoading,
    isFetching: episodeFetching,
  } = useGetEpisodeByIdQuery({ episodeId, player: 1 }, { skip: episodeId === -1 })

  useEffect(() => {
    const seasson = [...serial.seasons].shift()
    seasson && setSeasonId(seasson.id)
  }, [serial.seasons])

  useUpdateEffect(() => {
    changeEpisodeId(-1)
  }, [serial])

  return (
    <SerialContext.Provider
      value={{
        serial,
        seasonId,
        changeSeasonId,
        episodeId,
        changeEpisodeId,
        episode,
        episodeLoading,
        episodeFetching,
        episodes,
        episodesLoading,
        episodesFetching,
      }}
    >
      {children}
    </SerialContext.Provider>
  )
}

export default SerialProvider
