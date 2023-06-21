import * as React from 'react'
import { EventKey } from '@restart/ui/types'

interface TabNavContextType {
  role?: string
  activeKey: EventKey | null
  getControlledId: (key: EventKey | null) => string
  getControllerId: (key: EventKey | null) => string
}

const TabNavContext = React.createContext<TabNavContextType | null>(null)
TabNavContext.displayName = 'TabNavContext'

export default TabNavContext
