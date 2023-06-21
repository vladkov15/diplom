import React, { FC } from 'react'
import { SwiperProps } from 'swiper/react'

import Button, { ButtonProps } from '@ui/components/button'
import ContentCard, { ContentCardType } from '../ContentCard'

import Slider from '../Slider'
import SkeletonSlider from '../Slider/SkeletonSlider'
import EmptySkeletonSlider from '../Slider/EmptySkeletonSlider'

import { IContent } from '@/models/content'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'

import styles from './ContentSlider.module.scss'

const DEFAULT_SLIDES_PER_PAGE = 6

const DEFAULT_SWIPER_PROPS = {
  slidesPerView: DEFAULT_SLIDES_PER_PAGE,
  slidesPerGroup: DEFAULT_SLIDES_PER_PAGE,
} as SwiperProps

export interface ContentSliderProps {
  title: string
  items: IContent[]
  itemRenderFn: (item: IContent, index?: number, items?: IContent[]) => React.ReactNode
  type?: ContentCardType
  actions?: ButtonProps[]
  loading?: boolean
  skeleton?: boolean
  skeletonItemRenderFn?: () => React.ReactNode
  emptySkeleton?: boolean
  emptySkeletonRenderFn?: () => React.ReactNode
  swiperProps?: SwiperProps
  swiperSkeletonProps?: SwiperProps
}

const ContentSlider: FC<ContentSliderProps> = React.memo(
  ({
    title,
    items,
    itemRenderFn,
    type,
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
      <div className={styles.ContentSlider}>
        <div className={styles.ContentSlider__Header}>
          <h2 className={styles.ContentSlider__Title}>{title}</h2>
          <div className={styles.ContentSlider__Actions}>
            {actions.map(({ key, ...action }) => (
              <Button key={key} {...action} />
            ))}
          </div>
        </div>
        <div className={styles.ContentSlider__Body}>
          {items.length !== 0 && (
            <Slider
              items={items}
              itemRenderFn={itemRenderFn}
              swiperProps={{ ...DEFAULT_SWIPER_PROPS, ...swiperProps }}
            />
          )}
          {loading && skeleton && (
            <SkeletonSlider
              itemRenderFn={skeletonItemRenderFn || (() => <ContentCard.Skeleton type={type} />)}
              swiperProps={{ ...DEFAULT_SWIPER_PROPS, ...swiperSkeletonProps }}
            />
          )}
          {emptySkeleton && !loading && !items.length && (
            <EmptySkeletonSlider
              itemRenderFn={skeletonItemRenderFn || (() => <ContentCard.Skeleton />)}
              renderFn={emptySkeletonRenderFn}
              swiperProps={{ ...DEFAULT_SWIPER_PROPS, ...swiperSkeletonProps }}
            />
          )}
        </div>
      </div>
    )
  },
)

ContentSlider.displayName = 'ContentSlider'

export default ContentSlider
