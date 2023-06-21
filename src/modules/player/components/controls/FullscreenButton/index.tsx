import React, { FC } from 'react'
import classNames from 'classnames'

import { Button } from '@ui'

import styles from './FullscreenButton.module.scss'

interface FullscreenButtonProps extends React.HTMLAttributes<HTMLDivElement> {
  isFullscreen: boolean
  toggleFullscreen: () => void
}

const FullscreenButton: FC<FullscreenButtonProps> = React.memo(
  ({ className, isFullscreen, toggleFullscreen }) => {
    return (
      <Button
        className={classNames(className, styles.FullscreenButton)}
        variant='outline-info'
        onClick={toggleFullscreen}
        size='sm'
        icon
      >
        <i className={isFullscreen ? 'icon-fullscreen-exit' : 'icon-fullscreen'} />
      </Button>
    )
  },
)
FullscreenButton.displayName = 'FullscreenButton'

export default FullscreenButton
