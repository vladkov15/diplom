import React, { FC } from 'react'

import styles from './ChannelContentDetailCard.module.scss'

const ChannelContentDetailSkeleton: FC = () => {
  return (
    <div className={styles.ChannelContentDetailSkeleton}>
      <div className={styles.ChannelContentDetailSkeleton__Body}>
        <div className={styles.ChannelContentDetailSkeleton__PlayerWrapper} />
        <div className={styles.ChannelContentDetailSkeleton__EpgFullDayProgramWrapper} />
        <div className={styles.ChannelContentDetailSkeleton__EpgDescriptionWrapper} />
        <div className={styles.ChannelContentDetailSkeleton__EpgProgramControlsWrapper} />
      </div>
    </div>
  )
}

export default ChannelContentDetailSkeleton
