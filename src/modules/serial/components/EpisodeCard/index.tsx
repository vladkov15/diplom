import { FC, useContext } from 'react'
import classNames from 'classnames'

import { Image } from '@ui'

import { SerialContext } from '@/modules/serial/serial.context'

import { ISerial, IEpisode } from '@/modules/serial/serial.model'

import styles from './EpisodeCard.module.scss'
import ContentCover from '@/components/ContentCover'
import { Partner } from '@/models/content'

interface EpisodeCardProps {
  serial: ISerial
  episode: IEpisode
}

const EpisodeCard: FC<EpisodeCardProps> = ({ serial, episode }) => {
  const { episodeId, changeEpisodeId } = useContext(SerialContext)

  return (
    <div
      className={classNames({
        [styles.EpisodeCard]: true,
        [styles.EpisodeCard__Active]: episode.id === episodeId,
      })}
      onClick={() => changeEpisodeId(episode.id)}
    >
      <div className={styles.EpisodeCard__Poster}>
        {![Partner.START, Partner.PREMIER].includes(episode.partner) ? (
          <ContentCover cover={serial.image} coverWidth={58.6} coverHeight={90} />
        ) : (
          <Image
            className={classNames({
              [styles.EpisodeCard__Image]: true,
              [styles.EpisodeCard__Active]: episode.id === episodeId,
            })}
            src={episode.image}
            sizes='(max-width: 768px) 100vw, max-width: 1200px) 50vw, 33vw'
            alt={episode.name}
            fill
          />
        )}
      </div>
      <div className={styles.EpisodeCard__Body}>
        <div className={styles.EpisodeCard__Title}>{episode.name}</div>
      </div>
    </div>
  )
}

export default EpisodeCard
