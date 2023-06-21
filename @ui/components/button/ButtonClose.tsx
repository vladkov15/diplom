import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import { usePrefix } from '@ui/components/ThemeProvider'
import { PrefixOnlyProps } from '@ui/helpers'

import styles from './ButtonClose.module.scss'

export type ButtonCloseVariant = 'white' | string

export interface ButtonCloseProps
  extends PrefixOnlyProps,
    React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonCloseVariant
}

const propTypes = {
  'aria-label': PropTypes.string,
  onClick: PropTypes.func,
  variant: PropTypes.oneOf<ButtonCloseVariant>(['white']),
}

const defaultProps = {
  'aria-label': 'Close',
}

const ButtonClose = React.forwardRef<HTMLButtonElement, ButtonCloseProps>(
  ({ prefix: prefixProp, className, variant, ...props }, ref) => {
    const prefix = usePrefix(prefixProp, 'button-close')

    return (
      <button
        ref={ref}
        type='button'
        className={classNames(
          className,
          styles[prefix],
          variant && styles[`${prefix}--${variant}`],
        )}
        {...props}
      />
    )
  },
)

ButtonClose.displayName = 'ButtonClose'
ButtonClose.propTypes = propTypes
ButtonClose.defaultProps = defaultProps

export default ButtonClose
