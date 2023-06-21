import React, { FC } from 'react'

import ContentGrid from '@/components/ContentGrid'
import FilmCard from '@/modules/film/components/FilmCard'

import { IFilm } from '@/modules/film/film.model'
import { useGetFavoritesFilmsQuery } from '../favorite.api'

const FavoritesFilmGrid: FC = () => {
  const { data: films, isLoading } = useGetFavoritesFilmsQuery()

  return (
    <ContentGrid
      items={films || []}
      itemRenderFn={(item) => <FilmCard item={item as IFilm} key={item.id} />}
      loading={isLoading}
    />
  )
}

export default FavoritesFilmGrid
