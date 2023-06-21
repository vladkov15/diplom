import React, { FC, useCallback, useContext, useMemo } from 'react'

import { IEpisode, ISerial } from '@/modules/serial/serial.model'
import { DrmTypes } from '@/modules/player/player.model'

import { ContentType } from '@/models/content'
import { PlayerProps } from '@/modules/player/components/Player'
import ContentPlayer from '@/components/ContentPlayer'
import SerialRating from './controls/SerialRating'
import SerialPlayerWatchInfoManager from './SerialPlayerWatchInfoManager'
import { SerialContext } from '../../serial.context'

const getDrmConfig = (episode: IEpisode) => {
  if (!episode) return {}

  const servers = {} as Record<DrmTypes, string>

  if (episode.licence_server_playready) {
    servers[DrmTypes.PLAYREADY] = episode.licence_server_playready
  }
  if (episode.licence_server_widevine) {
    servers[DrmTypes.WIDEVINE] = episode.licence_server_widevine
  }

  if (Object.keys(servers).length) return { servers }

  return {}
}

interface SerialPlayerProps {
  serial: ISerial
  playerProps?: Omit<PlayerProps, 'url'>
}

const SerialPlayer: FC<SerialPlayerProps> = ({ serial, playerProps }) => {
  const { episodeFetching } = useContext(SerialContext)

  const getOverlayProps = useCallback(
    (episode: IEpisode) => ({
      controlsBarProps: { rightSlotRenderFn: () => episode && <SerialRating episode={episode} /> },
      headerSlotRenderFn: () => <div className='p-4'>Test Header Slot</div>,
    }),
    [],
  )

  return (
    <SerialPlayerWatchInfoManager serial={serial}>
      {({ episode, currentTime }) => (
        <ContentPlayer
          url={episode.urls || []}
          playerProps={{
            currentTime,
            drmConfig: getDrmConfig(episode),
            getOverlayProps: () => getOverlayProps(episode),
            controls: true,
            // autoPlay: true, // ToDO (hardz): Лагает onAutoWatch в событиях
            loading: episodeFetching,
            cover: serial.image,
            ...playerProps,
          }}
          playerEventsProps={{
            contentId: episode.id,
            contentType: ContentType.SERIAL,
            minutesForWatchingEvent: 0.5,
          }}
          playerPremierTrexCounterProps={{
            minutesForWatchEvent: 0.5,
            minutesForHearBeatEvent: 0.5,
            partner: episode.partner,
            partnerContentId: episode.partner_path || episode.url,
          }}
        />
      )}
    </SerialPlayerWatchInfoManager>
  )
}

export default SerialPlayer
