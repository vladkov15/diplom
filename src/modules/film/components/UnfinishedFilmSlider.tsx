import React, { FC } from 'react'

import ContentSlider, { ContentSliderProps } from '@/components/ContentSlider'
import { ContentCardType } from '@/components/ContentCard'
import FilmCard from './FilmCard'

import { IFilm } from '../film.model'
import { useGetUnfinishedFilmsQuery } from '../film.api'

interface UnfinishedFilmSliderProps
  extends Omit<ContentSliderProps, 'title' | 'items' | 'itemRenderFn'> {}

const UnfinishedFilmSlider: FC<UnfinishedFilmSliderProps> = React.memo(({ ...props }) => {
  const { data: films, isLoading: isFilmsLoading } = useGetUnfinishedFilmsQuery()

  return (
    <ContentSlider
      {...props}
      title='Я смотрю'
      items={films || []}
      itemRenderFn={(item) => <FilmCard item={item as IFilm} />}
      loading={isFilmsLoading}
      skeleton
      emptySkeleton
      emptySkeletonRenderFn={() => 'Здесь будет список фильмов, просмотр которых Вы не закончили.'}
    />
  )
})
UnfinishedFilmSlider.displayName = 'UnfinishedFilmSlider'

export default UnfinishedFilmSlider
