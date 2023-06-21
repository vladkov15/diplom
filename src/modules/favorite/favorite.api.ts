import { createApi } from '@reduxjs/toolkit/query/react'
import { HYDRATE } from 'next-redux-wrapper'

import { axiosBaseQuery } from '@/app/axios-base-query'

import { ContentType } from '../../models/content'

import { ISerial } from '../serial/serial.model'
import { IFilm } from '../film/film.model'
import { IChannel } from '../channel/channel.model'

import { API_URL } from '@/config'
import { FavoriteTags } from '@/modules/favorite/favorite.constants'

interface IToggleFavoritesParams {
  item_ptr: number
  content_type_ptr: number
}

export const favoriteApi = createApi({
  reducerPath: 'favoriteApi',
  baseQuery: axiosBaseQuery({ baseUrl: API_URL }),
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath]
    }
  },
  tagTypes: [FavoriteTags.FAVORITE],
  endpoints: (builder) => ({
    getFavoritesFilms: builder.query<IFilm[], void>({
      query: () => ({
        url: '/favorites_items',
        method: 'GET',
        params: { content_type_ptr: ContentType.FILM },
      }),
      providesTags: () => [{ type: FavoriteTags.FAVORITE, id: ContentType.FILM }],
    }),
    getFavoritesSerials: builder.query<ISerial[], void>({
      query: () => ({
        url: '/favorites_items',
        method: 'GET',
        params: { content_type_ptr: ContentType.SERIAL },
      }),
      providesTags: () => [{ type: FavoriteTags.FAVORITE, id: ContentType.SERIAL }],
    }),
    getFavoritesChannels: builder.query<IChannel[], void>({
      query: () => ({
        url: '/favorites_items',
        method: 'GET',
        params: { content_type_ptr: ContentType.CHANNEL },
      }),
      providesTags: () => [{ type: FavoriteTags.FAVORITE, id: ContentType.CHANNEL }],
    }),
    addToFavorites: builder.mutation<unknown, IToggleFavoritesParams>({
      query: (data) => ({ url: '/favorites_items', method: 'POST', data }),
      invalidatesTags: (result, error, { content_type_ptr }) => [
        { type: FavoriteTags.FAVORITE, id: content_type_ptr },
      ],
    }),
    deleteFromFavorites: builder.mutation<unknown, IToggleFavoritesParams>({
      query: ({ item_ptr, content_type_ptr }) => ({
        url: `/favorites_items/${item_ptr}`,
        method: 'DELETE',
        data: { content_type_ptr },
      }),
      invalidatesTags: (result, error, { content_type_ptr }) => [
        { type: FavoriteTags.FAVORITE, id: content_type_ptr },
      ],
    }),
  }),
})

// Export hooks for usage in functional components
export const {
  useGetFavoritesFilmsQuery,
  useGetFavoritesSerialsQuery,
  useGetFavoritesChannelsQuery,
  useAddToFavoritesMutation,
  useDeleteFromFavoritesMutation,
  util: { getRunningOperationPromises },
} = favoriteApi

// export endpoints for use in SSR
export const { getFavoritesSerials, getFavoritesFilms } = favoriteApi.endpoints
