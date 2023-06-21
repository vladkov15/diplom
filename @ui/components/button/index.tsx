import React, { useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { useButtonProps, ButtonProps as BaseButtonProps } from '@restart/ui/Button'

import CloseButton from './ButtonClose'
import Loader, { LoaderProps } from '../loader'

import { usePrefix } from '@ui/components/ThemeProvider'
import { PrefixProps, PrefixRefForwardingComponent } from '@ui/helpers'
import { ButtonVariant } from '@ui/types'

import styles from './Button.module.scss'

export interface ButtonProps extends BaseButtonProps, Omit<PrefixProps, 'as'> {
  active?: boolean
  variant?: ButtonVariant
  size?: 'sm'
  label?: string
  loader?: boolean
  loaderProps?: LoaderProps
  full?: boolean
  icon?: boolean
}

export type CommonButtonProps = 'href' | 'size' | 'variant' | 'disabled'

const propTypes = {
  prefix: PropTypes.string,
  variant: PropTypes.string,
  size: PropTypes.string,
  active: PropTypes.bool,
  disabled: PropTypes.bool,
  href: PropTypes.string,
  type: PropTypes.oneOf(['button', 'reset', 'submit', null]),
  label: PropTypes.string,
  loader: PropTypes.bool,
  loaderProps: PropTypes.object,
  full: PropTypes.bool,
  icon: PropTypes.bool,
  as: PropTypes.elementType,
}

const defaultProps = {
  variant: 'accent',
  loaderProps: {},
  active: false,
  disabled: false,
  full: false,
  icon: false,
}

const Button: PrefixRefForwardingComponent<'button', ButtonProps> = React.forwardRef<
  HTMLButtonElement,
  ButtonProps
>(
  (
    {
      as,
      prefix: prefixProp,
      label,
      variant,
      size,
      active,
      className,
      children,
      full,
      icon,
      disabled,
      loader,
      loaderProps,
      onClick,
      ...props
    },
    ref,
  ) => {
    const prefix = usePrefix(prefixProp, 'button')

    const [buttonProps, { tagName }] = useButtonProps({ tagName: as, ...props })

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (disabled) return
      onClick?.(e)
    }

    const Component = tagName as React.ElementType

    return (
      <Component
        {...buttonProps}
        {...props}
        ref={ref}
        className={classNames(
          className,
          styles[prefix],
          active && styles[`${prefix}--active`],
          variant && styles[`${prefix}--${variant}`],
          size && styles[`${prefix}--${size}`],
          full && styles[`${prefix}--full`],
          icon && styles[`${prefix}--icon`],
          loader && styles[`${prefix}--loader`],
          disabled && styles[`${prefix}--disabled`],
        )}
        onClick={handleClick}
      >
        <span>{label || children}</span>
        {loader && <Loader className={styles[`${prefix}__loader`]} {...loaderProps} />}
      </Component>
    )
  },
)

Button.displayName = 'Button'
Button.propTypes = propTypes
Button.defaultProps = defaultProps

export default Object.assign(Button, { Close: CloseButton })
