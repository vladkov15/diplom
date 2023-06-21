import React, { useCallback, useEffect, useRef, useState } from 'react'

import {
  enterFullscreen as enterFullscreenBase,
  exitFullscreen as exitFullscreenBase,
  getFullscreenElement,
  notifyFullscreenChange,
} from '../helpers/fullscreen.helper'

export type FullscreenState = {
  isFullscreen: boolean
  enterFullscreen: () => void
  exitFullscreen: () => void
  toggleFullscreen: () => void
}

type FullscreenRenderParameters = FullscreenState & {
  onFullscreenRef: (element: HTMLDivElement) => void
}

interface PlayerFullscreenManagerProps {
  children: (params: FullscreenRenderParameters) => React.ReactElement
}

const PlayerFullscreenManager = ({ children }: PlayerFullscreenManagerProps) => {
  const fullscreenRef = useRef<HTMLDivElement | null>(null)

  const [state, setState] = useState({ isFullscreen: false })

  const onFullscreenRef = useCallback((element: HTMLDivElement) => {
    fullscreenRef.current = element
    setState({ isFullscreen: getFullscreenElement() === element })
  }, [])

  const onFullscreenChange = () => {
    const fullscreenElement = getFullscreenElement()
    setState({ isFullscreen: !!(fullscreenElement && fullscreenElement === fullscreenRef.current) })
  }
  const unsubscribe = useRef(notifyFullscreenChange(onFullscreenChange))

  useEffect(() => {
    return () => {
      unsubscribe.current && unsubscribe.current()
    }
  }, [])

  const enterFullscreen = () => {
    if (fullscreenRef.current) enterFullscreenBase(fullscreenRef.current)
  }

  const exitFullscreen = () => {
    if (fullscreenRef.current) exitFullscreenBase()
  }

  const toggleFullscreen = () => {
    if (state.isFullscreen) exitFullscreen()
    else enterFullscreen()
  }

  return children({
    isFullscreen: state.isFullscreen,
    enterFullscreen,
    exitFullscreen,
    toggleFullscreen,
    onFullscreenRef,
  })
}

export default PlayerFullscreenManager
