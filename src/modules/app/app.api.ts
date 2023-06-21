import { createApi } from '@reduxjs/toolkit/query/react'
import { HYDRATE } from 'next-redux-wrapper'

import { IApiResponse } from '@/app/api'
import { axiosBaseQuery } from '@/app/axios-base-query'

import { AppInfo, DeviceInfo } from './app.service'

import { API_URL } from '@/config'

interface ISendVersionsParams {
  data: AppInfo & DeviceInfo
}

export const appApi = createApi({
  reducerPath: 'appApi',
  baseQuery: axiosBaseQuery({ baseUrl: API_URL }),
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath]
    }
  },
  tagTypes: [],
  endpoints: (builder) => ({
    sendVersions: builder.mutation<IApiResponse, ISendVersionsParams>({
      query: ({ data }) => ({ url: '/versions', method: 'POST', data }),
    }),
  }),
})

export const {
  useSendVersionsMutation,
  util: { getRunningQueriesThunk },
} = appApi

export const { sendVersions } = appApi.endpoints
