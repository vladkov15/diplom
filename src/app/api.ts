import { GetServerSidePropsContext, NextPageContext } from 'next'
import axios, { AxiosInstance, AxiosRequestConfig, AxiosError, AxiosResponse } from 'axios'
import { getSession } from 'next-auth/react'
import { parseCookies } from 'nookies'

import AuthService from '@/modules/auth/auth.service'
import ProfileService from '@/modules/profile/profile.service'
import FilmService from '@/modules/film/film.service'
import SerialService from '@/modules/serial/serial.service'
import SearchService from '@/modules/search/search.service'
import PlayerEventService from '@/modules/player/player-event.service'
import PlayerPremierTrexCounterService from '@/modules/player/player-premier-trex-counter.service'

import * as utils from '@/app/utils'

import { API_URL } from '@/config'

type Context = NextPageContext | GetServerSidePropsContext

const INTERNAL_SERVER_ERROR = {
  code: -1,
  msg: 'Internal Server Error',
}

export enum APIStatus {
  IDLE = 'IDLE',
  PENDING = 'PENDING',
  FULFILLED = 'FULFILLED',
  REJECTED = 'REJECTED',
}

export type TApiQueryAttr<Q> = {
  [K in keyof Q]: Q[K]
}

export interface IApiPaginationQueryAttr {
  currentPage: number
  perPage: number
}

export interface IApiFetchQueryAttr<Q> {
  query?: TApiQueryAttr<Q>
}

export interface IApiFetchAllQueryAttr<Q> extends IApiFetchQueryAttr<Q> {
  pagination?: IApiPaginationQueryAttr
}

export interface IApiFetchAllPayload<P> {
  items: P[]
  totalItems: number | null
}

export interface IApiResponse {
  code: number
  msg: string
}

export interface IApiErrorResponse {
  code: number
  msg: string
}

export class ApiHelper {
  static #instance: ApiHelper | null = null
  #ctx: Context | null = null
  #api: AxiosInstance | null = null

  private constructor() {
    this.#api = axios.create({ baseURL: API_URL })

    this.#api.interceptors.request.use(
      async (config) => {
        const headers = config.headers || {}
        const ctx = this.getContext()

        if (!utils.isWindowAvailable() && ctx) {
          const session = await getSession(ctx)
          const token = session?.user.accessToken

          console.log('[ApiHelper] Server side token', token)
          if (token) headers.Authorization = `Bearer ${token}`
        } else if (utils.isWindowAvailable()) {
          const session = await getSession()
          const token = session?.user.accessToken
          console.log('[ApiHelper] Client side token', token)

          if (token) headers.Authorization = `Bearer ${token}`
        }

        config.headers = headers

        return config
      },
      (error) => Promise.reject(error),
    )
  }

  static getInstance() {
    if (!ApiHelper.#instance) ApiHelper.#instance = new ApiHelper()

    return ApiHelper.#instance
  }

  setContext(ctx: Context) {
    this.#ctx = ctx
  }

  getContext() {
    return this.#ctx
  }

  async getTokenFromSession() {
    if (!utils.isWindowAvailable() && this.#ctx) {
      const session = await getSession(this.#ctx)
      const token = session?.user.accessToken

      return token || null
    } else if (utils.isWindowAvailable()) {
      const session = await getSession()
      const token = session?.user.accessToken

      return token || null
    }

    return null
  }

  getTokenFromCookie() {
    const cookies = parseCookies()
    return cookies['itvToken'] || null
  }

  request<T>(args: AxiosRequestConfig) {
    if (!this.#api) throw new Error('API is not defined')

    return this.#api.request<T>(args)
  }

  post<T>(url: string, args: Omit<AxiosRequestConfig, 'method'> = {}) {
    return this.request<T>({ url, method: 'POST', ...args })
  }

  get<T>(url: string, args: Omit<AxiosRequestConfig, 'method'> = {}) {
    return this.request<T>({ url, method: 'GET', ...args })
  }

  get services() {
    return {
      auth: AuthService(this),
      profile: ProfileService(this),
      film: FilmService(this),
      serial: SerialService(this),
      search: SearchService(this),
      playerEvent: PlayerEventService(this),
      playerPremierTrexCounter: PlayerPremierTrexCounterService(this),
    }
  }

  resolveError(e: unknown): IApiErrorResponse {
    if (axios.isAxiosError(e)) {
      const error = e as AxiosError<IApiErrorResponse>
      const response = error.response as AxiosResponse<IApiErrorResponse>
      return response.data || INTERNAL_SERVER_ERROR
    }

    return INTERNAL_SERVER_ERROR
  }
}
