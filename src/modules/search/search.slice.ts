import { createSlice, PayloadAction, isAnyOf } from '@reduxjs/toolkit'

import { APIStatus, IApiErrorResponse, IApiPaginationQueryAttr } from '@/app/api'
import { IContent } from '@/models/content'

import { fetchSearchResults, fetchSearchResultsCount } from '@/modules/search/search.actions'

export const PER_PAGE = 8

export interface ISearchPagination extends IApiPaginationQueryAttr {
  cacheCurrentPage: number
  totalItems: number | null
  totalPages: number | null
}

export const getInitSearchPagination = (): ISearchPagination => ({
  perPage: PER_PAGE * 2,
  currentPage: 1,
  cacheCurrentPage: 1,
  totalItems: null,
  totalPages: null,
})

interface ISearchState {
  search: {
    status: APIStatus
    items: IContent[]
    error: IApiErrorResponse | null
    pagination: ISearchPagination
  }
}

const initialState: ISearchState = {
  search: {
    status: APIStatus.IDLE,
    error: null,
    items: [],
    pagination: getInitSearchPagination(),
  },
}

export const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    resetSearchResults: (state) => {
      state.search.status = APIStatus.IDLE
      state.search.items = []
      state.search.error = null
      state.search.pagination = getInitSearchPagination()
    },
    setSearchResultsPagination: (
      state,
      action: PayloadAction<{ currentPage: number; cacheCurrentPage?: number; perPage?: number }>,
    ) => {
      const { currentPage, cacheCurrentPage, perPage } = action.payload

      state.search.pagination.currentPage = currentPage
      if (cacheCurrentPage) state.search.pagination.cacheCurrentPage = cacheCurrentPage
      if (perPage) state.search.pagination.perPage = perPage
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSearchResults.fulfilled, (state, { payload }) => {
        state.search.items = [...state.search.items, ...payload]
        state.search.status = APIStatus.FULFILLED
      })
      .addCase(fetchSearchResultsCount.fulfilled, (state, { payload }) => {
        state.search.pagination.totalItems = payload.count
        state.search.pagination.totalPages = Math.ceil(
          payload.count / state.search.pagination.perPage,
        )
      })

      .addMatcher(isAnyOf(fetchSearchResults.pending, fetchSearchResultsCount.pending), (state) => {
        state.search.status = APIStatus.PENDING
      })

      .addMatcher(
        isAnyOf(fetchSearchResults.rejected, fetchSearchResultsCount.rejected),
        (state, { payload }) => {
          state.search.status = APIStatus.REJECTED
          if (payload) state.search.error = payload
        },
      )
  },
})

export const { setSearchResultsPagination, resetSearchResults } = searchSlice.actions
