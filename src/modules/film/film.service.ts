import { ApiHelper, IApiFetchAllQueryAttr } from '../../app/api'
import { IFilmQueryAttr } from './film.actions'
import { IFilm } from './film.model'

const FilmService = (api: ApiHelper) => ({
  fetchAll: async (attr: IApiFetchAllQueryAttr<IFilmQueryAttr>) => {
    const query = attr.query || {}
    const params = { ...query }

    const { currentPage, perPage } = attr.pagination || {}
    if (currentPage && perPage) {
      params.limit = perPage
      params.offset = (currentPage - 1) * perPage
    }

    return api.get<IFilm[]>('films', { params })
  },
})

export default FilmService
