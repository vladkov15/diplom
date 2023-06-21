import React, { useEffect, useRef } from 'react'
import hls, { Events } from 'hls.js'

type HlsPlayer = hls

const createPlayer = async (
  videoEl: HTMLVideoElement,
  url: string,
  autoplay: boolean,
): Promise<hls> => {
  return new Promise((resolve) => {
    const player = new hls({
      xhrSetup: (xhr) => {
        xhr.withCredentials = false
      },
    })
    player.loadSource(url)
    player.attachMedia(videoEl)

    player.on(Events.MANIFEST_PARSED, () => autoplay && videoEl.play())

    resolve(player)
  })
}

const destroyPlayer = async () => undefined

export interface HlsVideoStreamerProps
  extends Omit<React.HTMLAttributes<HTMLVideoElement>, 'onError'> {
  url: string

  autoPlay?: boolean
  muted?: boolean

  onInit?: (videoEl: HTMLVideoElement, player?: HlsPlayer, variant?: 'hls') => void
  onBeforeReInit?: (videoEl: HTMLVideoElement) => void
  onReInit?: (videoEl: HTMLVideoElement, player?: HlsPlayer, variant?: 'hls') => void
  onError?: (videoEl: HTMLVideoElement, error: unknown) => void
}

const HlsVideoStreamer = React.forwardRef<HTMLVideoElement, HlsVideoStreamerProps>(
  ({ url, onInit, onReInit, onBeforeReInit, onError, ...props }, ref) => {
    const videoRef = useRef<HTMLVideoElement | null>(null)
    const playerRef = useRef<hls | null>(null)

    useEffect(() => {
      return () => {
        if (playerRef.current) destroyPlayer()
      }
    }, [])

    useEffect(() => {
      const videoEl = videoRef.current as HTMLVideoElement
      if (!hls.isSupported() || !url) return

      const start = async () => {
        if (playerRef.current) {
          onBeforeReInit?.(videoEl)
          await destroyPlayer()
        }

        const player = await createPlayer(videoEl, url, props.autoPlay || false)
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
HlsVideoStreamer.displayName = 'HlsVideoStreamer'

export type { HlsPlayer }

export default HlsVideoStreamer
