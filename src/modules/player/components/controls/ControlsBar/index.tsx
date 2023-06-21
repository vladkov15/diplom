import React, { FC, useContext } from 'react'
import classNames from 'classnames'

import ProgressBar from '../ProgressBar'
import PlayPauseButton from '../PlayPauseButton'
import Volume from '../Volume'
import FullscreenButton from '../FullscreenButton'

import { PlayerContext } from '../../../player.context'
import { FullscreenState } from '../../PlayerFullscreenManager'

import styles from './ControlsBar.module.scss'

export interface ControlsBarProps extends React.HTMLAttributes<HTMLDivElement> {
  fullscreenState: FullscreenState
  rightSlotRenderFn?: () => React.ReactNode
}

const ControlsBar: FC<ControlsBarProps> = ({
  className,
  fullscreenState: { isFullscreen, toggleFullscreen },
  rightSlotRenderFn,
}) => {
  const {
    videoState: { volume, isBuffering, isPaused, isMuted, isLive },
    progressState: { duration, currentTime },
    togglePlayPause,
    toggleMute,
    changeProgress,
    changeVolume,
  } = useContext(PlayerContext)

  return (
    <div className={classNames(className, styles.ControlsBar)}>
      {!isLive && (
        <ProgressBar
          className={styles.ControlsBar__ProgressBar}
          duration={duration}
          currentTime={currentTime}
          onChange={changeProgress}
        />
      )}

      <div className={styles.ControlsBar__Controls}>
        <div className={styles.ControlsBar__Controls__LeftSide}>
          {!isLive && (
            <PlayPauseButton
              isPaused={isPaused}
              togglePlayPause={togglePlayPause}
              disabled={isBuffering}
              variant='outline-light'
            />
          )}
          <Volume
            volume={volume}
            isMuted={isMuted}
            changeVolume={changeVolume}
            toggleMute={toggleMute}
          />
        </div>
        <div className='flex-grow-1' />
        <div className={styles.ControlsBar__Controls__RightSide}>
          {rightSlotRenderFn?.()}
          <FullscreenButton isFullscreen={isFullscreen} toggleFullscreen={toggleFullscreen} />
        </div>
      </div>
    </div>
  )
}

export default ControlsBar
