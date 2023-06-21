import { FC } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper'
import styled from 'styled-components'

import TuturialCard from '../TutorialCard'
import { ITutorialItem } from './tutorials'

import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import styles from './TutorialSlider.module.scss'

interface TutorialSliderProps {
  title?: string
  items: ITutorialItem[]
}

const TutorialSlider: FC<TutorialSliderProps> = ({ title, items }) => {
  return (
    <div className={styles.TutorialSlider}>
      {title && (
        <div className={styles.TutorialSlider__Header}>
          <h3 className={styles.TutorialSlider__Title}>{title}</h3>
        </div>
      )}
      <SwiperStyled modules={[Navigation]} loop={true} navigation={true} speed={600}>
        {items.map((item) => (
          <SwiperSlide key={item.id}>
            <TuturialCard item={item} />
          </SwiperSlide>
        ))}
      </SwiperStyled>
    </div>
  )
}

const SwiperStyled = styled(Swiper)`
  .swiper-button-prev,
  .swiper-button-next {
    top: calc(50% - 12px);
    width: var(--swiper-button-size);
    height: var(--swiper-button-size);
    background: rgba(146, 144, 144, 0.8);
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: 0.25s all ease;

    &:hover {
      background-color: var(--accent);
      box-shadow: 0px 0px 14px var(--accent);
    }

    &:after {
      color: #fff;
      font-size: 16px;
      font-weight: 600;
    }
  }

  .swiper-button-prev {
    &:after {
      margin-left: -3px;
    }
  }

  .swiper-button-next {
    &:after {
      margin-right: -3px;
    }
  }

  .swiper-button-disabled {
    display: none;
  }
`

export default TutorialSlider
