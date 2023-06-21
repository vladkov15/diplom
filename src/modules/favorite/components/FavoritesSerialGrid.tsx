import React, { FC } from 'react'

import ContentGrid from '@/components/ContentGrid'
import SerialCard from '@/modules/serial/components/SerialCard'

import { ISerial } from '@/modules/serial/serial.model'
import { useGetFavoritesSerialsQuery } from '../favorite.api'

const FavoritesSerialGrid: FC = () => {
  const { data: serials, isLoading } = useGetFavoritesSerialsQuery()

  return (
    <ContentGrid
      items={serials || []}
      itemRenderFn={(item) => <SerialCard item={item as ISerial} key={item.id} />}
      loading={isLoading}
    />
  )
}

export default FavoritesSerialGrid
