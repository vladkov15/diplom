import React, { FC } from 'react'

import ContentSlider, { ContentSliderProps } from '@/components/ContentSlider'
import SerialCard from './SerialCard'

import { IContent } from '@/models/content'
import { useGetUnfinishedSerialsQuery } from '../serial.api'
import { ISerial } from '../serial.model'

type OmittedContentSliderProps = Omit<ContentSliderProps, 'title' | 'items' | 'itemRenderFn'>

interface UnfinishedSerialSliderProps extends OmittedContentSliderProps {}

const UnfinishedSerialSlider: FC<UnfinishedSerialSliderProps> = React.memo(({ ...props }) => {
  const { data: serials, isLoading } = useGetUnfinishedSerialsQuery()

  return (
    <ContentSlider
      {...props}
      title='Я смотрю'
      items={serials || []}
      itemRenderFn={(item: IContent) => <SerialCard item={item as ISerial} />}
      loading={isLoading}
      skeleton
      emptySkeleton
      emptySkeletonRenderFn={() => 'Здесь будет список сериалов, просмотр которых Вы не закончили.'}
    />
  )
})
UnfinishedSerialSlider.displayName = 'UnfinishedSerialSlider'

export default UnfinishedSerialSlider
