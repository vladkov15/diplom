import { FC } from 'react'
import Image from 'next/image'

import { ITutorialItem } from '../TutorialSlider/tutorials'

import styles from './TutorialCard.module.scss'

export interface ITutorialCard {
  item: ITutorialItem
}

const TuturialCard: FC<ITutorialCard> = ({ item }) => {
  return (
    <div className={styles.TutorialCard}>
      <div className={styles.TutorialCard__ImageContainer}>
        <Image
          className={styles.TutorialCard__Image}
          src={item.image}
          loading='eager'
          alt=''
          fill
        />
      </div>
      <div className={styles.TutorialCard__Body}>
        <h4 className={styles.TutorialCard__Title}>{item.title}</h4>
        <div className={styles.TutorialCard__Description}>{item.description}</div>
        <div className={styles.TutorialCard__ActionDescription}>{item.actionDescription}</div>
      </div>
    </div>
  )
}

export default TuturialCard
