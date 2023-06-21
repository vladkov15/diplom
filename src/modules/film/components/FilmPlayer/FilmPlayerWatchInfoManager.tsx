import { ReactElement, useContext, useEffect, useState } from 'react'

import Button from '@ui/components/button'
import PlayerWatchInfoManager from '@/modules/player/components/PlayerWatchInfoManager'
import WatchInfoOverlay from '@/modules/player/components/player/WatchInfoOverlay'
import { IWatchInfo } from '@/models/content'

import { formatTime } from '@/modules/player/helpers/common.helper'
import { IFilm, IFilmWatchInfo } from '../../film.model'

export type FilmPlayerWatchInfoState = {
  showOverlay: boolean
  currentTime: number
  watchInfo: IFilmWatchInfo | null
}

type FilmPlayerWatchInfoRenderParameters = Omit<
  FilmPlayerWatchInfoState,
  'showOverlay' | 'watchInfo'
>

export interface FilmPlayerWatchInfoManagerProps {
  film: IFilm
  children: (params: FilmPlayerWatchInfoRenderParameters) => ReactElement
}

const FilmPlayerWatchInfoManager = ({ film, children }: FilmPlayerWatchInfoManagerProps) => {
  const [state, setState] = useState<FilmPlayerWatchInfoState>({
    showOverlay: true,
    currentTime: 0,
    watchInfo: film.watching_info,
  })

  const handleClickPlay = () => setState((prev) => ({ ...prev, showOverlay: false }))

  const handleClickContinuePlay = () => {
    if (!state.watchInfo) return

    const currentTime = state.watchInfo.duration
    setState((prev) => ({ ...prev, showOverlay: false, currentTime }))
  }

  return (
    <PlayerWatchInfoManager watchInfo={state.watchInfo as IWatchInfo}>
      {(watchInfoState) => {
        if (state.showOverlay) {
          return (
            <WatchInfoOverlay cover={film.image}>
              <Button onClick={handleClickPlay} size='sm' full>
                Смотреть
              </Button>
              {state.watchInfo && (
                <Button onClick={handleClickContinuePlay} variant='light' size='sm' full>
                  <b>Продолжить просмотр</b>
                  <br />
                  <small>{watchInfoState.formatTime}</small>
                </Button>
              )}
            </WatchInfoOverlay>
          )
        }
        return children({ currentTime: state.currentTime })
      }}
    </PlayerWatchInfoManager>
  )
}

export default FilmPlayerWatchInfoManager
