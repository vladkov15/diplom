import { FC } from 'react'
import classNames from 'classnames'

import { Loader } from '@ui'

import CoverOverlay from './player/CoverOverlay'

import styles from './Player.module.scss'

export interface PlayerSkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  cover?: string
  loading?: boolean
}

const PlayerSkeleton: FC<PlayerSkeletonProps> = ({ cover, loading, className, children }) => {
  return (
    <div className={classNames(className, styles.PlayerSkeleton)}>
      {cover && <CoverOverlay cover={cover} />}
      <div className={styles.PlayerSkeleton__Body}>
        {loading && <Loader size='lg' />}
        {children}
      </div>
    </div>
  )
}

export default PlayerSkeleton
