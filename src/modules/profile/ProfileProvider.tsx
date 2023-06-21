import React, { FC, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { usePrevious } from '@restart/hooks'

import { useLazyGetProfileQuery } from './profile.api'

import { ProfileContext } from './profile.context'

interface ProfileProviderProps {
  children: React.ReactNode
}

const ProfileProvider: FC<ProfileProviderProps> = ({ children }) => {
  const { data: session } = useSession()
  const sessionPrevious = usePrevious(session)

  const [getProfile, { data: profile, isLoading: profileLoading }] = useLazyGetProfileQuery()

  useEffect(() => {
    !sessionPrevious && session && getProfile()
  }, [session])

  return (
    <ProfileContext.Provider value={{ profile, profileLoading }}>
      {children}
    </ProfileContext.Provider>
  )
}

export default ProfileProvider
