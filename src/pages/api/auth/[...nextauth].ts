import NextAuth, { NextAuthOptions, User } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

import { ApiHelper } from '@/app/api'
import { AppInfo, DeviceInfo } from '@/modules/app/app.service'

import { NEXT_AUTH_SECRET } from '@/config'

export const AUTH_OPTIONS: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      id: 'credentials',
      name: 'itv',
      credentials: {
        login: { label: 'Login', type: 'tel' },
        password: { label: 'Password', type: 'password' },
        info: { label: 'App & Device Info', type: 'text' },
      },
      async authorize(credentials) {
        try {
          const api = ApiHelper.getInstance()

          const login = credentials?.login || ''
          const password = credentials?.password || ''
          const info = JSON.parse(credentials?.info || '{}') as AppInfo & DeviceInfo

          const response = await api.services.auth.login(login, password, info)

          const { token: accessToken } = response.data
          return { accessToken } as User
        } catch (e) {
          console.error(e)
          return null
        }
      },
    }),
    CredentialsProvider({
      id: 'change_password',
      name: 'itv',
      credentials: {
        token: { label: 'Token', type: 'text' },
      },
      authorize(credentials) {
        const accessToken = credentials?.token
        return { accessToken } as User
      },
    }),
  ],
  pages: { signIn: '/login' },
  secret: NEXT_AUTH_SECRET,
  callbacks: {
    async jwt({ token, user }) {
      if (!user) return token

      return { ...token, accessToken: user.accessToken }
    },

    async session({ session, token }) {
      session.user.accessToken = token.accessToken as string

      return { ...session }
    },

    async redirect({ baseUrl }) {
      return baseUrl
    },
  },
}

export default NextAuth(AUTH_OPTIONS)
