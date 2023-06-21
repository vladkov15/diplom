import React, { FC, useMemo } from 'react'

import { Genres, IContentGenre } from '@/models/content'

import { GENRES } from '@/config'

import styles from './ContentGenreCard.module.scss'

interface ContentGenreCardProps {
  item: IContentGenre
  onClick?: (item: IContentGenre) => void
}

const ContentGenreCard: FC<ContentGenreCardProps> = ({ item, onClick }) => {
  const isPartner = useMemo(() => {
    return [Genres.AMEDIATEKA, Genres.START, Genres.PREMIER].includes(item.id)
  }, [item])

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault()

    onClick?.(item)
  }

  return (
    <div className={styles.ContentGenreCard} onClick={handleClick}>
      <img
        className={styles.ContentGenreCard__Image}
        src={`/assets/img/genres/${GENRES.get(item.id)?.slug}.png`}
        alt={item.name}
      />
      {!isPartner && <h3 className={styles.ContentGenreCard__Title}>{item.name}</h3>}
    </div>
  )
}

export default ContentGenreCard
