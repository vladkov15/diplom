import React, { useState } from 'react'
import useDebouncedCallback from '@restart/hooks/useDebouncedCallback'

import SearchForm, { ISearchForm } from '@/modules/search/components/SearchForm'
import SearchSliderResult from '@/modules/search/components/SearchSliderResult'

import { useAppDispatch, useAppSelector } from '@/app/hooks'
import {
  fetchSearchResultsCount,
  fetchSearchResults,
  ISearchResultsQueryAttr,
} from '../search.actions'
import { APIStatus } from '@/app/api'
import {
  getInitSearchPagination,
  ISearchPagination,
  PER_PAGE,
  resetSearchResults,
  setSearchResultsPagination,
} from '../search.slice'

const Search = () => {
  const dispatch = useAppDispatch()
  const { search } = useAppSelector((state) => state.search)

  const [query, setQuery] = useState<ISearchResultsQueryAttr>({})
  const [isSubmitted, setIsSubmitted] = useState(false)

  const prepareQueryParams = (form: ISearchForm) => {
    const query: ISearchResultsQueryAttr = {}

    if (form.contentType) query.content_type_ptr = form.contentType
    if (form.searchQuery) query.search_query = form.searchQuery
    if (form.genre) query.genre_ptr = form.genre
    if (form.country) query.country = form.country
    if (form.year) query.year = form.year

    return query
  }

  const fetchSearchResultsDebounce = useDebouncedCallback((query: ISearchResultsQueryAttr) => {
    const pagination = getInitSearchPagination()

    dispatch(resetSearchResults())
    dispatch(fetchSearchResultsCount({ ...query, count: 1 }))

    dispatch(fetchSearchResults({ query, pagination }))
  }, 1000)

  const handleChangeSearchForm = (form: ISearchForm) => {
    if (!isSubmitted) return

    const query = prepareQueryParams(form)

    fetchSearchResultsDebounce(query)
    setQuery(query)
  }

  const handleSubmitSearchForm = (form: ISearchForm) => {
    const query = prepareQueryParams(form)
    const pagination = getInitSearchPagination()

    dispatch(resetSearchResults())
    dispatch(fetchSearchResultsCount({ ...query, count: 1 }))
    dispatch(fetchSearchResults({ query, pagination }))

    setQuery(query)
    !isSubmitted && setIsSubmitted(true)
  }

  const handleLoadMore = (
    pagination: ISearchPagination,
    { limit, offset }: ISearchResultsQueryAttr = {},
  ) => {
    dispatch(fetchSearchResults({ query: { ...query, limit, offset }, pagination }))

    const cacheCurrentPage = pagination.cacheCurrentPage + 1
    dispatch(setSearchResultsPagination({ ...pagination, perPage: PER_PAGE, cacheCurrentPage }))
  }

  return (
    <div>
      <SearchForm
        busy={search.status === APIStatus.PENDING}
        onChange={handleChangeSearchForm}
        onSubmit={handleSubmitSearchForm}
      />
      <div className='mt-5'>
        <SearchSliderResult query={query} onLoadMore={handleLoadMore} />
      </div>
    </div>
  )
}

export default Search
