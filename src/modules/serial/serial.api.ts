import { createApi } from '@reduxjs/toolkit/query/react'
import { HYDRATE } from 'next-redux-wrapper'

import { axiosBaseQuery } from '@/app/axios-base-query'

import { ContentType } from '@/models/content'
import { IEpisode, ISeasonEpisode, ISerial } from './serial.model'

import { API_URL } from '@/config'
import { IApiResponse } from '@/app/api'

interface IGetSerialsByGenreParams {
  genre_ptr: number
  limit?: number
  offset?: number
}

interface IGetEpisodeByIdParams {
  episodeId: number
  player?: number
}

interface ISendSerialUserRatingAttrs {
  data: {
    item_ptr: number
    rating: number
  }
}

export const serialApi = createApi({
  reducerPath: 'serialApi',
  baseQuery: axiosBaseQuery({ baseUrl: API_URL }),
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath]
    }
  },
  tagTypes: [],
  endpoints: (builder) => ({
    getPromoSerials: builder.query<ISerial[], void>({
      query: () => ({ url: '/promo/serials', method: 'GET' }),
    }),
    getSerialsByGenre: builder.query<ISerial[], IGetSerialsByGenreParams>({
      query: (params) => ({ url: '/serials', method: 'GET', params }),
    }),
    getUnfinishedSerials: builder.query<ISerial[], void>({
      query: () => ({
        url: '/watching_events',
        method: 'GET',
        params: { content_type_ptr: ContentType.SERIAL },
      }),
    }),
    getSerial: builder.query<ISerial, number>({
      query: (id) => ({ url: `/serials/${id}`, method: 'GET' }),
    }),
    getEpisodesBySeasonId: builder.query<ISeasonEpisode[], number>({
      query: (seasonId) => ({ url: `/series?season_ptr=${seasonId}`, method: 'GET' }),
    }),
    getEpisodeById: builder.query<IEpisode, IGetEpisodeByIdParams>({
      query: ({ episodeId, player }) => ({
        url: `/series/${episodeId}`,
        method: 'GET',
        params: { player },
      }),
    }),
    sendSerialUserRating: builder.mutation<IApiResponse, ISendSerialUserRatingAttrs>({
      query: ({ data }) => ({
        url: '/user_rating',
        method: 'POST',
        data: { ...data, content_type_ptr: ContentType.SERIAL },
      }),
    }),
  }),
})

// Export hooks for usage in functional components
export const {
  useGetPromoSerialsQuery,
  useGetSerialsByGenreQuery,
  useGetUnfinishedSerialsQuery,
  useGetSerialQuery,
  useGetEpisodesBySeasonIdQuery,
  useGetEpisodeByIdQuery,
  useSendSerialUserRatingMutation,
  util: { getRunningQueriesThunk },
} = serialApi

// export endpoints for use in SSR
export const {
  getPromoSerials,
  getSerialsByGenre,
  getUnfinishedSerials,
  getSerial,
  getEpisodeById,
  getEpisodesBySeasonId,
} = serialApi.endpoints
