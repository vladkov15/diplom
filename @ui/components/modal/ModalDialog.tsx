import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import { usePrefix } from '../ThemeProvider'

import { PrefixProps } from '@ui/helpers'

import styles from './Modal.module.scss'

export interface ModalDialogProps extends React.HTMLAttributes<HTMLDivElement>, PrefixProps {
  size?: 'sm' | 'lg' | 'xl'
  fullscreen?: true | string | 'sm-down' | 'md-down' | 'lg-down' | 'xl-down' | 'xxl-down'
  centered?: boolean
  scrollable?: boolean
  contentClassName?: string
}

const propTypes = {
  prefix: PropTypes.string,
  contentClassName: PropTypes.string,
  size: PropTypes.string,
  fullscreen: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  centered: PropTypes.bool,
  scrollable: PropTypes.bool,
}

const ModalDialog = React.forwardRef<HTMLDivElement, ModalDialogProps>(
  (
    {
      prefix: prefixProp,
      className,
      contentClassName,
      centered,
      size,
      fullscreen,
      children,
      scrollable,
      ...props
    }: ModalDialogProps,
    ref,
  ) => {
    const prefix = usePrefix(prefixProp, 'modal')
    const dialogClass = `${prefix}-dialog`

    const fullScreenClass =
      typeof fullscreen === 'string'
        ? `${prefix}-fullscreen--${fullscreen}`
        : `${prefix}-fullscreen`

    return (
      <div
        {...props}
        ref={ref}
        className={classNames(
          styles[dialogClass],
          className,
          size && styles[`${prefix}--${size}`],
          centered && styles[`${dialogClass}--centered`],
          scrollable && styles[`${dialogClass}--scrollable`],
          fullscreen && styles[fullScreenClass],
        )}
      >
        <div className={classNames(styles[`${prefix}-content`], contentClassName)}>{children}</div>
      </div>
    )
  },
)

ModalDialog.displayName = 'ModalDialog'
ModalDialog.propTypes = propTypes as any

export default ModalDialog
