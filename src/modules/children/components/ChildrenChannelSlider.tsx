import React, { FC } from 'react'

import ChannelContentSlider from '@/components/ChannelContentSlider'
import ChannelCard from '@/modules/channel/components/ChannelCard'

import { useGetChildrenChannelsByCategoryQuery } from '../children.api'
import { IChildrenCategory } from '../children.model'

interface ChildrenChannelSliderProps {
  category: IChildrenCategory
  limit: number
}

const ChildrenChannelSlider: FC<ChildrenChannelSliderProps> = React.memo(({ category, limit }) => {
  const { data: channels, isLoading: isChannelsLoading } = useGetChildrenChannelsByCategoryQuery(
    { age_ptr: category.id, limit },
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
ChildrenChannelSlider.displayName = 'ChildrenChannelSlider'

export default ChildrenChannelSlider
