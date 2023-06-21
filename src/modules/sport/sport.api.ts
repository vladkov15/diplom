import { createApi } from '@reduxjs/toolkit/query/react'
import { HYDRATE } from 'next-redux-wrapper'

import { axiosBaseQuery } from '../../app/axios-base-query'

import { ISportCategory } from './sport.model'
import { IChannel } from '../channel/channel.model'

import { API_URL } from '@/config'

interface IGetSportCannelsByCategoryParams {
  sport_ptr: number
  limit?: number
  offset?: number
}

export const sportApi = createApi({
  reducerPath: 'sportApi',
  baseQuery: axiosBaseQuery({ baseUrl: API_URL }),
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath]
    }
  },
  tagTypes: [],
  endpoints: (builder) => ({
    getSportCategories: builder.query<ISportCategory[], void>({
      query: () => ({ url: '/sport_categories', method: 'GET' }),
    }),
    getSportChannelsByCategory: builder.query<IChannel[], IGetSportCannelsByCategoryParams>({
      query: (params) => ({ url: '/channels', method: 'GET', params }),
    }),
  }),
})

// Export hooks for usage in functional components
export const {
  useGetSportCategoriesQuery,
  useGetSportChannelsByCategoryQuery,
  util: { getRunningOperationPromises },
} = sportApi

// export endpoints for use in SSR
export const { getSportCategories, getSportChannelsByCategory } = sportApi.endpoints
