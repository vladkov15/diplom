import React, { FC, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { usePrevious } from '@restart/hooks'

import { UserContext } from './user.context'

import { useLazyGetUserSettingsQuery } from '@/modules/user/user.api'

interface UserProviderProps {
  children: React.ReactNode
}

const UserProvider: FC<UserProviderProps> = ({ children }) => {
  const { data: session } = useSession()
  const sessionPrevious = usePrevious(session)

  const [getUserSettings, { data: userSettings, isLoading: userSettingsLoading }] =
    useLazyGetUserSettingsQuery()

  useEffect(() => {
    !sessionPrevious && session && getUserSettings()
  }, [session])

  return (
    <UserContext.Provider value={{ userSettings, userSettingsLoading }}>
      {children}
    </UserContext.Provider>
  )
}

export default UserProvider
