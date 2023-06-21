import React from 'react'
import { IChannel, IEpg } from './channel.model'

export interface ChannelContextValue {
  channel: IChannel

  epgProgramId: number
  changeEpgProgramId: (id: number) => void

  epgProgramLive?: IEpg | null
  epgProgramLiveLoading: boolean
  epgProgram?: IEpg | null
  epgProgramLoading: boolean

  date: string
  changeDate: (date: string) => void
  currentDate: string
  startDate: string
  endDate: string
}

export const ChannelContext = React.createContext<ChannelContextValue>({
  channel: {} as IChannel,

  epgProgramId: -1,
  changeEpgProgramId: () => undefined,

  epgProgramLive: null,
  epgProgramLiveLoading: false,
  epgProgram: null,
  epgProgramLoading: false,

  date: '',
  changeDate: () => undefined,
  currentDate: '',
  startDate: '',
  endDate: '',
})
ChannelContext.displayName = 'ChannelContext'
