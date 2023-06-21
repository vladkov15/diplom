import React, { useRef } from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import BaseOverlay, {
  OverlayProps as BaseOverlayProps,
  OverlayArrowProps,
} from '@restart/ui/Overlay'
import { State } from '@restart/ui/usePopper'
import useCallbackRef from '@restart/hooks/useCallbackRef'
import useEventCallback from '@restart/hooks/useEventCallback'
import useIsomorphicEffect from '@restart/hooks/useIsomorphicEffect'
import useMergedRefs from '@restart/hooks/useMergedRefs'

import Fade from '@ui/components/Fade'

import { TransitionType } from '@ui/helpers'
import useOverlayOffset from './useOverlayOffset'
import { Placement, PopperRef, RootCloseEvent } from '@ui/types'
import safeFindDOMNode from '@ui/utils/safeFindDOMNode'

export interface OverlayInjectedProps {
  ref: React.RefCallback<HTMLElement>
  style: React.CSSProperties
  'aria-labelledby'?: string
  arrowProps: Partial<OverlayArrowProps>
  show: boolean
  placement: Placement | undefined
  popper: PopperRef
  [prop: string]: any
}

export type OverlayChildren =
  | React.ReactElement<OverlayInjectedProps>
  | ((injected: OverlayInjectedProps) => React.ReactNode)

export interface OverlayProps
  extends Omit<BaseOverlayProps, 'children' | 'transition' | 'rootCloseEvent'> {
  children: OverlayChildren
  transition?: TransitionType
  placement?: Placement
  rootCloseEvent?: RootCloseEvent
}

const propTypes = {
  show: PropTypes.bool,
  popperConfig: PropTypes.object,
  rootClose: PropTypes.bool,
  rootCloseEvent: PropTypes.oneOf<RootCloseEvent>(['click', 'mousedown']),
  onHide: PropTypes.func,
  onEnter: PropTypes.func,
  onEntering: PropTypes.func,
  onEntered: PropTypes.func,
  onExit: PropTypes.func,
  onExiting: PropTypes.func,
  onExited: PropTypes.func,
  placement: PropTypes.oneOf<Placement>([
    'auto-start',
    'auto',
    'auto-end',
    'top-start',
    'top',
    'top-end',
    'right-start',
    'right',
    'right-end',
    'bottom-end',
    'bottom',
    'bottom-start',
    'left-end',
    'left',
    'left-start',
  ]),
}

const defaultProps: Partial<OverlayProps> = {
  transition: Fade,
  rootClose: false,
  show: false,
  placement: 'top',
}

function wrapRefs(props: OverlayInjectedProps, arrowProps: Partial<OverlayArrowProps>) {
  const { ref } = props
  const { ref: aRef } = arrowProps

  // @ts-ignore
  if (!ref.__wrapped) ref.__wrapped = (r: React.Component) => ref(safeFindDOMNode(r))
  // @ts-ignore
  props.ref = ref.__wrapped

  // @ts-ignore
  if (!aRef.__wrapped) aRef.__wrapped = (r: React.Component) => aRef(safeFindDOMNode(r))
  // @ts-ignore
  arrowProps.ref = aRef.__wrapped
}

const Overlay = React.forwardRef<HTMLElement, OverlayProps>(
  ({ children: overlay, transition, popperConfig = {}, ...outerProps }, outerRef) => {
    const popperRef = useRef<Partial<PopperRef>>({})
    const [firstRenderedState, setFirstRenderedState] = useCallbackRef<State>()
    const [ref, modifiers] = useOverlayOffset(outerProps.offset)
    const mergedRef = useMergedRefs(outerRef as React.RefObject<HTMLElement>, ref)

    const Transition = transition === true ? Fade : transition || undefined

    const handleFirstUpdate = useEventCallback((state) => {
      setFirstRenderedState(state)
      popperConfig?.onFirstUpdate?.(state)
    })

    useIsomorphicEffect(() => {
      if (firstRenderedState) popperRef.current.scheduleUpdate?.()
    }, [firstRenderedState])

    return (
      <BaseOverlay
        {...outerProps}
        ref={mergedRef}
        popperConfig={{
          ...popperConfig,
          modifiers: modifiers.concat(popperConfig.modifiers || []),
          onFirstUpdate: handleFirstUpdate,
        }}
        transition={Transition as React.ComponentType}
      >
        {(overlayProps, { arrowProps, popper: popperObj, show }) => {
          wrapRefs(overlayProps as OverlayInjectedProps, arrowProps)

          const updatedPlacement = popperObj?.placement
          const popper = Object.assign(popperRef.current, {
            state: popperObj?.state,
            scheduleUpdate: popperObj?.update,
            placement: updatedPlacement,
            outOfBoundaries: popperObj?.state?.modifiersData.hide?.isReferenceHidden || false,
          })

          if (typeof overlay === 'function')
            return overlay({
              ...overlayProps,
              placement: updatedPlacement,
              show,
              ...(!transition && show && { className: 'show' }),
              popper,
              arrowProps,
            })

          return React.cloneElement(overlay as React.ReactElement, {
            ...overlayProps,
            placement: updatedPlacement,
            arrowProps,
            popper,
            className: classNames(overlay.props.className, !transition && show && 'show'),
            style: { ...overlay.props.style, ...overlayProps.style },
          })
        }}
      </BaseOverlay>
    )
  },
)

Overlay.displayName = 'Overlay'
Overlay.propTypes = propTypes
Overlay.defaultProps = defaultProps

export default Overlay
