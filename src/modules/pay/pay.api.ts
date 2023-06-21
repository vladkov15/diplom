import { createApi } from '@reduxjs/toolkit/query/react'
import { HYDRATE } from 'next-redux-wrapper'

import { axiosBaseQuery } from '@/app/axios-base-query'

import { IPayCard, IPaymentHistory, ITransaction } from './pay.model'

import { API_URL } from '@/config'
import { PayTags } from '@/modules/pay/pay.constants'

interface IGetUserCardResponse {
  success: boolean
  data?: IPayCard
  msg?: string
}

interface IDeleteUserCardResponse {
  deleted_count: number
  msg: string
  success: boolean
}

interface IAddUserCardResponse {
  inserted_id: string
  msg: string
  success: boolean
}

export interface IPayPacketByCardResponse {
  success: boolean
  msg: string
  data: {
    code: number
    payment: string
    data: {
      transaction: ITransaction
    }
  }
}

interface IAddUserCardAttrs {
  data: FormData
}

export const payApi = createApi({
  reducerPath: 'payApi',
  baseQuery: axiosBaseQuery({ baseUrl: API_URL }),
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath]
    }
  },
  tagTypes: [PayTags.GET_USER_CARD],
  endpoints: (builder) => ({
    getUserCard: builder.query<IGetUserCardResponse, void>({
      query: () => ({ url: '/user_cards', method: 'GET' }),
      providesTags: [PayTags.GET_USER_CARD],
    }),
    deleteUserCard: builder.mutation<IDeleteUserCardResponse, void>({
      query: () => ({ url: '/user_cards', method: 'DELETE' }),
      invalidatesTags: [PayTags.GET_USER_CARD],
    }),
    addUserCard: builder.mutation<IAddUserCardResponse, IAddUserCardAttrs>({
      query: ({ data }) => ({ url: '/user_cards', method: 'POST', data }),
      invalidatesTags: [PayTags.GET_USER_CARD],
    }),
    getPaymentsHistory: builder.query<IPaymentHistory[], void>({
      query: () => ({ url: '/payments_history', method: 'GET' }),
    }),
  }),
})

// Export hooks for usage in functional components
export const {
  useGetUserCardQuery,
  useDeleteUserCardMutation,
  useAddUserCardMutation,
  useGetPaymentsHistoryQuery,
  util: { getRunningQueriesThunk },
} = payApi

// export endpoints for use in SSR
export const { getUserCard, deleteUserCard, getPaymentsHistory } = payApi.endpoints
