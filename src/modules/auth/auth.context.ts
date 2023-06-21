import { createContext } from 'react'

export interface AuthContextValue {
  isAuth: boolean
  signIn: (login: string, password: string) => Promise<void>
  signOut: () => Promise<void>
}

export const AuthContext = createContext<AuthContextValue>({
  isAuth: false,
  signIn: () => Promise.resolve(),
  signOut: () => Promise.resolve(),
})

AuthContext.displayName = 'AuthContext'
