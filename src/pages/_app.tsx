import 'nprogress/nprogress.css'
import '@ui/styles/main.scss'

import '../styles/normalize.scss'
import '../styles/fonts.scss'
import '../styles/icons.scss'
import '../styles/globals.scss'

import { ReactElement, ReactNode, useEffect } from 'react'
import { NextPage } from 'next'
import NextApp, { AppContext } from 'next/app'
import Head from 'next/head'
import type { AppProps } from 'next/app'
import { useRouter } from 'next/router'

import { Session } from 'next-auth'
import { SessionProvider } from 'next-auth/react'

import NProgress from 'nprogress'

import { ThemeProvider } from '@ui'
import SSRProvider from '@ui/components/SSRProvider'

import { wrapper } from '@/app/store'

import AuthProvider from '@/modules/auth/AuthProvider'
import AppProvider from '@/modules/app/AppProvider'
import UserProvider from '@/modules/user/UserProvider'
import DeviceProvider from '@/components/DeviceProvider'
import ProfileProvider from '@/modules/profile/ProfileProvider'
import MainToastNotificationProvider from '@/modules/notification/MainToastNotificationProvider'
import MainAlertNotificationProvider from '@/modules/notification/MainAlertNotificationProvider'

import { NODE_ENV } from '@/config'

export type NextPageWithLayout<P = unknown, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout<P> = AppProps<P> & {
  Component: NextPageWithLayout<P>
}

const App = ({ Component, pageProps }: AppPropsWithLayout<{ session: Session }>) => {
  const getLayout = Component.getLayout ?? ((page) => page)

  const router = useRouter()

  useEffect(() => {
    const handleStart = () => NProgress.start()
    const handleStop = () => NProgress.done()

    router.events.on('routeChangeStart', handleStart)
    router.events.on('routeChangeComplete', handleStop)
    router.events.on('routeChangeError', handleStop)

    return () => {
      router.events.off('routeChangeStart', handleStart)
      router.events.off('routeChangeComplete', handleStop)
      router.events.off('routeChangeError', handleStop)
    }
  }, [router])

  return (
    <div className='app'>
      <Head>
        {/* <link rel='icon' href='/favicon.ico' /> */}
        <meta name='description' content='ITV' />
        <meta name='viewport' content='width=device-width, initial-scale=1.0' />

        {NODE_ENV === 'production' && (
          <meta http-equiv='Content-Security-Policy' content='upgrade-insecure-requests' />
        )}
      </Head>
      <SSRProvider>
        <ThemeProvider>
          <DeviceProvider>
            <SessionProvider session={pageProps.session}>
              <AuthProvider>
                <AppProvider>
                  <MainToastNotificationProvider>
                    <MainAlertNotificationProvider>
                      <ProfileProvider>
                        <UserProvider>{getLayout(<Component {...pageProps} />)}</UserProvider>
                      </ProfileProvider>
                    </MainAlertNotificationProvider>
                  </MainToastNotificationProvider>
                </AppProvider>
              </AuthProvider>
            </SessionProvider>
          </DeviceProvider>
        </ThemeProvider>
      </SSRProvider>
    </div>
  )
}

App.getInitialProps = wrapper.getInitialAppProps(() => async (appCtx: AppContext) => {
  const appProps = await NextApp.getInitialProps(appCtx)

  return { ...appProps }
})

export default wrapper.withRedux(App)
