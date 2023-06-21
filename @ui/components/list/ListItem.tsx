import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import useEventCallback from '@restart/hooks/useEventCallback'
import { useNavItem, NavItemProps as BaseNavItemProps } from '@restart/ui/NavItem'
import { makeEventKey } from '@restart/ui/SelectableContext'

import { usePrefix } from '../ThemeProvider'
import { PrefixProps, PrefixRefForwardingComponent } from '@ui/helpers'

import styles from './List.module.scss'

export interface ListItemProps extends Omit<BaseNavItemProps, 'onSelect'>, PrefixProps {
  action?: boolean
  onClick?: React.MouseEventHandler
}

const propTypes = {
  prefix: PropTypes.string,
  action: PropTypes.bool,
  active: PropTypes.bool,
  disabled: PropTypes.bool,
  eventKey: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onClick: PropTypes.func,
  href: PropTypes.string,
  as: PropTypes.elementType,
}

const ListItem: PrefixRefForwardingComponent<'a', ListItemProps> = React.forwardRef<
  HTMLElement,
  ListItemProps
>(({ prefix: prefixProp, active, disabled, eventKey, className, action, as, ...props }, ref) => {
  const prefix = usePrefix(prefixProp, 'list-item')

  const [navItemProps, meta] = useNavItem({
    key: makeEventKey(eventKey, props.href),
    active,
    ...props,
  })

  const handleClick = useEventCallback((event) => {
    if (disabled) {
      event.preventDefault()
      event.stopPropagation()
      return
    }

    navItemProps.onClick(event)
  })

  if (disabled && props.tabIndex === undefined) {
    props.tabIndex = -1
    props['aria-disabled'] = true
  }

  const Component = as || (action ? (props.href ? 'a' : 'button') : 'div')

  return (
    <Component
      ref={ref}
      {...props}
      {...navItemProps}
      onClick={handleClick}
      className={classNames(
        className,
        styles[prefix],
        meta.isActive && styles[`${prefix}--active`],
        disabled && styles[`${prefix}--disabled`],
        action && styles[`${prefix}--action`],
      )}
    />
  )
})

ListItem.propTypes = propTypes
ListItem.displayName = 'ListItem'

export default ListItem
