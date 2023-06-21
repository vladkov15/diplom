import React, { FC } from 'react'

import ContentSlider, { ContentSliderProps } from '@/components/ContentSlider'
import { ContentCardType } from '@/components/ContentCard'
import FilmCard from './FilmCard'

import { IFilm } from '../film.model'
import { useGetPromoFilmsQuery } from '../film.api'

interface PromoFilmSliderProps
  extends Omit<ContentSliderProps, 'title' | 'items' | 'itemRenderFn'> {}

const PromoFilmSlider: FC<PromoFilmSliderProps> = React.memo(({ ...props }) => {
  const { data: films } = useGetPromoFilmsQuery()

  return (
    <ContentSlider
      {...props}
      title='ITV предлагает'
      items={films || []}
      itemRenderFn={(item) => <FilmCard item={item as IFilm} type={ContentCardType.PROMO_FILM} />}
      type={ContentCardType.PROMO_FILM}
      swiperProps={{ slidesPerView: 2, slidesPerGroup: 2 }}
    />
  )
})
PromoFilmSlider.displayName = 'PromoFilmSlider'

export default PromoFilmSlider
