import { FC } from 'react'

import { useAppDispatch, useAppSelector } from '@/app/hooks'
import { APIStatus } from '@/app/api'

import { setSerialsPagination } from '../serial.slice'
import { fetchSerials } from '../serial.actions'

import ContentGrid from '@/components/ContentGrid'
import SerialCard from './SerialCard'
import { ISerial } from '../serial.model'

interface SerialGridProps {
  genreId: number
}

const SerialGrid: FC<SerialGridProps> = ({ genreId }) => {
  const dispath = useAppDispatch()

  const serials = useAppSelector((state) => state.serial.serials)

  const handleChangePage = (currentPage: number, perPage: number) => {
    dispath(setSerialsPagination({ currentPage, perPage }))

    const query = { genre_ptr: genreId }
    const pagination = { currentPage, perPage }
    dispath(fetchSerials({ query, pagination }))
  }

  return (
    <ContentGrid
      items={serials.items}
      itemRenderFn={(item) => <SerialCard item={item as ISerial} key={item.id} />}
      loading={serials.status === APIStatus.PENDING}
      loadMore={{
        ...serials.pagination,
        busy: serials.status === APIStatus.PENDING,
        onChangePage: handleChangePage,
      }}
    />
  )
}
SerialGrid.displayName = 'SerialGrid'

export default SerialGrid
