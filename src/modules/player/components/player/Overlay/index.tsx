import React, { FC, useContext } from 'react'
import classNames from 'classnames'

import { Loader } from '@ui'
import ControlsBar, { ControlsBarProps } from '../../controls/ControlsBar'
import { PlayPauseButton } from '../../controls'

import { PlayerContext } from '../../../player.context'
import { FullscreenState } from '../../PlayerFullscreenManager'

import styles from './Overlay.module.scss'
import { InteractionState } from '../../PlayerInteractionManager'

export interface OverlaySlotsProps {
  controlsBarProps?: Partial<ControlsBarProps>
  headerSlotRenderFn?: () => React.ReactNode
  leftSlotRenderFn?: () => React.ReactNode
  rightSlotRenderFn?: () => React.ReactNode
}

export interface OverlayProps extends React.HTMLAttributes<HTMLDivElement>, OverlaySlotsProps {
  fullscreenState: FullscreenState
  interactionState: InteractionState
}

const Overlay: FC<OverlayProps> = ({
  className,
  fullscreenState,
  interactionState,
  controlsBarProps,
  headerSlotRenderFn,
  leftSlotRenderFn,
  rightSlotRenderFn,
}) => {
  const {
    videoState: { isBuffering, isPaused, isLive },
    screenState: { isLoading, isControls },
    togglePlayPause,
  } = useContext(PlayerContext)

  const { isFullscreen } = fullscreenState
  const { isUserActive } = interactionState

  return (
    <div
      className={classNames(
        className,
        styles.Overlay,
        isPaused && styles.Overlay__Paused,
        isUserActive && styles.Overlay__Active,
      )}
    >
      {!isLoading && headerSlotRenderFn && (
        <div className={styles.Overlay__Header}>{headerSlotRenderFn?.()}</div>
      )}
      <div className={styles.Overlay__Body} onClick={togglePlayPause}>
        {isPaused && (
          <div
            className={classNames(
              styles.Overlay__LeftSlot,
              !leftSlotRenderFn && styles.Overlay__LeftSlot__Empty,
            )}
          >
            {leftSlotRenderFn?.()}
          </div>
        )}
        <div className={styles.Overlay__Control}>
          {isControls && !isLive && !isLoading && !isBuffering && (
            <PlayPauseButton
              className={styles.Overlay__PlayPauseButton}
              isPaused={isPaused}
              togglePlayPause={togglePlayPause}
            />
          )}
          {(isLoading || isBuffering) && <Loader size='lg' variant='light' />}
        </div>
        {isPaused && (
          <div
            className={classNames(
              styles.Overlay__RightSlot,
              !rightSlotRenderFn && styles.Overlay__RightSlot__Empty,
            )}
          >
            {rightSlotRenderFn?.()}
          </div>
        )}
      </div>
      {isControls && !isLoading && (
        <div className={styles.Overlay__Footer}>
          <ControlsBar
            className={styles.Overlay__ControlsBar}
            fullscreenState={fullscreenState}
            {...controlsBarProps}
          />
        </div>
      )}
    </div>
  )
}

Overlay.displayName = 'Overlay'

export default Overlay
