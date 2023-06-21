import React, { FC, useState } from 'react'
import { Pagination, Navigation, Keyboard } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import styled from 'styled-components'

import { IContent } from '@/models/content'
import MySliderCard from '../MyCard'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'

import styles from './MySlider.module.scss'

const normalizeNumber = (value: number) => {
  return value < 10 ? `0${value}` : value
}

interface MySliderProps {
  items: IContent[]
}

const MySlider: FC<MySliderProps> = ({ items }) => {
  const [currentItem, setCurrentItem] = useState(0)

  return (
    <SwiperStyled
      className={styles.MySlider}
      modules={[Keyboard, Pagination, Navigation]}
      slidesPerView={1}
      spaceBetween={30}
      keyboard={{ enabled: true }}
      initialSlide={1}
      navigation={{
        prevEl: `.${styles.MySlider__NavigationPrev}`,
        nextEl: `.${styles.MySlider__NavigationNext}`,
      }}
      onSlideChange={({ realIndex }) => setCurrentItem(realIndex)}
      loop
      loopAdditionalSlides={2}
    >
      {items.map((item) => (
        <SwiperSlide key={item.id}>
          <MySliderCard item={item} />
        </SwiperSlide>
      ))}
      <div className={styles.MySlider__ProgressBar}>
        <div className={styles.MySlider__Count}>{normalizeNumber(currentItem + 1)}</div>
        <MySliderProgressStyled
          className={styles.MySlider__Progress}
          totalItems={items.length}
          currentItem={currentItem}
        >
          <span />
        </MySliderProgressStyled>
        <div className={styles.MySlider__Length}>{normalizeNumber(items.length)}</div>

        <div className={styles.MySlider__Navigation}>
          <div className={styles.MySlider__NavigationPrev} />
          <div className={styles.MySlider__NavigationNext} />
        </div>
      </div>
    </SwiperStyled>
  )
}
MySlider.displayName = 'MySlider'

const SwiperStyled = styled(Swiper)`
  overflow: visible;

  .swiper-button-disabled {
    opacity: 0.4;
    cursor: not-allowed;
    color: #fff;
  }
`
interface MySliderProgressStyledProps {
  totalItems: number
  currentItem: number
}
const MySliderProgressStyled = styled.div<MySliderProgressStyledProps>`
  width: 200px;

  span {
    width: ${({ totalItems, currentItem }) => `${(100 / totalItems) * (currentItem + 1)}%`};
  }
`

export default MySlider
