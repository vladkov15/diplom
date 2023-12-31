import React, { useCallback, useRef } from 'react'
import PropTypes from 'prop-types'
import { useUncontrolledProp } from 'uncontrollable'
import contains from 'dom-helpers/contains'
import useTimeout from '@restart/hooks/useTimeout'
import useMergedRefs from '@restart/hooks/useMergedRefs'

import Overlay, { OverlayChildren, OverlayProps } from './Overlay'

import safeFindDOMNode from '@ui/utils/safeFindDOMNode'

export type OverlayTriggerType = 'hover' | 'click' | 'focus'

export type OverlayDelay = number | { show: number; hide: number }

export type OverlayInjectedProps = { onFocus?: (...args: any[]) => any }

type TriggerProps = React.HTMLAttributes<HTMLElement> & {
  ref: (r: React.Component | Element | null | undefined) => void
}

export type OverlayTriggerRenderProps = OverlayInjectedProps & { ref: React.Ref<any> }

export interface OverlayTriggerProps extends Omit<OverlayProps, 'children' | 'target'> {
  children: React.ReactElement | ((props: OverlayTriggerRenderProps) => React.ReactNode)
  trigger?: OverlayTriggerType | OverlayTriggerType[]
  delay?: OverlayDelay
  show?: boolean
  defaultShow?: boolean
  onToggle?: (nextShow: boolean) => void
  flip?: boolean
  overlay: OverlayChildren
  target?: never
  onHide?: never
}

function normalizeDelay(delay?: OverlayDelay) {
  return delay && typeof delay === 'object' ? delay : { show: delay, hide: delay }
}

function handleMouseOverOut(
  handler: (...args: [React.MouseEvent, ...any[]]) => any,
  args: [React.MouseEvent, ...any[]],
  relatedNative: 'fromElement' | 'toElement',
) {
  const [e] = args
  const target = e.currentTarget

  type OverrideMouseEvent = MouseEvent & { fromElement: Element; toElement: Element }
  const related = e.relatedTarget || (e.nativeEvent as OverrideMouseEvent)[relatedNative]

  if ((!related || related !== target) && !contains(target, related as Element)) {
    handler(...args)
  }
}

const triggerType = PropTypes.oneOf(['click', 'hover', 'focus'])

const propTypes = {
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.func]).isRequired,
  trigger: PropTypes.oneOfType([triggerType, PropTypes.arrayOf(triggerType)]),
  delay: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.shape({
      show: PropTypes.number,
      hide: PropTypes.number,
    }),
  ]),
  show: PropTypes.bool,
  defaultShow: PropTypes.bool,
  onToggle: PropTypes.func,
  flip: PropTypes.bool,
  overlay: PropTypes.oneOfType([PropTypes.func, PropTypes.element.isRequired]),
  popperConfig: PropTypes.object,
  target: PropTypes.oneOf([null]),
  onHide: PropTypes.oneOf([null]),
  placement: PropTypes.oneOf([
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

const defaultProps = {
  defaultShow: false,
  trigger: ['hover', 'focus'],
}

function OverlayTrigger({
  trigger,
  overlay,
  children,
  popperConfig = {},
  show: propsShow,
  defaultShow = false,
  onToggle,
  delay: propsDelay,
  placement,
  flip = placement && placement.indexOf('auto') !== -1,
  ...props
}: OverlayTriggerProps) {
  const triggerNodeRef = useRef(null)
  const mergedRef = useMergedRefs<unknown>(triggerNodeRef, (children as any).ref)
  const timeout = useTimeout()
  const hoverStateRef = useRef<string>('')

  const [show, setShow] = useUncontrolledProp(propsShow, defaultShow, onToggle)

  const delay = normalizeDelay(propsDelay)

  const { onFocus, onBlur, onClick } =
    typeof children !== 'function' ? React.Children.only(children).props : ({} as any)

  const attachRef = (r: React.Component | Element | null | undefined) => {
    mergedRef(safeFindDOMNode(r))
  }

  const handleShow = useCallback(() => {
    timeout.clear()
    hoverStateRef.current = 'show'

    if (!delay.show) {
      setShow(true)
      return
    }

    timeout.set(() => {
      if (hoverStateRef.current === 'show') setShow(true)
    }, delay.show)
  }, [delay.show, setShow, timeout])

  const handleHide = useCallback(() => {
    timeout.clear()
    hoverStateRef.current = 'hide'

    if (!delay.hide) {
      setShow(false)
      return
    }

    timeout.set(() => {
      if (hoverStateRef.current === 'hide') setShow(false)
    }, delay.hide)
  }, [delay.hide, setShow, timeout])

  const handleFocus = useCallback(
    (...args: any[]) => {
      handleShow()
      onFocus?.(...args)
    },
    [handleShow, onFocus],
  )

  const handleBlur = useCallback(
    (...args: any[]) => {
      handleHide()
      onBlur?.(...args)
    },
    [handleHide, onBlur],
  )

  const handleClick = useCallback(
    (...args: any[]) => {
      setShow(!show)
      onClick?.(...args)
    },
    [onClick, setShow, show],
  )

  const handleMouseOver = useCallback(
    (...args: [React.MouseEvent, ...any[]]) => {
      handleMouseOverOut(handleShow, args, 'fromElement')
    },
    [handleShow],
  )

  const handleMouseOut = useCallback(
    (...args: [React.MouseEvent, ...any[]]) => {
      handleMouseOverOut(handleHide, args, 'toElement')
    },
    [handleHide],
  )

  const triggers: string[] = !trigger ? [] : [...trigger]
  const triggerProps = { ref: attachRef } as TriggerProps

  if (triggers.indexOf('click') !== -1) {
    triggerProps.onClick = handleClick
  }

  if (triggers.indexOf('focus') !== -1) {
    triggerProps.onFocus = handleFocus
    triggerProps.onBlur = handleBlur
  }

  if (triggers.indexOf('hover') !== -1) {
    triggerProps.onMouseOver = handleMouseOver
    triggerProps.onMouseOut = handleMouseOut
  }

  return (
    <>
      {typeof children === 'function'
        ? children(triggerProps)
        : React.cloneElement(children, triggerProps)}
      <Overlay
        {...props}
        show={show}
        onHide={handleHide}
        flip={flip}
        placement={placement}
        popperConfig={popperConfig}
        target={triggerNodeRef.current}
      >
        {overlay}
      </Overlay>
    </>
  )
}

OverlayTrigger.propTypes = propTypes
OverlayTrigger.defaultProps = defaultProps

export default OverlayTrigger
