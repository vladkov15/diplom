import React, { useEffect, useRef, useState } from 'react'
import useUpdateEffect from '@restart/hooks/useUpdateEffect'

export type InteractionState = {
  isUserActive: boolean
  nudge: () => void
  toggleFixedUserActive: () => void
}

type InteractionRenderParameters = InteractionState & {
  handleMouseMove: (event: React.MouseEvent) => void
  handleFocus: (event: React.FocusEvent) => void
  handleTouchStart: (event: React.TouchEvent) => void
  handleTouchEnd: (event: React.TouchEvent) => void
}

export type InteractionFlags = {
  isMouseMoved: boolean
  isTouched: boolean
  isTouching: boolean
  isEntered: boolean
  clientX: number
  clientY: number
}

interface PlayerInteractionManagerProps {
  inactivityDelay?: number
  children: (params: InteractionRenderParameters) => React.ReactElement
}

const PlayerInteractionManager = ({ inactivityDelay, children }: PlayerInteractionManagerProps) => {
  const [state, setState] = useState({ isUserActive: true })

  const isUserActive = useRef(true)
  const isFixed = useRef(false)
  const intervalId = useRef<NodeJS.Timer>()
  const inactivityTimeoutId = useRef<NodeJS.Timer>()
  const flags = useRef<InteractionFlags>({
    isMouseMoved: true,
    isTouched: false,
    isTouching: false,
    isEntered: false,
    clientX: -1,
    clientY: -1,
  })

  useEffect(() => {
    const delaySeconds = inactivityDelay || 0
    if (delaySeconds >= 0) {
      // Negative values deactivate
      intervalId.current = setInterval(updateActivity, 250) // This interval is not the inactivity delay.
    }

    return () => {
      if (intervalId.current) clearInterval(intervalId.current)
      if (inactivityTimeoutId.current) clearTimeout(inactivityTimeoutId.current)
    }
  }, [])

  useUpdateEffect(() => {
    const delaySeconds = inactivityDelay || 0

    if (intervalId.current) clearInterval(intervalId.current)
    if (delaySeconds >= 0) {
      // Negative values deactivate
      intervalId.current = setInterval(updateActivity, 250) // This interval is not the inactivity delay.
    } else {
      setState(() => ({ isUserActive: true }))
    }
  }, [inactivityDelay])

  const handleMouseMove = (event: React.MouseEvent) => {
    if (event.clientX !== flags.current.clientX || event.clientY !== flags.current.clientY) {
      flags.current.isMouseMoved = true
      flags.current.clientX = event.clientX
      flags.current.clientY = event.clientY
    }
  }

  const handleTouchStart = () => {
    flags.current.isTouched = true
    flags.current.isTouching = true
  }

  const handleTouchEnd = () => {
    flags.current.isTouching = false
  }

  const nudge = () => {
    flags.current.isMouseMoved = true
  }

  const toggleFixedUserActive = () => {
    isFixed.current = !isFixed.current

    if (isFixed.current) flags.current.isMouseMoved = true
    else setState(() => ({ isUserActive: false }))
  }

  const handleFocus = (focusEvent: React.FocusEvent) => {
    if (focusEvent.target === focusEvent.currentTarget) nudge()
  }

  const setInactive = () => {
    if (!isFixed.current && !flags.current.isMouseMoved && isUserActive.current) {
      setState(() => ({ isUserActive: false }))
      isUserActive.current = false
    }
  }

  const updateActivity = () => {
    if (flags.current.isMouseMoved || flags.current.isTouched || flags.current.isTouching) {
      flags.current.isTouched = false
      flags.current.isMouseMoved = false

      if (!isUserActive.current) {
        setState(() => ({ isUserActive: true }))
        isUserActive.current = true
      }

      clearTimeout(inactivityTimeoutId.current)
      inactivityTimeoutId.current = setTimeout(setInactive, (inactivityDelay || 0) * 1000)
    }
  }

  return children({
    isUserActive: state.isUserActive,
    handleMouseMove,
    handleTouchStart,
    handleTouchEnd,
    handleFocus,
    toggleFixedUserActive,
    nudge,
  })
}

export default PlayerInteractionManager
