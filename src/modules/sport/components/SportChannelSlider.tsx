import React, { FC } from 'react'

import ChannelContentSlider from '@/components/ChannelContentSlider'
import ChannelCard from '@/modules/channel/components/ChannelCard'

import { useGetSportChannelsByCategoryQuery } from '../sport.api'
import { ISportCategory } from '../sport.model'

interface SportChannelSliderProps {
  category: ISportCategory
  limit: number
}

const SportChannelSlider: FC<SportChannelSliderProps> = React.memo(({ category, limit }) => {
  const { data: channels, isLoading: isChannelsLoading } = useGetSportChannelsByCategoryQuery(
    { sport_ptr: category.id, limit },
    { pollingInterval: 60 * 1000 },
  )

  if (!isChannelsLoading && channels?.length === 0) return null

  return (
    <ChannelContentSlider
      title={category.name}
      items={channels || []}
      itemRenderFn={(item) => <ChannelCard item={item} />}
      loading={isChannelsLoading}
      skeleton
    />
  )
})
SportChannelSlider.displayName = 'SportChannelSlider'

export default SportChannelSlider
