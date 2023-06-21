import React, { FC, useMemo } from 'react'
import { SwiperProps } from 'swiper/react'
import styled from 'styled-components'

import { IContentGenre } from '@/models/content'

import Slider from '../Slider'

import { GENRES } from '@/config'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'

import styles from './ContentGenreSlider.module.scss'

const DEFAULT_SLIDES_PER_PAGE = 6

const DEFAULT_SWIPER_PROPS = {
  slidesPerView: DEFAULT_SLIDES_PER_PAGE,
  slidesPerGroup: DEFAULT_SLIDES_PER_PAGE,
} as SwiperProps

interface ContentGenreSliderProps {
  title: string
  items: IContentGenre[]
  itemRenderFn: (item: IContentGenre, index?: number, items?: IContentGenre[]) => React.ReactNode
  swiperProps?: SwiperProps
}

const ContentGenreSlider: FC<ContentGenreSliderProps> = ({
  title,
  items,
  itemRenderFn,
  swiperProps,
}) => {
  const sortedItems = useMemo(() => {
    return items.reduce<IContentGenre[]>((acc, genre) => {
      const order = GENRES.get(genre.id)?.order
      if (order) {
        acc.splice(order - 1, 0, genre)
        return acc
      }
      return [...acc, genre]
    }, [])
  }, [items])

  return (
    <div className={styles.ContentGenreSlider}>
      <div className={styles.ContentGenreSlider__Header}>
        <h2 className={styles.ContentGenreSlider__Title}>{title}</h2>
      </div>
      <SliderStyled
        items={sortedItems}
        itemRenderFn={itemRenderFn}
        swiperProps={{ ...DEFAULT_SWIPER_PROPS, ...swiperProps }}
      />
    </div>
  )
}

const SliderStyled = styled(Slider)``

export default ContentGenreSlider
