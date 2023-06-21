import { createApi } from '@reduxjs/toolkit/query/react'
import { HYDRATE } from 'next-redux-wrapper'

import { IApiResponse } from '@/app/api'
import { axiosBaseQuery } from '@/app/axios-base-query'
import { ContentType } from '@/models/content'

import { IChannelCategory, IChannel, IEpg, IEpgAvailableDates } from './channel.model'
import { ChannelTags } from './channel.constants'

import { API_URL } from '@/config'

interface IGetCannelsByCategoryParams {
  category_ptr: number
  limit?: number
  offset?: number
}

interface IGetEpgAvailableDatesParams {
  channel_ptr: number
  dates: number
}

interface IGetCurrentProgramParams {
  channel_ptr: number
}

interface IGetFullDayProgramParams {
  channel_ptr: number
  start_time: string
}

interface IOnChannelParentControlAttrs {
  data: {
    channel_ptr: number
  }
}

interface IOffChannelParentControlAttrs {
  channel_ptr: number
}
interface ISendChannelUserRatingAttrs {
  data: {
    item_ptr: number
    rating: number
  }
}

export const channelApi = createApi({
  reducerPath: 'channelApi',
  baseQuery: axiosBaseQuery({ baseUrl: API_URL }),
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath]
    }
  },
  tagTypes: [ChannelTags.GET_CHANNEL],
  endpoints: (builder) => ({
    getChannelCategories: builder.query<IChannelCategory[], void>({
      query: () => ({ url: '/channels_categories', method: 'GET' }),
    }),
    getChannelsByCategory: builder.query<IChannel[], IGetCannelsByCategoryParams>({
      query: (params) => ({ url: '/channels', method: 'GET', params }),
    }),
    getChannelById: builder.query<IChannel, number>({
      query: (id) => ({ url: `/channels/${id}`, method: 'GET' }),
      providesTags: [ChannelTags.GET_CHANNEL],
    }),
    getEpgAvailableDates: builder.query<IEpgAvailableDates, IGetEpgAvailableDatesParams>({
      query: (params) => ({ url: '/epg', method: 'GET', params }),
    }),
    getEpgCurrentProgram: builder.query<IEpg, IGetCurrentProgramParams>({
      query: (params) => ({
        url: '/epg',
        method: 'GET',
        params: { ...params, offset: 0, limit: 1, state: '3,4,5' },
      }),
      transformResponse: (result: IEpg[]) => result[0],
    }),
    getEpgDayProgram: builder.query<IEpg[], IGetFullDayProgramParams>({
      query: (params) => ({ url: '/epg', method: 'GET', params }),
    }),
    getEpgProgramById: builder.query<IEpg, number>({
      query: (id) => ({ url: `/epg/${id}`, method: 'GET' }),
    }),
    onChannelParentControl: builder.mutation<IApiResponse, IOnChannelParentControlAttrs>({
      query: ({ data }) => ({ url: '/parent_control_channels', method: 'POST', data }),
      invalidatesTags: [ChannelTags.GET_CHANNEL],
    }),
    offChannelParentControl: builder.mutation<IApiResponse, IOffChannelParentControlAttrs>({
      query: ({ channel_ptr }) => ({
        url: `/parent_control_channels/${channel_ptr}`,
        method: 'DELETE',
      }),
      invalidatesTags: [ChannelTags.GET_CHANNEL],
    }),
    sendChannelUserRating: builder.mutation<IApiResponse, ISendChannelUserRatingAttrs>({
      query: ({ data }) => ({
        url: '/user_rating',
        method: 'POST',
        data: { ...data, content_type_ptr: ContentType.CHANNEL },
      }),
    }),
  }),
})

export const {
  useGetChannelCategoriesQuery,
  useGetChannelsByCategoryQuery,
  useGetChannelByIdQuery,
  useGetEpgAvailableDatesQuery,
  useGetEpgCurrentProgramQuery,
  useGetEpgDayProgramQuery,
  useGetEpgProgramByIdQuery,
  useOnChannelParentControlMutation,
  useOffChannelParentControlMutation,
  useSendChannelUserRatingMutation,
  util: { getRunningQueriesThunk },
} = channelApi

export const {
  getChannelCategories,
  getChannelsByCategory,
  getChannelById,
  getEpgAvailableDates,
  getEpgCurrentProgram,
  getEpgDayProgram,
  getEpgProgramById,
} = channelApi.endpoints
