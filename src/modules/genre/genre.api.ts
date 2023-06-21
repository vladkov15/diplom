import { createApi } from '@reduxjs/toolkit/query/react'

import { HYDRATE } from 'next-redux-wrapper'

import { axiosBaseQuery } from '../../app/axios-base-query'

import { IFilmGenre } from './genre.model'

import { API_URL } from '../../config'

export const genreApi = createApi({
  reducerPath: 'genreApi',
  baseQuery: axiosBaseQuery({ baseUrl: API_URL }),
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath]
    }
  },
  tagTypes: [],
  endpoints: (builder) => ({
    getFilmGenres: builder.query<IFilmGenre[], void>({
      query: () => ({ url: '/fgenres', method: 'GET' }),
    }),
    getSerialGenres: builder.query<IFilmGenre[], void>({
      query: () => ({ url: '/sgenres', method: 'GET' }),
    }),
  }),
})

// Export hooks for usage in functional components
export const {
  useGetFilmGenresQuery,
  useGetSerialGenresQuery,
  util: { getRunningOperationPromises },
} = genreApi

// export endpoints for use in SSR
export const { getFilmGenres, getSerialGenres } = genreApi.endpoints
