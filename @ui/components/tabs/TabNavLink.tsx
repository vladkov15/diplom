import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import Anchor from '@restart/ui/Anchor'
import { useNavItem, NavItemProps as BaseNavItemProps } from '@restart/ui/NavItem'
import { makeEventKey } from '@restart/ui/SelectableContext'

import { usePrefix } from '../ThemeProvider'

import { PrefixRefForwardingComponent } from '@ui/helpers'

import styles from './Tabs.module.scss'

export interface TabNavLinkProps extends BaseNavItemProps {}

const propTypes = {
  prefix: PropTypes.string,
  active: PropTypes.bool,
  disabled: PropTypes.bool,
  role: PropTypes.string,
  href: PropTypes.string,
  eventKey: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  as: PropTypes.elementType,
}

const defaultProps = {
  disabled: false,
}

const TabNavLink: PrefixRefForwardingComponent<'a', TabNavLinkProps> = React.forwardRef<
  HTMLElement,
  TabNavLinkProps
>(({ prefix: prefixProp, className, as: Component = Anchor, active, eventKey, ...props }, ref) => {
  const prefix = usePrefix(prefixProp, 'tab-nav-link')

  const [navItemProps, meta] = useNavItem({
    key: makeEventKey(eventKey, props.href),
    active,
    ...props,
  })

  return (
    <Component
      {...props}
      {...navItemProps}
      ref={ref}
      className={classNames(
        className,
        styles[prefix],
        props.disabled && styles[`${prefix}--disabled`],
        meta.isActive && styles[`${prefix}--active`],
      )}
    />
  )
})

TabNavLink.displayName = 'TabNavLink'
TabNavLink.propTypes = propTypes
TabNavLink.defaultProps = defaultProps

export default TabNavLink
