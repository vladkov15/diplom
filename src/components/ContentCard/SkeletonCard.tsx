import React, { FC } from 'react'
import styled from 'styled-components'

import { ContentCardType } from '.'

import styles from './ContentCard.module.scss'

interface SkeletonCardProps {
  type?: ContentCardType
}

const SkeletonCard: FC<SkeletonCardProps> = ({ type }) => {
  return (
    <div className={styles.SkeletonCard}>
      <PosterSkeletonStyled className={styles.SkeletonCard__Poster} type={type} />
      <div className={styles.SkeletonCard__Body}>
        <span />
      </div>
      <div className={styles.SkeletonCard__Footer}>
        <span />
      </div>
    </div>
  )
}

interface PosterSkeletonStyledProps {
  type?: ContentCardType
}

const PosterSkeletonStyled = styled.div<PosterSkeletonStyledProps>`
  --aspect-ratio: ${({ type }) =>
    type === 'PROMO_FILM' || type === 'PROMO_SERIAL' ? 16 / 9 : 2 / 3};
  padding-top: calc((1 / (var(--aspect-ratio))) * 100%);

  @supports (aspect-ratio: 1) {
    aspect-ratio: var(--aspect-ratio);
    padding-top: initial;
  }
`

export default SkeletonCard
