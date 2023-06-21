import { createApi } from '@reduxjs/toolkit/query/react'
import { HYDRATE } from 'next-redux-wrapper'

import { axiosBaseQuery } from '@/app/axios-base-query'

import { IPacket } from './packet.model'

import { IApiResponse } from '@/app/api'
import { PacketTags } from '@/modules/packets/packet.constants'
import { IPayPacketByCardResponse } from '@/modules/pay/pay.api'

import { API_URL } from '@/config'

interface IGetPacketsParams {
  my: number
}

interface IPayPacketByCardAttrs {
  data: FormData
}

interface ISetAutoPaidAttrs {
  data: {
    packet_id: number
    status: boolean
  }
}

interface IGetEripCodeResponse {
  erip: number
}

interface ISetAutoPaidResponse {
  msg: string
  status: boolean
}

interface IGetEripCodeAttrs {
  params: {
    packet_ptr: number
  }
}

interface ISendEripCodeToPhoneAttrs {
  data: {
    erip: number
  }
}

export const packetApi = createApi({
  reducerPath: 'packetApi',
  baseQuery: axiosBaseQuery({ baseUrl: API_URL }),
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath]
    }
  },
  tagTypes: [PacketTags.GET_PACKETS],
  endpoints: (builder) => ({
    getPackets: builder.query<IPacket[], IGetPacketsParams>({
      query: (params) => ({ url: '/packets', method: 'GET', params }),
      providesTags: [PacketTags.GET_PACKETS],
    }),
    setAutoPaidForPackets: builder.mutation<ISetAutoPaidResponse, ISetAutoPaidAttrs>({
      query: ({ data }) => ({ url: '/renewal', method: 'POST', data }),
      invalidatesTags: [PacketTags.GET_PACKETS],
    }),
    payPacketByCard: builder.mutation<IPayPacketByCardResponse, IPayPacketByCardAttrs>({
      query: ({ data }) => ({ url: '/user_cards', method: 'POST', data }),
      invalidatesTags: [PacketTags.GET_PACKETS],
    }),
    getEripCode: builder.query<IGetEripCodeResponse, IGetEripCodeAttrs>({
      query: ({ params }) => ({ url: '/erip', method: 'GET', params }),
    }),
    sendEripCodeToPhone: builder.mutation<IApiResponse, ISendEripCodeToPhoneAttrs>({
      query: ({ data }) => ({ url: '/erip', method: 'POST', data }),
    }),
  }),
})

// Export hooks for usage in functional components
export const {
  useGetPacketsQuery,
  usePayPacketByCardMutation,
  useSetAutoPaidForPacketsMutation,
  useGetEripCodeQuery,
  useSendEripCodeToPhoneMutation,
  util: { getRunningQueriesThunk },
} = packetApi

// export endpoints for use in SSR
export const { getPackets } = packetApi.endpoints
