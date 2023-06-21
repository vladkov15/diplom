import React, { FC, useContext, useEffect, useRef } from 'react'
import classNames from 'classnames'
import dayjs from 'dayjs'

import Scrollable from '@ui/components/Scrollable'

import { EpgState, IEpg } from '../channel.model'
import { ChannelContext } from '../channel.context'

import styles from './EpgDayProgramList.module.scss'

interface EpgDayProgramListProps {
  epgDayProgram: IEpg[]
  onChangeEpgProgram?: (id: IEpg) => void
  full?: boolean
}

const EpgDayProgramList: FC<EpgDayProgramListProps> = React.memo(
  ({ epgDayProgram, onChangeEpgProgram, full = false }) => {
    const { epgProgramId, changeEpgProgramId, epgProgramLive, epgProgram } =
      useContext(ChannelContext)

    const epgWeekProgramItemActiveRef = useRef<HTMLDivElement | null>(null)
    const epgWeekProgramItemFirstRef = useRef<HTMLDivElement | null>(null)

    useEffect(() => {
      const epgWeekProgramItemActiveElem = epgWeekProgramItemActiveRef.current
      const epgWeekProgramItemFirstElem = epgWeekProgramItemFirstRef.current

      setTimeout(() => {
        if (epgWeekProgramItemActiveElem) {
          epgWeekProgramItemActiveElem.scrollIntoView({ block: 'center', behavior: 'smooth' })
        } else if (epgWeekProgramItemFirstElem) {
          epgWeekProgramItemFirstElem.scrollIntoView({ block: 'start', behavior: 'smooth' })
        }
      }, 100)
    }, [epgDayProgram])

    const handleClickEpgDayProgram = (epg: IEpg) => {
      changeEpgProgramId(epg.id)
      onChangeEpgProgram?.(epg)
    }

    const setEpgDayProgramItemRef = (
      node: HTMLDivElement | null,
      start_time: string,
      index: number,
    ) => {
      if (epgProgram?.start_time === start_time) {
        epgWeekProgramItemActiveRef.current = node
      } else if (index === 0) {
        epgWeekProgramItemFirstRef.current = node
      }
    }

    return (
      <Scrollable
        className={classNames({
          [styles.EpgDayProgramList]: true,
          [styles.EpgDayProgramList__Full]: full,
        })}
      >
        <div className={styles.EpgDayProgramList__Header}>
          {full && (
            <div className={styles.EpgDayProgramLegend}>
              <div />
              <div>Время</div>
              <div>Название</div>
              <div>Описание</div>
            </div>
          )}
        </div>
        <div className={styles.EpgDayProgramList__Body}>
          {epgDayProgram?.map((epg: IEpg, index: number) => (
            <div
              ref={(node) => setEpgDayProgramItemRef(node, epg.start_time, index)}
              className={classNames({
                [styles.EpgDayProgramItem]: true,
                [styles.EpgDayProgramItem__Active]: epg.id === epgProgramId,
                [styles.EpgDayProgramItem__Archive]: epg.state === EpgState.ARCHIVE,
                [styles.EpgDayProgramItem__Live]: epg.state === EpgState.LIVE,
                [styles.EpgDayProgramItem__Future]: epg.state === EpgState.FUTURE,
              })}
              onClick={() => handleClickEpgDayProgram(epg)}
              key={epg.id}
            >
              <div className={styles.EpgDayProgramItem__Icon}>
                {epg.state === EpgState.ARCHIVE && <i className='icon-history' />}
                {epgProgramLive?.start_time === epg.start_time && (
                  <i className='icon-play-circle-outline' />
                )}
              </div>
              <div className={styles.EpgDayProgramItem__StartTime}>
                {dayjs(epg.start_time).format('HH:mm')}
              </div>
              <div className={styles.EpgDayProgramItem__Title}>{epg.name}</div>
              {full && <div>{epg.description}</div>}
            </div>
          ))}
        </div>
      </Scrollable>
    )
  },
)

EpgDayProgramList.displayName = 'EpgDayProgramList'

export default EpgDayProgramList
