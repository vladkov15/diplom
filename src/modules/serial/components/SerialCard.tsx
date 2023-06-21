import React, { FC } from 'react'
import { useRouter } from 'next/router'

import { ContentType, IContent } from '@/models/content'
import ContentCard, { ContentCardProps, ContentCardType } from '@/components/ContentCard'

import { useFavorite } from '@/modules/favorite/hooks/useFavorite'
import { ToggleFavoriteEvent } from '@/modules/favorite/favorite.emitter'

import { ISerial } from '../serial.model'

export type SerialCardType = ContentCardType.SERIAL | ContentCardType.PROMO_SERIAL

interface SerialCardProps extends ContentCardProps {
  item: ISerial
  type?: SerialCardType
}

const SerialCard: FC<SerialCardProps> = ({ item, type, ...props }) => {
  const router = useRouter()

  const handleDeleteFavorite = (event: ToggleFavoriteEvent) => {
    if (item.id === event.id && item.content_type_ptr === event.contentType) setFavorites(0)
  }

  const { favorites, setFavorites, toggleFavorites } = useFavorite(item.favorites, {
    onDeleteFavorite: handleDeleteFavorite,
  })

  const handleClickFavorite = (item: IContent) => {
    toggleFavorites(item.id, ContentType.SERIAL)

    props.onClickFavorite?.(item)
  }

  const handleClick = (item: IContent) => {
    router.push(`/serials/${item.id}`)

    props.onClick?.(item)
  }

  return (
    <ContentCard
      item={{ ...item, favorites }}
      type={type}
      onClickFavorite={handleClickFavorite}
      onClick={handleClick}
    />
  )
}

export default SerialCard
