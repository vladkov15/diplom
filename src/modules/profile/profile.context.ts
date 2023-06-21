import React from 'react'
import { IProfile } from './profile.model'

export interface ProfileContextValue {
  profile?: IProfile
  profileLoading: boolean
}

export const ProfileContext = React.createContext<ProfileContextValue>({
  profile: {} as IProfile,
  profileLoading: false,
})
ProfileContext.displayName = 'ProfileContext'
