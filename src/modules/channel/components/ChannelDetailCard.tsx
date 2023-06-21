import React, { FC, useContext } from 'react'

import OverlayTooltip from '@ui/components/overlay/OverlayTooltip'
import Button, { ButtonProps } from '@ui/components/button'
import EpgFullDayProgram from '@/modules/channel/components/EpgFullDayProgram'
import EpgDescriptionProgram from '@/modules/channel/components/EpgDescriptionProgram'
import EpgWeekProgramModal from '@/modules/channel/components/EpgWeekProgramModal'
import ToggleParentControlModal from '@/modules/parentControl/components/ToggleParentControlModal'
import ToggleChannelParentControlForm from '@/modules/parentControl/components/ToggleChannelParentControlForm'
import ChannelContentDetailCard from '@/components/ChannelContentDetailCard'
import ChannelPlayer from './ChannelPlayer'

import { ChannelContext } from '@/modules/channel/channel.context'
import { IChannel } from '@/modules/channel/channel.model'
import { ContentType } from '@/models/content'

import { useFavorite } from '@/modules/favorite/hooks/useFavorite'
import { UserContext } from '@/modules/user/user.context'

interface ToggleParentControlTriggerProps extends ButtonProps {
  channel: IChannel
}

const ToggleParentControlTrigger: FC<ToggleParentControlTriggerProps> = React.memo(
  ({ channel, ...props }) => {
    const tooltipContent = !props.disabled ? (
      `${channel.parent_control ? 'Отключить' : 'Включить'} родительский контроль`
    ) : (
      <>
        Родительский контроль <b className='text-accent'>ВЫКЛЮЧЕН</b> в{' '}
        <b className='text-accent'>настройках</b> личного кабинета.
      </>
    )

    return (
      <OverlayTooltip placement='top' content={tooltipContent}>
        <Button {...props} icon>
          {channel.parent_control ? (
            <i className='icon-no-encryption' />
          ) : (
            <i className='icon-lock' />
          )}
        </Button>
      </OverlayTooltip>
    )
  },
)
ToggleParentControlTrigger.displayName = 'ToggleParentControlTrigger'

const ChannelDetailCard: FC = () => {
  const { userSettings } = useContext(UserContext)
  const { channel, epgProgram } = useContext(ChannelContext)
  const { favorites, toggleFavorites } = useFavorite(channel.favorites)

  const handleClickFavorites = () => toggleFavorites(channel.id, ContentType.CHANNEL)

  return (
    <ChannelContentDetailCard
      channel={channel}
      epgProgram={epgProgram}
      playerRenderFn={(epgProgram) => <ChannelPlayer channel={channel} epgProgram={epgProgram} />}
      epgFullDayProgramRenderFn={() => <EpgFullDayProgram />}
      epgDescriptionProgramRenderFn={() => <EpgDescriptionProgram />}
      epgWeekProgramModalRenderFn={() => (
        <EpgWeekProgramModal trigger={<Button label='Программа передач' full />} />
      )}
      toggleFavoriteRenderFn={() => (
        <OverlayTooltip
          placement='top'
          content={favorites ? 'Удалить из избранного' : 'Добавить в избранное'}
        >
          <Button onClick={handleClickFavorites} icon>
            {favorites === 0 && <i className='icon-favorite-outline' />}
            {favorites === 1 && <i className='icon-favorite' />}
          </Button>
        </OverlayTooltip>
      )}
      toggleParentControlModalRenderFn={() => (
        <ToggleParentControlModal
          trigger={
            <ToggleParentControlTrigger
              channel={channel}
              disabled={!userSettings?.parent_control}
            />
          }
        >
          <ToggleChannelParentControlForm />
        </ToggleParentControlModal>
      )}
    />
  )
}
ChannelDetailCard.displayName = 'ChannelDetailCard'

export default ChannelDetailCard
