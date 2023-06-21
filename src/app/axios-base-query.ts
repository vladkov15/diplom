import { BaseQueryFn } from '@reduxjs/toolkit/dist/query'
import axios, { AxiosError, AxiosRequestConfig } from 'axios'
import { getSession } from 'next-auth/react'

import { ExtraArgument } from './store'

import * as utils from '../app/utils'

export type AxiosBaseQuery = {
  baseUrl: string
}

export type AxiosBaseQueryArgs = {
  url: string
  method: AxiosRequestConfig['method']
  data?: AxiosRequestConfig['data']
  params?: AxiosRequestConfig['params']
  headers?: AxiosRequestConfig['headers']
}

export const axiosBaseQuery =
  (
    { baseUrl }: AxiosBaseQuery = { baseUrl: '/' },
  ): BaseQueryFn<AxiosBaseQueryArgs, unknown, unknown> =>
  async (args, api) => {
    const headers = args.headers || {}
    const url = baseUrl + args.url

    if (api.extra && typeof api.extra === 'object') {
      const { ctx } = api.extra as ExtraArgument

      if (!utils.isWindowAvailable() && ctx) {
        const session = await getSession(ctx)

        // if (NODE_ENV === 'production') url = url.replace('https', 'http')

        const token = session?.user.accessToken
        if (token) headers.Authorization = `Bearer ${token}`

        console.log(`[AxiosBaseQuery: ${api.endpoint}] Server side token`, token)
      } else {
        const session = await getSession()
        const token = session?.user.accessToken
        console.log(`[AxiosBaseQuery: ${api.endpoint}] Client side token`, token)

        if (token) headers.Authorization = `Bearer ${token}`
      }
    }

    try {
      const result = await axios({ ...args, url, headers })

      return { data: result.data }
    } catch (axiosError) {
      const err = axiosError as AxiosError
      return {
        error: {
          code: err.response?.status,
          message: err.response?.data || err.message,
        },
      }
    }
  }
