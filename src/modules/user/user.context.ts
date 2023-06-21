import { createContext } from 'react'
import { IUserSettings } from './user.model'

export interface UserContextValue {
  userSettings?: IUserSettings
  userSettingsLoading: boolean
}

export const UserContext = createContext<UserContextValue>({
  userSettings: {} as IUserSettings,
  userSettingsLoading: false,
})

UserContext.displayName = 'UserContext'
