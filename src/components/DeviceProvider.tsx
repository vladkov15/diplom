import React, { FC, useMemo } from 'react'
import * as rdd from 'react-device-detect'

const { isDesktop, isMobile } = rdd

export interface DeviceContextValue {
  isDesktop?: boolean
  isMobile?: boolean
}

export const DeviceContext = React.createContext<DeviceContextValue>({
  isDesktop: undefined,
  isMobile: undefined,
})

export interface DeviceProviderProps extends Partial<DeviceContextValue> {
  children: React.ReactNode
}

function DeviceProvider({ children }: DeviceProviderProps) {
  const contextValue = useMemo(() => ({ isDesktop, isMobile }), [isDesktop, isMobile])

  return <DeviceContext.Provider value={contextValue}>{children}</DeviceContext.Provider>
}

export const useDevice = () => ({ isMobile, isDesktop })

export interface DeviceProps {
  children: (props: typeof rdd) => React.ReactNode
}

export const Device: FC<DeviceProps> = ({ children }) => {
  return <>{children(rdd)}</>
}

export { rdd }

export default DeviceProvider
