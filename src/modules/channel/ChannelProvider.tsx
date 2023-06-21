import { FC, useEffect, useMemo, useState } from 'react'
import { usePrevious } from '@restart/hooks'

import {
  useGetEpgCurrentProgramQuery,
  useGetEpgAvailableDatesQuery,
  useGetEpgProgramByIdQuery,
} from '@/modules/channel/channel.api'

import { ChannelContext } from './channel.context'

import { IChannel } from './channel.model'

interface ChannelProviderProps {
  channel: IChannel
  children: React.ReactNode
}

const ChannelProvider: FC<ChannelProviderProps> = ({ channel, children }) => {
  const { data: epgProgramLive, isLoading: epgProgramLiveLoading } = useGetEpgCurrentProgramQuery(
    { channel_ptr: channel.id },
    { pollingInterval: 60 * 1000 },
  )
  const [epgProgramId, setEpgProgramId] = useState(-1)

  const { data: epgProgram, isLoading: epgProgramLoading } = useGetEpgProgramByIdQuery(
    epgProgramId,
    { skip: epgProgramId === -1 },
  )
  const epgAvailableDatesPayload = { channel_ptr: channel.id, dates: 1 }
  const { data: epgAvailableDates } = useGetEpgAvailableDatesQuery(epgAvailableDatesPayload)

  const epgProgramLivePrevius = usePrevious(epgProgramLive)

  const [date, setDate] = useState('')
  const changeEpgProgramId = (id: number) => setEpgProgramId(id)
  const changeDate = (date: string) => setDate(date)

  useEffect(() => {
    if (!epgProgramLive) return

    if (!epgProgramLivePrevius) setEpgProgramId(epgProgramLive.id)
    else if (epgProgramLivePrevius && epgProgramId === epgProgramLivePrevius.id) {
      setEpgProgramId(epgProgramLive.id)
    }
  }, [epgProgramLive])

  const dates = useMemo(() => {
    const result = { date, changeDate, currentDate: '', startDate: '', endDate: '' }

    const { current_start_time, min_start_time, max_start_time } = epgAvailableDates || {}
    if (current_start_time) {
      result.date = date || current_start_time
      result.currentDate = current_start_time
    }
    if (min_start_time) result.startDate = min_start_time
    if (max_start_time) result.endDate = max_start_time

    return result
  }, [date, epgAvailableDates])

  return (
    <ChannelContext.Provider
      value={{
        channel,
        epgProgramId,
        changeEpgProgramId,
        epgProgramLive,
        epgProgramLiveLoading,
        epgProgram,
        epgProgramLoading,
        ...dates,
      }}
    >
      {children}
    </ChannelContext.Provider>
  )
}

export default ChannelProvider
