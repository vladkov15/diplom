import { FC, useContext } from 'react'

import { SerialContext } from '@/modules/serial/serial.context'
import { SwiperProps } from 'swiper/react/swiper-react'

import Slider from '@/components/Slider'
import SkeletonSlider from '@/components/Slider/SkeletonSlider'
import EpisodeSkeletonCard from '../EpisodeCard/skeleton'

import EpisodeCard from '../EpisodeCard'

import { IEpisode } from '@/modules/serial/serial.model'

import styles from './EpisodeSlider.module.scss'

const DEFAULT_SLIDES_PER_PAGE = 6

const DEFAULT_SWIPER_PROPS = {
  slidesPerView: DEFAULT_SLIDES_PER_PAGE,
  slidesPerGroup: DEFAULT_SLIDES_PER_PAGE,
}

interface EpisodeSliderProps {
  swiperProps?: SwiperProps
}

const EpisodeSlider: FC<EpisodeSliderProps> = ({ swiperProps }) => {
  const { serial, episodes, episodesLoading, episodesFetching } = useContext(SerialContext)

  if (episodesLoading || episodesFetching) {
    return (
      <SkeletonSlider
        className={styles.EpisodeSkeletonSlider}
        itemRenderFn={() => <EpisodeSkeletonCard />}
        swiperProps={{ ...DEFAULT_SWIPER_PROPS }}
      />
    )
  }

  return (
    <Slider
      style={{ overflow: 'hidden' }}
      className={styles.EpisodeSlider}
      items={episodes || []}
      itemRenderFn={(episode: IEpisode) => <EpisodeCard serial={serial} episode={episode} />}
      swiperProps={{ ...DEFAULT_SWIPER_PROPS, ...swiperProps }}
    />
  )
}

export default EpisodeSlider
