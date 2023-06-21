import React, { FC } from 'react'

import ChannelContentGrid from '@/components/ChannelContentGrid'
import ChannelCard from './ChannelCard'

import { useGetChannelsByCategoryQuery } from '../channel.api'

interface ChannelGridProps {
  categoryId: number
}

const ChannelGrid: FC<ChannelGridProps> = ({ categoryId }) => {
  const { data: channels, isLoading: channelsLoading } = useGetChannelsByCategoryQuery(
    { category_ptr: categoryId },
    { pollingInterval: 60 * 1000 },
  )

  return (
    <ChannelContentGrid
      items={channels || []}
      itemRenderFn={(item) => <ChannelCard item={item} key={item.id} />}
      loading={channelsLoading}
    />
  )
}

export default ChannelGrid
