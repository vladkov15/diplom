import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { APIStatus, IApiErrorResponse } from '../../app/api'
import { fetchSerials } from './serial.actions'
import { ISerial } from './serial.model'

import { hydrate } from '../../app/store'

interface ISerialState {
  serials: {
    status: APIStatus
    items: ISerial[]
    pagination: {
      currentPage: number
      perPage: number
      totalPages: number | null
      totalItems: number | null
    }
    error: IApiErrorResponse | null
  }
}

const initialState: ISerialState = {
  serials: {
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

export const serialSlice = createSlice({
  name: 'serial',
  initialState,
  reducers: {
    setSerialsPagination: (
      state,
      action: PayloadAction<{ currentPage: number; perPage: number }>,
    ) => {
      state.serials.pagination.currentPage = action.payload.currentPage
      state.serials.pagination.perPage = action.payload.perPage
    },
  },
  extraReducers: (builder) => {
    builder.addCase(hydrate, (state, action) => {
      state.serials = action.payload.serial.serials
    })

    //  FETCH SERIALS
    builder.addCase(fetchSerials.pending, (state) => {
      state.serials.status = APIStatus.PENDING
    })
    builder.addCase(fetchSerials.fulfilled, (state, { payload }) => {
      state.serials.items = [...state.serials.items, ...payload.items]

      if (payload.totalItems) {
        state.serials.pagination.totalItems = payload.totalItems || null
        const totalPages = Math.ceil(payload.totalItems / state.serials.pagination.perPage)
        state.serials.pagination.totalPages = totalPages
      }

      state.serials.status = APIStatus.FULFILLED
    })
    builder.addCase(fetchSerials.rejected, (state, { payload }) => {
      state.serials.status = APIStatus.REJECTED
      if (payload) state.serials.error = payload
    })
  },
})

export const { setSerialsPagination } = serialSlice.actions
