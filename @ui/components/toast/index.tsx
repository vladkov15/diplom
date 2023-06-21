import React, { useEffect, useMemo, useRef, useCallback } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import ToastFade from './ToastFade'
import ToastBody from './ToastBody'
import ToastHeader from './ToastHeader'
import ToastContext from './ToastContext'
import { usePrefix } from '../ThemeProvider'
import useTimeout from '@restart/hooks/useTimeout'
import { TransitionComponent } from '@restart/ui/types'

import { Variant } from '@ui/types'
import { PrefixProps, PrefixRefForwardingComponent } from '@ui/helpers'

import styles from './Toast.module.scss'

export interface ToastProps extends PrefixProps, React.HTMLAttributes<HTMLElement> {
  animation?: boolean
  autohide?: boolean
  delay?: number
  onClose?: (e?: React.MouseEvent | React.KeyboardEvent) => void
  show?: boolean
  transition?: TransitionComponent
  variant?: Variant
}

const propTypes = {
  prefix: PropTypes.string,
  animation: PropTypes.bool,
  autohide: PropTypes.bool,
  delay: PropTypes.number,
  onClose: PropTypes.func,
  show: PropTypes.bool,
  transition: PropTypes.elementType,
  variant: PropTypes.string,
}

const Toast: PrefixRefForwardingComponent<'div', ToastProps> = React.forwardRef<
  HTMLDivElement,
  ToastProps
>(
  (
    {
      prefix: prefixProp,
      className,
      transition: Transition = ToastFade,
      show = true,
      animation = true,
      delay = 5000,
      autohide = false,
      onClose,
      variant,
      ...props
    },
    ref,
  ) => {
    const prefix = usePrefix(prefixProp, 'toast')

    const delayRef = useRef(delay)
    const onCloseRef = useRef(onClose)

    useEffect(() => {
      delayRef.current = delay
      onCloseRef.current = onClose
    }, [delay, onClose])

    const autoHideTimeout = useTimeout()
    const autoHideToast = autohide && show

    const autoHideFunc = useCallback(() => {
      if (autoHideToast) onCloseRef.current?.()
    }, [autoHideToast])

    useEffect(() => {
      autoHideTimeout.set(autoHideFunc, delayRef.current)
    }, [autoHideTimeout, autoHideFunc])

    const toastContext = useMemo(() => ({ onClose }), [onClose])

    const hasAnimation = !!(Transition && animation)

    const toast = (
      <div
        {...props}
        ref={ref}
        className={classNames(
          styles[prefix],
          className,
          variant && styles[`${prefix}-variant-${variant}`],
          !hasAnimation && (show ? 'show' : 'hide'),
        )}
        role='alert'
        aria-live='assertive'
        aria-atomic='true'
      />
    )

    return (
      <ToastContext.Provider value={toastContext}>
        {hasAnimation && Transition ? (
          <Transition in={show} unmountOnExit>
            {toast}
          </Transition>
        ) : (
          toast
        )}
      </ToastContext.Provider>
    )
  },
)

Toast.propTypes = propTypes
Toast.displayName = 'Toast'

export default Object.assign(Toast, {
  Body: ToastBody,
  Header: ToastHeader,
})
