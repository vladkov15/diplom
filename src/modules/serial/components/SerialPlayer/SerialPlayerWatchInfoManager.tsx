import { ReactElement, useContext, useEffect, useState } from 'react'

import Button from '@ui/components/button'
import PlayerWatchInfoManager from '@/modules/player/components/PlayerWatchInfoManager'
import WatchInfoOverlay from '@/modules/player/components/player/WatchInfoOverlay'
import { IWatchInfo } from '@/models/content'

import { IEpisode, ISerial, ISerialWatchInfo } from '../../serial.model'
import { SerialContext } from '../../serial.context'

export type SerialPlayerWatchInfoState = {
  showOverlay: boolean
  currentTime: number
  watchInfo: ISerialWatchInfo | null
  playLoading: boolean
  continuePlayLoading: boolean
}

type SerialPlayerWatchInfoRenderParameters = {
  episode: IEpisode
  currentTime: number
}

export interface SerialPlayerWatchInfoManagerProps {
  serial: ISerial
  children: (params: SerialPlayerWatchInfoRenderParameters) => ReactElement
}

const SerialPlayerWatchInfoManager = ({ serial, children }: SerialPlayerWatchInfoManagerProps) => {
  const [state, setState] = useState<SerialPlayerWatchInfoState>({
    showOverlay: true,
    currentTime: 0,
    watchInfo: serial.watching_info || null,
    playLoading: false,
    continuePlayLoading: false,
  })

  const { episode, changeSeasonId, changeEpisodeId, ...serialContext } = useContext(SerialContext)

  const handleClickPlay = () => {
    if (!serialContext.episodes) return

    setState((prev) => ({ ...prev, playLoading: true }))
    const episode = [...serialContext.episodes].shift()
    episode && changeEpisodeId(episode.id)
  }
  const handleClickContinuePlay = () => {
    if (!state.watchInfo) return

    const currentTime = state.watchInfo.duration
    setState((prev) => ({ ...prev, continuePlayLoading: true, currentTime }))
    state.watchInfo.season && changeSeasonId(state.watchInfo.season.id)
    state.watchInfo.serie && changeEpisodeId(state.watchInfo.serie.id)
  }

  useEffect(() => {
    if (!episode) return

    setState((prev) => ({
      ...prev,
      showOverlay: false,
      playLoading: false,
      continuePlayLoading: false,
    }))
  }, [episode])

  return (
    <PlayerWatchInfoManager watchInfo={state.watchInfo as IWatchInfo | null}>
      {(watchInfoState) => {
        if (!episode && state.showOverlay) {
          return (
            <WatchInfoOverlay cover={serial.image}>
              <Button onClick={handleClickPlay} size='sm' loader={state.playLoading} full>
                Смотреть
              </Button>
              {state.watchInfo && (
                <Button
                  onClick={handleClickContinuePlay}
                  variant='light'
                  size='sm'
                  loader={state.continuePlayLoading}
                  full
                >
                  <b>Продолжить просмотр</b>
                  <br />
                  <small>
                    {state.watchInfo.season.number} сезон, {state.watchInfo.serie.number} серия,{' '}
                    {watchInfoState.formatTime}
                  </small>
                </Button>
              )}
            </WatchInfoOverlay>
          )
        }
        return episode ? children({ episode, currentTime: state.currentTime }) : <></>
      }}
    </PlayerWatchInfoManager>
  )
}

export default SerialPlayerWatchInfoManager
