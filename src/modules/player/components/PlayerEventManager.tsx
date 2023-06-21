import { ReactElement, useEffect, useMemo, useRef } from 'react'
import { v4 as uuid } from 'uuid'

import { ContentType } from '@/models/content'
import { ApiHelper } from '@/app/api'
import { Player, VideoStreamerVariant } from './player/VideoStreamer'
import {
  DEFAULT_MINUTES_FOR_WATCHING_EVENT,
  DEFAULT_VIDEO_URL,
  getDuration,
  getIntervalId,
  getTimestamp,
} from '../helpers/events.helper'
import { PlayerEventActionType, PlayerEventData, PlayerType } from '../player-event.model'

import { NODE_ENV } from '@/config'

type CommonCallback = (videoEl: HTMLVideoElement) => void
type InitReInitCallback = (
  videoEl: HTMLVideoElement,
  player?: Player,
  variant?: VideoStreamerVariant,
) => void

export interface EventsRenderParameters {
  contentId: number
  contentType: ContentType
  onPlay: CommonCallback
  onPause: CommonCallback
  onStop: CommonCallback
  onInit: InitReInitCallback
  onBeforeReInit: CommonCallback
  onReInit: InitReInitCallback
  onEnded: CommonCallback
  onChangeUrl: CommonCallback
  onWaiting: CommonCallback
  onCanPlay: CommonCallback
  onAutoWatch?: (data: PlayerEventData) => void
  onDestroy?: () => void
}

export interface PlayerEventManagerProps extends Partial<EventsRenderParameters> {
  contentId: number
  contentType: ContentType
  url: string
  minutesForWatchingEvent?: number
  // onAutoWatch?: (data: PlayerEventData) => void
  children: (params: EventsRenderParameters) => ReactElement
}

const api = ApiHelper.getInstance()

const PlayerEventManager = ({
  contentId,
  contentType,
  minutesForWatchingEvent = DEFAULT_MINUTES_FOR_WATCHING_EVENT,
  url,
  children,
  ...props
}: PlayerEventManagerProps) => {
  // const isBeforeUnloaded = useRef(false)
  const timeCounterRef = useRef(0)
  const viewUIDRef = useRef(uuid())
  const intervalIdRef = useRef<NodeJS.Timer>()

  const previousContentType = useRef(contentType)
  const previousContentId = useRef(contentId)
  const viewStateRef = useRef({
    viewUID: viewUIDRef.current,
    isOnPlayFired: false,
    isOnPlay: false,
    isOnPause: true,
  })

  const sentPlayerEvent = async (data: PlayerEventData, debug?: boolean | string) => {
    const label = typeof debug === 'string' ? `${debug}:` : ''
    debug && console.log(label, data.view_uid, data.duration)
    await api?.services.playerEvent.sentPlayerEvent({ data })
  }

  // const sentPlayerEventSync = (data: PlayerEventData, debug?: boolean | string) => {
  //   const label = typeof debug === 'string' ? `${debug}:` : ''
  //   debug && console.log(label, data.view_uid, data.duration)
  //   api?.services.playerEvent.sentPlayerEventSync({ data })
  // }

  const getContentType = (actionType: PlayerEventActionType) => {
    if (
      actionType === PlayerEventActionType.PAUSE ||
      actionType === PlayerEventActionType.STOP ||
      actionType === PlayerEventActionType.WATCHING
    ) {
      return previousContentType.current || contentType
    }

    return contentType
  }

  // Create payload callback
  const getPlayerEventData = (
    actionType: PlayerEventActionType,
    videoEl?: HTMLVideoElement,
  ): PlayerEventData => {
    const duration = videoEl ? getDuration(videoEl) : timeCounterRef.current
    const timestamp = getTimestamp()
    const view_uid = viewUIDRef.current
    const content_type_ptr = getContentType(actionType)

    return {
      item_ptr: previousContentId.current || contentId,
      view_uid,
      view_delay: minutesForWatchingEvent * 60,
      content_type_ptr,
      player_action_ptr: actionType,
      player_type: PlayerType.WEB,
      duration,
      timestamp,
    }
  }

  const onPlay = async (videoEl: HTMLVideoElement) => {
    props.onPlay?.(videoEl)

    if (!url.includes(DEFAULT_VIDEO_URL)) {
      if (viewStateRef.current.isOnPause) {
        viewStateRef.current = {
          ...viewStateRef.current,
          isOnPlayFired: true,
          isOnPlay: true,
          isOnPause: false,
        }
        intervalIdRef.current = getIntervalId(timeCounterRef, minutesForWatchingEvent, onAutoWatch)
      }

      const data = getPlayerEventData(PlayerEventActionType.PLAY, videoEl)
      await sentPlayerEvent(data, NODE_ENV === 'development' && 'onPlay')
    }
  }

  const onPause = async (videoEl: HTMLVideoElement) => {
    props.onPause?.(videoEl)

    if (!url.includes(DEFAULT_VIDEO_URL)) {
      clearInterval(intervalIdRef.current)

      if (viewStateRef.current.isOnPlay) {
        viewStateRef.current = {
          ...viewStateRef.current,
          isOnPlay: false,
          isOnPause: true,
        }
      }

      const data = getPlayerEventData(PlayerEventActionType.PAUSE, videoEl)
      await sentPlayerEvent(data, NODE_ENV === 'development' && 'onPause')
    }
  }

  const onStop = async (videoEl: HTMLVideoElement, data?: PlayerEventData) => {
    props.onStop?.(videoEl)

    if (url.includes(DEFAULT_VIDEO_URL)) return

    if (data) await sentPlayerEvent(data, NODE_ENV === 'development' && 'onStop (watching)')
    // clearInterval(intervalIdRef.current) // ToDO (hardz): Возможно это не нужно, так как вызывается после вызова onStop
  }

  const onAutoWatch = async () => {
    const watchData = prepareDataForWatching()
    if (!watchData) return

    await sentPlayerEvent(watchData, NODE_ENV === 'development' && 'onAutoWatch')
    props.onAutoWatch?.(watchData)
  }

  const prepareDataForWatching = () => {
    console.log(timeCounterRef.current)

    if (timeCounterRef.current < minutesForWatchingEvent * 60) return null
    if (url.includes(DEFAULT_VIDEO_URL)) return null

    return getPlayerEventData(PlayerEventActionType.WATCHING)
  }

  const onWatch = async (data: PlayerEventData) => {
    await sentPlayerEvent(data, NODE_ENV === 'development' && 'onWatch')
  }

  // const onWatchSync = (data: PlayerEventData) => {
  //   sentPlayerEventSync(data, NODE_ENV === 'development' && 'onWatchSync')
  // }

  const prepareDataForDestroy = () => {
    if (url.includes(DEFAULT_VIDEO_URL)) return null
    return getPlayerEventData(PlayerEventActionType.STOP)
  }

  const onDestroy = async (data: PlayerEventData) => {
    props.onDestroy?.()
    await sentPlayerEvent(data, NODE_ENV === 'development' && 'onDestroy')
  }

  // const onDestroySync = (data: PlayerEventData) => {
  //   sentPlayerEventSync(data, NODE_ENV === 'development' && 'onDestroySync')
  // }

  const onInit = async (videoEl: HTMLVideoElement) => {
    props.onInit?.(videoEl)

    if (videoEl.autoplay) {
      await onPlay(videoEl)
    }
  }

  const onBeforeReInit = async (videoEl: HTMLVideoElement) => {
    props.onBeforeReInit?.(videoEl)

    // Before url change
    // At first we check rule for watching event
    if (contentId !== previousContentId.current) {
      // Before send stop and watch event check session is started by viewStateRef.current.isOnPlayFired
      if (viewStateRef.current.isOnPlayFired) {
        // Формируем нагрузку для евентов здесь, т.к. перезатираются рефки onChangeUrl
        const stopData = getPlayerEventData(PlayerEventActionType.STOP, videoEl)
        const watchData = prepareDataForWatching()
        await onStop(videoEl, stopData)
        if (watchData) await onWatch(watchData)
      }

      clearInterval(intervalIdRef.current)
      timeCounterRef.current = 0
    } else if (contentId === previousContentId.current) {
      clearInterval(intervalIdRef.current)
    }

    // Перезатираем предыдущий контент тайп для следующей сессии
    previousContentType.current = contentType
  }

  const onReInit = async (videoEl: HTMLVideoElement) => {
    props.onReInit?.(videoEl)
  }

  const onChangeUrl = async (videoEl: HTMLVideoElement) => {
    if (contentId === previousContentId.current) {
      if (!videoEl.paused && viewStateRef.current.isOnPlayFired) {
        intervalIdRef.current = getIntervalId(timeCounterRef, minutesForWatchingEvent, onAutoWatch)
      }
      if (!videoEl.paused && !viewStateRef.current.isOnPlayFired) {
        await onPlay(videoEl)
        viewStateRef.current = {
          ...viewStateRef.current,
          isOnPlayFired: true,
          isOnPlay: true,
          isOnPause: false,
        }
        intervalIdRef.current = getIntervalId(timeCounterRef, minutesForWatchingEvent, onAutoWatch)
      }
    }
    if (contentId !== previousContentId.current) {
      const newViewUID = uuid()
      viewUIDRef.current = newViewUID
      previousContentId.current = contentId
      // Every changeUrl player event we reset flag isOnPlayFired to false, and rewrite new view session id
      // Only for contentId changed
      viewStateRef.current = {
        ...viewStateRef.current,
        isOnPlayFired: !videoEl.paused,
        isOnPlay: !videoEl.paused,
        isOnPause: videoEl.paused,
        viewUID: newViewUID,
      }
      if (!videoEl.paused && videoEl.autoplay) {
        await onPlay(videoEl)
        intervalIdRef.current = getIntervalId(timeCounterRef, minutesForWatchingEvent, onAutoWatch)
      }
    }
  }

  const onEnded = async (videoEl: HTMLVideoElement) => {
    props.onEnded?.(videoEl)

    const watchData = prepareDataForWatching()
    watchData && onWatch(watchData)

    const destroyData = prepareDataForDestroy()
    destroyData && onDestroy(destroyData)

    const newViewUID = uuid()
    viewUIDRef.current = newViewUID
    clearInterval(intervalIdRef.current)
    timeCounterRef.current = 0

    // If onEnded event fired we reset view session state
    viewStateRef.current = {
      ...viewStateRef.current,
      isOnPlayFired: false,
      isOnPlay: false,
      isOnPause: true,
      viewUID: newViewUID,
    }
  }

  const onWaiting = (/*videoEl: HTMLVideoElement*/) => {
    console.log('onWaiting fired')
    if (viewStateRef.current.isOnPlayFired && viewStateRef.current.isOnPlay) {
      clearInterval(intervalIdRef.current)
    }
  }

  const onCanPlay = (/*videoEl: HTMLVideoElement*/) => {
    console.log('CanPlay fired')
    if (viewStateRef.current.isOnPlayFired && viewStateRef.current.isOnPlay) {
      intervalIdRef.current = getIntervalId(timeCounterRef, minutesForWatchingEvent, onAutoWatch)
    }
  }

  // const handleBeforeUnload = () => (isBeforeUnloaded.current = true)

  // const handleVisibilityChange = () => {
  //   // Тут будем чекать, если это не мобильное устройство, то проверять на isBeforeUnloaded
  //   // если мобилка, то проверять не надо
  //   if (document.visibilityState === 'hidden' && isBeforeUnloaded.current) {
  //     const watchData = prepareDataForWatching()
  //     watchData && onWatchSync(watchData)
  //
  //     const destroyData = prepareDataForDestroy()
  //     destroyData && onDestroySync(destroyData)
  //   }
  // }

  useEffect(() => {
    // window.addEventListener('beforeunload', handleBeforeUnload)
    // document.addEventListener('visibilitychange', handleVisibilityChange)

    previousContentId.current = contentId

    return () => {
      // window.removeEventListener('beforeunload', handleBeforeUnload)
      // document.removeEventListener('visibilitychange', handleVisibilityChange)

      const watchData = prepareDataForWatching()
      watchData && onWatch(watchData)

      const destroyData = prepareDataForDestroy()
      destroyData && onDestroy(destroyData)

      clearInterval(intervalIdRef.current)
    }
  }, [])

  const eventsState: EventsRenderParameters = useMemo(() => {
    return {
      contentId,
      contentType,
      onInit,
      onReInit,
      onBeforeReInit,
      onPause,
      onStop,
      onPlay,
      onEnded,
      onChangeUrl,
      onWaiting,
      onCanPlay,
    }
  }, [contentId, contentType])

  return children(eventsState)
}

export default PlayerEventManager
