import React, { FC, useCallback } from 'react'
import styled from 'styled-components'

import { IContent } from '@/models/content'
import Image from '@ui/components/Image'
import SkeletonCard from './SkeletonCard'

import styles from './ContentCard.module.scss'

export enum ContentCardType {
  FILM = 'FILM',
  SERIAL = 'SERIAL',
  PROMO_FILM = 'PROMO_FILM',
  PROMO_SERIAL = 'PROMO_SERIAL',
}

export type TContentCardType =
  | ContentCardType.FILM
  | ContentCardType.SERIAL
  | ContentCardType.PROMO_FILM
  | ContentCardType.PROMO_SERIAL

export interface ContentCardProps {
  item: IContent
  type?: TContentCardType
  onClick?: (item: IContent) => void
  onClickFavorite?: (item: IContent) => void
}

const ContentCard: FC<ContentCardProps> = ({ item, type, onClickFavorite, onClick }) => {
  const handleClickFavorite = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    event.stopPropagation()

    onClickFavorite?.(item)
  }

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault()

    onClick?.(item)
  }

  const resolveMeta = useCallback((item: IContent) => {
    const meta = []
    if (item.year) meta.push(item.year)
    if (item.countries) meta.push(item.countries)

    return meta.join(', ')
  }, [])

  const image = type === 'PROMO_FILM' || type === 'PROMO_SERIAL' ? item.smart_promo_img : item.image
  const imageFallback =
    type === 'PROMO_FILM' || type === 'PROMO_SERIAL'
      ? '/assets/img/fallback_poster_16_9.jpg'
      : '/assets/img/fallback_poster_2_3.jpg'
  const imageSizes =
    type === 'PROMO_FILM' || type === 'PROMO_SERIAL'
      ? '(max-width: 768px) 100vw, max-width: 1200px) 50vw, 33vw'
      : '(max-width: 768px) 100vw, max-width: 1200px) 50vw, 33vw'
  const imagePriority = type === 'PROMO_FILM' || type === 'PROMO_SERIAL'

  return (
    <div className={styles.ContentCard} onClick={handleClick}>
      <PosterStyled type={type} className={styles.ContentCard__Poster}>
        <Image
          src={image || imageFallback}
          fallbackSrc={imageFallback}
          alt={item.name}
          sizes={imageSizes}
          priority={imagePriority}
          fill
        />

        <div className={styles.ContentCard__Properties}>
          <div className={styles.ContentCard__PropertiesBody}>
            <span className={styles.ContentCard__ProperyAge}>{item.age}</span>
            <button className={styles.ContentCard__ProperyFavorite} onClick={handleClickFavorite}>
              {item.favorites === 0 && <i className='icon-favorite-outline' />}
              {item.favorites === 1 && <i className='icon-favorite' />}
            </button>
          </div>
        </div>
      </PosterStyled>
      <div className={styles.ContentCard__Body}>
        <h3 className={styles.ContentCard__Title}>{item.name}</h3>
        <div className={styles.ContentCard__Meta}>{resolveMeta(item)}</div>
      </div>
      <div className={styles.ContentCard__Footer}>
        <ul className={styles.ContentCard__Rating}>
          {item.rating_kinopoisk !== '0.00' && (
            <li>
              <img src='/assets/img/icons/rating_kinopoisk.png' />
              <span>{item.rating_kinopoisk}</span>
            </li>
          )}
          {item.rating_imdb !== '0.00' && (
            <li>
              <img src='/assets/img/icons/rating_imdb.png' />
              <span>{item.rating_imdb}</span>
            </li>
          )}
        </ul>
        {item.partner && (
          <img className={styles.ContentCard__Partner} src={`/assets/img/${item.partner}.png`} />
        )}
      </div>
    </div>
  )
}

interface PosterStyledProps {
  type?: ContentCardType
}

const PosterStyled = styled.div<PosterStyledProps>`
  --aspect-ratio: ${({ type }) =>
    type === 'PROMO_FILM' || type === 'PROMO_SERIAL' ? 16 / 9 : 2 / 3};
  padding-top: calc((1 / (var(--aspect-ratio))) * 100%);

  @supports (aspect-ratio: 1) {
    aspect-ratio: var(--aspect-ratio);
    padding-top: initial;
  }
`

export default Object.assign(ContentCard, { Skeleton: SkeletonCard })
