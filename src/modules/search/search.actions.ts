import { createAsyncThunk } from '@reduxjs/toolkit'

import { ApiHelper, IApiErrorResponse, IApiFetchAllQueryAttr } from '@/app/api'
import { ContentType, Genres, IContent } from '@/models/content'
import { Countries } from '@/models/countries'

const api = ApiHelper.getInstance()

export const fetchSearchResults = createAsyncThunk<
  IContent[],
  IApiFetchAllQueryAttr<ISearchResultsQueryAttr>,
  { rejectValue: IApiErrorResponse }
>('search/fetchSearchResults', async (attr, thunkAPI) => {
  try {
    attr.query
    const { data } = await api.services.search.fetchSearchResult(attr)

    return data
  } catch (e) {
    return thunkAPI.rejectWithValue(api.resolveError(e))
  }
})

export const fetchSearchResultsCount = createAsyncThunk<
  ICountOfSearchResults,
  ISearchResultsCountQueryAttr,
  { rejectValue: IApiErrorResponse }
>('search/fetchCountOfSearchResults', async (attr, thunkAPI) => {
  try {
    const { data } = await api.services.search.fetchCountOfSearchResults(attr)

    return data
  } catch (e) {
    return thunkAPI.rejectWithValue(api.resolveError(e))
  }
})

export interface ISearchResultsQueryAttrBase {
  search_query: string
  country: Countries
  year: number | string
  genre_ptr: Genres
  content_type_ptr: ContentType
}

export interface ISearchResultsQueryAttr extends Partial<ISearchResultsQueryAttrBase> {
  limit?: number | string
  offset?: number | string
}

export interface ISearchResultsCountQueryAttr extends Partial<ISearchResultsQueryAttrBase> {
  count?: number
}

export interface ICountOfSearchResults {
  count: number
}
