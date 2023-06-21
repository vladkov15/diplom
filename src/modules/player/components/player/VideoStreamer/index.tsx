import React from 'react'

import DashVideoStreamer, { DashPlayer, DashVideoStreamerProps } from './DashVideoStreamer'
import HlsVideoStreamer, { HlsPlayer, HlsVideoStreamerProps } from './HlsVideoStreamer'
import HtmlVideoStreamer, { HtmlVideoStreamerProps } from './HtmlVideoStreamer'

type Player = HlsPlayer | DashPlayer | null

export type VideoStreamerVariant = 'hls' | 'dash' | 'html'

export type VideoStreamerProps = DashVideoStreamerProps &
  HlsVideoStreamerProps &
  HtmlVideoStreamerProps

const VideoStreamer = React.forwardRef<HTMLVideoElement, VideoStreamerProps>(
  ({ drmConfig, onError, ...props }, ref) => {
    if (props.url.indexOf('.mp4') !== -1) {
      return <HtmlVideoStreamer ref={ref} {...props} />
    }

    if (props.url.indexOf('.m3u8') !== -1) {
      return <HlsVideoStreamer ref={ref} {...props} />
    }

    if (props.url.indexOf('.mpd') !== -1) {
      return <DashVideoStreamer ref={ref} drmConfig={drmConfig} {...props} />
    }

    return null
  },
)
VideoStreamer.displayName = 'VideoStreamer'

export type { Player, DashPlayer, HlsPlayer }

export default React.memo(VideoStreamer)
