import React, { FC, useRef } from 'react'

import { IFilm } from '@/modules/film/film.model'

import Button from '@ui/components/button'
import OverlayTooltip from '@ui/components/overlay/OverlayTooltip'
import ContentDetailCard from '@/components/ContentDetailCard'
import TrailerPlayerModal from '@/components/TrailerPlayerModel'
import TrailerPlayer from '@/components/TrailerPlayer'
import FilmPlayer from './FilmPlayer'

import { PlayerActions } from '@/modules/player/PlayerProvider'
import { useFavorite } from '@/modules/favorite/hooks/useFavorite'
import { ContentType } from '@/models/content'

interface FilmDetailCardProps {
  film: IFilm
}

const FilmDetailCard: FC<FilmDetailCardProps> = ({ film }) => {
  const { favorites, toggleFavorites } = useFavorite(film.favorites)

  const handleClickFavorites = () => toggleFavorites(film.id, ContentType.FILM)

  const play = useRef<PlayerActions['play']>()
  const pause = useRef<PlayerActions['pause']>()

  const onActionsReady = (actions: PlayerActions) => {
    play.current = actions.play
    pause.current = actions.pause
  }

  const handleClose = () => {
    play.current?.()
  }

  const handleOpen = () => {
    pause.current?.()
  }

  return (
    <ContentDetailCard
      item={film}
      playerRenderFn={() => <FilmPlayer film={film} playerProps={{ onActionsReady }} />}
      afterPlayerRenderFn={() => (
        <div className='d-flex mt-4'>
          {film.trailer && (
            <TrailerPlayerModal
              trigger={<Button className='me-2' variant='light' label='Трейлер' size='sm' />}
              onOpen={handleOpen}
              onClose={handleClose}
            >
              <TrailerPlayer trailer={film.trailer} />
            </TrailerPlayerModal>
          )}
          <OverlayTooltip
            placement='top'
            content={favorites ? 'Удалить из избранного' : 'Добавить в избранное'}
          >
            <Button variant='light' onClick={handleClickFavorites} size='sm' icon>
              {favorites === 0 && <i className='icon-favorite-outline' />}
              {favorites === 1 && <i className='icon-favorite text-accent' />}
            </Button>
          </OverlayTooltip>
        </div>
      )}
    />
  )
}

export default FilmDetailCard
