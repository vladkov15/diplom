import React, { FC } from 'react'
import { IContent } from '@/models/content'

import styles from './MyCard.module.scss'

interface CardProps {
  item: IContent
}

const MyCard: FC<CardProps> = React.memo(({ item }) => {
  return (
    <div className={styles.MyCard}>
      <div className={styles.MyCard__Poster}>
        <img src={item.smart_promo_img} alt={item.name} />
      </div>
    </div>
  )
})
MyCard.displayName = 'MyCard'

export default MyCard
