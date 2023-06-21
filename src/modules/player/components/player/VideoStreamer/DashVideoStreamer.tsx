import React, { useEffect, useRef } from 'react'
import dash from 'dashjs'

import { DrmConfig, DrmTypes } from '../../../player.model'

type DashPlayer = dash.MediaPlayerClass

const getProtectionData = (drmConfig: DrmConfig | undefined) => {
  if (!drmConfig) return {}

  const protectionData = {} as dash.ProtectionDataSet

  const { servers } = drmConfig
  if (servers?.[DrmTypes.PLAYREADY]) {
    protectionData[DrmTypes.PLAYREADY] = {
      serverURL: servers[DrmTypes.PLAYREADY],
    }
  }

  if (servers?.[DrmTypes.WIDEVINE]) {
    protectionData[DrmTypes.WIDEVINE] = {
      serverURL: servers[DrmTypes.WIDEVINE],
      priority: 0,
    }
  }

  return protectionData
}

const createPlayer = async (
  videoEl: HTMLVideoElement,
  url: string,
  drmConfig?: DrmConfig,
): Promise<dash.MediaPlayerClass> => {
  return new Promise((resolve) => {
    const player = dash.MediaPlayer().create()
    player.updateSettings({ streaming: { text: { defaultEnabled: false } } })
    player.initialize(videoEl, url, false, videoEl.currentTime)

    const protectionData = getProtectionData(drmConfig)
    player.setProtectionData(protectionData)

    player.setInitialMediaSettingsFor('audio', { lang: 'ru' })

    resolve(player)
  })
}

const destroyPlayer = async (player: dash.MediaPlayerClass) => {
  player.destroy()
}

export interface DashVideoStreamerProps
  extends Omit<React.HTMLAttributes<HTMLVideoElement>, 'onError'> {
  url: string
  drmConfig?: DrmConfig

  autoPlay?: boolean
  muted?: boolean

  onInit?: (videoEl: HTMLVideoElement, player?: DashPlayer, variant?: 'hls') => void
  onBeforeReInit?: (videoEl: HTMLVideoElement) => void
  onReInit?: (videoEl: HTMLVideoElement, player?: DashPlayer, variant?: 'hls') => void
  onError?: (videoEl: HTMLVideoElement, error: unknown) => void
}

const DashVideoStreamer = React.forwardRef<HTMLVideoElement, DashVideoStreamerProps>(
  ({ url, drmConfig = {}, onInit, onBeforeReInit, onReInit, onError, ...props }, ref) => {
    const videoRef = useRef<HTMLVideoElement | null>(null)
    const playerRef = useRef<dash.MediaPlayerClass | null>(null)

    useEffect(() => {
      return () => {
        if (playerRef.current) destroyPlayer(playerRef.current)
      }
    }, [])

    useEffect(() => {
      const videoEl = videoRef.current as HTMLVideoElement
      if (!url) return

      const start = async () => {
        if (playerRef.current) {
          onBeforeReInit?.(videoEl)
          await destroyPlayer(playerRef.current)
        }

        const player = await createPlayer(videoEl, url, drmConfig)
        if (!playerRef.current) onInit?.(videoEl, player, 'hls')
        else onReInit?.(videoEl, player, 'hls')

        playerRef.current = player
      }

      start().catch((error) => onError?.(videoEl, error))
    }, [url])

    return (
      <video
        ref={(node: HTMLVideoElement) => {
          videoRef.current = node
          if (typeof ref === 'function') ref(node)
          else if (ref) ref.current = node
        }}
        {...props}
      />
    )
  },
)
DashVideoStreamer.displayName = 'DashVideoStreamer'

export type { DashPlayer }

export default DashVideoStreamer
