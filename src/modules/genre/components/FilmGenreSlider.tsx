import React, { FC } from 'react'

import ContentGenreSlider from '@/components/ContentGenreSlider'
import FilmGenreCard from './FilmGenreCard'

import { useGetFilmGenresQuery } from '../genre.api'

const FilmGenreSlider: FC = React.memo(() => {
  const { data: genres } = useGetFilmGenresQuery()

  if (!genres) return null

  return (
    <ContentGenreSlider
      title='Жанры'
      items={genres}
      itemRenderFn={(item) => <FilmGenreCard item={item} />}
    />
  )
})
FilmGenreSlider.displayName = 'FilmGenreSlider'

export default FilmGenreSlider
