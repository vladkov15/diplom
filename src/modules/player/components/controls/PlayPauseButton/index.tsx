import React, { FC } from 'react'
import classNames from 'classnames'

import { Button, ButtonProps } from '@ui'

import styles from './PlayPauseButton.module.scss'

interface PlayPauseButtonProps extends ButtonProps {
  isPaused: boolean
  togglePlayPause: () => void
}

const PlayPauseButton: FC<PlayPauseButtonProps> = React.memo(
  ({ className, isPaused, togglePlayPause, ...props }) => {
    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation()
      togglePlayPause()
    }

    return (
      <Button
        className={classNames(className, styles.PlayPauseButton)}
        variant='outline-light'
        onClick={handleClick}
        size='sm'
        icon
        {...props}
      >
        <i className={isPaused ? 'icon-play-arrow' : 'icon-pause'} />
      </Button>
    )
  },
)
PlayPauseButton.displayName = 'PlayPauseButton'

export default PlayPauseButton
