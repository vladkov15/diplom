import React, { FC } from 'react'
import { useRouter } from 'next/router'

import ContentSlider, { ContentSliderProps } from '@/components/ContentSlider'
import SerialCard from './SerialCard'

import { IContent } from '@/models/content'
import { ISerialGenre } from '@/modules/genre/genre.model'
import { ISerial } from '../serial.model'
import { useGetSerialsByGenreQuery } from '../serial.api'

interface SerialSliderProps extends Omit<ContentSliderProps, 'title' | 'items' | 'itemRenderFn'> {
  genre: ISerialGenre
  limit: number
}

const SerialSlider: FC<SerialSliderProps> = React.memo(({ genre, limit, ...props }) => {
  const router = useRouter()

  const { data: serials } = useGetSerialsByGenreQuery({ genre_ptr: genre.id, limit })

  return (
    <ContentSlider
      {...props}
      title={genre.name}
      items={serials || []}
      itemRenderFn={(item: IContent) => <SerialCard item={item as ISerial} />}
      actions={[
        {
          key: 'WATCH_ALL',
          label: 'Смотреть все',
          onClick: () => router.push(`/serials/genre/${genre.id}`),
        },
      ]}
    />
  )
})
SerialSlider.displayName = 'SerialSlider'

export default SerialSlider
