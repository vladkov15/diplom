import React, { FC } from 'react'
import { SwiperProps } from 'swiper/react'
import styled from 'styled-components'

import Button, { ButtonProps } from '@ui/components/button'
import ChannelContentSkeletonCard from '../ChannelContentCard/SkeletonCard'

import Slider from '../Slider'
import SkeletonSlider from '../Slider/SkeletonSlider'

import { IChannel } from '@/modules/channel/channel.model'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'

import styles from './ChannelContentSlider.module.scss'
import EmptySkeletonSlider from '../Slider/EmptySkeletonSlider'

const DEFAULT_SLIDES_PER_PAGE = 6

const BREAKPOINTS_SWIPER_PROPS = {
  768: {
    slidesPerView: 4,
    slidesPerGroup: 4,
  },
  1280: {
    slidesPerView: DEFAULT_SLIDES_PER_PAGE,
    slidesPerGroup: DEFAULT_SLIDES_PER_PAGE,
  },
}

const DEFAULT_SWIPER_PROPS = {
  slidesPerView: 2,
  slidesPerGroup: 2,
  breakpoints: BREAKPOINTS_SWIPER_PROPS,
}

export interface ChannelContentSliderProps {
  title: string
  items: IChannel[]
  itemRenderFn: (item: IChannel, index?: number, items?: IChannel[]) => React.ReactNode
  actions?: ButtonProps[]
  loading?: boolean
  skeleton?: boolean
  skeletonItemRenderFn?: () => React.ReactNode
  emptySkeleton?: boolean
  emptySkeletonRenderFn?: () => React.ReactNode
  swiperProps?: SwiperProps
  swiperSkeletonProps?: SwiperProps
}

const ChannelContentSlider: FC<ChannelContentSliderProps> = React.memo(
  ({
    title,
    items,
    itemRenderFn,
    actions = [],
    loading,
    skeleton,
    skeletonItemRenderFn,
    emptySkeleton,
    emptySkeletonRenderFn,
    swiperProps,
    swiperSkeletonProps,
  }) => {
    return (
      <div className={styles.ChannelContentSlider}>
        <div className={styles.ChannelContentSlider__Header}>
          <h2 className={styles.ChannelContentSlider__Title}>{title}</h2>
          <div className={styles.ContentSlider__Actions}>
            {actions.map(({ key, ...action }) => (
              <Button key={key} {...action} />
            ))}
          </div>
        </div>
        <div className={styles.ChannelContentSlider__Body}>
          {items.length !== 0 && (
            <SliderStyled
              items={items}
              itemRenderFn={itemRenderFn}
              swiperProps={{ ...DEFAULT_SWIPER_PROPS, ...swiperProps }}
            />
          )}
          {loading && skeleton && (
            <SkeletonSlider
              itemRenderFn={skeletonItemRenderFn || (() => <ChannelContentSkeletonCard />)}
              swiperProps={{ ...DEFAULT_SWIPER_PROPS, ...swiperSkeletonProps }}
            />
          )}
          {emptySkeleton && !loading && !items.length && (
            <EmptySkeletonSlider
              itemRenderFn={skeletonItemRenderFn || (() => <ChannelContentSkeletonCard />)}
              renderFn={emptySkeletonRenderFn}
              swiperProps={{ ...DEFAULT_SWIPER_PROPS, ...swiperSkeletonProps }}
            />
          )}
        </div>
      </div>
    )
  },
)
ChannelContentSlider.displayName = 'ChannelContentSlider'

const SliderStyled = styled(Slider)`
  .swiper-button-prev,
  .swiper-button-next {
    top: calc(50% - 20px);
  }
`

export default ChannelContentSlider
