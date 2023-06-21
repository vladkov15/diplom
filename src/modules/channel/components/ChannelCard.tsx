import React, { FC } from 'react'
import { useRouter } from 'next/router'

import { IChannel } from '@/modules/channel/channel.model'
import { ContentType } from '@/models/content'
import ChannelContentCard, { ChannelContentCardProps } from '@/components/ChannelContentCard'

import { useFavorite } from '@/modules/favorite/hooks/useFavorite'
import { ToggleFavoriteEvent } from '@/modules/favorite/favorite.emitter'

interface ChannelCardProps extends ChannelContentCardProps {
  item: IChannel
}

const ChannelCard: FC<ChannelCardProps> = ({ item, ...props }) => {
  const router = useRouter()

  const handleDeleteFavorite = (event: ToggleFavoriteEvent) => {
    if (item.id === event.id && item.content_type_ptr === event.contentType) setFavorites(0)
  }

  const { favorites, setFavorites, toggleFavorites } = useFavorite(item.favorites, {
    onDeleteFavorite: handleDeleteFavorite,
  })

  const handleClickFavorite = (item: IChannel) => {
    toggleFavorites(item.id, ContentType.CHANNEL)

    props.onClickFavorite?.(item)
  }

  const handleClick = (item: IChannel) => {
    router.push(`/tv/${item.id}`)

    props.onClick?.(item)
  }

  return (
    <ChannelContentCard
      item={{ ...item, favorites }}
      onClickFavorite={handleClickFavorite}
      onClick={handleClick}
    />
  )
}
export default ChannelCard
