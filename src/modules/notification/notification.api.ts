import { createApi } from '@reduxjs/toolkit/query/react'
import { HYDRATE } from 'next-redux-wrapper'

import { axiosBaseQuery } from '@/app/axios-base-query'

import { API_URL } from '@/config'

export interface IExpirePacketNotificationAction {
  code: 'RENEW_SUBSCRIPTION' | 'CANCEL' | 'FINISH'
  name: string
  value: null
}

interface IExpirePacketNotificationSupport {
  open_hours: { start_time: number; end_time: number }
  phones: Array<{ label: string; value: string }>
}

interface IGetExpirePacketNotificationResponse {
  id: number
  title: string
  content: {
    actions: IExpirePacketNotificationAction[]
    content: string
  }
  user_group: number
  before_expire_day: number
  expire_day: number
  support: IExpirePacketNotificationSupport[]
  created_at: string
}

interface IGetExpirePacketNotificationAttrs {
  params: {
    id: number
    step: number
  }
}

export const notificationApi = createApi({
  reducerPath: 'notificationApi',
  baseQuery: axiosBaseQuery({ baseUrl: API_URL }),
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath]
    }
  },
  tagTypes: [],
  endpoints: (builder) => ({
    getExpirePacketNotification: builder.query<
      IGetExpirePacketNotificationResponse | null,
      IGetExpirePacketNotificationAttrs
    >({
      query: ({ params }) => ({ url: '/notifications_sub', method: 'GET', params }),
    }),
    cancelExpirePacketNotificationById: builder.mutation<void, number>({
      query: (id) => ({ url: `/notifications_sub/${id}/cancel`, method: 'POST' }),
    }),
  }),
})

// Export hooks for usage in functional components
export const {
  useGetExpirePacketNotificationQuery,
  useCancelExpirePacketNotificationByIdMutation,
  util: { getRunningQueriesThunk },
} = notificationApi

// export endpoints for use in SSR
export const { getExpirePacketNotification, cancelExpirePacketNotificationById } =
  notificationApi.endpoints
