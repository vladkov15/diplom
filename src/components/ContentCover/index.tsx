import { FC } from 'react'

import { Image } from '@ui'

import styles from './ContentCover.module.scss'
import classNames from 'classnames'

interface ContentCoverProps extends React.HTMLAttributes<HTMLDivElement> {
  cover: string
  coverWidth: number
  coverHeight: number
  children?: React.ReactNode
}

const ContentCover: FC<ContentCoverProps> = ({
  cover,
  coverWidth,
  coverHeight,
  className,
  children,
}) => {
  return (
    <div className={classNames(className, styles.ContentCover)}>
      <div className={styles.ContentCover__Backdrop}>
        <div
          className={styles.ContentCover__BackdropPoster}
          style={{ backgroundImage: `url("${cover}")` }}
        />
        <Image
          className={styles.ContentCover__Poster}
          src={cover}
          alt='Обложка'
          width={coverWidth}
          height={coverHeight}
        />
      </div>
      {children && <div className={styles.ContentCover__Content}>{children}</div>}
    </div>
  )
}

export default ContentCover
