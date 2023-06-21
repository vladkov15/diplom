import React, { FC } from 'react'

import ChannelContentGrid from '@/components/ChannelContentGrid'
import ChannelCard from '../../channel/components/ChannelCard'

import { useGetFavoritesChannelsQuery } from '../favorite.api'

const FavoritesChannelGrid: FC = () => {
  const { data: channels, isLoading: channelsLoading } = useGetFavoritesChannelsQuery()

  return (
    <ChannelContentGrid
      items={channels || []}
      itemRenderFn={(item) => <ChannelCard item={item} key={item.id} />}
      loading={channelsLoading}
    />
  )
}

export default FavoritesChannelGrid
