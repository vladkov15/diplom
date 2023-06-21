import React, { useEffect, useRef } from 'react'

export interface HtmlVideoStreamerProps
  extends Omit<React.HTMLAttributes<HTMLVideoElement>, 'onError'> {
  url: string

  autoPlay?: boolean
  muted?: boolean

  onInit?: (videoEl: HTMLVideoElement, player?: null, variant?: 'html') => void
  onReInit?: (videoEl: HTMLVideoElement, player?: null, variant?: 'html') => void
  onBeforeReInit?: (videoEl: HTMLVideoElement) => void
  onError?: (videoEl: HTMLVideoElement, error: unknown) => void
}

const HtmlVideoStreamer = React.forwardRef<HTMLVideoElement, HtmlVideoStreamerProps>(
  ({ url, onInit, onReInit, onBeforeReInit, onError, ...props }, ref) => {
    const videoRef = useRef<HTMLVideoElement | null>(null)
    const mockPlayerRef = useRef<boolean | null>(null)

    useEffect(() => {
      const videoEl = videoRef.current as HTMLVideoElement
      if (!url) return

      const start = async () => {
        if (mockPlayerRef.current) {
          onBeforeReInit?.(videoEl)
        }

        if (!mockPlayerRef.current) onInit?.(videoEl, null, 'html')
        else onReInit?.(videoEl, null, 'html')

        mockPlayerRef.current = true
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
      >
        <source src={url} type='video/mp4' />
      </video>
    )
  },
)
HtmlVideoStreamer.displayName = 'HtmlVideoStreamer'

export default HtmlVideoStreamer
