import React, { FC } from 'react'
import { useRouter } from 'next/router'

import ChannelContentSlider, { ChannelContentSliderProps } from '@/components/ChannelContentSlider'
import ChannelCard from './ChannelCard'

import { useGetChannelsByCategoryQuery } from '../channel.api'
import { ChannelCategories, IChannelCategory } from '../channel.model'

const CHANNEL_CATEGORIES = [
  ChannelCategories.BELARUS,
  ChannelCategories.INFORMATION,
  ChannelCategories.SPORT,
]

interface ChannelSliderProps
  extends Omit<ChannelContentSliderProps, 'title' | 'items' | 'itemRenderFn'> {
  category: IChannelCategory
  limit?: number
}

const ChannelSlider: FC<ChannelSliderProps> = React.memo(({ category, limit, ...props }) => {
  const router = useRouter()

  const { data: channels, isLoading: isChannelsLoading } = useGetChannelsByCategoryQuery(
    { category_ptr: category.id, limit },
    { pollingInterval: 60 * 1000 },
  )

  

  return (
    <ChannelContentSlider
      {...props}
      title={category.name}
      items={channels || []}
      itemRenderFn={(item) => <ChannelCard item={item} />}
      actions={[
        {
          key: 'WATCH_ALL',
          label: 'Смотреть все',
          onClick: () => router.push(`/tv/category/${category.id}`),
        },
      ]}
      loading={isChannelsLoading}
    />
  )
})

ChannelSlider.displayName = 'ChannelSlider'

export default ChannelSlider
