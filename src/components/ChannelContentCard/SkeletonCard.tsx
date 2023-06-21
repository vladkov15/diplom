import React, { FC } from 'react'

import styles from './ChannelContentCard.module.scss'

const Skeleton: FC = () => {
  return (
    <div className={styles.SkeletonCard}>
      <div className={styles.SkeletonCard__Poster} />
      <div className={styles.SkeletonCard__Body}>
        <span />
      </div>
    </div>
  )
}

export default Skeleton
