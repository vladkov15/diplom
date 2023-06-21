import React, { FC, useCallback } from 'react'
import dynamic from 'next/dynamic'

import { IUrl } from '@/models/content'
import { PlayerProps as PlayerPropsBase } from '@/modules/player/components/Player'
import { OverlayProps } from '@/modules/player/components/player/Overlay'
import PlayerSkeleton from '@/modules/player/components/PlayerSkeleton'
import UrlSettings from '@/components/ContentPlayer/controls/UrlSettings'

import PlayerUrlManager, {
  PlayerUrlRenderParameters,
} from '@/modules/player/components/PlayerUrlManager'
import PlayerEventManager, {
  PlayerEventManagerProps,
} from '@/modules/player/components/PlayerEventManager'
import PlayerPremierTrexCounterManager, {
  PlayerPremierTrexCounterManagerProps,
} from '@/modules/player/components/PlayerPremierTrexCounterManager'

const Player = dynamic(() => import('@/modules/player/components/Player'), {
  ssr: false,
  loading: () => <PlayerSkeleton loading />,
})

type ExcludedPlayerProps =
  | 'url'
  | 'contentId'
  | 'onBeforeReInit'
  | 'onInit'
  | 'onReInit'
  | 'onPlay'
  | 'onPause'
  | 'onStop'
  | 'onEnded'
  | 'onStartRewind'
  | 'onEndRewind'
  | 'overlayProps'

type OmitUrlState = Omit<PlayerUrlRenderParameters, 'url'>
type OmitPlayerProps = Omit<PlayerPropsBase, ExcludedPlayerProps>
type OmitPlayerEventsManagerProps = Omit<PlayerEventManagerProps, 'url' | 'children'>

type PlayerProps = OmitPlayerProps & {
  getOverlayProps: (urlState: OmitUrlState) => Partial<OverlayProps> | undefined
}

type OmitPlayerPremierTrexCounterProps = Omit<
  PlayerPremierTrexCounterManagerProps,
  'children' | ExcludedPlayerProps
>

interface ContentPlayerProps {
  url: IUrl[] | string
  playerProps: PlayerProps
  playerEventsProps: OmitPlayerEventsManagerProps
  playerPremierTrexCounterProps: OmitPlayerPremierTrexCounterProps
}

const ContentPlayer: FC<ContentPlayerProps> = ({
  url,
  playerEventsProps,
  playerPremierTrexCounterProps,
  ...props
}) => {
  const { getOverlayProps, ...playerProps } = props.playerProps

  const overrideGetOverlayProps = useCallback(
    (urlState: OmitUrlState) => {
      const overlayProps = getOverlayProps(urlState)
      const controlsBarProps = overlayProps?.controlsBarProps

      return {
        ...overlayProps,
        controlsBarProps: {
          ...controlsBarProps,
          rightSlotRenderFn: () => (
            <>
              {controlsBarProps?.rightSlotRenderFn?.()}
              <UrlSettings {...urlState} />
            </>
          ),
        },
      }
    },
    [getOverlayProps],
  )

  return (
    <PlayerUrlManager urls={url}>
      {({ url, ...urlState }) => (
        <PlayerPremierTrexCounterManager {...playerPremierTrexCounterProps}>
          {({ onStartRewind, onEndRewind, ...statisticState }) => (
            <PlayerEventManager url={url} {...playerEventsProps} {...statisticState}>
              {(eventsState) => (
                <Player
                  url={url}
                  overlayProps={overrideGetOverlayProps(urlState)}
                  {...playerProps}
                  {...eventsState}
                  onStartRewind={onStartRewind}
                  onEndRewind={onEndRewind}
                />
              )}
            </PlayerEventManager>
          )}
        </PlayerPremierTrexCounterManager>
      )}
    </PlayerUrlManager>
  )
}

export default ContentPlayer
