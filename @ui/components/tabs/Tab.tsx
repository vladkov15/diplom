import React from 'react'
import PropTypes from 'prop-types'

import TabContainer from './TabContainer'
import TabContent from './TabContent'
import TabPane, { TabPaneProps } from './TabPane'

export interface TabProps extends Omit<TabPaneProps, 'title'> {
  title: React.ReactNode
  disabled?: boolean
  tabClassName?: string
  tabAttrs?: Record<string, any>
}

const propTypes = {
  eventKey: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  title: PropTypes.node.isRequired,
  disabled: PropTypes.bool,
  tabClassName: PropTypes.string,
  tabAttrs: PropTypes.object,
}

const Tab: React.FC<TabProps> = () => {
  throw new Error(
    'The `Tab` component is not meant to be rendered! ' +
      "It's an abstract component that is only valid as a direct Child of the `Tabs` Component. " +
      'For custom tabs components use TabPane and TabsContainer directly',
  )
  // Needed otherwise docs error out.
  return <></>
}

Tab.propTypes = propTypes

export default Object.assign(Tab, {
  Container: TabContainer,
  Content: TabContent,
  Pane: TabPane,
})
