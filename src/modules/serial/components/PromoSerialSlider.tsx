import React, { FC } from 'react'

import ContentSlider, { ContentSliderProps } from '@/components/ContentSlider'
import { ContentCardType } from '@/components/ContentCard'
import SerialCard from './SerialCard'

import { IContent } from '@/models/content'
import { ISerial } from '../serial.model'
import { useGetPromoSerialsQuery } from '../serial.api'

interface PromoSerialSliderProps extends Omit<ContentSliderProps, 'title' | 'items' | 'itemRenderFn'> {}

const PromoSerialSlider: FC<PromoSerialSliderProps> = React.memo(({ ...props }) => {
  const { data: serials,  } = useGetPromoSerialsQuery()

  return (
    <ContentSlider
      {...props}
      title='ITV предлагает'
      items={serials || []}
      itemRenderFn={(item: IContent) => (
        <SerialCard item={item as ISerial} type={ContentCardType.PROMO_SERIAL} />
      )}
      type={ContentCardType.PROMO_SERIAL}
      swiperProps={{ slidesPerView: 2, slidesPerGroup: 2 }}
    />
  )
})
PromoSerialSlider.displayName = 'PromoSerialSlider'

export default PromoSerialSlider
