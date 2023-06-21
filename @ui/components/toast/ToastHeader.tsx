import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import useEventCallback from '@restart/hooks/useEventCallback'

import ToastContext from './ToastContext'
import ButtonClose, { ButtonCloseVariant } from '../button/ButtonClose'

import { usePrefix } from '@ui/components/ThemeProvider'
import { PrefixOnlyProps } from '@ui/helpers'

import styles from './Toast.module.scss'

export interface ToastHeaderProps extends PrefixOnlyProps, React.HTMLAttributes<HTMLDivElement> {
  closeLabel?: string
  closeVariant?: ButtonCloseVariant
  closeButton?: boolean
}

const propTypes = {
  prefix: PropTypes.string,
  closeLabel: PropTypes.string,
  closeVariant: PropTypes.oneOf<ButtonCloseVariant>(['white']),
  closeButton: PropTypes.bool,
}

const defaultProps = {
  closeLabel: 'Close',
  closeButton: true,
}

const ToastHeader = React.forwardRef<HTMLDivElement, ToastHeaderProps>(
  (
    {
      prefix: prefixProp,
      closeLabel,
      closeVariant,
      closeButton,
      className,
      children,
      ...props
    }: ToastHeaderProps,
    ref,
  ) => {
    const prefix = usePrefix(prefixProp, 'toast-header')

    const context = useContext(ToastContext)

    const handleClick = useEventCallback((e) => context?.onClose?.(e))

    return (
      <div ref={ref} {...props} className={classNames(styles[prefix], className)}>
        {children}

        {closeButton && (
          <ButtonClose
            className={styles[`${prefix}-close`]}
            aria-label={closeLabel}
            variant={closeVariant}
            onClick={handleClick}
            data-dismiss='toast'
          />
        )}
      </div>
    )
  },
)

ToastHeader.displayName = 'ToastHeader'
ToastHeader.propTypes = propTypes
ToastHeader.defaultProps = defaultProps

export default ToastHeader
