import React, { FC, useEffect, useState } from 'react'
import { useSession, signIn as nextSignIn, signOut as nextSignOut } from 'next-auth/react'
import { usePrevious } from '@restart/hooks'
import { destroyCookie, setCookie } from 'nookies'

import { AuthContext } from './auth.context'

import { getAppInfo, getDeviceInfo } from '../app/app.service'

interface AuthProviderProps {
  children: React.ReactNode
}

const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
  const { data: session } = useSession()
  const sessionPrevious = usePrevious(session)

  const [isAuth, setIsAuth] = useState(false)

  useEffect(() => {
    if (!sessionPrevious && session) {
      const { user, expires } = session
      setIsAuth(true)
      setCookie(null, 'itvToken', user.accessToken, { expires: new Date(expires) })
    }
  }, [session])

  const signIn = async (login: string, password: string) => {
    try {
      const appInfo = await getAppInfo()
      const deviceInfo = await getDeviceInfo()
      const info = JSON.stringify({ ...appInfo, ...deviceInfo })

      await nextSignIn('credentials', { login, password, info })
    } catch (e) {
      console.log(e)
    }
  }

  const signOut = async () => {
    await nextSignOut()
    destroyCookie(null, 'itvToken')
  }

  return <AuthContext.Provider value={{ isAuth, signIn, signOut }}>{children}</AuthContext.Provider>
}

export default AuthProvider
