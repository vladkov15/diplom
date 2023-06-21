import { createApi } from '@reduxjs/toolkit/query/react'
import { HYDRATE } from 'next-redux-wrapper'

import { axiosBaseQuery } from '../../app/axios-base-query'

import { IChildrenCategory } from './children.model'
import { IChannel } from '../channel/channel.model'

import { API_URL } from '@/config'

interface IGetChildrenCannelsByCategoryParams {
  age_ptr: number
  limit?: number
  offset?: number
}

export const childrenApi = createApi({
  reducerPath: 'childrenApi',
  baseQuery: axiosBaseQuery({ baseUrl: API_URL }),
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath]
    }
  },
  tagTypes: [],
  endpoints: (builder) => ({
    getChildrenCategories: builder.query<IChildrenCategory[], void>({
      query: () => ({ url: '/ages_categories', method: 'GET' }),
    }),
    getChildrenChannelsByCategory: builder.query<IChannel[], IGetChildrenCannelsByCategoryParams>({
      query: (params) => ({ url: '/channels', method: 'GET', params }),
    }),
  }),
})

// Export hooks for usage in functional components
export const {
  useGetChildrenCategoriesQuery,
  useGetChildrenChannelsByCategoryQuery,
  util: { getRunningOperationPromises },
} = childrenApi

// export endpoints for use in SSR
export const { getChildrenCategories, getChildrenChannelsByCategory } = childrenApi.endpoints
