import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { useUncontrolled } from 'uncontrollable'
import BaseTabs, { TabsProps as BaseTabsProps } from '@restart/ui/Tabs'

import TabNav, { TabNavProps } from './TabNav'
import TabNavLink from './TabNavLink'
import TabNavItem from './TabNavItem'
import Tab from './Tab'
import TabContent from './TabContent'
import TabPane from './TabPane'

import { forEach, map } from '@ui/utils/ElementChildren'
import getTabTransitionComponent from '@ui/utils/getTabTransitionComponent'

import { TransitionType } from '@ui/helpers'

import styles from './Tabs.module.scss'

export interface TabsProps
  extends Omit<BaseTabsProps, 'transition'>,
    Omit<React.HTMLAttributes<HTMLElement>, 'onSelect'>,
    TabNavProps {
  transition?: TransitionType
}

const propTypes = {
  id: PropTypes.string,
  activeKey: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  defaultActiveKey: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  variant: PropTypes.string,
  transition: PropTypes.oneOfType([PropTypes.oneOf([false]), PropTypes.elementType]),
  onSelect: PropTypes.func,
  mountOnEnter: PropTypes.bool,
  unmountOnExit: PropTypes.bool,
  fill: PropTypes.bool,
  justify: PropTypes.bool,
}

const defaultProps = {
  variant: 'tabs',
  mountOnEnter: false,
  unmountOnExit: false,
}

function getDefaultActiveKey(children: React.ReactNode[]) {
  let defaultActiveKey: string | undefined
  forEach(children, (child) => {
    if (defaultActiveKey == null) {
      defaultActiveKey = child.props.eventKey
    }
  })

  return defaultActiveKey
}

function renderTab(child: React.ReactElement) {
  const { title, eventKey, disabled, tabClassName, tabAttrs, id } = child.props
  if (title == null) {
    return null
  }

  return (
    <TabNavItem as='li' role='presentation'>
      <TabNavLink
        as='button'
        type='button'
        eventKey={eventKey}
        disabled={disabled}
        id={id}
        className={tabClassName}
        {...tabAttrs}
      >
        {title}
      </TabNavLink>
    </TabNavItem>
  )
}

const Tabs = (props: TabsProps) => {
  const {
    id,
    className,
    onSelect,
    transition,
    mountOnEnter,
    unmountOnExit,
    children,
    activeKey = getDefaultActiveKey(children as React.ReactNode[]),
    ...controlledProps
  } = useUncontrolled(props, {
    activeKey: 'onSelect',
  })

  return (
    <BaseTabs
      id={id}
      activeKey={activeKey}
      onSelect={onSelect}
      transition={getTabTransitionComponent(transition)}
      mountOnEnter={mountOnEnter}
      unmountOnExit={unmountOnExit}
    >
      <div className={classNames(className, styles['tabs'])}>
        <TabNav {...controlledProps} role='tablist' as='ul'>
          {map(children as React.ReactNode[], renderTab)}
        </TabNav>

        <TabContent>
          {map(children as React.ReactNode[], (child) => {
            const childProps = { ...child.props }

            delete childProps.title
            delete childProps.disabled
            delete childProps.tabClassName
            delete childProps.tabAttrs

            return <TabPane {...childProps} />
          })}
        </TabContent>
      </div>
    </BaseTabs>
  )
}

Tabs.propTypes = propTypes
Tabs.defaultProps = defaultProps
Tabs.displayName = 'Tabs'

export default Object.assign(Tabs, {
  Tab,
})
