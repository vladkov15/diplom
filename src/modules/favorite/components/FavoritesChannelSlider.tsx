import React, { FC } from 'react'
import { useRouter } from 'next/router'

import ChannelContentSlider, { ChannelContentSliderProps } from '@/components/ChannelContentSlider'
import ChannelCard from '@/modules/channel/components/ChannelCard'

import { useGetFavoritesChannelsQuery } from '../favorite.api'

type OmittedCahnnelContentSliderProps = Omit<
  ChannelContentSliderProps,
  'title' | 'items' | 'itemRenderFn'
>

interface FavoritesChannelSliderProps extends OmittedCahnnelContentSliderProps {
  title?: string
}

const FavoritesChannelSlider: FC<FavoritesChannelSliderProps> = React.memo(
  ({ title, ...props }) => {
    const router = useRouter()

    const { data: channels, isLoading: isChannelsLoading } = useGetFavoritesChannelsQuery()

    return (
      <ChannelContentSlider
        {...props}
        title={title || 'Избранное'}
        items={channels || []}
        itemRenderFn={(item) => <ChannelCard item={item} />}
        actions={[
          {
            key: 'WATCH_ALL',
            label: 'Смотреть все',
            onClick: () => router.push('/tv/favorites'),
            disabled: isChannelsLoading || (channels && channels.length === 0),
          },
        ]}
        loading={isChannelsLoading}
        skeleton
        emptySkeleton
        emptySkeletonRenderFn={() => (
          <>
            Здесь будет находиться список избранных ТВ-каналов.
            <br />
            Чтобы добавить ТВ-канал в раздел &quot;Избранные ТВ-каналы&quot;, зайдите на страницу
            ТВ-канала и нажмите кнопку &quot;Добавить в избранные&quot;.
          </>
        )}
      />
    )
  },
)
FavoritesChannelSlider.displayName = 'FavoritesChannelSlider'

export default FavoritesChannelSlider
