import { createApi } from '@reduxjs/toolkit/query/react'
import { HYDRATE } from 'next-redux-wrapper'

import { axiosBaseQuery } from '@/app/axios-base-query'

import { API_URL } from '@/config'
import { IApiResponse } from '@/app/api'

interface IValidateParentControlAttrs {
  data: {
    password: string
  }
}

export const parentControlApi = createApi({
  reducerPath: 'parentControlApi',
  baseQuery: axiosBaseQuery({ baseUrl: API_URL }),
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath]
    }
  },
  tagTypes: [],
  endpoints: (builder) => ({
    validateParentControlPassword: builder.mutation<IApiResponse, IValidateParentControlAttrs>({
      query: ({ data }) => ({ url: '/validate_parent_control_password', method: 'POST', data }),
    }),
    resetParentControlPassword: builder.mutation<IApiResponse, void>({
      query: () => ({ url: '/parent_control_reset_password', method: 'POST' }),
    }),
  }),
}).enhanceEndpoints({
  addTagTypes: ['GetChannel'],
})

export const {
  useValidateParentControlPasswordMutation,
  useResetParentControlPasswordMutation,
  util: { getRunningQueriesThunk },
} = parentControlApi

export const { validateParentControlPassword, resetParentControlPassword } =
  parentControlApi.endpoints
