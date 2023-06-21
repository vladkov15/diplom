import React, { FC, useContext, useRef } from 'react'

import { ISerial } from '@/modules/serial/serial.model'

import Button, { ButtonProps } from '@ui/components/button'
import OverlayTooltip from '@ui/components/overlay/OverlayTooltip'
import ContentDetailCard from '@/components/ContentDetailCard'
import TrailerPlayerModal from '@/components/TrailerPlayerModel'
import TrailerPlayer from '@/components/TrailerPlayer'
import SerialPlayer from './SerialPlayer'
import SeasonsTabs from './SeasonsTabs'

import { SerialContext } from '../serial.context'
import { PlayerActionInspect, PlayerActions } from '@/modules/player/PlayerProvider'
import { useFavorite } from '@/modules/favorite/hooks/useFavorite'
import { ContentType } from '@/models/content'

interface TrailerPlayerTriggerProps extends ButtonProps {}

const TrailerPlayerTrigger: FC<TrailerPlayerTriggerProps> = (props) => {
  return <Button variant='light' size='sm' label='Трейлер' {...props} />
}

interface SerialDetailCardProps {
  serial: ISerial
}

const SerialDetailCard: FC<SerialDetailCardProps> = ({ serial }) => {
  const { favorites, toggleFavorites } = useFavorite(serial.favorites)

  const handleClickFavorites = () => toggleFavorites(serial.id, ContentType.SERIAL)

  const playerActions = useRef<PlayerActions>()
  const playerInspectPrevious = useRef<PlayerActionInspect>()

  const onActionsReady = (actions: PlayerActions) => {
    playerActions.current = actions
  }

  const handleClose = () => {
    const inspect = playerInspectPrevious.current
    if (inspect && !inspect.isPaused) playerActions.current?.play()
  }

  const handleOpen = () => {
    const inspect = playerActions.current?.inspect()
    playerInspectPrevious.current = inspect

    if (inspect && !inspect.isPaused) playerActions.current?.pause()
  }

  return (
    <>
      <ContentDetailCard
        item={serial}
        playerRenderFn={() => <SerialPlayer serial={serial} playerProps={{ onActionsReady }} />}
        afterPlayerRenderFn={() => (
          <div style={{ display: 'grid', gridTemplateColumns: 'max-content max-content', gap: 10 }}>
            <TrailerPlayerModal
              trigger={<TrailerPlayerTrigger disabled={!serial.trailer} />}
              onOpen={handleOpen}
              onClose={handleClose}
            >
              {serial.trailer && <TrailerPlayer trailer={serial.trailer} />}
            </TrailerPlayerModal>

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
      <SeasonsTabs seasons={serial.seasons} />
    </>
  )
}

export default SerialDetailCard
