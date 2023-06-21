import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { useUncontrolled } from 'uncontrollable'
import BaseNav, { NavProps as BaseNavProps } from '@restart/ui/Nav'
import { EventKey } from '@restart/ui/types'

import TabNavItem from './TabNavItem'
import TabNavLink from './TabNavLink'

import { PrefixRefForwardingComponent } from '@ui/helpers'

import styles from './Tabs.module.scss'
import { usePrefix } from '../ThemeProvider'

export interface TabNavProps extends BaseNavProps {
  navbarBsPrefix?: string
  cardHeaderBsPrefix?: string
  variant?: 'tabs' | 'pills' | string
  defaultActiveKey?: EventKey
  fill?: boolean
  justify?: boolean
}

const propTypes = {
  prefix: PropTypes.string,
  variant: PropTypes.string,
  activeKey: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  defaultActiveKey: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  fill: PropTypes.bool,
  justify: PropTypes.bool,
  onSelect: PropTypes.func,
  role: PropTypes.string,
  as: PropTypes.elementType,
  onKeyDown: PropTypes.func,
}

const defaultProps = {
  justify: false,
  fill: false,
}

const TabNav: PrefixRefForwardingComponent<'div', TabNavProps> = React.forwardRef<
  HTMLElement,
  TabNavProps
>((uncontrolledProps, ref) => {
  const {
    prefix: prefixProp,
    as = 'div',
    variant,
    fill,
    justify,
    className,
    activeKey,
    ...props
  } = useUncontrolled(uncontrolledProps, { activeKey: 'onSelect' })

  const prefix = usePrefix(prefixProp, 'tab-nav')

  return (
    <BaseNav
      as={as}
      ref={ref}
      activeKey={activeKey}
      className={classNames(className, {
        [styles[prefix]]: true,
        [styles[`${prefix}--${variant}`]]: !!variant,
        [styles[`${prefix}--fill`]]: fill,
        [styles[`${prefix}--justified`]]: justify,
      })}
      {...props}
    />
  )
})

TabNav.displayName = 'TabNav'
TabNav.propTypes = propTypes
TabNav.defaultProps = defaultProps

export default Object.assign(TabNav, {
  Item: TabNavItem,
  Link: TabNavLink,
})
