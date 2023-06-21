import React from 'react'

export interface ParentControlContextValue {
  available: boolean
  setAvailable: (value: boolean) => void
}

export const ParentControlContext = React.createContext<ParentControlContextValue>({
  available: true,
  setAvailable: () => undefined,
})
ParentControlContext.displayName = 'ParentControlContext'
