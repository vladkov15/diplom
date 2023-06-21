import React, { FC, useCallback, useEffect, useRef, useState } from 'react'
import useUpdateEffect from '@restart/hooks/useUpdateEffect'

import {
  ConfigState,
  ProgressState,
  ScreenState,
  VideoState,
  PlayerContext,
  getDefaultConfigState,
  getDefaultVideoState,
  getDefaultProgressState,
  getDefaultScreenState,
} from './player.context'

export interface PlayerConfig extends ConfigState {}

export type PlayerActionInspect = VideoState & ScreenState
export interface PlayerActions {
  inspect: () => PlayerActionInspect
  play: () => Promise<void>
  pause: () => void
}

export interface PlayerEventsProps {
  onPlay?: (videoEl: HTMLVideoElement) => void
  onPause?: (videoEl: HTMLVideoElement) => void
  onStop?: (videoEl: HTMLVideoElement) => void
  onTimeUpdate?: (videoEl: HTMLVideoElement) => void
  onTimeChange?: (
    videoEl: HTMLVideoElement,
    prevCurrentTime: number,
    nextCurrentTime: number,
  ) => void
  onSeeking?: (videoEl: HTMLVideoElement) => void
  onSeeked?: (videoEl: HTMLVideoElement) => void
  onWaiting?: (videoEl: HTMLVideoElement) => void
  onCanPlay?: (videoEl: HTMLVideoElement) => void
  onEnded?: (videoEl: HTMLVideoElement) => void
  onChangeUrl?: (videoEl: HTMLVideoElement) => void
  onError?: (videoEl: HTMLVideoElement, error: unknown) => void
  onActionsReady?: (actions: PlayerActions) => void
  onStartRewind?: (videoEl: HTMLVideoElement) => void
  onEndRewind?: (videoEl: HTMLVideoElement) => void
}

type ProviderRenderParameters = {
  onVideoRef: (element: HTMLVideoElement) => void
}

interface PlayerProviderProps extends PlayerEventsProps {
  configState?: Partial<ConfigState>
  videoState?: Partial<VideoState>
  screenState?: Partial<ScreenState>
  progressState?: Partial<ProgressState>
  children: (params: ProviderRenderParameters) => React.ReactNode
}

const PlayerProvider: FC<PlayerProviderProps> = ({
  configState: configStateProp,
  videoState: videoStateProp,
  screenState: screenStateProp,
  progressState: progressStateProp,

  onPlay,
  onPause,
  // onStop,
  onTimeUpdate,
  onTimeChange,
  onSeeking,
  onSeeked,
  onWaiting,
  onCanPlay,
  onEnded,
  onChangeUrl,
  onError,
  onActionsReady,
  onStartRewind,
  onEndRewind,

  children,
}) => {
  const videoRef = useRef<HTMLVideoElement | null>(null)

  const [configState, setConfigState] = useState(getDefaultConfigState(configStateProp))
  const changeConfigState = (payload: Partial<ConfigState>) => {
    setConfigState((state) => ({ ...state, ...payload }))
  }
  useUpdateEffect(() => configStateProp && changeConfigState(configStateProp), [configStateProp])
  const previousContentId = useRef(configState.contentId)

  const [videoState, setVideoState] = useState(getDefaultVideoState(videoStateProp))
  const changeVideoState = (payload: Partial<VideoState>) => {
    setVideoState((state) => ({ ...state, ...payload }))
  }
  useUpdateEffect(() => {
    if (!videoStateProp) return

    setVideoState((state) => {
      const url = videoStateProp.url ?? state.url
      const isLive = videoStateProp.isLive ?? state.isLive
      return { ...state, url, isLive }
    })
  }, [videoStateProp])

  const [progressState, setProgressState] = useState(getDefaultProgressState())
  const changeProgressState = (payload: Partial<ProgressState>) => {
    setProgressState((state) => ({ ...state, ...payload }))
  }
  useUpdateEffect(() => {
    if (!progressStateProp) return

    const videoEl = videoRef.current
    const { currentTime } = progressStateProp
    if (videoEl && currentTime) videoEl.currentTime = currentTime

    changeProgressState(progressStateProp)
  }, [progressStateProp])
  const previousCurrentTime = useRef(progressState.currentTime)

  const [screenState, setScreenState] = useState(getDefaultScreenState(screenStateProp))
  const changeScreenState = (payload: Partial<ScreenState>) => {
    setScreenState((state) => ({ ...state, ...payload }))
  }
  useUpdateEffect(() => screenStateProp && changeScreenState(screenStateProp), [screenStateProp])

  // toggle play / pause logic
  const togglePlayPause = async () => {
    if (videoState.isPaused) await play()
    else pause()
  }

  const play = async () => {
    const videoEl = videoRef?.current

    const { isPaused, isLive } = videoState
    if (!videoEl || !videoEl.paused || !isPaused || isLive) return

    try {
      await videoEl.play()
      changeVideoState({ isPaused: false })
      onPlay?.(videoEl)
    } catch (error) {
      console.log(error)
      onError?.(videoEl, error)
    }
  }

  const pause = () => {
    const videoEl = videoRef?.current

    const { isPaused, isLive } = videoState
    if (!videoEl || videoEl.paused || isPaused || isLive) return

    videoEl.pause()
    changeVideoState({ isPaused: true })
    onPause?.(videoEl)
  }

  // volume changing logic
  const toggleMute = () => {
    setVideoState((state) => {
      const isMuted = !state.isMuted
      const volume = isMuted ? 0 : 0.5
      return { ...state, isMuted, volume }
    })
  }

  useUpdateEffect(() => {
    const videoEl = videoRef?.current
    if (videoEl) videoEl.muted = videoState.isMuted
  }, [videoState.isMuted])

  const changeVolume = (value: number | string) => {
    setVideoState((state) => {
      const volume = Number(value) / 100
      const isMuted = volume === 0
      return { ...state, volume, isMuted }
    })
  }

  useUpdateEffect(() => {
    const videoEl = videoRef?.current
    if (videoEl) videoEl.volume = videoState.volume
  }, [videoState.volume])

  // progress logic
  const changeProgress = (value: number | string) => {
    const videoEl = videoRef.current
    if (!videoEl) return

    onStartRewind?.(videoEl)

    const preCurrentTime = Number(videoEl.currentTime)
    const newCurrentTime = Number(value)

    videoEl.currentTime = newCurrentTime
    onTimeChange?.(videoEl, preCurrentTime, newCurrentTime)

    onEndRewind?.(videoEl)
  }

  const handleTimeUpdate = () => {
    const videoEl = videoRef.current
    if (!videoEl) return

    setProgressState((state) => {
      const currentTime = videoEl.currentTime
      previousCurrentTime.current = currentTime

      return {
        ...state,
        currentTime,
        duration: videoEl.duration, // ToDo: Move to another event handler
      }
    })

    onTimeUpdate?.(videoEl)
  }

  const handleSeeking = () => {
    const videoEl = videoRef?.current

    if (videoEl) onSeeking?.(videoEl)
  }

  const handleSeeked = () => {
    const videoEl = videoRef?.current

    if (videoEl) onSeeked?.(videoEl)
  }

  const handleCanPlay = () => {
    const videoEl = videoRef?.current

    changeVideoState({ isBuffering: false })
    if (videoEl) onCanPlay?.(videoEl)
  }

  const handleWaiting = () => {
    const videoEl = videoRef?.current

    changeVideoState({ isBuffering: true })
    if (videoEl) onWaiting?.(videoEl)
  }

  const handleEnded = () => {
    const videoEl = videoRef?.current
    if (!videoEl) return

    videoEl.currentTime = 0
    changeVideoState({ isPaused: true })

    onEnded?.(videoEl)
  }

  const onVideoRef = useCallback((videoEl: HTMLVideoElement | null) => {
    if (!videoEl) return

    videoRef.current = videoEl

    setProgressState((state) => {
      const currentTime = progressStateProp?.currentTime || 0
      videoEl.currentTime = currentTime
      return { ...state, currentTime }
    })

    setVideoState((state) => {
      const isMuted = videoEl.muted || state.isMuted
      const volume = isMuted ? 0 : videoEl.volume || 0.5
      return { ...state, volume, isMuted }
    })

    videoEl.addEventListener('canplay', handleCanPlay)
    videoEl.addEventListener('timeupdate', handleTimeUpdate)
    videoEl.addEventListener('seeking', handleSeeking)
    videoEl.addEventListener('seeked', handleSeeked)
    videoEl.addEventListener('waiting', handleWaiting)
    videoEl.addEventListener('ended', handleEnded)
  }, [])

  useUpdateEffect(() => {
    const videoEl = videoRef.current

    const { contentId } = configState

    // [url] has been changed, but [contentId] has not changed
    if (videoEl && contentId === previousContentId.current) {
      videoEl.currentTime = previousCurrentTime.current || 0
      changeVideoState({ isBuffering: true })

      if (!videoState.isPaused && videoEl.paused) {
        videoEl.play().then(() => onChangeUrl?.(videoEl))
      }
    } else if (videoEl && contentId !== previousContentId.current) {
      videoEl.currentTime = 0
      changeVideoState({ isBuffering: true, isPaused: videoStateProp?.isPaused })
      changeProgressState({ currentTime: 0, duration: 0 })

      if (!videoStateProp?.isPaused) {
        videoEl.play().then(() => onChangeUrl?.(videoEl))
      } else {
        onChangeUrl?.(videoEl)
      }

      previousContentId.current = contentId
    }
  }, [videoState.url])

  useEffect(() => {
    const inspect = (): PlayerActionInspect => ({ ...videoState, ...screenState })
    onActionsReady?.({ inspect, play, pause })
  }, [videoState, screenState])

  useEffect(() => {
    // If the content is loading, then the buffering flag is turned on to avoid the loader jump
    if (screenState.isLoading) changeVideoState({ isBuffering: true })
  }, [screenState.isLoading])

  useEffect(() => {
    return () => {
      const videoEl = videoRef.current

      videoEl?.removeEventListener('canplay', handleCanPlay)
      videoEl?.removeEventListener('timeupdate', handleTimeUpdate)
      videoEl?.removeEventListener('seeking', handleSeeked)
      videoEl?.removeEventListener('seeked', handleSeeked)
      videoEl?.removeEventListener('waiting', handleWaiting)
      videoEl?.removeEventListener('ended', handleEnded)
    }
  }, [])

  return (
    <PlayerContext.Provider
      value={{
        configState,
        changeConfigState,
        videoState,
        changeVideoState,
        progressState,
        changeProgressState,
        screenState,
        changeScreenState,

        togglePlayPause,
        toggleMute,

        changeVolume,
        changeProgress,
      }}
    >
      {children({ onVideoRef })}
    </PlayerContext.Provider>
  )
}

export default PlayerProvider
