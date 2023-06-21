import { FC, useState } from 'react'

import { ParentControlContext } from './parentControl.context'

interface ParentControlProviderProps {
  available: boolean
  children: React.ReactNode
}

const ParentControlProvider: FC<ParentControlProviderProps> = ({ children, ...props }) => {
  const [available, setAvailable] = useState(props.available)

  return (
    <ParentControlContext.Provider value={{ available, setAvailable }}>
      {children}
    </ParentControlContext.Provider>
  )
}

export default ParentControlProvider
