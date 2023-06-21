import React, { FC } from 'react'
import { useRouter } from 'next/router'

import ContentSlider, { ContentSliderProps } from '@/components/ContentSlider'
import SerialCard from '@/modules/serial/components/SerialCard'

import { IContent } from '@/models/content'
import { ISerial } from '@/modules/serial/serial.model'
import { useGetFavoritesSerialsQuery } from '../favorite.api'

type OmittedContentSliderProps = Omit<ContentSliderProps, 'title' | 'items' | 'itemRenderFn'>

interface FavoritesSerialSliderProps extends OmittedContentSliderProps {
  title?: string
}

const FavoritesSerialSlider: FC<FavoritesSerialSliderProps> = React.memo(({ title, ...props }) => {
  const router = useRouter()

  const { data: serials, isLoading: isSerialsLoading } = useGetFavoritesSerialsQuery()

  return (
    <ContentSlider
      {...props}
      title={title || 'Избранное'}
      items={serials || []}
      itemRenderFn={(item: IContent) => <SerialCard item={item as ISerial} />}
      actions={[
        {
          key: 'WATCH_ALL',
          label: 'Смотреть все',
          onClick: () => router.push('/serials/favorites'),
          disabled: isSerialsLoading || (serials && serials.length === 0),
        },
      ]}
      loading={isSerialsLoading}
      skeleton
      emptySkeleton
      emptySkeletonRenderFn={() => (
        <>
          Здесь будет находиться список избранных сериалов.
          <br />
          Чтобы добавить сериал в раздел &quot;Избранные сериалы&quot;, зайдите на страницу сериала
          и нажмите кнопку &quot;Добавить в избранное&quot;.
        </>
      )}
    />
  )
})
FavoritesSerialSlider.displayName = 'FavoritesSerialSlider'

export default FavoritesSerialSlider
