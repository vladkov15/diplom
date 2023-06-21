import { createApi } from '@reduxjs/toolkit/query/react'
import { HYDRATE } from 'next-redux-wrapper'

import { axiosBaseQuery } from '@/app/axios-base-query'

import { API_URL } from '@/config'
import { IApiResponse } from '@/app/api'

interface IActivePromoCodeParams {
  card_number: string
  card_pin: number | string
}

export const promoCodeApi = createApi({
  reducerPath: 'promoCodeApi',
  baseQuery: axiosBaseQuery({ baseUrl: API_URL }),
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath]
    }
  },
  tagTypes: [],
  endpoints: (builder) => ({
    activatePromoCode: builder.mutation<IApiResponse, IActivePromoCodeParams>({
      query: () => ({ url: '/promo_cards', method: 'POST' }),
    }),
  }),
})

export const {
  useActivatePromoCodeMutation,
  util: { getRunningQueriesThunk },
} = promoCodeApi

export const { activatePromoCode } = promoCodeApi.endpoints
