import { createSelector } from '@reduxjs/toolkit'
import { AppState } from '@/app/store'

import { genreApi } from './genre.api'
import { getPartnerGenres } from './genre.service'

import { IContentGenre } from '../../models/content'

const selectFilmGenresResult = genreApi.endpoints.getFilmGenres.select()
const selectSerialGenresResult = genreApi.endpoints.getSerialGenres.select()

export const selectFilmGenres = createSelector(
  selectFilmGenresResult,
  (genres) => genres.data || [],
)
export const selectSerialGenres = createSelector(
  selectSerialGenresResult,
  (genres) => genres.data || [],
)

export const selectFilmGenreById = createSelector(
  selectFilmGenresResult,
  (_: AppState, genreId: number) => genreId,
  (genres, genreId: number) => genres.data?.find((genre: IContentGenre) => genre.id == genreId),
)

export const selectSerialGenreById = createSelector(
  selectSerialGenresResult,
  (_: AppState, genreId: number) => genreId,
  (genres, genreId: number) => genres.data?.find((genre: IContentGenre) => genre.id == genreId),
)

export const selectFilmPartnerGenres = createSelector(selectFilmGenresResult, (genres) =>
  getPartnerGenres(genres.data || []),
)

export const selectSerialPartnerGenres = createSelector(selectSerialGenresResult, (genres) =>
  getPartnerGenres(genres.data || []),
)
