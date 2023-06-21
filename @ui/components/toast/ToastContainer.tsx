import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import { usePrefix } from '../ThemeProvider'
import { PrefixProps, PrefixRefForwardingComponent } from '@ui/helpers'

import styles from './Toast.module.scss'

export type ToastPosition =
  | 'top-start'
  | 'top-center'
  | 'top-end'
  | 'middle-start'
  | 'middle-center'
  | 'middle-end'
  | 'bottom-start'
  | 'bottom-center'
  | 'bottom-end'

export interface ToastContainerProps extends PrefixProps, React.HTMLAttributes<HTMLElement> {
  position?: ToastPosition
  containerPosition?: string
}

const propTypes = {
  prefix: PropTypes.string,
  position: PropTypes.oneOf<ToastPosition>([
    'top-start',
    'top-center',
    'top-end',
    'middle-start',
    'middle-center',
    'middle-end',
    'bottom-start',
    'bottom-center',
    'bottom-end',
  ]),
  containerPosition: PropTypes.string,
}

const positionClasses = {
  'top-start': 'top-0 start-0',
  'top-center': 'top-0 start-50 translate-middle-x',
  'top-end': 'top-0 end-0',
  'middle-start': 'top-50 start-0 translate-middle-y',
  'middle-center': 'top-50 start-50 translate-middle',
  'middle-end': 'top-50 end-0 translate-middle-y',
  'bottom-start': 'bottom-0 start-0',
  'bottom-center': 'bottom-0 start-50 translate-middle-x',
  'bottom-end': 'bottom-0 end-0',
}

const ToastContainer: PrefixRefForwardingComponent<'div', ToastContainerProps> = React.forwardRef<
  HTMLDivElement,
  ToastContainerProps
>(
  (
    {
      prefix: prefixProp,
      position,
      containerPosition = 'fixed',
      className,
      as: Component = 'div',
      ...props
    },
    ref,
  ) => {
    const prefix = usePrefix(prefixProp, 'toast-container')

    return (
      <Component
        ref={ref}
        {...props}
        className={classNames(
          styles[prefix],
          position && [
            containerPosition ? `position-${containerPosition}` : null,
            positionClasses[position],
          ],
          className,
        )}
      />
    )
  },
)

ToastContainer.displayName = 'ToastContainer'
ToastContainer.propTypes = propTypes

export default ToastContainer
