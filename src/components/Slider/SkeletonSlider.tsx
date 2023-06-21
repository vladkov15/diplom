import classNames from 'classnames'
import React, { FC } from 'react'
import { Swiper, SwiperSlide, SwiperProps } from 'swiper/react'

import styles from './Slider.module.scss'

export interface SkeletonSliderProps extends React.HTMLAttributes<HTMLDivElement> {
  itemRenderFn: () => React.ReactNode
  swiperProps?: SwiperProps
}

const SkeletonSlider: FC<SkeletonSliderProps> = ({ itemRenderFn, swiperProps, ...props }) => {
  return (
    <Swiper
      className={classNames(props.className, styles.SkeletonSlider)}
      enabled={false}
      spaceBetween={30}
      {...swiperProps}
    >
      {[...new Array(10)].map((_, key) => (
        <SwiperSlide key={key}>{itemRenderFn()}</SwiperSlide>
      ))}
    </Swiper>
  )
}

export default SkeletonSlider
