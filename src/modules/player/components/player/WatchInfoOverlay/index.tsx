import React, { FC } from 'react'

import CoverOverlay, { CoverOverlayProps } from '../CoverOverlay'

import styles from './WatchInfoOverlay.module.scss'

interface WatchInfoOverlayProps extends CoverOverlayProps {}

const WatchInfoOverlay: FC<WatchInfoOverlayProps> = ({ children, ...props }) => {
  return (
    <CoverOverlay className={styles.WatchInfoOverlay} {...props}>
      <div className={styles.WatchInfoOverlay__Body}>{children}</div>
    </CoverOverlay>
  )
}

export default WatchInfoOverlay
