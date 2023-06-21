import React, { FC, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { usePrevious } from '@restart/hooks'

import { useSendVersionsMutation } from './app.api'

import { AppContext } from './app.context'
import { getAppInfo, getDeviceInfo } from './app.service'

interface AppProviderProps {
  children: React.ReactNode
}

const AppProvider: FC<AppProviderProps> = ({ children }) => {
  const { data: session } = useSession()
  const sessionPrevious = usePrevious(session)

  const [sendVersions] = useSendVersionsMutation()

  useEffect(() => {
    ;(async () => {
      if (!sessionPrevious && session) {
        const appInfo = await getAppInfo()
        const deviceInfo = await getDeviceInfo()

        const data = { ...appInfo, ...deviceInfo }
        sendVersions({ data })
      }
    })()
  }, [session])

  return <AppContext.Provider value={{}}>{children}</AppContext.Provider>
}

export default AppProvider
