import React from 'react'

import { AlignType } from '@ui/types'

export type DropDirection = 'up' | 'up-centered' | 'start' | 'end' | 'down' | 'down-centered'

export type DropdownContextValue = {
  align?: AlignType
  drop?: DropDirection
}

const DropdownContext = React.createContext<DropdownContextValue>({})
DropdownContext.displayName = 'DropdownContext'

export default DropdownContext
