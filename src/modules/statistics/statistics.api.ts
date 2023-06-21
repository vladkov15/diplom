import { createApi } from '@reduxjs/toolkit/query/react'
import { HYDRATE } from 'next-redux-wrapper'

import { API_URL } from '@/config'

import { axiosBaseQuery } from '@/app/axios-base-query'

import { IMyChannelStatus, IStatisticsChannel, IStatisticsCategory } from './statistics.model'

interface ChannelsAndGenresParams {
  interval: number
}

export const statisticsApi = createApi({
  reducerPath: 'statisticsApi',
  baseQuery: axiosBaseQuery({ baseUrl: API_URL }),
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath]
    }
  },
  endpoints: (builder) => ({
    getMyChannelStatus: builder.query<IMyChannelStatus, void>({
      query: () => ({ url: '/my_channel_status', method: 'GET' }),
    }),
    getStatisticsChannels: builder.query<IStatisticsChannel[], ChannelsAndGenresParams>({
      query: (params) => ({ url: '/statistic/channels', method: 'GET', params }),
    }),
    getStatisticsGenres: builder.query<IStatisticsCategory[], ChannelsAndGenresParams>({
      query: (params) => ({ url: '/statistic/genres', method: 'GET', params }),
    }),
  }),
})

// Export hooks for usage in functional components
export const {
  useGetMyChannelStatusQuery,
  useGetStatisticsChannelsQuery,
  useGetStatisticsGenresQuery,
  util: { getRunningOperationPromises },
} = statisticsApi

// export endpoints for use in SSR
export const { getStatisticsChannels, getMyChannelStatus, getStatisticsGenres } =
  statisticsApi.endpoints
