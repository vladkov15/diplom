import { ApiHelper, IApiFetchAllQueryAttr, IApiPaginationQueryAttr } from '@/app/api'
import {
  ICountOfSearchResults,
  ISearchResultsCountQueryAttr,
  ISearchResultsQueryAttr,
} from '@/modules/search/search.actions'
import { IContent } from '@/models/content'

const SearchService = (api: ApiHelper) => ({
  fetchSearchResult: async (attr: IApiFetchAllQueryAttr<ISearchResultsQueryAttr>) => {
    const query = attr.query || {}
    const params = { ...query }

    const { currentPage, perPage } = attr.pagination as IApiPaginationQueryAttr

    params.limit = params.limit || perPage
    params.offset = params.offset || (currentPage - 1) * perPage

    return api.get<IContent[]>('smart_search', { params })
  },
  fetchCountOfSearchResults: async (attr: ISearchResultsCountQueryAttr) => {
    const params = { ...attr, count: attr.count || 1 }

    return api.get<ICountOfSearchResults>('smart_search', { params })
  },
})

export default SearchService
