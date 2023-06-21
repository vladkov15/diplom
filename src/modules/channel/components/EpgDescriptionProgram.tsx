import React, { FC, useContext } from 'react'
import dayjs from 'dayjs'

import { ChannelContext } from '../channel.context'

import styles from './EpgDescriptionProgram.module.scss'

const EpgDescriptionProgram: FC = React.memo(() => {
  const { epgProgram } = useContext(ChannelContext)

  if (!epgProgram) return null

  return (
    <div className={styles.EpgDescriptionProgram}>
      <div className={styles.EpgDescriptionProgram__Meta}>
        <time className={styles.EpgDescriptionProgram__StartTime}>
          {dayjs(epgProgram.start_time).format('HH:mm')}
        </time>
        &nbsp;–&nbsp;
        <h4 className={styles.EpgDescriptionProgram__Title}>{epgProgram.name}</h4>
      </div>

      {epgProgram.description && (
        <div className={styles.EpgDescriptionProgram__Description}>{epgProgram.description}</div>
      )}
    </div>
  )
})
EpgDescriptionProgram.displayName = 'EpgDescriptionProgram'

export default EpgDescriptionProgram
