import React, { FC, useContext, useMemo, useState } from 'react'
import { usePrevious } from '@restart/hooks'
import classNames from 'classnames'
import dayjs from 'dayjs'
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore'
import 'dayjs/locale/ru'

import { useGetEpgDayProgramQuery } from '../channel.api'
import { ChannelContext } from '../channel.context'

import Toggle from '@ui/components/toggle'
import EpgDayProgram from './EpgDayProgramList'

import styles from './EpgWeekProgram.module.scss'

dayjs.extend(isSameOrBefore)

const currentDate = dayjs()
const currentDateFormat = currentDate.format('YYYY-MM-DD')

const EpgWeekProgram: FC = () => {
  const { channel, epgProgram, ...dates } = useContext(ChannelContext)

  const [date, setDate] = useState(dates.date)
  const datePrevius = usePrevious(date)

  const epgDayProgramPayload = { channel_ptr: channel.id, start_time: date }
  const { data: epgDayProgram } = useGetEpgDayProgramQuery(epgDayProgramPayload, {
    skip: !epgProgram,
  })

  const availableDates = useMemo(() => {
    if (!dates.startDate || !dates.endDate) return []

    const result = []
    const startDate = dayjs(dates.startDate)
    const endDate = dayjs(dates.endDate)

    let date = startDate.clone()
    while (date.isSameOrBefore(endDate)) {
      const row = date.toDate()
      const format = date.format('YYYY-MM-DD')

      const labelFormat = `${date.isSame(currentDateFormat) ? 'Сегодня' : 'dddd'}, DD.MM`
      const label = date.locale('ru').format(labelFormat)

      result.push({ row, format, label })
      date = date.add(1, 'day')
    }

    return result
  }, [dates.startDate, dates.endDate])

  const handleChangeEpgProgram = () => {
    if (date !== dates.currentDate) dates.changeDate(date)
    else if (datePrevius !== dates.currentDate && date === dates.currentDate) dates.changeDate(date)
  }

  return (
    <div className={styles.EpgWeekProgram}>
      <div className={styles.EpgWeekProgram__Header}>
        <Toggle
          className={styles.EpgWeekProgram__Toggle}
          type='radio'
          name='epgDaysWeek'
          defaultValue={date}
          onChange={(value: string) => setDate(value)}
          scrollable
        >
          {availableDates.map((availableDate) => (
            <Toggle.Button
              id={`epgDayWeek-${availableDate.format}`}
              className={classNames({
                'text-capitalize': true,
                [styles.EpgWeekProgram__ToggleButton]: true,
                [styles.EpgWeekProgram__ToggleButton__Active]: date === availableDate.format,
              })}
              value={availableDate.format}
              key={availableDate.format}
            >
              {availableDate.label}
            </Toggle.Button>
          ))}
        </Toggle>
      </div>

      <div className={styles.EpgWeekProgram__Body}>
        {epgDayProgram && (
          <EpgDayProgram
            epgDayProgram={epgDayProgram}
            onChangeEpgProgram={handleChangeEpgProgram}
            full
          />
        )}
      </div>
    </div>
  )
}

export default EpgWeekProgram
