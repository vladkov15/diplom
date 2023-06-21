import React, { FC } from 'react'

import styles from './EpisodeCard.module.scss'

const EpisodeSkeletonCard: FC = () => {
  return (
    <div className={styles.EpisodeSkeletonCard}>
      <div className={styles.EpisodeSkeletonCard__Poster} />
      <div className={styles.EpisodeSkeletonCard__Body}>
        <span />
      </div>
    </div>
  )
}

export default EpisodeSkeletonCard
