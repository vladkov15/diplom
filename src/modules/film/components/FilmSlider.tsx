import React, { FC } from 'react'
import { useRouter } from 'next/router'

import ContentSlider, { ContentSliderProps } from '@/components/ContentSlider'
import FilmCard from './FilmCard'

import { IFilmGenre } from '@/modules/genre/genre.model'
import { useGetFilmsByGenreQuery } from '../film.api'
import { IFilm } from '../film.model'

interface FilmSliderProps extends Omit<ContentSliderProps, 'title' | 'items' | 'itemRenderFn'> {
  genre: IFilmGenre
  limit: number
}

const FilmSlider: FC<FilmSliderProps> = React.memo(({ genre, limit, ...props }) => {
  const router = useRouter()

  const { data: films } = useGetFilmsByGenreQuery({ genre_ptr: genre.id, limit })

  return (
    <ContentSlider
      {...props}
      title={genre.name}
      items={films || []}
      itemRenderFn={(item) => <FilmCard item={item as IFilm} />}
      actions={[
        {
          key: 'WATCH_ALL',
          label: 'Смотреть все',
          onClick: () => router.push(`/films/genre/${genre.id}`),
        },
      ]}
    />
  )
})
FilmSlider.displayName = 'FilmSlider'

export default FilmSlider
