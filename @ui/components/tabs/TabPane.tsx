import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import SelectableContext from '@restart/ui/SelectableContext'
import TabContext from '@restart/ui/TabContext'
import { useTabPanel } from '@restart/ui/TabPanel'
import { EventKey, TransitionCallbacks } from '@restart/ui/types'

import Fade from '../Fade'

import { usePrefix } from '../ThemeProvider'
import getTabTransitionComponent from '@ui/utils/getTabTransitionComponent'

import { PrefixRefForwardingComponent, TransitionType } from '@ui/helpers'

import styles from './Tabs.module.scss'

export interface TabPaneProps extends TransitionCallbacks, React.HTMLAttributes<HTMLElement> {
  eventKey?: EventKey
  active?: boolean
  transition?: TransitionType
  mountOnEnter?: boolean
  unmountOnExit?: boolean
}

const propTypes = {
  prefix: PropTypes.string,
  as: PropTypes.elementType,
  eventKey: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  active: PropTypes.bool,
  transition: PropTypes.oneOfType([PropTypes.bool, PropTypes.elementType]),
  onEnter: PropTypes.func,
  onEntering: PropTypes.func,
  onEntered: PropTypes.func,
  onExit: PropTypes.func,
  onExiting: PropTypes.func,
  onExited: PropTypes.func,
  mountOnEnter: PropTypes.bool,
  unmountOnExit: PropTypes.bool,
  id: PropTypes.string,
  'aria-labelledby': PropTypes.string,
}

const TabPane: PrefixRefForwardingComponent<'div', TabPaneProps> = React.forwardRef<
  HTMLElement,
  TabPaneProps
>(({ prefix: prefixProp, transition, ...props }, ref) => {
  const [
    { className, as: Component = 'div', ...rest },
    {
      isActive,
      onEnter,
      onEntering,
      onEntered,
      onExit,
      onExiting,
      onExited,
      mountOnEnter,
      unmountOnExit,
      transition: Transition = Fade,
    },
  ] = useTabPanel({
    ...props,
    transition: getTabTransitionComponent(transition),
  } as any)

  const prefix = usePrefix(prefixProp, 'tab-pane')

  return (
    <TabContext.Provider value={null}>
      <SelectableContext.Provider value={null}>
        <Transition
          in={isActive}
          onEnter={onEnter}
          onEntering={onEntering}
          onEntered={onEntered}
          onExit={onExit}
          onExiting={onExiting}
          onExited={onExited}
          mountOnEnter={mountOnEnter}
          unmountOnExit={unmountOnExit as any}
        >
          <Component
            {...rest}
            ref={ref}
            className={classNames(
              className,
              styles[prefix],
              isActive && styles[`${prefix}--active`],
            )}
          />
        </Transition>
      </SelectableContext.Provider>
    </TabContext.Provider>
  )
})

TabPane.displayName = 'TabPane'
TabPane.propTypes = propTypes

export default TabPane
