import { createApi } from '@reduxjs/toolkit/query/react'
import { HYDRATE } from 'next-redux-wrapper'

import { axiosBaseQuery } from '@/app/axios-base-query'
import { IApiResponse } from '@/app/api'

import { IUserSettings } from '@/modules/user/user.model'
import { UserSettingsTags } from './user.constants'

import { API_URL } from '@/config'

interface IUpdateUserSettingsAttrs {
  data: Partial<IUserSettings>
}

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: axiosBaseQuery({ baseUrl: API_URL }),
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath]
    }
  },
  tagTypes: [UserSettingsTags.GET_USER_SETTINGS],
  endpoints: (builder) => ({
    getUserSettings: builder.query<IUserSettings, void>({
      query: () => ({ url: '/user_settings', method: 'GET' }),
      providesTags: () => [UserSettingsTags.GET_USER_SETTINGS],
    }),
    updateUserSettings: builder.mutation<IApiResponse, IUpdateUserSettingsAttrs>({
      query: ({ data }) => ({ url: '/user_settings', method: 'PUT', data }),
      invalidatesTags: () => [UserSettingsTags.GET_USER_SETTINGS],
    }),
  }),
})

export const {
  useGetUserSettingsQuery,
  useLazyGetUserSettingsQuery,
  useUpdateUserSettingsMutation,
  util: { getRunningQueriesThunk },
} = userApi
