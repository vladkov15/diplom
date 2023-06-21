import { MutableRefObject } from 'react'

export const DEFAULT_MINUTES_FOR_WATCHING_EVENT = 5
export const DEFAULT_VIDEO_URL = 'prof.mp4'
// export const DEFAULT_VIDEO_URL = 'BT5.stream'

export const getDuration = (videoEl: HTMLVideoElement): number => {
  return parseInt(`${videoEl.currentTime}`)
}

export const getTimestamp = (): number => {
  return parseInt(`${new Date().getTime() / 1000}`)
}

// Используется для эевентов и для статистики
export const getIntervalId = (
  timeCounterRef: MutableRefObject<number>,
  minimalTime: number,
  cb: () => void,
): NodeJS.Timer => {
  return setInterval(() => {
    const time = timeCounterRef.current + 1
    timeCounterRef.current = time
    if (time === minimalTime * 60) cb()
  }, 1000)
}
