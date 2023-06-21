import classNames from 'classnames'
import { FC } from 'react'
import { Navigation } from 'swiper'
import { Swiper, SwiperProps, SwiperSlide } from 'swiper/react'

import styles from './Slider.module.scss'

interface SliderProps extends Pick<SwiperProps, 'className' | 'style'> {
  items: any[]
  itemRenderFn: (item: any) => React.ReactNode
  swiperProps?: SwiperProps
}

const Slider: FC<SliderProps> = ({ items, itemRenderFn, swiperProps, className, ...props }) => {
  return (
    <Swiper
      style={{ overflow: 'visible', ...props.style }}
      className={classNames(className, styles.Slider)}
      spaceBetween={30}
      navigation={true}
      modules={[Navigation]}
      {...swiperProps}
      {...props}
    >
      {items.map((item) => (
        <SwiperSlide key={item.id}>{itemRenderFn(item)}</SwiperSlide>
      ))}
    </Swiper>
  )
}

export default Slider
