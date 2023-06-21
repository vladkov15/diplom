import { createAsyncThunk } from '@reduxjs/toolkit'

import {
  ApiHelper,
  IApiErrorResponse,
  IApiFetchAllQueryAttr,
  IApiFetchAllPayload,
} from '../../app/api'
import { IFilm } from './film.model'

export interface IFilmQueryAttr {
  genre_ptr?: number
  limit?: number
  offset?: number
}

const api = ApiHelper.getInstance()

export const fetchFilms = createAsyncThunk<
  IApiFetchAllPayload<IFilm>,
  IApiFetchAllQueryAttr<IFilmQueryAttr>,
  { rejectValue: IApiErrorResponse }
>('film/fetchAll', async (attr, thunkAPI) => {
  try {
    const { data: items, headers } = await api.services.film.fetchAll(attr)

    const totalItems = Number(headers['x-total-count']) || null

    return { items, totalItems }
  } catch (e) {
    return thunkAPI.rejectWithValue(api.resolveError(e))
  }
})
