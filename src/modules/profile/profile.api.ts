import { createApi } from '@reduxjs/toolkit/query/react'
import { HYDRATE } from 'next-redux-wrapper'

import { IApiResponse } from '@/app/api'
import { axiosBaseQuery } from '@/app/axios-base-query'

import { API_URL } from '@/config'

import { IProfile } from './profile.model'
import { ProfileTags } from '@/modules/profile/profile.constants'

interface ISubscribeNewsletterParams {
  email: string
}

export const profileApi = createApi({
  reducerPath: 'profileApi',
  baseQuery: axiosBaseQuery({ baseUrl: API_URL }),
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath]
    }
  },
  tagTypes: [ProfileTags.PROFILE],
  endpoints: (builder) => ({
    getProfile: builder.query<IProfile, void>({
      query: () => ({ url: '/user_profile', method: 'GET' }),
      providesTags: [ProfileTags.PROFILE],
    }),
    subscribeNewsletter: builder.mutation<IApiResponse, ISubscribeNewsletterParams>({
      query: (data) => ({ url: '/TurnMailing', method: 'POST', data }),
      invalidatesTags: [ProfileTags.PROFILE],
    }),
    unsubscribeNewsletter: builder.mutation<IApiResponse, void>({
      query: () => ({ url: '/TurnMailing', method: 'POST', data: { status: 'off' } }),
      invalidatesTags: [ProfileTags.PROFILE],
    }),
  }),
})

export const {
  useGetProfileQuery,
  useLazyGetProfileQuery,
  useSubscribeNewsletterMutation,
  useUnsubscribeNewsletterMutation,
  util: { getRunningQueriesThunk },
} = profileApi

export const { getProfile, subscribeNewsletter, unsubscribeNewsletter } = profileApi.endpoints
