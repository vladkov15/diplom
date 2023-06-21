import React, { FC, useContext, useMemo } from 'react'
import dynamic from 'next/dynamic'

import PlayerSkeleton from '@/modules/player/components/PlayerSkeleton'
import ChannelRating from './controls/ChannelRating'
import PlayerUrlManager from '@/modules/player/components/PlayerUrlManager'
import PlayerEventManager from '@/modules/player/components/PlayerEventManager'

import { ChannelContext } from '@/modules/channel/channel.context'
import { ContentType } from '@/models/content'

import { EpgState, IChannel, IEpg } from '../../channel.model'

const Player = dynamic(() => import('@/modules/player/components/Player'), {
  ssr: false,
  loading: () => <PlayerSkeleton />,
})

interface ChannelPlayerProps {
  channel: IChannel
  epgProgram: IEpg
}

const ChannelPlayer: FC<ChannelPlayerProps> = ({ channel, epgProgram }) => {
  const { epgProgramLive } = useContext(ChannelContext)

  const controlsBarProps = useMemo(
    () => ({ rightSlotRenderFn: () => <ChannelRating channel={channel} /> }),
    [channel],
  )

  const overlayProps = useMemo(() => ({ controlsBarProps }), [controlsBarProps])

  return (
    <PlayerUrlManager urls={epgProgram.url}>
      {({ url }) => (
        <PlayerEventManager
          contentId={epgProgram.id}
          contentType={
            epgProgramLive && epgProgramLive.id === epgProgram.id
              ? ContentType.CHANNEL
              : ContentType.EPG
          }
          minutesForWatchingEvent={0.5}
          url={url}
        >
          {(eventsState) => (
            <Player
              url={url}
              overlayProps={overlayProps}
              live={epgProgram.state === EpgState.LIVE}
              autoPlay
              muted
              {...eventsState}
            />
          )}
        </PlayerEventManager>
      )}
    </PlayerUrlManager>
  )
}

export default ChannelPlayer
