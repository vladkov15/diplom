import React, { FC } from 'react'
import { useRouter } from 'next/router'

import ContentSlider, { ContentSliderProps } from '@/components/ContentSlider'
import FilmCard from '@/modules/film/components/FilmCard'

import { IFilm } from '@/modules/film/film.model'
import { useGetFavoritesFilmsQuery } from '../favorite.api'

type OmittedContentSliderProps = Omit<ContentSliderProps, 'title' | 'items' | 'itemRenderFn'>

interface FavoritesFilmSliderProps extends OmittedContentSliderProps {
  title?: string
}

const FavoritesFilmSlider: FC<FavoritesFilmSliderProps> = React.memo(({ title, ...props }) => {
  const router = useRouter()

  const { data: films, isLoading: isFilmsLoading } = useGetFavoritesFilmsQuery()

  return (
    <ContentSlider
      {...props}
      title={title || 'Избранное'}
      items={films || []}
      itemRenderFn={(item) => <FilmCard item={item as IFilm} />}
      actions={[
        {
          key: 'WATCH_ALL',
          label: 'Смотреть все',
          onClick: () => router.push('/films/favorites'),
          disabled: isFilmsLoading || (films && films.length === 0),
        },
      ]}
      loading={isFilmsLoading}
      skeleton
      emptySkeleton
      emptySkeletonRenderFn={() => (
        <>
          Здесь будет находиться список избранных фильмов.
          <br />
          Чтобы добавить фильм в раздел &quot;Избранные фильмы&quot;, зайдите на страницу фильма и
          нажмите кнопку &quot;Добавить в избранное&quot;.
        </>
      )}
    />
  )
})
FavoritesFilmSlider.displayName = 'FavoritesFilmSlider'

export default FavoritesFilmSlider
