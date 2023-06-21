import { ApiHelper, IApiFetchAllQueryAttr } from '../../app/api'
import { ISerialQueryAttr } from './serial.actions'
import { ISerial } from './serial.model'

const SerialService = (api: ApiHelper) => ({
  fetchAll: async (attr: IApiFetchAllQueryAttr<ISerialQueryAttr>) => {
    const query = attr.query || {}
    const params = { ...query }

    const { currentPage, perPage } = attr.pagination || {}
    if (currentPage && perPage) {
      params.limit = perPage
      params.offset = (currentPage - 1) * perPage
    }

    return api.get<ISerial[]>('serials', { params })
  },
})

export default SerialService
