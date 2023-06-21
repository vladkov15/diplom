import React, { FC, useCallback, useMemo } from 'react'

import { IFilm } from '@/modules/film/film.model'
import { DrmTypes } from '@/modules/player/player.model'

import ContentPlayer from '@/components/ContentPlayer'
import { PlayerProps } from '@/modules/player/components/Player'
import FilmRating from './controls/FilmRating'
import FilmPlayerWatchInfoManager from './FilmPlayerWatchInfoManager'

const getDrmConfig = (film: IFilm) => {
  if (!film) return {}

  const servers = {} as Record<DrmTypes, string>

  if (film.licence_server_playready) {
    servers[DrmTypes.PLAYREADY] = film.licence_server_playready
  }
  if (film.licence_server_widevine) {
    servers[DrmTypes.WIDEVINE] = film.licence_server_widevine
  }

  if (Object.keys(servers).length) return { servers }

  return {}
}

interface FilmPlayerProps {
  film: IFilm
  playerProps?: Omit<PlayerProps, 'url'>
}

const FilmPlayer: FC<FilmPlayerProps> = ({ film, playerProps }) => {
  const getOverlayProps = useCallback(
    (film: IFilm) => ({
      controlsBarProps: { rightSlotRenderFn: () => film && <FilmRating film={film} /> },
      headerSlotRenderFn: () => <div className='p-4'>Test Header Slot</div>,
    }),
    [],
  )

  return (
    <FilmPlayerWatchInfoManager film={film}>
      {({ currentTime }) => (
        <ContentPlayer
          url={film.urls || ''}
          playerProps={{
            currentTime,
            drmConfig: getDrmConfig(film),
            getOverlayProps: () => getOverlayProps(film),
            controls: true,
            // autoPlay: true, // ToDO (hardz): Лагает onAutoWatch в событиях
            cover: film.image,
            ...playerProps,
          }}
          playerEventsProps={{
            contentId: film.id,
            contentType: film.content_type_ptr,
            minutesForWatchingEvent: 0.5,
          }}
          playerPremierTrexCounterProps={{
            partner: film.partner,
            partnerContentId: film.partner_path,
            minutesForWatchEvent: 0.5,
            minutesForHearBeatEvent: 0.5,
          }}
        />
      )}
    </FilmPlayerWatchInfoManager>
  )
}

export default FilmPlayer
