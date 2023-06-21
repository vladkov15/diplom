import React, { FC, useContext } from 'react'
import classNames from 'classnames'
import dayjs from 'dayjs'

import { ChannelContext } from '../channel.context'
import { EpgState } from '../channel.model'
import { useGetEpgDayProgramQuery } from '../channel.api'

import EpgDayProgramList from './EpgDayProgramList'

import styles from './EpgFullDayProgram.module.scss'

const EpgFullDayProgram: FC = () => {
  const { channel, epgProgram, date, currentDate } = useContext(ChannelContext)

  const epgDayProgramPayload = { channel_ptr: channel.id, start_time: date }
  const { data: epgDayProgram } = useGetEpgDayProgramQuery(epgDayProgramPayload, {
    skip: !date,
    pollingInterval: 60 * 1000,
  })

  return (
    <div className={styles.EpgFullDayProgram}>
      <div className={styles.EpgFullDayProgram__Header}>
        <h4 className={classNames(styles.EpgFullDayProgram__Title, 'text-capitalize')}>
          {dayjs(date).format(`${date === currentDate ? 'Сегодня' : 'dddd'}, DD.MM`)}
        </h4>
        {epgProgram?.state === EpgState.LIVE && (
          <span className={styles.EpgFullDayProgram__LiveLabel}>
            <i className={styles.EpgFullDayProgram__LiveMark} />В эфире
          </span>
        )}
      </div>
      <div className={styles.EpgFullDayProgram__Body}>
        {epgDayProgram && <EpgDayProgramList epgDayProgram={epgDayProgram} />}
      </div>
      <div className={styles.EpgFullDayProgram__Footer}></div>
    </div>
  )
}

export default EpgFullDayProgram
