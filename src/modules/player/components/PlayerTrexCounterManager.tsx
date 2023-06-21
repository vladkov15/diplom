import React, { useEffect, useMemo, useRef } from 'react'

import { getIntervalId } from '@/modules/player/helpers/events.helper'
import { Player, VideoStreamerVariant } from '@/modules/player/components/player/VideoStreamer'

type CommonCallback = (videoEl: HTMLVideoElement) => void
type InitCallback = (
  videoEl: HTMLVideoElement,
  player?: Player,
  variant?: VideoStreamerVariant,
) => void
type ReInitCallback = InitCallback

export interface PlayerTrexCounterRenderParameters {
  onPlay: CommonCallback
  onPause: CommonCallback
  onStop: CommonCallback
  onInit: InitCallback
  onBeforeReInit: CommonCallback
  onReInit: ReInitCallback
  onEnded: CommonCallback
  onChangeUrl: CommonCallback
  onWaiting: CommonCallback
  onCanPlay: CommonCallback
  onStartRewind: CommonCallback
  onEndRewind: CommonCallback
  onDestroy: () => void
}

export interface PlayerTrexCounterManagerProps extends Partial<PlayerTrexCounterRenderParameters> {
  minutesForWatchEvent?: number
  minutesForHearBeatEvent?: number
  disabled?: boolean
  watch: () => void
  heartBeat: (currentTime: number, timer: number) => void
  children: (params: PlayerTrexCounterRenderParameters) => React.ReactElement
}

interface IViewStateRef {
  isOnPlayFired: boolean
  isOnPlay: boolean
  isOnPause: boolean
}

const DEFAULT_MINUTES_FOR_WATCH_EVENT = 0.5
const DEFAULT_MINUTES_FOR_HEARD_BEAT_EVENT = 0.5

const PlayerTrexCounterManager = ({
  minutesForWatchEvent,
  minutesForHearBeatEvent,
  disabled,
  children,
  ...props
}: PlayerTrexCounterManagerProps) => {
  const videoElementRef = useRef<HTMLVideoElement>()
  const timeCounterForWatchEventRef = useRef(0)
  const timeCounterForHeartBeatEventRef = useRef(0)
  const intervalIdForWatchEventRef = useRef<NodeJS.Timer>()
  const intervalIdForHeartBeatEventRef = useRef<NodeJS.Timer>()
  const minutesForWatchEventRef = useRef<number | undefined>(minutesForWatchEvent)
  const minutesForHearBeatEventRef = useRef<number | undefined>(minutesForHearBeatEvent)

  const isWatchEventFiredShouldStartHeartBeat = useRef<boolean>(false)

  useEffect(() => {
    minutesForWatchEventRef.current = minutesForWatchEvent
    minutesForHearBeatEventRef.current = minutesForHearBeatEvent
  }, [minutesForWatchEvent, minutesForHearBeatEvent])

  const viewStateRef = useRef<IViewStateRef>({
    isOnPlayFired: false,
    isOnPlay: false,
    isOnPause: true,
  })

  const changeViewStateRef = (
    viewStateRef: React.MutableRefObject<IViewStateRef>,
    data: Partial<IViewStateRef>,
  ) => {
    viewStateRef.current = { ...viewStateRef.current, ...data }
  }

  const checkShouldHeartBeatFired = () => {
    if (isWatchEventFiredShouldStartHeartBeat.current) heartBeat()
  }

  const startWatchTimer = () => {
    const minutes = minutesForWatchEventRef.current || DEFAULT_MINUTES_FOR_WATCH_EVENT
    intervalIdForWatchEventRef.current = getIntervalId(timeCounterForWatchEventRef, minutes, watch)
  }

  const startHeartBeatTimer = () => {
    const minutes = minutesForHearBeatEventRef.current || DEFAULT_MINUTES_FOR_HEARD_BEAT_EVENT
    intervalIdForHeartBeatEventRef.current = getIntervalId(
      timeCounterForHeartBeatEventRef,
      minutes,
      heartBeat,
    )
  }

  const startTimerForWatchOrHeartBeatEvent = () => {
    if (!isWatchEventFiredShouldStartHeartBeat.current) startWatchTimer()
    else startHeartBeatTimer()
  }

  const clearIntervalsAndFireHeartBeat = (shouldSendHB: boolean) => {
    clearInterval(intervalIdForWatchEventRef.current)
    clearInterval(intervalIdForHeartBeatEventRef.current)

    shouldSendHB && checkShouldHeartBeatFired()
  }

  const resetViewStateAndClearIntervals = () => {
    const isPlayed = viewStateRef.current.isOnPlay

    const data: Partial<IViewStateRef> = {
      isOnPlayFired: false,
      isOnPlay: false,
      isOnPause: true,
    }

    changeViewStateRef(viewStateRef, data)
    clearIntervalsAndFireHeartBeat(isPlayed)

    isWatchEventFiredShouldStartHeartBeat.current = false
    timeCounterForWatchEventRef.current = 0
    timeCounterForHeartBeatEventRef.current = 0
  }

  const watch = () => {
    isWatchEventFiredShouldStartHeartBeat.current = true
    startHeartBeatTimer()
    props.watch()
  }

  const heartBeat = () => {
    const videoEl = videoElementRef.current
    if (videoEl) props.heartBeat(videoEl.currentTime, timeCounterForHeartBeatEventRef.current)

    timeCounterForHeartBeatEventRef.current = 0
  }

  // User's Events Play, pause, stop, ended, progress change, etc.
  const onPlay = (videoEl: HTMLVideoElement) => {
    props.onPlay?.(videoEl)
    videoElementRef.current = videoEl

    if (viewStateRef.current.isOnPause) {
      const data: Partial<IViewStateRef> = {
        isOnPlayFired: true,
        isOnPlay: true,
        isOnPause: false,
      }
      changeViewStateRef(viewStateRef, data)
    }

    startTimerForWatchOrHeartBeatEvent()
  }

  const onPause = (videoEl: HTMLVideoElement) => {
    props.onPause?.(videoEl)
    videoElementRef.current = videoEl

    if (viewStateRef.current.isOnPlay) {
      const data: Partial<IViewStateRef> = {
        isOnPlay: false,
        isOnPause: true,
      }
      changeViewStateRef(viewStateRef, data)
    }

    clearIntervalsAndFireHeartBeat(true)
  }

  const onStop = (videoEl: HTMLVideoElement) => {
    props.onStop?.(videoEl)
    videoElementRef.current = videoEl

    resetViewStateAndClearIntervals()
  }

  const onEnded = (videoEl: HTMLVideoElement) => {
    props.onEnded?.(videoEl)
    videoElementRef.current = videoEl

    resetViewStateAndClearIntervals()
  }

  // Buffer's events
  const onWaiting = (videoEl: HTMLVideoElement) => {
    props.onWaiting?.(videoEl)
    videoElementRef.current = videoEl

    if (viewStateRef.current.isOnPlayFired && viewStateRef.current.isOnPlay) {
      clearInterval(intervalIdForWatchEventRef.current)
      clearInterval(intervalIdForHeartBeatEventRef.current)
    }
  }

  const onCanPlay = (videoEl: HTMLVideoElement) => {
    props.onCanPlay?.(videoEl)
    videoElementRef.current = videoEl

    if (viewStateRef.current.isOnPlayFired && viewStateRef.current.isOnPlay) {
      startTimerForWatchOrHeartBeatEvent()
    }
  }

  const onStartRewind = (videoEl: HTMLVideoElement) => {
    props.onStartRewind?.(videoEl)

    videoElementRef.current = videoEl
    if (!viewStateRef.current.isOnPause) {
      clearIntervalsAndFireHeartBeat(true)
    }
  }

  const onEndRewind = (videoEl: HTMLVideoElement) => {
    props.onEndRewind?.(videoEl)

    videoElementRef.current = videoEl
    if (viewStateRef.current.isOnPlayFired && viewStateRef.current.isOnPlay) {
      startTimerForWatchOrHeartBeatEvent()
    }
  }

  const onDestroy = () => {
    props.onDestroy?.()

    resetViewStateAndClearIntervals()
  }

  // Player Video Controller's events (onInit, OnBeforeReInit, onReInit, onChangeUrl)
  const onInit = (videoEl: HTMLVideoElement) => {
    props.onInit?.(videoEl)
  }

  const onReInit = (videoEl: HTMLVideoElement) => {
    props.onReInit?.(videoEl)
  }

  const onBeforeReInit = (videoEl: HTMLVideoElement) => {
    props.onBeforeReInit?.(videoEl)
  }

  const onChangeUrl = (videoEl: HTMLVideoElement) => {
    props.onChangeUrl?.(videoEl)
  }

  const statisticState: PlayerTrexCounterRenderParameters = useMemo(() => {
    return {
      onPlay,
      onPause,
      onStop,
      onEnded,
      onWaiting,
      onCanPlay,
      onInit,
      onBeforeReInit,
      onReInit,
      onChangeUrl,
      onStartRewind,
      onEndRewind,
      onDestroy,
    }
  }, [])

  return children(statisticState)
}

export default PlayerTrexCounterManager
