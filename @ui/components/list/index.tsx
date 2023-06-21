import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { useUncontrolled } from 'uncontrollable'
import BaseNav, { NavProps as BaseNavProps } from '@restart/ui/Nav'
import { EventKey } from '@restart/ui/types'

import { usePrefix } from '../ThemeProvider'
import { PrefixProps, PrefixRefForwardingComponent } from '@ui/helpers'

import ListItem from './ListItem'

import styles from './List.module.scss'

export interface ListProps extends PrefixProps, BaseNavProps {
  variant?: 'flush' | string
  horizontal?: boolean | string | 'sm' | 'md' | 'lg' | 'xl' | 'xxl'
  defaultActiveKey?: EventKey
  numbered?: boolean
}

const propTypes = {
  prefix: PropTypes.string,
  variant: PropTypes.oneOf(['flush']),
  horizontal: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  numbered: PropTypes.bool,
  as: PropTypes.elementType,
}

const List: PrefixRefForwardingComponent<'div', ListProps> = React.forwardRef<
  HTMLElement,
  ListProps
>((props, ref) => {
  const {
    className,
    prefix: prefixProp,
    variant,
    horizontal,
    numbered,
    as = 'div',
    ...controlledProps
  } = useUncontrolled(props, { activeKey: 'onSelect' })

  const prefix = usePrefix(prefixProp, 'list')

  let horizontalVariant: string | undefined
  if (horizontal) {
    horizontalVariant = horizontal === true ? 'horizontal' : `horizontal--${horizontal}`
  }

  return (
    <BaseNav
      ref={ref}
      {...controlledProps}
      as={as}
      className={classNames(
        className,
        styles[prefix],
        variant && styles[`${prefix}--${variant}`],
        horizontalVariant && styles[`${prefix}--${horizontalVariant}`],
        numbered && styles[`${prefix}--numbered`],
      )}
    />
  )
})

List.propTypes = propTypes
List.displayName = 'List'

export default Object.assign(List, {
  Item: ListItem,
})
