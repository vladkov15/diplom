import React from 'react'

export interface ConfigState {
  contentId: number | string | null
}
export const getDefaultConfigState = (payload?: Partial<ConfigState>) => ({
  contentId: null,
  ...payload,
})

export interface VideoState {
  url: string
  volume: number
  isPaused: boolean
  isMuted: boolean
  isBuffering: boolean
  isLive: boolean
}
export const getDefaultVideoState = (payload?: Partial<VideoState>) => ({
  url: '',
  volume: 0,
  isMuted: false,
  isPaused: false,
  isBuffering: true,
  isLive: false,
  ...payload,
})

export interface ProgressState {
  duration: number
  currentTime: number
}
export const getDefaultProgressState = (payload?: Partial<ProgressState>) => ({
  duration: 0,
  currentTime: 0,
  ...payload,
})

export interface ScreenState {
  isLoading: boolean
  isControls: boolean
}
export const getDefaultScreenState = (payload?: Partial<ScreenState>) => ({
  isLoading: false,
  isControls: true,
  ...payload,
})

export interface PlayerContextValue {
  configState: ConfigState
  changeConfigState: (payload: Partial<ConfigState>) => void
  videoState: VideoState
  changeVideoState: (payload: Partial<VideoState>) => void
  progressState: ProgressState
  changeProgressState: (payload: Partial<ProgressState>) => void
  screenState: ScreenState
  changeScreenState: (payload: Partial<ScreenState>) => void

  togglePlayPause: () => void
  toggleMute: () => void

  changeVolume: (value: number | string) => void
  changeProgress: (value: number | string) => void
}

export const PlayerContext = React.createContext<PlayerContextValue>({
  configState: getDefaultConfigState(),
  changeConfigState: () => undefined,

  videoState: getDefaultVideoState(),
  changeVideoState: () => undefined,

  progressState: getDefaultProgressState(),
  changeProgressState: () => undefined,

  screenState: getDefaultScreenState(),
  changeScreenState: () => undefined,

  togglePlayPause: () => undefined,
  toggleMute: () => undefined,

  changeVolume: () => undefined,
  changeProgress: () => undefined,
})
PlayerContext.displayName = 'PlayerContext'
