import React, { FC } from 'react'

import ContentCover from '@/components/ContentCover'

import styles from './CoverOverlay.module.scss'
import classNames from 'classnames'

export interface CoverOverlayProps extends React.HTMLAttributes<HTMLDivElement> {
  cover: string
  children?: React.ReactNode
}

const CoverOverlay: FC<CoverOverlayProps> = ({ cover, className, children, ...props }) => {
  return (
    <div className={classNames(className, styles.CoverOverlay)}>
      <ContentCover cover={cover} coverWidth={227.3} coverHeight={340} {...props}>
        {children}
      </ContentCover>
    </div>
  )
}

export default CoverOverlay
