import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { APIStatus, IApiErrorResponse } from '../../app/api'
import { fetchFilms } from './film.actions'
import { IFilm } from './film.model'

import { hydrate } from '../../app/store'

interface IFilmState {
  films: {
    status: APIStatus
    items: IFilm[]
    pagination: {
      currentPage: number
      perPage: number
      totalPages: number | null
      totalItems: number | null
    }
    error: IApiErrorResponse | null
  }
}

const initialState: IFilmState = {
  films: {
    status: APIStatus.IDLE,
    items: [],
    pagination: {
      perPage: 24,
      currentPage: 1,
      totalPages: null,
      totalItems: null,
    },
    error: null,
  },
}

export const filmSlice = createSlice({
  name: 'film',
  initialState,
  reducers: {
    setFilmsPagination: (
      state,
      action: PayloadAction<{ currentPage: number; perPage: number }>,
    ) => {
      state.films.pagination.currentPage = action.payload.currentPage
      state.films.pagination.perPage = action.payload.perPage
    },
  },
  extraReducers: (builder) => {
    builder.addCase(hydrate, (state, action) => {
      state.films = action.payload.film.films
    })

    //  FETCH FILMS
    builder.addCase(fetchFilms.pending, (state) => {
      state.films.status = APIStatus.PENDING
    })
    builder.addCase(fetchFilms.fulfilled, (state, { payload }) => {
      state.films.items = [...state.films.items, ...payload.items]

      if (payload.totalItems) {
        state.films.pagination.totalItems = payload.totalItems || null
        const totalPages = Math.ceil(payload.totalItems / state.films.pagination.perPage)
        state.films.pagination.totalPages = totalPages
      }

      state.films.status = APIStatus.FULFILLED
    })
    builder.addCase(fetchFilms.rejected, (state, { payload }) => {
      state.films.status = APIStatus.REJECTED
      if (payload) state.films.error = payload
    })
  },
})

export const { setFilmsPagination } = filmSlice.actions
