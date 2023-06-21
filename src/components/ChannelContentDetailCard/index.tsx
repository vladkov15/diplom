import React, { FC, useContext } from 'react'

import Skeleton from './skeleton'

import { IChannel, IEpg } from '@/modules/channel/channel.model'

import styles from './ChannelContentDetailCard.module.scss'
import AspectRatio from '../AspectRatio'

interface ChannelContentDetailCardProps {
  channel: IChannel
  epgProgram?: IEpg | null
  playerRenderFn?: (epgProgram: IEpg, channel: IChannel) => React.ReactNode
  epgFullDayProgramRenderFn?: (epgProgram: IEpg, channel: IChannel) => React.ReactNode
  epgDescriptionProgramRenderFn?: (epgProgram: IEpg, channel: IChannel) => React.ReactNode
  epgWeekProgramModalRenderFn?: (epgProgram: IEpg, channel: IChannel) => React.ReactNode
  toggleFavoriteRenderFn?: (epgProgram: IEpg, channel: IChannel) => React.ReactNode
  toggleParentControlModalRenderFn?: (epgProgram: IEpg, channel: IChannel) => React.ReactNode
}

const ChannelContentDetailCard: FC<ChannelContentDetailCardProps> = ({
  channel,
  epgProgram,
  playerRenderFn,
  epgFullDayProgramRenderFn,
  epgDescriptionProgramRenderFn,
  epgWeekProgramModalRenderFn,
  toggleFavoriteRenderFn,
  toggleParentControlModalRenderFn,
}) => {
  if (!epgProgram) return <Skeleton />

  return (
    <div className={styles.ChannelContentDetailCard}>
      <div className={styles.ChannelContentDetailCard__Body}>
        <div className={styles.ChannelContentDetailCard__PlayerWrapper}>
          <AspectRatio fixable>{playerRenderFn?.(epgProgram, channel)}</AspectRatio>
        </div>
        <div className={styles.ChannelContentDetailCard__EpgFullDayProgramWrapper}>
          {epgFullDayProgramRenderFn?.(epgProgram, channel)}
        </div>
        <div className={styles.ChannelContentDetailCard__EpgDescriptionWrapper}>
          {epgDescriptionProgramRenderFn?.(epgProgram, channel)}
        </div>
        <div className={styles.ChannelContentDetailCard__EpgProgramControlsWrapper}>
          {epgWeekProgramModalRenderFn?.(epgProgram, channel)}
          {toggleFavoriteRenderFn?.(epgProgram, channel)}
          {toggleParentControlModalRenderFn?.(epgProgram, channel)}
        </div>
      </div>
    </div>
  )
}

export default ChannelContentDetailCard
