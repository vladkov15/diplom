import React, { FC, useMemo } from 'react'
import classNames from 'classnames'

import VideoStreamer, { VideoStreamerProps } from './player/VideoStreamer'
import Overlay, { OverlayProps } from './player/Overlay'
import PlayerProvider, { PlayerEventsProps } from '../PlayerProvider'

import PlayerFullscreenManager from './PlayerFullscreenManager'
import PlayerInteractionManager from './PlayerInteractionManager'

import PlayerSkeleton from '@/modules/player/components/PlayerSkeleton'
import PlayerAspectRatioManager from '@/modules/player/components/PlayerAspectRatioManager'

import styles from './Player.module.scss'

type ExcludeVideoProps =
  | 'onPlay'
  | 'onPause'
  | 'onStop'
  | 'onEnded'
  | 'onWaiting'
  | 'onCanPlay'
  | 'onTimeUpdate'
  | 'onSeeking'
  | 'onSeeked'
  | 'onError'

export interface PlayerProps
  extends Omit<VideoStreamerProps, ExcludeVideoProps>,
    PlayerEventsProps {
  contentId?: string | number
  currentTime?: number
  loading?: boolean
  controls?: boolean
  cover?: string
  live?: boolean
  overlayProps?: Partial<OverlayProps>
}

const Player: FC<PlayerProps> = ({
  contentId,
  url,
  currentTime,
  loading,
  controls = true,
  cover,
  live,
  drmConfig,
  onInit,
  onReInit,
  onBeforeReInit,
  className,
  overlayProps,
  ...props
}) => {
  const configState = useMemo(() => ({ contentId }), [contentId])
  const videoState = useMemo(
    () => ({ isLive: live, url, isMuted: props.muted, isPaused: !props.autoPlay }),
    [live, url, props.muted, props.autoPlay],
  )
  const screenState = useMemo(
    () => ({ isLoading: loading, isControls: controls }),
    [loading, controls],
  )
  const progressState = useMemo(() => ({ currentTime }), [currentTime])

  const { onError } = props

  return (
    <PlayerAspectRatioManager fixable>
      {() => {
        if (!url) return <PlayerSkeleton cover={cover} />

        return (
          <PlayerProvider
            configState={configState}
            videoState={videoState}
            screenState={screenState}
            progressState={progressState}
            {...props}
          >
            {({ onVideoRef }) => (
              <div className={classNames(className, styles.Player)}>
                <PlayerFullscreenManager>
                  {({ onFullscreenRef, ...fullscreenState }) => (
                    <PlayerInteractionManager inactivityDelay={5}>
                      {({
                        handleMouseMove,
                        handleTouchStart,
                        handleTouchEnd,
                        handleFocus,
                        ...interactionState
                      }) => (
                        <div
                          className={styles.Player__Video}
                          ref={onFullscreenRef}
                          onMouseMove={handleMouseMove}
                          onTouchStart={handleTouchStart}
                          onTouchEnd={handleTouchEnd}
                          onFocus={handleFocus}
                        >
                          <VideoStreamer
                            ref={onVideoRef}
                            url={url}
                            drmConfig={drmConfig}
                            autoPlay={props.autoPlay}
                            muted={props.muted}
                            onInit={onInit}
                            onReInit={onReInit}
                            onBeforeReInit={onBeforeReInit}
                            onError={onError}
                          />
                          <Overlay
                            fullscreenState={fullscreenState}
                            interactionState={interactionState}
                            {...overlayProps}
                          />
                          {/* ToDo: Add LoaderOverlay and delete loader from Overlay */}
                        </div>
                      )}
                    </PlayerInteractionManager>
                  )}
                </PlayerFullscreenManager>
              </div>
            )}
          </PlayerProvider>
        )
      }}
    </PlayerAspectRatioManager>
  )
}
Player.displayName = 'Player'

export default Player
