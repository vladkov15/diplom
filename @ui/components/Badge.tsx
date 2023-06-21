import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import { usePrefix } from './ThemeProvider'

import { PrefixProps, PrefixRefForwardingComponent } from '../helpers'
import { Color, Variant } from '../types'

export interface BadgeProps extends PrefixProps, React.HTMLAttributes<HTMLElement> {
  bg?: Variant
  pill?: boolean
  text?: Color
}

const propTypes = {
  prefix: PropTypes.string,
  bg: PropTypes.string,
  pill: PropTypes.bool,
  text: PropTypes.string,
  as: PropTypes.elementType,
}

const defaultProps = {
  bg: 'primary',
  pill: false,
}

const Badge: PrefixRefForwardingComponent<'span', BadgeProps> = React.forwardRef<
  HTMLElement,
  BadgeProps
>(({ prefix: prefixProp, bg, pill, text, className, as: Component = 'span', ...props }, ref) => {
  const prefix = usePrefix(prefixProp, 'badge')

  return (
    <Component
      ref={ref}
      {...props}
      className={classNames(
        className,
        prefix,
        pill && `rounded-pill`,
        text && `text-${text}`,
        bg && `bg-${bg}`,
      )}
    />
  )
})

Badge.displayName = 'Badge'
Badge.propTypes = propTypes
Badge.defaultProps = defaultProps

export default Badge
