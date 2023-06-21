import React, { FC } from 'react'
import { useRouter } from 'next/router'

import { ContentType, IContent } from '@/models/content'
import ContentCard, { ContentCardProps, ContentCardType } from '@/components/ContentCard'

import { useFavorite } from '@/modules/favorite/hooks/useFavorite'
import { ToggleFavoriteEvent } from '@/modules/favorite/favorite.emitter'

import { IFilm } from '../film.model'

export type FilmCardType = ContentCardType.FILM | ContentCardType.PROMO_FILM

interface FilmCardProps extends ContentCardProps {
  item: IFilm
  type?: FilmCardType
}

const FilmCard: FC<FilmCardProps> = ({ item, type, ...props }) => {
  const router = useRouter()

  const handleDeleteFavorite = (event: ToggleFavoriteEvent) => {
    if (item.id === event.id && item.content_type_ptr === event.contentType) setFavorites(0)
  }

  const { favorites, setFavorites, toggleFavorites } = useFavorite(item.favorites, {
    onDeleteFavorite: handleDeleteFavorite,
  })

  const handleClickFavorite = (item: IContent) => {
    toggleFavorites(item.id, ContentType.FILM)

    props.onClickFavorite?.(item)
  }

  const handleClick = (item: IContent) => {
    router.push(`/films/${item.id}`)

    props.onClick?.(item)
  }

  return (
    <ContentCard
      item={{ ...item, favorites }}
      type={type as unknown as ContentCardType}
      onClickFavorite={handleClickFavorite}
      onClick={handleClick}
    />
  )
}

export default FilmCard
