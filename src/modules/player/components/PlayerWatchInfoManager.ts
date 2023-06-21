import { ReactElement, useMemo, useState } from 'react'

import { IWatchInfo } from '@/models/content'
import { formatTime } from './controls/ProgressBar'

export type PlayerWatchInfoManagerState = {
  currentTime: number
}

type PlayerWatchInfoManagerRenderParameters = PlayerWatchInfoManagerState & { formatTime: string }

export interface PlayerWatchInfoManagerProps {
  watchInfo: IWatchInfo | null
  children: (params: PlayerWatchInfoManagerRenderParameters) => ReactElement
}

const PlayerWatchInfoManager = ({ watchInfo, children, ...props }: PlayerWatchInfoManagerProps) => {
  const [state] = useState<PlayerWatchInfoManagerState>({ currentTime: watchInfo?.duration || 0 })

  const watchTime = useMemo(() => {
    const currentTime = state.currentTime
    const hours = Math.floor(currentTime / 3600)
    const minutes = Math.floor((currentTime % 3600) / 60)
    const seconds = (currentTime % 3600) % 60

    return { hours, minutes, seconds, formatTime: formatTime(currentTime) }
  }, [state.currentTime])

  return children({ currentTime: state.currentTime, formatTime: watchTime.formatTime })
}

export default PlayerWatchInfoManager
