import { createApi } from '@reduxjs/toolkit/query/react'
import { HYDRATE } from 'next-redux-wrapper'

import { axiosBaseQuery } from '../../app/axios-base-query'

import { ContentType } from '../../models/content'
import { IFilm } from './film.model'

import { API_URL } from '../../config'
import { FilmTags } from '@/modules/film/film.constants'
import { IApiResponse } from '@/app/api'

interface IGetFilmsByGenreParams {
  genre_ptr: number
  limit?: number
  offset?: number
}

interface IGetFilmParams {
  content_ptr: number
  player?: number
}

interface ISendFilmUserRatingAttrs {
  data: {
    item_ptr: number
    rating: number
  }
}

export const filmApi = createApi({
  reducerPath: 'filmApi',
  baseQuery: axiosBaseQuery({ baseUrl: API_URL }),
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath]
    }
  },
  tagTypes: [FilmTags.FILMS, FilmTags.FILM],
  endpoints: (builder) => ({
    getPromoFilms: builder.query<IFilm[], void>({
      query: () => ({ url: '/promo/films', method: 'GET' }),
    }),
    getFilmsByGenre: builder.query<IFilm[], IGetFilmsByGenreParams>({
      query: (params) => ({ url: '/films', method: 'GET', params }),
    }),
    getUnfinishedFilms: builder.query<IFilm[], void>({
      query: () => ({
        url: '/watching_events',
        method: 'GET',
        params: { content_type_ptr: ContentType.FILM },
      }),
    }),
    getFilm: builder.query<IFilm, IGetFilmParams>({
      query: ({ content_ptr, player }) => ({
        url: `/films/${content_ptr}`,
        method: 'GET',
        params: { player },
      }),
    }),
    sendFilmUserRating: builder.mutation<IApiResponse, ISendFilmUserRatingAttrs>({
      query: ({ data }) => ({
        url: '/user_rating',
        method: 'POST',
        data: { ...data, content_type_ptr: ContentType.FILM },
      }),
    }),
  }),
})

// Export hooks for usage in functional components
export const {
  useGetPromoFilmsQuery,
  useGetFilmsByGenreQuery,
  useGetUnfinishedFilmsQuery,
  useGetFilmQuery,
  useSendFilmUserRatingMutation,
  util: { getRunningQueriesThunk },
} = filmApi

// export endpoints for use in SSR
export const { getPromoFilms, getFilmsByGenre, getUnfinishedFilms, getFilm } = filmApi.endpoints
