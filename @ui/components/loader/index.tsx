import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import { usePrefix } from '../ThemeProvider'

import { PrefixProps, PrefixRefForwardingComponent } from '@ui/helpers'
import { Variant } from '@ui/types'

import styles from './Loader.module.scss'

export interface LoaderProps extends React.HTMLAttributes<HTMLElement>, PrefixProps {
  animation?: 'border' | 'grow'
  size?: 'sm' | 'lg'
  variant?: Variant
}

const propTypes = {
  prefix: PropTypes.string,
  variant: PropTypes.string,
  animation: PropTypes.oneOf(['border', 'grow']),
  size: PropTypes.string,
  children: PropTypes.element,
  role: PropTypes.string,
  as: PropTypes.elementType,
}

const Loader: PrefixRefForwardingComponent<'div', LoaderProps> = React.forwardRef<
  HTMLElement,
  LoaderProps
>(
  (
    {
      prefix: prefixProp,
      variant,
      animation = 'border',
      size,
      as: Component = 'div',
      className,
      ...props
    },
    ref,
  ) => {
    const prefix = usePrefix(prefixProp, 'loader')

    return (
      <Component
        ref={ref}
        {...props}
        className={classNames(
          className,
          styles[prefix],
          styles[`${prefix}--${animation}`],
          size && styles[`${prefix}--${animation}--${size}`],
          styles[`${prefix}--${variant}`],
        )}
      />
    )
  },
)

Loader.propTypes = propTypes as any
Loader.displayName = 'Loader'

export default Loader
