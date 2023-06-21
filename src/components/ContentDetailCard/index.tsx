import React, { FC } from 'react'
import Image from 'next/image'
import classNames from 'classnames'

import { IContent, Partner } from '@/models/content'

import styles from './ContentDetailCard.module.scss'
import AspectRatio from '../AspectRatio'

interface ContentDetailCardProps extends React.HTMLAttributes<HTMLDivElement> {
  item: IContent
  playerRenderFn?: (item: IContent) => React.ReactNode
  afterPlayerRenderFn?: (item: IContent) => React.ReactNode
}

const ContentDetailCard: FC<ContentDetailCardProps> = ({
  item,
  playerRenderFn,
  afterPlayerRenderFn,
  className,
}) => {
  return (
    <div className={classNames(className, styles.ContentDetailCard)}>
      <div className={styles.ContentDetailCard__Body}>
        <div className={styles.ContentDetailCard__PlayerWrapper}>
          <AspectRatio fixable>{playerRenderFn?.(item)}</AspectRatio>
          {afterPlayerRenderFn && (
            <div style={{ marginTop: 10 }}>{afterPlayerRenderFn?.(item)}</div>
          )}
        </div>
        <div className={styles.ContentDetailCard__InfoWrapper}>
          <ul className={styles.InfoList}>
            {item.countries && (
              <li>
                <span className={styles.InfoList__Label}>Страна: </span>
                <span className={styles.InfoList__Value}>{item.countries}</span>
              </li>
            )}
            {item.genres && (
              <li>
                <span className={styles.InfoList__Label}>Жанр: </span>
                <span className={styles.InfoList__Value}>{item.genres}</span>
              </li>
            )}
            {item.year && (
              <li>
                <span className={styles.InfoList__Label}>Год: </span>
                <span className={styles.InfoList__Value}>{item.year}</span>
              </li>
            )}
            {item.age && (
              <li>
                <span className={styles.InfoList__Label}>Рейтинг: </span>
                <span className={styles.InfoList__Value}>{item.age}</span>
              </li>
            )}
          </ul>
          <div className='flex align-items-center'>
            {item.partner && (
              <Image
                className={classNames({
                  [styles.Partner]: true,
                  [styles.Partner__Premier]: item.partner === Partner.PREMIER,
                  [styles.Partner__Start]: item.partner === Partner.START,
                  [styles.Partner__Amediateka]: item.partner === Partner.AMEDIATEKA,
                  [styles.Partner__Amediateka]: item.partner === Partner.AMEDIATEKA_DRM,
                  [styles.Partner__Seasonvar]: item.partner === Partner.SEASONVAR,
                })}
                src={`/assets/img/${item.partner}.png`}
                width={160}
                height={20}
                alt={item.partner}
              />
            )}
            {(item.rating_kinopoisk !== '0.00' || item.rating_imdb !== '0.00') && (
              <ul className={styles.RatingList}>
                {item.rating_kinopoisk !== '0.00' && (
                  <li>
                    <Image
                      src='/assets/img/icons/rating_kinopoisk.png'
                      width={20}
                      height={20}
                      alt='Кинопоиск'
                    />
                    <span>{item.rating_kinopoisk}</span>
                  </li>
                )}
                {item.rating_imdb !== '0.00' && (
                  <li>
                    <Image
                      src='/assets/img/icons/rating_imdb.png'
                      width={20}
                      height={20}
                      alt='IMDB'
                    />
                    <span>{item.rating_imdb}</span>
                  </li>
                )}
              </ul>
            )}
          </div>
          {item.description && (
            <p className={styles.ContentDetailCard__Description}>{item.description}</p>
          )}
        </div>
      </div>
    </div>
  )
}

export default ContentDetailCard
