import React, { FC } from 'react'

import Image from '@ui/components/Image'

import { IChannel } from '@/modules/channel/channel.model'
import SkeletonCard from './SkeletonCard'

import styles from './ChannelContentCard.module.scss'

export interface ChannelContentCardProps {
  item: IChannel
  onClick?: (item: IChannel) => void
  onClickFavorite?: (item: IChannel) => void
}

const ChannelContentCard: FC<ChannelContentCardProps> = ({ item, onClickFavorite, onClick }) => {
  const handleClickFavorite = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    event.stopPropagation()

    onClickFavorite?.(item)
  }

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault()

    onClick?.(item)
  }

  return (
    <div className={styles.ChannelContentCard} onClick={handleClick}>
      <div className={styles.ChannelContentCard__Poster}>
        <Image src={item.logo} width='80' height='80' alt={item.name} />

        <div className={styles.ChannelContentCard__Properties}>
          <div className={styles.ChannelContentCard__PropertiesBody}>
            <button
              className={styles.ChannelContentCard__ProperyFavorite}
              onClick={handleClickFavorite}
            >
              {item.favorites === 0 && <i className='icon-favorite-outline' />}
              {item.favorites === 1 && <i className='icon-favorite' />}
            </button>
          </div>
        </div>
      </div>
      <div className={styles.ChannelContentCard__Body}>
        <div className='d-flex align-items-baseline'>
          {item.parent_control === 1 && <i className='icon-lock d-block me-1' />}
          <h3 className={styles.ChannelContentCard__Title}>{item.name}</h3>
        </div>
        <p className={styles.ChannelContentCard__Program}>{item.epg_item.name}</p>
      </div>
    </div>
  )
}
export default Object.assign(ChannelContentCard, { Skeleton: SkeletonCard })
