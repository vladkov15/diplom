import React, { FC } from 'react'

import ContentGenreSlider from '@/components/ContentGenreSlider'
import SerialGenreCard from './SerialGenreCard'

import { useGetSerialGenresQuery } from '../genre.api'

const SerialGenreSlider: FC = React.memo(() => {
  const { data: genres } = useGetSerialGenresQuery()

  if (!genres) return null

  return (
    <ContentGenreSlider
      title='Жанры'
      items={genres}
      itemRenderFn={(item) => <SerialGenreCard item={item} />}
    />
  )
})
SerialGenreSlider.displayName = 'SerialGenreSlider'

export default SerialGenreSlider
